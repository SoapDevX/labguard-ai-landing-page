"use client";
import { FormEvent, useState } from "react";

export default function WaitlistForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = new FormData(e.currentTarget);
    const body = {
      name: f.get("name"), email: f.get("email"), org: f.get("org"), message: f.get("message"),
      website: f.get("website"), consent: f.get("consent") === "on",
    };
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      });
      if (res.ok) return setState("done");
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      setState("error");
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      setState("error");
    }
  }

  if (state === "done")
    return (
      <p role="status" className="text-lg font-medium">
        You are on the waitlist. We will email you when there is news about LabGuard AI.
      </p>
    );

  const field = "mt-1 w-full rounded-lg border border-ink/40 bg-white px-3 py-2.5 min-h-[44px]";
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-medium">Name
        <input name="name" required autoComplete="name" maxLength={100} className={field} /></label>
      <label className="text-sm font-medium">Email
        <input name="email" type="email" required autoComplete="email" maxLength={200} className={field} /></label>
      <label className="text-sm font-medium sm:col-span-2">Laboratory or organisation (optional)
        <input name="org" autoComplete="organization" maxLength={150} className={field} /></label>
      <label className="text-sm font-medium sm:col-span-2">What would you like to monitor? (optional)
        <textarea name="message" rows={3} maxLength={1000} className={field} /></label>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className="flex items-start gap-3 text-sm sm:col-span-2">
        <input name="consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0" />
        <span>
          I agree to LabGuard AI storing my details to contact me about the waitlist, as described in the{" "}
          <a href="/privacy" className="underline">privacy notice</a>.
        </span>
      </label>
      <div className="sm:col-span-2">
        <button disabled={state === "sending"}
          className="min-h-[44px] rounded-lg bg-clean px-6 py-3 font-semibold text-white hover:bg-ink disabled:opacity-60">
          {state === "sending" ? "Sending…" : "Join the waitlist"}
        </button>
        {state === "error" && <p role="alert" className="mt-3 text-sm text-dirty">{error}</p>}
      </div>
    </form>
  );
}
