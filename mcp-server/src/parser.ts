/**
 * YAML Frontmatter Parser for OKF files
 * Parses OKF format: YAML frontmatter + Markdown body
 */

import yaml from "js-yaml";

export interface OKFFrontmatter {
  type?: string;
  id?: string;
  project?: string;
  last_updated?: string;
  status?: string;
  freshness?: string;
  verified?: string;
  expires?: string | null;
  superseded_by?: string | null;
  claimed_by?: string;
  priority?: string;
  component?: string;
  opened?: string;
  closed?: string;
  anchors?: string[];
  links?: Array<{ type: string; target: string } | string>;
  [key: string]: unknown;
}

export interface OKFFile {
  frontmatter: OKFFrontmatter;
  body: string;
  raw: string;
}

/**
 * Parse OKF file content (YAML frontmatter + Markdown body)
 */
export function parseOKFFile(content: string): OKFFile {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return {
      frontmatter: {},
      body: content,
      raw: content,
    };
  }

  try {
    const frontmatter = (yaml.load(match[1]) as OKFFrontmatter) || {};
    const body = match[2];
    return {
      frontmatter,
      body,
      raw: content,
    };
  } catch {
    return {
      frontmatter: {},
      body: content.replace(/^---\n[\s\S]*?\n---\n?/, ""),
      raw: content,
    };
  }
}

/**
 * Serialize OKF file content (frontmatter + body)
 */
export function serializeOKFFile(frontmatter: OKFFrontmatter, body: string): string {
  const frontmatterStr = yaml.dump(frontmatter, {
    lineWidth: 120,
    quotingType: "'",
    forceQuotes: false,
  });
  return `---\n${frontmatterStr}---\n${body}`;
}

/**
 * Extract description from markdown body (first heading or first paragraph)
 */
export function extractDescription(body: string): string {
  const lines = body.trim().split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      return trimmed.replace(/^#\s*/, "");
    }
    if (trimmed && !trimmed.startsWith("---")) {
      return trimmed.substring(0, 100);
    }
  }
  return "";
}

/**
 * Build composite key for node (project/id)
 */
export function compositeKey(id: string, project: string | null): string {
  return project ? `${project}/${id}` : id;
}