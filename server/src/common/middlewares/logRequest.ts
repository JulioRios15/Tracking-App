import {Request, Response, NextFunction} from 'express';
import logger from "../../utils/logger";

function logRequest(req: Request, res: Response, next: NextFunction){
    logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`)

    res.on("finish", function onFinish(){
        logger.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`)
    });

    next();
}

export default logRequest