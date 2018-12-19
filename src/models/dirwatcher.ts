import EventEmitter from "events";
import fs  from "fs";
import _ from "lodash";
import { promisify } from "util";

const readDir = promisify(fs.readdir);
const stat = promisify(fs.stat);

enum FileStatus {
  ADDED = "added",
  MODIFIED = "modified",
  DELETED = "deleted",
 }

export class DirWatcher extends EventEmitter {
  timerId: any;
  files: string[];
  fileTempStatistics: object;
  fileStatistics: object;

  constructor() {
    super();
    this.timerId = undefined;
    this.files = [];
    this.fileStatistics = {};
    this.fileTempStatistics = {};
  }

  checkStatus(file: string): object {
    const fileLastModified = this.fileStatistics[file],
          fileTimestamp = this.fileTempStatistics[file];

    if (!fileLastModified) {
      return {[file]: FileStatus.ADDED, };
    } else if (!fileTimestamp) {
      return {[file]: FileStatus.DELETED, };
    } else if (fileTimestamp !== fileLastModified) {
      return {[file]: FileStatus.MODIFIED, };
    }
  }

  checkDir(path: any) {
    return readDir(path)
      .then((files) => {
          const fileTempStatistics = files.map(file => stat(`${path}/${file}`)
                .then(stat => {
                  this.fileTempStatistics[`${path}/${file}`] = stat.mtime.valueOf();
                  return `${path}/${file}`;
                }));

          Promise.all(fileTempStatistics)
            .then((files) => {
              let changedFiles = {};
              _.union(files, _.keys(this.fileStatistics))
                .map(file => {
                  changedFiles = _.assign(changedFiles, this.checkStatus(file));
                });

              this.fileStatistics = _.assign({}, this.fileTempStatistics);
              this.fileTempStatistics = {};
              if (!_.isEmpty(changedFiles)) {
                this.emit("change", changedFiles);
              }
            });
        });
  }

  watch(path: any, delay: number): void {
    this.timerId = setInterval(() => {
      this.checkDir(path);
    }, delay);
  }

  unwatch(): void {
    this.timerId.unref();
  }
}
