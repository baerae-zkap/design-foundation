# Avatar

> Status: stable
> Import: `import { Avatar, AvatarGroup } from '@baerae-zkap/design-system'`

## What It Is
A circular or rounded image placeholder that represents a user or entity. Supports image source, initials fallback derived from alt text, and an online status indicator. `AvatarGroup` stacks multiple avatars with overlap and an overflow "+N" indicator.

## When to Use
- User profile pictures in headers, comments, or lists
- Participant indicators in chat or collaboration UIs
- Grouped member displays with overflow count

## When NOT to Use
- Product or content images -- use `Thumbnail` instead
- Icons or logos that aren't user representations -- use `IconButton` for actions or `Thumbnail` for content images

## Props

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | -- | Image source URL |
| `alt` | `string` | -- | Alt text for image; also used to derive initials fallback |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `shape` | `'circle' \| 'rounded'` | `'circle'` | Container shape |
| `fallback` | `string` | -- | Custom initials text. If omitted, derived from `alt` |
| `online` | `boolean` | `false` | Show green online status indicator |
| `onClick` | `() => void` | -- | Click handler. Adds `role="button"` and keyboard support |
| `style` | `CSSProperties` | -- | Additional inline styles |

### AvatarGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | -- | Avatar components to display |
| `max` | `number` | -- | Maximum visible avatars before "+N" overflow |
| `size` | `AvatarSize` | `'md'` | Size applied to all child avatars |
| `style` | `CSSProperties` | -- | Additional inline styles |

## Common Patterns

### Basic with Image
```tsx
<Avatar src="/user.jpg" alt="Kim Jaden" size="md" />
```

### Initials Fallback
```tsx
<Avatar alt="Kim Jaden" size="lg" />
// Renders "KJ" initials
```

### Online Indicator
```tsx
<Avatar src="/user.jpg" alt="Kim Jaden" online />
```

### Clickable Avatar
```tsx
<Avatar src="/user.jpg" alt="Profile" onClick={() => navigate('/profile')} />
```

### Avatar Group with Overflow
```tsx
<AvatarGroup max={3} size="sm">
  <Avatar src="/a.jpg" alt="User A" />
  <Avatar src="/b.jpg" alt="User B" />
  <Avatar src="/c.jpg" alt="User C" />
  <Avatar src="/d.jpg" alt="User D" />
  <Avatar src="/e.jpg" alt="User E" />
</AvatarGroup>
// Shows 3 avatars + "+2" overflow badge
```

## Design Rules
- Default shape is `circle`; use `rounded` for non-person entities (teams, orgs)
- Initials are derived as: single word = first 2 chars, multiple words = first char of first 2 words
- AvatarGroup overlaps children with a negative margin of ~20% of dimension
- Online indicator scales with avatar size (8px for xs, 10px for sm-lg, 14px for xl)
- The overflow badge in AvatarGroup uses the same dimension as child avatars

## Accessibility
- `aria-label` is set to the `alt` prop value on the container
- When `onClick` is provided, `role="button"` and `tabIndex={0}` are added automatically
- Keyboard support: Enter and Space trigger `onClick`
- AvatarGroup container has `role="group"`
- Overflow indicator has `aria-label` describing the count

## Token Usage

| Property | Token |
|----------|-------|
| Border radius (circle) | `radius.primitive.full` |
| Border radius (rounded) | `radius.component.avatar.square` |
| Fallback background | `cssVarColors.fill.normal` |
| Initials color | `cssVarColors.content.base.secondary` |
| Initials font weight | `typography.fontWeight.medium` |
| Online indicator color | `cssVarColors.content.success.default` |
| Online indicator border | `borderWidth.strong` + `cssVarColors.content.base.onColor` |
| Overflow badge border | `borderWidth.strong` + `cssVarColors.content.base.onColor` |
| Font size (xs) | `typography.fontSize['3xs']` |
| Font size (sm) | `typography.fontSize.xs` |
| Font size (md) | `typography.fontSize.sm` |
| Font size (lg) | `typography.fontSize.md` |
| Font size (xl) | `typography.fontSize.xl` |

### Size Dimensions

| Size | Dimension |
|------|-----------|
| `xs` | 24px |
| `sm` | 32px |
| `md` | 40px |
| `lg` | 48px |
| `xl` | 64px |
