import { Router } from "express";
import passport from "passport";
import { useStrategies } from "../config/strategies";
import { auth, passportAuth } from "../controllers/auth";
import * as cities from "../controllers/cities";
import * as products from "../controllers/products";
import * as users from "../controllers/users";
import { verifyJWT } from "../middlewares/verifyJWT";

useStrategies();

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

router.route("/auth/local")
  .post(passportAuth("local"));

router.route("/auth/facebook")
  .get(passport.authenticate("facebook"));

router.route("/auth/facebook/callback")
  .get(passportAuth("facebook"));

router.route("/auth/twitter")
  .get(passport.authenticate("twitter"));

router.route("/auth/twitter/callback")
  .get(passportAuth("twitter"));

router.route("/auth/google")
  .get(passport.authenticate("google", { scope: ["email", "profile"], }));

router.route("/auth/google/callback")
  .get(passportAuth("google"));

router.route("/auth/github")
  .get(passport.authenticate("github"));

router.route("/auth/github/callback")
  .get(passportAuth("github"));

router.route("/mongo/api/random")
  .get(cities.getRandomCity);

router.route("/mongo/api/cities")
  .get(cities.getAllCities)
  .post(cities.createCity);

router.route("/mongo/api/users")
  .get(users.getMongoUsers)
  .post(users.createMongoUser);

router.route("/mongo/api/products")
  .get(products.getMongoProducts)
  .post(products.createMongoProduct);

router.route("/mongo/api/products/:product_id")
  .get(products.getMongoProduct);

router.route("/mongo/api/products/:product_id/reviews")
  .get(products.getMongoReviews);
