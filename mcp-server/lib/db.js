import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";
import { getOkfRoot } from "./okf.js";

const DB_PATH = path.join(getOkfRoot(), "mcp-server", "okf.db");

let db;

export async function getDb() {
  if (!db) {
    const SQL = await initSqlJs();

    if (fs.existsSync(DB_PATH)) {
      const buffer = fs.readFileSync(DB_PATH);
      db = new SQL.Database(buffer);
    } else {
      db = new SQL.Database();
    }

    initSchema();
  }
  return db;
}

function initSchema() {
  db.run(`
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
      source_path TEXT
    );
  `);
}

export function saveDb() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

export function closeDb() {
  if (db) {
    saveDb();
    db.close();
    db = null;
  }
}
