-- Seed data for SvelteKit Landing
-- 6 testimonials, 8 FAQs, 3 waitlist entries

-- ── Testimonials ────────────────────────────────────────────────────────────
INSERT INTO testimonials (author_name, author_title, author_avatar, content, rating, featured) VALUES
  ('Sarah Chen', 'CTO at Flowstate', NULL, 'Launchpad cut our deployment time from hours to minutes. The zero-config approach just works.', 5, true),
  ('Marcus Johnson', 'Lead Engineer at Nimbus', NULL, 'We migrated three services in a weekend. The developer experience is genuinely best-in-class.', 5, true),
  ('Elena Rodriguez', 'Founder of Pixelcraft', NULL, 'As a solo founder, Launchpad lets me punch way above my weight. Ship fast, stay secure, sleep well.', 5, true),
  ('David Kim', 'VP Engineering at Terrace', NULL, 'The built-in auth and CSP headers saved us weeks of security hardening. Production-ready from day one.', 4, false),
  ('Priya Sharma', 'Staff Engineer at Codewell', NULL, 'Our team onboarding went from two days to two hours. Everything is where you expect it to be.', 5, false),
  ('James Wright', 'DevOps Lead at Buildship', NULL, 'We evaluated six platforms. Launchpad was the only one that scaled without config changes.', 4, true)
ON CONFLICT DO NOTHING;

-- ── FAQs ────────────────────────────────────────────────────────────────────
INSERT INTO faqs (question, answer, sort_order) VALUES
  ('What is Launchpad?', 'Launchpad is a modern platform for building and shipping web applications. It handles deployment, scaling, and security so you can focus on your product.', 1),
  ('How long does setup take?', 'Most teams are up and running in under 10 minutes. Connect your repository, pick your framework, and deploy.', 2),
  ('Is there a free tier?', 'Yes. The Starter plan is free forever and includes 3 projects, community support, and 1 GB of storage.', 3),
  ('What frameworks are supported?', 'Launchpad supports SvelteKit, Next.js, Remix, Astro, Nuxt, and any Node.js application out of the box. Custom Dockerfiles are also supported.', 4),
  ('How does pricing work?', 'We offer three tiers: Starter (free), Pro ($29/mo), and Enterprise (custom). You only pay for what you use, and you can upgrade or downgrade at any time.', 5),
  ('Is my data secure?', 'Absolutely. Every deployment includes built-in auth, CSRF protection, CSP headers, and encrypted data at rest. We undergo annual SOC 2 audits.', 6),
  ('Can I use a custom domain?', 'Yes. Custom domains are available on the Pro plan and above. SSL certificates are provisioned automatically.', 7),
  ('How do I get support?', 'Starter users get community support via our forum. Pro users get priority email support with a 24-hour SLA. Enterprise customers receive a dedicated CSM and Slack channel.', 8)
ON CONFLICT DO NOTHING;

-- ── Waitlist (sample entries) ───────────────────────────────────────────────
INSERT INTO waitlist (email, name, source) VALUES
  ('alice@example.com', 'Alice Martinez', 'landing-page'),
  ('bob@example.com', 'Bob Nguyen', 'product-hunt'),
  ('carol@example.com', 'Carol Okafor', 'twitter')
ON CONFLICT (email) DO NOTHING;
