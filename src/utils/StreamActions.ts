import csvtojson from "csvtojson";
import fs from "fs";
import multistream from "multistream";
import path from "path";
import request from "request";
import through2 from "through2";
import { InfoMessages } from "../constants";
import { checkFilePathValidity } from "./InputValidation";

interface StreamData {
  action: string;
  file?: string;
  path?: string;
}
const cssUrl = "https://drive.google.com/uc?export=download&id=1A0u_YB_7Pg3Q1qygQ547EedNxRS1Zu6k";
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

const outputFile = (file: string) => {
    checkFilePathValidity(file);
    fs.createReadStream(file)
      .pipe(process.stdout);
};

const convertFromFile = (file: string) => {
    checkFilePathValidity(file);
    fs.createReadStream(file)
      .pipe(csvtojson())
      .pipe(process.stdout);
};

const convertToFile = (file: string) => {
    checkFilePathValidity(file);
    fs.createReadStream(file)
      .pipe(csvtojson())
      .pipe(fs.createWriteStream(file.replace("csv", "json")));
};

const cssBundler = (dirPath: string) => {
    checkFilePathValidity(dirPath);
    const cssFiles = fs.readdirSync(dirPath).filter((file) => {
      return path.extname(file) === ".css";
    });

    const readStreams = [];
    cssFiles.forEach((file) => {
      readStreams.push(fs.createReadStream(`${dirPath}/${file}`));
    });

    readStreams.push(request(cssUrl));

    multistream(readStreams).pipe(fs.createWriteStream(`${dirPath}/bundle.css`));
};

export const launchAction = ({action, file, path, }: StreamData) => {
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

    case "cssBundler":
      cssBundler(path);
      break;

    default:
      process.stdout.write(InfoMessages.WRONGOPTION);
      process.stdout.write(InfoMessages.HELP);
  }
};
