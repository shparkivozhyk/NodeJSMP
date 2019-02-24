import​​ app  ​from​​​ "./app"​;
import { db } from "./config/db";
import defaultConfig from "./config/defaultConfig.json";

const​​ appPort = process.env.PORT || defaultConfig.defaultPort​;

db.sequelize
  .sync()
  .then(() => {
    app.listen(appPort, () => ​console​.log(​`App listening on port ​${appPort}​!`​));
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
