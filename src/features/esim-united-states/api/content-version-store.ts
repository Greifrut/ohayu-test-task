import { mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { CACHE_TAGS } from "../constant/cache-tags";

type VersionState = {
  providerCatalog: number;
  prices: number;
  planDetails: number;
  faqs: number;
};

const initialState = (): VersionState => ({
  providerCatalog: 0,
  prices: 0,
  planDetails: 0,
  faqs: 0,
});

const stateScope =
  process.env.VITEST_POOL_ID ??
  process.env.VITEST_WORKER_ID ??
  String(process.pid);

const stateDirectory = path.join(os.tmpdir(), "ohayu-test-app", stateScope);
const stateFile = path.join(stateDirectory, "content-version-state.json");

async function writeState(state: VersionState): Promise<void> {
  await mkdir(stateDirectory, { recursive: true });
  await writeFile(stateFile, JSON.stringify(state), "utf8");
}

async function readState(): Promise<VersionState> {
  try {
    const file = await readFile(stateFile, "utf8");
    const parsed = JSON.parse(file) as Partial<VersionState>;

    return {
      ...initialState(),
      ...parsed,
    };
  } catch {
    const state = initialState();
    await writeState(state);

    return state;
  }
}

export async function getContentVersions(): Promise<Readonly<VersionState>> {
  return readState();
}

export async function bumpVersionForTag(tag: string): Promise<void> {
  const versionState = await readState();

  if (tag === CACHE_TAGS.providerCatalog) {
    await writeState({
      ...versionState,
      providerCatalog: versionState.providerCatalog + 1,
    });

    return;
  }

  if (tag === CACHE_TAGS.prices) {
    await writeState({
      ...versionState,
      prices: versionState.prices + 1,
    });

    return;
  }

  if (tag === CACHE_TAGS.planDetails) {
    await writeState({
      ...versionState,
      planDetails: versionState.planDetails + 1,
    });

    return;
  }

  if (tag === CACHE_TAGS.faqs) {
    await writeState({
      ...versionState,
      faqs: versionState.faqs + 1,
    });
  }
}

export async function resetContentVersions(): Promise<void> {
  await writeState(initialState());
}
