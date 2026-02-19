# Skill: Design System A11y Check

## When to Use
After generating or reviewing UI code that uses `@baerae-zkap/design-system`. Run this checklist to verify accessibility compliance.

## Checklist by Component

### Button
- [ ] Has meaningful label text (not "Click here" or "Button")
- [ ] `disabled` state is used when action is unavailable (not just opacity)
- [ ] `isLoading` shows visual feedback for async operations

### IconButton
- [ ] Has `aria-label` describing the action (REQUIRED -- no exceptions)
- [ ] Label describes the action, not the icon ("Close modal" not "X icon")

### Chip
- [ ] Interactive Chips have `onClick`
- [ ] Selected state is visually distinct (not color alone)

### Card
- [ ] `onClick` provided (Card is always interactive)
- [ ] Keyboard: Enter and Space activate the card (built-in)

### Accordion
- [ ] Trigger has `aria-expanded` (built-in)
- [ ] Panel has `aria-labelledby` pointing to trigger (built-in)

### TextField / TextArea / Select
- [ ] Has visible `label` prop (not placeholder as label substitute)
- [ ] Error state uses `error` prop (not custom red text)
- [ ] `aria-describedby` connects to helper/error text if needed

### Checkbox / Radio
- [ ] Each option has a visible label
- [ ] Radio group has a `role="radiogroup"` wrapper with label

### Switch
- [ ] Has `aria-label` or associated visible label
- [ ] Change is immediate (not deferred to form submit)

### Table
- [ ] Uses native `<table>` elements (built-in via system Table component)
- [ ] Header cells have appropriate scope

## General Rules
- [ ] No `onClick` on non-interactive elements without `role="button"` + keyboard handler
- [ ] Color is not the only indicator of state -- add text or icon
- [ ] Focus outline is visible on all interactive elements
- [ ] Minimum touch target: 36px (sm), 40px (md), 44px (lg, xLarge)
- [ ] All images have `alt` text or `alt=""` if decorative
- [ ] Page has logical heading hierarchy (h1 > h2 > h3)

## Output Format
For each issue found:
```
Component: [ComponentName]
Issue: [description]
Fix: [exact code fix]
Severity: critical | major | minor
```

## References
- `.claude/rules/50-ux-patterns.md` -- accessibility section
- `.claude/resources/components/` -- per-component a11y requirements
