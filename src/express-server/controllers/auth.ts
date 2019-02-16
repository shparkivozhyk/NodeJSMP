import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { find } from "lodash";
import config from "../config/config.json";
import { ErrorCodes, ErrorMessages } from "../constants";
import { errorResponse, successResponse } from "../helpers/responses";

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
