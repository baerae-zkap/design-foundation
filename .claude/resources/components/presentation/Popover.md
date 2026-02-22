# Popover

> Status: stable
> Import: `import { Popover } from '@baerae-zkap/design-system'`

## What It Is

A floating information card that appears near a trigger element or at a positioned location, used for feature announcements, onboarding hints, and brief confirmations with optional action buttons.

## When to Use / When NOT to Use

**Use when:**
- Introducing a new feature or onboarding hint near a specific UI element
- Showing a brief explanation or confirmation that doesn't block the page
- Providing contextual guidance with optional CTA actions
- Displaying a non-modal informational card anchored to content

**Do NOT use when:**
- Showing a single-line label on hover (use Tooltip instead)
- Requiring a blocking confirmation before an action (use Popup / AlertDialog)
- Displaying lengthy content or forms (use BottomSheet or Popup)
- Showing a transient notification (use Snackbar or Toast)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `true` | Controls visibility |
| `onClose` | `() => void` | - | Callback when close button is clicked |
| `heading` | `string` | - | Optional heading text above description |
| `description` | `string` | **required** | Body description text |
| `action` | `ReactNode` | - | Primary action element (right-aligned, TextButton recommended) |
| `subAction` | `ReactNode` | - | Secondary action element (left-aligned, TextButton color="muted" recommended) |
| `showClose` | `boolean` | `false` | Whether to show the X close button |
| `size` | `'sm' \| 'md'` | `'md'` | Maximum width preset (`sm` = 240px, `md` = 320px) |
| `className` | `string` | - | Additional CSS class |
| `style` | `React.CSSProperties` | - | Inline styles for positioning |

## Common Patterns

### Feature announcement with actions

```tsx
<Popover
  heading="New feature available"
  description="You can now set up notifications to never miss important updates."
  action={<TextButton color="primary">Got it</TextButton>}
  subAction={<TextButton color="muted">Later</TextButton>}
  showClose
  onClose={() => setOpen(false)}
/>
```

### Simple hint without heading

```tsx
<Popover
  description="Tap here to add your first item."
  size="sm"
/>
```

### Positioned near a trigger

```tsx
<div style={{ position: 'relative', display: 'inline-block' }}>
  <IconButton aria-label="Help"><HelpIcon /></IconButton>
  <Popover
    open={showHelp}
    description="This setting controls who can see your profile."
    showClose
    onClose={() => setShowHelp(false)}
    style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8 }}
  />
</div>
```

## Design Rules

- The Popover renders as an `inline-block` element; positioning **and z-index** are the consumer's responsibility via the `style` prop. Unlike BottomSheet/Popup (which use `zIndex.modal`) and Tooltip (which uses `zIndex.toast`), Popover has no built-in z-index.
- When `open` is `false`, the component returns `null`.
- Actions row renders only when `action` or `subAction` is provided. When both exist, `subAction` is left-aligned and `action` is right-aligned via `justify-content: space-between`.
- Close button is absolutely positioned in the top-right corner when `showClose` is `true`.
- Heading text gets right padding when `showClose` is `true` to avoid overlap with the close button.

## Accessibility

- Renders with `role="dialog"` and `aria-modal="false"` (non-modal).
- Close button has `aria-label="닫기"` for screen reader support.
- No focus trap -- the popover is non-modal by design.
- No built-in Escape key handler; add externally if needed.

## Token Usage

| Element | Token | Value |
|---------|-------|-------|
| Background | `cssVarColors.surface.base.default` | White / dark surface |
| Border-radius | `radius.primitive.xl` | Rounded corners |
| Padding | `spacing.primitive[5]` | 20px all sides |
| Box shadow | `cssVarShadow.semantic.card.floating` | Elevated floating card |
| Heading font size | `typography.fontSize.md` | 16px |
| Heading font weight | `typography.fontWeight.bold` | Bold |
| Heading color | `cssVarColors.content.base.default` | Primary text |
| Description font size | `typography.fontSize.sm` | 14px |
| Description color | `cssVarColors.content.base.secondary` | Secondary text |
| Close button color | `cssVarColors.content.base.secondary` | Secondary text |
| Close button radius | `radius.primitive.full` | Circular hit area |
| Actions margin-top | `spacing.primitive[4]` | 16px |
| Actions gap | `spacing.primitive[2]` | 8px |
| z-index | None (consumer-managed) | Position via `style` prop; set `zIndex` manually if overlapping other elevated content |
| Entrance animation | `duration.fast` + `easing.easeOut` | Scale + fade in |
