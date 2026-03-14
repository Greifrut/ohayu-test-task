import { NextResponse } from "next/server";
import { getUnitedStatesFaqs } from "@/features/esim-united-states/model/server-data";

export async function GET() {
  const faqs = await getUnitedStatesFaqs();
  return NextResponse.json({ faqs });
}
