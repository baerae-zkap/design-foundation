import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const palettePath = resolve(rootDir, 'public/palette.json');
const semanticPath = resolve(rootDir, 'public/semantic-tokens.json');
const outputPath = resolve(rootDir, 'packages/design-system/src/tokens/colors.ts');

const paletteJson = JSON.parse(readFileSync(palettePath, 'utf8'));
const semanticJson = JSON.parse(readFileSync(semanticPath, 'utf8'));

const isSkippableKey = (key) => key.startsWith('_') || key.endsWith('_comment');
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);
const isIdentifier = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);

const hslaRegex = /^hsla\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*([\d.]+)\s*\)$/i;
const paletteRefRegex = /^\{palette\.([^.}]+)\.([^.}]+)\}$/;

function formatKey(key) {
  return isIdentifier(key) ? key : JSON.stringify(key);
}

function toPaletteAccess(group, token) {
  const groupAccess = isIdentifier(group) ? `palette.${group}` : `palette[${JSON.stringify(group)}]`;
  const tokenAccess = isIdentifier(token) ? `.${token}` : `[${JSON.stringify(token)}]`;
  return `${groupAccess}${tokenAccess}`;
}

function parseHsla(value) {
  const match = value.match(hslaRegex);
  if (!match) {
    return null;
  }

  return {
    h: Number(match[1]),
    s: Number(match[2]),
    l: Number(match[3]),
    a: Number(match[4]),
  };
}

function collectPaletteReferences(palette) {
  const refs = new Set();

  for (const [group, tokens] of Object.entries(palette)) {
    if (isSkippableKey(group) || !isObject(tokens)) {
      continue;
    }

    for (const token of Object.keys(tokens)) {
      if (isSkippableKey(token)) {
        continue;
      }
      refs.add(`${group}.${token}`);
    }
  }

  return refs;
}

const paletteRefs = collectPaletteReferences(paletteJson);

function toPaletteExpressionOrNull(value, path) {
  if (typeof value !== 'string') {
    return null;
  }

  const match = value.match(paletteRefRegex);
  if (!match) {
    return null;
  }

  const [, group, token] = match;
  const ref = `${group}.${token}`;
  if (!paletteRefs.has(ref)) {
    throw new Error(`Invalid palette reference at "${path}": ${value}`);
  }

  return toPaletteAccess(group, token);
}

function toLiteralExpression(value) {
  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value !== 'string') {
    return JSON.stringify(value);
  }

  const hsla = parseHsla(value);
  if (hsla) {
    return `hslaToHex(${hsla.h}, ${hsla.s}, ${hsla.l}, ${hsla.a})`;
  }

  return JSON.stringify(value);
}

function buildObjectLines(data, options = {}) {
  const { indent = 0, valueResolver } = options;
  const pad = ' '.repeat(indent);
  const lines = ['{'];

  const entries = Object.entries(data).filter(([key]) => !isSkippableKey(key));

  for (const [key, value] of entries) {
    const entryPad = ' '.repeat(indent + 2);
    const renderedKey = formatKey(key);

    if (isObject(value)) {
      const nestedLines = buildObjectLines(value, {
        indent: indent + 2,
        valueResolver,
      });
      lines.push(`${entryPad}${renderedKey}: ${nestedLines[0]}`);
      lines.push(...nestedLines.slice(1).map((line) => `${entryPad}${line}`));
      lines[lines.length - 1] += ',';
      continue;
    }

    const path = key;
    const expression = valueResolver ? valueResolver(value, path) : toLiteralExpression(value);
    lines.push(`${entryPad}${renderedKey}: ${expression},`);
  }

  lines.push(`${pad}}`);
  return lines;
}

function buildPaletteLines() {
  return buildObjectLines(paletteJson, {
    indent: 0,
    valueResolver: (value) => toLiteralExpression(value),
  });
}

function buildSemanticThemeLines(theme) {
  const walk = (node, path = []) => {
    const lines = ['{'];

    for (const [key, value] of Object.entries(node)) {
      if (isSkippableKey(key)) {
        continue;
      }

      const entryPath = [...path, key];
      const renderedKey = formatKey(key);

      if (isObject(value)) {
        const nestedLines = walk(value, entryPath);
        lines.push(`  ${renderedKey}: ${nestedLines[0]}`);
        lines.push(...nestedLines.slice(1).map((line) => `  ${line}`));
        lines[lines.length - 1] += ',';
        continue;
      }

      const tokenPath = entryPath.join('.');
      const paletteExpr = toPaletteExpressionOrNull(value, tokenPath);
      const expr = paletteExpr ?? toLiteralExpression(value);
      lines.push(`  ${renderedKey}: ${expr},`);
    }

    lines.push('}');
    return lines;
  };

  return walk(theme);
}

const paletteLines = buildPaletteLines();
const colorsLines = buildSemanticThemeLines(semanticJson.light ?? {});
const darkColorsLines = buildSemanticThemeLines(semanticJson.dark ?? {});

const content = [
  '/**',
  ' * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.',
  ' * Source: public/palette.json + public/semantic-tokens.json',
  ' */',
  '',
  '/**',
  ' * HSLA to Hex conversion utility',
  ' */',
  'function hslaToHex(h: number, s: number, l: number, a: number = 1): string {',
  '  l /= 100;',
  '  const saturation = s / 100;',
  '  const chroma = (1 - Math.abs(2 * l - 1)) * saturation;',
  '  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));',
  '  const m = l - chroma / 2;',
  '  let r = 0, g = 0, b = 0;',
  '',
  '  if (h >= 0 && h < 60) {',
  '    r = chroma; g = x; b = 0;',
  '  } else if (h >= 60 && h < 120) {',
  '    r = x; g = chroma; b = 0;',
  '  } else if (h >= 120 && h < 180) {',
  '    r = 0; g = chroma; b = x;',
  '  } else if (h >= 180 && h < 240) {',
  '    r = 0; g = x; b = chroma;',
  '  } else if (h >= 240 && h < 300) {',
  '    r = x; g = 0; b = chroma;',
  '  } else if (h >= 300 && h < 360) {',
  '    r = chroma; g = 0; b = x;',
  '  }',
  '',
  '  r = Math.round((r + m) * 255);',
  '  g = Math.round((g + m) * 255);',
  '  b = Math.round((b + m) * 255);',
  '',
  "  const toHex = (n: number) => n.toString(16).padStart(2, '0');",
  '',
  '  if (a < 1) {',
  '    const alpha = Math.round(a * 255);',
  '    return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;',
  '  }',
  '',
  '  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;',
  '}',
  '',
  '/** Primitive palette from public/palette.json */',
  `export const palette = ${paletteLines.join('\n')} as const;`,
  '',
  '/** Semantic color tokens (light) from public/semantic-tokens.json */',
  `export const colors = ${colorsLines.join('\n')} as const;`,
  '',
  '/** Semantic color tokens (dark) from public/semantic-tokens.json */',
  `export const darkColors = ${darkColorsLines.join('\n')} as const;`,
  '',
  '/**',
  ' * @deprecated Legacy alias for compatibility. Use darkColors for theme mapping.',
  ' */',
  'export const darkPalette = palette;',
  '',
  'export const brandColors = colors.surface.brand;',
  'export const errorColors = colors.surface.error;',
  'export const successColors = colors.surface.success;',
  'export const warningColors = colors.surface.warning;',
  'export const infoColors = colors.surface.info;',
  '',
  'export const darkBrandColors = darkColors.surface.brand;',
  'export const darkErrorColors = darkColors.surface.error;',
  'export const darkSuccessColors = darkColors.surface.success;',
  'export const darkWarningColors = darkColors.surface.warning;',
  'export const darkInfoColors = darkColors.surface.info;',
  '',
  'export type ColorToken = typeof colors;',
  'export type DarkColorToken = typeof darkColors;',
  'export type PaletteToken = typeof palette;',
  'export type DarkPaletteToken = typeof darkPalette;',
  '',
].join('\n');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, 'utf8');

console.log(`Generated ${outputPath}`);
