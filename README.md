# LabGuard AI landing page

University project website (Group CS 91). Next.js 14 (App Router), TypeScript, Tailwind CSS.

## Run

    npm install
    cp .env.example .env.local     # then set ADMIN_KEY and ANALYTICS_SECRET
    npm run dev                    # http://localhost:3000

Production: `npm run build && npm start`.

## What to edit

- `data/site.ts`: university, module, supervisor, team names and roles, contact email, GitHub and LinkedIn links. Values containing `[` are placeholders and are hidden as links until you replace them.
- `app/privacy/page.tsx`: fill in the [BRACKETED] items (date, retention, applicable law, hosting). Have your supervisor check it.
- `app/page.tsx`: page copy.

## Waitlist and analytics

- Sign-ups are saved by `/api/waitlist` to `.data/waitlist.jsonl`, one JSON record per line.
- Visit counts are saved by `/api/track` to `.data/views.jsonl`. No cookies are used, IP addresses are not stored, and Do Not Track is respected.
- For the viva, open `http://localhost:3000/admin?key=YOUR_ADMIN_KEY` to show page views, daily unique visitors, devices, referrers and sign-ups.
- `.data` is git-ignored so personal data never reaches the repo. Back it up before your assessment.
- The files live on the server's disk. Run the site on a laptop, a VPS, or a host with a persistent disk (set `DATA_DIR`). Serverless hosts such as Vercel have no persistent disk, so on those you would swap `lib/store.ts` for a database.

## Team repository

    git init
    git add .
    git commit -m "LabGuard AI landing page"
    git branch -M main
    git remote add origin https://github.com/[ORG]/[REPO].git
    git push -u origin main

Never commit `.env.local` or `.data`.
