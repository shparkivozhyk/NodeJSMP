import { Request, Response } from "express";
import { db } from "../config/db";
import { ErrorMessages } from "../constants/ErrorMessages";

export const getProduct = (req: Request, res: Response) => {
  db.products.findById(req.params.product_id)
    .then((product: object) => {
      if (!product) {
        res.send(ErrorMessages.NOPRODUCT);
      }
      res.send(JSON.stringify(product));
    })
    .catch((error: object) => console.log("Error: ", error));
};

export const  getProducts = (req: Request, res: Response) => {
  db.products.findAll()
    .then((products: object) => res.send(JSON.stringify(products)))
    .catch((error: object) => res.send(ErrorMessages.NOPRODUCTS));
};

export const createProduct = (req: Request, res: Response) => {
  const { title, price, id, reviews, } = req.body;

  db.products.create({ title, price, id, reviews, })
    .then((product: object) => res.json(product))
    .catch((error: object) => console.log("Error:", error));
};

export const getReviews = (req: Request, res: Response) => {
  db.products.findById(req.params.product_id)
    .then((product: object) => {
      if (!product) {
        res.send(ErrorMessages.NOPRODUCT);
      }
      if (!product["reviews"]) {
        res.send(ErrorMessages.NOREVIEWS);
      }

      res.send(JSON.stringify(product["reviews"]));
    })
    .catch((error: object) => console.log("Error: ", error));
};
