import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import { isMatch } from "lodash";
import userConfig from "../config/config.json";
import { ErrorCodes, ErrorMessages } from "../constants";
import { errorResponse } from "../helpers/responses";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("x-access-token");

  if (!token) {
    res.json(errorResponse({
      "code": ErrorCodes.NOTFOUND,
      "message": ErrorMessages.NOTFOUND,
      "extendedMessage": ErrorMessages.NOTOKEN,
    }));
  }

  jwt.verify(token, userConfig.jwtSecret, function (error: Error, decoded: Object) {
    if (error) {
      res.json(errorResponse({
        "code": ErrorCodes.NOTFOUND,
        "message": ErrorMessages.NOTFOUND,
        "extendedMessage": ErrorMessages.NOTVERIFIEDTOKEN,
      }));
    }

    if (!isMatch(decoded, userConfig.userCreds)) {
      res.json(errorResponse({
        "code": ErrorCodes.NOTFOUND,
        "message": ErrorMessages.NOTFOUND,
        "extendedMessage": ErrorMessages.NOTVERIFIEDTOKEN,
      }));
    }

    next();
  });
};
