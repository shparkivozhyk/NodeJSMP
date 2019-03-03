import mongoose from "mongoose";
import mongoConfig from "./mongoConfig.json";

mongoose.connect(mongoConfig.mongodburi);

export const mongodb = mongoose.connection;
