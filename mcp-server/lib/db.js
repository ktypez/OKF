import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import path from "path";
import { getOkfRoot } from "./okf.js";

const DB_PATH = path.join(getOkfRoot(), "mcp-server", "okf.db");
let db = null;

export function getDb() {
  if (!db) {
    const exists = fs.existsSync(DB_PATH);
    db = new DatabaseSync(DB_PATH);

    if (!exists) {
      // New DB — init schema
      initSchema();
    } else {
      // Existing DB — ensure tables exist
      initSchema();
    }

    db.exec("PRAGMA journal_mode=WAL");
  }
  return db;
}

const SCHEMA_VERSION = 2;

function initSchema() {
  // -- projects: full metadata + content body + OKF-aligned fields --
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT,
      display_name TEXT,
      description TEXT,
      purpose TEXT,
      repository TEXT,
      owner TEXT,
      status TEXT,
      last_updated TEXT,
      languages TEXT,
      frameworks TEXT,
      runtime TEXT,
      package_manager TEXT,
      build_system TEXT,
      deployment_targets TEXT,
      major_libraries TEXT,
      external_services TEXT,
      databases TEXT,
      cloud_providers TEXT,
      agent_personality TEXT,
      source_path TEXT,
      -- v2: full content
      profile_body TEXT,
      agent_body TEXT,
      status_body TEXT,
      profile_frontmatter TEXT,
      agent_frontmatter TEXT,
      status_frontmatter TEXT,
      -- v2: OKF-aligned fields
      okf_type TEXT,
      okf_title TEXT,
      okf_description TEXT,
      okf_resource TEXT,
      okf_tags TEXT,
      okf_timestamp TEXT,
      updated_at TEXT
    );
  `);

  // -- entities: extracted technologies, frameworks, databases --
  db.exec(`
    CREATE TABLE IF NOT EXISTS entities (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      usage_count INTEGER DEFAULT 1,
      updated_at TEXT
    );
  `);

  // -- edges: project → entity relationships --
  db.exec(`
    CREATE TABLE IF NOT EXISTS edges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_type TEXT NOT NULL,
      source_id TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT NOT NULL,
      relation TEXT NOT NULL,
      updated_at TEXT,
      UNIQUE(source_type, source_id, target_type, target_id, relation)
    );
  `);

  // -- file_tracker: track .md file changes via sha256 --
  db.exec(`
    CREATE TABLE IF NOT EXISTS file_tracker (
      path TEXT PRIMARY KEY,
      hash TEXT NOT NULL,
      size INTEGER,
      updated_at TEXT
    );
  `);

  // -- schema version tracking --
  db.exec(`
    CREATE TABLE IF NOT EXISTS schema_version (
      version INTEGER PRIMARY KEY
    );
  `);

  const row = db.prepare("SELECT version FROM schema_version ORDER BY version DESC LIMIT 1").get();
  const currentVersion = row ? row.version : 0;

  if (currentVersion < SCHEMA_VERSION) {
    db.prepare("INSERT OR REPLACE INTO schema_version (version) VALUES (?)").run(SCHEMA_VERSION);
  }
}

export function saveDb() {
  // node:sqlite auto-saves — nothing to do
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}

// -- Helper: clear all runtime data --
export function clearData() {
  if (!db) return;
  db.exec("DELETE FROM projects");
  db.exec("DELETE FROM entities");
  db.exec("DELETE FROM edges");
  db.exec("DELETE FROM file_tracker");
}
