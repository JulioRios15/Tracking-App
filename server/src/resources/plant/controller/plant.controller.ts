import { Request, Response, NextFunction } from 'express';
import * as plantService from '../service/plant.service';
import HttpException from '../../../common/exceptions/http.exception';
import logger from '../../../utils/logger';

export async function createPlantHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
    ){
        const plantData = req.body;

        try {
            const newPlant = await plantService.createPlant(plantData);
            return res.status(201).json(newPlant);

        } catch (e: any) {

            logger.error(`[plant controller] - [createPlantHandler] - ${e.message}`);
            if(e.code === 11000){
                return next(new HttpException(409, "Plant already exists"));
            }

            return next(new HttpException(500, `${e.message}`));
        }
    }

export async function queryPlantHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const query = req.body;
        const queryPlants = await plantService.queryPlants(query);
        return res.status(200).json(queryPlants);

    } catch (e: any) {
        logger.error(`[plant controller] - [queryPlantHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong"));
    }
}

export async function updatePlantHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const plantId = req.params.plantId;
        const update = req.body;
        const updatedPlant = await plantService.updatePlant(plantId, update);
        return res.status(200).json(updatedPlant);

    } catch (e: any) {
        logger.error(`[plant controller] - [updatePlantHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong"));
    }
}

export async function deletePlantHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    try {
        const plantId = req.params.plantId;
        const deletedPlant = await plantService.deletePlant(plantId);
        return res.status(200).json(deletedPlant);

    } catch (e: any) {
        logger.error(`[plant controller] - [deletePlantHandler] - ${e.message}`);
        return next(new HttpException(500, "something went wrong"));
    }
}

