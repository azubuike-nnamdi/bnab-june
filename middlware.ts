// lib/middleware/ipMiddleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { isLocalhost, rateLimit } from './lib/rate-limit';
import { appEnv } from './lib/helper';
import { troll } from './lib/troll';

export async function middleware(req: NextRequest, next: () => Promise<NextResponse>) {

  // Apply rate limit rule for /api/:path* routes with some exceptions
  if (shouldApplyRateLimitRule(req)) {
    await rateLimit(req)
  }

  // Apply the fair API usage rule for /api/:path* routes with some exceptions
  if (shouldApplyFairApiUsageRule(req)) {
    return new NextResponse(JSON.stringify({ message: troll() }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('remote-address') ?? '';

  // Ensure IP is a valid string
  const extractedIp = ip.split(',')[0].trim();

  // Add IP to headers
  const res = NextResponse.next();
  res.headers.set('x-client-ip', extractedIp);

  return res;


}



function shouldApplyRateLimitRule(req: NextRequest): boolean {
  const { pathname } = req.nextUrl

  const apiException = ['/api/v1/fulfilment', '/api/v1/fulfilment/ipn']

  return pathname.startsWith('/api/') && !apiException.some((path) => pathname.startsWith(path))
}


function shouldApplyFairApiUsageRule(req: NextRequest): boolean {
  // Extract the IP address from the request headers, prioritizing 'x-real-ip' and 'X-Forwarded-For'.
  const ip = req.headers.get('x-real-ip') ?? req.headers.get('X-Forwarded-For') ?? 'unknown-ip'
  const origin = req.headers.get('origin')
  const referer = req.headers.get('referer')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  // Check if the application environment is set to 'production',
  // if the rate limit rule should be applied for the given request,
  // if the IP address is not localhost,
  // and if the origin and referer of the request is not the same as the site url,
  // If all conditions are true, return true; otherwise, return false.
  return (
    appEnv('production') &&
    shouldApplyRateLimitRule(req) &&
    !isLocalhost(ip) &&
    origin !== siteUrl &&
    referer?.split('/')[2] !== siteUrl?.split('/')[2]
  )
}