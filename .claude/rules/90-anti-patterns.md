# Anti-Patterns — Never Do This

These patterns produce off-brand, inconsistent, or inaccessible UI. Reject any generated code that contains them.

## Color Anti-Patterns

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `color: '#1a73e8'` | `color: 'var(--content-brand-default)'` |
| `backgroundColor: 'rgb(255,255,255)'` | `backgroundColor: 'var(--surface-base-default)'` |
| Importing `lightColors` for inline styles | CSS variables via `var(--...)` |
| Using `success` color for a primary CTA | `color="primary"` for CTAs |
| Using `error` color for non-destructive actions | `color="neutral"` or `color="primary"` |
| Two `color="primary"` buttons side by side | One primary, one `color="neutral" buttonType="weak"` |

## Component Anti-Patterns

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `<div onClick={...}>Click me</div>` | `<Button>`, `<IconButton>`, or `<Card>` |
| `<input type="text" />` | `<TextField>` |
| `<select><option>...</option></select>` | `<Radio>` / `<RadioGroup>` for small sets, `<SegmentedControl>` for tab-style (no Select component exists) |
| `<textarea>` | `<TextArea>` |
| `<input type="checkbox">` | `<Checkbox>` |
| Custom `box-shadow` on a card div | `<Card>` component |
| Custom toggle built with CSS | `<Switch>` |
| `<button style={{ borderRadius: 9999 }}>` | `<Button>` with system radius |
| Nested `<ActionArea>` inside `<ActionArea>` | Single `<ActionArea>` with Button/TextButton children |
| Using `ActionArea` as a generic tappable region | `ActionArea` is a button group container for modals/sheets/page footers. For tappable content areas, use `Card` with `onClick` |

## Spacing Anti-Patterns

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `gap: 13` (arbitrary) | `gap: spacing.primitive[3]` (12px) |
| `padding: '15px 20px'` | `padding: spacing.primitive[4]` / `spacing.semantic.screen.paddingX` |
| `margin: 'auto'` for centering in flexbox | `alignItems: 'center'` / `justifyContent: 'center'` |

## Layout Anti-Patterns

- **DO NOT** build full-screen loading spinners. Use inline skeleton states.
- **DO NOT** render a blank white section when data is empty. Always show an empty state.
- **DO NOT** nest Cards inside Cards.
- **DO NOT** place more than one `buttonType="filled" color="primary"` button in the same action group.
- **DO NOT** put destructive actions next to primary CTAs without visual separation.
- **DO NOT** use fixed pixel widths for buttons. Let content or container define width.

## Accessibility Anti-Patterns

- **DO NOT** use `<IconButton>` without `aria-label`.
- **DO NOT** attach `onClick` to `<div>` or `<span>` without `role="button"` and keyboard handler.
- **DO NOT** rely on color alone to communicate state (add text or icon alongside color).
- **DO NOT** remove focus outlines without replacement.
- **DO NOT** set `tabIndex={-1}` on elements that should be keyboard-accessible.

## Motion Anti-Patterns

- **DO NOT** use transition durations over 500ms for UI feedback.
- **DO NOT** use `transition: all` with custom values — use `transitions.all` from the token system.
- **DO NOT** animate layout properties (`width`, `height` for non-accordion) — causes reflow.
