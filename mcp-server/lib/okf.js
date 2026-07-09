import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const OKF_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "..");

export function getOkfRoot() {
  return OKF_ROOT;
}

export function walkMd(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".next") continue;
      files.push(...walkMd(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

export function readFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  try {
    const fm = yaml.load(match[1]);
    return fm || {};
  } catch {
    return null;
  }
}

export function readBody(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const body = content.replace(/^---\n[\s\S]*?\n---\n?/, "");
  return body;
}

export function serializeNode(fm, body) {
  const fmStr = yaml.dump(fm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  return "---\n" + fmStr + "---\n\n" + body + "\n";
}

export function listProjects() {
  const projectsDir = path.join(OKF_ROOT, "projects");
  if (!fs.existsSync(projectsDir)) return [];
  return fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getProjectFiles(project) {
  const projDir = path.join(OKF_ROOT, "projects", project);
  if (!fs.existsSync(projDir)) return [];
  return walkMd(projDir);
}

export function listDir(relPath = ".") {
  const fullPath = path.join(OKF_ROOT, relPath);
  if (!fs.existsSync(fullPath)) return [];
  const entries = fs.readdirSync(fullPath, { withFileTypes: true });
  return entries.map((e) => ({
    name: e.name,
    type: e.isDirectory() ? "dir" : "file",
  }));
}

export function readFile(relPath) {
  const fullPath = path.join(OKF_ROOT, relPath);
  if (!fs.existsSync(fullPath)) return null;
  return fs.readFileSync(fullPath, "utf-8");
}

export function writeFile(relPath, content) {
  const fullPath = path.join(OKF_ROOT, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
}

export function queryNodes({ project, type, status } = {}) {
  const results = [];
  const projects = project ? [project] : listProjects();

  for (const proj of projects) {
    const files = getProjectFiles(proj);
    for (const filePath of files) {
      const fm = readFrontmatter(filePath);
      if (!fm || !fm.id) continue;
      if (type && fm.type !== type) continue;
      if (status && fm.status !== status) continue;
      const relPath = path.relative(OKF_ROOT, filePath);
      results.push({ ...fm, file: relPath, project: proj });
    }
  }
  return results;
}

export function getNode(project, id) {
  const files = getProjectFiles(project);
  for (const filePath of files) {
    const fm = readFrontmatter(filePath);
    if (fm && fm.id === id) {
      const body = readBody(filePath);
      const relPath = path.relative(OKF_ROOT, filePath);
      return { frontmatter: fm, body, file: relPath };
    }
  }
  return null;
}

export function searchNodes(query, project) {
  const results = [];
  const projects = project ? [project] : listProjects();
  const lower = query.toLowerCase();

  for (const proj of projects) {
    const files = getProjectFiles(proj);
    for (const filePath of files) {
      const content = fs.readFileSync(filePath, "utf-8");
      if (!content.toLowerCase().includes(lower)) continue;
      const fm = readFrontmatter(filePath);
      const relPath = path.relative(OKF_ROOT, filePath);
      const lines = content.split("\n");
      const matches = [];
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].toLowerCase().includes(lower)) {
          matches.push({ line: i + 1, text: lines[i].trim() });
        }
      }
      results.push({
        file: relPath,
        id: fm?.id || null,
        type: fm?.type || null,
        matches,
      });
    }
  }
  return results;
}

export function getNextId(project, prefix) {
  const knowledgeDir = path.join(OKF_ROOT, "projects", project, "knowledge");
  const tasksDir = path.join(OKF_ROOT, "projects", project, "tasks");
  let maxNum = 0;

  for (const dir of [knowledgeDir, tasksDir]) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix + "-") && f.endsWith(".md"));
    for (const f of files) {
      const num = parseInt(f.replace(prefix + "-", "").replace(".md", ""), 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  }

  return prefix + "-" + String(maxNum + 1).padStart(3, "0");
}

export function createNode({ project, type, title, body, links = [] }) {
  const prefix = type === "decision" ? "DEC" : type === "lesson" ? "LSN" : type === "component" ? "COMP" : type === "document" ? "DOC" : type === "risk" ? "RSK" : "NODE";
  const id = getNextId(project, prefix);
  const today = new Date().toISOString().split("T")[0];

  const fm = {
    type,
    id,
    project,
    last_updated: today,
    status: "active",
    freshness: today,
    verified: today,
    expires: null,
    superseded_by: null,
    anchors: [],
    links: links.map((l) => (typeof l === "string" ? { type: "relates-to", target: l } : l)),
  };

  const relPath = `projects/${project}/knowledge/${id}.md`;
  const content = serializeNode(fm, `# ${id}: ${title}\n\n${body}`);
  writeFile(relPath, content);

  return { id, file: relPath, frontmatter: fm };
}

export function updateNode(project, id, patch) {
  const files = getProjectFiles(project);
  for (const filePath of files) {
    const fm = readFrontmatter(filePath);
    if (fm && fm.id === id) {
      const today = new Date().toISOString().split("T")[0];
      const body = readBody(filePath);

      if (patch.body !== undefined) {
        const newFm = { ...fm, ...patch.frontmatter, last_updated: today, freshness: today };
        delete newFm.body;
        const content = serializeNode(newFm, patch.body);
        writeFile(path.relative(OKF_ROOT, filePath), content);
        return { id, file: path.relative(OKF_ROOT, filePath), frontmatter: newFm };
      }

      const newFm = { ...fm, ...patch, last_updated: today, freshness: today };
      const content = serializeNode(newFm, body);
      writeFile(path.relative(OKF_ROOT, filePath), content);
      return { id, file: path.relative(OKF_ROOT, filePath), frontmatter: newFm };
    }
  }
  return null;
}

export function updateStatus(project, id, status) {
  return updateNode(project, id, { status });
}

export function addEdge(project, id, linkType, target) {
  const files = getProjectFiles(project);
  for (const filePath of files) {
    const fm = readFrontmatter(filePath);
    if (fm && fm.id === id) {
      const today = new Date().toISOString().split("T")[0];
      const body = readBody(filePath);
      const links = fm.links || [];
      const exists = links.some((l) => l.type === linkType && l.target === target);
      if (exists) return { id, file: path.relative(OKF_ROOT, filePath), note: "link already exists" };

      links.push({ type: linkType, target });
      const newFm = { ...fm, links, last_updated: today };
      const content = serializeNode(newFm, body);
      writeFile(path.relative(OKF_ROOT, filePath), content);
      return { id, file: path.relative(OKF_ROOT, filePath), frontmatter: newFm };
    }
  }
  return null;
}

export function doctor(project) {
  const today = new Date().toISOString().split("T")[0];
  const findings = [];
  const checkTypes = ["decision", "lesson", "component", "document", "index"];
  const nodes = queryNodes({ project });

  for (const node of nodes) {
    if (!checkTypes.includes(node.type)) continue;

    if (node.status === "active" && node.verified) {
      const days = Math.floor((Date.now() - new Date(node.verified).getTime()) / 86400000);
      if (days >= 30) {
        findings.push({ severity: "warning", node: node.id, project: node.project, message: `Unverified for ${days} days` });
      }
    }

    if (node.expires && node.expires < today && node.status === "active") {
      findings.push({ severity: "error", node: node.id, project: node.project, message: `Expired on ${node.expires}` });
    }

    if (node.superseded_by && node.status !== "superseded" && node.status !== "archived") {
      findings.push({ severity: "warning", node: node.id, project: node.project, message: `Superseded by ${node.superseded_by} but still ${node.status}` });
    }

    if (!node.freshness) {
      findings.push({ severity: "info", node: node.id, project: node.project, message: "Missing freshness date" });
    }
  }

  // Auto-fix expired
  const expired = findings.filter((f) => f.severity === "error" && f.message.startsWith("Expired"));
  for (const f of expired) {
    updateStatus(f.project, f.node, "expired");
  }

  return { total_nodes: nodes.length, findings, auto_fixed: expired.length };
}
