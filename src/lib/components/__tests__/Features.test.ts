import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Features from "../Features.svelte";

const sampleFeatures = [
  { icon: "⚡", title: "Lightning Fast", body: "Optimised for performance at every layer." },
  { icon: "🔒", title: "Secure by Default", body: "Built-in auth, CSRF protection, and CSP headers." },
  { icon: "📦", title: "Zero Config Deploy", body: "One-click deployments to any cloud provider." },
];

describe("Features", () => {
  it("renders the section heading", () => {
    render(Features, { props: { features: sampleFeatures } });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Everything you need"
    );
  });

  it("renders a card for every feature", () => {
    render(Features, { props: { features: sampleFeatures } });
    // Each feature is wrapped in an <article>
    const cards = document.querySelectorAll("article.card");
    expect(cards).toHaveLength(3);
  });

  it("renders each feature title", () => {
    render(Features, { props: { features: sampleFeatures } });
    for (const f of sampleFeatures) {
      expect(screen.getByRole("heading", { name: f.title })).toBeInTheDocument();
    }
  });

  it("renders each feature body", () => {
    render(Features, { props: { features: sampleFeatures } });
    for (const f of sampleFeatures) {
      expect(screen.getByText(f.body)).toBeInTheDocument();
    }
  });

  it("marks feature icons as aria-hidden", () => {
    const { container } = render(Features, { props: { features: sampleFeatures } });
    const icons = container.querySelectorAll(".icon");
    for (const icon of icons) {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("renders an empty grid when features array is empty", () => {
    render(Features, { props: { features: [] } });
    expect(document.querySelectorAll("article.card")).toHaveLength(0);
    // Section and heading still appear
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("renders a single feature correctly", () => {
    render(Features, {
      props: { features: [{ icon: "🚀", title: "Rocket", body: "Goes fast" }] },
    });
    expect(screen.getByRole("heading", { name: "Rocket" })).toBeInTheDocument();
    expect(screen.getByText("Goes fast")).toBeInTheDocument();
  });
});
