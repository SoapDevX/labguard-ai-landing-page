import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#F2F6F5", ink: "#0E2229", muted: "#4A5E65", line: "#C9D7D4",
        clean: "#0F7B6C", cleanTint: "#DDEEEA", dirty: "#B93A26", dirtyTint: "#F6E1DC", amber: "#8A5A00",
      },
      fontFamily: { display: ["var(--font-display)", "sans-serif"], body: ["var(--font-body)", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
