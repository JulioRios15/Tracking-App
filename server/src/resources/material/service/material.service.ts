import MaterialModel, { Material } from "../model/material.model";
import mongoose, { QueryOptions } from "mongoose";

export async function createMaterial(input: Partial<Material>){
    return MaterialModel.create(input);
}

export function defineMaterialFromWorksheet(item: any, project: string){
    return new MaterialModel({
        _id: new mongoose.Types.ObjectId(),
        project,
        partNumber: item["Material"],
        materialDescription: item["Material description"],
        workCenter: item["WorkCenter"],
        order: item["Order"],
        orderDescription: item["Description"],
        purchaseOrder: item["PO"],
        awb: item["AWB"],
        quantity: item["RequiredQty"],
    })
}

export async function findMaterialById(id: string) {
    return MaterialModel.findOne({_id: id});
}

export async function queryMaterial(
    query: Partial<Material>,
    options: QueryOptions = {}
    ){
    return await MaterialModel.find(query, null, options);
}

export async function updateMaterial(id: string, update: Partial<Material>) {
    return await MaterialModel.findByIdAndUpdate(id, update, { new: true });
}

export async function deleteMaterial(id: string){
    return await MaterialModel.findByIdAndDelete(id, { new: true });
}

export async function deleteAllMaterials() {
    return await MaterialModel.deleteMany({});
}

export async function materialExists(query: Partial<Material>): Promise<boolean>{
    const materialToFind = await MaterialModel.findOne(query);
    return (materialToFind == null)? false : true; 
}