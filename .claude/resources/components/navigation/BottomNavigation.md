# BottomNavigation

> Status: stable
> Import: `import { BottomNavigation } from '@baerae-zkap/design-system'`

## What It Is

A fixed bottom tab bar for switching between the app's top-level sections. Renders 2-5 tab items with icon + label, using a pill-shaped press animation.

## When to Use

- Primary section navigation in mobile-style layouts (Home, Search, Profile, etc.)
- Persistent app-level navigation that stays visible across all pages

## When NOT to Use

- In-page content tabs -- use `Tab` instead
- More than 5 destinations -- restructure IA or use a drawer
- Secondary/nested navigation -- use `CategoryNavigation` or `Tab`

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `BottomNavigationItem[]` | -- | Yes | Tab definitions (2-5 items, extras truncated) |
| `activeIndex` | `number` | -- | Yes | Currently active tab index (0-based) |
| `onChange` | `(index: number) => void` | -- | No | Callback when user taps a different tab |
| `className` | `string` | -- | No | CSS class on root `<nav>` |
| `style` | `CSSProperties` | -- | No | Inline style override on root |

### BottomNavigationItem

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `icon` | `ReactNode` | Yes | Default (inactive) icon |
| `activeIcon` | `ReactNode` | No | Icon shown when tab is active (falls back to `icon`) |
| `label` | `string` | Yes | Tab label text (max 6 chars recommended) |
| `onClick` | `() => void` | No | Additional handler beyond `onChange` |

## Common Patterns

### Basic 3-tab navigation

```tsx
const [tab, setTab] = useState(0);

<BottomNavigation
  items={[
    { icon: <HomeIcon />, activeIcon: <HomeFilledIcon />, label: 'Home' },
    { icon: <SearchIcon />, label: 'Search' },
    { icon: <ProfileIcon />, activeIcon: <ProfileFilledIcon />, label: 'Profile' },
  ]}
  activeIndex={tab}
  onChange={setTab}
/>
```

### Fixed to viewport bottom

```tsx
<BottomNavigation
  items={navItems}
  activeIndex={activeTab}
  onChange={setActiveTab}
  style={{ position: 'fixed', bottom: 0, left: 0, zIndex: 100 }}
/>
```

## Design Rules

- Always provide 2-5 items. The component caps at `MAX_ITEMS = 5`.
- `activeIndex` is automatically clamped to `[0, items.length - 1]` -- out-of-range values are safe.
- Keep labels short (6 chars or fewer) to prevent truncation.
- Use filled/solid icon variants for active state via `activeIcon` for clear visual distinction.
- The component is 68px tall with a top border separator.
- Background uses `backdrop-filter: blur(20px)` for a frosted-glass effect.
- Press interaction: pill scales down to 0.88 on press with a spring-back animation on release.

## Accessibility

- Root element: `<nav role="tablist" aria-label="...">`
- Each tab: `<button role="tab" aria-selected={isActive} aria-label={item.label}>`
- Active tab gets `tabIndex={0}`, inactive tabs get `tabIndex={-1}` for roving tabindex.

## Token Usage

| Token | Value | Usage |
|-------|-------|-------|
| `cssVarColors.content.base.default` | -- | Active icon/label color |
| `cssVarColors.content.base.secondary` | -- | Inactive icon/label color |
| `cssVarColors.fill.alternative` | -- | Pill background on press/hover |
| `cssVarColors.surface.base.default` | -- | Nav bar background |
| `cssVarColors.border.base.default` | -- | Top border color |
| `borderWidth.default` | 1px | Top border thickness |
| `radius.primitive.md` | -- | Pill border radius |
| `spacing.primitive[1]` | 4px | Pill vertical padding and gap |
| `typography.fontSize['3xs']` | -- | Label font size |
| `typography.fontWeight.medium` | -- | Label font weight |
| `duration.fast` | -- | Background color transition |
| `duration.slow` | -- | Spring-back scale transition |
| `easing.spring` | -- | Release animation easing |
