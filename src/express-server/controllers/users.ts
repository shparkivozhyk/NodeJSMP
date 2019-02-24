import { Request, Response } from "express";
import { db } from "../config/db";
import { ErrorMessages } from "../constants/ErrorMessages";

export const getUsers = (req: Request, res: Response) => {

  db.users.findAll()
    .then((users: []) => {
      if (!users.length) {
        res.send(ErrorMessages.NOUSERS);
      }
      res.send(JSON.stringify(users));
    })
    .catch((error: object) => console.log("Error: ", error));
};
