import config from "./config";
import { Product, User } from "./models";

console.log((<any>config).name);

const user = new User();
const product = new Product();
