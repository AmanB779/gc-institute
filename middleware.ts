import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    // Get the adminLoggedIn status from cookies
    const isAdminLoggedIn = request.cookies.has("adminLoggedIn") && request.cookies.get("adminLoggedIn")?.value === "true";

    // If not logged in, redirect to admin login
    if (!isAdminLoggedIn) {
      const loginUrl = new URL("/admin", request.url);
      const response = NextResponse.redirect(loginUrl);

      // Clear any invalid cookies
      response.cookies.delete("adminLoggedIn");

      return response;
    }
  }

  // If trying to access login page while already logged in, redirect to dashboard
  if (request.nextUrl.pathname === "/admin") {
    const isAdminLoggedIn = request.cookies.has("adminLoggedIn") && request.cookies.get("adminLoggedIn")?.value === "true";

    if (isAdminLoggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
