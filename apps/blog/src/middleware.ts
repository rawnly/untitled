import { NextMiddleware, NextResponse } from "next/server";

const middleware: NextMiddleware = async (req, ev) => {
  const hostname = req.nextUrl.hostname;

  const res = NextResponse.next();

  // inject preview header
  if (/^preview\./.test(hostname)) {
    res.headers.set("x-preview", "true");
  }

  if (process.env.NODE_ENV !== "production") {
    res.headers.set("x-dev", "true");
  }

  return res;
};

export default middleware;
