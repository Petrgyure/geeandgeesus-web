import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { sameOrigin, SESSION_COOKIE } from "@/lib/admin-auth";

export function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0, httpOnly: true, sameSite: "strict", secure: request.nextUrl.protocol === "https:" });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
