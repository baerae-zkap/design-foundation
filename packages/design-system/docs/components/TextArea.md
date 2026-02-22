# TextArea

> A multi-line text input with label, validation feedback, character count, and full controlled/uncontrolled support.

## When to Use

- Collecting longer free-form text: bio, description, comment, feedback, notes
- Fields where the user is expected to write more than one sentence
- When you want to show a character count limit to the user

## When NOT to Use

- Single-line inputs (name, email, phone) — use `TextField`
- Search input with clear button — use `SearchField`
- Selecting from a list of options — use `Radio`/`RadioGroup` or `SegmentedControl`

## Import

```tsx
import { TextArea } from '@baerae-zkap/design-system';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `label` | `string` | — | No | Visible label rendered above the textarea. Strongly recommended for accessibility. |
| `placeholder` | `string` | — | No | Placeholder text shown when the textarea is empty. |
| `value` | `string` | — | No | Controlled value. Use with `onChange`. |
| `defaultValue` | `string` | — | No | Initial value for uncontrolled usage. |
| `onChange` | `(value: string) => void` | — | No | Called with the string value on every keystroke (not the native event). |
| `onBlur` | `React.FocusEventHandler<HTMLTextAreaElement>` | — | No | Native blur event handler. |
| `error` | `string` | — | No | Error message shown below the textarea. Also triggers error border and alert role. |
| `helperText` | `string` | — | No | Helper text shown below the textarea. Hidden when `error` is set. |
| `disabled` | `boolean` | `false` | No | Disables the textarea. Applies reduced opacity and `not-allowed` cursor. |
| `required` | `boolean` | `false` | No | Marks the field as required. Adds a red asterisk (`*`) to the label. |
| `maxLength` | `number` | — | No | Maximum character count enforced by the browser. Required for `showCount` to work. |
| `showCount` | `boolean` | `false` | No | Shows a `current/max` character counter below the textarea. Requires `maxLength`. |
| `rows` | `number` | `4` | No | Number of visible text rows (controls initial height). |
| `resize` | `'none' \| 'vertical' \| 'both'` | `'vertical'` | No | Controls user resize behavior. |
| `aria-label` | `string` | — | No | Accessible label used when no visible `label` prop is provided. |
| `id` | `string` | — | No | Textarea `id`. Auto-generated via `useId()` if not provided. |
| `name` | `string` | — | No | HTML `name` attribute for form submission. |
| `style` | `React.CSSProperties` | — | No | Inline styles on the outer wrapper `<div>`. |

`TextArea` is a `React.forwardRef` component — the ref is forwarded to the native `<textarea>` element.

## Basic Usage

```tsx
import { useState } from 'react';
import { TextArea } from '@baerae-zkap/design-system';

// Controlled
function ControlledExample() {
  const [value, setValue] = useState('');

  return (
    <TextArea
      label="Description"
      placeholder="Tell us about yourself..."
      value={value}
      onChange={setValue}
    />
  );
}

// Uncontrolled
<TextArea label="Notes" defaultValue="Initial content here." />
```

## Variants / Examples

### With helper text

```tsx
<TextArea
  label="Bio"
  helperText="Write a short introduction. This will appear on your public profile."
  placeholder="Tell us about yourself..."
  rows={4}
/>
```

### With character count

```tsx
<TextArea
  label="Product description"
  maxLength={500}
  showCount
  placeholder="Describe your product..."
/>
```

### Error state

```tsx
<TextArea
  label="Feedback"
  value={feedback}
  onChange={setFeedback}
  error={feedbackError}  // e.g., "Feedback must be at least 10 characters"
/>
```

### Disabled

```tsx
<TextArea
  label="Admin Notes"
  value="This field is locked for editing."
  disabled
/>
```

### No resize

```tsx
<TextArea
  label="Comment"
  resize="none"
  rows={3}
/>
```

### Taller textarea

```tsx
<TextArea
  label="Cover Letter"
  rows={10}
  maxLength={2000}
  showCount
/>
```

### Without visible label

```tsx
<TextArea
  aria-label="Reply message"
  placeholder="Write a reply..."
  rows={3}
/>
```

## States

| State | Trigger | Visual |
|-------|---------|--------|
| **Default** | Initial render | `border.base.default` border |
| **Hovered** | Mouse over | `border.secondary.default` border |
| **Focused** | Textarea has focus | `border.brand.default` border |
| **Error** | `error` prop set | `border.error.default` border, error-colored helper text, `role="alert"` on message |
| **Disabled** | `disabled={true}` | Alternative background, 0.5 opacity, `not-allowed` cursor |
| **With count** | `showCount` + `maxLength` set | `current/max` counter appears bottom-right |

## Accessibility

- The `<label>` is always wired to the `<textarea>` via matching `htmlFor`/`id` (auto-generated with `useId()` if not provided).
- When `required={true}`, a red asterisk is added with `aria-hidden="true"` and the native `required` attribute is set on the textarea.
- When `error` is set, the textarea receives `aria-invalid="true"` and `aria-describedby` pointing to the error element. The error element has `role="alert"` for immediate announcement.
- When `helperText` is set (without error), `aria-describedby` points to the helper element.
- The character count element uses `aria-live="polite"` so count changes are announced to screen readers without interruption.
- When no visible `label` is provided, pass `aria-label` to ensure screen reader accessibility.

## Do / Don't

**Do** always provide a `label` prop. If a visible label is not possible, use `aria-label`.

**Don't** validate on every keystroke — validate on blur (`onBlur`) or on form submit to avoid aggressive error states while the user is still typing.

**Do** use `maxLength` with `showCount` together when there is a hard character limit. This gives users real-time feedback.

**Don't** use `TextArea` for single-line inputs — use `TextField` instead.

**Do** set `rows` to reflect the expected content length. Use `rows={3}` for short comments, `rows={6}` or more for longer content.

**Don't** set `resize="none"` unless the layout strictly requires it — allowing vertical resize is better for accessibility and usability.

**Do** use the `error` prop for inline validation messages. The error element automatically gets `role="alert"` for immediate screen reader announcement.

**Don't** stack error messages outside the component manually — the `error` prop handles all error presentation.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.border.base.default` | Default border color |
| `cssVarColors.border.secondary.default` | Hovered border color |
| `cssVarColors.border.brand.default` | Focused border color |
| `cssVarColors.border.error.default` | Error border color |
| `cssVarColors.surface.base.default` | Textarea background |
| `cssVarColors.surface.base.alternative` | Disabled textarea background |
| `cssVarColors.content.base.default` | Input text color |
| `cssVarColors.content.base.secondary` | Helper text and char count color |
| `cssVarColors.content.error.default` | Error message color |
| `cssVarColors.content.disabled.default` | Label color when disabled |
| `radius.component.input.default` | Textarea container border radius |
| `borderWidth.medium` | Border thickness |
| `opacity.disabled` | Opacity for disabled state |
| `transitions.all` | Smooth border/color transitions |
| `typography.fontSize.md` | Textarea text size |
| `typography.fontSize.compact` | Label, helper text, and char count size |
| `typography.fontWeight.medium` | Label weight |
| `spacing.primitive[3]`, `spacing.primitive[4]` | Internal padding |

## Related Components

- `TextField` — single-line text input
- `SearchField` — single-line search input with built-in clear button
