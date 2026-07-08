/**
 * Vercel API Route - GitHub API Proxy
 * Proxies requests to GitHub API with authentication
 * Keeps the token server-side (not exposed in browser)
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing path parameter" });
  }

  // Get GitHub credentials from environment variables
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    return res.status(500).json({ error: "GitHub credentials not configured" });
  }

  try {
    // Build GitHub API URL
    const githubUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const response = await fetch(githubUrl, {
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

    // If it's a file with base64 content, decode it
    if (data.encoding === "base64" && data.content) {
      data.content = Buffer.from(data.content.replace(/\n/g, ""), "base64").toString("utf-8");
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: `Failed to fetch from GitHub: ${error.message}`,
    });
  }
}