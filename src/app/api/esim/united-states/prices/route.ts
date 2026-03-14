import { NextResponse } from "next/server";
import { getUnitedStatesPlans } from "@/features/esim-united-states/model/server-data";

export async function GET() {
  const plans = await getUnitedStatesPlans();
  return NextResponse.json({ plans });
}
