import { Request, Response, NextFunction } from 'express';
import * as materialService from '../service/material.service';
import HttpException from '../../../common/exceptions/http.exception';
import logger from '../../../utils/logger';

export async function createMaterialHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
        const materialData = req.body;

        try {
            const newMaterial = await materialService.createMaterial(materialData);
            return res.status(201).json(newMaterial);

        } catch (e: any) {

            logger.error(`[material controller] - [createMaterialHandler] - ${e.message}`);
            if(e.code === 11000){
                return next(new HttpException(409, "Material already exists"));
            }

            return next(new HttpException(500, `${e.message}`, e));
        }
    }

export async function queryMaterialHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const query = req.query;
        const queryMaterials = await materialService.queryMaterial(query);
        return res.status(200).json(queryMaterials);

    } catch (e: any) {
        logger.error(`[material controller] - [queryMaterialHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong"));
    }
}

export async function updateMaterialHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const materialId = req.params.materialId;
        const update = req.body;
        const updatedMaterial = await materialService.updateMaterial(materialId, update);
        return res.status(200).json(updatedMaterial);

    } catch (e: any) {
        logger.error(`[material controller] - [updateMaterialHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong", e));
    }
}

export async function deleteMaterialHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const materialId = req.params.materialId;
        const deletedMaterial = await materialService.deleteMaterial(materialId);
        return res.status(200).json(deletedMaterial);

    } catch (e: any) {
        logger.error(`[material controller] - [deleteMaterialHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong", e));
    }
}

