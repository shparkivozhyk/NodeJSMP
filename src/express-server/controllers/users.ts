import { Request, Response } from "express";
import { ErrorMessages } from "../constants/ErrorMessages";
import users from "../data/users.json";

export const getUsers = (req: Request, res: Response) => {
  if (!Object.keys(users).length) {
    res.send(ErrorMessages.NOUSERS);
  }

  res.send(JSON.stringify(users));
};
