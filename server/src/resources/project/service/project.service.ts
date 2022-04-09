import ProjectModel, { Project } from "../model/project.model";
import { QueryOptions } from "mongoose";

export async function createProject(input: Partial<Project>){
    return ProjectModel.create(input);
}

export async function findProjectById(id: string) {
    return ProjectModel.findOne({_id: id});
}

export async function queryProjects(
    query: Partial<Project>,
    options: QueryOptions = {}
    ){
    return await ProjectModel.find(query, null, options);
}

export async function updateProject(id: string, update: Partial<Project>) {
    return await ProjectModel.findByIdAndUpdate(id, update, { new: true });
}

export async function deleteProject(id: string){
    return await ProjectModel.findByIdAndDelete(id, { new: true });
}

export async function deleteAllProjects() {
    return await ProjectModel.deleteMany({});
}