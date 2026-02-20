# Spinner

> Status: stable
> Import: `import { Spinner } from '@baerae-zkap/design-system'`

## What It Is
A circular animated indicator for in-progress loading or processing states. Renders as an arc rotating 360° continuously. Lightweight and non-blocking — renders inline without portal.

## When to Use
- Waiting for data to load within a section
- Indicating processing state after button clicks (paired with button `isLoading` prop, which uses its own LoadingDots)
- Overlay loading pattern inside a relative-positioned container
- Any async operation taking > 300ms

## When NOT to Use
- For content placeholder layouts — use `Skeleton` instead
- For instantaneous operations (< 300ms) — avoid showing spinner for very fast operations
- Alongside Skeleton on the same content area — use one or the other

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Spinner diameter |
| `color` | `'primary' \| 'neutral' \| 'inverse' \| 'inherit'` | `'primary'` | Spinner arc color |
| `aria-label` | `string` | `'로딩 중'` | Accessible label for screen readers |
| `className` | `string` | — | Additional CSS class |
| `style` | `CSSProperties` | — | Inline style override |

## Size Reference

| Size | Diameter | Stroke |
|------|---------|--------|
| `xs` | 16px | 2px |
| `sm` | 20px | 2px |
| `md` | 24px | 2px |
| `lg` | 32px | 3px |
| `xl` | 40px | 3px |

## Common Patterns

### Basic centered spinner
```tsx
<div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
  <Spinner />
</div>
```

### Overlay pattern
```tsx
<div style={{ position: 'relative' }}>
  {isLoading && (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--surface-base-default)',
      zIndex: 10,
    }}>
      <Spinner size="lg" />
    </div>
  )}
  <ActualContent />
</div>
```

### On dark background (inverse)
```tsx
<div style={{ backgroundColor: 'var(--surface-inverse-default)', padding: 24 }}>
  <Spinner color="inverse" />
</div>
```

### Inherit parent color (for icon buttons etc.)
```tsx
<Spinner size="sm" color="inherit" />
```

## Accessibility
- `role="status"` + `aria-live="polite"` on outer span
- Inner arc span is `aria-hidden="true"`
- Customize `aria-label` for context: `aria-label="프로필 불러오는 중"`

## Token Usage
| Property | Token |
|----------|-------|
| Arc color (primary) | `cssVarColors.content.brand.default` |
| Arc color (neutral) | `cssVarColors.content.base.secondary` |
| Arc color (inverse) | `cssVarColors.inverse.content.default` |
| Track color | `var(--fill-alternative)` |
| Animation duration | 0.75s linear |
