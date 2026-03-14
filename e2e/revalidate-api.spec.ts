import { expect, test } from "@playwright/test";

const revalidateSecret = process.env.OHAYU_REVALIDATE_SECRET ?? "demo-secret";

test.describe("revalidate API", () => {
  test("returns success for allowed tags with valid secret", async ({ request }) => {
    const response = await request.post("/api/revalidate", {
      data: {
        secret: revalidateSecret,
        tag: "us-prices",
      },
    });

    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(body).toMatchObject({
      ok: true,
      tag: "us-prices",
    });
    expect(typeof body.revalidatedAt).toBe("string");
  });

  test("rejects unknown tags and bad secrets", async ({ request }) => {
    const unknownTagResponse = await request.post("/api/revalidate", {
      data: {
        secret: revalidateSecret,
        tag: "us-unknown",
      },
    });
    expect(unknownTagResponse.status()).toBe(400);
    expect((await unknownTagResponse.json()).error).toBe("Unknown tag");

    const unauthorizedResponse = await request.post("/api/revalidate", {
      data: {
        secret: "bad-secret",
        tag: "us-prices",
      },
    });
    expect(unauthorizedResponse.status()).toBe(401);
    expect((await unauthorizedResponse.json()).error).toBe("Unauthorized");
  });
});
