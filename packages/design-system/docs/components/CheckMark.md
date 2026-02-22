# CheckMark

> A lightweight check indicator rendered as an icon only — no box or circle container. Used for read-only confirmation states, table rows, and inline status display.

## When to Use
- Read-only confirmation or completion indicators in tables and lists
- Inline "included" / "not included" feature comparison grids
- Lightweight interactive toggles where a minimal footprint is required
- Anywhere a full `Checkbox` box is visually too heavy

## When NOT to Use
- Form submission checkboxes → Use `Checkbox` instead (has the familiar box affordance)
- Binary settings toggle → Use `Switch` instead
- When users need a strong, obvious interactive affordance → Use `Checkbox`

## Import
```tsx
import { CheckMark } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial checked state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | — | Called with the new boolean value on change |
| `label` | `ReactNode` | — | Label rendered to the right of the icon |
| `description` | `ReactNode` | — | Secondary text rendered below the label |
| `size` | `'small' \| 'medium'` | `'medium'` | Icon size — small (14×11px) or medium (18×14px) |
| `disabled` | `boolean` | `false` | Disables interaction; reduces opacity |
| `invalid` | `boolean` | `false` | Shows the icon in error color |
| `aria-label` | `string` | — | Accessibility label; required when `label` is not provided |
| `id` | `string` | auto | Custom id; auto-generated when omitted |

Forwards `ref` to the outer `<label>` element.

## Basic Usage
```tsx
// Read-only indicator (no onChange)
<CheckMark checked label="Email verified" />
```

## Interactive Toggle
```tsx
const [agreed, setAgreed] = useState(false);

<CheckMark
  checked={agreed}
  onChange={setAgreed}
  label="I confirm this information is correct"
/>
```

## Sizes
```tsx
<CheckMark size="small" checked label="Small" />
<CheckMark size="medium" checked label="Medium" />
```

## With Description
```tsx
<CheckMark
  checked={included}
  label="Priority support"
  description="Response within 4 hours on business days"
/>
```

## Invalid State
```tsx
<CheckMark
  invalid={!confirmed}
  label="Confirmation required"
/>
```

## Feature Comparison Grid
```tsx
// Icon-only indicators in a table
<CheckMark checked aria-label="Included in Pro" />
<CheckMark aria-label="Not included in Free" />
```

## Disabled
```tsx
<CheckMark disabled checked label="Locked feature" />
```

## Icon Color Logic
| State | Icon Color |
|-------|-----------|
| Checked | Brand color (`content.brand.default`) |
| Unchecked | Secondary text (`content.base.secondary`) |
| Invalid (unchecked) | Error color (`content.error.default`) |

The icon is always visible — it renders in secondary color when unchecked, brand color when checked, and error color when invalid. This differs from `Checkbox`, which hides its checkmark when unchecked.

## States
- **Unchecked** — Check icon in secondary color
- **Checked** — Check icon in brand color
- **Hovered** — Icon opacity 0.8
- **Pressed** — Icon opacity 0.6
- **Disabled** — Full component opacity reduced, cursor `not-allowed`
- **Invalid** — Icon in error color (when unchecked)

## Accessibility
- Hidden native `<input type="checkbox">` drives keyboard and screen reader behavior
- `aria-invalid` set when `invalid={true}`
- `aria-label` required when no visible `label` prop is provided
- Keyboard: `Tab` to focus, `Space` to toggle

## Do / Don't
- Do: Use `CheckMark` for lightweight or read-only check states in dense UI
- Do: Provide `aria-label` when rendering without a `label` (e.g., in table cells)
- Do: Use `Checkbox` when users need a strong, familiar form control affordance
- Don't: Use `CheckMark` as the primary form control for important agreements — use `Checkbox` for its stronger visual affordance
- Don't: Rely on color alone to communicate checked vs unchecked — the icon shape differs between states
- Don't: Omit `aria-label` in icon-only usage

## Design Tokens Used
- **Colors**: `cssVarColors.content.brand.default`, `cssVarColors.content.error.default`, `cssVarColors.content.base.secondary`, `cssVarColors.content.base.default`
- **Spacing**: `spacing.primitive[1]`, `spacing.primitive[2]`
- **Typography**: `typography.fontSize.md`, `typography.fontSize.sm`, `typography.fontWeight.regular`
- **Opacity**: `opacity.disabled`
- **Motion**: `transitions.all`

## Related Components
- `Checkbox` — Full box-style boolean control; prefer for form submission and when affordance matters
- `Switch` — Binary immediate-effect toggle
- `Radio` — Single selection from a mutually exclusive group
