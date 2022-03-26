import express, {Request, Response} from 'express';
import RoutesConfig from "../../common/routes/routes.config";
import * as plantController from './controller/plant.controller';


export default class PlantRoutes extends RoutesConfig {
    constructor(app: express.Application){
        super(app, "Plant Routes");
    }

    configureAdminRoutes(): express.Application {
        const endpoint = "/api/admin/plants";

        // Create new plant
        this.app.post(
            `${endpoint}/`,
            plantController.createPlantHandler
        );
        
        // Query Plants
        this.app.get(
            `${endpoint}/`,
            plantController.queryPlantHandler
        );

        // Update Plant
        this.app.put(
            `${endpoint}/plantId/:plantId`,
            plantController.updatePlantHandler
        );

        //Delete Plant
        this.app.delete(
            `${endpoint}/plantId/:plantId`,
            plantController.deletePlantHandler
        );

        return this.app;
    }

    configureUserRoutes(): express.Application {

        const endpoint ="/api/plants";

        // Query Plants
        this.app.get(
            `${endpoint}`,
            plantController.queryPlantHandler
        );

        return this.app;
    }
}