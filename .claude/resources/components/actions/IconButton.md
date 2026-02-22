# IconButton

> Status: stable
> Import: `import { IconButton } from '@baerae-zkap/design-system'`

## What It Is
A circular button that contains only an icon, with no text label. Used for universally recognized icon actions in space-constrained areas like toolbars and navigation bars.

## When to Use
- Use for universally recognized actions (close, menu, search, share, settings)
- Use in toolbars, navigation bars, and compact UI areas
- Use when the icon's meaning is immediately clear without a text label

## When NOT to Use
- Do NOT use when the action needs a text label to be understood -- use `Button` with `leftContent` instead
- Do NOT use for primary CTAs -- use `Button` instead
- Do NOT use without `aria-label` -- screen readers need a text description

## Decision Rules

| Intent | variant | color |
|--------|---------|-------|
| Icon action with strong emphasis | `filled` | `primary` or `neutral` |
| Icon action with subtle emphasis | `ghost` | `neutral` |
| Icon action for destructive | `ghost` | `error` |
| Icon action with tinted background | `weak` | `primary` or `neutral` |

**Rule**: ALWAYS provide `aria-label`. Never use for actions that have visible text — use Button instead.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"filled" \| "ghost" \| "weak"` | `"ghost"` | Visual weight. `ghost`=transparent bg, `filled`=solid bg, `weak`=tinted bg |
| `color` | `"primary" \| "neutral" \| "error"` | `"neutral"` | Semantic color intent |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Button dimensions (maps to spacing tokens) |
| `disabled` | `boolean` | `false` | Grays out button, blocks interaction |
| `children` | `ReactNode` | (required) | Icon element to render inside the button |

Also accepts all standard `ButtonHTMLAttributes<HTMLButtonElement>` except `color`.

**Required**: `aria-label` must always be provided since there is no visible text label.

## Variant Guide
- `ghost` -- Transparent background, icon color only. Shows subtle hover/press fill. Default choice for most contexts (toolbars, nav).
- `filled` -- Solid circular background. High emphasis. Use sparingly for prominent icon actions.
- `weak` -- Tinted circular background. Medium emphasis. Use for secondary icon actions that need more visual weight than ghost.

## Color Guide
- `primary` -- Brand blue icon/bg. Use for brand-related icon actions.
- `neutral` -- Gray icon/bg. Default for most icon actions (close, menu, settings).
- `error` -- Red icon/bg. Use ONLY for destructive icon actions (delete, remove).

## Size Guide
| Size | Button Size | Icon Size | Use For |
|------|-------------|-----------|---------|
| `small` | `spacing.component.iconButton.size.sm` | `spacing.component.iconButton.iconSize.sm` | Compact areas, inline with text |
| `medium` | `spacing.component.iconButton.size.md` | `spacing.component.iconButton.iconSize.md` | Default for most contexts |
| `large` | `spacing.component.iconButton.size.lg` | `spacing.component.iconButton.iconSize.lg` | Prominent standalone actions |

## Common Patterns

### Toolbar with ghost buttons
```tsx
<div style={{ display: 'flex', gap: 8 }}>
  <IconButton aria-label="Search" onClick={onSearch}>
    <SearchIcon />
  </IconButton>
  <IconButton aria-label="Settings" onClick={onSettings}>
    <SettingsIcon />
  </IconButton>
</div>
```

### Close button in dialog header
```tsx
<IconButton
  variant="ghost"
  color="neutral"
  aria-label="Close dialog"
  onClick={onClose}
>
  <CloseIcon />
</IconButton>
```

### Destructive icon action
```tsx
<IconButton
  variant="ghost"
  color="error"
  aria-label="Delete item"
  onClick={onDelete}
>
  <TrashIcon />
</IconButton>
```

### Filled prominent action
```tsx
<IconButton
  variant="filled"
  color="primary"
  size="large"
  aria-label="Add new item"
  onClick={onAdd}
>
  <PlusIcon />
</IconButton>
```

## Do / Don't

- DO: Always provide `aria-label` describing the action
- DON'T: Use IconButton without `aria-label`
- DO: Use `ghost` variant for groups of icon buttons (toolbar)
- DON'T: Use multiple `filled` icon buttons side by side -- too visually heavy
- DO: Use medium or large size for touch targets (minimum 44px)
- DON'T: Use `small` size for primary interaction targets -- too small for comfortable tapping
- DO: Use universally recognized icons (close, search, menu, settings)
- DON'T: Use abstract or ambiguous icons without a text label

## Token Usage
| Property | Token |
|----------|-------|
| Background (primary/filled) | `cssVarColors.surface.brand.default` |
| Background pressed (primary/filled) | `cssVarColors.surface.brand.defaultPressed` |
| Icon color (primary/filled) | `cssVarColors.content.base.onColor` |
| Ghost hover bg | `cssVarColors.fill.alternative` |
| Ghost pressed bg | `cssVarColors.fill.normal` |
| Ghost icon color (neutral) | `cssVarColors.content.base.default` |
| Weak bg (primary) | `cssVarColors.surface.brand.secondary` |
| Weak icon (primary) | `cssVarColors.content.brand.default` |
| Disabled opacity | `opacity.disabled` |
| Border radius | `radius.primitive.full` (circle) |
| Transition | `transitions.all` |

## Accessibility
- Renders native `<button type="button">` -- keyboard accessible by default
- `aria-label` is REQUIRED -- there is no visible text for screen readers
- Icon is wrapped in a span sized to the icon dimensions
- `disabled` prop applies `opacity.disabled` and `cursor: not-allowed`
- Focus ring appears on keyboard navigation
