# Button

> Status: stable
> Import: `import { Button } from '@baerae-zkap/design-system'`

## What It Is
A clickable element for performing actions such as form submission, dialog confirmation/cancellation, and CTAs. Supports two visual styles and six color themes.

## When to Use
- Use for primary screen actions (submit, save, continue)
- Use for secondary/cancel actions alongside a primary button
- Use for destructive actions (delete, remove) with `color="error"`
- Use for social login (Kakao, Google) with dedicated color props

## When NOT to Use
- Do NOT use for icon-only actions -- use `IconButton` instead
- Do NOT use for inline text links within content -- use `TextButton` instead
- Do NOT use for tag/filter selection -- use `Chip` instead
- Do NOT use native `<button>` when Button exists

## Decision Rules

| Intent | buttonType | color | size | layout |
|--------|-----------|-------|------|--------|
| Primary CTA (save, confirm, submit) | `filled` | `primary` | `medium` or `large` | `hug` or `fillWidth` |
| Secondary / cancel action | `weak` | `neutral` | same as primary | `hug` |
| Destructive action (delete, remove) | `filled` | `error` | `medium` | `hug` |
| Soft destructive (remove from list) | `weak` | `error` | `medium` | `hug` |
| Kakao social login | `filled` | `kakao` | `xLarge` | `fillWidth` |
| Google social login | `filled` | `google` | `xLarge` | `fillWidth` |
| Full-width bottom CTA | `filled` | `primary` | `xLarge` | `fillWidth` |

**Rule**: Maximum ONE `buttonType="filled" color="primary"` per section.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `buttonType` | `"filled" \| "weak"` | `"filled"` | Visual weight. `filled`=solid bg, `weak`=tinted bg without border |
| `color` | `"primary" \| "neutral" \| "success" \| "error" \| "kakao" \| "google"` | `"primary"` | Semantic color intent |
| `size` | `"small" \| "medium" \| "large" \| "xLarge"` | `"medium"` | Button height: small=36px, medium=40px, large=44px, xLarge=48px |
| `layout` | `"hug" \| "fillWidth"` | `"hug"` | Width behavior. `hug`=fits content, `fillWidth`=100% width |
| `isLoading` | `boolean` | `false` | Shows animated loading dots, disables interaction |
| `disabled` | `boolean` | `false` | Grays out button, blocks interaction |
| `leftContent` | `ReactNode` | -- | Left slot for icons or custom content |
| `rightContent` | `ReactNode` | -- | Right slot for icons or custom content |
| `children` | `ReactNode` | -- | Button label text |

Also accepts all standard `ButtonHTMLAttributes<HTMLButtonElement>` except `color`.

## Variant Guide
- `filled` -- Primary emphasis, solid background color. Use for the main CTA in a section.
- `weak` -- Secondary emphasis, tinted background without border. Use for supporting/alternative actions.

## Color Guide
- `primary` -- Brand blue. Main CTA actions (save, confirm, continue).
- `neutral` -- Gray. Secondary actions (cancel, back, skip).
- `success` -- Green. Status confirmation only. Do NOT use for general buttons.
- `error` -- Red. Destructive actions ONLY (delete, remove, logout).
- `kakao` -- Kakao yellow. Social login only.
- `google` -- Google white. Social login only.

## Size Guide
| Size | Height | Font Size | Border Radius | Use For |
|------|--------|-----------|---------------|---------|
| `small` | 36px | 14px (sm) | `radius.component.button.sm` | Compact UI, tables |
| `medium` | 40px | 14px (sm) | `radius.component.button.sm` | Default for most contexts |
| `large` | 44px | 14px (sm) | `radius.component.button.lg` | Prominent actions |
| `xLarge` | 48px | 16px (md) | `radius.component.button.lg` | Full-width bottom CTAs |

## Common Patterns

### Primary + Secondary pair
```tsx
<div style={{ display: 'flex', gap: 12 }}>
  <Button buttonType="weak" color="neutral" onClick={onCancel}>Cancel</Button>
  <Button buttonType="filled" color="primary" onClick={onSave}>Save</Button>
</div>
```

### Loading state (async operations)
```tsx
<Button
  isLoading={isSubmitting}
  disabled={!isValid}
  onClick={onSubmit}
>
  Save
</Button>
```

### Full-width CTA
```tsx
<Button
  buttonType="filled"
  color="primary"
  size="xLarge"
  layout="fillWidth"
  onClick={onContinue}
>
  Continue
</Button>
```

### Destructive action
```tsx
<Button buttonType="filled" color="error" onClick={onDelete}>
  Delete Account
</Button>
```

### With icon
```tsx
<Button leftContent={<PlusIcon />} onClick={onAdd}>
  Add Item
</Button>
```

### Social login
```tsx
<Button buttonType="filled" color="kakao" layout="fillWidth" size="xLarge" onClick={onKakaoLogin}>
  Sign in with Kakao
</Button>
<Button buttonType="filled" color="google" layout="fillWidth" size="xLarge" onClick={onGoogleLogin}>
  Sign in with Google
</Button>
```

## Do / Don't

- DO: Use system `Button` component for all button-like actions
- DON'T: Use native `<button>` with custom styles
- DO: Use short, action-oriented labels ("Save", not "Click to save")
- DON'T: Use full sentences as button labels
- DO: Keep one `filled`+`primary` button per section maximum
- DON'T: Place multiple `filled`+`primary` buttons side by side
- DO: Use `color="error"` for destructive actions
- DON'T: Apply custom red CSS for destructive buttons
- DO: Use verb-first labels ("Save changes", not "Changes")
- DON'T: Use vague labels like "OK" or "Click here"

## Token Usage
| Property | Token |
|----------|-------|
| Background (primary/filled) | `cssVarColors.surface.brand.default` |
| Background pressed (primary/filled) | `cssVarColors.surface.brand.defaultPressed` |
| Text (primary/filled) | `cssVarColors.content.base.onColor` |
| Background (primary/weak) | `cssVarColors.surface.brand.secondary` |
| Text (primary/weak) | `cssVarColors.content.brand.default` |
| Disabled background | `cssVarColors.surface.disabled.default` |
| Disabled text | `cssVarColors.content.disabled.default` |
| Disabled opacity | `opacity.disabled` |
| Font weight | `typography.fontWeight.semibold` |
| Gap (icon + text) | `spacing.component.button.gap` |
| Padding X (sm) | `spacing.component.button.paddingX.sm` |
| Padding X (md) | `spacing.component.button.paddingX.md` |
| Padding X (lg) | `spacing.component.button.paddingX.lg` |
| Border radius (sm/md) | `radius.component.button.sm` |
| Border radius (lg/xl) | `radius.component.button.lg` |

## Accessibility
- Renders native `<button>` element -- keyboard accessible by default (Tab to focus, Enter/Space to activate)
- `isLoading={true}` sets `aria-busy="true"` on the element
- `disabled` sets both `disabled` attribute and `aria-disabled="true"`
- Always provide meaningful text content (not just "Click here")
- Icon + text: no aria-label needed. For icon-only buttons, use `IconButton` instead
