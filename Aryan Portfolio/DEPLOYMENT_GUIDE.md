# Deploying Your Portfolio Live — for Free

This guide takes you from "code on my laptop" to "live on the internet" using
only free tiers. You need three pieces, deployed separately:

| Piece                | What it is                  | Where it lives (free)         |
|-----------------------|------------------------------|----------------------------------|
| Frontend (React)      | The site people see          | **Vercel**                       |
| Backend (Spring Boot) | The REST API                 | **Render**                       |
| Database (PostgreSQL) | Your data                    | **Neon** (free serverless Postgres) |

Total cost: **$0**. Total time: 30–60 minutes the first time.

---

## 0. Before you start

You'll need free accounts on:
- [GitHub](https://github.com) — you already have this
- [Neon](https://neon.tech) — free Postgres, sign in with GitHub
- [Render](https://render.com) — free backend hosting, sign in with GitHub
- [Vercel](https://vercel.com) — free frontend hosting, sign in with GitHub

Push this whole project to a GitHub repo first (or two repos — one for
`portfolio-backend/`, one for `portfolio-frontend/` — either works, but two
repos is simpler for the free-tier auto-deploy hooks below).

```bash
cd portfolio-backend
git init && git add . && git commit -m "Initial backend"
git remote add origin https://github.com/<you>/portfolio-backend.git
git push -u origin main

cd ../portfolio-frontend
git init && git add . && git commit -m "Initial frontend"
git remote add origin https://github.com/<you>/portfolio-frontend.git
git push -u origin main
```

---

## 1. Database — Neon (free PostgreSQL)

Neon's free tier has no hard expiry (unlike some others that reset after
90 days), which is why it's the pick here.

1. Go to neon.tech → **New Project**. Name it `portfolio`, pick a region
   close to you.
2. On the project dashboard, copy the **connection string**. It looks like:
   ```
   postgresql://<user>:<password>@<host>/<dbname>?sslmode=require
   ```
3. You'll translate this into three separate values for Spring Boot:
   - `DATABASE_URL` → `jdbc:postgresql://<host>/<dbname>?sslmode=require`
     (note the `jdbc:` prefix, and drop the `<user>:<password>@` part)
   - `DATABASE_USERNAME` → `<user>`
   - `DATABASE_PASSWORD` → `<password>`

Keep this tab open — you'll paste these into Render next.

---

## 2. Backend — Render (free web service)

1. Go to render.com → **New** → **Web Service** → connect your
   `portfolio-backend` GitHub repo.
2. Render will detect the `Dockerfile` automatically. If asked:
   - **Environment**: Docker
   - **Region**: pick one close to you
   - **Instance type**: Free
3. Add environment variables (Render → your service → **Environment**):
   | Key | Value |
   |---|---|
   | `DATABASE_URL` | from Neon, step 1 |
   | `DATABASE_USERNAME` | from Neon, step 1 |
   | `DATABASE_PASSWORD` | from Neon, step 1 |
   | `FRONTEND_ORIGIN` | your Vercel URL — you can update this after step 3, it doesn't need to be right immediately |
4. Click **Create Web Service**. Render builds the Docker image and deploys it.
   First build takes a few minutes. Flyway will automatically create your
   tables and seed your project/skill/certification data on first boot.
5. Once live, Render gives you a URL like `https://portfolio-backend-xxxx.onrender.com`.
   Test it: open `https://<your-url>/api/projects` in a browser — you should
   see JSON with your three projects.

**Free-tier caveat:** Render's free web services spin down after 15 minutes
of no traffic and take ~30–50 seconds to wake back up on the next request.
That's fine for a portfolio (recruiters clicking around won't usually hit
this more than once), but don't be alarmed by a slow first load.

---

## 3. Frontend — Vercel

1. Go to vercel.com → **Add New** → **Project** → import your
   `portfolio-frontend` GitHub repo.
2. Vercel auto-detects Vite. Leave build settings as default
   (`npm run build`, output directory `dist`).
3. Add an environment variable:
   | Key | Value |
   |---|---|
   | `VITE_API_BASE_URL` | your Render backend URL from step 2, e.g. `https://portfolio-backend-xxxx.onrender.com` (no trailing slash) |
4. Click **Deploy**. In under a minute you'll get a live URL like
   `https://portfolio-frontend-xxxx.vercel.app`.

---

## 4. Connect them (fix CORS)

Go back to **Render → your backend → Environment**, and set
`FRONTEND_ORIGIN` to your actual Vercel URL from step 3
(e.g. `https://portfolio-frontend-xxxx.vercel.app`). Save — Render
redeploys automatically. This is what allows your frontend's browser
requests to reach your backend without being blocked by CORS.

Reload your Vercel site. Projects, skills, and certifications should now
load from your live database, and the contact form should actually save
messages (check by querying your Neon database, or by adding an admin
endpoint later).

---

## 5. Custom domain (optional, still free)

- Vercel gives you a free `<name>.vercel.app` subdomain — good enough for
  most portfolios and resumes.
- If you own a real domain (e.g. from Namecheap/GoDaddy), you can point it
  at Vercel for free: **Vercel → your project → Settings → Domains** → add
  your domain → follow the DNS instructions (usually one `CNAME` record).
- Avoid "free domain" services like Freenom — they've had reliability and
  trust issues; a `.vercel.app` link on your resume looks perfectly fine.

---

## 6. Keeping it live

- **Auto-deploys**: both Render and Vercel redeploy automatically every
  time you `git push` to `main`. That's your whole CI/CD pipeline for free.
- **Free-tier limits to know**:
  - Render free web services sleep after inactivity (see caveat above).
  - Neon free tier has a monthly compute-hour allowance — a low-traffic
    portfolio won't come close to hitting it.
  - Vercel's free tier has generous bandwidth limits, way more than a
    portfolio site needs.
- **Monitoring**: Render and Vercel both show build/deploy logs in their
  dashboards if something breaks — check there first.

---

## Quick troubleshooting

| Symptom | Likely cause |
|---|---|
| Frontend loads but shows "Couldn't load projects" | `VITE_API_BASE_URL` wrong, or backend still asleep (wait ~40s and refresh) |
| Browser console shows a CORS error | `FRONTEND_ORIGIN` on Render doesn't match your exact Vercel URL |
| Backend fails to start on Render | Check `DATABASE_URL` format — must start with `jdbc:postgresql://` and include `?sslmode=require` for Neon |
| Contact form submits but nothing happens | Check Render logs for validation errors, or that the `contact_messages` table exists (Flyway should've created it automatically) |

---

## Things worth knowing beyond hosting

- **Flyway migrations are one-way in production** — once `V1__init_schema.sql`
  has run against your live database, don't edit it. Add new changes as
  `V3__...sql`, `V4__...sql`, etc.
- **Never commit real secrets** — the `.env` and any local `application-*.yml`
  with real passwords should stay out of git (already covered by the
  `.gitignore` files included here).
- **Seed data lives in `V2__seed_data.sql`** — if you want to update your
  projects/skills later without touching the database by hand, add a new
  migration file rather than editing V2 directly once it's been deployed.
