# Skeleton

> A shimmering placeholder that mimics the shape of incoming content while it loads.

## When to Use

- Replacing list items, cards, text blocks, or images while data is fetching
- The layout and shape of the content is known before data arrives
- Showing multiple placeholder shapes simultaneously across a content area
- Reducing perceived load time by giving users a preview of the layout

## When NOT to Use

- When the duration of the operation is unknown and no layout exists to preview — use `Spinner`
- Button or action loading states — use `Button` with `isLoading`
- Full-screen blocking loading — still prefer skeletons over full-page spinners

### Spinner vs Skeleton Decision Guide

| Use `Skeleton` | Use `Spinner` |
|----------------|---------------|
| Content loading (list, card, image, text block) | Action in progress (button click, submit) |
| Layout of incoming content is known | Duration unknown, no layout to preview |
| Multiple inline content placeholders | Single loading indicator or overlay |
| Inline in content flow | Centered or button-level indicator |

## Import

```tsx
import { Skeleton } from '@baerae-zkap/design-system';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'rectangular'` | No | Shape preset that sets the border radius. |
| `width` | `number \| string` | — | No | Width as a pixel number or CSS string (e.g., `'100%'`, `'200px'`). |
| `height` | `number \| string` | — | No | Height as a pixel number or CSS string. |
| `borderRadius` | `number \| string` | — | No | Overrides the variant's default border radius. |
| `animate` | `boolean` | `true` | No | When `false`, disables the shimmer animation and shows a static fill. |
| `className` | `string` | — | No | Additional CSS class on the skeleton element. |
| `style` | `React.CSSProperties` | — | No | Additional inline styles. |

### Variant Border Radius Reference

| Variant | Border Radius | Default Size |
|---------|--------------|--------------|
| `text` | 4px | height: `1em` |
| `circular` | 9999px (full pill) | 40×40px |
| `rectangular` | 0px | must provide width/height |
| `rounded` | 12px | must provide width/height |

## Basic Usage

```tsx
import { Skeleton } from '@baerae-zkap/design-system';

// Text line placeholder
<Skeleton variant="text" width="80%" />

// Avatar placeholder
<Skeleton variant="circular" width={40} height={40} />

// Card image placeholder
<Skeleton variant="rounded" width="100%" height={200} />
```

## Variants

### Text

Mimics a line of text. Height defaults to `1em` matching the current font size.

```tsx
<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="75%" />
<Skeleton variant="text" width="50%" />
```

### Circular

Mimics an avatar or icon. Defaults to 40×40px.

```tsx
<Skeleton variant="circular" />
<Skeleton variant="circular" width={32} height={32} />
<Skeleton variant="circular" width={56} height={56} />
```

### Rectangular

Sharp corners. Useful for images or full-bleed placeholders.

```tsx
<Skeleton variant="rectangular" width="100%" height={160} />
```

### Rounded

Soft corners (12px radius). Useful for card thumbnails or content blocks.

```tsx
<Skeleton variant="rounded" width="100%" height={120} />
```

## Composition Examples

### List item skeleton

```tsx
function ListItemSkeleton() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Skeleton variant="circular" width={40} height={40} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}
```

### Card skeleton

```tsx
function CardSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skeleton variant="rounded" width="100%" height={180} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="50%" />
    </div>
  );
}
```

### Conditional rendering pattern

```tsx
function ContentList({ isLoading, items }) {
  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <ListItemSkeleton key={i} />
        ))}
      </div>
    );
  }
  return <ItemList items={items} />;
}
```

### Static (no animation)

```tsx
<Skeleton variant="rounded" width={200} height={100} animate={false} />
```

## States

| State | Behavior |
|-------|----------|
| **Animated** | Shimmer gradient sweeps left to right at 3.5s per cycle |
| **Static** | Solid `surface.base.alternative` fill, no animation |
| **Reduced motion** | `prefers-reduced-motion` media query sets `animation-duration: 0s` |

## Accessibility

- Renders as `<span>` with `role="status"`, `aria-busy="true"`, and `aria-label="로딩 중"`.
- Screen readers announce the loading state without visual distraction.
- When content has loaded, replace the Skeleton with actual content — `aria-busy` will no longer be present.
- Respects `prefers-reduced-motion`: the shimmer animation is disabled for users who prefer reduced motion.

## Do / Don't

**Do** match the Skeleton shape and approximate size to the content it replaces so the layout shift is minimal when content loads.

**Don't** show a single large Skeleton for the entire page — break it into component-level skeletons matching the real layout.

**Do** render multiple Skeleton instances side-by-side to mirror real list or grid structures.

**Don't** keep Skeletons visible indefinitely — always replace them once data is available or show an error state.

**Do** use `variant="text"` with varying widths (`100%`, `80%`, `60%`) to simulate multi-line text blocks.

**Don't** use `animate={false}` in most cases — the shimmer communicates that content is actively loading.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.base.alternative` | Skeleton fill color (animated track + static) |
| `cssVarColors.surface.base.default` | Shimmer highlight color (lighter midpoint in gradient) |
| `radius.component.skeleton.text` | Border radius for `variant="text"` (4px) |
| `radius.primitive.full` | Border radius for `variant="circular"` (9999px) |
| `radius.primitive.none` | Border radius for `variant="rectangular"` (0) |
| `radius.primitive.md` | Border radius for `variant="rounded"` (12px) |
| `easing.easeInOut` | Shimmer animation easing |

## Related Components

- `Spinner` — indeterminate loading indicator for actions with unknown layout
- `ProgressIndicator` — determinate progress bar for operations with known percentage
- `StateView` — empty or error state after loading completes
