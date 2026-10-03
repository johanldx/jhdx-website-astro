export async function getNpmVersion(
  packageName: string,
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4_000);
    const response = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(packageName)}/latest`,
      {
        signal: controller.signal,
      },
    );
    clearTimeout(timeout);
    if (!response.ok) return null;
    const data = await response.json();
    return typeof data.version === 'string' ? data.version : null;
  } catch {
    return null;
  }
}
