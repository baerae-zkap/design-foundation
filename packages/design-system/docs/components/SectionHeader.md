# SectionHeader

> A section title row with optional inline and trailing content slots, used to label groups of content.

## When to Use
- Labeling a group of `ListCell`, `ListCard`, or `Card` components
- Adding a count badge or filter chip inline next to a section title
- Providing a "View All" or pagination control at the far right of a section heading
- Introducing any distinct content region on a screen

## When NOT to Use
- Page-level hero titles — use a heading element with `typography.semantic.headline` tokens directly
- Standalone labels with no surrounding content group — use a plain `<h2>` or `<h3>` instead
- Navigation headers at the top of a screen — use `TopNavigation` instead

## Import
```tsx
import { SectionHeader } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Section heading text. Max 2 lines; overflows with `-webkit-line-clamp`. |
| `headingContent` | `ReactNode` | — | Inline slot rendered directly after the title, baseline-aligned. Use for `ContentBadge`, `Chip`, or `IconButton`. |
| `trailing` | `ReactNode` | — | Far-right slot, baseline-aligned. Use for `TextButton` ("View All"), pagination, or an `IconButton`. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls font size and vertical padding. |
| `style` | `React.CSSProperties` | — | Additional inline styles on the container. |

## Basic Usage

```tsx
import { SectionHeader, ContentBadge, TextButton } from '@baerae-zkap/design-system';

// Minimal
<SectionHeader title="Recent Orders" />

// With badge count inline and "View All" trailing
<SectionHeader
  title="Notifications"
  headingContent={<ContentBadge color="primary">12</ContentBadge>}
  trailing={<TextButton size="small" color="primary" onClick={onViewAll}>View All</TextButton>}
/>

// Large size for a prominent section
<SectionHeader
  size="large"
  title="My Assets"
  trailing={<IconButton aria-label="Add asset" size="small"><PlusIcon /></IconButton>}
/>

// Small size for dense grouped content
<SectionHeader size="small" title="Recent" />
```

## Sizes

| Size | Font Size | Padding Top | Padding Bottom | Horizontal Padding |
|------|-----------|-------------|----------------|--------------------|
| `small` | 16px | 12px | 8px | 16px |
| `medium` | 20px | 16px | 12px | 16px |
| `large` | 24px | 20px | 12px | 16px |

## Anatomy

```
[←─────── heading area (flex:1, baseline) ──────→] [trailing (flex-shrink:0)]
 [title text]  [headingContent slot]
```

All three elements — title, `headingContent`, and `trailing` — are baseline-aligned (`alignItems: flex-end`). This keeps the visual baseline consistent regardless of the size or type of content in each slot.

## States

`SectionHeader` is non-interactive and has no press or hover states. All interactive behavior lives in the `headingContent` and `trailing` slots.

## Accessibility

- The component renders as a `<div>`. For screen reader hierarchy, wrap it alongside its content inside a `<section>` and use a heading element (`<h2>`, `<h3>`) via the `title` prop or as a `ReactNode`.
- Interactive content in `trailing` (e.g., `IconButton`) must have its own `aria-label`.
- The title supports up to 2 lines via `-webkit-line-clamp: 2` — avoid very long titles.

## Do / Don't
- Do: Use `headingContent` for count badges or context chips that belong semantically to the title.
- Do: Use `trailing` for secondary navigation actions like "View All" (`TextButton`) or an add button (`IconButton`).
- Do: Match `size` to surrounding content density — `small` for compact settings lists, `large` for prominent dashboard sections.
- Don't: Put a full `Button` (filled or weak) in the `trailing` slot — use `TextButton` or `IconButton`.
- Don't: Use `SectionHeader` as a screen-level page title — it is for grouping content within a screen.
- Don't: Overflow the `headingContent` slot with multiple large elements — keep it to one badge or icon.

## Design Tokens Used

| Token | Applied To |
|-------|-----------|
| `cssVarColors.content.base.default` | Title text color |
| `typography.fontWeight.bold` | Title font weight |
| `typography.fontSize.md` (16) | Small size title |
| `typography.fontSize.xl` (20) | Medium size title |
| `typography.fontSize['2xl']` (24) | Large size title |
| `spacing.primitive[4]` (16) | Horizontal padding |
| `spacing.primitive[2]` (8) — `[5]` (20) | Vertical padding (varies by size) |
| `spacing.primitive[2]` (8) | Gap between title and `headingContent` |
| `spacing.primitive[4]` (16) | Gap between heading area and `trailing` |

## Related Components
- `ListCell` — common child component below a `SectionHeader`
- `ListCard` — media list rows grouped under a `SectionHeader`
- `ContentBadge` — used in `headingContent` for count or status labels
- `TextButton` — used in `trailing` for "View All" links
- `TopNavigation` — screen-level navigation header (not a section header)
