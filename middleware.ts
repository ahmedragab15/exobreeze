import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;
  const token = req.cookies.get("token")?.value;
  const user = req.cookies.get("user")?.value;
  const hasCompletedQuestionnaire = user ? JSON.parse(user).hasCompletedQuestionnaire : false;

  const publicRoutes = ["/", "/login", "/register"];
  const firstTimeRoutes = ["/welcome-aboard", "/questionnaire/construction", "/questionnaire/individual"];
  const privateRoutes = ["/home", "/dashboard", "/map", "/mini-game", "/settings"];

  if (!token) {
    if (!publicRoutes.includes(path)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

    if (publicRoutes.includes(path)) {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }

  if (firstTimeRoutes.includes(path)) {
    if (hasCompletedQuestionnaire) {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (privateRoutes.includes(path) || path.startsWith("/location/")) {
    return NextResponse.next();
  }

  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/home",
    "/dashboard",
    "/location/:path*",
    "/map",
    "/mini-game",
    "/settings",
    "/welcome-aboard",
    "/questionnaire/:path*",
  ],
};
