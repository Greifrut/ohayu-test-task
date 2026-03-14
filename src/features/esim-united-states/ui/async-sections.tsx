import { CheckoutPanel } from "./checkout-panel";
import { FaqSection } from "./faq-section";
import { PlanDetailsSection } from "./plan-details-section";
import { PlansSection } from "./plans-section";
import {
  getUnitedStatesFaqs,
  getUnitedStatesPlanDetails,
  getUnitedStatesPlans,
} from "../model/server-data";

export async function CheckoutPanelSlot() {
  const plans = await getUnitedStatesPlans();
  return <CheckoutPanel plans={plans} />;
}

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
