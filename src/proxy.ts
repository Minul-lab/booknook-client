
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const pathname = request.nextUrl.pathname;

  // Redirect logged-in users away from authentication pages
  if (user && (pathname === "/log-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Protect private routes
  if (
    !user &&
    (
      pathname === "/add-book" ||
      pathname === "/my-books" ||
      pathname === "/my-borrows" ||
      pathname.startsWith('/books/')
    )
  ) {
    const loginUrl = new URL("/log-in", request.url);
    loginUrl.searchParams.set("reason", "login-required");

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/books/:path*",
    "/add-book/:path*",
    "/my-books/:path*",
    "/my-borrows/:path*",
    "/log-in",
    "/sign-up",
  ],
};
