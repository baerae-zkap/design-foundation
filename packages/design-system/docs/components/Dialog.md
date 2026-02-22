# Dialog

> A blocking modal dialog that interrupts the user to request confirmation or communicate critical information before an irreversible action proceeds.

## When to Use

- Confirm a destructive or irreversible action (delete, remove, unsubscribe, logout).
- Present a short, critical message that requires explicit acknowledgment before the user can continue.
- Force a deliberate choice between two clearly labeled options.

## When NOT to Use

- For non-critical notifications or transient feedback — use `Snackbar` or `Toast` instead.
- For inline contextual status within page content — use `SectionMessage`.
- For complex forms or multi-step flows — use a `BottomSheet` or a dedicated page/route.
- When the user does not need to take action immediately — prefer a `SectionMessage` or a dismissible banner.

## Import

```tsx
import { Dialog } from '@baerae-zkap/design-system';
import type { DialogAction } from '@baerae-zkap/design-system';
```

## Props

### Dialog

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Controls whether the dialog is visible. |
| `onClose` | `() => void` | **required** | Callback fired when the dialog should close (backdrop click if enabled, or programmatically). |
| `title` | `ReactNode` | — | Optional heading. When omitted, `aria-label` must be provided for accessibility. |
| `description` | `ReactNode` | — | Supporting body text below the title. |
| `actions` | `DialogAction[]` | **required** | 1–2 action button definitions. The last action is styled as the primary (filled) by default. |
| `closeOnDimmerClick` | `boolean` | `false` | When true, clicking the backdrop calls `onClose`. Default is false — dialogs require deliberate action. |
| `aria-label` | `string` | — | Accessible label for the dialog when `title` is not provided. |

### DialogAction

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | **required** | Button label text. |
| `onClick` | `() => void` | **required** | Handler called when the button is clicked. |
| `color` | `ButtonColor` | Auto | Button color. Defaults to `neutral` for all but the last action, `primary` for the last. |
| `variant` | `'filled' \| 'weak'` | Auto | Button variant. Defaults to `weak` for all but the last action, `filled` for the last. |

## Basic Usage

```tsx
import { useState } from 'react';
import { Dialog } from '@baerae-zkap/design-system';

function DeleteConfirm() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="error" buttonType="weak" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this item?"
        description="This action cannot be undone. The item will be permanently removed."
        actions={[
          { label: 'Cancel', onClick: () => setOpen(false), color: 'neutral', variant: 'weak' },
          { label: 'Delete', onClick: handleDelete, color: 'error', variant: 'filled' },
        ]}
      />
    </>
  );
}
```

## Examples

### Single Action (Acknowledgment)

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Session Expired"
  description="Your session has expired. Please log in again to continue."
  actions={[
    { label: 'Log In Again', onClick: redirectToLogin, color: 'primary', variant: 'filled' },
  ]}
/>
```

### No Title (aria-label required)

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  aria-label="Confirm logout"
  description="Are you sure you want to log out of your account?"
  actions={[
    { label: 'Cancel', onClick: () => setOpen(false) },
    { label: 'Log Out', onClick: handleLogout, color: 'error' },
  ]}
/>
```

### Backdrop Dismissible

```tsx
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  closeOnDimmerClick
  title="Terms Updated"
  description="We've updated our terms of service. Review the changes."
  actions={[
    { label: 'Review Terms', onClick: openTerms },
    { label: 'Accept', onClick: acceptTerms, color: 'primary' },
  ]}
/>
```

## Behavior

- Rendered via `createPortal` into `document.body` — always on top of page content.
- Body scroll is locked (`overflow: hidden`) while the dialog is open.
- Enter/exit animations: backdrop fades in/out, container slides up/down 28px over `duration.fast`.
- `closeOnDimmerClick` defaults to `false` because critical alerts require deliberate user intent.
- Action buttons are rendered full-width (`layout="fillWidth"`) inside the dialog.
- The last action in the `actions` array is treated as the primary action by default (filled + primary color).

## States

| State | Behavior |
|-------|----------|
| Closed | Component returns `null` — not in the DOM. |
| Opening | Enter animation: backdrop fades in, container slides up. |
| Open | Fully visible, body scroll locked, focus trapped inside. |
| Closing | Exit animation plays, then component unmounts after `duration.fast`. |

## Accessibility

- The dialog container has `role="alertdialog"` and `aria-modal="true"`.
- When `title` is provided, the title element is linked via `aria-labelledby`.
- When `title` is omitted, the `aria-label` prop is required and applied directly.
- When `description` is provided, it is linked via `aria-describedby`.
- The dialog container has `tabIndex={-1}` to receive initial focus.
- Clicking outside the dialog only closes it when `closeOnDimmerClick={true}`.
- Escape key handling is not built in — implement in the parent if needed via `onKeyDown` on the backdrop.

## Do / Don't

**Do** keep dialog content short and decisive. The user should be able to read and act within seconds.

**Do** label buttons clearly with the action verb, not "Yes" / "No". Prefer "Delete" / "Cancel" over "OK" / "Cancel".

**Do** use `color="error"` for the primary action when the dialog is for a destructive action.

**Don't** put forms, multiple fields, or lengthy content inside a Dialog. Use a `BottomSheet` or a dedicated page.

**Don't** open a Dialog from another Dialog. Collapse the flow into a single confirmation step.

**Don't** set `closeOnDimmerClick={true}` for critical destructive confirmations — require an explicit button press.

**Don't** use a Dialog for transient success/failure feedback — use `Snackbar` or `Toast`.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.overlay.dim` | Backdrop dim overlay color |
| `cssVarColors.surface.base.default` | Dialog container background |
| `cssVarColors.content.base.default` | Title text color |
| `cssVarColors.content.base.secondary` | Description text color |
| `cssVarShadow.semantic.modal.default` | Container box shadow |
| `radius.primitive['2xl']` | Container border radius |
| `spacing.primitive[2]` | Action gap |
| `spacing.primitive[5]` | Backdrop horizontal padding |
| `spacing.primitive[6]` | Container padding |
| `typography.fontSize.lg` | Title font size |
| `typography.fontWeight.bold` | Title font weight |
| `typography.fontSize.sm` | Description font size |
| `zIndex.modal` | Stacking layer |
| `duration.fast` | Animation duration |
| `easing.easeOut` / `easing.easeInOut` | Animation easing |

## Related Components

- **Snackbar** — For brief auto-dismissing notifications that don't require user input.
- **Toast** — For richer transient notifications with heading and body text.
- **SectionMessage** — For persistent inline status banners within page content.
- **BottomSheet** — For longer content or multi-step flows that need modal containment.
- **ActionArea** — For button groups at the bottom of sheets, pages, or modals.
