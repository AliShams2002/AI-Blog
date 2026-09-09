import { NextResponse } from "next/server";
import { getUserProfile } from "./services/UserService";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  // Handle login page - redirect authenticated users
  if (pathname === "/login") {
    // Not authenticated → allow access to login page
    if (!token) {
      return NextResponse.next();
    }

    // Token exists → verify user profile
    const result = await getUserProfile();

    // Invalid/expired token → allow access to login page
    if (!result.success) {
      return NextResponse.next();
    }

    // User is already logged in → redirect to appropriate page based on role
    const user = result.data;

    const redirectUrl = user.role === "admin" ? "/admin/dashboard" : "/";

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Protect admin routes
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify user profile for admin access
  const result = await getUserProfile();

  if (!result.success) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = result.data;

  // Only allow admin users to access admin routes
  if (user.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
