import { readAll } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin", robots: { index: false, follow: false } };

type View = { at: string; path: string; ref: string; device: string; vid: string };
type Signup = { at: string; name: string; email: string; org?: string };

const count = (items: string[]) => {
  const m = new Map<string, number>();
  items.forEach((i) => m.set(i, (m.get(i) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

export default async function Admin({ searchParams }: { searchParams: { key?: string } }) {
  const key = process.env.ADMIN_KEY;
  if (!key || searchParams.key !== key)
    return (
      <main className="mx-auto max-w-xl p-8">
        <h1 className="font-display text-2xl font-bold">Admin</h1>
        <p className="mt-3">Set ADMIN_KEY in .env.local, restart, then open /admin?key=YOUR_KEY.</p>
      </main>
    );

  const views = await readAll<View>("views.jsonl");
  const signups = await readAll<Signup>("waitlist.jsonl");
  const visitorsOf = (v: View[]) => new Set(v.map((x) => x.at.slice(0, 10) + x.vid)).size;

  const days = Array.from({ length: 7 }, (_, i) => new Date(Date.now() - i * 864e5).toISOString().slice(0, 10));
  const cell = "border-b border-line py-2 pr-4";

  return (
    <main className="mx-auto max-w-4xl space-y-10 p-8">
      <h1 className="font-display text-3xl font-bold">LabGuard AI: visitors and sign-ups</h1>

      <dl className="grid grid-cols-3 gap-4 text-center">
        <div className="rounded-xl bg-white p-4"><dt className="text-sm text-muted">Page views</dt><dd className="font-display text-4xl font-bold">{views.length}</dd></div>
        <div className="rounded-xl bg-white p-4"><dt className="text-sm text-muted">Daily unique visitors</dt><dd className="font-display text-4xl font-bold">{visitorsOf(views)}</dd></div>
        <div className="rounded-xl bg-white p-4"><dt className="text-sm text-muted">Waitlist sign-ups</dt><dd className="font-display text-4xl font-bold">{signups.length}</dd></div>
      </dl>

      <section>
        <h2 className="font-display text-xl font-bold">Last 7 days</h2>
        <table className="mt-3 w-full text-left">
          <thead><tr><th className={cell}>Date</th><th className={cell}>Views</th><th className={cell}>Visitors</th><th className={cell}>Sign-ups</th></tr></thead>
          <tbody>
            {days.map((d) => {
              const v = views.filter((x) => x.at.startsWith(d));
              return (
                <tr key={d}>
                  <td className={cell}>{d}</td><td className={cell}>{v.length}</td>
                  <td className={cell}>{visitorsOf(v)}</td>
                  <td className={cell}>{signups.filter((s) => s.at.startsWith(d)).length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold">Devices</h2>
          <ul className="mt-3">{count(views.map((v) => v.device)).map(([k, n]) => <li key={k}>{k}: {n}</li>)}</ul>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold">Top referrers</h2>
          <ul className="mt-3">
            {count(views.map((v) => v.ref).filter(Boolean)).slice(0, 5).map(([k, n]) => <li key={k}>{k}: {n}</li>)}
          </ul>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl font-bold">Latest sign-ups</h2>
        <ul className="mt-3 space-y-1">
          {signups.slice(-10).reverse().map((s) => (
            <li key={s.at + s.email}>{s.at.slice(0, 16).replace("T", " ")} · {s.name} · {s.email}{s.org ? ` · ${s.org}` : ""}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
