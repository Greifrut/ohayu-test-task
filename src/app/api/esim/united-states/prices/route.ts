import { getUnitedStatesPlans } from "@/features/esim-united-states/api/get-store";
import { NextResponse } from "next/server";

export async function GET() {
  const plans = await getUnitedStatesPlans();
  return NextResponse.json({ plans });
}
