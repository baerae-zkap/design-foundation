# TextField

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { TextField } from '@baerae-zkap/design-system'` (planned)

## What It Is
A single-line text input with label, placeholder, helper text, and inline error message support. The primary input component for forms.

## When to Use
- Use for single-line text entry (name, email, phone, password, URL)
- Use for any form field that requires typed text input
- Use with `type` prop for specialized inputs (email, password, tel, url, number)

## When NOT to Use
- Do NOT use for multi-line text -- use `TextArea` instead
- Do NOT use for search with clear button -- use `SearchField` instead
- Do NOT use for dropdown selection -- use `Select` instead
- Do NOT use native `<input>` when TextField is available

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | -- | Visible label above the input |
| `placeholder` | `string` | -- | Placeholder text when empty |
| `value` | `string` | -- | Controlled input value |
| `onChange` | `(value: string) => void` | -- | Value change handler |
| `type` | `string` | `"text"` | Input type (text, email, password, tel, url, number) |
| `error` | `string` | -- | Error message. When set, input shows error styling |
| `helperText` | `string` | -- | Helper text below the input |
| `disabled` | `boolean` | `false` | Disables the input |
| `required` | `boolean` | `false` | Marks the field as required |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### Basic form field
```tsx
<TextField label="Name" value={name} onChange={setName} placeholder="Enter your name" />
```

### With validation error
```tsx
<TextField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={emailError}
  placeholder="example@email.com"
/>
```

### Password field
```tsx
<TextField
  label="Password"
  type="password"
  value={password}
  onChange={setPassword}
/>
```

## Do / Don't

- DO: Always provide a visible `label` or `aria-label`
- DON'T: Show error state before the user has interacted with the field
- DO: Validate on blur (field-level) and on submit (form-level)
- DON'T: Use native `<input>` when TextField exists

## Accessibility
- Must have a visible label or aria-label
- Error messages should be linked to the input via aria-describedby
- Disabled state should set aria-disabled
