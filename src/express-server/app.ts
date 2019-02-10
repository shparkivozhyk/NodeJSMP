import express from "express";
import { parsedCookies, parsedQuery } from "./middlewares";
import { productsRouter, usersRouter } from "./routes";

const app = express();
app.use(parsedCookies);
app.use(parsedQuery);
app.use(productsRouter);
app.use(usersRouter);

export default app;
