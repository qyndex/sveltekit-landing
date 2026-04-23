import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Pricing from "../Pricing.svelte";

const samplePlans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    features: ["3 projects", "Community support", "1 GB storage"],
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    featured: true,
    features: ["Unlimited projects", "Priority support", "50 GB storage", "Custom domains"],
    cta: "Start Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["SSO / SAML", "SLA guarantee", "Dedicated CSM", "Audit logs"],
    cta: "Contact Sales",
  },
];

describe("Pricing", () => {
  it("renders the section heading", () => {
    render(Pricing, { props: { plans: samplePlans } });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Simple, transparent pricing"
    );
  });

  it("renders a card for every plan", () => {
    const { container } = render(Pricing, { props: { plans: samplePlans } });
    const cards = container.querySelectorAll(".card");
    expect(cards).toHaveLength(3);
  });

  it("renders each plan name", () => {
    render(Pricing, { props: { plans: samplePlans } });
    for (const plan of samplePlans) {
      expect(screen.getByRole("heading", { name: plan.name })).toBeInTheDocument();
    }
  });

  it("renders each plan price", () => {
    render(Pricing, { props: { plans: samplePlans } });
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$29")).toBeInTheDocument();
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("applies the featured class only to the Pro plan", () => {
    const { container } = render(Pricing, { props: { plans: samplePlans } });
    const featuredCards = container.querySelectorAll(".card.featured");
    expect(featuredCards).toHaveLength(1);
  });

  it("renders feature list items for each plan", () => {
    render(Pricing, { props: { plans: samplePlans } });
    // Spot-check a few feature strings
    expect(screen.getByText("✓ 3 projects")).toBeInTheDocument();
    expect(screen.getByText("✓ Unlimited projects")).toBeInTheDocument();
    expect(screen.getByText("✓ SSO / SAML")).toBeInTheDocument();
  });

  it("renders CTA links with correct query param", () => {
    render(Pricing, { props: { plans: samplePlans } });
    const starterLink = screen.getByRole("link", { name: "Start Free" });
    expect(starterLink).toHaveAttribute("href", "/signup?plan=starter");
    const proLink = screen.getByRole("link", { name: "Start Trial" });
    expect(proLink).toHaveAttribute("href", "/signup?plan=pro");
    const enterpriseLink = screen.getByRole("link", { name: "Contact Sales" });
    expect(enterpriseLink).toHaveAttribute("href", "/signup?plan=enterprise");
  });

  it("renders correctly when no plans are provided", () => {
    render(Pricing, { props: { plans: [] } });
    expect(document.querySelectorAll(".card")).toHaveLength(0);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });
});
