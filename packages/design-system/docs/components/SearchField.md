# SearchField

> A single-line search input with a built-in search icon, clear button, and keyboard shortcuts.

## When to Use
- Search bars within a page or section (product search, user search, filter by name)
- Any input whose primary purpose is querying or filtering content
- When users need a quick way to clear the current query

## When NOT to Use
- General text collection (name, email, phone) → Use `TextField` instead
- Multi-line input → Use `TextArea` instead
- If the field submits as part of a larger form → Use `TextField` with `type="search"`

## Import
```tsx
import { SearchField } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Optional label rendered above the input |
| `placeholder` | `string` | `'검색'` | Placeholder text |
| `value` | `string` | — | Controlled value |
| `defaultValue` | `string` | — | Initial value (uncontrolled) |
| `onChange` | `(value: string) => void` | — | Called with the string value on every keystroke |
| `onBlur` | `React.FocusEventHandler<HTMLInputElement>` | — | Blur event handler |
| `onSearch` | `(value: string) => void` | — | Called when Enter is pressed or the search icon is activated |
| `onClear` | `() => void` | — | Called after the clear button resets the value |
| `disabled` | `boolean` | `false` | Disables the input and suppresses all interaction |
| `aria-label` | `string` | — | Accessibility label; required when `label` is not provided |
| `id` | `string` | auto | Custom input id; auto-generated when omitted |
| `style` | `React.CSSProperties` | — | Additional styles applied to the container element |

Forwards `ref` to the underlying `<input>` element.

## Basic Usage
```tsx
<SearchField placeholder="Search products" onSearch={(q) => search(q)} />
```

## Controlled
```tsx
const [query, setQuery] = useState('');

<SearchField
  value={query}
  onChange={setQuery}
  onSearch={(q) => runSearch(q)}
  onClear={() => setQuery('')}
/>
```

## With Label
```tsx
<SearchField label="Find a member" placeholder="Enter name or email" />
```

## Disabled
```tsx
<SearchField disabled placeholder="Search unavailable" />
```

## Keyboard Behavior
| Key | Effect |
|-----|--------|
| `Enter` | Triggers `onSearch` with current value |
| `Escape` | Clears the field and removes focus |

## States
- **Default** — Neutral border, search icon visible on the left
- **Focused** — Border switches to brand color
- **Hovered** — Border shifts to secondary color
- **Has value** — Clear (×) button appears on the right
- **Disabled** — Background dims, opacity reduced, cursor `not-allowed`, clear button hidden

## Accessibility
- Renders with `role="search"` on the container
- Input uses `type="search"` for native search semantics
- When `label` is absent, falls back to `aria-label` prop, then `placeholder`
- Clear button has `aria-label="검색어 지우기"`
- `id` is auto-generated via `useId()` to keep `<label>` association intact

## Do / Don't
- Do: Provide `onSearch` to handle query submission
- Do: Use `onClear` to reset upstream state in controlled mode
- Do: Add `aria-label` when no visible `label` is shown
- Don't: Use for generic text collection — use `TextField` instead
- Don't: Set `type` manually; the component uses `type="search"` internally
- Don't: Suppress the clear button by controlling value to empty — let `onClear` handle it

## Design Tokens Used
- **Colors**: `cssVarColors.border.brand.default`, `cssVarColors.border.secondary.default`, `cssVarColors.border.base.default`, `cssVarColors.surface.base.*`, `cssVarColors.content.base.*`
- **Spacing**: `spacing.primitive[1]`, `spacing.primitive[3]`, `spacing.primitive[4]`, `spacing.primitive[10]`
- **Radius**: `radius.component.input.default`, `radius.primitive.full`
- **Typography**: `typography.fontSize.sm`, `typography.fontSize.md`, `typography.fontWeight.medium`
- **Border**: `borderWidth.medium`
- **Opacity**: `opacity.disabled`
- **Motion**: `transitions.all`

## Related Components
- `TextField` — General-purpose single-line text input with label and validation
- `TextArea` — Multi-line text input
- `Chip` — Selectable filter tags; often used alongside a search field to narrow results
