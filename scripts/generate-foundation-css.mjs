import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const spacingPath = resolve(rootDir, 'public/spacing-tokens.json');
const radiusPath = resolve(rootDir, 'public/radius-tokens.json');
const typographyPath = resolve(rootDir, 'public/typography-tokens.json');
const shadowPath = resolve(rootDir, 'public/shadow-tokens.json');
const interactionPath = resolve(rootDir, 'public/interaction-tokens.json');
const outputPath = resolve(rootDir, 'src/app/generated-foundation-tokens.css');

const spacingJson = JSON.parse(readFileSync(spacingPath, 'utf8'));
const radiusJson = JSON.parse(readFileSync(radiusPath, 'utf8'));
const typographyJson = JSON.parse(readFileSync(typographyPath, 'utf8'));
const shadowJson = JSON.parse(readFileSync(shadowPath, 'utf8'));
const interactionJson = JSON.parse(readFileSync(interactionPath, 'utf8'));

const isSkippableKey = (key) => key.startsWith('_') || key.endsWith('_comment');
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

function toKebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function getByPath(obj, path) {
  let current = obj;
  for (const key of path) {
    if (!isObject(current) || !(key in current)) {
      return undefined;
    }
    current = current[key];
  }
  return current;
}

function parseRef(value) {
  if (typeof value !== 'string') return null;
  const match = value.match(/^\{([^.}]+(?:\.[^.}]+)*)\}$/);
  return match ? match[1].split('.') : null;
}

function formatNumberWithUnit(rawValue, unitType) {
  if (typeof rawValue !== 'number') {
    return String(rawValue);
  }

  if (unitType === 'none') {
    return String(rawValue);
  }

  if (unitType === 'px') {
    return `${rawValue}px`;
  }

  if (unitType === 'letter-spacing') {
    return `${rawValue}px`;
  }

  return String(rawValue);
}

function collectValueNodes(node, path = []) {
  const result = [];

  for (const [key, value] of Object.entries(node)) {
    if (isSkippableKey(key)) {
      continue;
    }

    const nextPath = [...path, key];

    if (isObject(value)) {
      if ('value' in value && (typeof value.value === 'string' || typeof value.value === 'number')) {
        result.push({ path: nextPath, value: value.value });
      } else {
        result.push(...collectValueNodes(value, nextPath));
      }
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      result.push({ path: nextPath, value });
    }
  }

  return result;
}

function resolveRefValue(rawValue, rootObj) {
  const refPath = parseRef(rawValue);
  if (!refPath) {
    return rawValue;
  }

  const resolved = getByPath(rootObj, refPath);
  if (resolved === undefined) {
    throw new Error(`Unresolved reference: ${rawValue}`);
  }

  if (isObject(resolved) && 'value' in resolved) {
    return resolveRefValue(resolved.value, rootObj);
  }

  if (typeof resolved === 'string' || typeof resolved === 'number') {
    return resolved;
  }

  throw new Error(`Unsupported reference target for ${rawValue}`);
}

function buildSpacingLines() {
  const spacingRoot = spacingJson.spacing ?? {};
  const lines = ['  /* Spacing tokens */'];

  const primitive = isObject(spacingRoot.primitive) ? spacingRoot.primitive : {};
  for (const [key, value] of Object.entries(primitive)) {
    if (isSkippableKey(key) || key === 'px') continue;
    if (typeof value === 'number') {
      lines.push(`  --spacing-primitive-${toKebab(key)}: ${formatNumberWithUnit(value, 'px')};`);
    }
  }

  const semanticNodes = collectValueNodes(spacingRoot).filter(({ path }) => path[0] !== 'primitive');
  for (const { path, value } of semanticNodes) {
    const resolved = resolveRefValue(value, spacingRoot);
    const variable = `--spacing-${path.map(toKebab).join('-')}`;
    lines.push(`  ${variable}: ${formatNumberWithUnit(resolved, 'px')};`);
  }

  lines.push('');
  return lines;
}

function buildRadiusLines() {
  const radiusRoot = radiusJson.radius ?? {};
  const lines = ['  /* Radius tokens */'];

  const primitive = isObject(radiusRoot.primitive) ? radiusRoot.primitive : {};
  for (const [key, value] of Object.entries(primitive)) {
    if (isSkippableKey(key) || typeof value !== 'number') continue;
    lines.push(`  --radius-primitive-${toKebab(key)}: ${formatNumberWithUnit(value, 'px')};`);
  }

  const semanticNodes = collectValueNodes(radiusRoot).filter(({ path }) => path[0] !== 'primitive');
  for (const { path, value } of semanticNodes) {
    const resolved = resolveRefValue(value, radiusRoot);
    const variable = `--radius-${path.map(toKebab).join('-')}`;
    lines.push(`  ${variable}: ${formatNumberWithUnit(resolved, 'px')};`);
  }

  lines.push('');
  return lines;
}

function typographyUnitType(path) {
  const joined = path.join('.');
  if (joined.includes('fontSize') || joined.includes('lineHeight')) return 'px';
  if (joined.includes('letterSpacing')) return 'letter-spacing';
  if (joined.includes('fontWeight')) return 'none';
  return 'none';
}

function buildTypographyLines() {
  const typographyRoot = typographyJson.typography ?? {};
  const lines = ['  /* Typography tokens */'];

  const nodes = collectValueNodes(typographyRoot);
  for (const { path, value } of nodes) {
    const resolved = resolveRefValue(value, typographyRoot);
    const unit = typographyUnitType(path);
    const variable = `--typography-${path.map(toKebab).join('-')}`;
    lines.push(`  ${variable}: ${formatNumberWithUnit(resolved, unit)};`);
  }

  lines.push('');
  return lines;
}

function buildShadowLines() {
  const shadowRoot = shadowJson.shadow ?? {};
  const lines = ['  /* Shadow tokens */'];

  const primitive = isObject(shadowRoot.primitive) ? shadowRoot.primitive : {};
  for (const [key, value] of Object.entries(primitive)) {
    if (isSkippableKey(key) || !isObject(value)) continue;
    if (typeof value.value === 'string') {
      lines.push(`  --shadow-primitive-${toKebab(key)}: ${value.value};`);
    }
  }

  const semantic = isObject(shadowRoot.semantic) ? shadowRoot.semantic : {};
  const semanticNodes = collectValueNodes(semantic);
  for (const { path, value } of semanticNodes) {
    const variable = `--shadow-semantic-${path.map(toKebab).join('-')}`;
    const refPath = parseRef(value);
    if (refPath && refPath[0] === 'primitive') {
      lines.push(`  ${variable}: var(--shadow-primitive-${toKebab(refPath[1] ?? '')});`);
      continue;
    }
    const resolved = resolveRefValue(value, shadowRoot);
    lines.push(`  ${variable}: ${String(resolved)};`);
  }

  lines.push('');
  return lines;
}

function buildInteractionLines() {
  const interactionRoot = interactionJson.interaction ?? {};
  const lines = ['  /* Interaction tokens */'];

  const nodes = collectValueNodes(interactionRoot);
  for (const { path, value } of nodes) {
    const resolved = resolveRefValue(value, interactionRoot);
    const variable = `--interaction-${path.map(toKebab).join('-')}`;
    lines.push(`  ${variable}: ${String(resolved)};`);
  }

  lines.push('');
  return lines;
}

function buildDarkShadowOverrideLines() {
  const shadowRoot = shadowJson.shadow ?? {};
  const dark = isObject(shadowRoot.dark) ? shadowRoot.dark : {};
  const lines = [];

  const darkPrimitive = isObject(dark.primitive) ? dark.primitive : {};
  for (const [key, value] of Object.entries(darkPrimitive)) {
    if (isSkippableKey(key) || !isObject(value)) continue;
    if (typeof value.value === 'string') {
      lines.push(`  --shadow-primitive-${toKebab(key)}: ${value.value};`);
    }
  }

  const darkSemantic = isObject(dark.semantic) ? dark.semantic : {};
  const darkSemanticNodes = collectValueNodes(darkSemantic);
  for (const { path, value } of darkSemanticNodes) {
    const variable = `--shadow-semantic-${path.map(toKebab).join('-')}`;
    const refPath = parseRef(value);
    if (refPath && refPath[0] === 'primitive') {
      lines.push(`  ${variable}: var(--shadow-primitive-${toKebab(refPath[1] ?? '')});`);
      continue;
    }
    const resolved = resolveRefValue(value, dark);
    lines.push(`  ${variable}: ${String(resolved)};`);
  }

  const darkBorder = isObject(dark.border) ? dark.border : {};
  const darkBorderNodes = collectValueNodes(darkBorder);
  for (const { path, value } of darkBorderNodes) {
    const variable = `--shadow-dark-border-${path.map(toKebab).join('-')}`;
    const resolved = resolveRefValue(value, dark);
    lines.push(`  ${variable}: ${String(resolved)};`);
  }

  return lines;
}

const rootLines = [
  '/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */',
  '/* Source: public/spacing-tokens.json + public/radius-tokens.json + public/typography-tokens.json + public/shadow-tokens.json + public/interaction-tokens.json */',
  ':root {',
  ...buildSpacingLines(),
  ...buildRadiusLines(),
  ...buildTypographyLines(),
  ...buildShadowLines(),
  ...buildInteractionLines(),
  '}',
  '',
];

const darkShadowLines = buildDarkShadowOverrideLines();
if (darkShadowLines.length > 0) {
  rootLines.push(
    '/* Shadow dark overrides (system preference fallback) */',
    '@media (prefers-color-scheme: dark) {',
    '  :root:not([data-theme="light"]) {',
    ...darkShadowLines.map(line => '  ' + line),
    '  }',
    '}',
    '',
    '/* Shadow dark overrides (explicit user choice) */',
    ':root[data-theme="dark"] {',
    ...darkShadowLines,
    '}',
    '',
  );
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, rootLines.join('\n'), 'utf8');

console.log(`Generated ${outputPath}`);
