

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { DASHBOARD_URL, LOGIN_URL } from './config/routes'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Add detailed logging
  console.log('Middleware executing for path:', request.nextUrl.pathname);

  const tokenName = process.env.NODE_ENV === 'production'
    ? '__Host-next-auth.csrf-token'
    : 'next-auth.session-token';

  const token = request.cookies.get(tokenName)?.value;
  const userRole = request.cookies.get('user-role')?.value;

  console.log('Token name:', tokenName);
  console.log('Token exists:', !!token);
  console.log('All cookies:', request.cookies.getAll());
  console.log('User role:', userRole);

  if (!token) {
    console.log('No token found, redirecting to login');
    return NextResponse.redirect(new URL(LOGIN_URL, request.url));
  }

  if (userRole === 'admin') {
    console.log('Admin user detected, redirecting to dashboard');
    return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
  }

  console.log('No redirects triggered');
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/ticket-master/booking/:path*', '/airport-pick-up-drop-off/:path*', '/dedicated-rides/booking/:path*', '/checkout/:path*'],
}

