# UX Consistency Patterns

## Button States

Every button must handle:
- **Default**: Normal interactive state
- **Disabled**: `disabled` prop. Opacity drops to 0.5, cursor becomes not-allowed. Use when preconditions aren't met.
- **Loading**: `isLoading` prop (Button). Shows spinner, prevents double-submit. Use during async operations.

```tsx
<Button
  buttonType="filled"
  color="primary"
  onClick={onSubmit}
  disabled={!isValid}
  isLoading={isSubmitting}
>
  Save
</Button>
```

## Form Validation

- Show errors inline, below the input field. Use TextField's `error` prop.
- Validate on blur (field-level) and on submit (form-level).
- Don't show errors before the user has interacted with the field.
- Keep the submit button visible but disabled until required fields are filled.

```tsx
<TextField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={emailError}  // String message shown below input, or undefined
  placeholder="example@email.com"
/>
```

## Destructive Action Confirmation

Any destructive action (delete, remove, logout, leave) must have a confirmation step:

1. **Option A -- Dialog**: Show a confirmation dialog with clear messaging.
2. **Option B -- Inline**: Replace the button with "Are you sure?" + Confirm/Cancel.

The confirm button should use `color="error"`. The cancel button should use `color="neutral"`.

```tsx
// Dialog pattern
<Button buttonType="weak" color="error" onClick={() => setShowConfirm(true)}>
  Delete Account
</Button>
// In dialog:
<Button buttonType="weak" color="neutral" onClick={onCancel}>Cancel</Button>
<Button buttonType="filled" color="error" onClick={onConfirmDelete}>Delete</Button>
```

## Empty States

Every list, table, and data section must handle the empty case:
- **Empty list**: Show centered message + optional CTA ("Add your first item")
- **Empty search results**: "No results found" + suggestion to adjust filters
- **Error state**: "Something went wrong" + retry button

Never show a blank white area. Always communicate why there's no content.

## Error States

Every data-fetching section must handle errors:
- Show a clear error message (not a stack trace).
- Provide a retry action.
- Don't break the rest of the page -- contain the error to its section.

```tsx
// Error state pattern
<div style={{ textAlign: 'center', padding: 40 }}>
  <p style={{ ...typography.semantic.body.md, color: 'var(--content-base-secondary)' }}>
    Failed to load data.
  </p>
  <Button buttonType="weak" color="primary" onClick={onRetry}>Retry</Button>
</div>
```

## Feedback

- **Button press**: Visual press state is built into components (handled by `usePressable`).
- **Form submission**: Show loading on submit button. On success, navigate or show success message.
- **Destructive action**: After deletion, remove the item from the list immediately (optimistic UI) or show loading then remove.
- **Toggle/switch**: Immediate visual change. If async, revert on failure.

## Accessibility

- Use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<form>`).
- Every `IconButton` must have an `aria-label` describing the action.
- All form inputs must have a visible `label` prop or `aria-label`.
- Interactive elements must be keyboard-navigable (Tab to focus, Enter/Space to activate).
- Color must not be the only indicator of state -- add text or icons alongside color changes.
- Minimum touch target: 44px (`spacing.semantic.minTouchTarget`).

## Language Consistency

Use consistent terminology across the UI. Pick one term and use it everywhere:
- "Save" for persisting changes (not "Submit", "Done", "OK" mixed together)
- "Cancel" for discarding (not "Back", "Close", "Dismiss" interchangeably)
- "Delete" for permanent removal (not "Remove", "Erase", "Clear" mixed)

If the product is Korean-language, use consistent Korean terms throughout.
