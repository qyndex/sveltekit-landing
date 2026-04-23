import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    title: "Launchpad",
    description: "The modern platform for building and shipping web applications.",
    tagline: "Ship faster. Scale smarter.",
    cta: { label: "Get Started Free", href: "/signup" },
    features: [
      { icon: "⚡", title: "Lightning Fast", body: "Optimised for performance at every layer." },
      { icon: "🔒", title: "Secure by Default", body: "Built-in auth, CSRF protection, and CSP headers." },
      { icon: "📦", title: "Zero Config Deploy", body: "One-click deployments to any cloud provider." },
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
  };
};
