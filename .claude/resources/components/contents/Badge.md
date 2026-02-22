# Badge

> Status: stable
> Import: `import { Badge } from '@baerae-zkap/design-system'`

## What It Is
A small inline label used to display status, category, or count information. Supports multiple color themes and style variants with an optional leading icon.

## When to Use
- Status indicators (active, pending, error)
- Category labels on cards or list items
- Count badges alongside section headers
- Tagging content with metadata

## When NOT to Use
- Interactive filter tags -- use `Chip` instead
- Notification count overlays on icons/buttons -- use `PushBadge` instead
- Standalone status/category labels in content flow -- use `ContentBadge` instead

## Badge vs ContentBadge vs PushBadge
| Component | Purpose | Interactive | Typical Position |
|-----------|---------|-------------|------------------|
| `Badge` | Inline status/count label | No | Inline with text, on cards, in lists |
| `ContentBadge` | Standalone status/category label | No | Above titles, in card metadata |
| `PushBadge` | Notification count overlay | No | Overlaid on IconButton or icon |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | -- | Badge text content |
| `color` | `'neutral' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'neutral'` | Color theme |
| `variant` | `'filled' \| 'weak' \| 'outline'` | `'filled'` | Style variant |
| `size` | `'sm' \| 'md'` | `'md'` | Badge size |
| `leadingIcon` | `ReactNode` | -- | Icon displayed before text |
| `style` | `CSSProperties` | -- | Additional inline styles |

## Common Patterns

### Status Badges
```tsx
<Badge color="success">Active</Badge>
<Badge color="error">Error</Badge>
<Badge color="warning">Pending</Badge>
```

### Variant Styles
```tsx
<Badge color="primary" variant="filled">Filled</Badge>
<Badge color="primary" variant="weak">Weak</Badge>
<Badge color="primary" variant="outline">Outline</Badge>
```

### With Leading Icon
```tsx
<Badge color="success" leadingIcon={<CheckIcon />}>Verified</Badge>
```

### Small Size
```tsx
<Badge size="sm" color="neutral">Tag</Badge>
```

## Design Rules
- Badge is always pill-shaped (`border-radius: full`)
- `filled` variant uses solid background with `onColor` text for colored themes
- `weak` variant uses subtle/secondary background with matching content color
- `outline` variant is transparent with a colored border
- `neutral` filled uses `fill.normal` background (not brand-colored)
- Font weight is always `medium`
- Font size is `xs` for both `sm` and `md` sizes

## Accessibility
- Badge is a `<span>` element -- purely presentational
- No interactive behavior; if interactivity is needed, wrap in a button or use `Chip`
- Color alone should not convey meaning -- always include descriptive text

## Token Usage

| Property | Token |
|----------|-------|
| Border radius | `radius.primitive.full` |
| Font size | `typography.fontSize.xs` |
| Font weight | `typography.fontWeight.medium` |
| Gap (icon to text) | `spacing.primitive[1]` |
| Border width (outline) | `borderWidth.default` |

### Color Matrix

| Color | Variant | Background | Text |
|-------|---------|------------|------|
| `neutral` | `filled` | `fill.normal` | `content.base.secondary` |
| `neutral` | `weak` | `surface.base.alternative` | `content.base.secondary` |
| `neutral` | `outline` | transparent | `content.base.secondary` |
| `primary` | `filled` | `surface.brand.default` | `content.base.onColor` |
| `primary` | `weak` | `surface.brand.secondary` | `content.brand.default` |
| `primary` | `outline` | transparent | `content.brand.default` |
| `success` | `filled` | `surface.success.default` | `content.base.onColor` |
| `success` | `weak` | `--surface-success-subtle` (fallback: `surface.success.default`) | `content.success.default` |
| `success` | `outline` | transparent | `content.success.default` |
| `error` | `filled` | `surface.error.default` | `content.base.onColor` |
| `error` | `weak` | `--surface-error-subtle` (fallback: `surface.error.default`) | `content.error.default` |
| `error` | `outline` | transparent | `content.error.default` |
| `warning` | `filled` | `surface.warning.default` | `content.base.onColor` |
| `warning` | `weak` | `--surface-warning-subtle` (fallback: `surface.warning.default`) | `content.warning.default` |
| `warning` | `outline` | transparent | `content.warning.default` |
| `info` | `filled` | `surface.info.default` | `content.base.onColor` |
| `info` | `weak` | `--surface-info-subtle` (fallback: `surface.info.default`) | `content.info.default` |
| `info` | `outline` | transparent | `content.info.default` |

### Size Dimensions

| Size | Height | Padding X | Icon Size |
|------|--------|-----------|-----------|
| `sm` | `spacing.component.badge.height.sm` | `spacing.component.badge.paddingX.sm` | `spacing.component.badge.iconSize.sm` |
| `md` | `spacing.component.badge.height.md` | `spacing.component.badge.paddingX.md` | `spacing.component.badge.iconSize.md` |
