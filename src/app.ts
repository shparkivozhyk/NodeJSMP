import config from "./config/config.json";
import { DirWatcher, Importer, Product, User } from "./models";

console.log(config.name);

const user = new User();
const product = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher);

dirWatcher.watch(`${process.cwd()}/src/data`, 1000);
importer.listen();
