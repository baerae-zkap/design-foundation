#!/usr/bin/env node

/**
 * generate-llms.mjs
 *
 * Generates llms.txt (full reference) from:
 * - docs/llms-header.md (rules, patterns, tokens — manually maintained)
 * - src/components/[Name]/[Name].md (per-component AI docs — co-located with source)
 *
 * Usage: node scripts/generate-llms.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, basename } from 'path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const COMPONENTS_DIR = join(ROOT, 'src/components');
const HEADER_FILE = join(ROOT, 'docs/llms-header.md');
const OUTPUT = join(ROOT, 'llms.txt');

// ─── Discover component docs ────────────────────────────────────────────────

function discoverComponentDocs() {
  const components = [];

  for (const dir of readdirSync(COMPONENTS_DIR).sort()) {
    const dirPath = join(COMPONENTS_DIR, dir);
    if (!statSync(dirPath).isDirectory()) continue;

    // Find .md files in the component directory
    const mdFiles = readdirSync(dirPath).filter(f => f.endsWith('.md'));
    if (mdFiles.length === 0) continue;

    for (const mdFile of mdFiles) {
      const mdPath = join(dirPath, mdFile);
      const content = readFileSync(mdPath, 'utf-8');

      // Extract the H1 title
      const titleMatch = content.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : basename(mdFile, '.md');

      // Extract the first description line (> line after Source, or first > line)
      const descMatch = content.match(/^>\s+(?!Source:)(.+)$/m);
      const description = descMatch ? descMatch[1] : '';

      // Extract source path
      const sourceMatch = content.match(/^>\s+Source:\s+`(.+)`$/m);
      const sourcePath = sourceMatch ? sourceMatch[1] : `src/components/${dir}/${dir}.tsx`;

      components.push({
        name: title,
        dirName: dir,
        fileName: mdFile,
        sourcePath,
        description,
        content,
        docPath: `src/components/${dir}/${mdFile}`,
      });
    }
  }

  return components;
}

// ─── Categorize components ──────────────────────────────────────────────────

const CATEGORIES = {
  Actions: ['Button', 'IconButton', 'TextButton', 'Chip', 'ActionArea', 'FilterButton'],
  Contents: ['Card', 'ListCard', 'ListCell', 'SectionHeader', 'Accordion', 'ContentBadge', 'Avatar', 'Badge'],
  Inputs: ['TextField', 'TextArea', 'SearchField', 'Checkbox', 'Radio', 'Switch', 'Slider', 'SegmentedControl', 'CheckMark'],
  Feedback: ['Snackbar', 'Toast', 'SectionMessage', 'Dialog', 'StateView', 'PushBadge', 'Skeleton', 'Spinner'],
  Navigation: ['BottomNavigation', 'CategoryNavigation', 'PageCounter', 'ProgressIndicator', 'ProgressTracker', 'Tab', 'TopNavigation'],
  Overlays: ['BottomSheet', 'Popover', 'Popup', 'Tooltip'],
};

function categorize(components) {
  const categorized = {};
  const uncategorized = [];

  for (const comp of components) {
    let found = false;
    for (const [cat, names] of Object.entries(CATEGORIES)) {
      if (names.includes(comp.name)) {
        if (!categorized[cat]) categorized[cat] = [];
        categorized[cat].push(comp);
        found = true;
        break;
      }
    }
    if (!found) uncategorized.push(comp);
  }

  return { categorized, uncategorized };
}

// ─── Generate llms.txt ──────────────────────────────────────────────────────

function generateFull(header, components) {
  const parts = [header.trim()];

  parts.push('');
  parts.push('---');
  parts.push('');
  parts.push('## Component API Reference');
  parts.push('');
  parts.push(`> Auto-generated from ${components.length} co-located component docs.`);
  parts.push(`> Each component doc lives alongside its source: \`src/components/[Name]/[Name].md\``);
  parts.push('');

  for (const comp of components) {
    parts.push('---');
    parts.push('');
    parts.push(comp.content.trim());
    parts.push('');
  }

  return parts.join('\n');
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  if (!existsSync(HEADER_FILE)) {
    console.error(`Error: Header file not found: ${HEADER_FILE}`);
    process.exit(1);
  }
  const header = readFileSync(HEADER_FILE, 'utf-8');

  const components = discoverComponentDocs();
  console.log(`Found ${components.length} component docs`);

  const content = generateFull(header, components);
  writeFileSync(OUTPUT, content, 'utf-8');
  console.log(`Generated ${OUTPUT} (${content.split('\n').length} lines)`);
}

main();
