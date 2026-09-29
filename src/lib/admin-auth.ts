import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "gg_admin_session";
const SESSION_SECONDS = 8 * 60 * 60;

function configured() {
  const password = process.env.ADMIN_PASSWORD;
  const key = process.env.ADMIN_SESSION_SECRET;
  return password && password.length >= 20 && key && key.length >= 32 ? { password, key } : null;
}

function sameDigest(a: string, b: string) {
  const first = createHash("sha256").update(a).digest();
  const second = createHash("sha256").update(b).digest();
  return timingSafeEqual(first, second);
}

export function passwordIsValid(candidate: string) {
  const settings = configured();
  return Boolean(settings && sameDigest(candidate, settings.password));
}

export function createAdminSession() {
  const settings = configured();
  if (!settings) throw new Error("Admin authentication is not configured");
  const expiry = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  const passwordVersion = createHash("sha256").update(settings.password).digest("hex");
  const message = `v1.${expiry}.${passwordVersion}`;
  const signature = createHmac("sha256", settings.key).update(message).digest("hex");
  return { value: `v1.${expiry}.${signature}`, maxAge: SESSION_SECONDS };
}

export function adminSessionIsValid(request: NextRequest) {
  const settings = configured();
  const value = request.cookies.get(SESSION_COOKIE)?.value;
  if (!settings || !value) return false;
  const parts = value.split(".");
  if (parts.length !== 3 || parts[0] !== "v1" || !/^\d{10,11}$/.test(parts[1]) || !/^[a-f0-9]{64}$/.test(parts[2])) return false;
  const expiry = Number(parts[1]);
  if (expiry <= Date.now() / 1000 || expiry > Date.now() / 1000 + SESSION_SECONDS) return false;
  const passwordVersion = createHash("sha256").update(settings.password).digest("hex");
  const message = `v1.${expiry}.${passwordVersion}`;
  const expected = createHmac("sha256", settings.key).update(message).digest("hex");
  return sameDigest(parts[2], expected);
}

export function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  return Boolean(origin && (origin === request.nextUrl.origin || (host && origin === `${request.nextUrl.protocol}//${host}`)));
}
