# ListCard

> Status: stable
> Import: `import { ListCard } from '@baerae-zkap/design-system'`

## What It Is
A horizontal card layout with thumbnail, text content, and optional action area. Designed for media-rich list items like product listings, search results, and content feeds.

## When to Use
- Use for lists where each item has a thumbnail image (product lists, media feeds, search results)
- Use when items need title + subtitle + meta info + optional action
- Use when items need badges above the title

## When NOT to Use
- Do NOT use for simple text-only list rows -- use `ListCell` instead
- Do NOT use for grid layouts -- use `Card` instead
- Do NOT use for tabular data -- use `Table` instead

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"filled" \| "outlined"` | `"filled"` | Card style. `filled`=no border, `outlined`=border |
| `thumbnail` | `ReactNode` | -- | Left thumbnail area (image, icon, etc.) |
| `title` | `ReactNode` | (required) | Main title text. Auto-truncated to 2 lines |
| `subtitle` | `ReactNode` | -- | Secondary text below title. Single line, truncated |
| `meta` | `ReactNode` | -- | Tertiary info below subtitle (price, date). Bold styling |
| `action` | `ReactNode` | -- | Right-side action area (button, icon, etc.), vertically centered |
| `badges` | `ReactNode` | -- | Badge area above the title |
| `onClick` | `() => void` | -- | Click handler. When provided, card becomes interactive |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `title`.

## Common Patterns

### Product list item
```tsx
<ListCard
  variant="outlined"
  thumbnail={<Thumbnail src="/product.jpg" aspectRatio="1:1" size={80} />}
  title="Product Name"
  subtitle="Brand Name"
  meta="$59.00"
  badges={<ContentBadge color="primary" size="small">NEW</ContentBadge>}
  onClick={() => navigate(`/product/${id}`)}
/>
```

### With action button
```tsx
<ListCard
  title="Song Title"
  subtitle="Artist Name"
  thumbnail={<Thumbnail src={albumArt} aspectRatio="1:1" size={56} />}
  action={
    <IconButton aria-label="Play" onClick={onPlay}>
      <PlayIcon />
    </IconButton>
  }
/>
```

### Badges + meta
```tsx
<ListCard
  thumbnail={<Thumbnail src={item.image} aspectRatio="1:1" size={64} />}
  title={item.name}
  subtitle={item.description}
  meta={`$${item.price}`}
  badges={
    <>
      <ContentBadge color="success" size="small">IN STOCK</ContentBadge>
      <ContentBadge color="warning" size="small">HOT</ContentBadge>
    </>
  }
  onClick={() => selectItem(item.id)}
/>
```

## Do / Don't

- DO: Use consistent `variant` within the same list
- DON'T: Put long text in meta -- keep it to price/date/count
- DO: Use `badges` for status labels above the title
- DON'T: Overload ListCard with too many slots at once
- DO: Provide `alt` text on thumbnail images for accessibility

## Token Usage
| Property | Token |
|----------|-------|
| Background (both variants) | `cssVarColors.surface.base.default` |
| Border (outlined) | `borderWidth.default` + `cssVarColors.border.base.default` |
| Border radius | `radius.component.card.sm` |
| Pressed bg (filled) | `cssVarColors.surface.base.container` |
| Pressed bg (outlined) | `cssVarColors.surface.base.alternative` |
| Title color | `cssVarColors.content.base.default` |
| Title weight | `typography.fontWeight.semibold` |
| Subtitle color | `cssVarColors.content.base.secondary` |
| Meta color | `cssVarColors.content.base.default` |
| Meta weight | `typography.fontWeight.bold` |
| Thumbnail bg | `cssVarColors.surface.base.container` |
| Thumbnail radius | `radius.primitive.sm` |
| Transition | `transitions.background` |

## Accessibility
- When `onClick` is provided: `role="button"`, `tabIndex={0}`, keyboard Enter/Space triggers click
- When no `onClick`: no interactive role (static display)
- Focus visible ring: `2px solid var(--content-brand-default)` with offset 2
- Title truncated to 2 lines via `-webkit-line-clamp`
- Subtitle truncated to 1 line via `text-overflow: ellipsis`
