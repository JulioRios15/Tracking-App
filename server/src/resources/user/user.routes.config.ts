import express from 'express';
import RoutesConfig from "../../common/routes/routes.config";
import * as userController from './controller/user.controller';


export default class UserRoutes extends RoutesConfig {
    constructor(app: express.Application){
        super(app, "User Routes");
    }

    configureAdminRoutes(): express.Application {
        const endpoint = "/api/admin/users";

        // Create new user
        this.app.post(
            `${endpoint}/`,
            userController.CreateUserHandler
        );
        
        // Query Users
        this.app.get(
            `${endpoint}/`,
            userController.queryUserHandler
        );

        // Update User
        this.app.put(
            `${endpoint}/userId/:userId`,
            userController.updateUserHandler
        );

        // Delete User
        this.app.delete(
            `${endpoint}/userId/:userId`,
            userController.deleteUserHandler
        );

        return this.app;
    }

    configureUserRoutes(): express.Application {

        const endpoint ="/api/users";

        // Query Users
        this.app.get(
            `${endpoint}/`,
            userController.queryUserHandler
        );

        // Update User
        this.app.put(
            `${endpoint}/userId/:userId`,
            userController.updateUserHandler
        );


        return this.app;
    }
}