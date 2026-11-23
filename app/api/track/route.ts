import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { append } from "@/lib/store";

export const runtime = "nodejs";

// Cookie-free page-view counter. The IP address and browser string are never stored:
// they are hashed with a secret and the current date, so the hash changes every day.
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return new NextResponse(null, { status: 400 });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  const ua = req.headers.get("user-agent") ?? "";
  const day = new Date().toISOString().slice(0, 10);
  const vid = createHash("sha256")
    .update(`${process.env.ANALYTICS_SECRET ?? "dev-secret"}|${day}|${ip}|${ua}`)
    .digest("hex")
    .slice(0, 16);

  let ref = "";
  try { ref = new URL(String(b.ref)).host; } catch {}
  const w = Number(b.w) || 0;
  const device = w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop";

  await append("views.jsonl", {
    at: new Date().toISOString(), path: String(b.path ?? "/").slice(0, 100), ref, device, vid,
  });
  return new NextResponse(null, { status: 204 });
}
