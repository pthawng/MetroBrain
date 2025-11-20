import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 1. Define Protected Routes
const protectedRoutes = ['/booking'/*, '/ticket', '/tickets', '/profile'*/];

// 2. Define Public (Auth) Routes
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('metro_auth_token')?.value;

  // 3. User is already authenticated and visits Login/Register
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 4. User is NOT authenticated and visits Private Routes
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// 5. Specify matcher to run middleware only on relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
