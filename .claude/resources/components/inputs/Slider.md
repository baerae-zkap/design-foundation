# Slider

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { Slider } from '@baerae-zkap/design-system'` (planned)

## What It Is
A range value selector for choosing a numeric value within a defined range by dragging a thumb along a track.

## When to Use
- Use for selecting a numeric value within a range (volume, brightness, price range)
- Use when the exact number matters less than the relative position
- Use for continuous value selection (not discrete steps)

## When NOT to Use
- Do NOT use for precise numeric input -- use `TextField type="number"` instead
- Do NOT use for selecting from a list of options -- use `Select` or `Radio`
- Do NOT use for on/off toggles -- use `Switch`

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | -- | Current value |
| `onChange` | `(value: number) => void` | -- | Value change handler |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `disabled` | `boolean` | `false` | Disables the slider |
| `label` | `string` | -- | Accessible label |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### Volume control
```tsx
<Slider
  label="Volume"
  value={volume}
  onChange={setVolume}
  min={0}
  max={100}
/>
```

### Price range filter
```tsx
<Slider
  label="Max Price"
  value={maxPrice}
  onChange={setMaxPrice}
  min={0}
  max={1000}
  step={10}
/>
```

## Do / Don't

- DO: Show the current value alongside the slider
- DON'T: Use Slider when exact numeric precision is needed
- DO: Use appropriate step values for the data type
- DON'T: Use Slider for binary choices -- use Switch

## Accessibility
- Must have a label (visible or aria-label)
- Keyboard: Arrow keys to increment/decrement value
- Touch: drag thumb along track
