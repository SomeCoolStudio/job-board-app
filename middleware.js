import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired((req) => {
  // Check if it's a preflight request (OPTIONS) or a fetch request for RSC payload
  const isPrefetch =
    req.nextUrl.searchParams.has("_rsc") ||
    (req.headers.get("Accept") &&
      req.headers.get("Accept").includes("text/x-component"));

  if (req.method === "OPTIONS" || isPrefetch) {
    const response = NextResponse.next();
    // Set CORS headers so that the browser accepts the response
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    return response;
  }
  // For all other requests, let the middleware do its default auth behavior.
  // (Returning nothing means the default handling is applied.)
});

export const config = {
  matcher: ["/new-job"],
};
