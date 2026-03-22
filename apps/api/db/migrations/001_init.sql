-- Baterino CMS: users, blog articles, use case projects

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM ('admin', 'contributor');
CREATE TYPE content_status AS ENUM ('draft', 'published');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'contributor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE blog_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(200) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL DEFAULT 'company',
  title VARCHAR(500) NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  body_html TEXT NOT NULL DEFAULT '',
  image_url VARCHAR(1000) NOT NULL DEFAULT '',
  author_name VARCHAR(200) NOT NULL DEFAULT 'Baterino',
  location_label VARCHAR(200) NOT NULL DEFAULT '',
  category_label VARCHAR(200) NOT NULL DEFAULT '',
  author_id UUID REFERENCES users (id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_blog_articles_status_published ON blog_articles (status, published_at DESC NULLS LAST);

CREATE TABLE use_case_projects (
  project_id VARCHAR(80) PRIMARY KEY,
  sector VARCHAR(20) NOT NULL,
  install_type VARCHAR(20) NOT NULL,
  solar BOOLEAN NOT NULL DEFAULT false,
  search_loc TEXT NOT NULL DEFAULT '',
  title VARCHAR(500) NOT NULL,
  location VARCHAR(500) NOT NULL,
  specs JSONB NOT NULL DEFAULT '{}',
  use_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  images JSONB NOT NULL DEFAULT '[]',
  author_id UUID REFERENCES users (id) ON DELETE SET NULL,
  status content_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_use_cases_status ON use_case_projects (status);
