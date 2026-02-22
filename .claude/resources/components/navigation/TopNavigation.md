# TopNavigation

> Status: stable
> Import: `import { TopNavigation } from '@baerae-zkap/design-system'`

## What It Is

An app bar / top navigation header with support for a leading button, centered or left-aligned title, trailing action buttons, and an optional toolbar row. Offers four variants (normal, display, floating, search) and scroll-aware visual effects.

## When to Use

- Page-level header with back button and title
- App bar with search field
- Display-style header with large left-aligned title
- Floating header that appears on scroll

## When NOT to Use

- Bottom app navigation -- use `BottomNavigation`
- In-page tab switching -- use `Tab`
- Breadcrumb-style navigation -- build custom

## Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'normal' \| 'display' \| 'floating' \| 'search'` | `'normal'` | No | Visual layout variant |
| `title` | `string` | -- | No | Title text |
| `leadingButton` | `ReactNode` | -- | No | Left slot (e.g., back button) |
| `trailingButtons` | `ReactNode` | -- | No | Right slot (e.g., search, share, menu icons) |
| `toolbar` | `ReactNode` | -- | No | Additional row below the header (e.g., Tab, SearchField) |
| `fixed` | `boolean` | `false` | No | Fix to top of viewport |
| `pad` | `boolean` | `false` | No | Add horizontal padding to header row |
| `scrollEffect` | `'none' \| 'floating' \| 'overlay'` | `'none'` | No | Scroll-aware background effect (requires `fixed`) |
| `searchPlaceholder` | `string` | `'검색어를 입력하세요.'` | No | Placeholder for search variant |
| `searchValue` | `string` | -- | No | Current search text (search variant) |
| `className` | `string` | -- | No | CSS class on root `<nav>` |
| `aria-label` | `string` | -- | No | Accessible label for the navigation |

## Common Patterns

### Standard page header

```tsx
<TopNavigation
  title="Settings"
  leadingButton={<IconButton aria-label="Back" onClick={goBack}><ChevronLeftIcon /></IconButton>}
  trailingButtons={<IconButton aria-label="More"><MoreIcon /></IconButton>}
/>
```

### Display variant (large title)

```tsx
<TopNavigation
  variant="display"
  title="My Library"
  trailingButtons={<IconButton aria-label="Search"><SearchIcon /></IconButton>}
/>
```

### Fixed header with floating scroll effect

```tsx
<TopNavigation
  title="Feed"
  fixed
  scrollEffect="floating"
  leadingButton={<IconButton aria-label="Menu"><MenuIcon /></IconButton>}
/>
```

### Search variant

```tsx
<TopNavigation
  variant="search"
  searchValue={query}
  searchPlaceholder="Search products..."
  leadingButton={<IconButton aria-label="Back" onClick={goBack}><ChevronLeftIcon /></IconButton>}
/>
```

### With toolbar row

```tsx
<TopNavigation
  title="Products"
  toolbar={
    <Tab
      items={[{ label: 'All', value: 'all' }, { label: 'New', value: 'new' }]}
      value={tab}
      onChange={setTab}
    />
  }
/>
```

## Design Rules

- **normal**: Centered title, standard height (`spacing.component.header.height`).
- **display**: Left-aligned large bold title, taller height (`spacing.primitive[16]`).
- **floating**: Always has shadow (`cssVarShadow.semantic.header.scrolled`), standard height.
- **search**: Replaces title area with a display-only search text (renders a `<span>`, not an `<input>`). Use `searchValue` to show the current query and `searchPlaceholder` for the empty state. To capture user input, navigate to a dedicated search page on tap.
- When `fixed` + `scrollEffect="floating"`: background transitions from transparent to solid + shadow on scroll.
- When `fixed` + `scrollEffect="overlay"`: background transitions from transparent to solid + backdrop blur on scroll.
- Leading slot is a 44px touch target square. Trailing slot is flex with a 4px gap.
- Centered title (normal/floating) uses `position: absolute` + `translateX(-50%)` with max-width `calc(100% - 112px)` to avoid overlapping side buttons.
- Uses `zIndex.sticky` when fixed.

## Accessibility

- Root: `<nav aria-label="...">`
- All icon buttons in leading/trailing slots must have `aria-label`.
- Search variant includes a search icon marked `aria-hidden="true"`.

## Token Usage

| Token | Value | Usage |
|-------|-------|-------|
| `cssVarColors.surface.base.default` | -- | Header background |
| `cssVarColors.surface.base.alternative` | -- | Search field background |
| `cssVarColors.content.base.default` | -- | Title text color, search value color |
| `cssVarColors.content.base.secondary` | -- | Search icon stroke |
| `cssVarColors.content.base.placeholder` | -- | Search placeholder color |
| `cssVarShadow.semantic.header.scrolled` | -- | Floating variant / scroll shadow |
| `zIndex.sticky` | -- | Fixed position z-index |
| `spacing.component.header.height` | -- | Normal/floating/search header height |
| `spacing.component.header.paddingX` | -- | Horizontal padding when `pad` is true |
| `spacing.semantic.minTouchTarget` | 44px | Leading/trailing button slot size |
| `spacing.primitive[16]` | -- | Display variant header height |
| `spacing.primitive[1]` | 4px | Trailing buttons gap |
| `radius.component.input.default` | -- | Search field border radius |
| `typography.fontSize.md` | -- | Normal title font size |
| `typography.fontSize.lg` | -- | Display title font size |
| `typography.fontSize.sm` | -- | Search field font size |
| `typography.fontWeight.semibold` | -- | Normal title weight |
| `typography.fontWeight.bold` | -- | Display title weight |
| `transitions.all` | -- | Background/shadow transitions |
