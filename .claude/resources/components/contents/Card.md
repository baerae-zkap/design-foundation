# Card

> Status: stable
> Import: `import { Card } from '@baerae-zkap/design-system'`

## What It Is
A clickable content container with two usage modes: slot mode (structured with thumbnail/heading/caption props) and children mode (free-form content). Always interactive -- `onClick` is required.

## When to Use
- Use for self-contained content blocks that navigate to detail views
- Use for product cards, article cards, or any grouped information unit
- Use slot mode (thumbnail + heading + caption) for consistent card layouts
- Use children mode for custom card content

## When NOT to Use
- Do NOT use for horizontal thumbnail + text list items -- use `ListCard` instead
- Do NOT use for simple settings rows -- use `ListCell` instead
- Do NOT nest Card inside another Card
- Do NOT use as a non-interactive container -- `onClick` is required. For non-clickable grouped content, use a plain `<div>` with token-based styling or use `Card variant="outlined"` with a meaningful navigation target

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"filled" \| "elevated" \| "outlined"` | `"filled"` | Visual style. `filled`=flat bg, `elevated`=shadow, `outlined`=border |
| `padding` | `"small" \| "medium" \| "large"` | `"medium"` | Internal padding size |
| `onClick` | `() => void` | (required) | Click handler. Card is always interactive |
| `children` | `ReactNode` | -- | Free-form content. When provided, slot props are ignored |
| `thumbnail` | `ReactNode` | -- | Top image area (slot mode) |
| `heading` | `ReactNode` | -- | Title text (slot mode). String auto-styled, ReactNode rendered as-is |
| `caption` | `ReactNode` | -- | Description text (slot mode). String auto-styled, ReactNode rendered as-is |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `onClick`.

## Mode Detection
- **Slot mode**: Activates when `children` is NOT provided AND at least one of `thumbnail`, `heading`, or `caption` is set. Padding is 0 on the outer container; text area gets the padding.
- **Children mode**: Activates when `children` is provided. Slot props are ignored. Full padding applied to container.

## Variant Guide
- `filled` -- White/default background, no border, no shadow. Cleanest look. Pressed state shows alternative background.
- `elevated` -- White background with card shadow (`cssVarShadow.semantic.card.elevated`). Use when card needs to stand out from its container.
- `outlined` -- White background with border (`borderWidth.default`). Use for clear card boundaries without elevation.

## Padding Guide
| Padding | Value | Use For |
|---------|-------|---------|
| `small` | `spacing.primitive[3]` (12px) | Compact cards in grids |
| `medium` | `spacing.semantic.inset.md` | Default for most cards |
| `large` | `spacing.semantic.inset.lg` | Spacious featured cards |

## Common Patterns

### Slot mode (structured card)
```tsx
<Card
  variant="outlined"
  thumbnail={<img src="/product.jpg" alt="Product" style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
  heading="Product Name"
  caption="A brief description of the product."
  onClick={() => navigate('/product/123')}
/>
```

### Children mode (custom content)
```tsx
<Card variant="elevated" padding="medium" onClick={() => navigate('/detail')}>
  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Order #1234</h3>
  <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--content-base-secondary)' }}>
    Delivered on Jan 15
  </p>
</Card>
```

### Card grid
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
  {items.map(item => (
    <Card
      key={item.id}
      variant="outlined"
      thumbnail={<img src={item.image} alt={item.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }} />}
      heading={item.title}
      caption={item.description}
      onClick={() => onSelect(item.id)}
    />
  ))}
</div>
```

## Do / Don't

- DO: Always provide an `onClick` handler -- Card is always interactive
- DON'T: Use Card as a non-clickable container
- DO: Use one Card variant consistently within a section
- DON'T: Nest Cards inside other Cards
- DO: Use slot mode for consistent structured layouts
- DON'T: Mix slot props and children in the same Card (children takes precedence)

## Token Usage
| Property | Token |
|----------|-------|
| Background (filled) | `cssVarColors.surface.base.default` |
| Background pressed | `cssVarColors.surface.base.alternative` |
| Border (outlined) | `borderWidth.default` + `cssVarColors.border.base.default` |
| Shadow (elevated) | `cssVarShadow.semantic.card.elevated` |
| Border radius | `radius.component.card.sm` |
| Heading font size | `typography.fontSize.md` |
| Heading font weight | `typography.fontWeight.semibold` |
| Heading color | `cssVarColors.content.base.strong` |
| Caption font size | `typography.fontSize.sm` |
| Caption color | `cssVarColors.content.base.secondary` |
| Text area gap | `spacing.primitive[1]` |
| Transition | `transitions.all` |

## Accessibility
- Renders with `role="button"` and `tabIndex={0}` -- keyboard focusable and activatable
- Enter and Space keys trigger `onClick`
- Press state managed by `usePressable` hook for visual feedback
- Image area has `overflow: hidden` with top border radius for clipped images
