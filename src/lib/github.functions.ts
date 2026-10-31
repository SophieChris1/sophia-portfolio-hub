import { createServerFn } from "@tanstack/react-start";

/*
 * Fetches Sophia's public GitHub repositories through the Lovable
 * connector gateway. Runs only on the server — the GitHub connection
 * key never reaches the browser.
 */

export interface GithubRepo {
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  updatedAt: string;
}

export interface GithubReposResult {
  repos: GithubRepo[];
  profileUrl: string;
  error: string | null;
}

const GITHUB_USERNAME = "SophieChris1";

export const getGithubRepos = createServerFn({ method: "GET" }).handler(
  async (): Promise<GithubReposResult> => {
    const profileUrl = `https://github.com/${GITHUB_USERNAME}`;
    const fallback: GithubReposResult = { repos: [], profileUrl, error: null };

    const lovableKey = process.env.LOVABLE_API_KEY;
    const githubKey = process.env.GITHUB_API_KEY;
    if (!lovableKey || !githubKey) {
      return { ...fallback, error: "GitHub connection is not configured." };
    }

    try {
      const response = await fetch(
        `https://connector-gateway.lovable.dev/github/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=public`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": githubKey,
          },
        },
      );

      if (!response.ok) {
        const body = await response.text();
        console.error(`GitHub request failed [${response.status}]: ${body}`);
        return { ...fallback, error: "Could not load GitHub projects right now." };
      }

      const data = (await response.json()) as Array<{
        name: string;
        html_url: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        updated_at: string;
        fork: boolean;
      }>;

      const repos = data
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          name: repo.name,
          url: repo.html_url,
          description: repo.description,
          language: repo.language,
          stars: repo.stargazers_count,
          updatedAt: repo.updated_at,
        }));

      return { repos, profileUrl, error: null };
    } catch (err) {
      console.error("GitHub request error:", err);
      return { ...fallback, error: "Could not load GitHub projects right now." };
    }
  },
);
