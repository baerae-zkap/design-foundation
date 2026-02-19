# Checkbox

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { Checkbox } from '@baerae-zkap/design-system'` (planned)

## What It Is
A multi-select toggle control for selecting zero or more options from a group. Used in forms where the value is submitted together with other fields.

## When to Use
- Use for multi-select options in forms (select interests, agree to terms)
- Use when the selection is part of a form submission (not an immediate effect)
- Use for "agree to terms" or opt-in checkboxes

## When NOT to Use
- Do NOT use for immediate on/off toggles -- use `Switch` instead
- Do NOT use for single-select from a group -- use `Radio` instead
- Do NOT use native `<input type="checkbox">` when Checkbox exists

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `onChange` | `(checked: boolean) => void` | -- | Change handler |
| `label` | `string` | -- | Label text next to the checkbox |
| `disabled` | `boolean` | `false` | Disables the checkbox |
| `indeterminate` | `boolean` | `false` | Shows indeterminate (dash) state for partial selection |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### Form checkbox group
```tsx
<fieldset>
  <legend>Interests</legend>
  {options.map(opt => (
    <Checkbox
      key={opt.value}
      label={opt.label}
      checked={selected.includes(opt.value)}
      onChange={(checked) => toggleOption(opt.value, checked)}
    />
  ))}
</fieldset>
```

### Terms agreement
```tsx
<Checkbox
  label="I agree to the Terms of Service"
  checked={agreed}
  onChange={setAgreed}
/>
```

## Decision Rule
- Value submitted with a form -> use `Checkbox`
- Immediate effect on toggle -> use `Switch`

## Do / Don't

- DO: Group related checkboxes under a visible label or fieldset
- DON'T: Use a single checkbox for binary settings that take immediate effect -- use Switch
- DO: Provide clear, concise label text
- DON'T: Use native `<input type="checkbox">` when Checkbox exists

## Accessibility
- Must have a visible label
- Supports indeterminate state for "select all" patterns
- Keyboard: Space to toggle
