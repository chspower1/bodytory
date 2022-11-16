import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "userSession",
    password: process.env.COOKIE_PASSWORD!,
  });
  if (!session.user && !req.url.includes("users/login") && !req.url.includes("users/help")) {
    return NextResponse.redirect(new URL("users/login", req.url));
  } else if (session.user && req.url.includes("users/login")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
