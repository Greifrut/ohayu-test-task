import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqSection } from "../faq-section";
import type { FaqItem } from "../../model/types";

describe("FaqSection", () => {
  it("renders a list of FAQs and can reveal answers", async () => {
    const faqs: FaqItem[] = [
      {
        question: "Can I use eSIM while traveling?",
        answer: "Yes, once activated.",
      },
      {
        question: "How fast is support?",
        answer: "Response usually arrives the same day.",
      },
    ];

    render(<FaqSection faqs={faqs} />);
    const user = userEvent.setup();

    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument();

    const firstQuestion = screen.getByText("Can I use eSIM while traveling?");
    await user.click(firstQuestion);
    expect(screen.getByText("Yes, once activated.")).toBeVisible();
  });

  it("renders fallback when no FAQs are available", () => {
    render(<FaqSection faqs={[]} />);

    expect(
      screen.getByText(/Frequently asked questions are currently unavailable/),
    ).toBeInTheDocument();
  });
});
