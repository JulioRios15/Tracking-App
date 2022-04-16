import { Request, Response, NextFunction } from 'express';
import * as materialService from '../service/material.service';
import HttpException from '../../../common/exceptions/http.exception';
import fs from 'fs';
import { findOptionsIndex } from '../utils/material.utils';
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

export async function uploadMaterialHandler(
    req: Request, 
    res: Response, 
    next: NextFunction
){
    const fileName = res.locals.fileName;
    const worksheet: Array<any> = res.locals.worksheet;
    const options = res.locals.options
    let newMaterials: Array<any> = [];
    let updatedMaterials: Array<any> = [];
    let newMaterialCount = 0;
    let updatedMaterialsCount = 0;


    //length -1 to skip last line of excel file
    // verify if the material exist, if not exist add it to DB
    for (let i = 0; i < worksheet.length -1; i++) {
        const optionIndex = findOptionsIndex(options, worksheet[i]["Registration number"]);
        if(optionIndex === -1) continue;

        const materialToFind = materialService.defineMaterialFromWorksheet(worksheet[i], options[optionIndex].project);
        const materialExists = await materialService.materialExists({
            partNumber: materialToFind.partNumber,
            order: materialToFind.order,
            project: materialToFind.project
        });

        if(!materialExists){
            const savedMaterial = await materialService.createMaterial(materialToFind);
            newMaterials.push(savedMaterial);
            newMaterialCount++;
            continue;
        }

        if(materialExists){
            const queryMaterials = await materialService.queryMaterial({
                partNumber: materialToFind.partNumber,
                order: materialToFind.order,
                project: materialToFind.project
            });

            // update material if awb has changed
            if(
                queryMaterials 
                && queryMaterials.length === 1 
                && queryMaterials[0].awb === "" 
                && materialToFind.awb !== undefined
                && queryMaterials[0].awb !== materialToFind.awb
            ){
                const updatedMaterial = await materialService.updateMaterial(queryMaterials[0]._id, {awb: materialToFind.awb});
                updatedMaterials.push(updatedMaterial);
                updatedMaterialsCount++;
            }
        }         
    }

    //remove file from local storage
    fs.unlink(fileName, (error) => {
       logger.error(error, "[material controller] - [uploadMaterialHandler] - remove file from local storage error");
    });


    return res.status(201).json({
        options,
        newMaterialsCount: newMaterialCount,
        updatedMaterialsCount: updatedMaterialsCount,
        materialsAdded: newMaterials,
        updatedMaterialsAdded: updatedMaterials,
    });
}