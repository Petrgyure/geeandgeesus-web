import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminSessionIsValid, sameOrigin } from "@/lib/admin-auth";
import { publish, publishConfig, PublishError, snapshot } from "@/lib/admin-publish";

export const runtime = "nodejs";
const headers = { "Cache-Control": "private, no-store" };
function reply(body: object, status = 200) { return NextResponse.json(body, { status, headers }); }
function error(cause: unknown) {
  if (cause instanceof PublishError) return reply({ error: cause.message }, cause.status);
  return reply({ error: "Publishing service unavailable" }, 502);
}
export async function GET(request: NextRequest) {
  if (!adminSessionIsValid(request)) return reply({ error: "Unauthorized" }, 401);
  const config = publishConfig();
  if (!config) return reply({ error: "Publishing is not configured" }, 503);
  try { return reply(await snapshot(fetch, config.token, config.branch)); } catch (cause) { return error(cause); }
}
export async function POST(request: NextRequest) {
  if (!adminSessionIsValid(request)) return reply({ error: "Unauthorized" }, 401);
  if (!sameOrigin(request) || request.headers.get("sec-fetch-site") === "cross-site") return reply({ error: "Forbidden" }, 403);
  const config = publishConfig();
  if (!config) return reply({ error: "Publishing is not configured" }, 503);
  if (!/^application\/json(?:;|$)/i.test(request.headers.get("content-type") || "")) return reply({ error: "JSON required" }, 415);
  const length = Number(request.headers.get("content-length"));
  if (length > 250_000) return reply({ error: "Body too large" }, 413);
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ error: "Missing body" }, 400);
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > 250_000) { await reader.cancel(); return reply({ error: "Body too large" }, 413); }
      chunks.push(value);
    }
    const data = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!data || typeof data !== "object" || Array.isArray(data) || Object.keys(data).sort().join() !== "content,expectedHead,gallery") return reply({ error: "Invalid request" }, 400);
    return reply(await publish(fetch, config.token, config.branch, data));
  } catch (cause) {
    if (cause instanceof SyntaxError) return reply({ error: "Invalid JSON" }, 400);
    return error(cause);
  }
}
