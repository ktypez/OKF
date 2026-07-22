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
    return convertFmDates(fm) || {};
  } catch {
    return null;
  }
}

// js-yaml parses "2026-07-21" as Date — convert to ISO string
function convertFmDates(obj) {
  if (obj instanceof Date) return obj.toISOString().split("T")[0]; // "2026-07-21"
  if (Array.isArray(obj)) return obj.map(convertFmDates);
  if (obj && typeof obj === "object") {
    const result = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = convertFmDates(v);
    }
    return result;
  }
  return obj;
}

export function readBody(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const body = content.replace(/^---\n[\s\S]*?\n---\n?/, "");
  return body;
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
