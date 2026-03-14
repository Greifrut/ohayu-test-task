import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReviewsSection } from "../reviews-section";
import { reviews } from "../../model/static-content";

describe("ReviewsSection", () => {
  it("renders all review cards with quotes, names, and cities", () => {
    render(<ReviewsSection />);

    expect(screen.getByText("Traveler feedback")).toBeInTheDocument();

    reviews.forEach((review) => {
      expect(screen.getByText(review.name)).toBeInTheDocument();
      expect(screen.getByText(review.city)).toBeInTheDocument();
      expect(screen.getByText(`"${review.quote}"`)).toBeInTheDocument();
    });
  });
});

