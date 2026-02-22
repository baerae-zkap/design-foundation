# Radio

> A single-selection control used within a `RadioGroup` to pick one option from a mutually exclusive set.

## When to Use
- Selecting exactly one option from a small set (2–5 choices)
- Settings screens where the user must commit to one value (payment method, notification frequency)
- Forms where the options need to be visible simultaneously for comparison

## When NOT to Use
- Multiple selections allowed → Use `Checkbox` instead
- Tab-style exclusive view switching → Use `SegmentedControl` instead
- More than ~6 options → Consider a different pattern (radio lists become unwieldy)
- Immediate binary on/off toggle → Use `Switch` instead

## Import
```tsx
import { Radio, RadioGroup } from '@baerae-zkap/design-system';
```

---

## RadioGroup

`RadioGroup` is the required wrapper that manages shared state, keyboard navigation, and ARIA semantics. Always wrap `Radio` items inside a `RadioGroup`.

### RadioGroup Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Currently selected value (controlled) |
| `defaultValue` | `string` | — | Initial selected value (uncontrolled) |
| `onChange` | `(value: string) => void` | — | Called with the newly selected value |
| `children` | `ReactNode` | — | `Radio` components to render |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction of radio items |
| `size` | `'small' \| 'medium'` | `'medium'` | Inherited by all child `Radio` items |
| `disabled` | `boolean` | — | Disables all radio items in the group |
| `invalid` | `boolean` | — | Marks all radio items as invalid |
| `aria-label` | `string` | — | Accessible label for the group |
| `aria-labelledby` | `string` | — | Points to an external label element |

---

## Radio Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **required** | Value this radio represents; matched against `RadioGroup.value` |
| `label` | `ReactNode` | — | Label rendered to the right of the control |
| `description` | `ReactNode` | — | Secondary text rendered below the label |
| `size` | `'small' \| 'medium'` | `'medium'` | Control size — 20px (small) or 24px (medium); overrides group size |
| `disabled` | `boolean` | `false` | Disables this individual radio item |
| `invalid` | `boolean` | `false` | Shows error border on this individual radio |
| `aria-label` | `string` | — | Accessibility label; required when `label` is not provided |
| `id` | `string` | auto | Custom id; auto-generated when omitted |

Forwards `ref` to the outer `<label>` element.

---

## Basic Usage
```tsx
<RadioGroup value={plan} onChange={setPlan} aria-label="Subscription plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="enterprise" label="Enterprise" />
</RadioGroup>
```

## Controlled
```tsx
const [method, setMethod] = useState('card');

<RadioGroup value={method} onChange={setMethod} aria-label="Payment method">
  <Radio value="card" label="Credit card" />
  <Radio value="bank" label="Bank transfer" />
  <Radio value="paypal" label="PayPal" />
</RadioGroup>
```

## With Descriptions
```tsx
<RadioGroup value={tier} onChange={setTier} aria-label="Notification frequency">
  <Radio
    value="realtime"
    label="Real-time"
    description="Notified as events happen"
  />
  <Radio
    value="daily"
    label="Daily digest"
    description="One summary email per day"
  />
  <Radio
    value="none"
    label="None"
    description="No notifications"
  />
</RadioGroup>
```

## Horizontal Layout
```tsx
<RadioGroup value={gender} onChange={setGender} orientation="horizontal" aria-label="Gender">
  <Radio value="m" label="Male" />
  <Radio value="f" label="Female" />
  <Radio value="other" label="Other" />
</RadioGroup>
```

## Sizes
```tsx
<RadioGroup value={v} onChange={setV} size="small" aria-label="Size demo">
  <Radio value="a" label="Small control" />
</RadioGroup>

<RadioGroup value={v} onChange={setV} size="medium" aria-label="Size demo">
  <Radio value="a" label="Medium control" />
</RadioGroup>
```

## Disabled
```tsx
// Disable the entire group
<RadioGroup value={plan} onChange={setPlan} disabled aria-label="Plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>

// Disable a single option
<RadioGroup value={plan} onChange={setPlan} aria-label="Plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro (unavailable)" disabled />
</RadioGroup>
```

## Validation Error
```tsx
<RadioGroup value={selected} onChange={setSelected} invalid aria-label="Required choice">
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
</RadioGroup>
```

## States (per Radio item)
- **Unselected** — Empty circle with neutral border
- **Selected** — Brand border with filled brand dot in the center
- **Hovered** — Border shifts to secondary color
- **Pressed** — Border shifts to pressed token, subtle scale feedback
- **Disabled** — Opacity reduced, cursor `not-allowed`
- **Invalid** — Error-colored border when unselected

## Accessibility
- `RadioGroup` renders `role="radiogroup"` with `aria-label` or `aria-labelledby`
- Each `Radio` uses a hidden native `<input type="radio">` with a shared `name` (auto-generated via `useId`)
- `aria-invalid` propagated from group or individual radio
- Keyboard: `Tab` moves focus to the group, Arrow keys cycle through options within the group
- `aria-label` required on `Radio` when no visible `label` prop is provided

## Do / Don't
- Do: Always wrap `Radio` components in a `RadioGroup`
- Do: Provide `aria-label` or `aria-labelledby` on `RadioGroup`
- Do: Use `description` to add context when labels alone are ambiguous
- Do: Use `disabled` on individual `Radio` items to indicate unavailable options
- Don't: Use `Radio` outside a `RadioGroup` — it depends on context state
- Don't: Use `Radio` when multiple selections are valid — use `Checkbox`
- Don't: Use for tab-style switching — use `SegmentedControl`
- Don't: Show more than ~6 radio options in a vertical list without a better pattern

## Design Tokens Used
- **Colors**: `cssVarColors.surface.brand.default`, `cssVarColors.surface.base.default`, `cssVarColors.border.base.*`, `cssVarColors.border.error.default`, `cssVarColors.content.base.*`
- **Spacing**: `spacing.primitive[1]`, `spacing.primitive[2]`, `spacing.primitive[4]`
- **Radius**: `radius.primitive.full`
- **Typography**: `typography.fontSize.md`, `typography.fontSize.sm`, `typography.fontWeight.regular`
- **Border**: `borderWidth.medium`
- **Opacity**: `opacity.disabled`
- **Motion**: `transitions.all`

## Related Components
- `Checkbox` — Multi-select boolean; use when more than one option can be chosen
- `SegmentedControl` — Exclusive tab-style selector; prefer for view/mode switching with 2–5 compact options
- `Switch` — Binary immediate-effect toggle; prefer for settings that apply on toggle
