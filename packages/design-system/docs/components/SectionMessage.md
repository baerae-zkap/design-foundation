# SectionMessage

> An inline banner component for communicating contextual status — information, success, warning, or error — within a page section without interrupting user flow.

## When to Use

- Show a form-level validation summary after a failed submission.
- Inform the user of a successful action that affects the current section (e.g., "Settings saved").
- Display a contextual warning before a user proceeds with a risky action.
- Surface informational notices relevant to the current content area (e.g., "This feature is in beta").

## When NOT to Use

- For brief auto-dismissing notifications — use `Snackbar` (single message) or `Toast` (heading + detail).
- For blocking confirmations requiring user input — use `Dialog`.
- For full-page empty/error states — use `StateView`.
- When the message does not relate to the current section's content — place it where it is contextually relevant, or use a global notification.

## Import

```tsx
import { SectionMessage } from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Controls background color and the built-in icon. |
| `heading` | `ReactNode` | — | Bold heading text. Use for the primary status statement. |
| `description` | `ReactNode` | — | Body text with additional detail. |
| `icon` | `ReactNode` | — | Custom icon (20×20) to override the variant's default icon. |
| `action` | `ReactNode` | — | Optional action slot. Accept a `Button` or `TextButton`. |
| `onClose` | `() => void` | — | When provided, renders a close (×) button at the top-right. Manages visibility in the parent. |
| `style` | `CSSProperties` | — | Inline style overrides for the container. Inherited from `HTMLAttributes<HTMLDivElement>`. |

All other `HTMLAttributes<HTMLDivElement>` props are forwarded to the container.

## Basic Usage

```tsx
// Informational banner
<SectionMessage
  variant="info"
  heading="Scheduled maintenance"
  description="The service will be unavailable on Sunday 2–4 AM."
/>

// Success confirmation
<SectionMessage
  variant="success"
  heading="Profile updated"
  description="Your changes have been saved successfully."
  onClose={() => setVisible(false)}
/>

// Warning with action
<SectionMessage
  variant="warning"
  heading="Email not verified"
  description="Verify your email to enable all features."
  action={<TextButton onClick={resend}>Resend email</TextButton>}
/>

// Error with retry
<SectionMessage
  variant="error"
  heading="Payment failed"
  description="Your card was declined. Please update your payment method."
  action={<Button buttonType="weak" color="error" onClick={retry}>Try again</Button>}
  onClose={() => setError(false)}
/>
```

## Variants

### Status Variant

| Value | Background | Icon | ARIA role | `aria-live` | Use for |
|-------|------------|------|-----------|-------------|---------|
| `default` | `--surface-brand-secondary` | Info (brand color) | `status` | `polite` | Brand-colored general notices |
| `info` | `--surface-info-default` | Info circle | `status` | `polite` | Neutral informational notices |
| `success` | `--surface-success-default` | Check circle | `status` | `polite` | Positive confirmation |
| `warning` | `--surface-warning-default` | Triangle alert | `alert` | `assertive` | Caution or advisory notices |
| `error` | `--surface-error-default` | X circle | `alert` | `assertive` | Errors, failures, blockers |

`warning` and `error` variants use `role="alert"` with `aria-live="assertive"` so screen readers announce them immediately. All other variants use `role="status"` with `aria-live="polite"`.

## States

`SectionMessage` is a presentational component. Visibility is controlled by the parent through conditional rendering or the `onClose` callback:

```tsx
// Controlled dismiss
const [visible, setVisible] = useState(true);

{visible && (
  <SectionMessage
    variant="info"
    heading="Tip: use keyboard shortcuts"
    onClose={() => setVisible(false)}
  />
)}
```

## Anatomy

```
[ Icon ] [ Heading          ] [ × ]
         [ Description text      ]
         [ Action button         ]
```

- **Icon**: 20×20, left-aligned. Built-in per variant, overridable via `icon` prop.
- **Heading**: Semibold, `--content-base-strong`.
- **Description**: Regular, `--content-base-secondary`, below heading.
- **Action**: Rendered below description, left-aligned. Pass `TextButton` for low-weight actions or `Button buttonType="weak"` for heavier CTAs.
- **Close button**: 24×24 icon button at top-right, only when `onClose` is provided.

## Accessibility

- `error` and `warning` variants render with `role="alert"` and `aria-live="assertive"` — content is announced immediately by screen readers when it appears in the DOM.
- `info`, `success`, and `default` variants use `role="status"` and `aria-live="polite"` — announced when the screen reader is idle.
- The close button carries `aria-label="닫기"`.
- Custom icons passed via the `icon` prop should have `aria-hidden="true"` if they are purely decorative.
- Avoid using color as the only indicator of severity — the `heading` text should clearly state the status.

## Do / Don't

**Do** place `SectionMessage` close to the content it describes — at the top of a form, above a failing section, or inline in a content area.

**Do** use `heading` for the primary status statement and `description` for supplementary detail. Both are optional but `heading` alone is usually sufficient.

**Do** keep the message dismissible (`onClose`) for informational variants so the user can clear the notice after reading it.

**Don't** use `SectionMessage` for transient notifications like "Saved!" that appear briefly — use `Snackbar` with auto-dismiss instead.

**Don't** stack multiple `SectionMessage` components of the same variant. Consolidate multiple messages into a single heading + description or a list.

**Don't** place a `SectionMessage` in a modal dialog — the Dialog component already communicates its context clearly via `title` and `description`.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.brand.secondary` | Default variant background |
| `cssVarColors.surface.info.default` | Info variant background |
| `cssVarColors.surface.success.default` | Success variant background |
| `cssVarColors.surface.warning.default` | Warning variant background |
| `cssVarColors.surface.error.default` | Error variant background |
| `cssVarColors.content.brand.default` | Default variant icon color |
| `cssVarColors.icon.info/success/warning/error` | Variant icon colors |
| `cssVarColors.content.base.strong` | Heading text color |
| `cssVarColors.content.base.secondary` | Description text color and close button color |
| `radius.component.card.md` | Container border radius |
| `spacing.primitive[3]` | Gap between icon and content |
| `spacing.primitive[4]` | Container padding |
| `spacing.primitive[1]` | Gap between heading and description |
| `typography.fontSize.sm` | Heading and description font size |
| `typography.fontWeight.semibold` | Heading font weight |
| `typography.fontWeight.regular` | Description font weight |

## Related Components

- **Snackbar** — For brief auto-dismissing single-message notifications at the screen bottom.
- **Toast** — For richer transient notifications with heading and supporting detail.
- **Dialog** — For blocking confirmations requiring explicit user input.
- **StateView** — For empty or error states in a full content area, not inline banners.
