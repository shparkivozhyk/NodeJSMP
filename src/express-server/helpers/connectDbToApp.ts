import { Application } from "express";
import minimist from "minimist";
import { db } from "../config/db";
import { mongodb } from "../config/mongodb";
import { DB, DbMessages } from "../constants/DbConstants";

const args = process.argv.slice(2);
const argv = minimist(args);

export const connectDbToApp = (app: Application, appPort: string) => {
    const selectedDb = argv.db;
    if (selectedDb === DB.MONGO || !selectedDb) {
        mongodb.on("open", () => {
            console.log(DbMessages.SUCCESSMESSAGE);
            app.listen(appPort, () => {
            ​   console​.log(​`${DbMessages.APPISLISTENING} ​${appPort}​!`​);
            });
          });
          mongodb.on("error", (err) => console.error(DbMessages.ERRORMESSAGE, err));
    }

    if (selectedDb === DB.SQL) {
        db.sequelize
        .sync()
        .then(() => {
            console.log(DbMessages.SUCCESSMESSAGE);
            app.listen(appPort, () => {
                ​console​.log(​`${DbMessages.APPISLISTENING} ​${appPort}​!`​);
            });
        })
        .catch(err => {
            console.error(DbMessages.ERRORMESSAGE, err);
        });
    }
};