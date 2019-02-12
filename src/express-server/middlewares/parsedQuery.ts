import { NextFunction, Request, Response } from "express";

export const parsedQuery = (req: Request, res: Response, next: NextFunction): void  => {
  req.parsedQuery = req.query;
  next();
};
