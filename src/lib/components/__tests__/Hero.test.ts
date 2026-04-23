import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Hero from "../Hero.svelte";

const defaultProps = {
  tagline: "Ship faster. Scale smarter.",
  cta: { label: "Get Started Free", href: "/signup" },
};

describe("Hero", () => {
  it("renders the tagline in an h1", () => {
    render(Hero, { props: defaultProps });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Ship faster. Scale smarter."
    );
  });

  it("renders the primary CTA button with correct href", () => {
    render(Hero, { props: defaultProps });
    const ctaLink = screen.getByRole("link", { name: "Get Started Free" });
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink).toHaveAttribute("href", "/signup");
  });

  it("renders the secondary Watch Demo link", () => {
    render(Hero, { props: defaultProps });
    expect(screen.getByRole("link", { name: "Watch Demo" })).toBeInTheDocument();
  });

  it("renders a section element as the root", () => {
    const { container } = render(Hero, { props: defaultProps });
    expect(container.querySelector("section.hero")).toBeTruthy();
  });

  it("uses a custom tagline when provided", () => {
    render(Hero, {
      props: { ...defaultProps, tagline: "Custom tagline text" },
    });
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Custom tagline text"
    );
  });

  it("uses the CTA label and href from props", () => {
    render(Hero, {
      props: { tagline: "Hello", cta: { label: "Buy Now", href: "/buy" } },
    });
    const link = screen.getByRole("link", { name: "Buy Now" });
    expect(link).toHaveAttribute("href", "/buy");
  });
});
