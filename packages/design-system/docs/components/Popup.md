# Popup

A centered modal dialog that blocks the UI and demands user attention. Use when the user must respond before continuing — confirmations, alerts, settings panels, or any flow that requires a deliberate decision.

## Anatomy

```
Backdrop (scene)
  Container
    Navigation bar (normal | emphasize | floating close button)
      Title
      Close button
    Contents (scrollable)
    Action area
      Button(s)
```

## Import

```tsx
import { Popup } from '@baerae-zkap/design-system';
```

## Basic Usage

```tsx
const [open, setOpen] = useState(false);

<Popup
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm changes"
  actions={[
    { label: 'Cancel', onClick: () => setOpen(false) },
    { label: 'Save', onClick: handleSave },
  ]}
>
  <p>Your changes will be saved and applied immediately.</p>
</Popup>
```

## Navigation Styles

The `navigation` prop controls the header appearance:

```tsx
// normal (default when title is provided) — centered title, close button right
<Popup open={open} onClose={onClose} title="Settings" navigation="normal">
  {/* content */}
</Popup>

// emphasize — left-aligned bold title, close button right
<Popup open={open} onClose={onClose} title="Important notice" navigation="emphasize">
  {/* content */}
</Popup>

// floating — no nav bar; close button overlays content top-right
<Popup open={open} onClose={onClose} navigation="floating" aria-label="Photo viewer">
  {/* full-bleed image or rich content */}
</Popup>
```

When `navigation` is omitted, it resolves automatically: `"normal"` if `title` is provided, `"floating"` otherwise.

## Action Layouts

The `actionLayout` prop controls how action buttons are rendered. It resolves automatically based on the number of actions if not specified.

```tsx
// strong — single full-width primary button (auto-selected for 1 action)
<Popup
  open={open}
  onClose={onClose}
  title="Delete item"
  actions={[{ label: 'Delete', onClick: onDelete, color: 'error' }]}
/>

// neutral — two equal-width buttons (auto-selected for 2 actions)
<Popup
  open={open}
  onClose={onClose}
  title="Unsaved changes"
  actions={[
    { label: 'Discard', onClick: onDiscard },
    { label: 'Save', onClick: onSave },
  ]}
/>

// compact — same as neutral but visually tighter
<Popup
  open={open}
  onClose={onClose}
  title="Quick confirm"
  actionLayout="compact"
  actions={[
    { label: 'No', onClick: onNo },
    { label: 'Yes', onClick: onYes },
  ]}
/>
```

## Sizes

```tsx
// medium (default) — max width 400px
<Popup open={open} onClose={onClose} title="Alert" size="medium">{/* ... */}</Popup>

// large — max width 560px, more padding
<Popup open={open} onClose={onClose} title="Detail view" size="large">{/* ... */}</Popup>

// xlarge — max width 640px, maximum padding
<Popup open={open} onClose={onClose} title="Settings" size="xlarge">{/* ... */}</Popup>
```

## Height Strategy

```tsx
// hug (default) — height grows with content up to 760px max
<Popup open={open} onClose={onClose} title="List" type="hug">{/* ... */}</Popup>

// fixed — fixed height (480px for medium/large, 560px for xlarge)
<Popup open={open} onClose={onClose} title="Scrollable panel" type="fixed">{/* long content */}</Popup>
```

## Backdrop Dismiss

By default, clicking the backdrop does not close the popup. Enable it for non-critical dialogs:

```tsx
<Popup
  open={open}
  onClose={() => setOpen(false)}
  title="Filter options"
  closeOnDimmerClick
>
  {/* filter content */}
</Popup>
```

## Destructive Confirmation Pattern

```tsx
<Popup
  open={showDelete}
  onClose={() => setShowDelete(false)}
  title="Delete account"
  actions={[
    { label: 'Cancel', onClick: () => setShowDelete(false), color: 'neutral' },
    { label: 'Delete', onClick: handleDelete, color: 'error', variant: 'filled' },
  ]}
>
  <p style={{ color: 'var(--content-base-secondary)', fontSize: 14 }}>
    This action is permanent and cannot be undone. All your data will be removed.
  </p>
</Popup>
```

## API Reference

### PopupProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Required.** Controls popup visibility |
| `onClose` | `() => void` | — | **Required.** Called on close button click or Escape key |
| `children` | `ReactNode` | — | **Required.** Scrollable content area |
| `title` | `ReactNode` | — | Title shown in the navigation bar |
| `navigation` | `PopupNavigation` | auto | Header style: `'normal'` \| `'emphasize'` \| `'floating'` |
| `actions` | `PopupAction[]` | — | Array of action button descriptors |
| `actionLayout` | `PopupActionLayout` | auto | Button layout: `'strong'` \| `'neutral'` \| `'cancel'` \| `'compact'` |
| `size` | `PopupSize` | `'medium'` | Dialog width: `'medium'` \| `'large'` \| `'xlarge'` |
| `type` | `PopupType` | `'hug'` | Height strategy: `'hug'` \| `'fixed'` |
| `closeOnDimmerClick` | `boolean` | `false` | Close when backdrop is clicked |
| `aria-label` | `string` | — | Accessible label when `title` is absent or `navigation="floating"` |

### PopupAction

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `label` | `string` | — | **Required.** Button text |
| `onClick` | `() => void` | — | **Required.** Click handler |
| `color` | `ButtonColor` | auto | Button color (`primary`, `neutral`, `error`, etc.) |
| `variant` | `'filled' \| 'weak'` | auto | Button visual variant |

### PopupNavigation

| Value | Behavior |
|-------|----------|
| `normal` | Centered title, close button at right, bottom border divider |
| `emphasize` | Left-aligned bold title, close button at right, bottom border divider |
| `floating` | No nav bar; close button overlays top-right corner of content |

### PopupSize

| Value | Max Width | Content Padding |
|-------|-----------|-----------------|
| `medium` | 400px | 20px |
| `large` | 560px | 24px |
| `xlarge` | 640px | 32px |

### PopupActionLayout (auto-resolved)

| Value | Behavior | Auto-selected when |
|-------|----------|--------------------|
| `strong` | Single full-width filled button | 1 action |
| `neutral` | Two equal-width buttons | 2+ actions |
| `cancel` | Two buttons, last is primary | Explicit only |
| `compact` | Tighter two-button layout | Explicit only |

## Behavior

- Rendered via `createPortal` into `document.body`.
- Body scroll is locked while the popup is open.
- Pressing `Escape` calls `onClose`.
- Entrance animation: fade + slide up (28px). Exit: reverse.
- Click events on the container do not propagate to the backdrop.

## Accessibility

- Container has `role="dialog"` and `aria-modal="true"`.
- When `title` is provided and `navigation` is not `"floating"`, `aria-labelledby` links to the title element automatically.
- When there is no visible title (floating navigation), provide `aria-label` on the Popup.
- The close button has `aria-label="닫기"`.
- Focus is not automatically trapped — implement a focus trap for production accessibility if needed.

## Usage Guidelines

- Use Popup for decisions that cannot be deferred: confirmations, critical alerts, required input.
- Do not use Popup for passive information that does not require a response — use Popover or SectionMessage instead.
- Destructive actions (delete, remove) must use `color="error"`. Place the destructive button last so it is the visually dominant action.
- Always pair a destructive action with a `color="neutral"` cancel option.
- Keep content concise. If content is long and scrollable, use `type="fixed"` to constrain height.
- Do not set `closeOnDimmerClick` for irreversible confirmations — the user should make an explicit choice.

## Related Components

- **BottomSheet** — Mobile-friendly overlay that slides from the bottom, better for option lists and supplemental content
- **Popover** — Non-blocking floating hint card, no user response required
- **AlertDialog** — Simplified pre-built dialog for standard confirm/cancel patterns
