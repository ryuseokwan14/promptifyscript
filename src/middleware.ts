import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./infrastructure/auth/session.util";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewati static assets, internal Next.js, dan images
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/logo.svg")
  ) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(sessionCookie);
  const isAuthenticated = Boolean(session);

  // 1. Jika pengguna sudah login dan mencoba mengakses /login, redirect ke generator dashboard /
  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // 2. Jika pengguna belum login dan mengakses halaman terproteksi, redirect ke /login
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     * - logo.svg
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};
