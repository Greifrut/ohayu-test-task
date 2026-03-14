import { providerPlanDetailItems } from "@/features/esim-united-states/model/provider-content";

export async function GET() {
  return Response.json({
    planDetails: providerPlanDetailItems,
  });
}
