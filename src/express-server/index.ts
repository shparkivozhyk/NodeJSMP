import​​ app  ​from​​​ "./app"​;
import defaultConfig from "./config/defaultConfig.json";

const​​ port = process.env.PORT || defaultConfig.defaultPort​;

app.listen(port, () => ​console​.log(​`App listening on port ​${port}​!`​));
