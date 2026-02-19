# ContentBadge

> Status: stable
> Import: `import { ContentBadge } from '@baerae-zkap/design-system'`

## What It Is
A small non-interactive label for displaying status, category, or tag information. Unlike Chip, ContentBadge has no click behavior -- it is purely informational.

## When to Use
- Use for status indicators (NEW, SOLD OUT, IN PROGRESS)
- Use for category labels on cards or list items
- Use for count or tag badges next to titles

## When NOT to Use
- Do NOT use for interactive filters or selections -- use `Chip` instead
- Do NOT use for clickable actions -- use `Button` or `TextButton` instead
- Do NOT use for large status banners -- this is meant for compact inline labels

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"filled" \| "weak"` | `"filled"` | Visual weight. `filled`=solid bg, `weak`=tinted bg |
| `color` | `"primary" \| "neutral" \| "success" \| "error" \| "warning" \| "info"` | `"neutral"` | Semantic color intent |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Badge height and text size |
| `leftIcon` | `ReactNode` | -- | Optional icon before the label text |
| `children` | `ReactNode` | -- | Badge label text |

Also accepts all standard `HTMLAttributes<HTMLSpanElement>`.

## Variant Guide
- `filled` -- Solid background with white/onColor text. High contrast. Use for important status that must stand out.
- `weak` -- Tinted background with colored text. Softer appearance. Use for informational labels that should not dominate.

## Color Guide
- `primary` -- Brand blue. Use for feature highlights (NEW, RECOMMENDED).
- `neutral` -- Gray. Default. Use for general labels (category, type).
- `success` -- Green. Use for positive status (COMPLETE, ACTIVE, APPROVED).
- `error` -- Red. Use for negative status (SOLD OUT, EXPIRED, REJECTED).
- `warning` -- Amber. Use for caution status (PENDING, REVIEW NEEDED).
- `info` -- Blue. Use for informational status (UPDATED, BETA).

## Size Guide
| Size | Height | Font Size | Use For |
|------|--------|-----------|---------|
| `small` | `spacing.component.badge.height.sm` | `typography.fontSize.xs` | Inline with small text |
| `medium` | `spacing.component.badge.height.md` | `typography.fontSize.xs` | Default, most contexts |
| `large` | `spacing.component.badge.height.lg` | `typography.fontSize.sm` | Prominent badges |

## Common Patterns

### Status badge on a list item
```tsx
<ListCard
  title="Product Name"
  badges={
    <>
      <ContentBadge color="primary" size="small">NEW</ContentBadge>
      <ContentBadge color="error" variant="weak" size="small">Limited</ContentBadge>
    </>
  }
  onClick={onClick}
/>
```

### Category label
```tsx
<ContentBadge color="neutral" variant="weak">Electronics</ContentBadge>
```

### With icon
```tsx
<ContentBadge color="success" leftIcon={<CheckIcon />}>
  Verified
</ContentBadge>
```

### Status indicator
```tsx
<ContentBadge color="warning" variant="filled">PENDING</ContentBadge>
```

## Do / Don't

- DO: Keep badge text very short (1-2 words)
- DON'T: Put long descriptions in a badge
- DO: Use semantic colors to match the meaning (success=green for positive, error=red for negative)
- DON'T: Use `primary` color for status that should be `success` or `error`
- DO: Use `weak` variant for less prominent badges to avoid visual clutter
- DON'T: Stack many `filled` badges together -- use `weak` for secondary badges

## Token Usage
| Property | Token |
|----------|-------|
| Background (primary/filled) | `cssVarColors.surface.brand.default` |
| Text (primary/filled) | `cssVarColors.content.base.onColor` |
| Background (primary/weak) | `cssVarColors.surface.brand.secondary` |
| Text (primary/weak) | `cssVarColors.content.brand.default` |
| Background (success/filled) | `cssVarColors.surface.success.solid` |
| Background (error/filled) | `cssVarColors.surface.error.solid` |
| Background (warning/weak) | `cssVarColors.surface.warning.default` |
| Text (warning/weak) | `cssVarColors.content.warning.strong` |
| Font weight | `typography.fontWeight.semibold` |
| Border radius | `radius.primitive.xs` |
| Gap (icon + text) | `spacing.primitive[1]` |
| Padding X sm/md/lg | `spacing.component.badge.paddingX.sm/md/lg` |
| Height sm/md/lg | `spacing.component.badge.height.sm/md/lg` |
| Icon size sm/md/lg | `spacing.component.badge.iconSize.sm/md/lg` |

## Accessibility
- Renders as `<span>` -- no interactive semantics (correct for non-interactive element)
- Text content is read by screen readers naturally
- Use meaningful label text (not just color) to convey status information
- Do NOT rely on badge color alone to communicate status -- ensure the text label is descriptive
