import { fail } from "@sveltejs/kit";
import { createClient } from "@supabase/supabase-js";
import { p as public_env, b as private_env } from "../../chunks/shared-server.js";
function createServerClient() {
  const url = public_env.PUBLIC_SUPABASE_URL ?? "";
  const key = private_env.SUPABASE_SERVICE_ROLE_KEY ?? public_env.PUBLIC_SUPABASE_ANON_KEY ?? "";
  return createClient(url, key);
}
const load = async () => {
  const supabase = createServerClient();
  const { data: testimonials } = await supabase.from("testimonials").select("id, author_name, author_title, author_avatar, content, rating, featured").order("featured", { ascending: false }).order("created_at", { ascending: false });
  const { data: faqs } = await supabase.from("faqs").select("id, question, answer").order("sort_order", { ascending: true });
  return {
    title: "Launchpad",
    description: "The modern platform for building and shipping web applications.",
    tagline: "Ship faster. Scale smarter.",
    cta: { label: "Get Started Free", href: "/signup" },
    features: [
      { icon: "⚡", title: "Lightning Fast", body: "Optimised for performance at every layer." },
      { icon: "🔒", title: "Secure by Default", body: "Built-in auth, CSRF protection, and CSP headers." },
      { icon: "📦", title: "Zero Config Deploy", body: "One-click deployments to any cloud provider." }
    ],
    plans: [
      { name: "Starter", price: "$0", period: "/mo", features: ["3 projects", "Community support", "1 GB storage"], cta: "Start Free" },
      {
        name: "Pro",
        price: "$29",
        period: "/mo",
        featured: true,
        features: ["Unlimited projects", "Priority support", "50 GB storage", "Custom domains"],
        cta: "Start Trial"
      },
      { name: "Enterprise", price: "Custom", period: "", features: ["SSO / SAML", "SLA guarantee", "Dedicated CSM", "Audit logs"], cta: "Contact Sales" }
    ],
    testimonials: testimonials ?? [],
    faqs: faqs ?? []
  };
};
const actions = {
  joinWaitlist: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString().trim() ?? "";
    const name = formData.get("name")?.toString().trim() || null;
    const source = formData.get("source")?.toString().trim() || null;
    if (!email) {
      return fail(400, { error: "Email is required." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(400, { error: "Please enter a valid email address." });
    }
    const supabase = createServerClient();
    const { error } = await supabase.from("waitlist").insert({ email, name, source });
    if (error) {
      if (error.code === "23505") {
        return fail(409, { error: "This email is already on the waitlist." });
      }
      console.error("Waitlist insert error:", error.message);
      return fail(500, { error: "Something went wrong. Please try again." });
    }
    return { success: true };
  }
};
export {
  actions,
  load
};
