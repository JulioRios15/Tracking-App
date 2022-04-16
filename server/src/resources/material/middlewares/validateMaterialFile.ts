import {Request, Response, NextFunction} from 'express';
import fs from 'fs';
import XLSX from 'xlsx';
import HttpException from '../../../common/exceptions/http.exception';
import { validFileExtension, validFileFormat } from '../utils/material.utils';


/**
 * 
 * @info 
 */
async function validateMaterialFile(req: Request, res: Response, next: NextFunction) {

    // Verify if a file is attached
    const fileName = req.file?.path;
    if(!fileName) return next(new HttpException(500, "No file attached"));

    //Verify if correct file is attached
    if(!validFileExtension(fileName)) return next(new HttpException(500, "invalid File extension"));

    const workbook = XLSX.readFile(fileName);
    const worksheet: Array<any> = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);

    //Verify if file is propertly formated
    if(!validFileFormat(worksheet)) return next(new HttpException(500, "invalid material File format"));

    res.locals.fileName = fileName;
    res.locals.worksheet = worksheet;

    next();
 
}

export default validateMaterialFile;