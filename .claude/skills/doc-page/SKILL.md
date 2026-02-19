# Skill: Doc Page

## When to Use
Creating a new documentation page for a component, or restructuring an existing one.

## Workflow

### Step 1: Create Page File
```
src/app/components/{category}/{kebab-name}/page.tsx
```
Categories: `actions`, `contents`, `inputs`

### Step 2: Register in Sidebar
Edit `src/components/Sidebar.tsx`:
- Add entry to `componentsNav` array under the correct category label
- Format: `{ title: "Component Name", href: "/components/{category}/{kebab-name}" }`

### Step 3: Follow Canonical Order
See `references/canonical-order.md` for full section reference with code examples.

**Design Tab:** Overview > Anatomy > Variants > [specific] > States > Usage Guidelines > Design Tokens > Accessibility > Related Components

**Web Tab:** Source Code > Import > Basic Usage > [examples] > API Reference

### Step 4: Use Shared Components
```tsx
import { Section, Subsection, InlineCode } from '@/components/docs/Section';
import { PropsTable } from '@/components/docs/PropsTable';
import { DoCard, DontCard } from '@/components/docs/Cards';
```

### Step 5: Import Actual Component
```tsx
import { ComponentName } from '@baerae-zkap/design-system';
```
Use real components in preview boxes, not mock HTML.

### Step 6: Style Conventions
- PreviewBox: `bg: var(--surface-base-alternative)`, `borderRadius: 12`, no border
- Description text: `fontSize: 14`, `color: var(--text-secondary)`, `lineHeight: 1.7`
- Overview: concise 1-2 lines, component name in `<InlineCode>`
- Best Practices: `DoCard`/`DontCard` pairs in 2-column grid

### Step 7: Verify
```bash
npm run build    # Should show 36+ pages (or more as we add)
```
Check that the new page renders correctly in dev mode (`npm run dev`).

## Rules
- Section titles in English only
- No "UX Writing" standalone section
- Use `<Subsection>` for Interaction States (inside States) and Best Practices (inside Usage Guidelines)
- Import real components, not inline definitions
- All preview boxes use `var(--surface-base-alternative)` background

## References
- `references/canonical-order.md` -- Full section order with code examples
- `../../rules/50-docs.md` -- Documentation authoring rules
