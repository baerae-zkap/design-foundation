# TextArea

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { TextArea } from '@baerae-zkap/design-system'` (planned)

## What It Is
A multi-line text input for longer content like descriptions, comments, and messages. Supports label, placeholder, character count, and error state.

## When to Use
- Use for multi-line text entry (bio, description, comments, feedback, notes)
- Use when the expected input is more than one line

## When NOT to Use
- Do NOT use for single-line inputs -- use `TextField` instead
- Do NOT use native `<textarea>` when TextArea is available

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | -- | Visible label above the textarea |
| `placeholder` | `string` | -- | Placeholder text |
| `value` | `string` | -- | Controlled value |
| `onChange` | `(value: string) => void` | -- | Value change handler |
| `rows` | `number` | -- | Visible row count (height) |
| `maxLength` | `number` | -- | Maximum character count |
| `error` | `string` | -- | Error message |
| `helperText` | `string` | -- | Helper text below the textarea |
| `disabled` | `boolean` | `false` | Disables the textarea |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### Basic textarea
```tsx
<TextArea
  label="Description"
  value={description}
  onChange={setDescription}
  placeholder="Enter a description..."
  rows={4}
/>
```

### With character limit
```tsx
<TextArea
  label="Bio"
  value={bio}
  onChange={setBio}
  maxLength={200}
  helperText={`${bio.length}/200`}
/>
```

## Do / Don't

- DO: Set a reasonable `rows` value for the expected content length
- DON'T: Use TextArea for single-line inputs (name, email)
- DO: Provide `maxLength` when there is a backend character limit
- DON'T: Use native `<textarea>` when TextArea exists

## Accessibility
- Must have a visible label or aria-label
- Character count should be accessible to screen readers
