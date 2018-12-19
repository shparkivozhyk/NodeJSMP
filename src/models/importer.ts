import { EventEmitter } from "events";
import fs from "fs";
import _ from "lodash";
import Papa from "papaparse";
import { promisify } from "util";

interface LoggingData {
  file: string;
  action: string;
  csv: string;
}

export class Importer {

  constructor (private eventEmitter: EventEmitter, private async: boolean = true) {}

  import (path: string): Promise<any> {
    const readDir = promisify(fs.readFile);
    return readDir(path, "utf8");
  }

  importSync (path: string): string {
    return fs.readFileSync(path, "utf8");
  }

  csvToJson (csv: string): object {
    return Papa.parse(csv, {header: true, });
  }

  logData (data: LoggingData ): void {
    console.log(`The file ${data.file} has been ${data.action}, data is `,
                this.csvToJson(data.csv));
  }

  listen (): void {
    this.eventEmitter.on("change", (data) => {
      _.keys(data).map(file => {
        if (this.async) {
          this.import(file)
            .then(csv => {
              this.logData({file, action: data[file], csv, });
            })
            .catch(error => {
              if (error.code === "ENOENT") {
                this.logData({file, action: data[file], csv: "[]", });
              }
            });
        } else {
          let csv: string;
          try {
            csv = this.importSync(file);
          } catch {
            csv = "[]";
          }
          this.logData({file, action: data[file], csv, });
        }
      });
    });
  }
}
