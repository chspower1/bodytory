import { getIronSession } from "iron-session/edge";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "userSession",
    password: process.env.COOKIE_PASSWORD!,
  });
/*   if (req.url.includes("/users/records/write/add") || req.url.includes("/users/records/write/analysis")) {
    if (!req.nextUrl.search.includes("position")) return NextResponse.redirect(new URL("/", req.url));
  } */

  if (
    !session.user &&
    !req.url.includes("/auth/login") &&
    !req.url.includes("/auth/help") &&
    !req.url.includes("/auth/register") &&
    !req.url.includes("/auth/choice") &&
    !req.url.includes("/landing") &&
    !req.url.includes("/hospital/login") &&
    !req.url.includes("/about/team") &&
    !req.url.includes("/about/bodytory")
  ) {
    if (req.url.includes("/hospital/chart" && "/hospital/chart" && "/hospital"))
      return NextResponse.redirect(new URL("/hospital/login", req.url));
    return NextResponse.redirect(new URL("/landing", req.url));
  } else if (
    session.user &&
    (req.url.includes("auth/login") ||
      req.url.includes("/auth/help") ||
      (req.url.includes("/auth/register") && !req.url.includes("/success")))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|static).*)"],
};
