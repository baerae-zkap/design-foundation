# Skill: New Component

## When to Use
Creating a new web component from scratch or significantly refactoring an existing one.

## Prerequisites
- Read `00-project.md` for component index and current status
- Read a similar existing component for patterns (see References)

## Workflow

### Step 1: Plan
- Determine category: Action, Content, or Input
- Identify variant/color/size props needed
- Check if `usePressable` is needed (interactive components)

### Step 2: Create Component File
```
packages/design-system/src/components/{ComponentName}/{ComponentName}.tsx
```

Follow the template in `references/template.tsx`. Key requirements:
- `"use client"` directive at top
- Import `cssVarColors` from `../../tokens/colors` (never hex values)
- Import tokens: `spacing`, `radius`, `typography`, `opacity`, `borderWidth` as needed
- Import `usePressable` from `../../utils/usePressable` for interactive components
- Import `transitions` from `../../utils/styles`
- Use `forwardRef` for ref forwarding
- TypeScript interface with exported prop types
- `displayName` set on component

### Step 3: Export from Barrel
Add to `packages/design-system/src/index.ts`:
```ts
export { ComponentName } from './components/ComponentName/ComponentName';
export type { ComponentNameProps } from './components/ComponentName/ComponentName';
```

### Step 4: Apply Token Conventions
- Colors: only `cssVarColors.*` (see `10-tokens.md`)
- Transitions: use `transitions.*` from motion tokens
- Disabled: `opacity.disabled` + `cursor: not-allowed` + `aria-disabled`
- Radius: use `radius.component.*` or `radius.primitive.*`
- Spacing: use `spacing.*` tokens

### Step 5: Accessibility
- Follow checklist in `40-a11y.md`
- Icon-only: `aria-label` required
- Div-based interactive: `role`, `tabIndex`, `onKeyDown`
- Focus-visible outline

### Step 6: Self-Review Checklist
Before running build, confirm:
- [ ] No hex/rgb/hsl color literals — only `cssVarColors.*`
- [ ] State order: `disabled > pressed > hovered > default`
- [ ] `aria-label` on icon-only, `role`+`tabIndex`+`onKeyDown` on div-based interactive
- [ ] `Enter` and `Space` both trigger `onClick`
- [ ] `disabled` blocks both pointer + keyboard
- [ ] No magic numbers — all spacing/radius/borderWidth from tokens

### Step 7: Verify
```bash
npm run build          # Must pass
npm run check:raw-colors  # No hex literals
```

## Category Patterns
See `references/patterns.md` for Action vs Content vs Input patterns.

## References
- `references/template.tsx` -- Component boilerplate
- `references/patterns.md` -- Category-specific patterns
- `../../rules/20-component-api.md` -- API conventions
- `../../rules/30-patterns.md` -- Implementation patterns
- `../../rules/40-a11y.md` -- Accessibility checklist
