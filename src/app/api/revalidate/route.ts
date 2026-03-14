import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CACHE_TAGS } from "@/features/esim-united-states/constant/cache-tags";

const ALLOWED_TAGS = new Set(Object.values(CACHE_TAGS));

export async function POST(request: Request) {
  const secret = process.env.OHAYU_REVALIDATE_SECRET ?? "demo-secret";
  const body = (await request.json().catch(() => null)) as
    | {
        secret?: string;
        tag?: string;
      }
    | null;

  if (body?.secret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!body?.tag || !ALLOWED_TAGS.has(body.tag as typeof CACHE_TAGS[keyof typeof CACHE_TAGS])) {
    return NextResponse.json({ error: "Unknown tag" }, { status: 400 });
  }

  revalidateTag(body.tag, "max");

  return NextResponse.json({
    ok: true,
    tag: body.tag,
    revalidatedAt: new Date().toISOString(),
  });
}
