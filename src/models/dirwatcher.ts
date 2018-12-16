import EventEmitter from "events";
import fs  from "fs";
import _ from "lodash";
import { promisify } from "util";

const readDir = promisify(fs.readdir);

export class DirWatcher extends EventEmitter {
  timerId: any;
  files: string[];

  constructor() {
    super();
    this.timerId = undefined;
    this.files = [];
  }

  checkDir(path: any) {
    readDir(path)
      .then((files) => {
        const newFiles = _.difference(files, this.files);
        this.files = files;
        if (newFiles.length) {
          this.emit("change", {path, newFiles, });
        }
      });
  }

  watch(path: any, delay: number) {
    this.timerId = setInterval(() => {
      this.checkDir(path);
    }, delay);
  }

  unwatch() {
    this.timerId.unref();
  }
}
