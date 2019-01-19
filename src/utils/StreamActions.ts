import csvtojson from "csvtojson";
import fs from "fs";
import through2 from "through2";
import { InfoMessages } from "../constants";
import { checkFilePathValidity } from "./InputValidation";


const reverse = () => {
  process.stdin
    .pipe(through2(function write (buffer, encoding, next) {
      this.push(buffer.toString().split("").reverse().join(""));
      this.push("\n");
      next();
    }))
    .pipe(process.stdout);
};

const transform = () => {
  process.stdin
    .pipe(through2(function write (buffer, encoding, next) {
      this.push(buffer.toString().toUpperCase());
      next();
    }))
    .pipe(process.stdout);
};

const outputFile = (filePath: string) => {
    checkFilePathValidity(filePath);
    fs.createReadStream(filePath)
      .pipe(process.stdout);
};

const convertFromFile = (filePath: string) => {
    checkFilePathValidity(filePath);
    fs.createReadStream(filePath)
      .pipe(csvtojson())
      .pipe(process.stdout);
};

const convertToFile = (filePath: string) => {
    checkFilePathValidity(filePath);
    fs.createReadStream(filePath)
      .pipe(csvtojson())
      .pipe(fs.createWriteStream(filePath.replace("csv", "json")));
};

export const launchAction = (action: string, file?: string) => {
  switch (action) {
    case "reverse":
      reverse();
      break;

    case "transform":
      transform();
      break;

    case "outputFile":
      outputFile(file);
      break;

    case "convertFromFile":
      convertFromFile(file);
      break;

    case "convertToFile":
      convertToFile(file);
      break;

    default:
      process.stdout.write(InfoMessages.WRONGOPTION);
      process.stdout.write(InfoMessages.HELP);
  }
};
