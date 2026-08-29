-- ============================================================
-- Fold "My Repositories" section into Projects:
--  - point existing projects at their real GitHub repos
--  - add the two repos that only lived in the old repos section
-- ============================================================

-- ---------- fix real links on existing projects ----------
UPDATE projects SET github_url = 'https://github.com/datsaryan/hiretrack',
                     live_url   = 'https://hiretrack-ry59.vercel.app'
WHERE title = 'HireTrack — Full-Stack ATS';

UPDATE projects SET github_url = 'https://github.com/datsaryan/Face-Recognition-Based-Attendance-Monitoring-System'
WHERE title = 'Face-Based Attendance System';

-- ---------- sync the id sequence ----------
-- V2 inserted projects with explicit ids (1, 2, 3), which never advanced
-- the BIGSERIAL sequence behind projects.id. Without this, the next
-- auto-generated id collides with an id that already exists.
SELECT setval(pg_get_serial_sequence('projects', 'id'), (SELECT COALESCE(MAX(id), 1) FROM projects));

-- ---------- new projects pulled in from the repos section ----------
INSERT INTO projects (title, description, date_range, github_url, live_url, display_order) VALUES
('LeadDesk — Lead Capture & Admin Dashboard',
 'A full-stack lead-capture tool: a public landing page with a validated lead form, a Postgres-backed database, and a password-protected admin dashboard for triaging incoming leads with search, status filtering, and inline New/Contacted/Closed status updates.',
 '2026', 'https://github.com/datsaryan/LeadDesk-', 'https://lead-desk-teal.vercel.app', 4),
('InAmigos Projects — Internship Frontend Tasks',
 'A running record of frontend fundamentals practiced as a Web Development Intern at InAmigos: responsive pages built from scratch, semantic HTML5, and modern CSS3 (Flexbox/Grid), organized task-by-task as the internship progressed.',
 'Apr 2026 - May 2026', 'https://github.com/datsaryan/InAmigos-Projects', '', 5);

INSERT INTO project_tech_tags (project_id, tag)
SELECT id, tag FROM projects, (VALUES
  ('Next.js 14'), ('TypeScript'), ('Tailwind CSS'), ('PostgreSQL'), ('NextAuth'), ('bcryptjs'), ('Zod')
) AS t(tag)
WHERE title = 'LeadDesk — Lead Capture & Admin Dashboard';

INSERT INTO project_tech_tags (project_id, tag)
SELECT id, tag FROM projects, (VALUES
  ('HTML5'), ('CSS3'), ('JavaScript')
) AS t(tag)
WHERE title = 'InAmigos Projects — Internship Frontend Tasks';

INSERT INTO project_highlights (project_id, highlight)
SELECT id, highlight FROM projects, (VALUES
  ('Lead capture form'), ('Admin dashboard'), ('bcrypt + NextAuth'), ('Zod validation')
) AS h(highlight)
WHERE title = 'LeadDesk — Lead Capture & Admin Dashboard';

INSERT INTO project_highlights (project_id, highlight)
SELECT id, highlight FROM projects, (VALUES
  ('Task-wise structure'), ('Responsive layouts'), ('Semantic HTML5'), ('Git workflow')
) AS h(highlight)
WHERE title = 'InAmigos Projects — Internship Frontend Tasks';
