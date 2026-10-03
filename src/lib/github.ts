export interface GitHubMetadata {
  stars: number | null;
  releaseDate: string | null;
}

export async function getGitHubMetadata(
  repository: string,
): Promise<GitHubMetadata> {
  const headers: HeadersInit = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN)
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4_000);
    const [repoResponse, releaseResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${repository}`, {
        headers,
        signal: controller.signal,
      }),
      fetch(`https://api.github.com/repos/${repository}/releases/latest`, {
        headers,
        signal: controller.signal,
      }),
    ]);
    clearTimeout(timeout);
    const repo = repoResponse.ok ? await repoResponse.json() : null;
    const release = releaseResponse.ok ? await releaseResponse.json() : null;
    return {
      stars:
        typeof repo?.stargazers_count === 'number'
          ? repo.stargazers_count
          : null,
      releaseDate:
        typeof release?.published_at === 'string' ? release.published_at : null,
    };
  } catch {
    return { stars: null, releaseDate: null };
  }
}
