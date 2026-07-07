/**
 * GitHub API Helper for OKF MCP Server
 * Reads/writes files from the OKF repository via GitHub REST API
 */

interface GitHubConfig {
  owner: string;
  repo: string;
  token: string;
}

interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  content: string;
  encoding: string;
}

interface GitHubDirEntry {
  name: string;
  path: string;
  type: string;
  sha: string;
  size: number;
}

interface GitHubCommitResponse {
  commit: {
    sha: string;
    message: string;
  };
}

export class GitHubAPI {
  private config: GitHubConfig;
  private baseUrl = "https://api.github.com";

  constructor(config: GitHubConfig) {
    this.config = config;
  }

  private get headers() {
    return {
      Authorization: `Bearer ${this.config.token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }

  /**
   * Get file content from repository
   */
  async getFile(filePath: string): Promise<GitHubFile> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${filePath}`;
    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as GitHubFile;
    // Decode base64 content
    if (data.encoding === "base64" && data.content) {
      data.content = atob(data.content.replace(/\n/g, ""));
    }
    return data;
  }

  /**
   * List directory contents
   */
  async listDirectory(dirPath: string): Promise<GitHubDirEntry[]> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${dirPath}`;
    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as GitHubDirEntry[];
  }

  /**
   * Create or update a file
   */
  async writeFile(
    filePath: string,
    content: string,
    message: string,
    sha?: string
  ): Promise<GitHubCommitResponse> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/contents/${filePath}`;

    const body: Record<string, unknown> = {
      message,
      content: btoa(content), // Encode to base64
    };

    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return (await response.json()) as GitHubCommitResponse;
  }

  /**
   * Search files in repository (simple implementation using tree)
   */
  async searchFiles(query: string): Promise<{ path: string; score: number }[]> {
    // GitHub search API for code
    const url = `${this.baseUrl}/search/code?q=${encodeURIComponent(query)}+repo:${this.config.owner}/${this.config.repo}`;
    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      // If search fails, return empty
      return [];
    }

    const data = (await response.json()) as { items: { path: string; score: number }[] };
    return data.items?.map((item) => ({ path: item.path, score: item.score })) || [];
  }

  /**
   * Get repository tree for fast traversal
   */
  async getTree(ref: string = "HEAD"): Promise<{ path: string; sha: string; type: string }[]> {
    const url = `${this.baseUrl}/repos/${this.config.owner}/${this.config.repo}/git/trees/${ref}?recursive=1`;
    const response = await fetch(url, { headers: this.headers });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as { tree: { path: string; sha: string; type: string }[] };
    return data.tree || [];
  }
}