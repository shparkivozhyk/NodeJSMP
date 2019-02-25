import bodyParser from "body-parser";
import express from "express";
import session from "express-session";
import passport from "passport";
import config from "./config/config.json";
import { parsedCookies, parsedQuery } from "./middlewares";
import { router } from "./routes";

const app = express();
app.use(parsedCookies);
app.use(parsedQuery);
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(session(config.sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

export default app;
