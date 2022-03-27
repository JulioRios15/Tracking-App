import { Request, Response, NextFunction } from "express";
import HttpException from "../../../common/exceptions/http.exception";
import { get } from "lodash";
import { verifyJwt } from "../../../utils/jwt";
import * as sessionService from '../service/session.service';
import { findUserByEmail, findUserById } from "../../user/service/user.service";
import logger from "../../../utils/logger";

export async function createSessionHandler(
    req: Request,
    res: Response,
    next: NextFunction
){

    try {
    const message = "Invalid credentials";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if(!user){
        return next(new HttpException(401, message));
    }

    const isValid = await user.validatePassword(password);

    if(!isValid){
        return next(new HttpException(401, message))
    }

    const userAgent = req.get("user-agent") || "Undefined";
    const ipAddress = req.connection.remoteAddress || "Undefined";
    const newSession = await sessionService.createSession(user._id, userAgent, ipAddress);

    if(!newSession || newSession.errors){
        return next(new HttpException(401, "Unable to create session"));
    }

    const accessToken = sessionService.signAccessToken(user, newSession._id);
    const refreshToken = sessionService.signRefreshToken(newSession._id);

    return res.status(201).json({accessToken, refreshToken});

    } catch (e: any) {
        logger.error(e, e.message);
        return next( new HttpException(500, e.message));
    }
    
}

export async function refreshAccessTokenHandler(    
    req: Request,
    res: Response,
    next: NextFunction
){
    const refreshToken = get(req, "headers.x-refresh");

    const decoded = verifyJwt<{ sessionId: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );
  
    if (!decoded) {
      return res.status(401).send("Could not refresh access token");
    }
  
    const session = await sessionService.findSessionById(decoded.sessionId);
  
    if (!session || !session.valid) {
      return res.status(401).send("Could not refresh access token");
    }
  
    const user = await findUserById(String(session.user));
  
    if (!user) {
      return res.status(401).send("Could not refresh access token");
    }
  
    const accessToken = sessionService.signAccessToken(user, session._id);
  
    return res.status(200).json({accessToken});
}


export async function getUserValidSessionsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const userId = res.locals.user._id;
    const userSessions = await sessionService.findUserValidSessions(userId);
    return res.status(200).json(userSessions);

   
  } catch (e: any) {
    return next(new HttpException(500, "Unable to get sessions"));
  }
}

export async function deleteUserSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const sessionId = res.locals.user.sessionId;
    await sessionService.disableSessionById(sessionId);

    return res.status(200).json({
      accessToken: null,
      refreshToken: null
    });

   
  } catch (e: any) {
    return next(new HttpException(500, "Unable to get sessions"));
  }
}

