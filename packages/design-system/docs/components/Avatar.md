# Avatar

> Displays a user profile image with an automatic initials fallback, online status indicator, and group stacking via `AvatarGroup`.

## When to Use

- Represent a user, contact, or participant in a list, card, or comment thread.
- Show multiple users together (e.g., shared access, group members) using `AvatarGroup`.
- Display online/offline presence status alongside the image.

## When NOT to Use

- As a general image thumbnail — use a dedicated image element or `ListCard` thumbnail slot instead.
- As a decorative icon — use an icon component or illustration.
- When identity is irrelevant to the context and the image is purely decorative.

## Import

```tsx
import { Avatar, AvatarGroup } from '@baerae-zkap/design-system';
```

## Props

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image source URL. Falls back to initials on error or when omitted. |
| `alt` | `string` | — | Alt text for the image. Also used to derive initials when `fallback` is not provided. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar diameter: xs=24, sm=32, md=40, lg=48, xl=64. |
| `shape` | `'circle' \| 'rounded'` | `'circle'` | Border radius shape. `'rounded'` uses the component avatar square radius token. |
| `fallback` | `string` | — | Custom initials string. If omitted, initials are derived from `alt`. |
| `online` | `boolean` | `false` | When true, renders a green status indicator dot at the bottom-right. |
| `onClick` | `() => void` | — | Click handler. When provided, the avatar becomes keyboard-focusable with `role="button"`. |
| `style` | `CSSProperties` | — | Inline style overrides for the container element. |

### AvatarGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | `Avatar` elements to stack. |
| `max` | `number` | — | Maximum avatars shown before displaying a `+N` overflow indicator. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size applied uniformly to all child `Avatar` elements (overrides individual size props). |
| `style` | `CSSProperties` | — | Inline style overrides for the group container. |

## Basic Usage

```tsx
// Single avatar with image
<Avatar src="https://example.com/user.jpg" alt="Jane Doe" size="md" />

// Initials fallback (no src)
<Avatar alt="Park Jisoo" size="lg" />

// With online indicator
<Avatar src={profileUrl} alt="Kim Minjun" online />

// Clickable avatar
<Avatar src={profileUrl} alt="User" onClick={() => navigate('/profile')} />

// Rounded shape
<Avatar src={profileUrl} alt="Team" shape="rounded" size="xl" />
```

## AvatarGroup Usage

```tsx
// Basic group
<AvatarGroup>
  <Avatar src={url1} alt="Alice" />
  <Avatar src={url2} alt="Bob" />
  <Avatar src={url3} alt="Carol" />
</AvatarGroup>

// With overflow limit
<AvatarGroup max={3} size="sm">
  <Avatar src={url1} alt="Alice" />
  <Avatar src={url2} alt="Bob" />
  <Avatar src={url3} alt="Carol" />
  <Avatar src={url4} alt="Dave" />
  <Avatar src={url5} alt="Eve" />
  {/* Renders 3 avatars + "+2" overflow indicator */}
</AvatarGroup>
```

## Variants

### Size

| Value | Diameter | Typical use |
|-------|----------|-------------|
| `xs` | 24px | Compact lists, inline mentions |
| `sm` | 32px | Comment threads, toolbar |
| `md` | 40px | Standard list items (default) |
| `lg` | 48px | Profile cards |
| `xl` | 64px | Profile page header |

### Shape

| Value | Description |
|-------|-------------|
| `circle` | Fully circular — for people (default) |
| `rounded` | Slightly rounded square — for teams or brands |

## States

### Image Error Fallback

When `src` is provided but fails to load, the component automatically switches to the initials fallback. The fallback background uses `--fill-normal`.

**Initials derivation logic:**
- Single-word `alt`: first 2 characters uppercased.
- Multi-word `alt`: first character of first two words uppercased.
- Override with the explicit `fallback` prop for full control.

### Online Indicator

When `online={true}`:
- Green dot (`--content-success-default`) at the bottom-right corner.
- Dot size scales with avatar size: 8px (xs), 10px (sm/md/lg), 14px (xl).
- Has a white border for contrast over the avatar edge.
- Rendered with `aria-label="온라인"` for screen readers.

### Interactive (Clickable)

When `onClick` is provided:
- Container gets `role="button"` and `tabIndex={0}`.
- Activatable via `Enter` or `Space` keyboard keys.
- Cursor changes to `pointer`.

## Accessibility

- Always provide a meaningful `alt` string describing the person. It is set as `aria-label` on the container.
- When `onClick` is provided, the component renders as a focusable button — no extra `role` or `tabIndex` handling needed.
- The initials `<span>` is `aria-hidden="true"` since the container already carries the `aria-label`.
- The online indicator carries `aria-label="온라인"` (Korean for "online").
- The `AvatarGroup` wrapper gets `role="group"` for semantic grouping.

## Do / Don't

**Do** provide `alt` text that identifies the person, not just "avatar" or "user image".

**Do** use `AvatarGroup` with a `max` cap when more than 5 users are shown to avoid visual clutter.

**Don't** set `online` on avatars representing entities (teams, bots) — the indicator implies personal presence.

**Don't** omit `alt` when `src` is set. Without `alt`, screen readers cannot identify the person, and initials cannot be derived for the fallback.

**Don't** manually stack multiple `Avatar` components with negative margins — use `AvatarGroup` which handles overlap, z-index, and the overflow indicator automatically.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.fill.normal` | Initials fallback background and overflow indicator background |
| `cssVarColors.content.base.secondary` | Initials text color |
| `cssVarColors.content.success.default` | Online indicator dot color |
| `cssVarColors.content.base.onColor` | Online indicator border color |
| `radius.primitive.full` | Circle shape |
| `radius.component.avatar.square` | Rounded shape |
| `typography.fontSize.*` | Initials font size per size |
| `typography.fontWeight.medium` | Initials font weight |
| `borderWidth.strong` | Online indicator border width |

## Related Components

- **Badge** — Numeric count overlay (e.g., unread messages) on top of an Avatar.
- **PushBadge** — Notification count overlay for icon buttons and avatars.
- **ListCell** — Use Avatar in the `leading` slot for contact/user list rows.
- **Card** — Use Avatar inside a Card for profile preview cards.
