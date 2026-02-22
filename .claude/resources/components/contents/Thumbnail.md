# Thumbnail

> Status: stable
> Import: `import { Thumbnail } from '@baerae-zkap/design-system'`

## What It Is
An image display component with controlled aspect ratio, rounded corners, error fallback, and optional overlay/play icon. Used for product images, article thumbnails, video previews, and any fixed-ratio image display.

## When to Use
- Use for product images in cards and list items
- Use for article/content thumbnails
- Use for video previews (with `playIcon` prop)
- Use inside `Card` thumbnail slot or `ListCard` thumbnail slot

## When NOT to Use
- Do NOT use for user avatars -- use `Avatar` component instead
- Do NOT use for decorative background images -- use CSS background-image
- Do NOT use for full-width hero images without aspect ratio constraint

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | (required) | Image source URL |
| `alt` | `string` | `""` | Alt text for accessibility |
| `aspectRatio` | `"1:1" \| "16:9" \| "4:3" \| "3:2" \| "2:1" \| "9:16" \| "3:4"` | `"1:1"` | Image aspect ratio |
| `size` | `number \| string` | -- | Width. Number = px, string = CSS unit. Defaults to `100%` |
| `radius` | `boolean` | `true` | Apply rounded corners (`radius.primitive.md` = 12px) |
| `border` | `boolean` | `false` | Show border around the image |
| `playIcon` | `boolean` | `false` | Show video play icon overlay (centered circle + triangle) |
| `fallback` | `string \| ReactNode` | `"Image unavailable"` | Content shown when image fails to load |
| `overlay` | `ReactNode` | -- | Custom overlay content (centered, full coverage) |
| `onClick` | `() => void` | -- | Click handler. When provided, cursor becomes pointer |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `onClick`.

## Aspect Ratio Guide
| Ratio | Padding Bottom | Use For |
|-------|---------------|---------|
| `1:1` | 100% | Product images, profile photos, square cards |
| `16:9` | 56.25% | Video thumbnails, article headers, landscape |
| `4:3` | 75% | Classic photo ratio |
| `3:2` | 66.67% | Photography standard |
| `2:1` | 50% | Wide banners |
| `9:16` | 177.78% | Vertical/portrait content (stories) |
| `3:4` | 133.33% | Portrait photos |

## Common Patterns

### Product image (square)
```tsx
<Thumbnail
  src="/product.jpg"
  alt="Product name"
  aspectRatio="1:1"
  size={120}
/>
```

### Video thumbnail with play icon
```tsx
<Thumbnail
  src="/video-thumb.jpg"
  alt="Video title"
  aspectRatio="16:9"
  playIcon
  onClick={onPlayVideo}
/>
```

### Inside Card slot
```tsx
<Card
  thumbnail={
    <Thumbnail
      src="/article.jpg"
      alt="Article headline"
      aspectRatio="16:9"
      radius={false}
    />
  }
  heading="Article Title"
  caption="Published 2 days ago"
  onClick={onReadArticle}
/>
```

### Inside ListCard
```tsx
<ListCard
  thumbnail={
    <Thumbnail src="/item.jpg" alt="Item" aspectRatio="1:1" size={64} />
  }
  title="Item Name"
  subtitle="Description"
  onClick={onSelect}
/>
```

### With custom overlay
```tsx
<Thumbnail
  src="/image.jpg"
  alt="Photo"
  aspectRatio="1:1"
  overlay={
    <div style={{
      backgroundColor: 'var(--overlay-dim)',
      color: 'var(--content-base-onColor)',
      padding: spacing.primitive[2],
      borderRadius: radius.primitive.xs,
    }}>
      +3 more
    </div>
  }
/>
```

### With border
```tsx
<Thumbnail src="/product.jpg" alt="Product" aspectRatio="1:1" size={48} border />
```

## Do / Don't

- DO: Always provide meaningful `alt` text for accessibility
- DON'T: Leave `alt` empty for content images (decorative images are OK)
- DO: Use appropriate aspect ratio for content type (16:9 for video, 1:1 for products)
- DON'T: Use arbitrary aspect ratios not in the predefined set
- DO: Use `playIcon` for video content to indicate playability
- DON'T: Use `playIcon` on non-video content
- DO: Provide a `fallback` message or component for error states
- DON'T: Let broken images show the browser's default broken image icon

## Token Usage
| Property | Token |
|----------|-------|
| Border radius (when enabled) | `radius.primitive.md` (12px) |
| Border | `borderWidth.default` + `cssVarColors.border.base.default` |
| Fallback bg | `cssVarColors.surface.base.container` |
| Fallback text color | `cssVarColors.content.base.neutral` |
| Fallback font size | `typography.fontSize.sm` |
| Play icon size | `spacing.component.thumbnail.playIconSize` |
| Play icon bg | `cssVarColors.overlay.dim` |
| Play icon color | `cssVarColors.content.base.onColor` |

## Accessibility
- Image has `alt` attribute for screen readers
- Error state shows fallback text/content instead of broken image
- `onClick` makes the container clickable but does not add role/tabIndex -- wrap in a button or Card for keyboard access
- Play icon overlay has `pointerEvents: 'none'` (click passes through to container)
