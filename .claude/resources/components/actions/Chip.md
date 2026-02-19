# Chip

> Status: stable
> Import: `import { Chip } from '@baerae-zkap/design-system'`

## What It Is
A compact interactive element for filters, tags, and selections. Supports selected state with check icon, removable state with close button, and optional left icon or avatar.

## When to Use
- Use for filter selections in a list/grid (category filter, sort options)
- Use for tag display with optional removal (selected skills, applied filters)
- Use for multi-select toggle groups (choose multiple options from a set)

## When NOT to Use
- Do NOT use for exclusive single-select between 2-5 options -- use `SegmentedControl` instead
- Do NOT use as a status label (non-interactive) -- use `ContentBadge` instead
- Do NOT use for primary CTAs -- use `Button` instead

## Decision Rules

| Intent | Use Chip When |
|--------|---------------|
| Filter tags | User can toggle filters on/off |
| Category labels | Selectable category indicators |
| Tag display with removal | Use `onClose` prop for removable tags |

**Rule**: For tab-like mode switching (mutually exclusive), use SegmentedControl instead.
**Rule**: Chip is for selection/filtering. For status display, use ContentBadge.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"filled" \| "weak"` | `"filled"` | Visual weight. `filled`=solid bg, `weak`=tinted bg |
| `color` | `"primary" \| "neutral" \| "success" \| "error" \| "warning"` | `"neutral"` | Semantic color intent |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Chip height and text size |
| `selected` | `boolean` | `false` | Selected state. Shows check icon when true (unless `onClose` is provided) |
| `leftIcon` | `ReactNode` | -- | Left icon slot. Mutually exclusive with `avatar` |
| `avatar` | `ReactNode` | -- | Avatar slot (takes precedence over `leftIcon`) |
| `onClose` | `() => void` | -- | Close handler. When provided, shows X button instead of check icon |
| `closeIcon` | `ReactNode` | -- | Custom close icon (replaces default X) |
| `disabled` | `boolean` | `false` | Grays out chip, blocks interaction |
| `children` | `ReactNode` | -- | Chip label text |

Also accepts all standard `ButtonHTMLAttributes<HTMLButtonElement>` except `color`.

## Variant Guide
- `filled` -- Solid background. Higher visual weight. Default for filter chips.
- `weak` -- Tinted/lighter background. When selected, switches to solid fill (same as filled selected). Use when unselected state should be subtle.

## Color Guide
- `neutral` -- Gray tones. Default. Use for general-purpose filters and tags.
- `primary` -- Brand blue. Use for brand-related filters or highlighted selections.
- `success` -- Green. Use for positive status tags only.
- `error` -- Red. Use for negative status tags only.
- `warning` -- Amber. Use for caution status tags only.

Note: Do NOT mix multiple status colors in the same chip group. Use a single color per group for consistency.

## Common Patterns

### Filter chip group (single color)
```tsx
<div style={{ display: 'flex', gap: 8 }}>
  {categories.map(cat => (
    <Chip
      key={cat.id}
      color="primary"
      selected={selectedId === cat.id}
      onClick={() => setSelectedId(cat.id)}
    >
      {cat.name}
    </Chip>
  ))}
</div>
```

### Removable tag chips
```tsx
<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  {tags.map(tag => (
    <Chip
      key={tag}
      color="neutral"
      onClose={() => removeTag(tag)}
    >
      {tag}
    </Chip>
  ))}
</div>
```

### With avatar
```tsx
<Chip
  avatar={<img src={user.avatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />}
  onClose={() => removeUser(user.id)}
>
  {user.name}
</Chip>
```

### With left icon
```tsx
<Chip leftIcon={<StarIcon />} selected={isFavorite} onClick={toggleFavorite}>
  Favorites
</Chip>
```

## Do / Don't

- DO: Keep chip labels short and concise (1-3 words)
- DON'T: Put full sentences inside chips
- DO: Use a single color across chips in the same group
- DON'T: Mix multiple status colors (primary, error, success) in the same chip group
- DO: Use abbreviations when possible ("Seoul" not "Seoul Metropolitan City")
- DON'T: Use chips for primary actions -- use Button instead

## Token Usage
| Property | Token |
|----------|-------|
| Background (neutral/filled) | `cssVarColors.surface.base.container` |
| Background selected (neutral) | `cssVarColors.content.base.default` |
| Text (neutral/filled) | `cssVarColors.content.base.default` |
| Text selected | `cssVarColors.content.base.onColor` |
| Background (primary/weak) | `cssVarColors.surface.brand.secondary` |
| Background selected (primary/weak) | `cssVarColors.surface.brand.default` |
| Disabled text | `cssVarColors.content.disabled.default` |
| Disabled opacity | `opacity.disabled` |
| Font weight | `typography.fontWeight.medium` |
| Border radius | `sizeStyle.height / 2` (pill shape) |
| Gap | `spacing.component.chip.gap` |
| Height sm/md/lg | `spacing.component.chip.height.sm/md/lg` |
| Padding X sm/md/lg | `spacing.component.chip.paddingX.sm/md/lg` |
| Icon size sm/md/lg | `spacing.component.chip.iconSize.sm/md/lg` |

## Accessibility
- Renders as `<button>` element -- keyboard accessible by default
- `selected` state sets `aria-pressed` for toggle semantics
- `disabled` sets `aria-disabled="true"`
- Close button has `role="button"`, `tabIndex={0}`, and keyboard handler (Enter/Space)
- Close button click uses `stopPropagation` to prevent chip click from firing
