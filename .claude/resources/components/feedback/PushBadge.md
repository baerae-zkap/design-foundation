# PushBadge

> Status: stable
> Import: `import { PushBadge } from '@baerae-zkap/design-system'`

## What It Is
A wrapper component that overlays a badge on top of another UI element (icon button, avatar, etc.). Rendered via `position: absolute` on the top-right corner of the `children` element.

## When to Use
- Notification count on tab bar icons or action buttons
- Indicating unread messages or new content
- Status indicators on avatars or profile images

## When NOT to Use
- For inline status labels within content — use `ContentBadge` instead
- On non-interactive elements (text, paragraphs)
- When the count is always 0 — use `hidden={true}` or omit

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | (required) | The element the badge overlays |
| `variant` | `'dot' \| 'number' \| 'new'` | `'number'` | Badge type |
| `color` | `'error' \| 'primary' \| 'success' \| 'warning'` | `'error'` | Badge color |
| `size` | `'default' \| 'small' \| 'tiny'` | `'default'` | Badge size |
| `count` | `number` | — | Numeric count (number variant only) |
| `max` | `number` | `99` | Max count shown. Exceeding shows "99+" |
| `hidden` | `boolean` | `false` | When true, removes badge from DOM entirely |

## Common Patterns

### Notification count
```tsx
<PushBadge variant="number" color="error" count={unreadCount} hidden={unreadCount === 0}>
  <IconButton aria-label="알림"><BellIcon /></IconButton>
</PushBadge>
```

### Dot indicator (presence only)
```tsx
<PushBadge variant="dot" color="error">
  <IconButton aria-label="메시지"><MessageIcon /></IconButton>
</PushBadge>
```

### New content indicator
```tsx
<PushBadge variant="new" color="primary">
  <IconButton aria-label="새 기능"><StarIcon /></IconButton>
</PushBadge>
```

## Design Rules
- Always use `color="error"` for notification counts (unread messages, alerts)
- Always set `hidden={count === 0}` — never show a "0" badge
- `variant="new"` renders fixed "N" text — no count prop needed
- Use `size="tiny"` only for dot badges in dense layouts

## Token Usage
| Property | Token |
|----------|-------|
| Badge height (default) | `spacing.component.badge.height.lg` (26px) |
| Badge height (small) | `spacing.component.badge.height.md` (22px) |
| Badge height (tiny) | `spacing.component.badge.height.sm` (18px) |
| Border radius | `radius.primitive.full` (9999px) |
| Error bg | `cssVarColors.surface.error.solid` |
| Primary bg | `cssVarColors.surface.brand.default` |
| Success bg | `cssVarColors.surface.success.solid` |
| Warning bg | `cssVarColors.surface.warning.solid` |
| Text | `cssVarColors.content.base.onColor` |
