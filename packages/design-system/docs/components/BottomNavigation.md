# BottomNavigation

> Fixed bottom tab bar for switching between the app's top-level sections.

## When to Use

- Providing access to 2–5 primary destinations that users navigate between frequently.
- Mobile or mobile-web layouts where a persistent tab bar is the primary navigation pattern.
- Sections that are peers — none is a sub-page of another.

## When NOT to Use

- More than 5 top-level destinations — consider a drawer or nested navigation instead.
- Tablet or desktop layouts where a side rail or top nav is more appropriate.
- Secondary or contextual navigation within a section — use `Tab` instead.
- When the current screen is a detail view that should show a back button only.

## Import

```tsx
import { BottomNavigation } from '@baerae-zkap/design-system';
import type { BottomNavigationItem, BottomNavigationProps } from '@baerae-zkap/design-system';
```

## Props

### BottomNavigationProps

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `items` | `BottomNavigationItem[]` | — | Yes | Tab list. 2–5 items; items beyond the 5th are silently ignored. |
| `activeIndex` | `number` | — | Yes | Zero-based index of the currently active tab. Clamped to valid range. |
| `onChange` | `(index: number) => void` | — | No | Called when a tab is selected, receiving its index. |
| `className` | `string` | — | No | Additional CSS class applied to the root `<nav>` element. |
| `style` | `CSSProperties` | — | No | Inline styles merged onto the root `<nav>` element. |

### BottomNavigationItem

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `icon` | `ReactNode` | — | Yes | Default (inactive) icon. |
| `activeIcon` | `ReactNode` | — | No | Icon shown when the tab is active. Falls back to `icon` if omitted. |
| `label` | `string` | — | Yes | Tab label text. Max 6 characters recommended. |
| `onClick` | `() => void` | — | No | Additional click handler for the tab item, called alongside `onChange`. |

## Basic Usage

```tsx
import { BottomNavigation } from '@baerae-zkap/design-system';
import { HomeIcon, SearchIcon, ProfileIcon } from './icons';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BottomNavigation
      items={[
        { icon: <HomeIcon />, label: 'Home' },
        { icon: <SearchIcon />, label: 'Search' },
        { icon: <ProfileIcon />, label: 'Profile' },
      ]}
      activeIndex={activeTab}
      onChange={setActiveTab}
    />
  );
}
```

## Variants

### Active / Inactive Icon

Provide `activeIcon` to swap icons when a tab becomes selected (e.g., filled vs. outline icon).

```tsx
items={[
  {
    icon: <HomeOutlineIcon />,
    activeIcon: <HomeFilledIcon />,
    label: 'Home',
  },
]}
```

### Per-Tab Click Handler

Use the item-level `onClick` for side effects (analytics, reset scroll) without replacing `onChange`.

```tsx
items={[
  {
    icon: <HomeIcon />,
    label: 'Home',
    onClick: () => analytics.track('tab_home'),
  },
]}
```

## States

| State | Behavior |
|-------|----------|
| Active | Icon and label render in `content.base.default` (primary text color). |
| Inactive | Icon and label render in `content.base.secondary` (muted). |
| Hover | Pill background appears (`surface.base.defaultPressed`). |
| Pressed | Pill scales down slightly (`scale(0.97)`) with a quick snap animation, then springs back. |

## Accessibility

- The root element renders as `<nav role="tablist">`.
- Each tab button has `role="tab"` and `aria-selected` set to `true`/`false`.
- The active tab has `tabIndex={0}`; all other tabs have `tabIndex={-1}` (roving tabindex pattern).
- Each button carries `aria-label={item.label}` for screen readers.
- Ensure icon-only communication is supplemented by visible label text — both are always rendered.

## Do / Don't

**Do** keep labels short (1–2 words, 6 characters max) so they fit without truncation across all item counts.

**Don't** use BottomNavigation for fewer than 2 or more than 5 destinations — it silently drops items beyond 5.

**Do** pair `onChange` with a router (e.g., `next/navigation` or React Router) to keep URL and active tab in sync.

**Don't** use BottomNavigation inside a scroll container — it should always be fixed to the viewport bottom.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.base.default` | Nav background |
| `cssVarColors.border.base.default` | Top border separator |
| `cssVarColors.content.base.default` | Active icon/label color |
| `cssVarColors.content.base.secondary` | Inactive icon/label color |
| `cssVarColors.surface.base.defaultPressed` | Pill hover/press background |
| `radius.primitive.md` | Pill border radius |
| `spacing.primitive[1]` | Pill vertical padding and icon-label gap |
| `duration.fast`, `duration.slow`, `easing.easeOut`, `easing.spring` | Press animation |
| `borderWidth.default` | Top border width |

## Related Components

- `Tab` — Horizontal tab strip for switching views within a section.
- `CategoryNavigation` — Scrollable category chip row for filtering content.
- `TopNavigation` — App bar at the top of a screen.
