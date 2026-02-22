# CheckMark

> Status: stable
> Import: `import { CheckMark } from '@baerae-zkap/design-system'`

## What It Is
A standalone check icon indicator (no box or circle container) that functions as a checkbox-like control. Displays a checkmark stroke icon that changes color based on checked state. Supports label and description text alongside the icon.

## When to Use
- Simple check/uncheck selection in lists where a full Checkbox is too heavy
- Agreement or acknowledgment indicators
- Lightweight inline toggle for settings or preferences

## When NOT to Use
- Standard form checkboxes -- use `Checkbox` instead (has box container, indeterminate state)
- Multi-select filter tags -- use `Chip` instead
- Binary on/off toggles with immediate effect -- use `Switch` instead

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | -- | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | -- | Change callback |
| `label` | `ReactNode` | -- | Label text next to the check icon |
| `description` | `ReactNode` | -- | Description text below label |
| `size` | `'small' \| 'medium'` | `'medium'` | Icon size |
| `disabled` | `boolean` | `false` | Disabled state |
| `invalid` | `boolean` | `false` | Validation error state (changes icon color to error) |
| `aria-label` | `string` | -- | Accessibility label (required when no `label` prop) |
| `id` | `string` | auto-generated | Custom input id |

## Common Patterns

### Basic CheckMark
```tsx
<CheckMark label="I agree to the terms" />
```

### Controlled
```tsx
const [agreed, setAgreed] = useState(false);

<CheckMark
  checked={agreed}
  onChange={setAgreed}
  label="Accept privacy policy"
/>
```

### With Description
```tsx
<CheckMark
  label="Marketing emails"
  description="Receive promotional updates and offers"
/>
```

### Invalid State
```tsx
<CheckMark
  label="Required agreement"
  invalid={!agreed}
  checked={agreed}
  onChange={setAgreed}
/>
```

### Small Size
```tsx
<CheckMark size="small" label="Compact option" />
```

## Design Rules
- The check icon is a standalone stroke (no box/circle background) -- this differentiates it from `Checkbox`
- Checked state colors the icon with brand color; unchecked uses secondary color
- Invalid state colors the icon with error color (overridden when checked)
- Hover reduces opacity to 0.8; press reduces to 0.6
- Disabled state applies `opacity.disabled` and `cursor: not-allowed`
- Label uses `fontSize.md` with `fontWeight.regular`
- Description uses `fontSize.sm` with secondary text color
- Gap between icon and label/description: `spacing.primitive[2]` (8px)

## Accessibility
- Uses a hidden native `<input type="checkbox">` for screen reader and form compatibility
- `aria-label` is applied to the hidden input when no visible label is present
- `aria-invalid` is set when `invalid` is true
- Label wraps the entire component as a `<label>` element for click-to-toggle
- Keyboard: Space toggles via native checkbox behavior
- Check icon is `aria-hidden="true"`

## Token Usage

| Property | Token |
|----------|-------|
| Icon color (checked) | `cssVarColors.content.brand.default` |
| Icon color (unchecked) | `cssVarColors.content.base.secondary` |
| Icon color (invalid) | `cssVarColors.content.error.default` |
| Label color | `cssVarColors.content.base.default` |
| Description color | `cssVarColors.content.base.secondary` |
| Label font size | `typography.fontSize.md` |
| Label font weight | `typography.fontWeight.regular` |
| Description font size | `typography.fontSize.sm` |
| Description font weight | `typography.fontWeight.regular` |
| Disabled opacity | `opacity.disabled` |
| Icon-to-label gap | `spacing.primitive[2]` (8px) |
| Label-to-description gap | `spacing.primitive[1]` (4px) |
| Transition | `transitions.all` |

### Icon Sizes

| Size | Width | Height |
|------|-------|--------|
| `small` | 14px | 11px |
| `medium` | 18px | 14px |
