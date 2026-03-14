import { getUnitedStatesFaqs } from "@/features/esim-united-states/api/get-faqs";
import { NextResponse } from "next/server";

export async function GET() {
  const faqs = await getUnitedStatesFaqs();
  return NextResponse.json({ faqs });
}
