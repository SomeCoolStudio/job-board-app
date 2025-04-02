import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired((req) => {
  const secFetchDest = req.headers.get("sec-fetch-dest") || "";

  // Bypass middleware if:
  // - It's a preflight request (OPTIONS)
  // - It includes the _rsc parameter (for RSC prefetch)
  // - The request isn't for a full document (e.g. background fetches)
  if (
    req.method === "OPTIONS" ||
    req.nextUrl.searchParams.has("_rsc") ||
    secFetchDest !== "document"
  ) {
    const response = NextResponse.next();
    // You can optionally set CORS headers here if needed
    response.headers.set(
      "Access-Control-Allow-Origin",
      req.headers.get("origin") || "*"
    );
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }

  // For document requests, proceed with default authentication behavior.
  // Not returning anything here lets the middleware apply its default logic.
});

export const config = {
  matcher: ["/new-job"],
};
