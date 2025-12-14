import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // No-op middleware.
  // We previously set CORS here, but Vercel Edge was returning MIDDLEWARE_INVOCATION_FAILED.
  // We now set required embed/CORS headers via next.config.ts headers() instead.
  return NextResponse.next();
}

export const config = {
  // Disable middleware matching entirely (Vercel Edge was returning MIDDLEWARE_INVOCATION_FAILED).
  // Required headers for embedding are now set in next.config.ts via the headers() config.
  matcher: "/__middleware_disabled__",
};