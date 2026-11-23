import type { Metadata } from "next";
import { site, isReal } from "@/data/site";

export const metadata: Metadata = { title: "Privacy notice | LabGuard AI" };

const h2 = "mt-10 font-display text-2xl font-bold";

export default function Privacy() {
  const contact = isReal(site.email) ? site.email : "[TEAM EMAIL]";
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-lg leading-relaxed">
      <a href="/" className="text-sm underline">Back to LabGuard AI</a>
      <h1 className="mt-6 font-display text-4xl font-bold tracking-tight">Privacy notice</h1>
      <p className="mt-4 text-muted">Last updated: [DATE]. This website is part of a university project by {site.group} ({site.university}, {site.module}).</p>

      <h2 className={h2}>Who we are</h2>
      <p className="mt-3">The student team of {site.group} runs this website for coursework. You can reach us at {contact}.</p>

      <h2 className={h2}>What we collect, and why</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6">
        <li><b>Waitlist form:</b> your name, email, and optionally your organisation and message. We use them to reply to you about demos and project progress, and to count sign-ups for our project assessment. We also store the time you agreed to this notice.</li>
        <li><b>Visit counts:</b> the page you opened, the site you came from, your device type (mobile, tablet or desktop) and a daily code made by scrambling your IP address and browser details with a secret. We never store the IP address, we set no cookies, and the code changes every day so we cannot follow you from one day to the next. We skip counting if your browser sends a Do Not Track signal. We use these counts to show visitor numbers in our project assessment.</li>
      </ul>

      <h2 className={h2}>Our legal basis</h2>
      <p className="mt-3">We process waitlist details with your consent, which you give by ticking the box on the form. Visit counts use no personal data we can identify. [CONFIRM applicable law with your supervisor: for example UK GDPR or the Sri Lanka Personal Data Protection Act.]</p>

      <h2 className={h2}>Who can see your data</h2>
      <p className="mt-3">Team members and, if required for assessment, our supervisor and assessors. We do not sell your data or use it for advertising. [CONFIRM hosting provider and country.]</p>

      <h2 className={h2}>How long we keep it</h2>
      <p className="mt-3">Until [RETENTION DATE, e.g. the end of the module assessment], then we delete waitlist details unless you ask us to keep you informed.</p>

      <h2 className={h2}>Your rights</h2>
      <p className="mt-3">You can ask us to show, correct or delete your details, or withdraw your consent, at any time by emailing {contact}. Withdrawing does not affect what we did before.</p>
    </main>
  );
}
