import { EventEmitter } from "events";
import fs from "fs";
import Papa from "papaparse";
import { promisify } from "util";

const readDir = promisify(fs.readFile);

interface LoggingData {
  file: string;
  action: string;
  csv: string;
}

export class Importer {

  constructor (private eventEmitter: EventEmitter, private async: boolean = true) {}

  private import (path: string): Promise<any> {
    return readDir(path, "utf8");
  }

  private importSync (path: string): string {
    return fs.readFileSync(path, "utf8");
  }

  private csvToJson (csv: string): object {
    return Papa.parse(csv, {header: true, });
  }

  private logData (data: LoggingData ): void {
    console.log(`The file ${data.file} has been ${data.action}, data is `,
                this.csvToJson(data.csv));
  }

  public listen (): void {
    this.eventEmitter.on("change", (data) => {
      Object.keys(data).map(file => {
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
