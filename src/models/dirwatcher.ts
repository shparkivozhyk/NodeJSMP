import EventEmitter from "events";
import fs  from "fs";
import { isEmpty, union } from "lodash";
import { promisify } from "util";

const readDir = promisify(fs.readdir);
const stat = promisify(fs.stat);

enum FileStatus {
  ADDED = "added",
  MODIFIED = "modified",
  DELETED = "deleted",
 }

export class DirWatcher extends EventEmitter {
  private timerId: any;
  private fileTempStatistics: object = {};
  private fileStatistics: object = {};

  constructor() {
    super();
  }

  private checkStatus(file: string): object {
    const fileLastModified = this.fileStatistics[file];
    const fileTimestamp = this.fileTempStatistics[file];

    if (!fileLastModified) {
      return {[file]: FileStatus.ADDED, };
    } else if (!fileTimestamp) {
      return {[file]: FileStatus.DELETED, };
    } else if (fileTimestamp !== fileLastModified) {
      return {[file]: FileStatus.MODIFIED, };
    }
  }

  private checkDir(path: any) {
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
              union(files, Object.keys(this.fileStatistics))
                .map(file => {
                  changedFiles = {...changedFiles, ...this.checkStatus(file), };
                });

              this.fileStatistics = Object.assign({}, this.fileTempStatistics);
              this.fileTempStatistics = {};
              if (!isEmpty(changedFiles)) {
                this.emit("change", changedFiles);
              }
            });
        });
  }

  public watch(path: any, delay: number): void {
    this.timerId = setInterval(() => {
      this.checkDir(path);
    }, delay);
  }

  public unwatch(): void {
    this.timerId.unref();
  }
}
