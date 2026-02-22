# ProgressTracker

> Discrete step-by-step tracker showing completed, active, and upcoming steps in a process.

## When to Use

- Multi-step flows such as checkout, onboarding, form wizards, or verification processes.
- When the user benefits from seeing named steps and understanding how far through a process they are.
- Both horizontal (step breadcrumb) and vertical (sidebar or accordion-like step list) layouts.

## When NOT to Use

- Continuous percentage progress — use `ProgressIndicator` instead.
- Carousel page position tracking — use `PageCounter` instead.
- Flows where steps are not linearly ordered or can be skipped freely.

## Import

```tsx
import { ProgressTracker } from '@baerae-zkap/design-system';
import type {
  ProgressTrackerStep,
  ProgressTrackerVariant,
  ProgressTrackerOrientation,
  ProgressTrackerProps,
} from '@baerae-zkap/design-system';
```

## Props

### ProgressTrackerProps

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `steps` | `ProgressTrackerStep[] \| number` | — | Yes | Step definitions as an array of objects, or a plain number to generate anonymous steps. |
| `activeStep` | `number` | — | Yes | Zero-based index of the currently active step. Steps before this index are marked completed. |
| `variant` | `'default' \| 'compact'` | `'default'` | No | `default` shows numbered nodes with optional labels. `compact` shows small dots only. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | No | Layout direction of the tracker. |
| `checkForFinish` | `boolean` | `false` | No | When `true`, completed steps show a checkmark icon instead of their step number. |
| `className` | `string` | — | No | Additional CSS class on the root `<div>`. |

### ProgressTrackerStep

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Text label rendered below (horizontal) or beside (vertical) the step node. Only shown in `default` variant. |
| `icon` | `ReactNode` | — | No | Custom icon inside the node. Shown in `default` variant when step is not completed-with-check. |

## Basic Usage

```tsx
import { ProgressTracker } from '@baerae-zkap/design-system';

function Checkout() {
  const [step, setStep] = useState(0);

  return (
    <ProgressTracker
      steps={[
        { label: 'Cart' },
        { label: 'Shipping' },
        { label: 'Payment' },
        { label: 'Confirm' },
      ]}
      activeStep={step}
    />
  );
}
```

## Variants

### Default (Numbered Nodes)

Shows circular numbered nodes connected by a line. Active node has a brand ring; completed nodes are brand-filled.

```tsx
<ProgressTracker
  steps={[{ label: 'Info' }, { label: 'Review' }, { label: 'Done' }]}
  activeStep={1}
/>
```

### Default with Check Icons on Completed Steps

Set `checkForFinish` to replace step numbers with a checkmark on completed nodes.

```tsx
<ProgressTracker
  steps={[{ label: 'Info' }, { label: 'Review' }, { label: 'Done' }]}
  activeStep={2}
  checkForFinish
/>
```

### Compact (Dot Mode)

Small dots with no labels or numbers — suitable for tight spaces like carousel step indicators.

```tsx
<ProgressTracker steps={4} activeStep={1} variant="compact" />
```

### Vertical Orientation

```tsx
<ProgressTracker
  steps={[
    { label: 'Step 1', icon: <CheckIcon /> },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ]}
  activeStep={1}
  orientation="vertical"
/>
```

### Anonymous Steps (Number Shorthand)

Pass a plain number to generate steps without labels or icons.

```tsx
<ProgressTracker steps={5} activeStep={2} />
```

## States

| State | Node Appearance |
|-------|----------------|
| Completed | Brand-filled circle; shows step number, custom icon, or checkmark (if `checkForFinish`). |
| Active | Brand-filled circle with brand ring/shadow; shows step number or custom icon. Slightly larger than inactive nodes in compact mode. |
| Upcoming | Muted fill with default border; shows step number or custom icon in secondary color. |
| Connector (completed) | Brand color line between completed and active nodes. |
| Connector (upcoming) | Muted fill line between active and upcoming nodes. |

## Accessibility

- The root renders as `<div role="list">`.
- Each step renders as `<div role="listitem">`.
- The active step has `aria-current="step"`.
- Each step has `aria-label` set to `step.label` if provided, or `"Step {index + 1}"` as a fallback.
- Connectors are `aria-hidden="true"`.

## Do / Don't

**Do** provide meaningful `label` values for each step so users and screen readers understand the process structure.

**Don't** use `ProgressTracker` for more than ~6–7 steps horizontally — nodes become too small on mobile. Switch to vertical orientation for long flows.

**Do** combine `checkForFinish` with step labels to give clear completion feedback at the end of a flow.

**Don't** use `variant="compact"` when step labels matter — compact mode hides all text and numbers.

**Do** use `orientation="vertical"` for sidebar step lists or when steps have longer label text.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.brand.default` | Completed and active node fill; completed connector color |
| `cssVarColors.surface.brand.secondary` | Active node ring/glow shadow |
| `cssVarColors.content.brand.default` | Active step label color |
| `cssVarColors.content.base.secondary` | Upcoming step label color and upcoming node icon color |
| `cssVarColors.fill.alternative` | Upcoming node background and upcoming connector color |
| `cssVarColors.border.base.default` | Upcoming node border |
| `cssVarColors.content.base.onColor` | Node content color (numbers/icons on brand background) |
| `radius.primitive.full` | Circular node and rounded connector caps |
| `borderWidth.default` | Node border width |
| `borderWidth.strong` | Connector thickness |
| `spacing.primitive[2]`, `spacing.primitive[6]` | Node sizes (compact vs default) |
| `spacing.primitive[3]`, `spacing.primitive[4]`, `spacing.primitive[6]` | Connector and layout gaps |
| `typography.fontSize.compact`, `typography.fontWeight.medium` | Node number text |
| `duration.fast`, `easing.easeOut` | Node size and color transitions |

## Related Components

- `ProgressIndicator` — Continuous linear bar for percentage-based progress.
- `PageCounter` — Compact "X / Y" indicator for carousel position.
