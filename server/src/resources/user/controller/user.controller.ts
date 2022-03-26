import { Request, Response, NextFunction } from 'express';
import * as userService from '../service/user.service';
import HttpException from '../../../common/exceptions/http.exception';
import logger from '../../../utils/logger';


export async function CreateUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const userData: any = req.body;
        const newUser = await userService.createUser(userData);
        return res.status(201).json(newUser);

    } catch (e: any) {

        logger.error(`[user controller] - [CreateUserHandler] - ${e.message}`);
        if(e.code === 11000){
            return next(new HttpException(409, "User already exists", e));
        }

        return next(new HttpException(500, `${e.message}`));
    }
}

export async function queryUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const query: any = req.query;
        const queryUsers = await userService.queryUsers(query);
        return res.status(200).json(queryUsers);
        
    } catch (e: any) {
        logger.error(`[user controller] - [queryUserHandler] - ${e.message}`);
        return next(new HttpException(500, `Unable to query users`));
    }
}

export async function updateUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userId = req.params.userId;
        const update: any = req.body;
        const updatedUser = await userService.updateUserById(userId, update);
        return res.status(200).json(updatedUser);

    } catch (e: any) {
        logger.error(`[user controller] - [updateUserHandler] - ${e.message}`);
        return next(new HttpException(500, `Unable to update user`));
    }

}

export async function deleteUserHandler(
    req: Request,
    res: Response,
    next: NextFunction
){
    try {
        const userId = req.params.userId;
        const deletedUser = await userService.deleteUserById(userId);
        return res.status(200).json(deletedUser);
    } catch (e: any) {
        logger.error(`[user controller] - [deleteUserHandler] - ${e.message}`);
        return next(new HttpException(500, `Unable to delete user`));
    }
}