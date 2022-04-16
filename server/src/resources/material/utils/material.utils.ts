import fs from 'fs';
import XLSX from 'xlsx';

export function extractOptions(options: any){
    let data = [];

    const isString = typeof options === "string";

    if(isString) {
        const splitOptions = options.split(" ");
        data.push({
            tailNumber: splitOptions[0],
            project: splitOptions[1]
        });
    } else{
        for (let i = 0; i < options.length; i++) {
            const splitOptions = options[i].split(" ");
            data.push({
                tailNumber: splitOptions[0],
                project: splitOptions[1]
            });    
        }
    }

    return data;
}

export function findOptionsIndex(options: Array<Object>, tailNumber: string){
    return options.findIndex(function (option: any){
        return option.tailNumber === tailNumber;
    })
}

export function validFileExtension(fileName: string): boolean{
    const _validFileExtension = [".xlsx", ".XLSX", ".csv", ".CSV"];
    return true;
}

export function validFileFormat(workSheet: XLSX.WorkSheet): boolean {
    return true;
}