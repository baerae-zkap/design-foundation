# TextField

> A single-line text input with label, validation feedback, icon slots, and full controlled/uncontrolled support.

## When to Use

- Collecting short free-form text: name, email, phone, password, URL
- Form fields that require inline validation and error messaging
- Inputs with leading or trailing icons (search hint, password toggle, etc.)

## When NOT to Use

- Multi-line text entry — use `TextArea`
- Search with a built-in clear button — use `SearchField`
- Selecting from a list of options — use `Radio`/`RadioGroup` or `SegmentedControl`

## Import

```tsx
import { TextField } from '@baerae-zkap/design-system';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Visible label rendered above the input. Strongly recommended for accessibility. |
| `placeholder` | `string` | — | No | Placeholder text shown when the input is empty. |
| `value` | `string` | — | No | Controlled value. Use with `onChange`. |
| `defaultValue` | `string` | — | No | Initial value for uncontrolled usage. |
| `onChange` | `(value: string) => void` | — | No | Called with the string value on every keystroke (not the native event). |
| `onBlur` | `React.FocusEventHandler<HTMLInputElement>` | — | No | Native blur event handler. |
| `onFocus` | `React.FocusEventHandler<HTMLInputElement>` | — | No | Native focus event handler. |
| `type` | `string` | `'text'` | No | HTML input type: `'text'`, `'email'`, `'password'`, `'tel'`, `'url'`, `'number'`, etc. |
| `error` | `string` | — | No | Error message shown below the input. Also triggers error styling on the border and label. |
| `helperText` | `string` | — | No | Helper text shown below the input. Hidden when `error` is set. |
| `disabled` | `boolean` | `false` | No | Disables the input. Applies reduced opacity and `not-allowed` cursor. |
| `required` | `boolean` | `false` | No | Marks the field as required. Adds a red asterisk (`*`) to the label. |
| `readOnly` | `boolean` | `false` | No | Makes the input read-only. Content is selectable but not editable. |
| `leadingIcon` | `React.ReactNode` | — | No | Icon element rendered on the left inside the input container. |
| `trailingIcon` | `React.ReactNode` | — | No | Icon element rendered on the right inside the input container. |
| `maxLength` | `number` | — | No | Maximum character length enforced by the browser. |
| `autoComplete` | `string` | — | No | HTML `autocomplete` attribute (e.g., `'email'`, `'current-password'`). |
| `name` | `string` | — | No | HTML `name` attribute for form submission. |
| `id` | `string` | — | No | Input `id`. Auto-generated via `useId()` if not provided. |
| `aria-label` | `string` | — | No | Accessible label used when no visible `label` prop is provided. |
| `style` | `React.CSSProperties` | — | No | Inline styles on the outer wrapper `<div>`. |
| `className` | `string` | — | No | Additional class names on the outer wrapper `<div>`. |

`TextField` is a `React.forwardRef` component — the ref is forwarded to the native `<input>` element.

## Basic Usage

```tsx
import { useState } from 'react';
import { TextField } from '@baerae-zkap/design-system';

// Controlled
function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <TextField
      label="Name"
      placeholder="Enter your name"
      value={value}
      onChange={setValue}
    />
  );
}

// Uncontrolled
<TextField label="Name" defaultValue="Jane Doe" />
```

## Variants / Types

### Email input

```tsx
<TextField
  label="Email"
  type="email"
  placeholder="example@email.com"
  autoComplete="email"
  required
/>
```

### Password input

```tsx
<TextField
  label="Password"
  type="password"
  autoComplete="current-password"
  required
/>
```

### With leading icon

```tsx
<TextField
  label="Search"
  leadingIcon={<SearchIcon />}
  placeholder="Search..."
/>
```

### With trailing icon

```tsx
<TextField
  label="Amount"
  trailingIcon={<span style={{ color: 'var(--content-base-secondary)' }}>KRW</span>}
  type="number"
/>
```

### With helper text

```tsx
<TextField
  label="Username"
  helperText="3–20 characters. Letters, numbers, and underscores only."
  placeholder="your_username"
/>
```

### Error state

```tsx
<TextField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={emailError}  // e.g., "Please enter a valid email address"
/>
```

### Disabled

```tsx
<TextField
  label="Account ID"
  value="user-12345"
  disabled
/>
```

### Read-only

```tsx
<TextField
  label="Registered Email"
  value="jane@example.com"
  readOnly
/>
```

### Without visible label (icon button context)

```tsx
<TextField
  aria-label="Search products"
  placeholder="Search..."
  leadingIcon={<SearchIcon />}
/>
```

## States

| State | Trigger | Visual |
|-------|---------|--------|
| **Default** | Initial render | `border.base.default` border |
| **Hovered** | Mouse over | `border.secondary.default` border |
| **Focused** | Input has focus | `border.brand.default` border + blue focus ring (box-shadow) |
| **Error** | `error` prop set | `border.error.default` border, error-colored label and helper text |
| **Disabled** | `disabled={true}` | Alternative background, 0.5 opacity, `not-allowed` cursor |
| **Read-only** | `readOnly={true}` | Default cursor, non-editable, same visual as default |
| **Filled** | Has a value | No special visual — placeholder disappears |

## Accessibility

- The `<label>` is always wired to the `<input>` via matching `htmlFor`/`id` (auto-generated with `useId()` if not provided).
- When `required={true}`, a red asterisk is added with `aria-hidden="true"` — the required state is also set on the native `<input required>`.
- When `error` is set, the input receives `aria-invalid="true"` and `aria-describedby` pointing to the error element.
- When `helperText` is set (without error), `aria-describedby` points to the helper element.
- When no visible `label` is provided, pass `aria-label` to ensure screen reader accessibility.
- Focus ring uses a `box-shadow` approach so it appears inside the component boundary without layout shift.

## Do / Don't

**Do** always provide a `label` prop. If a visible label is not possible for design reasons, use `aria-label`.

**Don't** validate on every keystroke — validate on blur (`onBlur`) or on form submit to avoid aggressive error states.

**Do** use the `error` prop for inline validation messages. The text is automatically styled and associated with the input.

**Don't** stack the error message outside the component manually — the `error` prop handles positioning and color.

**Do** use `type="email"` and `autoComplete="email"` for email fields to trigger mobile keyboard optimizations and browser autofill.

**Don't** use `TextField` for multi-line input — use `TextArea` instead.

**Do** use `required` to mark mandatory fields. This adds both the visual asterisk and the native `required` attribute.

**Don't** rely on `maxLength` alone for validation — always validate in your submission handler as well.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.border.base.default` | Default border color |
| `cssVarColors.border.secondary.default` | Hovered border color |
| `cssVarColors.border.brand.default` | Focused border color |
| `cssVarColors.border.error.default` | Error border color |
| `cssVarColors.surface.base.default` | Input background |
| `cssVarColors.surface.base.alternative` | Disabled input background |
| `cssVarColors.surface.brand.secondary` | Focus ring color (box-shadow) |
| `cssVarColors.content.base.default` | Input text color |
| `cssVarColors.content.base.secondary` | Label (default), icon, and helper text color |
| `cssVarColors.content.brand.default` | Label color when focused |
| `cssVarColors.content.error.default` | Label and helper text color in error state |
| `cssVarColors.content.disabled.default` | Label color when disabled |
| `radius.component.input.default` | Input container border radius |
| `borderWidth.medium` | Border thickness |
| `opacity.disabled` | Opacity for disabled state |
| `transitions.all` | Smooth border/color transitions |
| `typography.fontSize.md` | Input text size |
| `typography.fontSize.compact` | Label and helper text size |
| `typography.fontWeight.medium` | Label weight |
| `spacing.primitive[3]`, `spacing.primitive[4]` | Input padding |

## Related Components

- `TextArea` — multi-line text input
- `SearchField` — single-line search input with built-in clear button
