import csvtojson from "csvtojson";
import fs from "fs";
import  minimist from "minimist";
import through2 from "through2";

const argv = minimist(process.argv.slice(2));

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
    fs.createReadStream(filePath)
      .pipe(process.stdout);
};

const convertFromFile = (filePath: string) => {
    fs.createReadStream(filePath)
      .pipe(csvtojson())
      .pipe(process.stdout);
};

const convertToFile = (filePath: string) => {
    fs.createReadStream(filePath)
      .pipe(csvtojson())
      .pipe(fs.createWriteStream(filePath.replace("csv", "json")));
};

const action = argv.action || argv.a;
const file = argv.file || argv.f;

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
}
