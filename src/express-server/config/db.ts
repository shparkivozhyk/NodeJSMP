import Sequelize from "sequelize";
import dbConfig from "../config/config.json";
import Product from "../models/product";
import User from "../models/user";

const { dialect, username, password, host, port , database, } = dbConfig.development;
const url = `${dialect}://${username}:${password}@${host}:${port}/${database}`;
const sequelize = new Sequelize(url);

export const db = {
  sequelize: sequelize,
  users: User(sequelize, Sequelize),
  products: Product(sequelize, Sequelize),
};
