import { Request, Response, NextFunction } from 'express';
import * as projectService from '../service/project.service';
import HttpException from '../../../common/exceptions/http.exception';
import logger from '../../../utils/logger';

export async function createProjectHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
        const projectData = req.body;

        try {
            const newProject = await projectService.createProject(projectData);
            return res.status(201).json(newProject);

        } catch (e: any) {

            logger.error(`[project controller] - [createProjectHandler] - ${e.message}`);
            if(e.code === 11000){
                return next(new HttpException(409, "Project already exists"));
            }

            return next(new HttpException(500, `${e.message}`, e));
        }
    }

export async function queryProjectHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const query = req.body;
        const queryProjects = await projectService.queryProjects(query);
        return res.status(200).json(queryProjects);

    } catch (e: any) {
        logger.error(`[project controller] - [queryProjectHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong"));
    }
}

export async function updateProjectHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const projectId = req.params.projectId;
        const update = req.body;
        const updatedProject = await projectService.updateProject(projectId, update);
        return res.status(200).json(updatedProject);

    } catch (e: any) {
        logger.error(`[project controller] - [updateProjectHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong", e));
    }
}

export async function deleteProjectHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const projectId = req.params.projectId;
        const deletedProject = await projectService.deleteProject(projectId);
        return res.status(200).json(deletedProject);

    } catch (e: any) {
        logger.error(`[project controller] - [deleteProjectHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong", e));
    }
}

