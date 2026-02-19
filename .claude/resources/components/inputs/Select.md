# Select

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { Select } from '@baerae-zkap/design-system'` (planned)

## What It Is
A dropdown selection input for choosing one value from a list of options. Used when there are more than 5 options or when space is constrained.

## When to Use
- Use for selecting from more than 5 options (country, category, timezone)
- Use when horizontal space is limited and Radio would take too much room
- Use for form fields that require one selection from a predefined list

## When NOT to Use
- Do NOT use for 5 or fewer visible options -- use `Radio` instead
- Do NOT use for multi-select -- use `Checkbox` group instead
- Do NOT use for tab/mode switching -- use `SegmentedControl` instead
- Do NOT use native `<select>` when Select is available

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | -- | Visible label above the select |
| `value` | `string` | -- | Currently selected value |
| `onChange` | `(value: string) => void` | -- | Selection change handler |
| `options` | `Array<{ label: string; value: string }>` | -- | List of selectable options |
| `placeholder` | `string` | -- | Placeholder when no value selected |
| `error` | `string` | -- | Error message |
| `disabled` | `boolean` | `false` | Disables the select |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### Basic select
```tsx
<Select
  label="Country"
  value={country}
  onChange={setCountry}
  options={countryOptions}
  placeholder="Select a country"
/>
```

## Decision Rule
- 5 or fewer options visible at once -> use `Radio`
- More than 5 options or space-constrained -> use `Select`

## Do / Don't

- DO: Provide a meaningful placeholder ("Select a country", not "Choose")
- DON'T: Use Select for binary choices -- use `Switch` or `Checkbox` instead
- DO: Sort options logically (alphabetical, most common first, or by relevance)
- DON'T: Use native `<select>` when Select exists

## Accessibility
- Must have a visible label or aria-label
- Keyboard navigation: Arrow keys to browse options, Enter to select
