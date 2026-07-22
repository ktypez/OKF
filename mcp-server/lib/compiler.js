import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execSync } from "child_process";
import { z } from "zod";
import { getOkfRoot, readFrontmatter, readBody } from "./okf.js";
import { getDb } from "./db.js";

// ── Zod Schemas ──────────────────────────────────────────

const dateRe = /^\d{4}-\d{2}-\d{2}$/;

const stackSchema = z.object({
  language: z.string().optional(),
  framework: z.string().optional(),
  ui: z.string().optional(),
  database: z.string().optional(),
  storage: z.string().optional(),
  state: z.string().optional(),
  auth: z.string().optional(),
  testing: z.string().optional(),
  deployment: z.string().optional(),
  ci: z.string().optional(),
}).optional();

const profileSchema = z.object({
  type: z.literal("project-profile"),
  id: z.string().min(1),
  project: z.string().min(1),
  last_updated: z.string().regex(dateRe),
  status: z.enum(["active", "archived"]),
  stack: stackSchema,
  agent_personality: z.string().optional(),
  links: z.object({
    agent: z.string().optional(),
    status: z.string().optional(),
  }).optional(),
});

const agentSchema = z.object({
  type: z.literal("agent-profile"),
  id: z.string().min(1),
  project: z.string().min(1),
  last_updated: z.string().regex(dateRe),
  status: z.enum(["active", "archived"]).optional(),
  personality: z.string().optional(),
  links: z.object({
    profile: z.string().optional(),
    status: z.string().optional(),
  }).optional(),
});

const statusSchema = z.object({
  type: z.literal("project-status"),
  id: z.string().min(1),
  project: z.string().min(1),
  last_updated: z.string().regex(dateRe),
  status: z.enum(["active", "archived"]).optional(),
  links: z.object({
    profile: z.string().optional(),
    agent: z.string().optional(),
  }).optional(),
});

const VALIDATORS = {
  "project-profile": profileSchema,
  "agent-profile": agentSchema,
  "project-status": statusSchema,
};

// ── Helpers ──────────────────────────────────────────────

function sha256(content) {
  return crypto.createHash("sha256").update(content, "utf-8").digest("hex");
}

function isoNow() {
  return new Date().toISOString();
}

function toIsoDate(dateStr) {
  if (!dateStr) return null;
  // YYYY-MM-DD → ISO 8601
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return `${dateStr}T00:00:00Z`;
  }
  return dateStr;
}

// Body field extraction (regex fallback for non-frontmatter content)
const EXTRACTORS = {
  description: /\*\*Description:\*\*\s*(.+)/,
  purpose: /\*\*Purpose:\*\*\s*(.+)/,
  repository: /\*\*Repository:\*\*\s*(.+)/,
  owner: /\*\*Owner:\*\*\s*(.+)/,
};

function extractField(body, key) {
  const re = EXTRACTORS[key];
  if (!re) return null;
  const m = body.match(re);
  return m ? m[1].trim() : null;
}

function extractList(body, pattern) {
  const re = new RegExp(pattern.source || pattern);
  const m = body.match(re);
  if (!m) return [];
  return m[1].split(",").map((s) => s.trim().replace(/`/g, ""));
}

// ── Scanning ─────────────────────────────────────────────

function isProjectFile(relPath) {
  return relPath.startsWith("projects/") && relPath.endsWith(".md");
}

function getProjectInfo(relPath) {
  // projects/<name>/<type>.md
  const parts = relPath.split("/");
  if (parts.length < 3) return null;
  const projectName = parts[1];
  const fileName = parts[2].replace(".md", "");
  const type = fileName; // "profile", "agent", "status"
  return { projectName, type };
}

function isSystemFile(relPath) {
  return relPath.startsWith("system/") && relPath.endsWith(".md");
}

// ── File Tracker ─────────────────────────────────────────

function getTrackedHash(relPath, db) {
  const row = db.prepare("SELECT hash FROM file_tracker WHERE path = ?").get(relPath);
  return row ? row.hash : null;
}

function updateTracker(relPath, content, db) {
  const hash = sha256(content);
  const now = isoNow();
  db.prepare(
    "INSERT OR REPLACE INTO file_tracker (path, hash, size, updated_at) VALUES (?, ?, ?, ?)"
  ).run(relPath, hash, Buffer.byteLength(content, "utf-8"), now);
}

// ── Parse + Validate Single File ─────────────────────────

function parseFile(relPath, strict) {
  const fullPath = path.join(getOkfRoot(), relPath);
  if (!fs.existsSync(fullPath)) return null;

  const rawContent = fs.readFileSync(fullPath, "utf-8");
  const fm = readFrontmatter(fullPath);
  const body = readBody(fullPath);

  if (!fm) {
    const msg = `[warn] ${relPath}: no valid frontmatter`;
    if (strict) throw new Error(msg);
    return { error: msg, relPath, rawContent };
  }

  // Check OKF conformance: must have non-empty `type`
  if (!fm.type || typeof fm.type !== "string" || fm.type.trim() === "") {
    const msg = `[warn] ${relPath}: missing or empty 'type' field (OKF §4.1)`;
    if (strict) throw new Error(msg);
    return { error: msg, relPath, rawContent, fm, body };
  }

  // Validate against specific schema if we have one
  const validator = VALIDATORS[fm.type];
  if (validator) {
    const result = validator.safeParse(fm);
    if (!result.success) {
      const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      const msg = `[warn] ${relPath}: validation failed — ${issues}`;
      if (strict) throw new Error(msg);
      return { error: msg, relPath, rawContent, fm, body };
    }
  }

  return { error: null, relPath, rawContent, fm, body };
}

// ── Project Record Builder ───────────────────────────────

function buildRecord(projectName, profile, agent, status) {
  const fm = profile?.fm || {};
  const stack = fm.stack || {};
  const body = profile?.body || "";
  const agentBody = agent?.body || "";
  const statusBody = status?.body || "";

  // Extract from body regex
  const desc = extractField(body, "description");
  const purpose = extractField(body, "purpose");
  const repository = extractField(body, "repository");

  // Entity extraction from stack
  const entities = [];
  if (stack.language) entities.push({ name: stack.language, type: "language" });
  if (stack.framework) {
    // Split compound like "React 19 + Vite 8"
    stack.framework.split("+").forEach((f) => {
      const name = f.trim().replace(/\s+\d+[\d.]*$/, ""); // strip version
      entities.push({ name, type: "framework" });
    });
  }
  if (stack.database) {
    stack.database.split("+").forEach((d) => {
      entities.push({ name: d.trim(), type: "database" });
    });
  }
  if (stack.deployment) entities.push({ name: stack.deployment, type: "deployment" });
  if (stack.ui) entities.push({ name: stack.ui, type: "ui" });
  if (stack.state) entities.push({ name: stack.state, type: "state-management" });
  if (stack.auth) entities.push({ name: stack.auth, type: "auth" });
  if (stack.testing) entities.push({ name: stack.testing, type: "testing" });
  if (stack.storage) entities.push({ name: stack.storage, type: "storage" });

  // Tags = unique entity names
  const tags = [...new Set(entities.map((e) => e.name))];

  // OKF-aligned fields
  const okfType = fm.type || "project-profile";
  const okfTitle = fm.project || projectName;
  const okfDesc = desc || null;
  const okfResource = repository || null;

  return {
    id: projectName,
    name: stack.framework || fm.project || projectName,
    display_name: null,
    description: desc,
    purpose,
    repository,
    owner: extractField(body, "owner"),
    status: fm.status || "active",
    last_updated: fm.last_updated ? String(fm.last_updated) : null,
    languages: stack.language ? [stack.language] : [],
    frameworks: stack.framework ? [stack.framework] : [],
    runtime: null,
    package_manager: null,
    build_system: null,
    deployment_targets: stack.deployment ? [stack.deployment] : [],
    major_libraries: [],
    external_services: [],
    databases: stack.database ? [stack.database] : [],
    cloud_providers: inferCloudProviders(stack),
    agent_personality: fm.agent_personality || agent?.fm?.personality || null,
    source_path: getSourcePath(projectName),
    // v2 content
    profile_body: body,
    agent_body: agentBody,
    status_body: statusBody,
    profile_frontmatter: JSON.stringify(profile?.fm || {}),
    agent_frontmatter: JSON.stringify(agent?.fm || {}),
    status_frontmatter: JSON.stringify(status?.fm || {}),
    // OKF fields
    okf_type: okfType,
    okf_title: okfTitle,
    okf_description: okfDesc,
    okf_resource: okfResource,
    okf_tags: JSON.stringify(tags),
    okf_timestamp: toIsoDate(fm.last_updated),
    updated_at: isoNow(),
    // Extracted entities (for graph building, not stored directly)
    _entities: entities,
  };
}

function inferCloudProviders(stack) {
  const providers = [];
  const db = (stack.database || "").toLowerCase();
  const storage = (stack.storage || "").toLowerCase();
  const deployment = (stack.deployment || "").toLowerCase();
  if (db.includes("supabase") || storage.includes("supabase")) providers.push("Supabase");
  if (db.includes("cloudflare") || storage.includes("cloudflare") || deployment.includes("cloudflare")) providers.push("Cloudflare");
  if (deployment.includes("vercel")) providers.push("Vercel");
  if (deployment.includes("render")) providers.push("Render.com");
  if (storage.includes("neon") || db.includes("neon")) providers.push("Neon");
  return providers;
}

function getSourcePath(project) {
  const map = {
    truck: "/home/truck",
    habby: "/home/habby",
    "mcky.space": "/home/mcky.space",
    "data.mcky.space": "/home/data.mcky.space",
    collage: "/home/collage",
    "receipts-dms": "/home/paper/receipts-dms",
    writer: "/home",
    clientdata: "/home/clientdata",
  };
  return map[project] || null;
}

// ── SQLite Insert ────────────────────────────────────────

function upsertProject(db, record) {
  const insert = db.prepare(`
    INSERT OR REPLACE INTO projects (
      id, name, display_name, description, purpose,
      repository, owner, status, last_updated,
      languages, frameworks, runtime, package_manager,
      build_system, deployment_targets, major_libraries,
      external_services, databases, cloud_providers,
      agent_personality, source_path,
      profile_body, agent_body, status_body,
      profile_frontmatter, agent_frontmatter, status_frontmatter,
      okf_type, okf_title, okf_description, okf_resource,
      okf_tags, okf_timestamp, updated_at
    ) VALUES (
      $id, $name, $display_name, $description, $purpose,
      $repository, $owner, $status, $last_updated,
      $languages, $frameworks, $runtime, $package_manager,
      $build_system, $deployment_targets, $major_libraries,
      $external_services, $databases, $cloud_providers,
      $agent_personality, $source_path,
      $profile_body, $agent_body, $status_body,
      $profile_frontmatter, $agent_frontmatter, $status_frontmatter,
      $okf_type, $okf_title, $okf_description, $okf_resource,
      $okf_tags, $okf_timestamp, $updated_at
    )
  `).run({
    $id: record.id,
    $name: record.name,
    $display_name: record.display_name,
    $description: record.description,
    $purpose: record.purpose,
    $repository: record.repository,
    $owner: record.owner,
    $status: record.status,
    $last_updated: record.last_updated,
    $languages: JSON.stringify(record.languages),
    $frameworks: JSON.stringify(record.frameworks),
    $runtime: record.runtime,
    $package_manager: record.package_manager,
    $build_system: record.build_system,
    $deployment_targets: JSON.stringify(record.deployment_targets),
    $major_libraries: JSON.stringify(record.major_libraries),
    $external_services: JSON.stringify(record.external_services),
    $databases: JSON.stringify(record.databases),
    $cloud_providers: JSON.stringify(record.cloud_providers),
    $agent_personality: record.agent_personality,
    $source_path: record.source_path,
    $profile_body: record.profile_body,
    $agent_body: record.agent_body,
    $status_body: record.status_body,
    $profile_frontmatter: record.profile_frontmatter,
    $agent_frontmatter: record.agent_frontmatter,
    $status_frontmatter: record.status_frontmatter,
    $okf_type: record.okf_type,
    $okf_title: record.okf_title,
    $okf_description: record.okf_description,
    $okf_resource: record.okf_resource,
    $okf_tags: record.okf_tags,
    $okf_timestamp: record.okf_timestamp,
    $updated_at: record.updated_at,
  });
}

// ── Entities & Edges ─────────────────────────────────────

function upsertEntities(db, entities) {
  const insert = db.prepare(
    "INSERT OR IGNORE INTO entities (name, type, usage_count, updated_at) VALUES (?, ?, 1, ?)"
  );
  const update = db.prepare(
    "UPDATE entities SET usage_count = usage_count + 1, updated_at = ? WHERE name = ?"
  );
  const now = isoNow();

  for (const entity of entities) {
    insert.run(entity.name, entity.type, now);
    // If insert failed (duplicate), increment count
    update.run(now, entity.name);
  }
}

function upsertEdges(db, projectName, entities) {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO edges (source_type, source_id, target_type, target_id, relation, updated_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const now = isoNow();

  for (const entity of entities) {
    insert.run("project", projectName, entity.type, entity.name, "uses", now);
  }
}

// ── Git Commit ───────────────────────────────────────────

function gitCommit(changedCount) {
  try {
    const okfRoot = getOkfRoot();
    // Check if there are actual changes
    const status = execSync("git status --porcelain", { cwd: okfRoot, encoding: "utf-8" }).trim();
    if (!status) return;

    execSync("git add -A", { cwd: okfRoot });
    execSync(`git commit -m "kb: auto-sync ${changedCount} file(s)"`, {
      cwd: okfRoot,
      encoding: "utf-8",
    });
    console.log(`  [git] committed ${changedCount} change(s)`);
  } catch (err) {
    // git commit can fail for many reasons (no changes, not a repo, etc.)
    console.log(`  [git] skip: ${err.message}`);
  }
}

// ── Main Compile ─────────────────────────────────────────

export async function compile({ strict = false, commit = true } = {}) {
  const db = await getDb();
  const okfRoot = getOkfRoot();

  // 1. Scan all .md files
  const allFiles = walkMd(okfRoot);
  const projectFiles = allFiles.filter(isProjectFile);
  const systemFiles = allFiles.filter(isSystemFile);

  // 2. Group project files by project
  const projectMap = {};
  for (const relPath of projectFiles) {
    const info = getProjectInfo(relPath);
    if (!info) continue;
    if (!projectMap[info.projectName]) projectMap[info.projectName] = {};
    projectMap[info.projectName][info.type] = relPath;
  }

  // 3. Parse all files, track changes
  const changedFiles = [];
  const errors = [];
  const parsed = {};

  const allRelPaths = [...projectFiles, ...systemFiles];
  for (const relPath of allRelPaths) {
    const fullPath = path.join(okfRoot, relPath);
    if (!fs.existsSync(fullPath)) continue;
    const rawContent = fs.readFileSync(fullPath, "utf-8");
    const hash = sha256(rawContent);
    const tracked = getTrackedHash(relPath, db);

    if (tracked === hash) {
      parsed[relPath] = null; // unchanged, skip
      continue;
    }

    const result = parseFile(relPath, strict);
    if (result.error) {
      errors.push(result.error);
      if (strict) throw new Error(result.error);
    }
    parsed[relPath] = result;
    changedFiles.push(relPath);
  }

  if (changedFiles.length === 0) {
    console.log("[compile] up-to-date");
    return { status: "up-to-date", changed: 0, errors: errors.length };
  }

  console.log(`[compile] ${changedFiles.length} file(s) changed`);

  // 4. Build project records from parsed profile/agent/status
  const projectDirs = fs.readdirSync(path.join(okfRoot, "projects"), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const projectName of projectDirs) {
    const profilePath = `projects/${projectName}/profile.md`;
    const agentPath = `projects/${projectName}/agent.md`;
    const statusPath = `projects/${projectName}/status.md`;

    const profile = parsed[profilePath] || (fs.existsSync(path.join(okfRoot, profilePath))
      ? parseFile(profilePath, false) : null);
    const agent = parsed[agentPath] || (fs.existsSync(path.join(okfRoot, agentPath))
      ? parseFile(agentPath, false) : null);
    const status = parsed[statusPath] || (fs.existsSync(path.join(okfRoot, statusPath))
      ? parseFile(statusPath, false) : null);

    if (!profile?.fm && !agent?.fm && !status?.fm) continue;

    const record = buildRecord(
      projectName,
      profile || { fm: {}, body: "" },
      agent || { fm: {}, body: "" },
      status || { fm: {}, body: "" }
    );

    upsertProject(db, record);

    // Extract entities and build edges
    if (record._entities.length > 0) {
      upsertEntities(db, record._entities);
      upsertEdges(db, projectName, record._entities);
    }

    console.log(`  [project] ${projectName}`);
  }

  // 5. Update file tracker
  for (const relPath of changedFiles) {
    const fullPath = path.join(okfRoot, relPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      updateTracker(relPath, content, db);
    }
  }

  // 6. Git commit
  if (commit && changedFiles.length > 0) {
    gitCommit(changedFiles.length);
  }

  console.log(`[compile] done — ${changedFiles.length} file(s), ${errors.length} warning(s)`);

  return {
    status: "compiled",
    changed: changedFiles.length,
    errors: errors.length,
    errorDetails: errors,
  };
}

// ── Walk .md files ───────────────────────────────────────

function walkMd(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    if (entry.name === "node_modules") continue;
    if (entry.name === "mcp-server") continue;
    if (entry.name === "plan") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMd(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(path.relative(getOkfRoot(), full));
    }
  }
  return files;
}

// ── CLI: run directly ────────────────────────────────────

if (process.argv[1] && process.argv[1].endsWith("compiler.js")) {
  const strict = process.argv.includes("--strict");
  const noCommit = process.argv.includes("--no-commit");
  compile({ strict, commit: !noCommit }).then((result) => {
    console.log(JSON.stringify(result, null, 2));
  }).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
