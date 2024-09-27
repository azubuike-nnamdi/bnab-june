import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { LOGIN_URL } from './config/routes'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let token = request.cookies.get('next-auth.session-token')?.value

  console.log('token', token)
  if (!token) return NextResponse.redirect(new URL(LOGIN_URL, request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/ticket-master/:path*'],
}