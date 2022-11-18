import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "userSession",
    password: process.env.COOKIE_PASSWORD!,
  });

  if (
    !session.user &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/help") &&
    !req.url.includes("/auth/register")
  ) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else if (session.user && (req.url.includes("auth/login") || req.url.includes("/auth/help"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
