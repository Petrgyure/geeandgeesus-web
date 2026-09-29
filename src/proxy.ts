import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminSessionIsValid } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/api/admin/login" || path === "/api/admin/logout") return NextResponse.next();
  if (!adminSessionIsValid(request)) {
    if (path.startsWith("/api/admin/")) return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  }
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/manage.html", "/api/admin/:path*"] };
