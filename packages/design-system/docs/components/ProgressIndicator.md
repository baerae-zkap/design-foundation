# ProgressIndicator

> Horizontal linear bar showing the percentage completion of a task or process.

## When to Use

- File uploads, downloads, or media buffering where progress is a continuous 0–100% value.
- Form completion progress shown at the top of a multi-step flow.
- Onboarding or quiz flows where the user benefits from seeing overall advancement.

## When NOT to Use

- Discrete named steps (e.g., "Shipping > Payment > Confirm") — use `ProgressTracker` instead.
- Indeterminate loading where the end point is unknown — use `Spinner` instead.
- Per-item loading in a list — use `Skeleton` placeholders instead.

## Import

```tsx
import { ProgressIndicator } from '@baerae-zkap/design-system';
import type {
  ProgressIndicatorSize,
  ProgressIndicatorColor,
  ProgressIndicatorProps,
} from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `progress` | `number` | — | Yes | Progress value from `0.0` to `1.0`. Non-finite values default to `0`; values outside the range are clamped. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Track height. `sm` = 2px, `md` = 4px, `lg` = 6px. |
| `color` | `'primary' \| 'neutral' \| 'success' \| 'error' \| 'warning'` | `'primary'` | No | Color of the filled indicator bar. |
| `animate` | `boolean` | `true` | No | When `true`, width changes transition smoothly. Set to `false` for instant updates (e.g., when animating externally). |
| `className` | `string` | — | No | Additional CSS class on the track element. |
| `aria-label` | `string` | `'진행률'` | No | Accessible label for the progress bar. Override to describe the specific process. |

### Size Reference

| Size | Track Height |
|------|-------------|
| `sm` | 2px |
| `md` | 4px |
| `lg` | 6px |

### Color Reference

| Color | Token Used |
|-------|-----------|
| `primary` | `surface.brand.default` |
| `neutral` | `content.base.default` |
| `success` | `content.success.default` |
| `error` | `content.error.default` |
| `warning` | `content.warning.default` |

## Basic Usage

```tsx
import { ProgressIndicator } from '@baerae-zkap/design-system';

function UploadProgress({ progress }: { progress: number }) {
  return (
    <ProgressIndicator
      progress={progress}
      aria-label="File upload progress"
    />
  );
}
```

## Variants

### Colors

```tsx
<ProgressIndicator progress={0.6} color="primary" />
<ProgressIndicator progress={0.6} color="success" />
<ProgressIndicator progress={0.6} color="error" />
<ProgressIndicator progress={0.6} color="warning" />
<ProgressIndicator progress={0.6} color="neutral" />
```

### Sizes

```tsx
<ProgressIndicator progress={0.5} size="sm" />
<ProgressIndicator progress={0.5} size="md" />
<ProgressIndicator progress={0.5} size="lg" />
```

### Without Animation

Use `animate={false}` when you control the animation externally or want instant snapping.

```tsx
<ProgressIndicator progress={step / totalSteps} animate={false} />
```

## States

| State | Behavior |
|-------|----------|
| 0% (`progress={0}`) | Track is entirely the muted fill color; indicator bar has zero width. |
| In progress | Indicator bar fills proportionally with an eased width transition (when `animate` is true). |
| 100% (`progress={1}`) | Indicator bar fills the full track width. |
| Non-finite input | Treated as `0` — no indicator shown. |

## Accessibility

- Renders with `role="progressbar"`.
- `aria-valuemin={0}`, `aria-valuemax={100}`, and `aria-valuenow` (rounded integer percent) are set automatically.
- `aria-label` defaults to `'진행률'`; override with a descriptive label for the specific context (e.g., `"File upload progress"`).
- Color is not the sole indicator — `aria-valuenow` communicates the numeric value to assistive technology.

## Do / Don't

**Do** provide a meaningful `aria-label` that describes what is progressing (e.g., `"Profile completion"`).

**Don't** use `ProgressIndicator` for indeterminate loading — the component always requires a numeric `progress` value.

**Do** use `color="success"` when the task completes to reinforce the positive outcome visually.

**Don't** use `color="error"` or `color="warning"` as the default color — reserve semantic colors for status communication (e.g., a failed upload showing `color="error"` at its last value).

**Do** pair `ProgressIndicator` with a text label showing the percentage or step count for clarity.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.fill.alternative` | Track (background) color |
| `cssVarColors.surface.brand.default` | `primary` indicator color |
| `cssVarColors.content.base.default` | `neutral` indicator color |
| `cssVarColors.content.success.default` | `success` indicator color |
| `cssVarColors.content.error.default` | `error` indicator color |
| `cssVarColors.content.warning.default` | `warning` indicator color |
| `radius.primitive.full` | Rounded caps on track and indicator |
| `duration.normal`, `easing.easeOut` | Width transition timing |

## Related Components

- `ProgressTracker` — Discrete step nodes for named multi-step flows.
- `PageCounter` — Compact "X / Y" position indicator for carousels.
- `Spinner` — Indeterminate loading indicator for unknown-duration operations.
- `Skeleton` — Content-shaped loading placeholder for list/card areas.
