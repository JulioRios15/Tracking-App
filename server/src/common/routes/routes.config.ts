import express, {Request, Response} from 'express';

export abstract class RoutesConfig {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureAdminRoutes();
        this.configureUserRoutes();
    }
    getName() {
        return this.name;
    }

    abstract configureAdminRoutes(): express.Application;

    abstract configureUserRoutes(): express.Application;
}
