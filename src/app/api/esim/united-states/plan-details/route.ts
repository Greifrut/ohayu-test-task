import { getUnitedStatesPlanDetails } from "@/features/esim-united-states/api/plan-details";
import { NextResponse } from "next/server";

export async function GET() {
  const items = await getUnitedStatesPlanDetails();
  return NextResponse.json({ items });
}
