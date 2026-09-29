import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminSessionIsValid } from "@/lib/admin-auth";

export function GET(request: NextRequest) {
  if (!adminSessionIsValid(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ publishingReady: false }, { headers: { "Cache-Control": "no-store" } });
}
