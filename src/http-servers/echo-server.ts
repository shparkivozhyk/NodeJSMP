import http from "http";
import querystring from "querystring";
import url from "url";

http.createServer()
  .on("request", (req, res) => {
    res.end(querystring.parse(url.parse(req.url).query).message);
  })
  .listen(3000);
