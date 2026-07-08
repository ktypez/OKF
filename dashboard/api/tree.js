/**
 * Vercel API Route - GitHub Tree API
 * Returns file tree for the OKF repository
 */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    return res.status(500).json({ error: "GitHub credentials not configured" });
  }

  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/git/trees/HEAD?recursive=1`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `GitHub API error: ${response.status} ${response.statusText}`,
      });
    }

    const data = await response.json();
    const tree = (data.tree || []).filter(
      (item) => item.type === "blob" || item.type === "tree"
    );

    return res.status(200).json({ tree });
  } catch (error) {
    return res.status(500).json({
      error: `Failed to fetch tree: ${error.message}`,
    });
  }
}
