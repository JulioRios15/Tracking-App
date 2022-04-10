import express, {Request, Response} from 'express';
import RoutesConfig from "../../common/routes/routes.config";
import * as materialController from './controller/material.controller';


export default class ProjectRoutes extends RoutesConfig {
    constructor(app: express.Application){
        super(app, "Material Routes");
    }

    configureAdminRoutes(): express.Application {
        const endpoint = "/api/admin/materials";

        // Create new Material
        this.app.post(
            `${endpoint}/`,
            materialController.createMaterialHandler
        );
        
        // Query Material
        this.app.get(
            `${endpoint}/`,
            materialController.queryMaterialHandler
        );

        // Update Material
        this.app.put(
            `${endpoint}/materialId/:materialId`,
            materialController.updateMaterialHandler
        );

        //Delete Material
        this.app.delete(
            `${endpoint}/materialId/:materialId`,
            materialController.deleteMaterialHandler
        );

        return this.app;
    }

    configureUserRoutes(): express.Application {

        const endpoint ="/api/materials";

        // Create new Material
        this.app.post(
            `${endpoint}/`,
            materialController.createMaterialHandler
        );

        // Query Material
        this.app.get(
            `${endpoint}`,
            materialController.queryMaterialHandler
        );

        // Update Material
        this.app.put(
            `${endpoint}/materialId/:materialId`,
            materialController.updateMaterialHandler
        );

        return this.app;
    }
}