# Spinner

> An animated circular indicator for indeterminate loading states where the duration is unknown.

## When to Use

- An async action is in progress (form submit, network request, background fetch)
- A button is in a loading state while waiting for a response
- An overlay or section is blocked waiting for data with no known layout
- Duration of the operation is unknown

## When NOT to Use

- Loading content with a known layout (list items, cards, text blocks) — use `Skeleton` instead
- Progress with a known percentage — use `ProgressIndicator`
- Full-page loading states — show a skeleton layout inline instead

### Spinner vs Skeleton Decision Guide

| Use `Spinner` | Use `Skeleton` |
|---------------|----------------|
| Action in progress (button click, form submit) | Content loading (list, card, image, text) |
| Duration unknown, no layout to preview | Layout of incoming content is known |
| Overlay or blocking loading indicator | Inline placeholder in content flow |
| Single loading indicator | Multiple content placeholders |

## Import

```tsx
import { Spinner } from '@baerae-zkap/design-system';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | No | Spinner diameter. |
| `color` | `'primary' \| 'neutral' \| 'inverse' \| 'inherit'` | `'primary'` | No | Color of the spinning arc. |
| `aria-label` | `string` | `'로딩 중'` | No | Accessible label read by screen readers. |
| `className` | `string` | — | No | Additional CSS class on the outer wrapper. |
| `style` | `React.CSSProperties` | — | No | Inline styles on the outer wrapper. |

### Size Reference

| Value | Pixel Size | Stroke Width |
|-------|-----------|--------------|
| `xs` | 16px | 2px |
| `sm` | 20px | 2px |
| `md` | 24px | 2px |
| `lg` | 32px | 3px |
| `xl` | 40px | 3px |

### Color Reference

| Value | Usage |
|-------|-------|
| `primary` | Default; brand blue arc on light background |
| `neutral` | Secondary content areas; gray arc |
| `inverse` | Dark backgrounds (toasts, overlays) |
| `inherit` | Inherits `currentColor` from parent — use inside colored buttons |

## Basic Usage

```tsx
import { Spinner } from '@baerae-zkap/design-system';

// Default — medium, primary color
<Spinner />

// Inside a loading button (inherit color)
<button disabled style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <Spinner size="sm" color="inherit" aria-label="Submitting" />
  Saving...
</button>
```

## Variants

### Sizes

```tsx
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
```

### Colors

```tsx
<Spinner color="primary" />
<Spinner color="neutral" />

{/* On dark surface */}
<div style={{ backgroundColor: 'var(--surface-inverse-default)', padding: 16 }}>
  <Spinner color="inverse" />
</div>

{/* Inherits parent color */}
<span style={{ color: 'var(--content-brand-default)' }}>
  <Spinner color="inherit" />
</span>
```

### Centered in a container

```tsx
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
  <Spinner size="lg" />
</div>
```

### Button loading state

The `Button` component handles loading internally via `isLoading`. Use `Spinner` directly only when building custom loading UIs.

```tsx
{/* Prefer this */}
<Button buttonType="filled" color="primary" isLoading={isSubmitting}>
  Save
</Button>

{/* Direct Spinner usage — only for custom cases */}
<Spinner size="sm" color="primary" aria-label="Loading results" />
```

## States

| State | Behavior |
|-------|----------|
| **Active** | Continuously rotates at 0.75s per revolution |
| **Reduced motion** | Animation respects `prefers-reduced-motion` via CSS media query |

## Accessibility

- The outer `<span>` has `role="status"` and `aria-live="polite"`, so screen readers announce the label without interrupting current reading.
- The inner SVG arc has `aria-hidden="true"` — only the outer label is read.
- Always provide a meaningful `aria-label` describing what is loading (e.g., `"Saving profile"`, `"Loading results"`).
- The default label `'로딩 중'` is appropriate for general cases but can be overridden.

## Do / Don't

**Do** use `color="inherit"` when placing a Spinner inside a colored element so it blends naturally.

**Don't** show a full-screen spinner blocking the entire UI. Use skeleton placeholders for content areas.

**Do** pair with a visible label or use a descriptive `aria-label` so users understand what is loading.

**Don't** use multiple Spinners on the same screen simultaneously — consolidate to one loading indicator per region.

**Do** use `size="sm"` or `size="xs"` for inline button states; use `size="lg"` or `size="xl"` for section-level loading.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.content.brand.default` | Arc color when `color="primary"` |
| `cssVarColors.content.base.secondary` | Arc color when `color="neutral"` |
| `cssVarColors.inverse.content.default` | Arc color when `color="inverse"` |
| `cssVarColors.fill.alternative` | Track (background circle) color |
| `radius.primitive.full` | Full circle shape for the track |
| `easing.linear` | Constant-speed rotation animation |

## Related Components

- `Skeleton` — loading placeholder for known content layouts
- `Button` (`isLoading` prop) — built-in spinner for button actions
- `ProgressIndicator` — determinate progress bar with known percentage
