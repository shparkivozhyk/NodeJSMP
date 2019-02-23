import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { find } from "lodash";
import passport from "passport";
import config from "../config/config.json";
import { ErrorCodes, ErrorMessages } from "../constants";
import { AuthError, errorResponse, successResponse } from "../helpers";

export const auth = (req: Request, res: Response) => {

  const {email, password, } = req.body;
  const user = find(config.users, (user) => user.email === email);

  if (!user) {
    res.json(errorResponse({
      "code": ErrorCodes.NOTFOUND,
      "message": ErrorMessages.NOTFOUND,
      "extendedMessage": ErrorMessages.NOUSER,
    }));
  }

  if (user.password !== password) {
    res.json(errorResponse({
      "code": ErrorCodes.NOTFOUND,
      "message": ErrorMessages.NOTFOUND,
      "extendedMessage": ErrorMessages.INCORRECTPASSWORD,
    }));
  }

  const token = jwt.sign({email, password, }, config.jwtSecret);

  res.json(successResponse({
    "username": user.username,
    "email": user.email,
    token,
  }));
};

export const passportAuth = (social: string) => (req: Request, res: Response) => {
  passport.authenticate(social, (err, user) => {
    if (err) {
      throw AuthError.failedAuth(social, err);
    }

    res.json(successResponse({
      "email": user.email,
      "username": user.displayName,
    }));
  })(req, res);
};
