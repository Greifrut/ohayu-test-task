import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CACHE_TAGS } from "@/features/esim-united-states/constant/cache-tags";
import { bumpVersionForTag } from "@/features/esim-united-states/api/content-version-store";

const ALLOWED_TAGS = new Set(Object.values(CACHE_TAGS));
const CONFIG_ERROR = "Revalidation is not configured";

export async function POST(request: Request) {
  const secret = process.env.OHAYU_REVALIDATE_SECRET?.trim();
  const body = (await request.json().catch(() => null)) as
    | {
        secret?: string;
        tag?: string;
      }
    | null;

  if (!secret) {
    return NextResponse.json({ error: CONFIG_ERROR }, { status: 500 });
  }

  if (body?.secret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!body?.tag || !ALLOWED_TAGS.has(body.tag as typeof CACHE_TAGS[keyof typeof CACHE_TAGS])) {
    return NextResponse.json({ error: "Unknown tag" }, { status: 400 });
  }

  await bumpVersionForTag(body.tag);
  revalidateTag(body.tag, "max");
  revalidatePath("/esim/united-states-us", "page");

  return NextResponse.json({
    ok: true,
    tag: body.tag,
    revalidatedAt: new Date().toISOString(),
  });
}
