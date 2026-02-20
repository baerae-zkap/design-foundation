# Feedback Components Audit

> Last audited: 2026-02-20
> Components: AlertDialog, PushBadge, SectionMessage, Snackbar, Toast, StateView

## Audit Checklist Per Category

When reviewing a component category, verify all 4 areas:

### ① Foundation Token Usage
- [ ] No hardcoded hex/rgb values in component source
- [ ] Colors use `cssVarColors.*` (not `lightColors`/`darkColors`)
- [ ] Spacing uses `spacing.primitive[N]` or `spacing.semantic.*`
- [ ] Radius uses `radius.primitive.*` or `radius.component.*`
- [ ] Typography uses `typography.fontSize.*`, `typography.fontWeight.*`
- [ ] z-index uses `zIndex.*` from general tokens
- [ ] Shadow uses `cssVarShadow.*`

### ② Doc Page Section Completeness
**Design tab canonical order:**
1. Overview
2. Anatomy (SVG diagram + annotation legend)
3. Variants (VariantCard or PreviewBox per variant)
4. [Component-specific sections] (Size, Color, States specifics)
5. States → Interaction States (Subsection)
6. Usage Guidelines → Best Practices (DoCard/DontCard grid)
7. Design Tokens (table with property/token/value)
8. Accessibility (ARIA table + keyboard interaction if applicable)
9. Related Components (table or card links)

**Web tab canonical order:**
1. Source Code (GitHub link)
2. Import
3. Basic Usage (PreviewBox + CodeBlock)
4. [Feature-specific examples]
5. API Reference (PropsTable)

### ③ Component ↔ Doc Sync
- [ ] All props in component match API Reference table
- [ ] All variants/types in component match doc (types, colors, sizes)
- [ ] Token values in Design Tokens table match actual component code
- [ ] Code examples in doc use correct prop names

### ④ .claude MD Files
- [ ] `resources/components/feedback/{ComponentName}.md` exists
- [ ] Props table is accurate and complete
- [ ] Common patterns cover the top 2-3 use cases
- [ ] Decision rules included (when to use vs similar components)
- [ ] Token usage table accurate

---

## Audit Results: 2026-02-20

### AlertDialog ✅
- Token usage: All tokens correct (cssVarColors, spacing, radius, typography, zIndex, cssVarShadow)
- Doc sections: Complete (all 9 Design + all 5 Web)
- Sync: Accurate
- .claude MD: ✅ Exists and accurate
- Issues: None

### PushBadge ⚠️ → Fixed
- Token usage: ✅ All cssVarColors/spacing/typography/radius
- Doc sections: ✅ Complete
- Sync issues (fixed):
  - Local type `PushBadgeVariant` was `"dot" | "number"` — missing `"new"` → Fixed
  - API Reference variant type also missing `"new"` → Fixed
  - Design Tokens warning bg was `--content-warning-default` → Fixed to `--surface-warning-solid`
- .claude MD: ✅ Created

### SectionMessage ⚠️ → Fixed
- Token usage: ✅ All cssVarColors/spacing/radius/typography
- Doc sections: ✅ Complete
- Sync issues (fixed):
  - Design Tokens "default" variant bg was `surface.base.container` → Fixed to `surface.brand.secondary`
- .claude MD: ✅ Created

### Snackbar ✅
- Token usage: ✅ All cssVarColors.inverse/spacing/radius/typography/zIndex
  - Minor: `bottom: 40` hardcoded (equiv to spacing.primitive[10]) — acceptable
- Doc sections: ✅ Complete
- Sync: Accurate
- .claude MD: ✅ Created

### Toast ✅
- Token usage: ✅ All cssVarColors.inverse/spacing/radius/typography/zIndex
  - Minor: `bottom: 40`, `gap: 2`, `marginRight: -4` — minor hardcodes, acceptable
- Doc sections: ✅ Complete
- Sync: Accurate
- .claude MD: ✅ Created

### StateView ✅
- Token usage: ✅ cssVarColors/spacing/typography/spacing.semantic.screen.paddingX
- Doc sections: ✅ Complete
- Sync: Accurate
- .claude MD: ✅ Exists and accurate
- Issues: None

---

## Rules Updated
- `rules/20-component-selection.md`: Added Feedback section with decision table and Snackbar vs Toast guide

---

---

## Audit Results: Loading Category — 2026-02-20

### Spinner ⚠️ → Fixed
- Token usage: ✅ cssVarColors + var(--fill-alternative)
- Doc sections: ✅ Complete (all 9 Design + all 5 Web)
- Sync: ✅ Accurate
- .claude MD: ✅ Created
- Issues fixed:
  - Breadcrumb was "Feedback → Loading" → fixed to "Loading → Spinner"
  - Border shorthand + borderTopColor conflict → fixed to separate longhand props

### Skeleton ✅
- Token usage: ✅ var(--fill-alternative) + cssVarColors.surface.base.default
- Doc sections: ✅ Complete
- Sync: ✅ Accurate
- .claude MD: ✅ Created
- Issues fixed:
  - Initial circle visibility: --surface-base-alternative (~6% opacity) too subtle → changed to var(--fill-alternative) (~12%)
  - Added backgroundRepeat: 'no-repeat' to shimmer

### Rules Updated
- `rules/20-component-selection.md`: Added Spinner vs Skeleton decision table

---

## How to Use This Process For Next Category

1. Read all component source files (parallel)
2. Read all doc page files (parallel)
3. Read all .claude MD files (parallel)
4. For each component, check all 4 areas above
5. Fix all issues found
6. Create missing .claude MD files
7. Update rules if needed
8. Update this audit file with results
9. Commit + push
