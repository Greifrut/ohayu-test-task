import { getUnitedStatesFaqs } from "../api/get-faqs";
import { getUnitedStatesPlans } from "../api/get-store";
import { getUnitedStatesPlanDetails } from "../api/plan-details";
import { FaqSection } from "./faq-section";
import { PlanDetailsSection } from "./plan-details-section";
import { PlansSection } from "./plans-section";

export async function PlansSectionSlot() {
  const plans = await getUnitedStatesPlans();
  return <PlansSection plans={plans} />;
}

export async function PlanDetailsSectionSlot() {
  const items = await getUnitedStatesPlanDetails();
  return <PlanDetailsSection items={items} />;
}

export async function FaqSectionSlot() {
  const faqs = await getUnitedStatesFaqs();
  return <FaqSection faqs={faqs} />;
}
