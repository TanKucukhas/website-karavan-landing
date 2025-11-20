import createMiddleware from 'next-intl/middleware';
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from './i18n/routing';

// Create the i18n middleware
const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle admin routes first (before i18n)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Check for admin session cookie
    const adminSession = request.cookies.get("admin-session");

    if (!adminSession) {
      // Redirect to login if not authenticated
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Apply i18n middleware for all non-admin routes
  if (!pathname.startsWith("/admin")) {
    return intlMiddleware(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
