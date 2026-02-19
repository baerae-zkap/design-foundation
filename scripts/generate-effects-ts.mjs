import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const palettePath = resolve(rootDir, 'public/palette.json');
const effectsPath = resolve(rootDir, 'public/effects-tokens.json');
const outputPath = resolve(rootDir, 'packages/design-system/src/tokens/effects.ts');

const paletteJson = JSON.parse(readFileSync(palettePath, 'utf8'));
const effectsJson = JSON.parse(readFileSync(effectsPath, 'utf8'));

const isSkippableKey = (key) => key.startsWith('_') || key.endsWith('_comment');
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);
const isIdentifier = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
const exactPaletteRefRegex = /^\{palette\.([^.}]+)\.([^.}]+)\}$/;
const paletteRefRegex = /\{palette\.([^.}]+)\.([^.}]+)\}/g;
const exactAlphaRegex = /^alpha\(\{palette\.([^.}]+)\.([^.}]+)\},\s*([\d.]+)\)$/;
const alphaCallRegex = /alpha\(\{palette\.([^.}]+)\.([^.}]+)\},\s*([\d.]+)\)/g;
const hslaRegex = /^hsla\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*[\d.]+\s*\)$/i;

function formatKey(key) {
  return isIdentifier(key) ? key : JSON.stringify(key);
}

function toPaletteAccess(group, token) {
  const groupAccess = isIdentifier(group) ? `palette.${group}` : `palette[${JSON.stringify(group)}]`;
  const tokenAccess = isIdentifier(token) ? `.${token}` : `[${JSON.stringify(token)}]`;
  return `${groupAccess}${tokenAccess}`;
}

function collectPaletteRefs(palette) {
  const refs = new Set();

  for (const [group, tokens] of Object.entries(palette)) {
    if (isSkippableKey(group) || !isObject(tokens)) continue;
    for (const token of Object.keys(tokens)) {
      if (isSkippableKey(token)) continue;
      refs.add(`${group}.${token}`);
    }
  }

  return refs;
}

const paletteRefs = collectPaletteRefs(paletteJson);

function assertPaletteRef(group, token, path) {
  const ref = `${group}.${token}`;
  if (!paletteRefs.has(ref)) {
    throw new Error(`Invalid palette reference at "${path}": {palette.${ref}}`);
  }
}

/**
 * Resolves alpha({palette.X.Y}, Z) at generation time to an inline HSLA string.
 * This avoids the runtime mismatch where palette values are hex but hslaWithAlpha expects HSLA.
 */
function resolveAlphaToHsla(group, token, alpha, path) {
  assertPaletteRef(group, token, path);
  const raw = paletteJson[group]?.[token];
  if (typeof raw !== 'string') {
    throw new Error(`Palette value at "${group}.${token}" is not a string`);
  }
  const match = raw.match(hslaRegex);
  if (!match) {
    throw new Error(`Palette value at "${group}.${token}" is not valid HSLA: ${raw}`);
  }
  return `hsla(${match[1]}, ${match[2]}%, ${match[3]}%, ${alpha})`;
}

function toValueExpression(value, path) {
  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value !== 'string') {
    return JSON.stringify(value);
  }

  // Exact alpha() call: resolve at generation time to inline HSLA string
  const exactAlphaMatch = value.match(exactAlphaRegex);
  if (exactAlphaMatch) {
    const [, group, token, alpha] = exactAlphaMatch;
    return JSON.stringify(resolveAlphaToHsla(group, token, alpha, path));
  }

  const exactMatch = value.match(exactPaletteRefRegex);
  if (exactMatch) {
    const [, group, token] = exactMatch;
    assertPaletteRef(group, token, path);
    return toPaletteAccess(group, token);
  }

  if (!value.includes('{palette.')) {
    return JSON.stringify(value);
  }

  // String with embedded references (alpha() calls and/or palette refs)
  let hasRef = false;
  const escaped = value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(alphaCallRegex, (_, group, token, alpha) => {
      hasRef = true;
      return resolveAlphaToHsla(group, token, alpha, path);
    })
    .replace(paletteRefRegex, (_, group, token) => {
      hasRef = true;
      assertPaletteRef(group, token, path);
      return `\${${toPaletteAccess(group, token)}}`;
    });

  return hasRef ? `\`${escaped}\`` : JSON.stringify(value);
}

function buildThemeLines(theme) {
  const walk = (node, path = []) => {
    const lines = ['{'];

    for (const [key, value] of Object.entries(node)) {
      if (isSkippableKey(key)) continue;

      const entryPath = [...path, key];
      const renderedKey = formatKey(key);

      if (isObject(value)) {
        const nestedLines = walk(value, entryPath);
        lines.push(`  ${renderedKey}: ${nestedLines[0]}`);
        lines.push(...nestedLines.slice(1).map((line) => `  ${line}`));
        lines[lines.length - 1] += ',';
        continue;
      }

      const expr = toValueExpression(value, entryPath.join('.'));
      lines.push(`  ${renderedKey}: ${expr},`);
    }

    lines.push('}');
    return lines;
  };

  return walk(theme);
}

const effectsLines = buildThemeLines(effectsJson.light ?? {});
const darkEffectsLines = buildThemeLines(effectsJson.dark ?? {});

const content = [
  '/**',
  ' * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.',
  ' * Source: public/effects-tokens.json + public/palette.json',
  ' */',
  '',
  "import { palette } from './colors';",
  '',
  '/** Effects tokens (light) from public/effects-tokens.json */',
  `export const effects = ${effectsLines.join('\n')} as const;`,
  '',
  '/** Effects tokens (dark) from public/effects-tokens.json */',
  `export const darkEffects = ${darkEffectsLines.join('\n')} as const;`,
  '',
  'export type EffectToken = typeof effects;',
  'export type DarkEffectToken = typeof darkEffects;',
  '',
].join('\n');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, 'utf8');

console.log(`Generated ${outputPath}`);
