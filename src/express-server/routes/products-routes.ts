import express from "express";
import * as products from "../controllers/products-controllers";

export const productsRouter = express.Router();

productsRouter.route("/api/products")
  .get((req, res) => {
    products.getProducts(req, res);
  })
  .post((req, res) => {
    products.createProduct(req, res);
  });

productsRouter.route("/api/products/:product_id")
  .get((req, res) => {
    products.getProduct(req, res);
  });

productsRouter.route("/api/products/:product_id/reviews")
  .get((req, res) => {
    products.getReviews(req, res);
  });
