declare namespace Express {
  interface Request {
      parsedCookies?: string;
      parsedQuery?: string;
  }
}
