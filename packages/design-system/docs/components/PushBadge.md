# PushBadge

> An overlay badge that wraps another UI element to display a notification count, dot indicator, or "new" marker positioned at the top-right corner.

## When to Use

- Showing unread notification counts on tab bar icons, bell icons, or avatar thumbnails
- Indicating new/unread content without a specific count (dot variant)
- Marking items as "new" with a fixed "N" label
- Any icon or button that needs a count overlay without restructuring layout

## When NOT to Use

- Standalone status or category labels within content — use `ContentBadge`
- Inline text badges not overlaid on another element — use `Badge`
- Error or success state indicators within form fields — use field-level feedback

## Import

```tsx
import { PushBadge } from '@baerae-zkap/design-system';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | — | Yes | The element the badge overlays (icon, button, avatar, etc.). |
| `variant` | `'number' \| 'dot' \| 'new'` | `'number'` | No | Visual style of the badge. |
| `color` | `'error' \| 'primary' \| 'success' \| 'warning'` | `'error'` | No | Background color of the badge. |
| `size` | `'default' \| 'small' \| 'tiny'` | `'default'` | No | Size of the badge pill or dot. |
| `count` | `number` | — | No | Number to display. Only used when `variant="number"`. When provided, `variant` defaults to `'number'`. |
| `max` | `number` | `99` | No | Maximum count before truncating to `"N+"` (e.g., `"99+"`). |
| `hidden` | `boolean` | `false` | No | When `true`, removes the badge from the DOM while keeping `children` rendered. |

Additionally accepts all standard `HTMLDivElement` attributes (`className`, `style`, etc.) on the outer wrapper.

### Variant Reference

| Value | Appearance | Aria label |
|-------|-----------|------------|
| `number` | Pill with count text | `"{count}개 알림"` |
| `dot` | Small solid circle, no text | `"새 알림"` |
| `new` | Pill with fixed "N" text | `"새 항목"` |

### Size Reference

| Value | Height | Dot Size | Offset |
|-------|--------|----------|--------|
| `default` | 26px | 10px | -4px |
| `small` | 22px | 8px | -4px |
| `tiny` | 18px | 6px | -4px |

## Basic Usage

```tsx
import { PushBadge, IconButton } from '@baerae-zkap/design-system';

// Number badge
<PushBadge count={3}>
  <IconButton aria-label="Notifications" icon={<BellIcon />} />
</PushBadge>

// Dot badge
<PushBadge variant="dot">
  <IconButton aria-label="Messages" icon={<ChatIcon />} />
</PushBadge>

// Conditionally hidden
<PushBadge count={unreadCount} hidden={unreadCount === 0}>
  <IconButton aria-label="Notifications" icon={<BellIcon />} />
</PushBadge>
```

## Variants

### Number badge (default)

```tsx
<PushBadge count={5}>
  <IconButton aria-label="Notifications" icon={<BellIcon />} />
</PushBadge>
```

### Count overflow

```tsx
{/* Displays "99+" when count > 99 */}
<PushBadge count={142} max={99}>
  <IconButton aria-label="Notifications" icon={<BellIcon />} />
</PushBadge>

{/* Custom max */}
<PushBadge count={25} max={9}>
  <IconButton aria-label="Messages" icon={<ChatIcon />} />
</PushBadge>
```

### Dot variant

```tsx
<PushBadge variant="dot" color="error">
  <IconButton aria-label="Messages" icon={<ChatIcon />} />
</PushBadge>
```

### New variant

```tsx
<PushBadge variant="new">
  <IconButton aria-label="New posts" icon={<StarIcon />} />
</PushBadge>
```

### Colors

```tsx
<PushBadge count={3} color="error" />    {/* default — unread, alerts */}
<PushBadge count={3} color="primary" />  {/* brand blue */}
<PushBadge count={3} color="success" />  {/* positive count */}
<PushBadge count={3} color="warning" />  {/* caution */}
```

### Sizes

```tsx
<PushBadge count={3} size="default">...</PushBadge>
<PushBadge count={3} size="small">...</PushBadge>
<PushBadge count={3} size="tiny">...</PushBadge>
```

### On an avatar

```tsx
<PushBadge variant="dot" color="success" size="small">
  <Avatar src="/profile.jpg" name="Jane Doe" />
</PushBadge>
```

## States

| State | How to Implement |
|-------|-----------------|
| **Visible** | Default when `hidden={false}` |
| **Hidden** | `hidden={true}` — badge removed from DOM, children still render |
| **Overflow** | When `count > max`, displays `"{max}+"` automatically |
| **Zero count** | `count={0}` shows "0" — use `hidden={count === 0}` to hide it |

## Accessibility

- The badge `<span>` has `role="status"` and `aria-live="polite"`, so count changes are announced to screen readers without focus disruption.
- The `aria-label` is automatically set based on variant: `"{count}개 알림"` for number, `"새 알림"` for dot, `"새 항목"` for new.
- When `hidden={true}`, the badge element is removed from the DOM entirely — not just visually hidden — so screen readers do not announce it.
- Ensure the wrapped child (icon button, etc.) has its own accessible label describing its action, not the count.

## Do / Don't

**Do** use `hidden={count === 0}` to conditionally show/hide the badge rather than conditionally rendering the whole `PushBadge`.

**Don't** display a count of `0` — always hide the badge when there's nothing to report.

**Do** use `variant="dot"` when presence matters but quantity doesn't (e.g., "has unread messages").

**Don't** use `PushBadge` for inline status labels within content — use `ContentBadge` instead.

**Do** keep the wrapped child at a reasonable size so the badge has a natural anchor point at the top-right corner.

**Don't** wrap large container elements with `PushBadge` — it is designed for compact icons and avatars.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.error.solid` | Badge background for `color="error"` |
| `cssVarColors.surface.brand.default` | Badge background for `color="primary"` |
| `cssVarColors.surface.success.solid` | Badge background for `color="success"` |
| `cssVarColors.surface.warning.solid` | Badge background for `color="warning"` |
| `cssVarColors.content.base.onColor` | Badge text color (on solid colored surface) |
| `radius.primitive.full` | Pill and dot shape |
| `typography.fontWeight.bold` | Count text weight |
| `spacing.component.badge.height.*` | Badge height per size |
| `spacing.component.badge.paddingX.*` | Badge horizontal padding per size |

## Related Components

- `Badge` — numeric or status badge overlay (similar; check design system conventions for which to use)
- `ContentBadge` — standalone status or category label within content flow
- `IconButton` — common child element to wrap with PushBadge
- `Avatar` — another common child element for online/activity indicators
