import { NextFunction, Request, Response } from "express";

export const parsedCookies = (req: Request, res: Response, next: NextFunction): void  => {
  if (req.cookies) {
    req.parsedCookies = req.cookies;
  }
  next();
};
