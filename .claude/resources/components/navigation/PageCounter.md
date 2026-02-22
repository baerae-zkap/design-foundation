# PageCounter

> Status: stable
> Import: `import { PageCounter } from '@baerae-zkap/design-system'`

## What It Is

A compact pill badge displaying the current page number out of a total (e.g., "2 / 5"). Used as an overlay indicator on carousels, image galleries, or paginated content.

## When to Use

- Carousel or swiper page indicator showing "current / total"
- Image gallery slide counter
- Paginated content overlay badge

## When NOT to Use

- Step-by-step wizard progress -- use `ProgressTracker`
- Continuous progress bar -- use `ProgressIndicator`
- Interactive pagination with clickable page numbers -- build custom pagination

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `current` | `number` | -- | Yes | Current page (1-indexed) |
| `total` | `number` | -- | Yes | Total number of pages |
| `variant` | `'normal' \| 'alternative'` | `'normal'` | No | Visual style variant |
| `size` | `'small' \| 'medium'` | `'small'` | No | Badge size |
| `className` | `string` | -- | No | CSS class on root |

## Common Patterns

### Carousel overlay

```tsx
<div style={{ position: 'relative' }}>
  <Carousel>{slides}</Carousel>
  <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
    <PageCounter current={currentSlide} total={slides.length} />
  </div>
</div>
```

### Alternative (inverted) variant for light backgrounds

```tsx
<PageCounter current={3} total={10} variant="alternative" />
```

### Medium size

```tsx
<PageCounter current={1} total={5} size="medium" />
```

## Design Rules

- Pill-shaped badge with `radius.primitive.full`.
- `normal` variant: container surface background + default text (subtle).
- `alternative` variant: inverted -- `content.base.default` as background, `surface.base.default` as text (dark pill on light, light pill on dark).
- Uses `tabular-nums` for stable width as numbers change.
- Values are auto-clamped: `current` is clamped to `[1, total]`, `total` is at least 1.
- The separator "/" uses `opacity.disabled` for a faded look.

## Accessibility

- Root: `<div role="status" aria-label="N / M page">`
- Automatically announces page changes to screen readers via `role="status"`.

## Token Usage

| Token | Value | Usage |
|-------|-------|-------|
| `cssVarColors.surface.base.container` | -- | Normal variant background |
| `cssVarColors.content.base.default` | -- | Normal variant text / Alternative variant background |
| `cssVarColors.surface.base.default` | -- | Alternative variant text |
| `opacity.disabled` | -- | Separator "/" opacity |
| `radius.primitive.full` | 9999px | Pill border radius |
| `spacing.primitive[6]` | 24px | Small size height |
| `spacing.primitive[8]` | 32px | Medium size height |
| `spacing.primitive[3]` | 12px | Small size horizontal padding |
| `spacing.primitive[4]` | 16px | Medium size horizontal padding |
| `spacing.primitive[1]` | 4px | Separator inline margin |
| `typography.fontSize.compact` | -- | Small size font |
| `typography.fontSize.sm` | -- | Medium size font |
| `typography.fontWeight.medium` | -- | Label weight |
