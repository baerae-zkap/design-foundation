# Documentation Authoring Rules

## Design Tab -- Canonical Section Order
1. Overview
2. Anatomy
3. Variants
4. [Component-specific sections]
5. States (with "Interaction States" as `<Subsection>`)
6. Usage Guidelines (with "Best Practices" as `<Subsection>`)
7. Design Tokens
8. Accessibility
9. Related Components

## Web Tab -- Canonical Section Order
1. Source Code
2. Import
3. Basic Usage
4. [Component-specific examples]
5. API Reference

## Rules
- Section titles must be **English** (no Korean)
- Interaction States goes inside States as `<Subsection>`
- Best Practices goes inside Usage Guidelines as `<Subsection>`
- No standalone "UX Writing" section -- merge into Best Practices

## Required Shared Components
```tsx
import { Section, Subsection, InlineCode } from '@/components/docs/Section';
import { PropsTable } from '@/components/docs/PropsTable';
import { DoCard, DontCard } from '@/components/docs/Cards';
```

Optional: `PrincipleCard`, `VariantCard` from Cards; `RadioGroup`, `CopyButton` from Playground; `DoLabel`, `DontLabel`, `NumberBadge` from Labels.

## Style Rules

### PreviewBox
```tsx
style={{
  backgroundColor: "var(--surface-base-alternative)",
  borderRadius: 12,
  padding: 32,   // adjust per component
  display: "flex",
  gap: 16,
}}
// No border on preview boxes
```

### Description Text
```tsx
style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}
```

### Overview Section
- 1-2 concise sentences
- Wrap component name in `<InlineCode>`
- No "When to use" / "When NOT to use" cards

### Best Practices
- Use `DoCard` / `DontCard` pairs in 2-column grid
- Add color description text below each card

## API Single Source Rule
Props table in the Web tab must be derived from the **TypeScript interface** in the component source file — not from memory or approximation. Always read the actual `ComponentProps` interface before writing the API Reference section.

## Doc Page File Location
```
src/app/components/{category}/{kebab-name}/page.tsx
```
Categories: `actions`, `contents`, `inputs`

## Sidebar Registration
Add entry to `componentsNav` in `src/components/Sidebar.tsx`.
