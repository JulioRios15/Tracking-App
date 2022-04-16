import {Request, Response, NextFunction} from 'express';
import HttpException from '../../../common/exceptions/http.exception';
import { extractOptions } from '../utils/material.utils';
import { findProjectById } from '../../project/service/project.service';


/**
 * 
 * @info 
 */
async function configureUploadMaterialOptions(req: Request, res: Response, next: NextFunction) {
    const options = extractOptions(req.body.options);
    const newOptions = [];


    for (let i = 0; i < options.length; i++) {
        const projectId = options[i].project;
        const currentOption = options[i];

        const project = await findProjectById(projectId);
        if(project) newOptions.push(currentOption);
    }

    if(newOptions.length === 0){
        return next(new HttpException(500, "No valid project to add materials"));
    }

    res.locals.options = newOptions;
    return next();
 
}

export default configureUploadMaterialOptions;