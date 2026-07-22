import chokidar from "chokidar";
import path from "path";
import { getOkfRoot } from "./okf.js";
import { compile } from "./compiler.js";

let watcher = null;
const DEBOUNCE_MS = 500;
let timer = null;
let pendingChanges = new Set();

// Directories to watch
function getWatchPaths() {
  const root = getOkfRoot();
  return [
    path.join(root, "projects"),
    path.join(root, "system"),
    path.join(root, "index.md"),
  ];
}

// Patterns to ignore
function getIgnored(pattern) {
  return [
    /[/\\]node_modules[/\\]/,
    /[/\\]\.git[/\\]/,
    /[/\\]mcp-server[/\\]/,
    /[/\\]plan[/\\]/,
    /\.gitignore$/,
    /package\.json$/,
    /package-lock\.json$/,
  ].some((re) => re.test(pattern));
}

async function flushChanges() {
  if (pendingChanges.size === 0) return;

  const files = [...pendingChanges].filter((f) => f.endsWith(".md"));
  pendingChanges.clear();

  if (files.length === 0) return;

  console.log(`[watcher] detected ${files.length} .md change(s), compiling...`);
  try {
    const result = await compile({ strict: false, commit: true });
    console.log(`[watcher] ${result.status} — ${result.changed} file(s)`);
  } catch (err) {
    console.error(`[watcher] compile error: ${err.message}`);
  }
}

function onChange(filePath) {
  if (getIgnored(filePath)) return;
  if (!filePath.endsWith(".md")) return;

  pendingChanges.add(filePath);

  if (timer) clearTimeout(timer);
  timer = setTimeout(flushChanges, DEBOUNCE_MS);
}

// ── Public API ───────────────────────────────────────────

export function startWatcher() {
  if (watcher) return;

  const paths = getWatchPaths();

  watcher = chokidar.watch(paths, {
    ignored: /[/\\](node_modules|\.git|mcp-server|plan)[/\\]/,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  });

  watcher.on("change", onChange);
  watcher.on("add", onChange);
  watcher.on("unlink", onChange);

  console.log("[watcher] started watching ~/OKF/");
}

export function stopWatcher() {
  if (watcher) {
    watcher.close();
    watcher = null;
    if (timer) clearTimeout(timer);
    timer = null;
    pendingChanges.clear();
    console.log("[watcher] stopped");
  }
}

export function isWatching() {
  return watcher !== null;
}
