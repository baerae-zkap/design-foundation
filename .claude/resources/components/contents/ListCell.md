# ListCell

> Status: stable
> Import: `import { ListCell } from '@baerae-zkap/design-system'`

## What It Is
A single-row horizontal list item for settings, menus, and option lists. Supports leading content (icon/avatar), title + subtitle, and trailing content (value text, switch, badge, chevron).

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
| `subtitle` | `ReactNode` | -- | Secondary text below title. Single line, truncated |
| `trailing` | `ReactNode` | -- | Right area (value string, Switch, ContentBadge, chevron icon) |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Row height and font sizes |
| `onClick` | `() => void` | -- | Click handler. When provided, row becomes interactive |
| `disabled` | `boolean` | `false` | Grays out row, blocks interaction |
| `divider` | `boolean` | `false` | Show bottom border separator |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `title`.

## Size Guide
| Size | Min Height | Title Font | Subtitle Font | Padding Y | Padding X | Gap |
|------|------------|------------|---------------|-----------|-----------|-----|
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

### Navigation menu
```tsx
<ListCell
  leading={<UserIcon />}
  title="Profile"
  trailing={<ChevronRightIcon />}
  onClick={() => navigate('/profile')}
  divider
/>
<ListCell
  leading={<SettingsIcon />}
  title="Settings"
  trailing={<ChevronRightIcon />}
  onClick={() => navigate('/settings')}
/>
```

### With subtitle
```tsx
<ListCell
  leading={<Avatar src={user.avatar} size={40} />}
  title={user.name}
  subtitle={user.email}
  trailing={<ContentBadge color="primary" size="small">Admin</ContentBadge>}
  onClick={() => selectUser(user.id)}
/>
```

### Static display (no onClick)
```tsx
<ListCell title="Version" trailing="2.1.0" />
<ListCell title="Build" trailing="1234" />
```

## Do / Don't

- DO: Use `divider` between items in a list for visual separation
- DON'T: Use custom borders -- use the `divider` prop
- DO: Use trailing content for values, switches, badges, or chevrons
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
| Subtitle color | `cssVarColors.content.base.secondary` |
| Trailing color | `cssVarColors.content.base.neutral` |
| Divider border | `borderWidth.default` + `cssVarColors.border.base.default` |
| Disabled opacity | `opacity.disabled` |
| Transition | `transitions.background` |

## Accessibility
- When `onClick` is provided: `role="button"`, `tabIndex={0}`, keyboard Enter/Space triggers click
- When no `onClick`: no interactive role (static display)
- Title and subtitle truncated with `text-overflow: ellipsis`
- Interactive ListCell shows hover and pressed visual states
