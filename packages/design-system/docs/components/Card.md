# Card

> A clickable container that groups related content into a self-contained block.

## When to Use
- Displaying a product, article, or item as a tappable entry point
- Wrapping grouped information that navigates to a detail view
- Creating a media card with an image thumbnail above text content
- Showing a summary that expands into a full page on tap

## When NOT to Use
- Static, non-interactive content display — use a plain `div` with semantic markup instead
- A list of simple text rows — use `ListCell` instead
- Thumbnail + text in a horizontal layout — use `ListCard` instead
- You need a button group at the bottom of a sheet — use `ActionArea` instead

## Import
```tsx
import { Card } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `() => void` | — | **Required.** Click handler. Card is always interactive. |
| `variant` | `'filled' \| 'elevated' \| 'outlined'` | `'filled'` | Visual style of the card surface. |
| `padding` | `'small' \| 'medium' \| 'large'` | `'medium'` | Internal padding size. Ignored in slot mode when `thumbnail` is provided (thumbnail bleeds edge-to-edge). |
| `thumbnail` | `ReactNode` | — | Top image/media slot. Renders above content, fills card width. Activates slot mode. |
| `heading` | `ReactNode` | — | Primary title text. Rendered as semibold 16px when a string. |
| `caption` | `ReactNode` | — | Supporting description text. Rendered as secondary 14px when a string. |
| `children` | `ReactNode` | — | Free-form content. Used instead of slot props. If `children` is provided, `thumbnail`/`heading`/`caption` are ignored. |
| `style` | `React.CSSProperties` | — | Additional inline styles applied to the card container. |

### Slot Mode vs Children Mode

**Slot mode** activates when `thumbnail`, `heading`, or `caption` is provided (and no `children`). The thumbnail bleeds to the card edges with the top corners rounded; content padding is applied only to the text area below.

**Children mode** activates when `children` is provided. The padding prop applies to the whole container, giving you a blank canvas.

## Basic Usage

```tsx
// Slot mode — structured layout
<Card
  heading="Summer Collection"
  caption="Explore the latest arrivals for this season"
  onClick={() => navigate('/collection')}
/>

// Slot mode with thumbnail
<Card
  thumbnail={
    <img
      src="/product.jpg"
      alt="Product image"
      style={{ width: '100%', height: 200, objectFit: 'cover' }}
    />
  }
  heading="Running Shoes"
  caption="₩89,000"
  onClick={() => navigate('/product/42')}
/>

// Children mode — custom layout
<Card variant="outlined" padding="medium" onClick={() => navigate('/order/1234')}>
  <span style={{ fontSize: 12, color: 'var(--content-base-secondary)' }}>Order #1234</span>
  <strong style={{ display: 'block', marginTop: 4 }}>Delivered Jan 15</strong>
</Card>
```

## Variants

```tsx
// Filled — default, white/base surface background
<Card variant="filled" heading="Filled" onClick={onTap} />

// Elevated — adds a card shadow for depth
<Card variant="elevated" heading="Elevated" onClick={onTap} />

// Outlined — border instead of shadow
<Card variant="outlined" heading="Outlined" onClick={onTap} />
```

## Sizes (padding)

| Value | Padding | Use Case |
|-------|---------|----------|
| `small` | 12px | Dense layouts, compact cards |
| `medium` | 16px | Default for most cards |
| `large` | 20px | Spacious hero-style cards |

## States

| State | Behavior |
|-------|----------|
| Default | Normal surface background |
| Hovered | Background shifts to pressed tint |
| Pressed | Background shifts to pressed tint + slight `scale(0.97)` transform |

Card has no disabled state — always interactive by design.

## Accessibility

- Renders as `role="button"` with `tabIndex={0}` for keyboard access.
- `Enter` and `Space` keys trigger `onClick`.
- Wrap meaningful content inside so screen readers announce it on focus.
- If the card contains an image, provide an `alt` attribute on the `<img>`.

## Do / Don't
- Do: Always pass an `onClick` handler — Card is always interactive.
- Do: Use slot mode (`heading`, `caption`, `thumbnail`) for consistent structured layouts.
- Do: Put a single primary action per card; avoid placing `Button` components inside a Card.
- Don't: Nest a `Card` inside another `Card`.
- Don't: Use `Card` for purely static content with no navigation or action.
- Don't: Manually add `box-shadow` — use `variant="elevated"` instead.

## Design Tokens Used

| Token | Applied To |
|-------|-----------|
| `cssVarColors.surface.base.default` | Card background |
| `cssVarColors.surface.base.defaultPressed` | Hover and pressed background |
| `cssVarColors.border.base.default` | Outlined variant border |
| `cssVarShadow.semantic.card.elevated` | Elevated variant shadow |
| `radius.component.card.sm` | Corner radius |
| `typography.fontSize.md` (16) | Heading text |
| `typography.fontSize.sm` (14) | Caption text |
| `typography.fontWeight.semibold` | Heading weight |

## Related Components
- `ListCard` — horizontal thumbnail + text layout for list views
- `ListCell` — simple single-row text item for settings/menu lists
- `SectionHeader` — section title above a group of cards
- `ActionArea` — button group container for modal/sheet footers (not a card)
