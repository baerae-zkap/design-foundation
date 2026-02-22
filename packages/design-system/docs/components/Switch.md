# Switch

> A binary on/off toggle that takes effect immediately when activated.

## When to Use
- Settings that turn on or off right away (dark mode, notifications, feature flags)
- Enabling or disabling a feature without requiring a form submission
- Any boolean preference where the user expects instant feedback

## When NOT to Use
- Values submitted as part of a form → Use `Checkbox` instead
- Selecting one from multiple options → Use `Radio` / `RadioGroup` instead
- Selecting multiple independent items → Use `Checkbox` instead

**Tie-breaker — Switch vs Checkbox:** Use `Switch` when the toggle has an immediate effect (no Submit button needed). Use `Checkbox` when the value is collected and submitted together with other fields.

## Import
```tsx
import { Switch } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | — | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Initial state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | — | Called with the new boolean value on toggle |
| `label` | `ReactNode` | — | Label rendered to the right of the track |
| `description` | `ReactNode` | — | Secondary text rendered below the label |
| `size` | `'small' \| 'medium'` | `'medium'` | Track dimensions — small (36×20px) or medium (44×24px) |
| `disabled` | `boolean` | `false` | Disables interaction; reduces opacity |
| `aria-label` | `string` | — | Accessibility label; required when `label` is not provided |
| `id` | `string` | auto | Custom id; auto-generated when omitted |

Forwards `ref` to the outer `<label>` element.

## Basic Usage
```tsx
<Switch label="Enable notifications" onChange={(on) => setNotifications(on)} />
```

## Controlled
```tsx
const [darkMode, setDarkMode] = useState(false);

<Switch
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark mode"
/>
```

## With Description
```tsx
<Switch
  label="Marketing emails"
  description="Receive product updates and promotional offers."
  checked={marketing}
  onChange={setMarketing}
/>
```

## Sizes
```tsx
<Switch size="small" label="Small" />
<Switch size="medium" label="Medium" />
```

## Disabled
```tsx
<Switch disabled label="Unavailable setting" />
<Switch disabled checked label="Locked on" />
```

## In a Settings List
```tsx
<ListCell
  title="Push notifications"
  trailing={
    <Switch
      checked={pushEnabled}
      onChange={setPushEnabled}
      aria-label="Push notifications"
    />
  }
/>
```

## States
- **Off** — Gray track, thumb on the left
- **On** — Brand-colored track, thumb translated to the right
- **Hovered (off)** — Track shifts to `surface.base.defaultPressed`
- **Hovered (on)** — Track shifts to `surface.brand.defaultPressed`
- **Pressed** — Subtle scale(0.97) on the track
- **Disabled** — Opacity reduced, cursor `not-allowed`

## Accessibility
- Underlying input uses `type="checkbox"` with `role="switch"`
- `aria-checked` reflects the current boolean state
- `aria-label` required when no visible `label` prop is provided
- Keyboard: `Tab` to focus, `Space` to toggle

## Do / Don't
- Do: Use `Switch` for settings that apply immediately on toggle
- Do: Add `aria-label` when rendering inside a `ListCell` or without a visible label
- Do: Show optimistic UI on toggle; revert on async failure
- Don't: Use `Switch` for form values collected before submission — use `Checkbox`
- Don't: Use for selecting one of multiple options — use `Radio`
- Don't: Require a Submit button after toggling a Switch — that defeats its purpose

## Design Tokens Used
- **Colors**: `cssVarColors.surface.brand.default`, `cssVarColors.surface.brand.defaultPressed`, `cssVarColors.surface.base.defaultPressed`, `cssVarColors.fill.normal`, `cssVarColors.content.base.onColor`
- **Spacing**: `spacing.primitive[1]`, `spacing.primitive[3]`
- **Radius**: `radius.primitive.full`
- **Typography**: `typography.fontSize.md`, `typography.fontSize.sm`, `typography.fontWeight.regular`
- **Opacity**: `opacity.disabled`
- **Motion**: `transitions.all`, `transitions.transform`

## Related Components
- `Checkbox` — Form-submission boolean; prefer when value is submitted with other fields
- `Radio` / `RadioGroup` — Single selection from a mutually exclusive set
- `ListCell` — Common container for Switch inside a settings list row
