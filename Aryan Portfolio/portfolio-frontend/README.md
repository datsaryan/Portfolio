# Portfolio Frontend (React + Vite)

React frontend for Aryan Singh's portfolio. Fetches projects, skills, and
certifications from the Spring Boot backend, and posts contact-form
submissions to it.

## Run locally

1. Copy the env file and point it at your backend:
   ```bash
   cp .env.example .env
   # edit .env -> VITE_API_BASE_URL=http://localhost:8080
   ```
2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173 (make sure the backend is running too).

## Build for production
```bash
npm run build
```
Outputs static files to `dist/` — deploy that folder to Vercel/Netlify/Cloudflare Pages.

## Assets
- `public/profile.jpg` — your hero photo. Replace with your own.
- `public/Aryan_Resume.pdf` — the file the "Download Resume" button serves. Replace with your latest resume PDF.

See the top-level DEPLOYMENT_GUIDE.md for step-by-step free hosting instructions.
