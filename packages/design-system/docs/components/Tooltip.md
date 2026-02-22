# Tooltip

A small floating label that provides supplemental context for a UI element. Appears on hover, focus, or click. Use to identify icon-only controls, surface keyboard shortcuts, or add brief clarifying text without cluttering the layout.

## Anatomy

```
Trigger wrapper (span)
  [child element]

Tooltip (portaled to body)
  Arrow
  Label
  Shortcut badge (optional)
```

## Import

```tsx
import { Tooltip } from '@baerae-zkap/design-system';
```

## Basic Usage

Wrap any element with `Tooltip` and provide a `label`. The tooltip appears on hover and focus by default.

```tsx
<Tooltip label="Copy to clipboard">
  <IconButton aria-label="Copy">
    <CopyIcon />
  </IconButton>
</Tooltip>
```

## Positions

Eight position values are supported. The arrow always points toward the trigger.

```tsx
<Tooltip label="Top center" position="top"><Button>Hover me</Button></Tooltip>
<Tooltip label="Bottom center" position="bottom"><Button>Hover me</Button></Tooltip>
<Tooltip label="Left side" position="left"><Button>Hover me</Button></Tooltip>
<Tooltip label="Right side" position="right"><Button>Hover me</Button></Tooltip>

// Aligned variants
<Tooltip label="Top, aligned left" position="top-start"><Button>Hover me</Button></Tooltip>
<Tooltip label="Top, aligned right" position="top-end"><Button>Hover me</Button></Tooltip>
<Tooltip label="Bottom, aligned left" position="bottom-start"><Button>Hover me</Button></Tooltip>
<Tooltip label="Bottom, aligned right" position="bottom-end"><Button>Hover me</Button></Tooltip>
```

## Sizes

```tsx
// small — xs font, min-width 36px
<Tooltip label="Save" size="small">
  <IconButton aria-label="Save"><SaveIcon /></IconButton>
</Tooltip>

// medium (default) — sm font, min-width 64px
<Tooltip label="Save document" size="medium">
  <IconButton aria-label="Save"><SaveIcon /></IconButton>
</Tooltip>
```

## With Keyboard Shortcut

The `shortcut` prop renders a monospace badge next to the label.

```tsx
<Tooltip label="Save" shortcut="Ctrl+S" position="bottom">
  <IconButton aria-label="Save"><SaveIcon /></IconButton>
</Tooltip>

<Tooltip label="Undo" shortcut="Ctrl+Z" position="bottom">
  <IconButton aria-label="Undo"><UndoIcon /></IconButton>
</Tooltip>
```

## Trigger Modes

### hover (default)

Shows on `mouseenter`/`focus`, hides on `mouseleave`/`blur`. Best for desktop UI.

```tsx
<Tooltip label="Delete item" mode="hover">
  <IconButton aria-label="Delete"><TrashIcon /></IconButton>
</Tooltip>
```

### click

Toggles on click. Closes on outside click or Escape key. Useful for touch-friendly or complex tooltips.

```tsx
<Tooltip label="This metric is calculated weekly" mode="click" position="top">
  <IconButton aria-label="More info"><InfoIcon /></IconButton>
</Tooltip>
```

### always

Always visible. Use sparingly — only for onboarding callouts or persistent labels.

```tsx
<Tooltip label="Start here" mode="always" position="right">
  <Button buttonType="filled" color="primary">Get started</Button>
</Tooltip>
```

## Controlled Mode

Override internal state by providing `open` and `onOpenChange`:

```tsx
const [open, setOpen] = useState(false);

<Tooltip
  label="Subscription required"
  open={open}
  onOpenChange={setOpen}
  position="top"
>
  <Button disabled>Export</Button>
</Tooltip>
```

## Disabled State

When `disabled` is true, the tooltip never shows regardless of mode or `open` prop.

```tsx
<Tooltip label="Upload" disabled={!hasPermission}>
  <IconButton aria-label="Upload"><UploadIcon /></IconButton>
</Tooltip>
```

## Default Open (Uncontrolled)

Show the tooltip initially without controlling it:

```tsx
<Tooltip label="New!" defaultOpen position="top">
  <Chip>Beta</Chip>
</Tooltip>
```

## API Reference

### TooltipProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Text content of the tooltip |
| `children` | `ReactElement` | — | **Required.** Trigger element (must accept ref forwarding) |
| `position` | `TooltipPosition` | `'bottom'` | Placement relative to the trigger |
| `size` | `TooltipSize` | `'medium'` | Controls font size and min-width |
| `mode` | `TooltipMode` | `'hover'` | How the tooltip is triggered |
| `shortcut` | `string` | — | Keyboard shortcut badge displayed alongside the label |
| `defaultOpen` | `boolean` | `false` | Initial open state for uncontrolled usage |
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Called when open state changes (controlled mode) |
| `disabled` | `boolean` | `false` | Prevents tooltip from showing |

### TooltipPosition

```
'top' | 'bottom' | 'left' | 'right'
'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
```

`top-start` and `bottom-start` align the tooltip's left edge to the trigger's left edge. `top-end` and `bottom-end` align to the right edge. The arrow still points to the trigger center on aligned variants.

### TooltipSize

| Value | Font Size | Min Width |
|-------|-----------|-----------|
| `small` | `xs` (12px) | 36px |
| `medium` | `sm` (14px) | 64px |

### TooltipMode

| Value | Trigger | Dismiss |
|-------|---------|---------|
| `hover` | mouseenter / focus | mouseleave / blur |
| `click` | click | outside click / Escape |
| `always` | — (always visible) | — |

## Behavior

- Tooltip is portaled to `document.body` to avoid overflow clipping.
- Position is recalculated via `useLayoutEffect` each time the tooltip mounts or the trigger/label changes.
- Max width is 280px; labels shorter than 30 characters render on a single line (`white-space: nowrap`).
- Entrance animation: scale from 0.94 + fade in. Exit: reverse.
- Escape key closes the tooltip in `hover` and `click` modes.
- The tooltip element itself has `pointer-events: none` so it never captures mouse events.

## Accessibility

- The tooltip has `role="tooltip"` and a stable `id`.
- The trigger wrapper sets `aria-describedby` to the tooltip `id` when open, linking it to the tooltip for screen readers.
- In `hover` mode, focus events trigger the tooltip so keyboard users receive the same contextual information.
- The tooltip is purely descriptive — never place interactive content (buttons, links) inside it. Use Popover for interactive overlays.

## Usage Guidelines

- Use Tooltip to identify icon-only controls that lack visible labels. Every `IconButton` without a visible label should have a Tooltip.
- Keep labels short — one to five words. If you need a sentence or more, use Popover instead.
- Use `shortcut` to surface keyboard shortcuts for power users without adding visual clutter.
- Prefer `position="bottom"` or `position="top"` as defaults; use `left`/`right` only when vertical space is constrained.
- Do not use `mode="always"` outside of focused onboarding flows. Persistent tooltips add visual noise.
- Never put critical information solely in a tooltip — users on touch devices may not discover it.

## Related Components

- **Popover** — Rich floating card with heading, description, and action buttons
- **SectionMessage** — Inline contextual status visible to all users without interaction
- **IconButton** — Commonly used as the tooltip trigger; always include `aria-label` on the IconButton itself in addition to the Tooltip label
