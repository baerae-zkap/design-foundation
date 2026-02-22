# Checkbox

> A form control for toggling one or more independent boolean options. Values are submitted with the form.

## When to Use
- Selecting multiple independent items from a list (feature flags, permissions, preferences)
- Accepting terms and conditions
- Bulk-select patterns with an indeterminate parent state
- When the value will be submitted as part of a form (not applied immediately)

## When NOT to Use
- A single on/off setting that takes immediate effect → Use `Switch` instead
- Selecting one option from a mutually exclusive group → Use `Radio` / `RadioGroup` instead
- Filter/tag selection → Use `Chip` instead

**Tie-breaker — Switch vs Checkbox:** Use `Switch` when toggling has an immediate effect (e.g., enabling dark mode on the spot). Use `Checkbox` when the value is collected and submitted later (e.g., agreeing to terms before hitting Submit).

## Import
```tsx
import { Checkbox } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | — | Called with the new boolean value on change |
| `label` | `ReactNode` | — | Label rendered to the right of the control |
| `description` | `ReactNode` | — | Secondary text rendered below the label |
| `size` | `'small' \| 'medium'` | `'medium'` | Control size — 20px (small) or 24px (medium) |
| `disabled` | `boolean` | `false` | Disables interaction; reduces opacity |
| `invalid` | `boolean` | `false` | Shows an error border when unchecked |
| `indeterminate` | `boolean` | `false` | Mixed state for parent-selects-all patterns |
| `indeterminateIcon` | `ReactNode` | — | Custom icon shown in the indeterminate state |
| `aria-label` | `string` | — | Accessibility label; required when `label` is not provided |
| `id` | `string` | auto | Custom id; auto-generated when omitted |

Forwards `ref` to the outer `<label>` element.

## Basic Usage
```tsx
<Checkbox label="I agree to the terms and conditions" />
```

## Controlled
```tsx
const [accepted, setAccepted] = useState(false);

<Checkbox
  checked={accepted}
  onChange={setAccepted}
  label="Accept terms"
/>
```

## Sizes
```tsx
<Checkbox size="small" label="Small" />
<Checkbox size="medium" label="Medium" />
```

## With Description
```tsx
<Checkbox
  label="Marketing emails"
  description="Receive product updates and promotional offers."
/>
```

## Validation Error
```tsx
<Checkbox
  invalid={!accepted}
  label="You must accept the terms"
/>
```

## Indeterminate (Select All)
```tsx
// Parent checkbox reflects partial selection
<Checkbox
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
  onChange={toggleAll}
  label="Select all"
/>
// Child checkboxes
{items.map((item) => (
  <Checkbox
    key={item.id}
    checked={selected.includes(item.id)}
    onChange={(v) => toggle(item.id, v)}
    label={item.name}
  />
))}
```

## Disabled
```tsx
<Checkbox disabled label="Unavailable option" />
<Checkbox disabled checked label="Locked selection" />
```

## States
- **Unchecked** — Empty box with border
- **Checked** — Brand-colored fill, white checkmark
- **Indeterminate** — Brand-colored fill, dash icon (sets `aria-checked="mixed"`)
- **Hovered** — Box background shifts to pressed token
- **Pressed** — Subtle scale(0.97) on the control
- **Disabled** — Opacity reduced, cursor `not-allowed`
- **Invalid** — Error-colored border when unchecked

## Accessibility
- Hidden native `<input type="checkbox">` drives all keyboard and screen reader behavior
- `aria-checked="mixed"` set automatically when `indeterminate={true}`
- `aria-invalid` set when `invalid={true}`
- `indeterminate` DOM property applied directly to the hidden input element
- `aria-label` required when no `label` prop is provided

## Do / Don't
- Do: Use `Checkbox` for form values collected before submission
- Do: Use the `indeterminate` prop (not CSS hacks) for parent-select patterns
- Do: Provide `aria-label` when rendering without a visible label
- Do: Show `invalid` state on required checkboxes that are left unchecked on submit
- Don't: Use `Checkbox` for immediate-effect toggles — use `Switch`
- Don't: Use for single selection from a group — use `Radio`
- Don't: Apply the `indeterminate` prop without also managing `checked` for the parent row

## Design Tokens Used
- **Colors**: `cssVarColors.surface.brand.default`, `cssVarColors.surface.base.*`, `cssVarColors.border.base.default`, `cssVarColors.border.error.default`, `cssVarColors.content.base.*`, `cssVarColors.inverse.content.default`
- **Spacing**: `spacing.primitive[1]`, `spacing.primitive[2]`
- **Radius**: `radius.component.segmentedControl.segment`
- **Typography**: `typography.fontSize.md`, `typography.fontSize.sm`, `typography.fontWeight.regular`
- **Border**: `borderWidth.medium`
- **Opacity**: `opacity.disabled`

## Related Components
- `Switch` — Immediate-effect binary toggle; prefer over Checkbox when the action takes effect on toggle
- `Radio` / `RadioGroup` — Single selection from a mutually exclusive group
- `Chip` — Multi-select filter tags; prefer when options are displayed as tags rather than a list
- `CheckMark` — Icon-only check indicator with no box; use in read-only or table contexts
