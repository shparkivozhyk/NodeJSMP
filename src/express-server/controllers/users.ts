import { Request, Response } from "express";
import { db } from "../config/db";
import { ErrorMessages } from "../constants/ErrorMessages";
import { IUser } from "../interfaces";
import { User } from "../mongomodels/user";

export const getUsers = (req: Request, res: Response) => {

  db.users.findAll()
    .then((users: IUser[]) => {
      if (!users.length) {
        res.send(ErrorMessages.NOUSERS);
      }
      res.send(JSON.stringify(users));
    })
    .catch((error: object) => console.log("Error: ", error));
};

export const createMongoUser = (req: Request, res: Response) => {
  const { username, email, password, } = req.body;

  User.create({username, email, password, }, (error: Error, user: IUser) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(user);
  });
};

export const getMongoUsers = (req: Request, res: Response) => {
  User.find({}, (error: Error, users: IUser[]) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(users);
  });
};
