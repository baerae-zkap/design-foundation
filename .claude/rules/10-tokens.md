# Token Pipeline Rules

## Source of Truth
All token values originate from JSON files in `public/`:
- `palette.json` -- primitive color palette (HSLA)
- `semantic-tokens.json` -- semantic color mappings (light + dark)
- `effects-tokens.json` -- alpha/overlay effects
- `shadow-tokens.json` -- elevation shadows
- `spacing-tokens.json`, `radius-tokens.json`, `typography-tokens.json` -- foundations

## Auto-Generated vs Manual

### Auto-generated (run `npm run tokens` to rebuild)
| Source JSON | Script | Output |
|-------------|--------|--------|
| palette + semantic | `generate-colors-ts.mjs` | `tokens/colors.ts` |
| palette + semantic | `generate-color-css.mjs` | `generated-color-tokens.css` |
| effects | `generate-effects-ts.mjs` | `tokens/effects.ts` |
| shadow | `generate-shadow-ts.mjs` | `tokens/shadow.ts` |
| spacing + radius + typography | `generate-foundation-css.mjs` | `generated-foundation-tokens.css` |

**Never edit these files.** Edit the source JSON, then run `npm run tokens`.

### Manually maintained
- `tokens/spacing.ts` -- spacing scale (base 4px)
- `tokens/radius.ts` -- border radius scale
- `tokens/typography.ts` -- font sizes, weights, line heights
- `tokens/motion.ts` -- duration, easing, transition presets
- `tokens/general.ts` -- opacity, borderWidth, zIndex

## cssVarColors Policy (CRITICAL)
Inside component source files, **always** use `cssVarColors.*`:
```ts
import { cssVarColors } from '../../tokens/colors';
// Returns CSS var strings: "var(--content-brand-default)"
background: cssVarColors.surface.brand.default  // CORRECT
background: lightColors.surface.brand.default    // WRONG (hex value)
background: '#5B59FF'                            // WRONG (raw hex)
```

`lightColors`/`darkColors` are public API for consumers. Components use `cssVarColors` so themes switch automatically via CSS variables.

## Token Naming Conventions
- Semantic vars: `--{category}-{group}-{variant}` (e.g., `--surface-brand-default`)
- Categories: `content`, `surface`, `fill`, `divider`, `effect`
- Groups: `brand`, `base`, `success`, `error`, `warning`, `info`, `kakao`, `google`
- States: `default`, `pressed`, `disabled`, `secondary`, `solid`, `solidPressed`

## Quality Gates
- `npm run check:tokens` -- verifies light/dark parity (103/103) + WCAG contrast
- `npm run check:raw-colors` -- fails build if hex literals found in components
- Both run automatically in `npm run build` via `prebuild`
