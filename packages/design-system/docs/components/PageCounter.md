# PageCounter

> Pill-shaped badge displaying the current page position within a total page count.

## When to Use

- Carousels, image galleries, or onboarding flows where the user needs to know their position.
- Paginated content viewers (e.g., story cards, fullscreen image sliders).
- Any surface where a compact "X / Y" indicator is needed without full pagination controls.

## When NOT to Use

- Multi-step forms or processes with distinct named steps — use `ProgressTracker` instead.
- When users need to jump to arbitrary pages — provide clickable page controls instead.
- Long paginated lists with many pages — a text indicator alone is not sufficient navigation.

## Import

```tsx
import { PageCounter } from '@baerae-zkap/design-system';
import type { PageCounterVariant, PageCounterSize, PageCounterProps } from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `current` | `number` | — | Yes | 1-indexed current page. Non-finite values clamp to 1. |
| `total` | `number` | — | Yes | Total number of pages. Non-finite values clamp to 1. |
| `variant` | `'normal' \| 'alternative'` | `'normal'` | No | Visual style. `normal` uses a subtle surface; `alternative` uses an inverted (dark) pill. |
| `size` | `'small' \| 'medium'` | `'small'` | No | Controls pill height and font size. |
| `className` | `string` | — | No | Additional CSS class on the root element. |

### Size Reference

| Size | Height | Font |
|------|--------|------|
| `small` | 24px | `compact` |
| `medium` | 32px | `sm` |

## Basic Usage

```tsx
import { PageCounter } from '@baerae-zkap/design-system';

function ImageCarousel() {
  const [page, setPage] = useState(1);
  const total = 5;

  return (
    <div style={{ position: 'relative' }}>
      <Carousel onPageChange={setPage} />
      <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
        <PageCounter current={page} total={total} />
      </div>
    </div>
  );
}
```

## Variants

### Normal

Subtle container background — suitable for placement on a white or light surface.

```tsx
<PageCounter current={2} total={8} variant="normal" />
```

### Alternative

Inverted pill with a dark background — designed for overlay on top of images or dark surfaces.

```tsx
<PageCounter current={2} total={8} variant="alternative" />
```

### Medium Size

```tsx
<PageCounter current={1} total={4} size="medium" />
```

## States

| State | Behavior |
|-------|----------|
| Normal display | Shows `current / total` with a dimmed separator. |
| Out-of-range `current` | Clamped to `[1, total]` automatically. |
| Non-finite input | Both `current` and `total` default to `1` if non-finite. |

The component is purely display — it has no interactive states.

## Accessibility

- Renders with `role="status"` so screen readers announce page changes without interrupting the user.
- `aria-label` is set to the localized string `"{current} / {total} 페이지"` automatically.
- Uses `font-variant-numeric: tabular-nums` to prevent layout shift as numbers change.
- `user-select: none` prevents accidental text selection during swipe gestures.

## Do / Don't

**Do** position PageCounter as an overlay (absolute/fixed) on top of a carousel or fullscreen image using `position: absolute`.

**Don't** use PageCounter as a replacement for a full pagination control when users need to jump between pages.

**Do** use `variant="alternative"` when the counter sits on a dark image or colored background for contrast.

**Don't** pass 0 or negative values for `current` or `total` — they are clamped but the resulting display may confuse users.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.base.container` | Normal variant background |
| `cssVarColors.content.base.default` | Normal variant text / alternative variant background |
| `cssVarColors.surface.base.default` | Alternative variant text |
| `radius.primitive.full` | Pill shape |
| `opacity.disabled` | Separator `/` opacity |
| `spacing.primitive[3]`, `spacing.primitive[4]` | Horizontal padding per size |
| `spacing.primitive[6]`, `spacing.primitive[8]` | Pill height per size |
| `typography.fontSize.compact`, `typography.fontSize.sm` | Font sizes per size |
| `typography.fontWeight.medium` | Pill text weight |

## Related Components

- `ProgressIndicator` — Continuous linear bar showing percentage completion.
- `ProgressTracker` — Discrete step-by-step process tracker with labeled nodes.
