import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../../utils/jwt";
import logger from "../../utils/logger";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken, "accessTokenPublicKey");

  if (decoded) {
    res.locals.user = decoded;
    logger.info(res.locals.user, "[deserialize user] - res.locals.user");
  }

  return next();
};

export default deserializeUser;