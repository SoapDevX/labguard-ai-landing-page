import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { append } from "@/lib/store";

export const runtime = "nodejs";
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (b.website) return NextResponse.json({ ok: true }); // honeypot: bots fill this hidden field

  const name = String(b.name ?? "").trim().slice(0, 100);
  const email = String(b.email ?? "").trim().slice(0, 200);
  const org = String(b.org ?? "").trim().slice(0, 150);
  const message = String(b.message ?? "").trim().slice(0, 1000);

  if (!name || !EMAIL.test(email))
    return NextResponse.json({ error: "Enter your name and a valid email." }, { status: 400 });
  if (b.consent !== true)
    return NextResponse.json({ error: "Please tick the consent box." }, { status: 400 });

  await append("waitlist.jsonl", {
    id: randomUUID(), at: new Date().toISOString(), name, email, org, message, consent: true,
  });
  return NextResponse.json({ ok: true });
}
