import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ROUTE_ACCESS: Record<string, string[]> = {
  "/dashboard": ["partner"],
  "/guardDoor": ["guardDoor"],
  "/guardBar": ["guardBar"],
};

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  if (!isAuth && req.nextUrl.pathname === "/") {
    const redirectUrl = new URL("/logIn", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAuth) {
    const redirectUrl = new URL("/logIn", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  const allowedRoles = ROUTE_ACCESS[req.nextUrl.pathname];

  if (allowedRoles && !allowedRoles.includes(role as string)) {
    const redirectUrl = new URL("/logIn", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/guardDoor", "/guardBar", "/"],
};
