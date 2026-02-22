# TopNavigation

> App bar fixed to the top of a screen, providing a title, leading back/menu button, and trailing actions.

## When to Use

- Every screen that needs a persistent header with a title and navigation controls.
- Detail screens requiring a back button and contextual trailing actions (share, more options).
- Search-mode screens where the title area becomes a search input field.
- Hero-style screens where the title is large and left-aligned (`display` variant).

## When NOT to Use

- Modal sheets or dialogs — use a simple inline header instead.
- Screens without a title or navigation context where a header adds no value.
- When a custom fully-bespoke header is required that the four variants cannot accommodate.

## Import

```tsx
import { TopNavigation } from '@baerae-zkap/design-system';
import type {
  TopNavigationScrollEffect,
  TopNavigationVariant,
  TopNavigationProps,
} from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'normal' \| 'display' \| 'floating' \| 'search'` | `'normal'` | No | Visual style of the header. See Variants section for details. |
| `title` | `string` | — | No | Header title text. Centered in `normal`/`floating`; large left-aligned in `display`; hidden in `search`. |
| `leadingButton` | `ReactNode` | — | No | Button slot at the leading (left) edge. Typically a back or menu `IconButton`. |
| `trailingButtons` | `ReactNode` | — | No | Button slot(s) at the trailing (right) edge. Accepts one or more icon buttons. |
| `toolbar` | `ReactNode` | — | No | Optional row rendered below the main header row (e.g., a `Tab` or `CategoryNavigation` strip). |
| `fixed` | `boolean` | `false` | No | When `true`, positions the header as `position: fixed` at the top of the viewport with sticky z-index. |
| `pad` | `boolean` | `false` | No | When `true`, adds horizontal padding to the header row. |
| `scrollEffect` | `'none' \| 'floating' \| 'overlay'` | `'none'` | No | Effect applied when the page is scrolled. Only active when `fixed` is `true`. |
| `searchPlaceholder` | `string` | `'검색어를 입력하세요.'` | No | Placeholder text for the search input in `search` variant. |
| `searchValue` | `string` | — | No | Current value displayed in the search field in `search` variant. |
| `className` | `string` | — | No | Additional CSS class on the root `<nav>` element. |
| `aria-label` | `string` | — | No | Accessible label for the `<nav>` landmark. |

### Variant Reference

| Variant | Title Style | Use Case |
|---------|-------------|----------|
| `normal` | Centered, semibold, 16px | Standard page header |
| `display` | Left-aligned, bold, 18px, taller bar | Hero/home screen with large title |
| `floating` | Centered, always has drop shadow | Overlaid header that always floats |
| `search` | Replaced by a search input field | Search screen or search-mode header |

### Scroll Effect Reference (requires `fixed`)

| Effect | Behavior |
|--------|----------|
| `none` | Solid background always visible. |
| `floating` | Transparent until scroll begins; then solid background + drop shadow appear. |
| `overlay` | Transparent until scroll begins; then solid background + backdrop blur appear. |

## Basic Usage

```tsx
import { TopNavigation } from '@baerae-zkap/design-system';
import { IconButton } from '@baerae-zkap/design-system';

function ProductPage() {
  return (
    <TopNavigation
      title="Product Detail"
      leadingButton={
        <IconButton aria-label="Go back" onClick={() => router.back()}>
          <BackIcon />
        </IconButton>
      }
      trailingButtons={
        <IconButton aria-label="Share" onClick={onShare}>
          <ShareIcon />
        </IconButton>
      }
      fixed
      scrollEffect="floating"
    />
  );
}
```

## Variants

### Normal (Default)

Centered title with leading and trailing button slots.

```tsx
<TopNavigation
  title="Settings"
  leadingButton={<IconButton aria-label="Back"><BackIcon /></IconButton>}
/>
```

### Display

Larger, left-aligned title for home or hero screens.

```tsx
<TopNavigation
  variant="display"
  title="Explore"
  trailingButtons={<IconButton aria-label="Notifications"><BellIcon /></IconButton>}
/>
```

### Floating

Always shows a drop shadow regardless of scroll position — for headers that visually float above content.

```tsx
<TopNavigation variant="floating" title="My Orders" fixed />
```

### Search

Replaces the title area with a read-only search field (acts as a tap target to open a search screen).

```tsx
<TopNavigation
  variant="search"
  leadingButton={<IconButton aria-label="Back"><BackIcon /></IconButton>}
  searchPlaceholder="Search products..."
  searchValue={query}
/>
```

### With Toolbar

Attach a `Tab` or `CategoryNavigation` below the header row.

```tsx
<TopNavigation
  title="Shop"
  toolbar={
    <Tab items={tabs} value={activeTab} onChange={setActiveTab} />
  }
  fixed
/>
```

### Scroll Effects

```tsx
{/* Fade in background on scroll */}
<TopNavigation title="Feed" fixed scrollEffect="floating" />

{/* Frosted glass blur on scroll */}
<TopNavigation title="Feed" fixed scrollEffect="overlay" />
```

## States

| State | Behavior |
|-------|----------|
| Default (not fixed) | `position: relative`; no scroll tracking. |
| Fixed, not scrolled (`scrollEffect: 'floating'`) | Transparent background, no shadow. |
| Fixed, scrolled (`scrollEffect: 'floating'`) | Solid `surface.base.default` background + `header.scrolled` shadow. |
| Fixed, scrolled (`scrollEffect: 'overlay'`) | Solid background + `backdrop-filter: blur(12px)`. |
| `variant: 'floating'` | Always solid background + shadow regardless of scroll state. |

## Accessibility

- Renders as a `<nav>` landmark element.
- Provide `aria-label` when multiple `<nav>` elements exist on the page to distinguish them.
- `leadingButton` and `trailingButtons` should be `IconButton` components, each with a descriptive `aria-label`.
- In `search` variant, the search field displays the current `searchValue` or `searchPlaceholder`; wire the container to open a proper search input on tap.
- Title text uses `pointer-events: none` in centered layouts to prevent blocking button interaction.

## Do / Don't

**Do** set `fixed` and an appropriate `scrollEffect` for content-heavy pages so the header stays accessible while scrolling.

**Don't** use `variant="display"` for detail or settings screens — its large title is designed for top-level home screens only.

**Do** use `toolbar` to attach a `Tab` strip so the header and tabs scroll together as a unit.

**Don't** put more than 3 icon buttons in `trailingButtons` — the slot has minimum width constraints but will overflow on small screens.

**Do** provide `aria-label` on the `<TopNavigation>` when using multiple nav landmarks on a single page.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.surface.base.default` | Header background (most variants) |
| `cssVarColors.surface.base.alternative` | Search field background |
| `cssVarColors.content.base.default` | Title text; search value text |
| `cssVarColors.content.base.secondary` | Search icon stroke |
| `cssVarColors.content.base.placeholder` | Search placeholder text |
| `cssVarShadow.semantic.header.scrolled` | Drop shadow when scrolled or `floating` variant |
| `radius.component.input.default` | Search field border radius |
| `spacing.component.header.height` | Header row height (`normal`/`floating`/`search`) |
| `spacing.primitive[16]` | Header row height (`display` variant) |
| `spacing.component.header.paddingX` | Horizontal padding when `pad` is `true` |
| `spacing.semantic.minTouchTarget` | Leading/trailing slot minimum width and height |
| `spacing.primitive[1]` | Gap between trailing buttons |
| `spacing.primitive[2]`, `spacing.primitive[3]` | Search field internal padding and gap |
| `spacing.primitive[10]` | Search field height |
| `typography.fontSize.md`, `typography.fontWeight.semibold` | Normal variant title |
| `typography.fontSize.lg`, `typography.fontWeight.bold` | Display variant title |
| `typography.fontSize.sm` | Search field text |
| `zIndex.sticky` | Z-index when `fixed` is `true` |

## Related Components

- `BottomNavigation` — Fixed bottom tab bar for top-level section switching.
- `Tab` — Tab strip, commonly used as a `toolbar` child of TopNavigation.
- `CategoryNavigation` — Category chip row, also usable as a `toolbar` child.
- `IconButton` — Standard component for `leadingButton` and `trailingButtons` slots.
