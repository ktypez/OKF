import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { getOkfRoot, readFrontmatter, readFile } from "./okf.js";
import { getDb, saveDb, closeDb } from "./db.js";

function parseProfile(project) {
  const filePath = path.join(getOkfRoot(), "projects", project, "profile.md");
  const content = readFile(`projects/${project}/profile.md`);
  if (!content) return null;

  const fm = readFrontmatter(filePath);
  if (!fm) return null;

  const stack = fm.stack || {};
  const body = content.replace(/^---\n[\s\S]*?\n---\n?/, "");

  // Extract from frontmatter stack object (primary)
  // Fallback to markdown body regex patterns (backwards compat)
  const extract = (pattern) => {
    const match = body.match(pattern);
    return match ? match[1].trim() : null;
  };

  const extractList = (pattern) => {
    const match = body.match(pattern);
    if (!match) return [];
    return match[1].split(",").map((s) => s.trim().replace(/`/g, ""));
  };

  return {
    id: project,
    name: stack.framework || fm.project || project,
    display_name: null,
    description: extract(/\*\*Description:\*\*\s*(.+)/),
    purpose: extract(/\*\*Purpose:\*\*\s*(.+)/),
    repository: extract(/\*\*Repository:\*\*\s*(.+)/),
    owner: null,
    status: fm.status || "active",
    last_updated: fm.last_updated ? String(fm.last_updated) : null,
    // From frontmatter stack object
    languages: stack.language ? [stack.language] : extractList(/\*\*Languages:\*\*\s*(.+)/),
    frameworks: stack.framework ? [stack.framework] : extractList(/\*\*Frameworks:\*\*\s*(.+)/),
    runtime: extract(/\*\*Runtime:\*\*\s*(.+)/),
    package_manager: extract(/\*\*Package Manager:\*\*\s*(.+)/),
    build_system: extract(/\*\*Build System:\*\*\s*(.+)/),
    deployment_targets: stack.deployment ? [stack.deployment] : extractList(/\*\*Deployment Targets:\*\*\s*(.+)/),
    major_libraries: extractList(/\*\*Major Libraries:\*\*\s*(.+)/),
    external_services: extractList(/\*\*External Services:\*\*\s*(.+)/),
    databases: stack.database ? [stack.database] : extractList(/\*\*Databases:\*\*\s*(.+)/),
    cloud_providers: extractCloudProviders(stack),
    agent_personality: fm.agent_personality || null,
    source_path: getSourcePath(project),
  };
}

function extractCloudProviders(stack) {
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
  const sourceMap = {
    truck: "/home/truck",
    habby: "/home/habby",
    "mcky.space": "/home/mcky.space",
    "data.mcky.space": "/home/data.mcky.space",
    collage: "/home/collage",
    "receipts-dms": "/home/paper/receipts-dms",
    writer: "/home",
    clientdata: "/home/clientdata",
  };
  return sourceMap[project] || null;
}

async function syncProjects() {
  const db = await getDb();
  const projectsDir = path.join(getOkfRoot(), "projects");
  const projects = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const insert = db.prepare(`
    INSERT OR REPLACE INTO projects (
      id, name, display_name, description, purpose, repository, owner,
      status, last_updated, languages, frameworks, runtime, package_manager,
      build_system, deployment_targets, major_libraries, external_services,
      databases, cloud_providers, agent_personality, source_path
    ) VALUES (
      $id, $name, $display_name, $description, $purpose, $repository, $owner,
      $status, $last_updated, $languages, $frameworks, $runtime, $package_manager,
      $build_system, $deployment_targets, $major_libraries, $external_services,
      $databases, $cloud_providers, $agent_personality, $source_path
    )
  `);

  let synced = 0;
  for (const project of projects) {
    const data = parseProfile(project);
    if (!data) {
      console.log(`  [skip] ${project} — no profile.md`);
      continue;
    }

    insert.run({
      $id: data.id,
      $name: data.name,
      $display_name: data.display_name,
      $description: data.description,
      $purpose: data.purpose,
      $repository: data.repository,
      $owner: data.owner,
      $status: data.status,
      $last_updated: data.last_updated ? String(data.last_updated) : null,
      $languages: JSON.stringify(data.languages),
      $frameworks: JSON.stringify(data.frameworks),
      $runtime: data.runtime,
      $package_manager: data.package_manager,
      $build_system: data.build_system,
      $deployment_targets: JSON.stringify(data.deployment_targets),
      $major_libraries: JSON.stringify(data.major_libraries),
      $external_services: JSON.stringify(data.external_services),
      $databases: JSON.stringify(data.databases),
      $cloud_providers: JSON.stringify(data.cloud_providers),
      $agent_personality: data.agent_personality,
      $source_path: data.source_path,
    });

    synced++;
    console.log(`  [synced] ${project}`);
  }

  saveDb();
  console.log(`\nSynced ${synced} projects to SQLite`);
  closeDb();
}

syncProjects();
