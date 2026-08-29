-- ============================================================
-- Seed data pulled from Aryan Singh's resume
-- ============================================================

-- ---------- PROJECTS ----------
INSERT INTO projects (id, title, description, date_range, github_url, live_url, display_order) VALUES
(1, 'HireTrack — Full-Stack ATS',
 'A full-stack, multi-tenant applicant tracking system with 25+ REST endpoints: a Spring Boot API with JWT auth, RBAC, and org-scoped data isolation, plus a React (Vite) frontend with a drag-and-drop Kanban board for candidate pipelines, a hiring dashboard, and structured interview scorecards.',
 'May 2026 - Jul 2026', 'https://github.com/datsaryan', '', 1),
(2, 'NGO Awareness Website — InAmigos Foundation',
 'A fully static, mobile-responsive single-page site built for a real NGO across 10 sections using Flexbox/Grid across 3 breakpoints, achieving a 90+ Lighthouse performance score with a live Razorpay donation gateway and volunteer sign-up form.',
 'Apr 2026 - May 2026', 'https://github.com/datsaryan', '', 2),
(3, 'Face-Based Attendance System',
 'A real-time facial recognition attendance pipeline using Haar cascades, automating tracking for 300+ students. Modular dataset collection, preprocessing, detection, and recognition stages, plus a Tkinter GUI for non-technical staff.',
 'Dec 2025 - Feb 2026', 'https://github.com/datsaryan', '', 3);

INSERT INTO project_tech_tags (project_id, tag) VALUES
(1, 'Java'), (1, 'Spring Boot'), (1, 'PostgreSQL'), (1, 'Flyway'), (1, 'React'), (1, 'JWT'), (1, 'Docker'), (1, 'JUnit'),
(2, 'HTML5'), (2, 'CSS3'), (2, 'JavaScript'),
(3, 'Python'), (3, 'OpenCV'), (3, 'Tkinter'), (3, 'NumPy'), (3, 'Pandas'), (3, 'Pytest');

INSERT INTO project_highlights (project_id, highlight) VALUES
(1, '25+ REST endpoints'), (1, 'JWT + RBAC'), (1, 'Kanban pipeline'), (1, '80%+ test coverage'),
(2, '90+ Lighthouse score'), (2, 'Razorpay donations'), (2, 'Sub-2s load time'), (2, 'Fully responsive'),
(3, 'Real-time detection'), (3, '<1s recognition'), (3, 'GUI dashboard'), (3, 'CSV records');

-- ---------- SKILLS ----------
INSERT INTO skills (name, category, proficiency, display_order) VALUES
('Java / Spring Boot', 'TECHNICAL', 85, 1),
('React / Vite / JavaScript', 'TECHNICAL', 82, 2),
('REST APIs / JWT Auth / RBAC', 'TECHNICAL', 80, 3),
('PostgreSQL / SQL / MySQL', 'TECHNICAL', 78, 4),
('Python / OpenCV', 'TECHNICAL', 75, 5),
('Docker / Maven / CI Basics', 'TECHNICAL', 70, 6),
('DSA (LeetCode)', 'TECHNICAL', 72, 7),
('Git / GitHub', 'TECHNICAL', 80, 8),
('Java', 'TOOL', NULL, 9),
('Spring Boot', 'TOOL', NULL, 10),
('React', 'TOOL', NULL, 11),
('PostgreSQL', 'TOOL', NULL, 12),
('Flyway', 'TOOL', NULL, 13),
('JWT / RBAC', 'TOOL', NULL, 14),
('Docker', 'TOOL', NULL, 15),
('Maven', 'TOOL', NULL, 16),
('JUnit / Mockito', 'TOOL', NULL, 17),
('Python', 'TOOL', NULL, 18),
('OpenCV', 'TOOL', NULL, 19),
('Analytical Thinking', 'SOFT', NULL, 20),
('Team Collaboration', 'SOFT', NULL, 21),
('Quick Learner', 'SOFT', NULL, 22),
('Problem Solving', 'SOFT', NULL, 23),
('Communication', 'SOFT', NULL, 24),
('Adaptability', 'SOFT', NULL, 25);

-- ---------- CERTIFICATIONS ----------
INSERT INTO certifications (id, issuer, title, description, display_order) VALUES
(1, 'IBM', 'Web Development Certificate',
 'Comprehensive certification covering modern web development technologies, best practices, and industry-standard workflows.', 1),
(2, 'NPTEL', 'Introduction to IoT',
 'In-depth course on Internet of Things concepts, device connectivity, sensor integration, and smart system design.', 2),
(3, 'LeetCode', 'DSA Problem Solver',
 'Consistently solving algorithmic problems in C++ to build competitive programming skills and master Data Structures & Algorithms.', 3);

INSERT INTO certification_skills (certification_id, skill) VALUES
(1, 'HTML'), (1, 'CSS'), (1, 'JavaScript'),
(2, 'IoT'), (2, 'Sensors'), (2, 'Networking'),
(3, 'C++'), (3, 'DSA'), (3, 'Algorithms');
