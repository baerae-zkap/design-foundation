# Slider

> A range input that lets users select a numeric value by dragging a thumb along a track.

## When to Use
- Selecting a value within a continuous numeric range (volume, brightness, price range)
- When the exact number is less important than the relative position
- Settings where the user benefits from visual feedback of the current value

## When NOT to Use
- Precise numeric entry where the user knows the exact value → Use `TextField` with `type="number"` instead
- Selecting from a small discrete set of named options → Use `Radio` or `SegmentedControl` instead
- Binary on/off → Use `Switch` instead

## Import
```tsx
import { Slider } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Controlled value |
| `defaultValue` | `number` | `min` | Initial value (uncontrolled) |
| `onChange` | `(value: number) => void` | — | Called with the numeric value on every change |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Increment between selectable values |
| `disabled` | `boolean` | `false` | Disables interaction; reduces opacity |
| `showValue` | `boolean` | `false` | Displays the current numeric value above the track |
| `aria-label` | `string` | — | Accessibility label for the range input |
| `id` | `string` | auto | Custom id; auto-generated when omitted |
| `style` | `CSSProperties` | — | Additional styles on the container element |

Forwards `ref` to the outer `<div>` container.

## Basic Usage
```tsx
<Slider aria-label="Volume" onChange={(v) => setVolume(v)} />
```

## Controlled
```tsx
const [brightness, setBrightness] = useState(50);

<Slider
  value={brightness}
  onChange={setBrightness}
  min={0}
  max={100}
  aria-label="Brightness"
/>
```

## Show Current Value
```tsx
<Slider
  value={price}
  onChange={setPrice}
  min={0}
  max={500}
  showValue
  aria-label="Max price"
/>
```

## Custom Range and Step
```tsx
// Ratings: 1–5 in whole numbers
<Slider min={1} max={5} step={1} defaultValue={3} aria-label="Rating" />

// Fine control: 0.0–1.0 in 0.1 increments
<Slider min={0} max={1} step={0.1} defaultValue={0.5} aria-label="Opacity" />
```

## Disabled
```tsx
<Slider disabled value={40} aria-label="Locked value" />
```

## States
- **Default** — Filled track (brand color) up to thumb position; remaining track in neutral fill
- **Thumb hover** — Thumb scales up slightly (1.1×)
- **Thumb focused** — Focus ring applied via semantic shadow token
- **Disabled** — Opacity reduced, cursor `not-allowed`, thumb not draggable

## Track Rendering
The filled portion is rendered as a CSS `linear-gradient` on a visual overlay layer. The native `<input type="range">` sits above it with a transparent background, ensuring correct pointer behavior across browsers. Thumb styles are applied via `::webkit-slider-thumb` and `::moz-range-thumb` pseudo-elements with class `zkap-slider`.

## Accessibility
- Renders as a native `<input type="range">` for full keyboard and screen reader support
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` set automatically from `min`, `max`, and current value
- `aria-label` is required (no visible label is rendered by the component)
- Keyboard: `ArrowLeft`/`ArrowDown` decrease value by `step`; `ArrowRight`/`ArrowUp` increase; `Home`/`End` jump to `min`/`max`

## Do / Don't
- Do: Always provide `aria-label` — the component renders no visible label text
- Do: Use `showValue` when the exact number is meaningful to the user
- Do: Set `step` to match the expected precision (e.g., `step={5}` for percentages in 5% increments)
- Don't: Use for binary choices — use `Switch`
- Don't: Use when the user needs to type a precise value — use `TextField type="number"`
- Don't: Set `min === max`; this renders a non-functional slider

## Design Tokens Used
- **Colors**: `cssVarColors.surface.brand.default`, `cssVarColors.fill.normal`, `cssVarColors.content.base.secondary`
- **Spacing**: `spacing.primitive[2]`
- **Radius**: `radius.primitive.full`
- **Typography**: `typography.fontSize.compact`, `typography.fontWeight.medium`
- **Shadow**: `cssVarShadow.primitive.sm`, `cssVarShadow.semantic.input.focus`
- **Opacity**: `opacity.disabled`
- **Motion**: `transitions.background`, `duration.fast`, `easing.easeOut`

## Related Components
- `TextField` — Use with `type="number"` when the user needs to enter a precise value
- `SegmentedControl` — Use for selecting among a small set of discrete named options
- `Switch` — Use for binary on/off; simpler than a two-position slider
