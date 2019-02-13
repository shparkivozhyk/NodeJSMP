import { Request, Response } from "express";
import { find } from "lodash";
import { ErrorMessages } from "../constants/ErrorMessages";
import products from "../data/products.json";

export const getProduct = (req: Request, res: Response) => {
  const product = find(products, {product_id: req.params.product_id, });

  if (!product) {
    res.send(ErrorMessages.NOPRODUCT);
  }
  res.send(JSON.stringify(product));
};

export const  getProducts = (req: Request, res: Response) => {
  if (!products.length) {
    res.send(ErrorMessages.NOPRODUCTS);
  }

  res.send(JSON.stringify(products));
};

export const createProduct = (req: Request, res: Response) => {
  const newProduct = {
    "product_id": String(products.length + 1),
    "reviews": [],
  };
  products.push(newProduct);
  res.send(JSON.stringify(newProduct));
};

export const getReviews = (req: Request, res: Response) => {
  const product = find(products, {product_id: req.params.product_id, });

  if (!product) {
    res.send(ErrorMessages.NOPRODUCT);
  }
  if (!product["reviews"]) {
    res.send(ErrorMessages.NOREVIEWS);
  }

  res.send(JSON.stringify(product["reviews"]));
};
