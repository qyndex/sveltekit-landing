-- Initial schema for SvelteKit Landing
-- Tables: waitlist, testimonials, faqs

-- ── Waitlist ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS waitlist (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text UNIQUE NOT NULL,
  name       text,
  source     text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Anyone can insert into waitlist (public signup form)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "waitlist_insert_anyone"
  ON waitlist FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (admin) can read waitlist entries
CREATE POLICY "waitlist_select_authenticated"
  ON waitlist FOR SELECT
  TO authenticated
  USING (true);

-- ── Testimonials ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name   text NOT NULL,
  author_title  text,
  author_avatar text,
  content       text NOT NULL,
  rating        int CHECK (rating >= 1 AND rating <= 5),
  featured      boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Testimonials are publicly readable (displayed on landing page)
CREATE POLICY "testimonials_select_anyone"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

-- ── FAQs ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question   text NOT NULL,
  answer     text NOT NULL,
  sort_order int,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

-- FAQs are publicly readable (displayed on landing page)
CREATE POLICY "faqs_select_anyone"
  ON faqs FOR SELECT
  TO anon, authenticated
  USING (true);
