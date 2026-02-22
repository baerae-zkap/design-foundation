# SegmentedControl

> A compact tab-like selector for switching exclusively between 2–5 views or modes.

## When to Use
- Switching between mutually exclusive views or display modes (List / Grid, Day / Week / Month)
- Filtering content where only one mode is active at a time (All / Active / Archived)
- Compact contexts where a full Tab strip would be too heavy

## When NOT to Use
- Multi-select or filter behavior where multiple options can be active → Use `Chip` instead
- More than 5 options → Use `Tab` for full tab navigation
- Single-choice form field submitted with a form → Use `Radio` / `RadioGroup` instead

**Tie-breaker — Chip vs SegmentedControl:** Use `Chip` when users can select multiple items simultaneously (filter tags, category multi-select). Use `SegmentedControl` when exactly one option is active and it switches the entire view or mode.

## Import
```tsx
import { SegmentedControl } from '@baerae-zkap/design-system';
import type { SegmentedControlOption } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SegmentedControlOption[]` | **required** | Array of `{ value: string; label: string }` objects |
| `value` | `string` | **required** | Currently selected value (always controlled) |
| `onChange` | `(value: string) => void` | **required** | Called with the newly selected value |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Segment height and font size |
| `fullWidth` | `boolean` | `false` | Stretches the control to fill its container width |
| `disabled` | `boolean` | `false` | Disables all interaction; reduces opacity |
| `style` | `CSSProperties` | — | Additional styles on the container element |

### SegmentedControlOption
| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Unique identifier for this option |
| `label` | `string` | Display text for the segment button |

Forwards `ref` to the outer `<div>` container.

## Basic Usage
```tsx
const [view, setView] = useState('list');

<SegmentedControl
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
  value={view}
  onChange={setView}
/>
```

## Three Options
```tsx
const [period, setPeriod] = useState('week');

<SegmentedControl
  options={[
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ]}
  value={period}
  onChange={setPeriod}
/>
```

## Sizes
```tsx
<SegmentedControl options={opts} value={v} onChange={setV} size="small" />
<SegmentedControl options={opts} value={v} onChange={setV} size="medium" />
<SegmentedControl options={opts} value={v} onChange={setV} size="large" />
```

## Full Width
```tsx
<SegmentedControl
  options={[{ value: 'all', label: 'All' }, { value: 'mine', label: 'Mine' }]}
  value={filter}
  onChange={setFilter}
  fullWidth
/>
```

## Disabled
```tsx
<SegmentedControl
  options={opts}
  value={v}
  onChange={setV}
  disabled
/>
```

## Animated Selection Pill
The selected segment is highlighted by an animated white pill that slides smoothly between positions. The pill position is calculated from the DOM layout of the segment buttons and updates whenever `value` or `options` change. The first render is instant (no transition) to avoid a flash; subsequent changes animate.

## Keyboard Behavior
| Key | Effect |
|-----|--------|
| `ArrowRight` / `ArrowDown` | Select the next option (wraps around) |
| `ArrowLeft` / `ArrowUp` | Select the previous option (wraps around) |

## States
- **Unselected segment** — Secondary text color, transparent background
- **Selected segment** — Default text color, white pill behind it
- **Hovered** — No additional visual; pill motion provides sufficient affordance
- **Disabled** — Opacity reduced, pointer events disabled, cursor `not-allowed`

## Accessibility
- Container renders `role="tablist"`
- Each segment button renders `role="tab"` with `aria-selected`
- Selected button has `tabIndex={0}`; unselected buttons have `tabIndex={-1}` (roving tabindex)
- Arrow key navigation cycles through segments within the group
- The animated pill is `aria-hidden="true"`

## Do / Don't
- Do: Keep labels short — 1–2 words maximum per segment
- Do: Use `fullWidth` when the control spans the content column width
- Do: Always provide `value` and `onChange` (controlled only — no uncontrolled mode)
- Do: Use for exclusive view/mode switching, not filtering
- Don't: Use more than 5 segments — switch to `Tab` component
- Don't: Use when multiple options can be active at once — use `Chip`
- Don't: Use for form fields submitted with a button — use `Radio`
- Don't: Put icons only (no labels) — labels are required for accessibility

## Design Tokens Used
- **Colors**: `cssVarColors.surface.base.alternative`, `cssVarColors.surface.base.default`, `cssVarColors.content.base.default`, `cssVarColors.content.base.secondary`
- **Spacing**: `spacing.component.segmentedControl.height.*`, `spacing.component.segmentedControl.paddingX.*`, `spacing.component.segmentedControl.containerPadding`
- **Radius**: `radius.component.segmentedControl.container`, `radius.component.segmentedControl.segment`
- **Typography**: `typography.fontSize.compact`, `typography.fontSize.sm`, `typography.fontSize.md`, `typography.fontWeight.medium`
- **Shadow**: `cssVarShadow.primitive.xs`
- **Opacity**: `opacity.disabled`
- **Motion**: `duration.normal`, `duration.fast`, `easing.easeOut`

## Related Components
- `Chip` — Multi-select filter tags; use when more than one option can be active simultaneously
- `Tab` — Full tab navigation strip; use for more than 5 options or page-level navigation
- `Radio` / `RadioGroup` — Single-choice form field; use when value is submitted with a form
