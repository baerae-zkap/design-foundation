# ProgressIndicator

> Status: stable
> Import: `import { ProgressIndicator } from '@baerae-zkap/design-system'`

## What It Is

A horizontal progress bar that fills from left to right based on a 0-1 progress value. Shows determinate progress with smooth animated transitions.

## When to Use

- File upload progress
- Form completion percentage
- Download/processing progress
- Any determinate progress visualization

## When NOT to Use

- Indeterminate/unknown-duration loading -- use `Spinner`
- Multi-step wizard progress -- use `ProgressTracker`
- Page position indicator -- use `PageCounter`

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `progress` | `number` | -- | Yes | Progress value from 0.0 to 1.0 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Track height preset |
| `color` | `'primary' \| 'neutral' \| 'success' \| 'error' \| 'warning'` | `'primary'` | No | Fill bar color |
| `animate` | `boolean` | `true` | No | Enable smooth width transition |
| `className` | `string` | -- | No | CSS class on root |
| `aria-label` | `string` | `'진행률'` | No | Accessible label |

## Common Patterns

### Basic progress bar

```tsx
<ProgressIndicator progress={0.65} />
```

### Upload progress with color change on completion

```tsx
<ProgressIndicator
  progress={uploadProgress}
  color={uploadProgress >= 1 ? 'success' : 'primary'}
  aria-label="File upload progress"
/>
```

### Thin decorative bar

```tsx
<ProgressIndicator progress={0.3} size="sm" />
```

### Without animation (instant jumps)

```tsx
<ProgressIndicator progress={step / totalSteps} animate={false} />
```

## Design Rules

- Track heights: `sm` = 2px, `md` = 4px, `lg` = 6px.
- Both track and fill bar use `radius.primitive.full` for rounded ends.
- Track background: `fill.alternative` (subtle gray).
- Fill color maps to semantic surface/content tokens per `color` prop.
- Progress is clamped to [0, 1]; non-finite values default to 0.
- Animation uses `duration.normal` with `easing.easeOut`.

## Accessibility

- Root: `<div role="progressbar" aria-label="..." aria-valuemin={0} aria-valuemax={100} aria-valuenow={N}>`
- `aria-valuenow` is rounded to the nearest integer percentage.

## Token Usage

| Token | Value | Usage |
|-------|-------|-------|
| `cssVarColors.surface.brand.default` | -- | Primary color fill |
| `cssVarColors.content.base.default` | -- | Neutral color fill |
| `cssVarColors.content.success.default` | -- | Success color fill |
| `cssVarColors.content.error.default` | -- | Error color fill |
| `cssVarColors.content.warning.default` | -- | Warning color fill |
| `cssVarColors.fill.alternative` | -- | Track background |
| `radius.primitive.full` | 9999px | Track and fill border radius |
| `duration.normal` | -- | Width transition duration |
| `easing.easeOut` | -- | Width transition easing |
| `transitions.all` | -- | Color transition fallback |
