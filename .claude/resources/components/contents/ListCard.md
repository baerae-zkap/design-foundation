# ListCard

> Status: stable
> Import: `import { ListCard } from '@baerae-zkap/design-system'`

## What It Is
A horizontal card layout with thumbnail, text content, and optional action area. Designed for media-rich list items like product listings, search results, and content feeds.

## When to Use
- Use for lists where each item has a thumbnail image (product lists, media feeds, search results)
- Use when items need title + subtitle + meta info + optional action
- Use when items need badges or bottom content (progress bars, extra info)

## When NOT to Use
- Do NOT use for simple text-only list rows -- use `ListCell` instead
- Do NOT use for grid layouts -- use `Card` instead
- Do NOT use for tabular data -- use `Table` instead

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"elevated" \| "outlined" \| "filled"` | `"filled"` | Card style. `filled`=default shadow, `elevated`=stronger shadow, `outlined`=border |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Controls padding, thumbnail size, font sizes, and gaps |
| `thumbnail` | `ReactNode` | -- | Left thumbnail area (image, icon, etc.) |
| `title` | `ReactNode` | (required) | Main title text. Auto-truncated to 2 lines |
| `subtitle` | `ReactNode` | -- | Secondary text below title. Single line, truncated |
| `meta` | `ReactNode` | -- | Tertiary info below subtitle (price, date). Bold styling |
| `action` | `ReactNode` | -- | Right-side action area (button, icon, etc.) |
| `badges` | `ReactNode` | -- | Badge area above the title |
| `leadingContent` | `ReactNode` | -- | Content before thumbnail (checkbox, radio, status indicator) |
| `bottomContent` | `ReactNode` | -- | Full-width area below the main row (progress bar, etc.) |
| `onClick` | `() => void` | -- | Click handler. When provided, card becomes interactive |
| `disabled` | `boolean` | `false` | Grays out card, blocks interaction |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `title`.

## Size Guide
| Size | Padding | Thumbnail | Title Font | Subtitle Font | Meta Font |
|------|---------|-----------|------------|---------------|-----------|
| `small` | 12px | `spacing.component.listCard.thumbnailSize.sm` | 14px (sm) | 12px (xs) | compact |
| `medium` | 16px | `spacing.component.listCard.thumbnailSize.md` | 16px (md) | compact | 14px (sm) |
| `large` | 16px | `spacing.component.listCard.thumbnailSize.lg` | 16px (md) | 14px (sm) | 16px (md) |

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

### With leading checkbox
```tsx
<ListCard
  leadingContent={<Checkbox checked={isSelected} onChange={toggleSelect} />}
  thumbnail={<Thumbnail src={item.image} aspectRatio="1:1" size={64} />}
  title={item.name}
  subtitle={item.description}
  meta={`$${item.price}`}
  onClick={() => toggleSelect()}
/>
```

### With bottom progress bar
```tsx
<ListCard
  title="Downloading..."
  subtitle="file.zip"
  meta="45%"
  bottomContent={<ProgressBar value={45} />}
/>
```

## Do / Don't

- DO: Use consistent `size` and `variant` within the same list
- DON'T: Mix different ListCard sizes in the same list
- DO: Provide `alt` text on thumbnail images for accessibility
- DON'T: Put long text in meta -- keep it to price/date/count
- DO: Use `badges` for status labels above the title
- DON'T: Overload ListCard with too many slots at once

## Token Usage
| Property | Token |
|----------|-------|
| Background (filled) | `cssVarColors.surface.base.default` |
| Shadow (filled) | `cssVarShadow.semantic.card.default` |
| Shadow (elevated) | `cssVarShadow.semantic.card.elevated` |
| Border (outlined) | `borderWidth.default` + `cssVarColors.border.base.default` |
| Border radius | `radius.component.card.sm` |
| Pressed bg (filled) | `cssVarColors.surface.base.container` |
| Pressed bg (elevated/outlined) | `cssVarColors.surface.base.alternative` |
| Title color | `cssVarColors.content.base.default` |
| Title weight | `typography.fontWeight.semibold` |
| Subtitle color | `cssVarColors.content.base.secondary` |
| Meta color | `cssVarColors.content.base.default` |
| Meta weight | `typography.fontWeight.bold` |
| Thumbnail bg | `cssVarColors.surface.base.container` |
| Thumbnail radius | `radius.primitive.sm` |
| Disabled opacity | `opacity.disabled` |
| Transition | `transitions.background` |

## Accessibility
- When `onClick` is provided: `role="button"`, `tabIndex={0}`, keyboard Enter/Space triggers click
- When no `onClick`: no interactive role (static display)
- Focus visible ring: `2px solid var(--content-brand-default)` with offset 2
- Title truncated to 2 lines via `-webkit-line-clamp`
- Subtitle truncated to 1 line via `text-overflow: ellipsis`
