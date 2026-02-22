# Tooltip

> Status: stable
> Import: `import { Tooltip } from '@baerae-zkap/design-system'`

## What It Is

A small contextual label that appears near a trigger element on hover, focus, or click to provide a brief description or keyboard shortcut hint. It wraps a single child element and positions itself automatically.

## When to Use / When NOT to Use

**Use when:**
- Labeling an icon-only button (IconButton) that lacks visible text
- Showing a keyboard shortcut badge alongside a label
- Providing a brief supplementary description for a UI element on hover
- Giving contextual hints that don't need to persist

**Do NOT use when:**
- The information is essential and must always be visible (use inline text instead)
- Showing rich content with headings, actions, or links (use Popover)
- Displaying interactive content the user needs to click (use Popover or BottomSheet)
- The label is longer than ~40 characters (use Popover for longer guidance)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | **required** | Tooltip text content |
| `children` | `ReactElement` | **required** | Single trigger element to wrap |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom'` | Placement relative to trigger |
| `size` | `'small' \| 'medium'` | `'medium'` | Text size preset |
| `mode` | `'hover' \| 'always' \| 'click'` | `'hover'` | Trigger interaction mode |
| `shortcut` | `string` | - | Optional keyboard shortcut badge (e.g. `"Ctrl+S"`) |
| `defaultOpen` | `boolean` | `false` | Uncontrolled initial open state |
| `open` | `boolean` | - | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | - | Controlled state change callback |
| `disabled` | `boolean` | `false` | Prevents tooltip from showing |

## Common Patterns

### Icon button label

```tsx
<Tooltip label="Copy to clipboard" position="top">
  <IconButton aria-label="Copy"><CopyIcon /></IconButton>
</Tooltip>
```

### With keyboard shortcut

```tsx
<Tooltip label="Save" shortcut="Ctrl+S" position="bottom">
  <Button buttonType="filled" color="primary">Save</Button>
</Tooltip>
```

### Click mode (mobile-friendly)

```tsx
<Tooltip label="Tap to learn more about this feature" mode="click" position="top">
  <IconButton aria-label="Info"><InfoIcon /></IconButton>
</Tooltip>
```

### Always visible (onboarding)

```tsx
<Tooltip label="Start here" mode="always" position="right">
  <Button buttonType="weak" color="primary">Create</Button>
</Tooltip>
```

### Controlled state

```tsx
const [showTip, setShowTip] = useState(false);

<Tooltip
  label="Additional info"
  open={showTip}
  onOpenChange={setShowTip}
  position="top"
>
  <span>Hover me</span>
</Tooltip>
```

## Design Rules

- The tooltip renders via `createPortal` to `document.body` for proper stacking above all content.
- Position is calculated dynamically based on the trigger element's bounding rect.
- An arrow (CSS border triangle) points toward the trigger, matching the base position direction.
- Short labels (`< 30` characters) render with `white-space: nowrap`; longer labels wrap normally up to `maxWidth: 280px`.
- The tooltip uses inverted colors: background is `content.base.default` (dark in light mode), text is `surface.base.default` (light in light mode).
- `mode="hover"`: shows on mouseenter/focus, hides on mouseleave/blur.
- `mode="click"`: toggles on click, dismisses on click-outside.
- `mode="always"`: always visible, no trigger events.
- `disabled` prop overrides all modes and prevents display.
- Entrance/exit uses scale + opacity animation.

## Accessibility

- Renders with `role="tooltip"` on the tooltip element.
- Trigger element receives `aria-describedby` pointing to the tooltip ID when open.
- Escape key dismisses the tooltip (except in `always` mode).
- `hover` mode also activates on keyboard focus and deactivates on blur, supporting keyboard-only users.
- `pointerEvents: 'none'` on the tooltip prevents it from interfering with underlying interactions.

## Token Usage

| Element | Token | Value |
|---------|-------|-------|
| Background | `cssVarColors.content.base.default` | Inverted (dark bg in light mode) |
| Text color | `cssVarColors.surface.base.default` | Inverted (light text in light mode) |
| Font size (small) | `typography.fontSize.xs` | 12px |
| Font size (medium) | `typography.fontSize.sm` | 14px |
| Font weight | `typography.fontWeight.medium` | Medium |
| Border-radius | `radius.primitive.md` | Medium rounded |
| Padding | `spacing.primitive[2]` + 2px optical | 8px vertical / 10px horizontal |
| Container gap | `spacing.primitive[1]` | 4px |
| Shortcut margin-left | `spacing.primitive[1]` | 4px (8px effective with container gap) |
| Trigger-to-tooltip gap | `spacing.primitive[2]` | 8px |
| Shortcut badge border | `borderWidth.default` + `currentColor` | 1px solid |
| Shortcut badge radius | `radius.primitive.xs` | Extra-small rounded |
| Shortcut font size | `typography.fontSize.xs` | 12px |
| Arrow size | 6px CSS border triangle | Points toward trigger |
| Arrow color | `var(--content-base-default)` | Matches tooltip background |
| z-index | `zIndex.toast` | Above modal layer |
| Animation | `duration.instant` + `easing.easeOut` | Fast scale + fade |
