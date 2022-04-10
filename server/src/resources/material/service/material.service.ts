import MaterialModel, { Material } from "../model/material.model";
import { QueryOptions } from "mongoose";

export async function createMaterial(input: Partial<Material>){
    return MaterialModel.create(input);
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