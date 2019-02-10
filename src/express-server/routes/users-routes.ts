import express from "express";
import * as users from "../controllers/users-controllers";

export const usersRouter = express.Router();

usersRouter.route("/api/users")
  .get((req, res) => {
    users.getUsers(req, res);
  });
