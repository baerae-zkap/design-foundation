# Radio

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { Radio } from '@baerae-zkap/design-system'` (planned)

## What It Is
A single-select control for choosing exactly one option from a visible group. Displays all options at once, making the available choices immediately visible.

## When to Use
- Use for single-select from 5 or fewer visible options
- Use when all options should be visible without interaction (no dropdown)
- Use in forms where one choice must be made from a small set

## When NOT to Use
- Do NOT use for more than 5 options -- use `Select` instead
- Do NOT use for multi-select -- use `Checkbox` group instead
- Do NOT use for tab/mode switching -- use `SegmentedControl` instead
- Do NOT use native `<input type="radio">` when Radio exists

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | -- | Currently selected value |
| `onChange` | `(value: string) => void` | -- | Selection change handler |
| `options` | `Array<{ label: string; value: string }>` | -- | List of radio options |
| `label` | `string` | -- | Group label |
| `disabled` | `boolean` | `false` | Disables all options |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Layout direction |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### Vertical radio group
```tsx
<Radio
  label="Payment Method"
  value={paymentMethod}
  onChange={setPaymentMethod}
  options={[
    { label: 'Credit Card', value: 'card' },
    { label: 'Bank Transfer', value: 'bank' },
    { label: 'Mobile Pay', value: 'mobile' },
  ]}
/>
```

## Decision Rule
- 5 or fewer options -> use `Radio`
- More than 5 options -> use `Select`

## Do / Don't

- DO: Always provide a group label
- DON'T: Use Radio for more than 5 options -- use Select
- DO: Pre-select a default option when there is a sensible default
- DON'T: Use native `<input type="radio">` when Radio exists

## Accessibility
- Group must have a label (fieldset + legend or aria-labelledby)
- Keyboard: Arrow keys to navigate between options, Space to select
