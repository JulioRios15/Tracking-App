import { QueryOptions } from "mongoose";
import UserModel, { User } from "../model/user.model";

export async function createUser(input: Partial<User>) {
    try {
        const newUser = await UserModel.create(input);
        return newUser;
    } catch (e: any) {
         throw new Error(e.message);
    }
  }
  
export async function findUserById(id: string) {
    return await UserModel.findById(id);
}

export async function findUserByEmail(email: string) {
    return await UserModel.findOne({ email });
}

export async function queryUsers(
    query: Partial<User>,
    options: QueryOptions = {}
){
    return await UserModel.find(query, null, options)
}

export async function updateUserById(
    userId: string, 
    update: Partial<User>,
    options: QueryOptions = { new: true, runValidators: true }
    ){
    return await UserModel.findByIdAndUpdate(userId, update, options);
}

export async function deleteUserById(userId: string){
    return await UserModel.findByIdAndDelete(userId);
}

export async function deleleAllUsers(){
    return await UserModel.deleteMany({});
}
