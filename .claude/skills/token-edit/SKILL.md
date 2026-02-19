# Skill: Token Edit

## When to Use
Adding, modifying, or removing design tokens (colors, spacing, radius, typography, shadows, effects).

## Workflow

### Step 1: Identify Token Type
Determine which pipeline the token belongs to:
- **Color tokens** (palette, semantic, effects, shadow) -- auto-generated pipeline
- **Foundation tokens** (spacing, radius, typography, motion, general) -- manually maintained

### Step 2a: Auto-Generated Tokens
1. Edit the source JSON in `public/`:
   - Palette colors: `public/palette.json`
   - Semantic mappings: `public/semantic-tokens.json`
   - Effects: `public/effects-tokens.json`
   - Shadows: `public/shadow-tokens.json`
2. Run `npm run tokens` to regenerate all output files
3. **Never edit the generated TS/CSS files directly**

### Step 2b: Manually Maintained Tokens
Edit the TypeScript file directly:
- Spacing: `packages/design-system/src/tokens/spacing.ts`
- Radius: `packages/design-system/src/tokens/radius.ts`
- Typography: `packages/design-system/src/tokens/typography.ts`
- Motion: `packages/design-system/src/tokens/motion.ts`
- General (opacity, borderWidth, zIndex): `packages/design-system/src/tokens/general.ts`

### Step 3: Verify
```bash
npm run check:tokens       # Light/dark parity + WCAG contrast
npm run check:raw-colors   # No hex literals in components
npm run build              # Full build passes
```

### Step 4: Update Docs (if visible change)
- Foundation pages: `src/app/colors/`, `src/app/spacing/`, etc.
- Component docs if token change affects component appearance

## Rules
- Color values in JSON use **HSLA format**: `{ "h": 224, "s": 100, "l": 65, "a": 1 }`
- All semantic tokens must have both light and dark entries (103/103 parity)
- New semantic tokens must follow naming: `{category}.{group}.{variant}`
- Foundation CSS is also auto-generated for spacing/radius/typography

## References
- `references/pipeline.md` -- Complete pipeline diagram
- `../../rules/10-tokens.md` -- Token policy and conventions
