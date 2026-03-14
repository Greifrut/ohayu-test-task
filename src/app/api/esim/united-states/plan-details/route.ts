import { NextResponse } from "next/server";
import { getUnitedStatesPlanDetails } from "@/features/esim-united-states/model/server-data";

export async function GET() {
  const items = await getUnitedStatesPlanDetails();
  return NextResponse.json({ items });
}
