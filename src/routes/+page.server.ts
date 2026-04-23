import type { PageServerLoad, Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { createServerClient } from "$lib/server/supabase";

export const load: PageServerLoad = async () => {
  const supabase = createServerClient();

  // Fetch testimonials (featured first, then by created_at)
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("id, author_name, author_title, author_avatar, content, rating, featured")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  // Fetch FAQs ordered by sort_order
  const { data: faqs } = await supabase
    .from("faqs")
    .select("id, question, answer")
    .order("sort_order", { ascending: true });

  return {
    title: "Launchpad",
    description: "The modern platform for building and shipping web applications.",
    tagline: "Ship faster. Scale smarter.",
    cta: { label: "Get Started Free", href: "/signup" },
    features: [
      { icon: "\u26A1", title: "Lightning Fast", body: "Optimised for performance at every layer." },
      { icon: "\uD83D\uDD12", title: "Secure by Default", body: "Built-in auth, CSRF protection, and CSP headers." },
      { icon: "\uD83D\uDCE6", title: "Zero Config Deploy", body: "One-click deployments to any cloud provider." },
    ],
    plans: [
      { name: "Starter", price: "$0", period: "/mo", features: ["3 projects", "Community support", "1 GB storage"], cta: "Start Free" },
      {
        name: "Pro",
        price: "$29",
        period: "/mo",
        featured: true,
        features: ["Unlimited projects", "Priority support", "50 GB storage", "Custom domains"],
        cta: "Start Trial",
      },
      { name: "Enterprise", price: "Custom", period: "", features: ["SSO / SAML", "SLA guarantee", "Dedicated CSM", "Audit logs"], cta: "Contact Sales" },
    ],
    testimonials: testimonials ?? [],
    faqs: faqs ?? [],
  };
};

// ── Form actions ────────────────────────────────────────────────────────────

export const actions: Actions = {
  joinWaitlist: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString().trim() ?? "";
    const name = formData.get("name")?.toString().trim() || null;
    const source = formData.get("source")?.toString().trim() || null;

    // Server-side email validation
    if (!email) {
      return fail(400, { error: "Email is required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { error: "Please enter a valid email address." });
    }

    const supabase = createServerClient();
    const { error } = await supabase
      .from("waitlist")
      .insert({ email, name, source });

    if (error) {
      // Unique constraint violation (duplicate email)
      if (error.code === "23505") {
        return fail(409, { error: "This email is already on the waitlist." });
      }
      console.error("Waitlist insert error:", error.message);
      return fail(500, { error: "Something went wrong. Please try again." });
    }

    return { success: true };
  },
};
