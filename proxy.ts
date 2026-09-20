import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (request.nextUrl.pathname === "/market") {
    url.pathname = "/market/live";
  }

  if (request.nextUrl.pathname === "/alerts") {
    url.pathname = "/alerts/live";
  }

  if (request.nextUrl.pathname === "/watchlist") {
    url.pathname = "/watchlist/live";
  }

  if (request.nextUrl.pathname === "/profile") {
    url.pathname = "/profile/live";
  }

  if (request.nextUrl.pathname === "/settings") {
    url.pathname = "/settings/live";
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/market", "/alerts", "/watchlist", "/profile", "/settings"],
};
