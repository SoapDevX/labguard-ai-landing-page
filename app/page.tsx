import Simulator from "@/components/Simulator";
import WaitlistForm from "@/components/WaitlistForm";
import { site, team, isReal } from "@/data/site";

const steps = [
  ["Detect", "A vision model finds gloves, bare hands, lab coats, masks and goggles on every person in view."],
  ["Track", "Each person keeps an anonymous ID as they move between the zones you draw on the camera image."],
  ["Evaluate", "Your rules run on every update: where the person is, what they wear, and when they last changed gloves."],
  ["Alert", "A breach raises a prioritised alert with a snapshot. Staff acknowledge and resolve it, and the record is kept."],
];

const features: [string, string][] = [
  ["Live monitoring", "Watch several cameras at once, with boxes, PPE status per person and colour-coded clean and dirty zones."],
  ["PPE detection", "Tell gloved from bare hands, and check lab coats, masks and goggles, with a model fine-tuned for laboratories."],
  ["Zone and workflow rules", "Draw zones on the camera view, then set rules such as one-way flow and a glove change between areas."],
  ["Alerts and incidents", "Push and email alerts with a snapshot, severity, an acknowledge and resolve workflow, and an audit trail."],
  ["Compliance reports", "See compliance by zone, camera and shift, track violation trends, and export PDF reports for audits."],
  ["Your existing cameras", "Connect standard RTSP streams by URL. The dashboard works on mobile and can be installed for alerts."],
];

const rules: [string, string, string][] = [
  ["R1", "Person in the pre-PCR zone without gloves or lab coat", "High"],
  ["R2", "Bare hand over the bench or sample area in a clean zone", "High"],
  ["R3", "Moving from post-PCR to pre-PCR without a glove change", "Critical"],
  ["R4", "Mask missing in the sample-preparation zone", "Medium"],
  ["R5", "Violation continues beyond a set time after the first alert", "Escalation"],
];

const h2 = "font-display text-3xl font-bold tracking-tight sm:text-4xl";
const cta = "inline-flex min-h-[44px] items-center rounded-lg bg-clean px-6 font-semibold text-white hover:bg-ink";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <span className="font-display text-xl font-bold">{site.name}</span>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#rules">Rules</a>
          <a href="#privacy">Privacy</a>
          <a href="#team">Team</a>
          <a href="#waitlist" className="inline-flex min-h-[44px] items-center rounded-lg bg-clean px-4 text-white hover:bg-ink">
            Join the waitlist
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.02] tracking-tight">
              Know the moment a glove change gets skipped.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              LabGuard AI watches your pre-PCR and post-PCR areas through your cameras, follows each person between
              zones and alerts you when contamination protocol breaks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#waitlist" className={cta}>Join the waitlist</a>
              <a href="#how" className="inline-flex min-h-[44px] items-center rounded-lg border border-ink px-6 font-semibold hover:bg-ink hover:text-white">
                See how it works
              </a>
            </div>
            <p className="mt-6 max-w-lg text-sm text-muted">
              A university project by {site.group}, {site.module}, {site.university}.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm text-muted">Try it: walk the person between rooms, then change or remove their gloves.</p>
            <Simulator />
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_1.4fr]">
            <h2 className={h2}>One lapse can invalidate a run.</h2>
            <div className="space-y-5 text-lg text-muted">
              <p>PCR is sensitive enough that trace amplicon or skin DNA can ruin a reaction. Protocols depend on people, and nobody can watch every bench all day.</p>
              <p>Violations are usually discovered after false positives appear, and there is rarely a time-stamped record to show an auditor.</p>
            </div>
          </div>
        </section>

        <section id="how" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={h2}>From camera feed to compliance record</h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([t, d], i) => (
              <li key={t}>
                <span className="font-display text-5xl font-bold text-clean">{i + 1}</span>
                <h3 className="mt-2 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="features" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className={h2}>Everything a lab needs to stay compliant</h2>
            <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
              {features.map(([t, d]) => (
                <div key={t} className="border-t border-line pt-4">
                  <dt className="font-display text-xl font-bold">{t}</dt>
                  <dd className="mt-1 max-w-md text-muted">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="rules" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={h2}>Rules built for PCR workflow</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">Starter rules you can adapt to your laboratory’s own procedures.</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left">
              <caption className="sr-only">Example contamination rules and their severity</caption>
              <thead>
                <tr className="border-b-2 border-ink text-sm">
                  <th className="py-3 pr-4 font-semibold">Rule</th>
                  <th className="py-3 pr-4 font-semibold">What it catches</th>
                  <th className="py-3 font-semibold">Severity</th>
                </tr>
              </thead>
              <tbody>
                {rules.map(([id, text, sev]) => (
                  <tr key={id} className="border-b border-line">
                    <td className="py-4 pr-4 font-semibold">{id}</td>
                    <td className="py-4 pr-4">{text}</td>
                    <td className={`py-4 font-semibold ${sev === "Critical" ? "text-dirty" : sev === "High" ? "text-amber" : ""}`}>{sev}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section id="privacy" className="bg-ink py-20 text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
            <h2 className={h2}>A safety aid, not a surveillance tool.</h2>
            <ul className="space-y-4 text-lg text-white/85">
              <li>People are tracked by anonymous IDs. LabGuard AI does not recognise faces.</li>
              <li>Stored snapshots can have faces blurred.</li>
              <li>Humans review every alert, and deployments can follow local data protection law and your retention policy.</li>
              <li>
                This website stores only what you enter in the waitlist form and counts visits without cookies.{" "}
                <a href="/privacy" className="underline">Read the privacy notice</a>.
              </li>
            </ul>
          </div>
        </section>

        <section id="team" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={h2}>The team behind LabGuard AI</h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            LabGuard AI is a university project by {site.group} for {site.module} at {site.university}.
            Supervisor: {site.supervisor}.
          </p>
          <ul className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li key={m.name} className="border-t border-line pt-4">
                <p className="font-display text-xl font-bold">{m.name}</p>
                {isReal(m.linkedin) && (
                  <a href={m.linkedin} aria-label={`${m.name} on LinkedIn`} className="mt-1 inline-block text-sm underline">
                    LinkedIn profile
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="waitlist" className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className={h2}>Join the waitlist</h2>
            <p className="mb-8 mt-4 text-lg text-muted">
              LabGuard AI is a prototype. Leave your details and we will tell you about demos and progress.
              {isReal(site.email) && (
                <> You can also email us at <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.</>
              )}
            </p>
            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-8 gap-y-3 px-6 py-8 text-sm text-muted">
          <span>© 2026 {site.name} · {site.group}, {site.university}. University project prototype.</span>
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            {isReal(site.email) && <a href={`mailto:${site.email}`} className="underline">{site.email}</a>}
            {site.social.filter((s) => isReal(s.href)).map((s) => (
              <a key={s.label} href={s.href} className="underline">{s.label}</a>
            ))}
            <a href="/privacy" className="underline">Privacy notice</a>
          </span>
        </div>
      </footer>
    </>
  );
}