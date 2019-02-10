import querystring from "querystring";
import url from "url";

export const parsedQuery = (req: any, res: any, next: Function): void  => {
  req.parsedQuery = querystring.parse(url.parse(req.url).query);
  next();
};
