import minimist from "minimist";
import { checkInputValidity } from "./InputValidation";
import { launchAction } from "./StreamActions";

const args = process.argv.slice(2);

if (checkInputValidity(args)) {
  const argv = minimist(args);
  const action = argv.action || argv.a;
  const file = argv.file || argv.f;

  launchAction(action, file);
}
