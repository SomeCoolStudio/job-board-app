import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired((req) => {
  // Determine if this request is a preflight or an RSC prefetch
  const secFetchMode = req.headers.get("sec-fetch-mode") || "";

  if (
    req.method === "OPTIONS" ||
    req.nextUrl.searchParams.has("_rsc") ||
    secFetchMode === "cors"
  ) {
    const response = NextResponse.next();
    // Set CORS headers for preflight responses if needed
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

  // For all other requests, proceed with the default auth behavior.
  // Returning nothing will let the middleware do its job.
});

export const config = {
  matcher: ["/new-job"],
};
