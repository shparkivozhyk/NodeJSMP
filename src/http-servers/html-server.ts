import fs from "fs";
import http from "http";
import through2 from "through2";
import { Uri } from "../constants/UriConstants";

http.createServer()
  .on("request", (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
    });
    fs.createReadStream(Uri.HTMLTEMPLATEURI)
      .pipe(through2(function write (buffer, encoding, next) {
        this.push(buffer.toString().replace("{message}", "Hello, I am html server"));
        next();
      }))
      .pipe(res);
  })
  .listen(3000);
