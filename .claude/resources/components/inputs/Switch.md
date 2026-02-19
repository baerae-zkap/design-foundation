# Switch

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { Switch } from '@baerae-zkap/design-system'` (planned)

## What It Is
A binary on/off toggle control that takes effect immediately when toggled. Visually distinct from Checkbox to communicate "instant effect" vs "form submission" semantics.

## When to Use
- Use for settings that take effect immediately on toggle (dark mode, notifications, WiFi)
- Use in `ListCell` trailing slot for settings lists
- Use for binary on/off states

## When NOT to Use
- Do NOT use for form values that are submitted together -- use `Checkbox` instead
- Do NOT use for selecting from multiple options -- use `Checkbox` group or `Radio` instead
- Do NOT build custom toggles with CSS

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is on |
| `onChange` | `(checked: boolean) => void` | -- | Toggle handler |
| `label` | `string` | -- | Accessible label |
| `disabled` | `boolean` | `false` | Disables the switch |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### Settings list
```tsx
<ListCell
  title="Dark Mode"
  trailing={<Switch checked={isDark} onChange={setIsDark} />}
/>
<ListCell
  title="Notifications"
  trailing={<Switch checked={notifs} onChange={setNotifs} />}
/>
```

### Standalone toggle
```tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
  <span>Auto-save</span>
  <Switch checked={autoSave} onChange={setAutoSave} />
</div>
```

## Decision Rule
- Immediate setting effect -> use `Switch`
- Value submitted with a form -> use `Checkbox`

## Do / Don't

- DO: Show immediate visual feedback on toggle
- DON'T: Use Switch for form values that only apply on submit
- DO: Use in ListCell trailing slot for settings patterns
- DON'T: Build custom toggle switches with CSS

## Accessibility
- Must have a label (visible or aria-label)
- Keyboard: Space to toggle
- If async, show optimistic UI and revert on failure
