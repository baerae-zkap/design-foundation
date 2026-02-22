# Badge

> A small pill-shaped label for displaying short text, status, or category — with semantic color and style variants.

## When to Use

- Label a status: "New", "Sale", "Beta", "Verified".
- Indicate a category or tag inline within content.
- Highlight priority or severity: "Urgent", "High", "Low".
- Apply to cards, list items, or table rows to add scannable metadata.

## When NOT to Use

- For numeric notification counts overlaid on an icon — use `PushBadge` instead.
- For interactive filter/tag chips that toggle on and off — use `Chip` instead.
- For a status label inside a list item's trailing slot — consider `ContentBadge` for that purpose.
- When the label needs to exceed ~20 characters — truncation is not handled; prefer descriptive inline text.

## Import

```tsx
import { Badge } from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Label text shown inside the badge. |
| `color` | `'neutral' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'neutral'` | Semantic color theme. Controls background and text color. |
| `variant` | `'filled' \| 'weak' \| 'outline'` | `'filled'` | Visual weight. `filled` = solid background; `weak` = subtle tinted background; `outline` = transparent with border. |
| `size` | `'sm' \| 'md'` | `'md'` | Height of the badge. |
| `leadingIcon` | `ReactNode` | — | Optional icon rendered before the label text (20×20 or smaller recommended). |
| `style` | `CSSProperties` | — | Inline style overrides for the badge element. |

## Basic Usage

```tsx
// Status badges
<Badge color="success">Verified</Badge>
<Badge color="error">Expired</Badge>
<Badge color="warning">Pending</Badge>
<Badge color="info">Beta</Badge>

// Neutral (default)
<Badge>New</Badge>

// Primary brand
<Badge color="primary" variant="weak">Featured</Badge>

// Outline style
<Badge color="error" variant="outline">Overdue</Badge>

// Small size
<Badge size="sm" color="success">Live</Badge>

// With leading icon
<Badge color="primary" leadingIcon={<StarIcon />}>Top Pick</Badge>
```

## Variants

### Color

| Value | Background (filled) | Text | Use for |
|-------|---------------------|------|---------|
| `neutral` | `--fill-normal` | Secondary | Default, general labels |
| `primary` | `--surface-brand-default` | On-color | Brand, featured, highlighted |
| `success` | `--surface-success-default` | On-color | Completed, verified, active |
| `error` | `--surface-error-default` | On-color | Failed, expired, blocked |
| `warning` | `--surface-warning-default` | On-color | Pending, at-risk, caution |
| `info` | `--surface-info-default` | On-color | Informational, beta, new |

### Variant

| Value | Description |
|-------|-------------|
| `filled` | Solid background — highest visual weight. Use for primary status labels. |
| `weak` | Subtle tinted background — medium weight. Use for secondary or supportive labels. |
| `outline` | Transparent background with a colored border — lowest weight. Use when minimal visual noise is needed. |

### Size

| Value | Height | Use for |
|-------|--------|---------|
| `md` | token-defined | Standard badge in content (default) |
| `sm` | token-defined | Compact contexts, dense lists, table cells |

## States

Badge is a purely presentational element with no interactive states. It does not respond to hover, focus, or click events. For interactive badge-like elements, use `Chip`.

## Accessibility

- Badge is rendered as a `<span>` — it is inline, non-interactive, and reads naturally in flow.
- When a Badge conveys critical status (e.g., "Error", "Expired"), ensure the parent element also communicates this status through accessible text, not color alone.
- The `leadingIcon` slot renders an icon inline; ensure any decorative icon has `aria-hidden="true"` applied to it.
- Avoid using Badge as the sole indicator of an error or warning state in a form — supplement with visible text.

## Do / Don't

**Do** use semantic colors consistently: `success` for positive states, `error` for failures, `warning` for caution, `info` for neutral notices.

**Do** keep badge text very short (1–3 words). Badges are for quick scannable labels, not full sentences.

**Don't** use `Badge` for numeric notification counts — use `PushBadge` for that pattern.

**Don't** use multiple badges of different colors in a row for the same item — it creates visual noise. Limit to one badge per content block when possible.

**Don't** make `Badge` clickable with an `onClick` on a wrapper. Use `Chip` if the label needs to be interactive.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.brand.*` | Primary filled/outline backgrounds |
| `cssVarColors.surface.success/error/warning/info.*` | Semantic filled/outline backgrounds |
| `cssVarColors.content.brand/success/error/warning/info.default` | Semantic text colors |
| `cssVarColors.content.base.secondary` | Neutral text color |
| `cssVarColors.content.base.onColor` | Text on filled color backgrounds |
| `cssVarColors.fill.normal` | Neutral filled background |
| `cssVarColors.surface.base.alternative` | Neutral weak background |
| `radius.primitive.full` | Pill shape |
| `typography.fontSize.xs` | Label font size |
| `typography.fontWeight.medium` | Label font weight |
| `spacing.component.badge.height.*` | Height per size |
| `spacing.component.badge.paddingX.*` | Horizontal padding per size |
| `borderWidth.default` | Outline border width |

## Related Components

- **ContentBadge** — Similar pill label, specifically for content category/status within list and card contexts.
- **Chip** — Interactive, toggleable version. Use when the label can be selected or dismissed.
- **PushBadge** — Numeric count overlay for icon buttons or avatars.
- **SectionMessage** — For inline contextual status banners in a content area.
