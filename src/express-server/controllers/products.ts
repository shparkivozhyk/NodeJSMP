import { Request, Response } from "express";
import { db } from "../config/db";
import { ErrorMessages } from "../constants/ErrorMessages";
import { IProduct } from "../interfaces";
import { Product } from "../mongomodels/product";

export const getProduct = (req: Request, res: Response) => {
  db.products.findById(req.params.product_id)
    .then((product: IProduct) => {
      if (!product) {
        res.send(ErrorMessages.NOPRODUCT);
      }
      res.send(JSON.stringify(product));
    })
    .catch((error: object) => console.log("Error: ", error));
};

export const  getProducts = (req: Request, res: Response) => {
  db.products.findAll()
    .then((products: IProduct) => res.send(JSON.stringify(products)))
    .catch((error: object) => res.send(ErrorMessages.NOPRODUCTS));
};

export const createProduct = (req: Request, res: Response) => {
  const { title, price, id, reviews, } = req.body;

  db.products.create({ title, price, id, reviews, })
    .then((product: IProduct) => res.json(product))
    .catch((error: object) => console.log("Error:", error));
};

export const getReviews = (req: Request, res: Response) => {
  db.products.findById(req.params.product_id)
    .then((product: IProduct) => {
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

export const getMongoProducts = (req: Request, res: Response) => {
  Product.find({}, (error: Error, products: IProduct[]) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(products);
  });
};

export const createMongoProduct = (req: Request, res: Response) => {
  const { id, title, price, reviews, } = req.body;

  Product.create({id, title, price, reviews, }, (error: Error, product: IProduct) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(product);
  });
};

export const getMongoProduct = (req: Request, res: Response) => {
  const { product_id, } = req.params;

  Product.findOne({id: product_id, }, (error: Error, product: IProduct) => {
    if (error) {
      console.error("Error", error);
    }

    if (!product) {
      res.send(ErrorMessages.NOPRODUCT);
      return;
    }

    res.send(product);
  });
};

export const getMongoReviews = (req: Request, res: Response) => {
  const { product_id, } = req.params;

  Product.findOne({id: product_id, }, (error: Error, product: IProduct) => {
    if (error) {
      console.error("Error", error);
    }

    if (!product) {
      res.send(ErrorMessages.NOPRODUCT);
      return;
    }

    if (!product["reviews"]) {
      res.send(ErrorMessages.NOREVIEWS);
      return;
    }

    res.send(product["reviews"]);
  });
};

export const deleteMongoProduct = (req: Request, res: Response) => {
  const { product_id, } = req.params;

  Product.findOneAndDelete({id: product_id, }, (error: Error, product: object) => {
    if (error) {
      console.error("Error", error);
    }

    res.send(product);
  });
};
