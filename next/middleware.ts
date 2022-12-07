import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const latitude = req.geo?.latitude;
  const longitude = req.geo?.longitude;
  const session = await getIronSession(req, res, {
    cookieName: "userSession",
    password: process.env.COOKIE_PASSWORD!,
  });

  if (
    !session.user &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/help") &&
    !req.url.includes("/auth/register") &&
    !req.url.includes("/auth/choice") &&
    !req.url.includes("/lending") &&
    !req.url.includes("/hospital/login")
  ) {
    if (req.url.includes("/hospital/chart" && "/hospital/chart" && "/hospital"))
      return NextResponse.redirect(new URL("/hospital/login", req.url));
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else if (session.user && (req.url.includes("auth/login") || req.url.includes("/auth/help"))) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
