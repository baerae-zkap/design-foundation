# ListCard

> A horizontal list item combining a thumbnail, title/subtitle text, and an optional right-side meta value or action.

## When to Use
- Product lists, search results, or feed items with a thumbnail image
- Order history or booking lists where image + text + price appear together
- Media content lists (podcasts, articles) with cover art
- Any list where the visual thumbnail is as important as the text

## When NOT to Use
- Simple text-only list rows without media — use `ListCell` instead
- A self-contained tappable content block — use `Card` instead
- A section title above a group of rows — use `SectionHeader` instead

## Import
```tsx
import { ListCard } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Main title. Truncated to single line with ellipsis. |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | `filled` has no border; `outlined` adds a border with rounded corners. |
| `thumbnail` | `ReactNode` | — | Left-side media slot. Rendered in an 80×80px rounded-square container. |
| `subtitle` | `ReactNode` | — | Supporting text below the title. Secondary color, 14px, single-line ellipsis. |
| `meta` | `ReactNode` | — | Right-side top value — typically a price or date. Bold 14px, right-aligned. |
| `action` | `ReactNode` | — | Right-side bottom slot — icon button, chip, or any trailing control. |
| `badges` | `ReactNode` | — | Row of badges rendered above the title (e.g., `ContentBadge` components). |
| `onClick` | `() => void` | — | Optional. When provided, the entire row becomes interactive with press states. |
| `style` | `React.CSSProperties` | — | Additional inline styles on the container. |

## Basic Usage

```tsx
import { ListCard, ContentBadge } from '@baerae-zkap/design-system';

// Simple interactive row
<ListCard
  thumbnail={
    <img src="/product.jpg" alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  }
  title="Running Shoes Pro"
  subtitle="Nike · Men's · Size 270"
  meta="₩89,000"
  onClick={() => navigate('/product/42')}
/>

// With badges and action slot
<ListCard
  thumbnail={<img src="/book.jpg" alt="Book cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
  badges={<ContentBadge color="primary">NEW</ContentBadge>}
  title="Design Systems Handbook"
  subtitle="Peter Merholz"
  meta="₩32,000"
  action={<IconButton aria-label="Add to cart" size="small"><CartIcon /></IconButton>}
  onClick={() => navigate('/book/1')}
/>

// Static (non-interactive) outlined variant
<ListCard
  variant="outlined"
  thumbnail={<img src="/order.jpg" alt="Order item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
  title="Order #20240115-001"
  subtitle="Delivered · Jan 15, 2024"
  meta="₩156,000"
/>
```

## Variants

| Variant | Border | Radius | Use Case |
|---------|--------|--------|----------|
| `filled` | None | Subtle 8px on hover area | Feed lists, product grids |
| `outlined` | 1px border | Full card radius | Contained list items, order cards |

## Layout Anatomy

```
[Thumbnail 80×80] [badges row      ] [meta bold right ]
                  [title semibold  ] [action slot     ]
                  [subtitle regular]
```

- Thumbnail: 80×80px rounded-square (8px radius), `object-fit: cover` recommended for images.
- Content column: fills remaining space; both title and subtitle truncate with ellipsis.
- Right zone: meta + action stacked, right-aligned, never wraps.

## States

| State | Behavior |
|-------|----------|
| Default | Transparent background |
| Hovered (interactive) | `surface.base.defaultPressed` background |
| Pressed (interactive) | Same tint + `scale(0.97)` transform |
| Static (no `onClick`) | No cursor change, no hover state |

## Accessibility

- When `onClick` is provided, renders as `role="button"` with `tabIndex={0}`.
- `Enter` activates the click; `Space` activates on `keyUp`.
- Focus ring appears only on keyboard navigation (`:focus-visible`).
- Thumbnail `<img>` must have a meaningful `alt` attribute.
- If the action slot contains an `IconButton`, it must have an `aria-label`.

## Do / Don't
- Do: Provide meaningful `alt` text on thumbnail images.
- Do: Use `meta` for the most important right-side value (price, date) — keep it short and non-wrapping.
- Do: Use `badges` for status labels above the title, not inline within the title string.
- Don't: Nest `ListCard` inside a `Card`.
- Don't: Put a full `Button` in the `action` slot — use a small `IconButton` or `ContentBadge`.
- Don't: Force long strings into `meta` — it is `whiteSpace: nowrap` by design.

## Design Tokens Used

| Token | Applied To |
|-------|-----------|
| `cssVarColors.surface.base.default` | Row background |
| `cssVarColors.surface.base.defaultPressed` | Hover/pressed background |
| `cssVarColors.surface.base.alternative` | Thumbnail fallback background |
| `cssVarColors.border.base.default` | Outlined variant border |
| `cssVarColors.content.base.default` | Title text color |
| `cssVarColors.content.base.secondary` | Subtitle text color |
| `radius.primitive.sm` (8) | Thumbnail corner radius |
| `radius.component.card.sm` | Outlined variant card radius |
| `spacing.primitive[3]` (12) | Gap between thumbnail and content |
| `typography.fontSize.md` (16) | Title font size |
| `typography.fontSize.sm` (14) | Subtitle and meta font size |
| `typography.fontWeight.semibold` | Title weight |
| `typography.fontWeight.bold` | Meta weight |

## Related Components
- `ListCell` — text-only list rows for settings and menus
- `Card` — full-width content container, always interactive
- `ContentBadge` — used in the `badges` slot for status labels
- `SectionHeader` — title row above a group of list items
