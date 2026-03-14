import { mockUnitedStatesStore, providerPlanDetailItems } from "../../model/provider-content";
import { seoFaqs } from "../../model/seo-content";

export function setupFeatureMockApiFetch() {
  const mockFetch = vi.fn(async (input: RequestInfo | URL) => {
    const urlInput = typeof input === "string" ? input : input.toString();
    const url = /^https?:\/\//i.test(urlInput)
      ? new URL(urlInput)
      : new URL(urlInput, "http://localhost:3000");
    const path = url.pathname;

    if (path.endsWith("/store")) {
      return Response.json(mockUnitedStatesStore);
    }

    if (path.endsWith("/faqs")) {
      return Response.json({ faqs: seoFaqs });
    }

    if (path.endsWith("/plan-details")) {
      return Response.json({ planDetails: providerPlanDetailItems });
    }

    throw new Error(`Unhandled mock API request: ${path}`);
  });

  vi.stubGlobal("fetch", mockFetch);

  return mockFetch;
}
