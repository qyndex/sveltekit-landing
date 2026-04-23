import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import WaitlistForm from "../WaitlistForm.svelte";

describe("WaitlistForm", () => {
  it("renders the section heading", () => {
    render(WaitlistForm);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Join the waitlist"
    );
  });

  it("renders name and email inputs", () => {
    render(WaitlistForm);
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("email input is required", () => {
    render(WaitlistForm);
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute("required");
  });

  it("name input is optional (no required attribute)", () => {
    render(WaitlistForm);
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).not.toHaveAttribute("required");
  });

  it("renders the submit button", () => {
    render(WaitlistForm);
    expect(screen.getByRole("button", { name: "Join Waitlist" })).toBeInTheDocument();
  });

  it("renders a hidden source field", () => {
    const { container } = render(WaitlistForm);
    const hiddenInput = container.querySelector('input[name="source"]');
    expect(hiddenInput).toBeTruthy();
    expect(hiddenInput).toHaveAttribute("value", "landing-page");
  });

  it("has the correct section id for anchor links", () => {
    const { container } = render(WaitlistForm);
    expect(container.querySelector("#waitlist")).toBeTruthy();
  });

  it("accepts a custom heading", () => {
    render(WaitlistForm, { props: { heading: "Get early access" } });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Get early access"
    );
  });

  it("form posts to the correct action", () => {
    const { container } = render(WaitlistForm);
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "?/joinWaitlist");
    expect(form).toHaveAttribute("method", "POST");
  });
});
