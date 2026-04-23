import { test, expect } from "@playwright/test";

// ────────────────────────────────────────────────────────────────────────────
// Landing page — E2E smoke tests
// These tests verify that the page loads and all visible sections are present.
// ────────────────────────────────────────────────────────────────────────────

test.describe("Home / Landing page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // ── General page load ────────────────────────────────────────────────────

  test("page loads with HTTP 200 and correct title", async ({ page }) => {
    const response = await page.request.get("/");
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(/Launchpad/);
  });

  test("page has a meta description", async ({ page }) => {
    const metaDesc = page.locator('meta[name="description"]');
    await expect(metaDesc).toHaveAttribute("content", /.+/);
  });

  // ── Navigation ───────────────────────────────────────────────────────────

  test("navigation bar is visible", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav).toBeVisible();
  });

  test("nav logo links to home", async ({ page }) => {
    const logo = page.getByRole("link", { name: "Home" });
    await expect(logo).toHaveAttribute("href", "/");
  });

  test("nav contains Features, Pricing, and Docs links", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Features" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Pricing" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Docs" })).toBeVisible();
  });

  test("nav has Log in and Get Started CTAs", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Get Started" })).toBeVisible();
  });

  // ── Hero section ─────────────────────────────────────────────────────────

  test("hero section is visible", async ({ page }) => {
    await expect(page.locator("section.hero")).toBeVisible();
  });

  test("hero h1 contains the tagline", async ({ page }) => {
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    // Page server returns "Ship faster. Scale smarter."
    await expect(h1).toContainText("Ship faster");
  });

  test("hero primary CTA links to /signup", async ({ page }) => {
    const cta = page.getByRole("link", { name: "Get Started Free" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", "/signup");
  });

  test("hero secondary CTA Watch Demo is present", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Watch Demo" })).toBeVisible();
  });

  // ── Features section ─────────────────────────────────────────────────────

  test("features section is visible", async ({ page }) => {
    await expect(page.locator("section.features")).toBeVisible();
  });

  test("features section heading is present", async ({ page }) => {
    const heading = page.getByRole("heading", { name: "Everything you need" });
    await expect(heading).toBeVisible();
  });

  test("features section contains at least one feature card", async ({ page }) => {
    const cards = page.locator("section.features article.card");
    await expect(cards).not.toHaveCount(0);
  });

  test("Lightning Fast feature is rendered", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Lightning Fast" })
    ).toBeVisible();
  });

  test("Secure by Default feature is rendered", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Secure by Default" })
    ).toBeVisible();
  });

  test("Zero Config Deploy feature is rendered", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Zero Config Deploy" })
    ).toBeVisible();
  });

  // ── Pricing section ──────────────────────────────────────────────────────

  test("pricing section is visible", async ({ page }) => {
    await expect(page.locator("section.pricing")).toBeVisible();
  });

  test("pricing section heading is present", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "Simple, transparent pricing",
    });
    await expect(heading).toBeVisible();
  });

  test("pricing section contains three plan cards", async ({ page }) => {
    const cards = page.locator("section.pricing .card");
    await expect(cards).toHaveCount(3);
  });

  test("Starter, Pro, and Enterprise plans are present", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Starter" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Pro" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Enterprise" })
    ).toBeVisible();
  });

  test("Pro plan has featured styling", async ({ page }) => {
    const featuredCard = page.locator("section.pricing .card.featured");
    await expect(featuredCard).toHaveCount(1);
  });

  test("plan CTA links navigate to /signup with plan param", async ({ page }) => {
    const starterCta = page.getByRole("link", { name: "Start Free" });
    await expect(starterCta).toHaveAttribute("href", "/signup?plan=starter");
  });

  // ── Footer ───────────────────────────────────────────────────────────────

  test("footer is visible", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });

  test("footer navigation has Privacy, Terms, and Contact links", async ({
    page,
  }) => {
    const footerNav = page.getByRole("navigation", { name: "Footer links" });
    await expect(footerNav.getByRole("link", { name: "Privacy" })).toBeVisible();
    await expect(footerNav.getByRole("link", { name: "Terms" })).toBeVisible();
    await expect(footerNav.getByRole("link", { name: "Contact" })).toBeVisible();
  });

  test("footer shows the current year in the copyright notice", async ({
    page,
  }) => {
    const year = new Date().getFullYear().toString();
    const footer = page.locator("footer");
    await expect(footer).toContainText(year);
  });

  // ── Accessibility basics ─────────────────────────────────────────────────

  test("page has exactly one h1", async ({ page }) => {
    const h1s = page.getByRole("heading", { level: 1 });
    await expect(h1s).toHaveCount(1);
  });

  test("all images have alt text", async ({ page }) => {
    const imagesWithoutAlt = page.locator("img:not([alt])");
    await expect(imagesWithoutAlt).toHaveCount(0);
  });

  // ── Layout / scroll behaviour ────────────────────────────────────────────

  test("sections appear in order: hero → features → pricing → footer", async ({
    page,
  }) => {
    const heroBox = await page.locator("section.hero").boundingBox();
    const featuresBox = await page.locator("section.features").boundingBox();
    const pricingBox = await page.locator("section.pricing").boundingBox();
    const footerBox = await page.locator("footer").boundingBox();

    expect(heroBox).not.toBeNull();
    expect(featuresBox).not.toBeNull();
    expect(pricingBox).not.toBeNull();
    expect(footerBox).not.toBeNull();

    // Each section starts below the previous one in document flow
    expect(heroBox!.y).toBeLessThan(featuresBox!.y);
    expect(featuresBox!.y).toBeLessThan(pricingBox!.y);
    expect(pricingBox!.y).toBeLessThan(footerBox!.y);
  });
});
