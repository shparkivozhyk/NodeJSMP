import​​ app  ​from​​​ "./app"​;
import defaultConfig from "./config/defaultConfig.json";
import { connectDbToApp } from "./helpers";
const​​ appPort = process.env.PORT || defaultConfig.defaultPort​;

connectDbToApp(app, appPort);
