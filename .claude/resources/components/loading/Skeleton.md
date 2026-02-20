# Skeleton

> Status: stable
> Import: `import { Skeleton } from '@baerae-zkap/design-system'`

## What It Is
A placeholder component that mimics the shape and layout of content while it loads. Prevents jarring empty states and communicates layout before real content arrives.

## When to Use
- Content that takes > 300ms to load (lists, cards, images, text blocks)
- When you know the layout of the content that will appear
- Replace real content elements 1-to-1 with matching Skeleton shapes

## When NOT to Use
- For actions in progress — use `Spinner` or Button `isLoading` instead
- When content loads instantly (< 300ms)
- When content layout is unpredictable — use `StateView` with a loading state instead

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'rectangle' \| 'circle'` | `'rectangle'` | Shape type |
| `animation` | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation style |
| `width` | `number \| string` | `'100%'` (text/rect), height value (circle) | Element width |
| `height` | `number \| string` | `14` (text), `80` (rect), `40` (circle) | Element height |
| `borderRadius` | `number \| string` | `4` (text), `8` (rect), `'50%'` (circle) | Override corner radius |
| `aria-label` | `string` | `'로딩 중'` | Accessible label |
| `className` | `string` | — | Additional CSS class |
| `style` | `CSSProperties` | — | Inline style override |

## Variant Defaults

| Variant | Width | Height | Border Radius |
|---------|-------|--------|---------------|
| `text` | 100% | 14px | 4px |
| `rectangle` | 100% | 80px | 8px |
| `circle` | 40px | 40px | 50% |

## Animation

| Animation | Behavior | Use When |
|-----------|---------|---------|
| `shimmer` | Gradient sweeps left→right | Default; feels most alive |
| `pulse` | Opacity fades 0.5↔1 | When shimmer distracts (e.g., modal content) |
| `none` | Static fill | Reduced-motion preference or screenshots |

## Common Patterns

### Text content placeholder (3 lines)
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Skeleton variant="text" width="80%" />
  <Skeleton variant="text" width="100%" />
  <Skeleton variant="text" width="60%" />
</div>
```

### Avatar + text row
```tsx
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Skeleton variant="circle" width={48} height={48} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="text" width="70%" />
  </div>
</div>
```

### Card skeleton
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
  <Skeleton variant="rectangle" height={180} />
  <Skeleton variant="text" width="60%" />
  <Skeleton variant="text" width="90%" />
  <Skeleton variant="text" width="40%" />
</div>
```

### Replace real content
```tsx
// Pattern: show skeleton while loading, real content when done
{isLoading ? (
  <Skeleton variant="rectangle" height={200} />
) : (
  <img src={imageUrl} alt={alt} />
)}
```

## Design Rules
- Match skeleton shape to actual content shape (same width/height approximation)
- Use consistent animation across all skeletons on one screen
- Max 1 animation type per view (don't mix shimmer + pulse)
- Always replace with real content — never leave skeletons permanently

## Accessibility
- `role="img"` + `aria-label="로딩 중"` on each Skeleton
- Consider wrapping a skeleton group in a `role="status"` `aria-label="로딩 중"` container instead of individual labels

## Token Usage
| Property | Token |
|----------|-------|
| Base background | `var(--fill-alternative)` (~12% opacity) |
| Shimmer highlight | `cssVarColors.surface.base.default` |
| Shimmer duration | 1.5s ease-in-out |
| Pulse duration | 2s ease-in-out |
