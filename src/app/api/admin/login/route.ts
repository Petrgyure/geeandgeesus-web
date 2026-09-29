import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAdminSession, passwordIsValid, sameOrigin, SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 4096) return NextResponse.json({ error: "Too large" }, { status: 413 });
  const form = await request.formData();
  const password = form.get("password");
  if (typeof password !== "string" || password.length > 256 || !passwordIsValid(password)) {
    return NextResponse.redirect(new URL("/admin/login?error=1", request.url), 303);
  }
  const session = createAdminSession();
  const response = NextResponse.redirect(new URL("/manage.html", request.url), 303);
  response.cookies.set(SESSION_COOKIE, session.value, {
    httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "strict", path: "/", maxAge: session.maxAge,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
