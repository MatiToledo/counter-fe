import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ROUTE_ACCESS: Record<string, string[]> = {
  "/dashboard": ["partner", "admin"],
  "/guardDoor": ["guardDoor"],
  "/guardBar": ["guardBar"],
};

export function middleware(req: NextRequest) {
  const isAuth = req.cookies.get("token")?.value;
  console.log("isAuth: ", isAuth);
  const subRole = req.cookies.get("subRole")?.value;
  const isAdmin = subRole === "partner" || subRole === "admin";
  console.log("isAdmin: ", isAdmin);
  if (!isAuth && req.nextUrl.pathname === "/") {
    const redirectUrl = new URL("/logIn", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuth && req.nextUrl.pathname === "/") {
    const path = isAdmin ? "/dashboard" : `/${subRole}`;
    const redirectUrl = new URL(path, req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAuth) {
    const redirectUrl = new URL("/logIn", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  const allowedRoles = ROUTE_ACCESS[req.nextUrl.pathname];

  if (allowedRoles && !allowedRoles.includes(subRole as string)) {
    const redirectUrl = new URL("/logIn", req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/guardDoor", "/guardBar", "/"],
};
