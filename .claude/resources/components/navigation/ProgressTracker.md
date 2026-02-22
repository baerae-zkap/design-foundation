# ProgressTracker

> Status: stable
> Import: `import { ProgressTracker } from '@baerae-zkap/design-system'`

## What It Is

A multi-step progress tracker showing numbered or icon-based nodes connected by lines. Supports horizontal and vertical orientations with default (labeled) and compact (dot-only) variants.

## When to Use

- Multi-step wizard or onboarding flow (e.g., "Account > Details > Confirm")
- Checkout process with discrete steps
- Any sequential workflow where the user needs to see their position

## When NOT to Use

- Continuous percentage progress -- use `ProgressIndicator`
- Page position in a carousel -- use `PageCounter`
- Tab switching between views -- use `Tab`

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `steps` | `ProgressTrackerStep[] \| number` | -- | Yes | Step definitions or just a count |
| `activeStep` | `number` | -- | Yes | Current active step index (0-based) |
| `variant` | `'default' \| 'compact'` | `'default'` | No | Default shows numbered nodes + labels; compact shows small dots |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Layout direction |
| `checkForFinish` | `boolean` | `false` | No | Show check icon for completed steps |
| `className` | `string` | -- | No | CSS class on root |

### ProgressTrackerStep

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | `string` | No | Step label text (shown in default variant only) |
| `icon` | `ReactNode` | No | Custom icon for the step node |

## Common Patterns

### Labeled horizontal stepper

```tsx
<ProgressTracker
  steps={[
    { label: 'Account' },
    { label: 'Details' },
    { label: 'Confirm' },
  ]}
  activeStep={1}
/>
```

### Compact dot stepper

```tsx
<ProgressTracker steps={5} activeStep={2} variant="compact" />
```

### Vertical with check marks

```tsx
<ProgressTracker
  steps={[
    { label: 'Order placed' },
    { label: 'Processing' },
    { label: 'Shipped' },
    { label: 'Delivered' },
  ]}
  activeStep={2}
  orientation="vertical"
  checkForFinish
/>
```

### Simple numeric count

```tsx
<ProgressTracker steps={4} activeStep={0} />
```

## Design Rules

- **Default variant**: Nodes are 24px (`spacing.primitive[6]`) circles showing step number, custom icon, or check mark. Active node has a brand-colored ring shadow.
- **Compact variant**: Nodes are 8px (`spacing.primitive[2]`) dots, active is 12px (`spacing.primitive[3]`). No labels or content inside dots.
- **Step states**: `completed` (brand background), `active` (brand background + ring shadow), `upcoming` (alternative fill + border).
- Connectors between steps use `borderWidth.strong` thickness. Completed connectors use brand color; upcoming use `fill.alternative`.
- Completed step labels use `content.base.secondary`; active step labels use `content.brand.default`.
- When `checkForFinish` is true, completed nodes show a check icon instead of the step number.
- Passing a plain `number` for `steps` creates that many label-less steps.

## Accessibility

- Root: `<div role="list">`
- Each step: `<div role="listitem" aria-current="step">` (for active step) with `aria-label` from step label or "Step N".
- Connectors are `aria-hidden="true"`.

## Token Usage

| Token | Value | Usage |
|-------|-------|-------|
| `cssVarColors.surface.brand.default` | -- | Completed/active node background, completed connector |
| `cssVarColors.surface.brand.secondary` | -- | Active node ring shadow color |
| `cssVarColors.content.base.onColor` | -- | Completed/active node text/icon color |
| `cssVarColors.content.base.secondary` | -- | Upcoming node text, non-active labels |
| `cssVarColors.content.brand.default` | -- | Active step label color |
| `cssVarColors.fill.alternative` | -- | Upcoming node background, upcoming connector |
| `cssVarColors.border.base.default` | -- | Upcoming node border |
| `borderWidth.default` | 1px | Node border width |
| `borderWidth.strong` | -- | Connector thickness |
| `radius.primitive.full` | 9999px | Node and connector border radius |
| `spacing.primitive[6]` | 24px | Default node size |
| `spacing.primitive[2]` | 8px | Compact node size, default label gap |
| `spacing.primitive[3]` | 12px | Compact active node size, horizontal connector min-width |
| `typography.fontSize.compact` | -- | Node number and label font size |
| `typography.fontWeight.medium` | -- | Node number weight |
| `typography.fontWeight.regular` | -- | Label weight |
| `duration.fast` | -- | Shadow and size transition |
| `transitions.all` | -- | Color transitions |
