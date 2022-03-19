//Core
import express from "express";
import http from 'http';
import config from 'config';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import logger from './utils/logger';

// Core App
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: number = config.get<number>("port");

app.use(helmet());
app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    exposedHeaders: ['x-access-token']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

server.listen(port, async () => {
    logger.info(`server started at: http://localhost:${port}`); 
});