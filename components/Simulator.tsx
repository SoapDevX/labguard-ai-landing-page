"use client";
import { useRef, useState } from "react";

type Zone = "clean" | "dirty";
type Sev = "Critical" | "High" | "Info";
type Ev = { id: number; sev: Sev; text: string };

const sevStyle: Record<Sev, string> = {
  Critical: "bg-dirty text-white",
  High: "bg-amber text-white",
  Info: "bg-line text-ink",
};

export default function Simulator() {
  const [zone, setZone] = useState<Zone>("clean");
  const [gloves, setGloves] = useState(true);
  const [changed, setChanged] = useState(true); // gloves changed since last time in the dirty zone
  const [log, setLog] = useState<Ev[]>([]);
  const n = useRef(0);

  const push = (sev: Sev, text: string) =>
    setLog((l) => [{ id: n.current++, sev, text }, ...l].slice(0, 4));

  const violation = zone === "clean" && (!changed || !gloves);
  const ring = zone === "dirty" ? "#B93A26" : violation ? "#8A5A00" : "#0F7B6C";

  function move() {
    if (zone === "clean") {
      setZone("dirty");
      setChanged(false);
      push("Info", "Person 1 entered post-PCR. A glove change is now required before returning.");
    } else {
      setZone("clean");
      if (!changed) push("Critical", "R3: moved from post-PCR to pre-PCR without a glove change.");
      else push("Info", "Person 1 returned to pre-PCR after a glove change.");
      if (!gloves) push("High", "R1: no gloves in the pre-PCR zone.");
    }
  }
  function changeGloves() {
    setGloves(true);
    setChanged(true);
    push("Info", "Glove change recorded for Person 1.");
  }
  function removeGloves() {
    setGloves(false);
    if (zone === "clean") push("High", "R1: no gloves in the pre-PCR zone.");
    else push("Info", "Gloves removed for Person 1.");
  }
  function reset() {
    setZone("clean"); setGloves(true); setChanged(true); setLog([]);
  }

  const btn = "min-h-[44px] rounded-lg border border-ink px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-white";

  return (
    <div className="rounded-2xl border border-line bg-white p-4 sm:p-6">
      <svg viewBox="0 0 560 250" className="w-full" role="img"
        aria-label={`Top-down plan of two rooms. Person 1 is in the ${zone === "clean" ? "pre-PCR" : "post-PCR"} room.`}>
        <rect x="8" y="8" width="262" height="234" rx="10" fill="#DDEEEA" stroke="#0F7B6C" strokeWidth="2.5" />
        <rect x="290" y="8" width="262" height="234" rx="10" fill="#F6E1DC" stroke="#B93A26" strokeWidth="2.5" />
        <text x="24" y="36" fontSize="15" fontWeight="700" fill="#0F7B6C">Pre-PCR (clean)</text>
        <text x="306" y="36" fontSize="15" fontWeight="700" fill="#B93A26">Post-PCR (dirty)</text>
        <path d="M262 125h36" stroke="#0E2229" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M292 119l8 6-8 6" fill="none" stroke="#0E2229" strokeWidth="2" />
        <text x="280" y="108" fontSize="11" textAnchor="middle" fill="#4A5E65">one-way</text>
        <g className="motion-safe:transition-transform motion-safe:duration-700"
          style={{ transform: `translateX(${zone === "clean" ? 0 : 282}px)` }}>
          <circle cx="140" cy="150" r="24" fill="#fff" stroke={ring} strokeWidth="5" />
          <text x="140" y="156" fontSize="15" fontWeight="700" textAnchor="middle" fill="#0E2229">P1</text>
          <text x="140" y="196" fontSize="12" textAnchor="middle" fill="#0E2229">
            {gloves ? "gloved" : "bare hands"}
          </text>
        </g>
      </svg>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className={btn} onClick={move}>
          Walk to {zone === "clean" ? "post-PCR" : "pre-PCR"}
        </button>
        <button className={btn} onClick={changeGloves}>Change gloves</button>
        <button className={btn} onClick={removeGloves}>Take gloves off</button>
        <button className="min-h-[44px] px-3 text-sm font-medium text-muted underline" onClick={reset}>Reset</button>
      </div>

      <ul aria-live="polite" className="mt-4 min-h-[9rem] space-y-2 text-sm">
        {log.length === 0 && <li className="text-muted">Walk the person between rooms and watch the rules respond.</li>}
        {log.map((e) => (
          <li key={e.id} className="flex items-start gap-3">
            <span className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${sevStyle[e.sev]}`}>{e.sev}</span>
            <span>{e.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
