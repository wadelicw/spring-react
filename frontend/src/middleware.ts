import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export const config = { matcher: ["/profile", "/search", "/checkout", "/checkout/(.*)"] };

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = new Headers(request.headers);
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + JSON.stringify(token));
  }

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  return response;
};