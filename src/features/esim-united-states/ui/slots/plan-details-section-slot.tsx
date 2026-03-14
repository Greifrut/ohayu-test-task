import { getUnitedStatesPlanDetails } from "../../api/plan-details";
import { PlanDetailsSection } from "../plan-details-section";

export async function PlanDetailsSectionSlot() {
  const items = await getUnitedStatesPlanDetails();
  return <PlanDetailsSection items={items} />;
}
