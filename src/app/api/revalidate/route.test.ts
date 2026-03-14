import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetContentVersions } from "@/features/esim-united-states/api/content-version-store";

const { revalidateTag } = vi.hoisted(() => ({
  revalidateTag: vi.fn(),
}));
const { revalidatePath } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath,
  revalidateTag,
}));

import { POST } from "./route";

describe("POST /api/revalidate", () => {
  beforeEach(async () => {
    await resetContentVersions();
    revalidatePath.mockReset();
    revalidateTag.mockReset();
  });

  it("fails closed when the secret is not configured", async () => {
    delete process.env.OHAYU_REVALIDATE_SECRET;

    const response = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body: JSON.stringify({
          secret: "anything",
          tag: "us-prices",
        }),
      }),
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Revalidation is not configured",
    });
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates an allowed tag when the configured secret matches", async () => {
    process.env.OHAYU_REVALIDATE_SECRET = "test-secret";

    const response = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body: JSON.stringify({
          secret: "test-secret",
          tag: "us-plan-details",
        }),
      }),
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      ok: true,
      tag: "us-plan-details",
    });
    expect(revalidatePath).toHaveBeenCalledWith("/esim/united-states-us", "page");
    expect(revalidateTag).toHaveBeenCalledWith("us-plan-details", "max");
  });
});
