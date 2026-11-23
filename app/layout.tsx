import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import Analytics from "@/components/Analytics";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "LabGuard AI: contamination-risk monitoring for PCR labs",
  description:
    "LabGuard AI is a university project that watches pre-PCR and post-PCR areas through standard cameras, tracks people between zones and alerts staff when contamination protocol is broken.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
