# Pre-Return Checklist

Before returning any generated UI code, verify every item below. If any check fails, fix the code first.

## Components
- [ ] All interactive elements use system components (`Button`, `IconButton`, `TextField`, etc.)
- [ ] No native `<button>`, `<input>`, `<select>`, `<textarea>` (there is no system Select -- use Radio/RadioGroup or SegmentedControl instead)
- [ ] No `<div onClick>` used as a button — use `Button`, `IconButton`, or `Card` (use `ActionArea` only for button groups at bottom of modals/sheets)
- [ ] `ActionArea` used only as button group container (for modals, sheets, page footers) with `Button`/`TextButton` children

## Colors
- [ ] Zero hardcoded hex/rgb/hsl values in styles
- [ ] CSS variables used for all color references: `var(--content-base-default)`, `var(--surface-brand-default)`, etc.
- [ ] Maximum one `buttonType="filled" color="primary"` button per action group
- [ ] Destructive actions use `color="error"`, not manually styled red

## States
- [ ] Form submit button has `disabled={!isValid}` and `isLoading={isSubmitting}`
- [ ] Every list/table has: loading state, empty state, error state
- [ ] Destructive action has a confirmation step before executing

## Layout & Spacing
- [ ] Spacing values from `spacing.primitive[N]` or `spacing.semantic.*` — no arbitrary numbers
- [ ] Cards do not nest inside other Cards
- [ ] Page has consistent horizontal padding (`spacing.semantic.screen.paddingX`)

## Accessibility
- [ ] Every `IconButton` has `aria-label`
- [ ] All form inputs have a visible `label` prop or `aria-label`
- [ ] Interactive non-button elements have `role`, `tabIndex`, and `onKeyDown` handlers
- [ ] Semantic HTML used: `<form>`, `<nav>`, `<main>`, `<section>` where appropriate

## Output Format
- [ ] Component selection is documented (see `05-output-contract.md`)
- [ ] State requirements listed
- [ ] Accessibility notes included for non-obvious elements

---

If all boxes are checked → return the code.
If any box fails → fix before returning.
