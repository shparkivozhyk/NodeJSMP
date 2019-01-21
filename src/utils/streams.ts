import minimist from "minimist";
import { InfoMessages } from "../constants";
import { checkInputValidity } from "./InputValidation";
import { actions } from "./StreamActions";

const args = process.argv.slice(2);

if (checkInputValidity(args)) {
  const argv = minimist(args);
  const action = argv.action || argv.a;
  const file = argv.file || argv.f;
  const path = argv.path || argv.p;

  if (!actions[action]) {
    process.stdout.write(InfoMessages.WRONGOPTION);
    process.stdout.write(InfoMessages.HELP);
  } else {
    actions[action]({file, path, });
  }
}
