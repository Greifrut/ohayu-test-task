import { getUnitedStatesFaqs } from "../../api/get-faqs";
import { FaqSection } from "../faq-section";

export async function FaqSectionSlot() {
  const faqs = await getUnitedStatesFaqs();
  return <FaqSection faqs={Array.isArray(faqs) ? faqs : []} />;
}
