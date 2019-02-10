import cookieParser from "cookie-parser";

export const parsedCookies = (req: any, res: any, next: Function): void  => {
  if (req.headers.cookies) {
    req.parsedCookies = cookieParser.JSONCookies(req.headers.cookies);
  }
  next();
};
