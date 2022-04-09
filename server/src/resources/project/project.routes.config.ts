import express, {Request, Response} from 'express';
import RoutesConfig from "../../common/routes/routes.config";
import * as projectController from './controller/project.controller';


export default class ProjectRoutes extends RoutesConfig {
    constructor(app: express.Application){
        super(app, "Project Routes");
    }

    configureAdminRoutes(): express.Application {
        const endpoint = "/api/admin/projects";

        // Create new plant
        this.app.post(
            `${endpoint}/`,
            projectController.createProjectHandler
        );
        
        // Query Plants
        this.app.get(
            `${endpoint}/`,
            projectController.queryProjectHandler
        );

        // Update Plant
        this.app.put(
            `${endpoint}/projectId/:projectId`,
            projectController.updateProjectHandler
        );

        //Delete Plant
        this.app.delete(
            `${endpoint}/projectId/:projectId`,
            projectController.deleteProjectHandler
        );

        return this.app;
    }

    configureUserRoutes(): express.Application {

        const endpoint ="/api/projects";

        // Query Plants
        this.app.get(
            `${endpoint}`,
            projectController.queryProjectHandler
        );

        return this.app;
    }
}