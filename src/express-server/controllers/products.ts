import { Request, Response } from "express";
import { db } from "../config/db";
import { ErrorMessages } from "../constants/ErrorMessages";
import { Product } from "../interfaces";

export const getProduct = (req: Request, res: Response) => {
  db.products.findById(req.params.product_id)
    .then((product: Product) => {
      if (!product) {
        res.send(ErrorMessages.NOPRODUCT);
      }
      res.send(JSON.stringify(product));
    })
    .catch((error: object) => console.log("Error: ", error));
};

export const  getProducts = (req: Request, res: Response) => {
  db.products.findAll()
    .then((products: Product) => res.send(JSON.stringify(products)))
    .catch((error: object) => res.send(ErrorMessages.NOPRODUCTS));
};

export const createProduct = (req: Request, res: Response) => {
  const { title, price, id, reviews, } = req.body;

  db.products.create({ title, price, id, reviews, })
    .then((product: Product) => res.json(product))
    .catch((error: object) => console.log("Error:", error));
};

export const getReviews = (req: Request, res: Response) => {
  db.products.findById(req.params.product_id)
    .then((product: Product) => {
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
