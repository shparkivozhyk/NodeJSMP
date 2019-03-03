import​​ app  ​from​​​ "./app"​;
import { db } from "./config/db";
import defaultConfig from "./config/defaultConfig.json";
import { mongodb } from "./config/mongodb";

const​​ appPort = process.env.PORT || defaultConfig.defaultPort​;

mongodb.on("open", () => {
  console.log("Connection has been established successfully.");
  app.listen(appPort, () => ​console​.log(​`App listening on port ​${appPort}​!`​));
});
mongodb.on("error", (err) => console.error("Unable to conner to the database", err));

db.sequelize
  .sync()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
