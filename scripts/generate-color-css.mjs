import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const palettePath = resolve(rootDir, 'public/palette.json');
const semanticPath = resolve(rootDir, 'public/semantic-tokens.json');
const effectsPath = resolve(rootDir, 'public/effects-tokens.json');
const outputPath = resolve(rootDir, 'src/app/generated-color-tokens.css');

const palette = JSON.parse(readFileSync(palettePath, 'utf8'));
const semantic = JSON.parse(readFileSync(semanticPath, 'utf8'));
const effects = existsSync(effectsPath) ? JSON.parse(readFileSync(effectsPath, 'utf8')) : {};

const isSkippableKey = (key) => key.startsWith('_') || key.endsWith('_comment');
const toPaletteVar = (group, token) => `--${group}-${token}`;

const paletteTokenSet = new Set();

for (const [group, tokens] of Object.entries(palette)) {
  if (isSkippableKey(group)) {
    continue;
  }

  if (!tokens || typeof tokens !== 'object' || Array.isArray(tokens)) {
    continue;
  }

  for (const [token] of Object.entries(tokens)) {
    if (isSkippableKey(token)) {
      continue;
    }
    paletteTokenSet.add(`${group}.${token}`);
  }
}

const resolvePaletteReferences = (value, tokenPath) => {
  if (typeof value !== 'string') {
    return String(value);
  }

  return value.replace(/\{palette\.([^.}]+)\.([^.}]+)\}/g, (_, group, token) => {
    const paletteKey = `${group}.${token}`;

    if (!paletteTokenSet.has(paletteKey)) {
      throw new Error(
        `Invalid token reference at "${tokenPath}": {palette.${paletteKey}} is missing in palette.json`,
      );
    }

    return `var(${toPaletteVar(group, token)})`;
  });
};

const buildPaletteLines = (paletteTokens) => {
  const lines = [];

  for (const [group, tokens] of Object.entries(paletteTokens)) {
    if (isSkippableKey(group)) {
      continue;
    }

    if (!tokens || typeof tokens !== 'object' || Array.isArray(tokens)) {
      continue;
    }

    lines.push(`  /* Palette: ${group} */`);

    for (const [token, value] of Object.entries(tokens)) {
      if (isSkippableKey(token)) {
        continue;
      }

      if (typeof value === 'string' || typeof value === 'number') {
        lines.push(`  ${toPaletteVar(group, token)}: ${value};`);
      }
    }

    lines.push('');
  }

  while (lines[lines.length - 1] === '') {
    lines.pop();
  }

  return lines;
};

const flattenTokenValues = (tokens, path = []) => {
  const pairs = [];

  for (const [key, value] of Object.entries(tokens)) {
    if (isSkippableKey(key)) {
      continue;
    }

    const nextPath = [...path, key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      pairs.push(...flattenTokenValues(value, nextPath));
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const tokenPath = nextPath.join('.');
      pairs.push([nextPath, resolvePaletteReferences(value, tokenPath)]);
    }
  }

  return pairs;
};

const buildTokenLines = (themeTokens, options = {}) => {
  const { prefix = '' } = options;
  return flattenTokenValues(themeTokens).map(([path, value]) => {
    const variableName = `--${prefix}${path.join('-')}`;
    return `  ${variableName}: ${value};`;
  });
};

const lightSemanticLines = buildTokenLines(semantic.light ?? {});
const darkSemanticLines = buildTokenLines(semantic.dark ?? {});
const lightEffectsLines = buildTokenLines(effects.light ?? {}, { prefix: 'effect-' });
const darkEffectsLines = buildTokenLines(effects.dark ?? {}, { prefix: 'effect-' });

const rootSections = [
  ...buildPaletteLines(palette),
  '',
  '  /* Semantic tokens (light) */',
  ...lightSemanticLines,
];

if (lightEffectsLines.length > 0) {
  rootSections.push('', '  /* Effects tokens (light) */', ...lightEffectsLines);
}

const darkSections = ['  /* Semantic tokens (dark overrides) */', ...darkSemanticLines];

if (darkEffectsLines.length > 0) {
  darkSections.push('', '  /* Effects tokens (dark overrides) */', ...darkEffectsLines);
}

const css = [
  '/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */',
  '/* Source: public/palette.json + public/semantic-tokens.json + public/effects-tokens.json */',
  ':root {',
  ...rootSections,
  '}',
  '',
  '[data-theme="dark"] {',
  ...darkSections,
  '}',
  '',
].join('\n');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, css, 'utf8');

console.log(`Generated ${outputPath}`);
