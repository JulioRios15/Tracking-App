import express from 'express';
import requireUser from '../../common/middlewares/requireUser';
import RoutesConfig from "../../common/routes/routes.config";
import * as sessionController from './controller/session.controller';


export default class SessionRoutes extends RoutesConfig {
    constructor(app: express.Application){
        super(app, "Session Routes");
    }

    configureAdminRoutes(): express.Application {
        const endpoint = "/api/admin/sessions";

        //TODO: 
        // Query Sessions

        // Update Session

        // Delete Session


        return this.app;
    }

    configureUserRoutes(): express.Application {

        const endpoint ="/api/sessions";

        // Create User Session
        this.app.post(
            `${endpoint}/`,
            sessionController.createSessionHandler
        );

        // Refresh Access Token
        this.app.post(
            `${endpoint}/refresh`, 
            sessionController.refreshAccessTokenHandler
        );

        // Get User Valid Sessions  
        this.app.get(
            `${endpoint}/`,
            requireUser,
            sessionController.getUserValidSessionsHandler
        );
        
        // Delete User Session
        this.app.delete(
            `${endpoint}/`,
            requireUser,
            sessionController.deleteUserSession
        ); 

        return this.app;
    }
}