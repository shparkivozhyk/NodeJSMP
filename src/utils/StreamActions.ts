import csvtojson from "csvtojson";
import fs from "fs";
import multistream from "multistream";
import path from "path";
import request from "request";
import through2 from "through2";
import { BundlerConstants, FileExtensions, InfoMessages } from "../constants";
import { checkFilePathValidity } from "./InputValidation";

interface StreamData {
  action: string;
  file?: string;
  path?: string;
}

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
    const fileInfo = path.parse(file);
    const filePath = `${fileInfo.dir}/${fileInfo.name}${FileExtensions.json}`;
    fs.createReadStream(file)
      .pipe(csvtojson())
      .pipe(fs.createWriteStream(filePath));
};

const cssBundler = (dirPath: string) => {
    checkFilePathValidity(dirPath);
    const cssFiles = fs.readdirSync(dirPath).filter((file) => {
      return path.extname(file) === FileExtensions.css;
    });

    const readStreams = [];
    cssFiles.forEach((file) => {
      readStreams.push(fs.createReadStream(`${dirPath}/${file}`));
    });

    readStreams.push(request(BundlerConstants.cssUrl));

    multistream(readStreams)
      .pipe(fs.createWriteStream(`${dirPath}/${BundlerConstants.bundlFileName}`));
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
