# Skeleton

> Status: stable
> Import: `import { Skeleton } from '@baerae-zkap/design-system'`

## What It Is
A placeholder shimmer element that indicates content is loading. Renders as a pulsing shape that matches the layout of upcoming content, providing visual continuity during data fetching.

## When to Use
- Content loading states where the layout shape is known (lists, cards, text blocks)
- Image placeholders while media loads
- Page-level skeleton screens for initial data fetch

## When NOT to Use
- Button or action loading states -- use `Button`'s `isLoading` prop instead
- Unknown duration blocking operations -- use `Spinner` instead
- Progress tracking -- use `ProgressIndicator` instead

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | `'rectangular'` | Visual shape of the skeleton |
| `width` | `number \| string` | -- | Width (px number or CSS string like `'100%'`) |
| `height` | `number \| string` | -- | Height (px number or CSS string) |
| `borderRadius` | `number \| string` | -- | Override border radius |
| `className` | `string` | -- | Custom CSS class |
| `style` | `CSSProperties` | -- | Additional inline styles |
| `animate` | `boolean` | `true` | Whether shimmer animation is active |

## Common Patterns

### Text Placeholder
```tsx
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />
```

### Circular Avatar Placeholder
```tsx
<Skeleton variant="circular" width={40} height={40} />
```

### Card Placeholder
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
  <Skeleton variant="rounded" width="100%" height={200} />
  <Skeleton variant="text" width="70%" />
  <Skeleton variant="text" width="50%" />
</div>
```

### List Item Skeleton
```tsx
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
  <Skeleton variant="circular" width={48} height={48} />
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="40%" />
  </div>
</div>
```

### Static (No Animation)
```tsx
<Skeleton variant="rectangular" width={200} height={100} animate={false} />
```

## Design Rules
- Always match skeleton shapes to the content they replace (circular for avatars, text for lines, rectangular for images)
- Shimmer animation runs at 3.5s interval with ease-in-out easing
- `text` variant defaults height to `1em` to match text line height
- `circular` variant defaults to 40x40px (matching `Avatar` md size)
- Animation is disabled automatically when `prefers-reduced-motion: reduce` is active

## Accessibility
- `role="status"` for assistive technology awareness
- `aria-busy="true"` to indicate loading state
- `aria-label` set to loading text for screen readers
- Respects `prefers-reduced-motion` media query -- disables animation automatically

## Token Usage

| Property | Token |
|----------|-------|
| Shimmer gradient start/end | `cssVarColors.surface.base.alternative` |
| Shimmer gradient peak | `cssVarColors.surface.base.default` |
| Static background | `cssVarColors.surface.base.alternative` |
| Animation easing | `easing.easeInOut` |
| Border radius (text) | `radius.component.skeleton.text` (4px) |
| Border radius (circular) | `radius.primitive.full` (9999px) |
| Border radius (rectangular) | `radius.primitive.none` (0) |
| Border radius (rounded) | `radius.primitive.md` (12px) |

### Variant Defaults

| Variant | Default Width | Default Height | Border Radius |
|---------|---------------|----------------|---------------|
| `text` | -- | `1em` | 4px |
| `circular` | 40px | 40px | 9999px |
| `rectangular` | -- | -- | 0 |
| `rounded` | -- | -- | 12px |
