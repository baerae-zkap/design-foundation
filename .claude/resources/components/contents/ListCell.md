# ListCell

> Status: stable
> Import: `import { ListCell } from '@baerae-zkap/design-system'`

## What It Is
A single-row horizontal list item for settings, menus, and option lists. Supports leading content (icon/avatar), title + description, and trailing content (value text, switch, badge, chevron).

## When to Use
- Use for settings/preferences lists (Language, Dark Mode, Notifications)
- Use for menu/option lists (Account, Privacy, Help)
- Use for simple key-value display rows

## When NOT to Use
- Do NOT use for media-rich items with thumbnails -- use `ListCard` instead
- Do NOT use for tabular data with multiple columns -- use `Table` instead
- Do NOT use for card-like content blocks -- use `Card` instead

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `leading` | `ReactNode` | -- | Left area (icon, avatar, checkbox) |
| `title` | `ReactNode` | (required) | Main text. Single line, truncated with ellipsis |
| `description` | `ReactNode` | -- | Secondary text below title. Single line, truncated |
| `trailing` | `ReactNode` | -- | Right area (value string, Switch, ContentBadge, chevron icon) |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Row height and font sizes |
| `verticalAlign` | `"top" \| "center"` | `"center"` | Vertical alignment of all slots |
| `withArrow` | `boolean` | `false` | Shows built-in right-pointing chevron at the end. For navigation rows. |
| `onClick` | `() => void` | -- | Click handler. When provided, row becomes interactive |
| `divider` | `boolean` | `false` | Show bottom border separator |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `title`.

## Size Guide
| Size | Min Height | Title Font | Description Font | Padding Y | Padding X | Gap |
|------|------------|------------|------------------|-----------|-----------|-----|
| `small` | `spacing.component.listCell.minHeight.sm` | 14px (sm) | 12px (xs) | 8px | 16px | 12px |
| `medium` | `spacing.component.listCell.minHeight.md` | 16px (md) | 14px (sm) | 12px | 16px | 12px |
| `large` | `spacing.component.listCell.minHeight.lg` | 16px (md) | 14px (sm) | 16px | 16px | 16px |

## Common Patterns

### Settings list
```tsx
<SectionHeader title="General" />
<ListCell title="Language" trailing="English" onClick={onLanguage} divider />
<ListCell title="Dark Mode" trailing={<Switch checked={dark} onChange={setDark} />} divider />
<ListCell title="Notifications" trailing={<Switch checked={notifs} onChange={setNotifs} />} />
```

### Navigation menu with built-in arrow
```tsx
<ListCell
  leading={<UserIcon />}
  title="Profile"
  withArrow
  onClick={() => navigate('/profile')}
  divider
/>
<ListCell
  leading={<SettingsIcon />}
  title="Settings"
  withArrow
  onClick={() => navigate('/settings')}
/>
```

### With description
```tsx
<ListCell
  leading={<Avatar src={user.avatar} alt={user.name} size="md" />}
  title={user.name}
  description={user.email}
  trailing={<ContentBadge color="primary" size="small">Admin</ContentBadge>}
  onClick={() => selectUser(user.id)}
/>
```

### Static display (no onClick)
```tsx
<ListCell title="Version" trailing="2.1.0" />
<ListCell title="Build" trailing="1234" />
```

### Top-aligned for multiline content
```tsx
<ListCell
  leading={<AlertIcon />}
  title="Important Notice"
  description="This action cannot be undone and will permanently delete your data."
  verticalAlign="top"
/>
```

## Do / Don't

- DO: Use `divider` between items in a list for visual separation
- DON'T: Use custom borders -- use the `divider` prop
- DO: Use `withArrow` for navigation rows instead of passing a custom chevron to `trailing`
- DON'T: Put a full `Button` in the trailing slot -- keep it lightweight
- DO: Group related ListCells under a `SectionHeader`
- DON'T: Mix ListCell sizes within the same list section

## Token Usage
| Property | Token |
|----------|-------|
| Background (default) | `transparent` |
| Background (hover) | `cssVarColors.fill.alternative` |
| Background (pressed) | `cssVarColors.fill.normal` |
| Title color | `cssVarColors.content.base.default` |
| Title weight | `typography.fontWeight.medium` |
| Description color | `cssVarColors.content.base.secondary` |
| Trailing / Arrow color | `cssVarColors.content.base.neutral` |
| Divider border | `borderWidth.default` + `cssVarColors.border.solid.alternative` |
| Transition | `transitions.background` |

## Accessibility
- When `onClick` is provided: `role="button"`, `tabIndex={0}`, keyboard Enter/Space triggers click
- When no `onClick`: no interactive role (static display)
- Title and description truncated with `text-overflow: ellipsis`
- Interactive ListCell shows hover and pressed visual states
- `withArrow` chevron is decorative (no aria-label needed)
