import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createAdminSession, passwordIsValid, sameOrigin, SESSION_COOKIE } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!/^application\/x-www-form-urlencoded(?:;|$)/i.test(request.headers.get("content-type") || ""))
    return NextResponse.json({ error: "Form required" }, { status: 415 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 4096) return NextResponse.json({ error: "Too large" }, { status: 413 });
  const reader = request.body?.getReader();
  if (!reader) return NextResponse.json({ error: "Form required" }, { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 4096) { await reader.cancel(); return NextResponse.json({ error: "Too large" }, { status: 413 }); }
      chunks.push(value);
    }
  } catch { return NextResponse.json({ error: "Invalid form" }, { status: 400 }); }
  const form = new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
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
