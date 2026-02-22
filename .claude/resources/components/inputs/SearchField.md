# SearchField

> Status: stable
> Import: `import { SearchField } from '@baerae-zkap/design-system'`

## What It Is
A search-specific text input with a built-in leading search icon and a clear button that appears when the field has a value. Supports controlled and uncontrolled modes with search and clear callbacks.

## When to Use
- Search bars at the top of list or content pages
- Filter inputs for tables or catalogs
- Any text input where the primary intent is search/filter

## When NOT to Use
- General text input -- use `TextField` instead
- Multi-line search queries -- use `TextArea` instead
- Dropdown filter selection -- use `Select` instead

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | -- | Label text displayed above the input |
| `placeholder` | `string` | `'검색'` | Placeholder text |
| `value` | `string` | -- | Controlled value |
| `defaultValue` | `string` | -- | Initial value (uncontrolled mode) |
| `onChange` | `(value: string) => void` | -- | Called on every keystroke with the string value |
| `onBlur` | `FocusEventHandler` | -- | Blur event handler |
| `onSearch` | `(value: string) => void` | -- | Called on Enter keypress |
| `onClear` | `() => void` | -- | Called after the value is cleared (via clear button or Escape key) |
| `disabled` | `boolean` | `false` | Disabled state |
| `aria-label` | `string` | -- | Accessibility label (required when no `label` prop) |
| `id` | `string` | auto-generated | Custom input id |
| `style` | `CSSProperties` | -- | Additional container styles |

## Common Patterns

### Basic Search
```tsx
<SearchField
  placeholder="Search products..."
  onSearch={(query) => handleSearch(query)}
/>
```

### Controlled with Clear
```tsx
const [query, setQuery] = useState('');

<SearchField
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
  onClear={() => setQuery('')}
/>
```

### With Label
```tsx
<SearchField label="Search" placeholder="Enter keywords" />
```

### Disabled
```tsx
<SearchField disabled placeholder="Search unavailable" />
```

## Design Rules
- Fixed height of 48px
- Search icon is positioned at the left (`spacing.primitive[3]` = 12px inset)
- Clear button appears only when the field has a value and is not disabled
- Input left padding is 40px to accommodate the search icon
- Input right padding adjusts based on clear button visibility (40px with button, 16px without)
- Border color transitions: default -> hover (secondary) -> focused (brand)
- Escape key clears the field and blurs the input
- Enter key triggers `onSearch` callback
- The component is wrapped in a `role="search"` container

## Accessibility
- Container has `role="search"` for semantic search landmark
- Label is connected to input via `htmlFor`/`id` pairing
- When no label is provided, `aria-label` falls back to `placeholder`
- Clear button has `aria-label="검색어 지우기"` (Clear search text)
- Input uses native `type="search"` for browser-level search semantics
- Search and clear icons are `aria-hidden="true"` and `focusable="false"`

## Token Usage

| Property | Token |
|----------|-------|
| Input height | 48px (hardcoded) |
| Border radius | `radius.component.input.default` |
| Border width | `borderWidth.medium` |
| Border color (default) | `cssVarColors.border.base.default` |
| Border color (hover) | `cssVarColors.border.secondary.default` |
| Border color (focus) | `cssVarColors.border.brand.default` |
| Background (normal) | `cssVarColors.surface.base.default` |
| Background (disabled) | `cssVarColors.surface.base.alternative` |
| Disabled opacity | `opacity.disabled` |
| Label font size | `typography.fontSize.sm` |
| Label font weight | `typography.fontWeight.medium` |
| Label color | `cssVarColors.content.base.default` |
| Label color (disabled) | `cssVarColors.content.disabled.default` |
| Input font size | `typography.fontSize.md` |
| Input text color | `cssVarColors.content.base.default` |
| Icon color | `cssVarColors.content.base.secondary` |
| Label gap | `spacing.primitive[1]` (4px) |
| Search icon inset | `spacing.primitive[3]` (12px) |
| Clear button inset | `spacing.primitive[3]` (12px) |
| Transition | `transitions.all` |
