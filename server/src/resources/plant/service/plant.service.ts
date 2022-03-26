import PlantModel, { Plant } from "../model/plant.model";
import { QueryOptions } from "mongoose";

export async function createPlant(input: Partial<Plant>){
    return PlantModel.create(input);
}

export async function findPlantById(id: string) {
    return PlantModel.findOne({_id: id});
}

export async function queryPlants(
    query: Partial<Plant>,
    options: QueryOptions = {}
    ){
    return await PlantModel.find(query, null, options);
}

export async function updatePlant(id: string, update: Partial<Plant>) {
    return await PlantModel.findByIdAndUpdate(id, update, {new: true});
}

export async function deletePlant(id: string){
    return await PlantModel.findByIdAndDelete(id, { new: true });
}

export async function deleteAllPlants() {
    return await PlantModel.deleteMany({});
}