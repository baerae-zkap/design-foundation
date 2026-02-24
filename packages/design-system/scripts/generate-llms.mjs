#!/usr/bin/env node

/**
 * generate-llms.mjs
 *
 * Generates llms.txt and llms-full.txt from:
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
const OUTPUT_FULL = join(ROOT, 'llms-full.txt');
const OUTPUT_SUMMARY = join(ROOT, 'llms.txt');

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

// ─── Generate llms-full.txt ─────────────────────────────────────────────────

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

// ─── Generate llms.txt ──────────────────────────────────────────────────────

function generateSummary(components) {
  const { categorized, uncategorized } = categorize(components);

  const lines = [
    '# @baerae-zkap/design-system',
    '',
    `> React component library with ${components.length} UI components and a design token system.`,
    '> Colors use CSS custom properties for automatic dark mode switching.',
    '',
    '## Quick Start',
    '',
    '```bash',
    'npm install @baerae-zkap/design-system',
    '```',
    '',
    '```tsx',
    "import { Button, Card, TextField, ListCell } from '@baerae-zkap/design-system';",
    "import { spacing, typography, radius } from '@baerae-zkap/design-system';",
    '```',
    '',
    "Colors in styles: `color: 'var(--content-base-default)'`. Component color props: `primary`, `neutral`, `success`, `error`, `warning`, `info`.",
    '',
    '## Component Selection Guide',
    '',
    'Follow top-to-bottom; use the first match.',
    '',
    '### Actions',
    '',
    '| Need to... | Use |',
    '|------------|-----|',
    '| Primary action | `<Button buttonType="filled" color="primary">` |',
    '| Secondary/cancel action | `<Button buttonType="weak" color="neutral">` |',
    '| Destructive action | `<Button buttonType="filled" color="error">` |',
    '| Soft destructive action | `<Button buttonType="weak" color="error">` |',
    '| Text-only inline link | `<TextButton>` |',
    '| Icon-only action | `<IconButton aria-label="...">` |',
    '| Tag/filter toggle | `<Chip>` |',
    '| Button group at bottom of modal/sheet/page | `<ActionArea>` |',
    '',
    '### Contents',
    '',
    '| Content is... | Use |',
    '|---------------|-----|',
    '| Interactive info block (onClick required) | `<Card>` |',
    '| Thumbnail + text list item | `<ListCard>` |',
    '| Settings/menu row | `<ListCell>` |',
    '| Section title with optional action | `<SectionHeader>` |',
    '| Expandable/collapsible detail | `<Accordion>` |',
    '| Status or category label | `<ContentBadge>` |',
    '| User profile picture | `<Avatar>` (multiple: `<AvatarGroup>`) |',
    '| Numeric count or status overlay | `<Badge>` |',
    '',
    '### Inputs',
    '',
    'No Select (dropdown) component exists. Use Radio/RadioGroup for small option sets or SegmentedControl for tab-style selection.',
    '',
    '| Field is... | Use |',
    '|-------------|-----|',
    '| Single-line text | `<TextField>` |',
    '| Multi-line text | `<TextArea>` |',
    '| Search with clear | `<SearchField>` |',
    '| On/off toggle | `<Switch>` |',
    '| Multiple checkboxes | `<Checkbox>` |',
    '| Single choice from group | `<Radio>` / `<RadioGroup>` |',
    '| Segmented tab selector | `<SegmentedControl>` |',
    '| Numeric range | `<Slider>` |',
    '| Standalone check indicator | `<CheckMark>` |',
    '',
    '### Feedback',
    '',
    '| Need to... | Use |',
    '|------------|-----|',
    '| Brief auto-dismiss message | `<Snackbar>` |',
    '| Notification with heading + description | `<Toast>` |',
    '| Inline status within page content | `<SectionMessage>` |',
    '| Blocking confirmation dialog | `<Dialog>` (AlertDialog) |',
    '| Empty/error/result state | `<StateView>` |',
    '| Notification count on icon/button | `<PushBadge>` |',
    '| Content loading placeholder | `<Skeleton>` |',
    '| Indeterminate loading indicator | `<Spinner>` |',
    '',
    'Snackbar = single message. Toast = heading + detail. Spinner = unknown-duration action. Skeleton = content with known layout. SectionMessage = inline persistent. Dialog = blocks UI.',
    '',
    '### Navigation',
    '',
    '| Need... | Use |',
    '|---------|-----|',
    '| Mobile bottom tab bar | `<BottomNavigation>` |',
    '| Horizontal category scroll | `<CategoryNavigation>` |',
    '| Pagination dots/numbers | `<PageCounter>` |',
    '| Step/percentage progress | `<ProgressIndicator>` |',
    '| Multi-step process tracker | `<ProgressTracker>` |',
    '| Tab strip for view switching | `<Tab>` |',
    '| App bar / top header | `<TopNavigation>` |',
    '',
    '### Overlays',
    '',
    '| Need... | Use |',
    '|---------|-----|',
    '| Bottom-anchored modal sheet | `<BottomSheet>` |',
    '| Anchored floating panel | `<Popover>` |',
    '| Modal popup with actions | `<Popup>` |',
    '| Hover/tap hint | `<Tooltip>` |',
    '',
    '### Tie-Breakers',
    '',
    '| Decision | Rule |',
    '|----------|------|',
    '| Chip vs SegmentedControl | Multi-select/filter -> Chip. Exclusive switching -> SegmentedControl |',
    '| Switch vs Checkbox | Immediate effect -> Switch. Form submission -> Checkbox |',
    '| TextButton vs Button | Inline in content -> TextButton. Standalone CTA -> Button |',
    '| Card vs ActionArea | Content block -> Card. Button group in modal/sheet footer -> ActionArea |',
    '| Badge vs ContentBadge | Count overlay on element -> Badge. Standalone label -> ContentBadge |',
    '| Spinner vs Skeleton | Unknown-duration action -> Spinner. Known-layout content -> Skeleton |',
    '',
    '### Composition Rules',
    '',
    '- ActionArea expects Button/TextButton children only. Not a generic tappable region.',
    '- Max one `buttonType="filled" color="primary"` Button per section.',
    '- Card must NOT nest inside another Card.',
    '- ListCell trailing: use Switch, ContentBadge, or text string -- not Button.',
    '',
    '### What NOT to Do',
    '',
    '- No `<div onClick>` for buttons. Use Button, IconButton, or Card.',
    '- No native `<input>`, `<textarea>`, `<select>`. Use TextField, TextArea, Radio/RadioGroup, SegmentedControl.',
    '- No hardcoded hex/rgb colors. Use CSS variables.',
    '- No custom box-shadow cards. Use Card.',
    '- No custom toggle switches. Use Switch.',
    '- No `<IconButton>` without `aria-label`.',
    '- No full-screen spinners. Use inline Skeleton states.',
    '- No blank sections for empty data. Use StateView.',
    '',
    '## All Components',
    '',
  ];

  // List by category with source paths
  for (const [cat, names] of Object.entries(CATEGORIES)) {
    const catComponents = (categorized[cat] || []).sort((a, b) => a.name.localeCompare(b.name));
    if (catComponents.length === 0) continue;

    lines.push(`### ${cat}`);
    lines.push('');
    for (const comp of catComponents) {
      lines.push(`- **${comp.name}** — ${comp.description} | Source: \`${comp.sourcePath}\` | Doc: \`${comp.docPath}\``);
    }
    lines.push('');
  }

  if (uncategorized.length > 0) {
    lines.push('### Other');
    lines.push('');
    for (const comp of uncategorized) {
      lines.push(`- **${comp.name}** — ${comp.description} | Source: \`${comp.sourcePath}\` | Doc: \`${comp.docPath}\``);
    }
    lines.push('');
  }

  lines.push('## Design Tokens');
  lines.push('');
  lines.push('- [Token Usage Guide](docs/tokens.md): Spacing, typography, radius, and color token reference');
  lines.push('- `spacing` -- Primitive scale (base 4px), semantic (screen padding, inset, gaps)');
  lines.push('- `typography` -- Semantic styles (headline, body, caption, label) spreadable as inline styles');
  lines.push('- `radius` -- Component-specific values (button 8, card 16, input 8, pill 9999)');
  lines.push('- CSS variables -- `var(--content-base-default)`, `var(--surface-base-default)`, `var(--divider)`, etc.');
  lines.push('');
  lines.push('## Layout Patterns');
  lines.push('');
  lines.push('- [Layout and Composition](docs/patterns.md): Page structure, forms, lists, empty states');
  lines.push('- Screen padding: `spacing.semantic.screen.paddingX` (20px)');
  lines.push('- Section gaps: 32-40px; item gaps: 8-16px');
  lines.push('- Every list needs: loading (Skeleton), empty (StateView), error (retry), populated');
  lines.push('- One primary CTA per section max');
  lines.push('');
  lines.push('## Full Reference');
  lines.push('');
  lines.push('For complete component API documentation, read `llms-full.txt` in this package.');
  lines.push('');

  return lines.join('\n');
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  // Read header
  if (!existsSync(HEADER_FILE)) {
    console.error(`Error: Header file not found: ${HEADER_FILE}`);
    process.exit(1);
  }
  const header = readFileSync(HEADER_FILE, 'utf-8');

  // Discover component docs
  const components = discoverComponentDocs();
  console.log(`Found ${components.length} component docs`);

  // Generate llms-full.txt
  const fullContent = generateFull(header, components);
  writeFileSync(OUTPUT_FULL, fullContent, 'utf-8');
  console.log(`Generated ${OUTPUT_FULL} (${fullContent.split('\n').length} lines)`);

  // Generate llms.txt
  const summaryContent = generateSummary(components);
  writeFileSync(OUTPUT_SUMMARY, summaryContent, 'utf-8');
  console.log(`Generated ${OUTPUT_SUMMARY} (${summaryContent.split('\n').length} lines)`);
}

main();
