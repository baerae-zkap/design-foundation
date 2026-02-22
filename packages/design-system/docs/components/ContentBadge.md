# ContentBadge

> A small non-interactive label for displaying status, category, or count inline within content.

## When to Use
- Labeling the status of an item (sold out, new, on sale)
- Categorizing content by type or tag
- Showing a count inline next to a section title (via `SectionHeader` `headingContent` slot)
- Communicating semantic state (success, error, warning, info) within a list or card

## When NOT to Use
- A numeric count overlay on an icon or button — use `Badge` instead
- An interactive filter or toggle — use `Chip` instead
- A transient notification — use `Snackbar` or `Toast` instead
- A large status block with a description — use `SectionMessage` instead

## Import
```tsx
import { ContentBadge } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `'primary' \| 'neutral' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'neutral'` | Semantic color theme. |
| `variant` | `'filled' \| 'weak'` | `'filled'` | `filled` uses a solid background; `weak` uses a tinted background with matching text. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls height, font size, and horizontal padding. |
| `leftIcon` | `ReactNode` | — | Optional icon rendered to the left of the label text. |
| `children` | `ReactNode` | — | Badge label content (text or number). |
| `style` | `React.CSSProperties` | — | Additional inline styles on the `<span>` element. |

## Basic Usage

```tsx
import { ContentBadge } from '@baerae-zkap/design-system';

// Status labels
<ContentBadge color="primary">NEW</ContentBadge>
<ContentBadge color="success">In Stock</ContentBadge>
<ContentBadge color="error" variant="weak">Sold Out</ContentBadge>
<ContentBadge color="warning" variant="weak">Low Stock</ContentBadge>
<ContentBadge color="info">Updated</ContentBadge>
<ContentBadge color="neutral">Draft</ContentBadge>

// With an icon
<ContentBadge color="success" leftIcon={<CheckIcon size={12} />}>
  Verified
</ContentBadge>

// Inline count in SectionHeader
<SectionHeader
  title="Notifications"
  headingContent={<ContentBadge color="primary">{unreadCount}</ContentBadge>}
/>
```

## Variants

| Variant | Background | Text | Use Case |
|---------|-----------|------|----------|
| `filled` | Solid brand/status color | White (`onColor`) | High-emphasis labels, primary status |
| `weak` | Tinted surface color | Matching semantic text color | Softer labels, secondary status |

```tsx
// filled — strong, high-emphasis
<ContentBadge color="error" variant="filled">Sold Out</ContentBadge>

// weak — subtle, secondary emphasis
<ContentBadge color="error" variant="weak">Sold Out</ContentBadge>
```

## Colors

| Color | Filled Background | Weak Background | Use For |
|-------|-----------------|-----------------|---------|
| `primary` | Brand blue solid | Brand tinted surface | Highlight, new items |
| `neutral` | Secondary gray | Container surface | Draft, default state |
| `success` | Green solid | Green tinted surface | Available, verified, complete |
| `error` | Red solid | Red tinted surface | Sold out, failed, rejected |
| `warning` | Amber solid | Amber tinted surface | Low stock, caution |
| `info` | Info blue solid | Info tinted surface | Informational labels |

## Sizes

| Size | Height | Font Size | Padding X |
|------|--------|-----------|-----------|
| `small` | from `badge.height.sm` | 12px (`xs`) | from `badge.paddingX.sm` |
| `medium` | from `badge.height.md` | 12px (`xs`) | from `badge.paddingX.md` |
| `large` | from `badge.height.lg` | 14px (`sm`) | from `badge.paddingX.lg` |

## States

`ContentBadge` is purely non-interactive. It has no hover, focus, or press states. Do not wrap it in `onClick` handlers — use `Chip` for interactive tag/filter behavior.

## Accessibility

- Renders as an inline `<span>`. Screen readers announce the text content naturally.
- Color alone does not convey meaning — always include a readable text label (e.g., "Sold Out", not just a red dot).
- If the badge meaning is not obvious from its text alone, provide context via surrounding copy or `aria-describedby` on the parent element.
- `leftIcon` is decorative — no `aria-label` needed on the icon itself.

## Do / Don't
- Do: Use semantic `color` values that match the actual meaning (error for negative states, success for positive).
- Do: Keep label text short — 1-3 words maximum. `ContentBadge` is `whiteSpace: nowrap`.
- Do: Use `variant="weak"` for secondary or less urgent status labels to reduce visual noise.
- Don't: Use `ContentBadge` as an interactive element — use `Chip` for toggleable tags.
- Don't: Use `ContentBadge` for numeric overlays on icons — use `Badge` for that.
- Don't: Mix multiple `filled` badges of different colors in a tight cluster — it creates visual noise.

## Design Tokens Used

| Token | Applied To |
|-------|-----------|
| `cssVarColors.surface.brand.default` | Primary filled background |
| `cssVarColors.surface.brand.secondary` | Primary weak background |
| `cssVarColors.content.brand.default` | Primary weak text |
| `cssVarColors.surface.success.solid` | Success filled background |
| `cssVarColors.surface.success.default` | Success weak background |
| `cssVarColors.content.success.strong` | Success weak text |
| `cssVarColors.surface.error.solid` | Error filled background |
| `cssVarColors.surface.error.default` | Error weak background |
| `cssVarColors.content.error.default` | Error weak text |
| `cssVarColors.surface.warning.default` | Warning weak background |
| `cssVarColors.content.warning.strong` | Warning weak text |
| `cssVarColors.surface.info.default` | Info weak background |
| `cssVarColors.content.info.strong` | Info weak text |
| `cssVarColors.content.base.onColor` | All filled variant text |
| `radius.primitive.xs` | Badge corner radius |
| `typography.fontWeight.semibold` | Label font weight |

## Related Components
- `Badge` — numeric count overlay on another element (not standalone)
- `Chip` — interactive filterable tag with press state
- `SectionHeader` — use `headingContent` slot to place a `ContentBadge` next to a section title
- `SectionMessage` — larger inline status block with heading and description
