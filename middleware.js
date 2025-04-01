import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextResponse } from "next/server";

export default withMiddlewareAuthRequired((req) => {
  // Bypass preflight requests or RSC fetches
  if (
    req.method === "OPTIONS" ||
    req.nextUrl.searchParams.has("_rsc") ||
    req.headers.get("access-control-request-method") ||
    (req.headers.get("Accept") &&
      req.headers.get("Accept").includes("text/x-component"))
  ) {
    return NextResponse.next();
  }
  // Otherwise, proceed with the default authentication logic.
});

export const config = {
  matcher: ["/new-job"],
};
