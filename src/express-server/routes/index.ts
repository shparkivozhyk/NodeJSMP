import { Router } from "express";
import { auth } from "../controllers/auth";
import * as products from "../controllers/products";
import * as users from "../controllers/users";
import { verifyJWT } from "../middlewares/verifyJWT";

export const router = Router();

router.route("/api/*")
  .get(verifyJWT);

router.route("/api/users")
  .get(users.getUsers);

  router.route("/api/products")
  .get(products.getProducts)
  .post(products.createProduct);

router.route("/api/products/:product_id")
  .get(products.getProduct);

router.route("/api/products/:product_id/reviews")
  .get(products.getReviews);

router.route("/auth")
  .post(auth);
