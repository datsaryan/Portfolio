# Aryan Singh — Full-Stack Portfolio

A complete full-stack rebuild of the portfolio: React frontend talking to a
real Spring Boot REST API backed by PostgreSQL, instead of hardcoded HTML.

```
portfolio-fullstack/
├── portfolio-backend/     Spring Boot 3 + PostgreSQL + Flyway REST API
├── portfolio-frontend/    React 18 + Vite frontend
├── docker-compose.yml     Spins up Postgres + backend together for local dev
└── DEPLOYMENT_GUIDE.md    Step-by-step free hosting walkthrough
```

## Stack
- **Frontend**: React 18, Vite, plain CSS (no framework lock-in)
- **Backend**: Java 17, Spring Boot 3, Spring Data JPA, Bean Validation
- **Database**: PostgreSQL, schema + seed data managed by Flyway migrations
- **API**: REST — `GET /api/projects`, `GET /api/skills`, `GET /api/certifications`, `POST /api/contact`

## Prerequisites

- Java 17+ and Maven (or use the included `docker-compose.yml`, which needs
  no local Java install)
- Node.js 18+ and npm
- Docker + Docker Compose (recommended for local Postgres)

## Run everything locally

```bash
# 1. Start Postgres + backend together
docker compose up --build

# 2. In a second terminal, start the frontend
cd portfolio-frontend
cp .env.example .env    # VITE_API_BASE_URL=http://localhost:8080
npm install
npm run dev
```

Open http://localhost:5173 — the site should load with your real project,
skill, and certification data served live from the database, and the
contact form should actually persist submissions.

## Deploying for free

See **DEPLOYMENT_GUIDE.md** — covers Neon (database), Render (backend),
and Vercel (frontend), all on free tiers, plus CORS setup and troubleshooting.

## What's dynamic vs static

Projects, skills, and certifications are pulled from the database through
the API — update `V2__seed_data.sql` (or add a new migration) to change
them without touching frontend code. Experience and Education sections are
still static React content, since that data changes far less often; wire
them up to the API the same way if you want them dynamic too.

## License

MIT — see [LICENSE](LICENSE).
