//Core
import express from "express";
import http from 'http';
import config from 'config';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import connectToDatabase from "./utils/connection";
import logger from './utils/logger';

//Middleware
import errorHandler from "./common/middlewares/errorHandler";

//Routes
import RoutesConfig from "./common/routes/routes.config";
import PlantRoutes from './resources/plant/plant.routes.config';
import UserRoutes from './resources/user/user.routes.config';

// Core App
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = config.get<number>("port");
const appRoutes: Array<RoutesConfig> = [];

app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    exposedHeaders: ['x-access-token']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

// Routes Config
appRoutes.push(new PlantRoutes(app));
appRoutes.push(new UserRoutes(app));

//Error handler
app.use(errorHandler);

server.listen(port, async () => {
    logger.info(`server started at: http://localhost:${port}`); 

    //Connect to mongo database
    await connectToDatabase();

    appRoutes.forEach((route: RoutesConfig) => {
        logger.info(`Routes configured for - ${route.getName()}`);
    });
});