# Portfolio Backend (Spring Boot + PostgreSQL)

REST API serving projects, skills, certifications, and a contact-message
endpoint for Aryan Singh's portfolio.

## Endpoints
| Method | Path                  | Description                        |
|--------|-----------------------|-------------------------------------|
| GET    | /api/projects          | List all projects                  |
| GET    | /api/projects/{id}     | Get one project                    |
| GET    | /api/skills             | List skills (optional `?category=`) |
| GET    | /api/certifications     | List certifications                |
| POST   | /api/contact             | Submit a contact form message      |

## Run locally

1. Start Postgres (or use docker):
   ```bash
   docker run --name portfolio-db -e POSTGRES_DB=portfolio \
     -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres \
     -p 5432:5432 -d postgres:16
   ```
2. Run the app:
   ```bash
   ./mvnw spring-boot:run
   ```
   Flyway creates the schema and seeds data automatically on startup.
3. Test it: `curl http://localhost:8080/api/projects`

## Environment variables (used in production)
- `DATABASE_URL` — e.g. `jdbc:postgresql://<host>:5432/<db>`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `FRONTEND_ORIGIN` — the deployed React app's URL (for CORS)
- `PORT` — set automatically by most hosts (Render, Railway)

See the top-level DEPLOYMENT_GUIDE.md for step-by-step free hosting instructions.
