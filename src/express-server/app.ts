import express from "express";
import { parsedCookies, parsedQuery } from "./middlewares";
import { router } from "./routes";

const app = express();
app.use(parsedCookies);
app.use(parsedQuery);
app.use(router);

export default app;
