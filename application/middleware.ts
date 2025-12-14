import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Keep middleware minimal and non-throwing on Vercel Edge.
  // Add permissive CORS headers required for cross-origin fonts/assets inside ChatGPT's widget sandbox.
  const res =
    request.method === "OPTIONS"
      ? new NextResponse(null, { status: 204 })
      : NextResponse.next();

  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "*");
  return res;
}

export const config = {
  matcher: "/:path*",
};
