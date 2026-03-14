import { NextResponse } from "next/server";
import { getUnitedStatesStoreSnapshot } from "@/features/esim-united-states/model/server-data";

export async function GET() {
  const payload = await getUnitedStatesStoreSnapshot();
  return NextResponse.json(payload);
}
