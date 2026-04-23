import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Testimonials from "../Testimonials.svelte";

const sampleTestimonials = [
  {
    id: "t1",
    author_name: "Sarah Chen",
    author_title: "CTO at Flowstate",
    content: "Launchpad cut our deployment time from hours to minutes.",
    rating: 5,
  },
  {
    id: "t2",
    author_name: "Marcus Johnson",
    author_title: null,
    content: "We migrated three services in a weekend.",
    rating: 4,
  },
  {
    id: "t3",
    author_name: "Elena Rodriguez",
    author_title: "Founder of Pixelcraft",
    content: "Ship fast, stay secure, sleep well.",
    rating: null,
  },
];

describe("Testimonials", () => {
  it("renders the section heading", () => {
    render(Testimonials, { props: { testimonials: sampleTestimonials } });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "What people are saying"
    );
  });

  it("renders a blockquote for every testimonial", () => {
    const { container } = render(Testimonials, {
      props: { testimonials: sampleTestimonials },
    });
    const quotes = container.querySelectorAll("blockquote.card");
    expect(quotes).toHaveLength(3);
  });

  it("renders each testimonial content", () => {
    render(Testimonials, { props: { testimonials: sampleTestimonials } });
    for (const t of sampleTestimonials) {
      expect(screen.getByText(new RegExp(t.content))).toBeInTheDocument();
    }
  });

  it("renders author names", () => {
    render(Testimonials, { props: { testimonials: sampleTestimonials } });
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument();
    expect(screen.getByText("Marcus Johnson")).toBeInTheDocument();
    expect(screen.getByText("Elena Rodriguez")).toBeInTheDocument();
  });

  it("renders author title when provided", () => {
    render(Testimonials, { props: { testimonials: sampleTestimonials } });
    expect(screen.getByText("CTO at Flowstate")).toBeInTheDocument();
    expect(screen.getByText("Founder of Pixelcraft")).toBeInTheDocument();
  });

  it("renders star ratings when provided", () => {
    const { container } = render(Testimonials, {
      props: { testimonials: sampleTestimonials },
    });
    const ratingDivs = container.querySelectorAll(".rating");
    // Only t1 and t2 have ratings, t3 has null
    expect(ratingDivs).toHaveLength(2);
  });

  it("renders a rating aria-label", () => {
    const { container } = render(Testimonials, {
      props: { testimonials: sampleTestimonials },
    });
    const rating = container.querySelector('[aria-label="5 out of 5 stars"]');
    expect(rating).toBeTruthy();
  });

  it("renders empty state when no testimonials", () => {
    render(Testimonials, { props: { testimonials: [] } });
    expect(screen.getByText("No testimonials yet.")).toBeInTheDocument();
  });

  it("has the correct section id for anchor links", () => {
    const { container } = render(Testimonials, {
      props: { testimonials: sampleTestimonials },
    });
    expect(container.querySelector("#testimonials")).toBeTruthy();
  });
});
