import { EventEmitter } from "events";
import fs from "fs";
import Papa from "papaparse";
import { promisify } from "util";

export class Importer {
  eventEmitter: EventEmitter;
  async: boolean;

  constructor (eventEmitter: EventEmitter, async: boolean = true) {
    this.eventEmitter = eventEmitter;
    this.async = async;
  }

  import (path: string): PromiseLike<any> {
    const readDir = promisify(fs.readFile);
    return readDir(path, "utf8");
  }

  importSync (path: string) {
    return fs.readFileSync(path, "utf8");
  }

  csvToJson (csv: string) {
    return Papa.parse(csv, {header: true, });
  }

  listen () {
    this.eventEmitter.on("change", (data) => {
      data.newFiles.map(file => {
        if (this.async) {
          this.import(`${data.path}/${file}`)
            .then(csv => {
              console.log(this.csvToJson(csv));
            });
        } else {
          console.log(this.csvToJson(this.importSync(`${data.path}/${file}`)));
        }
      });
    });
  }
}
