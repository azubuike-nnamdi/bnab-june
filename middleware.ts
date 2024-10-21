

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOGIN_URL } from './config/routes'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Determine the correct cookie name based on the environment
  const tokenName = process.env.NODE_ENV === 'production'
    ? '__Host-next-auth.csrf-token'
    : 'next-auth.session-token'; // Use the correct token name for local development

  // Get the token from the appropriate cookie
  const token = request.cookies.get(tokenName)?.value;

  if (!token) return NextResponse.redirect(new URL(LOGIN_URL, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/ticket-master/booking/:path*', '/airport-pick-up-drop-off/booking/:path*', '/dedicated-rides/booking/:path*', '/checkout/:path*'],
}

