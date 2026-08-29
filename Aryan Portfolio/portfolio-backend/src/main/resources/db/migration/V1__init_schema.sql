-- ============================================================
-- Core schema for Aryan Singh's portfolio backend
-- ============================================================

CREATE TABLE projects (
    id            BIGSERIAL PRIMARY KEY,
    title         VARCHAR(200)  NOT NULL,
    description   VARCHAR(2000),
    date_range    VARCHAR(100),
    github_url    VARCHAR(300),
    live_url      VARCHAR(300),
    display_order INTEGER
);

CREATE TABLE project_tech_tags (
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    tag        VARCHAR(100) NOT NULL
);

CREATE TABLE project_highlights (
    project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    highlight  VARCHAR(300) NOT NULL
);

CREATE TABLE skills (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(150) NOT NULL,
    category      VARCHAR(30)  NOT NULL,   -- TECHNICAL | TOOL | SOFT
    proficiency   INTEGER,
    display_order INTEGER
);

CREATE TABLE certifications (
    id            BIGSERIAL PRIMARY KEY,
    issuer        VARCHAR(150),
    title         VARCHAR(200),
    description   VARCHAR(1000),
    display_order INTEGER
);

CREATE TABLE certification_skills (
    certification_id BIGINT NOT NULL REFERENCES certifications(id) ON DELETE CASCADE,
    skill             VARCHAR(100) NOT NULL
);

CREATE TABLE contact_messages (
    id           BIGSERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(150) NOT NULL,
    subject      VARCHAR(150),
    message      VARCHAR(3000) NOT NULL,
    submitted_at TIMESTAMP NOT NULL DEFAULT now()
);
