import fs from "fs";
import  minimist from "minimist";
import { ErrorMessages, InfoMessages } from "../constants";

export const checkInputValidity = (args: Array<string>) => {
  const argv = minimist(args);
  const action = argv.action || argv.a;
  const file = argv.file || argv.f;

  if (!args.length) {
    process.stdout.write(InfoMessages.WRONGINPUT);
    process.stdout.write(InfoMessages.HELP);
    return false;
  }

  if (args[0] === "--help" || args[0] === "-h") {
    process.stdout.write(InfoMessages.HELP);
    return false;
  }

  return true;
};

export const checkFilePathValidity = (path: string) => {
  if (!path) {
    throw new Error(ErrorMessages.MISSINGFILEPATH);
  }

  if (!fs.existsSync(path)) {
    throw new Error(ErrorMessages.WRONGFILEPATH);
  }
};
