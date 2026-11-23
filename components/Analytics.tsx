"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Analytics() {
  const path = usePathname();
  useEffect(() => {
    if (path.startsWith("/admin") || navigator.doNotTrack === "1") return; // respect Do Not Track
    const body = JSON.stringify({ path, ref: document.referrer, w: window.innerWidth });
    navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
  }, [path]);
  return null;
}
