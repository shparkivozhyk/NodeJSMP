import mongoose from "mongoose";
import mongoConfig from "./mongoConfig.json";

mongoose.set("useFindAndModify", false);
mongoose.connect(mongoConfig.mongodburi, mongoConfig.options);

export const mongodb = mongoose.connection;
