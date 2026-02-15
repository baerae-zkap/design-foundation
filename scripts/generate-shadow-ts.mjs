import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');

const shadowPath = resolve(rootDir, 'public/shadow-tokens.json');
const outputPath = resolve(rootDir, 'packages/design-system/src/tokens/shadow.ts');

const shadowJson = JSON.parse(readFileSync(shadowPath, 'utf8'));

const isSkippableKey = (key) => key.startsWith('_') || key.endsWith('_comment');
const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);
const isIdentifier = (key) => /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key);
const primitiveRefRegex = /^\{primitive\.([^.}]+)\}$/;

function formatKey(key) {
  return isIdentifier(key) ? key : JSON.stringify(key);
}

function toPrimitiveAccess(token, primitiveKeys, variableName) {
  if (!primitiveKeys.has(token)) {
    throw new Error(`Invalid primitive reference: {primitive.${token}}`);
  }
  return isIdentifier(token)
    ? `${variableName}.${token}`
    : `${variableName}[${JSON.stringify(token)}]`;
}

function toLiteralExpression(value) {
  if (typeof value === 'number') return String(value);
  return JSON.stringify(value);
}

function buildTokenLines(node, options = {}) {
  const { indent = 0, path = [], valueResolver } = options;
  const pad = ' '.repeat(indent);
  const lines = ['{'];

  for (const [key, value] of Object.entries(node)) {
    if (isSkippableKey(key)) continue;

    const renderedKey = formatKey(key);
    const nextPath = [...path, key];
    const entryPad = ' '.repeat(indent + 2);

    if (isObject(value)) {
      if ('value' in value && (typeof value.value === 'string' || typeof value.value === 'number')) {
        const expr = valueResolver
          ? valueResolver(value.value, nextPath)
          : toLiteralExpression(value.value);
        lines.push(`${entryPad}${renderedKey}: ${expr},`);
        continue;
      }

      const nestedLines = buildTokenLines(value, {
        indent: indent + 2,
        path: nextPath,
        valueResolver,
      });
      lines.push(`${entryPad}${renderedKey}: ${nestedLines[0]}`);
      lines.push(...nestedLines.slice(1).map((line) => `${entryPad}${line}`));
      lines[lines.length - 1] += ',';
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const expr = valueResolver
        ? valueResolver(value, nextPath)
        : toLiteralExpression(value);
      lines.push(`${entryPad}${renderedKey}: ${expr},`);
    }
  }

  lines.push(`${pad}}`);
  return lines;
}

const shadowRoot = shadowJson.shadow ?? {};
const primitiveRoot = isObject(shadowRoot.primitive) ? shadowRoot.primitive : {};
const semanticRoot = isObject(shadowRoot.semantic) ? shadowRoot.semantic : {};
const darkRoot = isObject(shadowRoot.dark) ? shadowRoot.dark : {};
const darkPrimitiveRoot = isObject(darkRoot.primitive) ? darkRoot.primitive : {};
const darkBorderRoot = isObject(darkRoot.border) ? darkRoot.border : {};
const darkSemanticRoot = isObject(darkRoot.semantic) ? darkRoot.semantic : semanticRoot;
const mergedDarkPrimitiveRoot = { ...primitiveRoot, ...darkPrimitiveRoot };

function toKebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function buildCssVarLines(node, prefix, indent = 0) {
  const pad = ' '.repeat(indent);
  const lines = ['{'];

  for (const [key, value] of Object.entries(node)) {
    if (isSkippableKey(key)) continue;

    const renderedKey = formatKey(key);
    const kebabKey = toKebab(key);
    const entryPad = ' '.repeat(indent + 2);

    if (isObject(value)) {
      if ('value' in value && (typeof value.value === 'string' || typeof value.value === 'number')) {
        const varName = `var(--shadow-${prefix}-${kebabKey})`;
        lines.push(`${entryPad}${renderedKey}: ${JSON.stringify(varName)} as const,`);
        continue;
      }

      const nestedPrefix = prefix ? `${prefix}-${kebabKey}` : kebabKey;
      const nestedLines = buildCssVarLines(value, nestedPrefix, indent + 2);
      lines.push(`${entryPad}${renderedKey}: ${nestedLines[0]}`);
      lines.push(...nestedLines.slice(1).map((line) => `${entryPad}${line}`));
      lines[lines.length - 1] += ',';
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const varName = `var(--shadow-${prefix}-${kebabKey})`;
      lines.push(`${entryPad}${renderedKey}: ${JSON.stringify(varName)} as const,`);
    }
  }

  lines.push(`${pad}}`);
  return lines;
}

const primitiveKeys = new Set(
  Object.keys(primitiveRoot).filter((key) => !isSkippableKey(key)),
);

const primitiveLines = buildTokenLines(primitiveRoot);
const semanticLines = buildTokenLines(semanticRoot, {
  valueResolver: (value) => {
    if (typeof value === 'string') {
      const match = value.match(primitiveRefRegex);
      if (match) {
        return toPrimitiveAccess(match[1], primitiveKeys, 'primitive');
      }
    }
    return toLiteralExpression(value);
  },
});
const cssVarPrimitiveLines = buildCssVarLines(primitiveRoot, 'primitive');
const cssVarSemanticLines = buildCssVarLines(semanticRoot, 'semantic');
const darkPrimitiveKeys = new Set(
  Object.keys(mergedDarkPrimitiveRoot).filter((key) => !isSkippableKey(key)),
);
const darkPrimitiveLines = buildTokenLines(mergedDarkPrimitiveRoot);
const darkSemanticLines = buildTokenLines(darkSemanticRoot, {
  valueResolver: (value) => {
    if (typeof value === 'string') {
      const match = value.match(primitiveRefRegex);
      if (match) {
        return toPrimitiveAccess(match[1], darkPrimitiveKeys, 'darkPrimitive');
      }
    }
    return toLiteralExpression(value);
  },
});
const darkBorderLines = buildTokenLines(darkBorderRoot);

const content = [
  '/**',
  ' * AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.',
  ' * Source: public/shadow-tokens.json',
  ' */',
  '',
  `const primitive = ${primitiveLines.join('\n')} as const;`,
  `const semantic = ${semanticLines.join('\n')} as const;`,
  '',
  `const darkPrimitive = ${darkPrimitiveLines.join('\n')} as const;`,
  `const darkSemantic = ${darkSemanticLines.join('\n')} as const;`,
  `const darkBorder = ${darkBorderLines.join('\n')} as const;`,
  '',
  'export const shadow = {',
  '  primitive,',
  '  semantic,',
  '} as const;',
  '',
  'export const darkShadow = {',
  '  primitive: darkPrimitive,',
  '  semantic: darkSemantic,',
  '  border: darkBorder,',
  '} as const;',
  '',
  'export type ShadowToken = typeof shadow;',
  'export type DarkShadowToken = typeof darkShadow;',
  '',
  '/** CSS variable references for web components (mirrors shadow structure) */',
  `const cssVarPrimitive = ${cssVarPrimitiveLines.join('\n')} as const;`,
  `const cssVarSemantic = ${cssVarSemanticLines.join('\n')} as const;`,
  '',
  'export const cssVarShadow = {',
  '  primitive: cssVarPrimitive,',
  '  semantic: cssVarSemantic,',
  '} as const;',
  '',
  'export type CssVarShadowToken = typeof cssVarShadow;',
  '',
].join('\n');

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, content, 'utf8');

console.log(`Generated ${outputPath}`);
