export async function simulateApiLatency(delayMs = 150): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, delayMs);
  });
}
