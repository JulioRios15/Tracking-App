import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/http.exception";

export default function requireUser(req: Request, res: Response, next: NextFunction){
    const user = res.locals.user;

    if (!user) {
      return next(new HttpException(403, "unauthorized authentication is required"));
    }
  
    return next();
}