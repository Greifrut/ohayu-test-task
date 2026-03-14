import { seoFaqs } from "@/features/esim-united-states/model/seo-content";

export async function GET() {
  return Response.json({
    faqs: seoFaqs,
  });
}
