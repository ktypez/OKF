/**
 * OKF Site Builder — Convert OKF KB .md files to Starlight content
 *
 * Scans ~/OKF/ for knowledge and system .md files,
 * copies them to ~/OKF/site/src/content/docs/ with Starlight-compatible frontmatter.
 * Generates sidebar config as JSON.
 *
 * Usage: node scripts/build-site.js
 */

const fs = require('fs');
const path = require('path');

const OKF_ROOT = path.resolve(__dirname, '..');
const SITE_ROOT = path.join(OKF_ROOT, 'site');
const DOCS_DIR = path.join(SITE_ROOT, 'src', 'content', 'docs');
const SIDEBAR_OUT = path.join(SITE_ROOT, 'src', 'data', 'sidebar.json');

function walkMd(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === '.next') continue;
      files.push(...walkMd(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(full);
    }
  }
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { fm: null, body: content };
  const yaml = require('js-yaml');
  try {
    const fm = yaml.load(match[1]) || {};
    const body = content.slice(match[0].length).trim();
    return { fm, body };
  } catch {
    return { fm: null, body: content };
  }
}

function extractTitle(fm, body, filename) {
  // Try first heading from body
  const headingMatch = body.match(/^#\s+(.+)$/m);
  if (headingMatch) return headingMatch[1].trim();

  // Use frontmatter id + type
  if (fm?.id) {
    const type = fm.type || '';
    return `${fm.id}${type ? ' (' + type + ')' : ''}`;
  }

  // Fallback to filename
  return filename.replace(/\.md$/, '');
}

function serializeStarlightFm(title, fm, body) {
  const yaml = require('js-yaml');

  // Starlight frontmatter — only standard fields
  const starlightFm = {
    title,
    description: fm?.project ? `${fm.type || 'document'} from ${fm.project}` : 'OKF knowledge base',
  };

  const fmStr = yaml.dump(starlightFm, { lineWidth: 120, quotingType: "'", forceQuotes: false });
  return '---\n' + fmStr + '---\n\n' + body + '\n';
}

function getProjectFiles(project) {
  const projDir = path.join(OKF_ROOT, 'projects', project);
  if (!fs.existsSync(projDir)) return [];

  const files = [];
  const metadata = ['profile.md', 'agent.md', 'status.md', 'structure.md', 'commands.md', 'dependencies.md', 'decisions.md', 'assets.md'];

  // Metadata files first (in order)
  for (const meta of metadata) {
    const fp = path.join(projDir, meta);
    if (fs.existsSync(fp)) files.push(fp);
  }

  // Knowledge files
  const knowledgeDir = path.join(projDir, 'knowledge');
  if (fs.existsSync(knowledgeDir)) {
    const kFiles = fs.readdirSync(knowledgeDir)
      .filter(f => f.endsWith('.md'))
      .sort()
      .map(f => path.join(knowledgeDir, f));
    files.push(...kFiles);
  }

  return files;
}

function buildSidebar(projects, systemFiles) {
  const sidebar = [
    { label: 'Setup', slug: 'setup' },
  ];

  // System section
  if (systemFiles.length > 0) {
    sidebar.push({
      label: 'System',
      items: [{ autogenerate: { directory: 'system' } }],
    });
  }

  // Project sections
  for (const proj of projects) {
    const projFiles = getProjectFiles(proj);
    if (projFiles.length === 0) continue;

    sidebar.push({
      label: proj,
      collapsed: true,
      items: [{ autogenerate: { directory: `projects/${proj}`, collapsed: true } }],
    });
  }

  return sidebar;
}

function main() {
  console.log('\n  OKF Site Builder\n');

  // Ensure docs dir exists
  if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });
  const dataDir = path.join(SITE_ROOT, 'src', 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const projects = fs.readdirSync(path.join(OKF_ROOT, 'projects'))
    .filter(d => fs.statSync(path.join(OKF_ROOT, 'projects', d)).isDirectory())
    .sort();

  const systemDir = path.join(OKF_ROOT, 'system');
  const systemFiles = fs.existsSync(systemDir)
    ? fs.readdirSync(systemDir).filter(f => f.endsWith('.md') && f !== 'sync-log.md').map(f => path.join(systemDir, f))
    : [];

  let totalFiles = 0;

  // 1. Copy system files
  console.log('  Copying system docs...');
  const sysDocsDir = path.join(DOCS_DIR, 'system');
  if (!fs.existsSync(sysDocsDir)) fs.mkdirSync(sysDocsDir, { recursive: true });

  for (const sf of systemFiles) {
    const name = path.basename(sf, '.md');
    const content = fs.readFileSync(sf, 'utf-8');
    const { fm, body } = parseFrontmatter(content);
    const title = extractTitle(fm, body, name);
    const out = serializeStarlightFm(title, fm, body);
    fs.writeFileSync(path.join(sysDocsDir, name + '.md'), out);
    totalFiles++;
    console.log(`    ${name}.md`);
  }

  // 2. Copy project files
  console.log('\n  Copying project docs...');
  for (const proj of projects) {
    const projFiles = getProjectFiles(proj);
    if (projFiles.length === 0) continue;

    const projDocsDir = path.join(DOCS_DIR, 'projects', proj);
    const knowledgeDocsDir = path.join(projDocsDir, 'knowledge');
    if (!fs.existsSync(projDocsDir)) fs.mkdirSync(projDocsDir, { recursive: true });

    for (const fp of projFiles) {
      const rel = path.relative(path.join(OKF_ROOT, 'projects', proj), fp);
      const name = path.basename(fp, '.md');

      let outDir;
      if (rel.startsWith('knowledge')) {
        if (!fs.existsSync(knowledgeDocsDir)) fs.mkdirSync(knowledgeDocsDir, { recursive: true });
        outDir = knowledgeDocsDir;
      } else {
        outDir = projDocsDir;
      }

      const content = fs.readFileSync(fp, 'utf-8');
      const { fm, body } = parseFrontmatter(content);
      const title = extractTitle(fm, body, name);
      const out = serializeStarlightFm(title, fm, body);
      fs.writeFileSync(path.join(outDir, name + '.md'), out);
      totalFiles++;
    }

    console.log(`    ${proj}/ (${projFiles.length} files)`);
  }

  // 3. Copy SETUP.md
  const setupSrc = path.join(OKF_ROOT, 'SETUP.md');
  if (fs.existsSync(setupSrc)) {
    const content = fs.readFileSync(setupSrc, 'utf-8');
    const { fm, body } = parseFrontmatter(content);
    const title = extractTitle(fm, body, 'setup');
    const out = serializeStarlightFm(title, fm, body);
    fs.writeFileSync(path.join(DOCS_DIR, 'setup.mdx'), out);
    totalFiles++;
    console.log('\n  Copied SETUP.md');
  }

  // 4. Generate sidebar
  console.log('\n  Generating sidebar...');
  const sidebar = buildSidebar(projects, systemFiles);
  fs.writeFileSync(SIDEBAR_OUT, JSON.stringify(sidebar, null, 2));
  console.log(`    Written to src/data/sidebar.json`);

  console.log(`\n  Done — ${totalFiles} files copied\n`);
}

main();
