# Token Pipeline Reference

## Auto-Generated Pipeline

| Source JSON | Script | Output File | Contents |
|-------------|--------|-------------|----------|
| `public/palette.json` + `public/semantic-tokens.json` | `scripts/generate-colors-ts.mjs` | `packages/design-system/src/tokens/colors.ts` | `palette`, `lightColors`, `darkColors`, `cssVarColors`, brand/status color subsets |
| `public/palette.json` + `public/semantic-tokens.json` | `scripts/generate-color-css.mjs` | `src/app/generated-color-tokens.css` | CSS custom properties for light/dark themes |
| `public/effects-tokens.json` | `scripts/generate-effects-ts.mjs` | `packages/design-system/src/tokens/effects.ts` | `effects`, `darkEffects` (HSLA + palette refs) |
| `public/shadow-tokens.json` | `scripts/generate-shadow-ts.mjs` | `packages/design-system/src/tokens/shadow.ts` | `shadow`, `darkShadow`, `cssVarShadow` |
| `public/spacing-tokens.json` + `public/radius-tokens.json` + `public/typography-tokens.json` | `scripts/generate-foundation-css.mjs` | `src/app/generated-foundation-tokens.css` | CSS custom properties for spacing, radius, typography |

## Manually Maintained Files

| File | What to Edit | Tokens Exported |
|------|-------------|-----------------|
| `tokens/spacing.ts` | Spacing scale directly | `spacing.primitive.*`, `spacing.semantic.*`, `spacing.component.*` |
| `tokens/radius.ts` | Radius scale directly | `radius.primitive.*`, `radius.component.*` |
| `tokens/typography.ts` | Font sizes/weights/lineHeights | `typography.fontSize.*`, `typography.fontWeight.*`, `typography.lineHeight.*` |
| `tokens/motion.ts` | Duration/easing/transitions | `duration.*`, `easing.*`, `transitions.*` |
| `tokens/general.ts` | Opacity/borderWidth/zIndex | `opacity.*`, `borderWidth.*`, `zIndex.*` |

## npm Scripts

| Command | What It Does |
|---------|-------------|
| `npm run tokens` | Runs all 5 generation scripts in sequence |
| `npm run tokens:colors` | Only `generate-colors-ts.mjs` |
| `npm run tokens:css` | Only `generate-color-css.mjs` |
| `npm run tokens:effects` | Only `generate-effects-ts.mjs` |
| `npm run tokens:shadow` | Only `generate-shadow-ts.mjs` |
| `npm run tokens:foundation` | Only `generate-foundation-css.mjs` |

## Validation Scripts

| Command | Checks |
|---------|--------|
| `npm run check:tokens` | Light/dark parity (103/103 must match) + WCAG contrast ratios (warn-only) |
| `npm run check:raw-colors` | Scans component files for hex color literals (must be zero) |

Both are run automatically during `npm run build` via the `prebuild` script.

## Flow Diagram
```
public/*.json
    │
    ▼ (npm run tokens)
    ├── colors.ts        ← palette + lightColors + darkColors + cssVarColors
    ├── effects.ts       ← effects + darkEffects
    ├── shadow.ts        ← shadow + darkShadow + cssVarShadow
    ├── generated-color-tokens.css      ← CSS vars for themes
    └── generated-foundation-tokens.css ← CSS vars for spacing/radius/type
```
