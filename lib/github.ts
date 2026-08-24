import type { Repo } from "@/content/profile";

interface GithubApiRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
}

/**
 * Pulls the user's live, non-fork repos from the public GitHub REST API,
 * ranked by stars. Cached for an hour via Next.js fetch revalidation so the
 * Open Source section stays current without a manual content edit.
 */
export async function getGithubRepos(username: string, limit = 4): Promise<Repo[] | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as GithubApiRepo[];

    return data
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, limit)
      .map((repo) => ({
        name: repo.name,
        description: repo.description ?? "No description provided.",
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language ?? "—",
      }));
  } catch {
    return null;
  }
}
