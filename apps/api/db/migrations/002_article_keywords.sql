-- Optional keywords (max 4 enforced in API) shown under article hero on the public site
ALTER TABLE blog_articles
  ADD COLUMN IF NOT EXISTS keywords TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
