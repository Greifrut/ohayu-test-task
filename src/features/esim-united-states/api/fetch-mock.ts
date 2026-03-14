interface MockFetchOptions {
  path: string;
}

const DEFAULT_MOCK_BASE_URL = "http://localhost:3000";

function getMockApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_MOCK_API_BASE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    DEFAULT_MOCK_BASE_URL
  );
}

export function buildMockApiUrl(path: string) {
  const baseUrl = getMockApiBaseUrl().replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}

export async function fetchMockJson<T>({ path }: MockFetchOptions) {
  const url = buildMockApiUrl(path);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load mock data: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
