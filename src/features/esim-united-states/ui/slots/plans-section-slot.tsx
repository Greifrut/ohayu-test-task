import { getUnitedStatesPlans } from "../../api/get-store";
import { PlansSection } from "../plans-section";

export async function PlansSectionSlot() {
  const plans = await getUnitedStatesPlans();
  return <PlansSection plans={plans} />;
}
