import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Footer from "../Footer.svelte";

describe("Footer", () => {
  it("renders the footer element", () => {
    const { container } = render(Footer);
    expect(container.querySelector("footer")).toBeTruthy();
  });

  it("renders the copyright text with current year", () => {
    render(Footer);
    const year = new Date().getFullYear().toString();
    // The footer renders: © {year} Launchpad. All rights reserved.
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("has a labelled footer navigation", () => {
    render(Footer);
    expect(screen.getByRole("navigation", { name: "Footer links" })).toBeInTheDocument();
  });

  it("renders the Privacy link", () => {
    render(Footer);
    const link = screen.getByRole("link", { name: "Privacy" });
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("renders the Terms link", () => {
    render(Footer);
    const link = screen.getByRole("link", { name: "Terms" });
    expect(link).toHaveAttribute("href", "/terms");
  });

  it("renders the Contact link", () => {
    render(Footer);
    const link = screen.getByRole("link", { name: "Contact" });
    expect(link).toHaveAttribute("href", "/contact");
  });
});
