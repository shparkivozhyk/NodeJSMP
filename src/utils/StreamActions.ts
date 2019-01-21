import csvtojson from "csvtojson";
import fs from "fs";
import path from "path";
import request from "request";
import through2 from "through2";
import { BundlerConstants, FileExtensions } from "../constants";
import { checkFilePathValidity } from "./InputValidation";

interface StreamData {
  file?: string;
  path?: string;
}

export const actions = {
  reverse: () => {
    process.stdin
      .pipe(through2(function write (buffer, encoding, next) {
        this.push(buffer.toString().split("").reverse().join(""));
        this.push("\n");
        next();
      }))
      .pipe(process.stdout);
    },
  transform: () => {
    process.stdin
      .pipe(through2(function write (buffer, encoding, next) {
        this.push(buffer.toString().toUpperCase());
        next();
      }))
      .pipe(process.stdout);
    },
  outputFile: ({file, }: StreamData) => {
    checkFilePathValidity(file);
    fs.createReadStream(file)
      .pipe(process.stdout);
    },
  convertFromFile: ({file, }: StreamData) => {
      checkFilePathValidity(file);
      fs.createReadStream(file)
        .pipe(csvtojson())
        .pipe(process.stdout);
    },
  convertToFile: ({file, }: StreamData) => {
      checkFilePathValidity(file);
      const fileInfo = path.parse(file);
      const filePath = `${fileInfo.dir}/${fileInfo.name}${FileExtensions.json}`;
      fs.createReadStream(file)
        .pipe(csvtojson())
        .pipe(fs.createWriteStream(filePath));
    },
  cssBundler: ({path: dirPath, }: StreamData) => {
      checkFilePathValidity(dirPath);
      const writeStreamPath = `${dirPath}/${BundlerConstants.bundlFileName}`;
      const cssFiles = fs.readdirSync(dirPath).filter((file) => {
        return path.extname(file) === FileExtensions.css;
      });
      const readStreams = [];
      const writeStream = fs.createWriteStream(writeStreamPath, {"flags": "w+", });
      cssFiles.forEach((file) => {
        readStreams.push(fs.createReadStream(`${dirPath}/${file}`));
      });

      readStreams.forEach((readStream) => {
        readStream.pipe(writeStream);
      });

      writeStream.on("finish", () => {
        const newWriteStream = fs.createWriteStream(writeStreamPath, {"flags": "a+", });
        request(BundlerConstants.cssUrl).pipe(newWriteStream);
      });
    },
};
