import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import { userEvent } from "@testing-library/user-event";
import Faq from "../Faq.svelte";

const sampleFaqs = [
  { id: "f1", question: "What is Launchpad?", answer: "A modern platform for building web apps." },
  { id: "f2", question: "Is there a free tier?", answer: "Yes, the Starter plan is free forever." },
  { id: "f3", question: "How does pricing work?", answer: "Three tiers: Starter, Pro, Enterprise." },
];

describe("Faq", () => {
  it("renders the section heading", () => {
    render(Faq, { props: { faqs: sampleFaqs } });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Frequently asked questions"
    );
  });

  it("renders a button for every question", () => {
    render(Faq, { props: { faqs: sampleFaqs } });
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  it("renders each question text", () => {
    render(Faq, { props: { faqs: sampleFaqs } });
    expect(screen.getByText("What is Launchpad?")).toBeInTheDocument();
    expect(screen.getByText("Is there a free tier?")).toBeInTheDocument();
    expect(screen.getByText("How does pricing work?")).toBeInTheDocument();
  });

  it("does not show answers by default", () => {
    render(Faq, { props: { faqs: sampleFaqs } });
    expect(screen.queryByText("A modern platform for building web apps.")).not.toBeInTheDocument();
  });

  it("shows answer when question is clicked", async () => {
    const user = userEvent.setup();
    render(Faq, { props: { faqs: sampleFaqs } });

    await user.click(screen.getByText("What is Launchpad?"));
    expect(screen.getByText("A modern platform for building web apps.")).toBeInTheDocument();
  });

  it("hides answer when question is clicked again", async () => {
    const user = userEvent.setup();
    render(Faq, { props: { faqs: sampleFaqs } });

    await user.click(screen.getByText("What is Launchpad?"));
    expect(screen.getByText("A modern platform for building web apps.")).toBeInTheDocument();

    await user.click(screen.getByText("What is Launchpad?"));
    expect(screen.queryByText("A modern platform for building web apps.")).not.toBeInTheDocument();
  });

  it("closes previously open item when another is clicked", async () => {
    const user = userEvent.setup();
    render(Faq, { props: { faqs: sampleFaqs } });

    await user.click(screen.getByText("What is Launchpad?"));
    expect(screen.getByText("A modern platform for building web apps.")).toBeInTheDocument();

    await user.click(screen.getByText("Is there a free tier?"));
    expect(screen.queryByText("A modern platform for building web apps.")).not.toBeInTheDocument();
    expect(screen.getByText("Yes, the Starter plan is free forever.")).toBeInTheDocument();
  });

  it("sets aria-expanded correctly", async () => {
    const user = userEvent.setup();
    render(Faq, { props: { faqs: sampleFaqs } });

    const button = screen.getByText("What is Launchpad?").closest("button")!;
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
  });

  it("renders empty state when no FAQs", () => {
    render(Faq, { props: { faqs: [] } });
    expect(screen.getByText("No FAQs yet.")).toBeInTheDocument();
  });

  it("has the correct section id for anchor links", () => {
    const { container } = render(Faq, { props: { faqs: sampleFaqs } });
    expect(container.querySelector("#faq")).toBeTruthy();
  });
});
