import { getUnitedStatesStoreSnapshot } from "@/features/esim-united-states/api/get-store";
import { NextResponse } from "next/server";

export async function GET() {
  const payload = await getUnitedStatesStoreSnapshot();
  return NextResponse.json(payload);
}
