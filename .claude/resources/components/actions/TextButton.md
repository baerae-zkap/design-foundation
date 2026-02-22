# TextButton

> Status: stable
> Import: `import { TextButton } from '@baerae-zkap/design-system'`

## What It Is
A minimal button that displays only text without a background fill. Used for low-emphasis actions and inline navigation links. Supports clear, underline, and arrow variants.

## When to Use
- Use for secondary/tertiary actions alongside a filled Button (e.g., "Forgot password?", "Skip")
- Use for inline navigation links within content ("View all", "See more")
- Use with `arrow` variant for navigation cues that indicate page transitions
- Use with `underline` variant for link-style text within paragraphs

## When NOT to Use
- Do NOT use as the primary CTA -- use `Button buttonType="filled"` instead
- Do NOT use for icon-only actions -- use `IconButton` instead
- Do NOT use for tag/filter selection -- use `Chip` instead

## Decision Rules

| Intent | variant | color |
|--------|---------|-------|
| Inline link-style action in content | `clear` | `primary` |
| Underlined for emphasis | `underline` | `primary` |
| Action with directional arrow | `arrow` | `primary` |
| Low-emphasis muted action | `clear` | `muted` |
| Destructive inline action | `clear` | `error` |

**Rule**: Use TextButton for low-emphasis actions WITHIN content. For standalone CTAs, use Button.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"clear" \| "underline" \| "arrow"` | `"clear"` | Visual style. `clear`=plain text, `underline`=text-decoration underline, `arrow`=appends right arrow icon |
| `color` | `"primary" \| "neutral" \| "muted" \| "error"` | `"primary"` | Text color intent |
| `size` | `"xSmall" \| "small" \| "medium" \| "large" \| "xLarge"` | `"medium"` | Text size (maps to spacing.component.textButton.fontSize tokens) |
| `disabled` | `boolean` | `false` | Grays out text, blocks interaction |
| `children` | `ReactNode` | -- | Button label text |

Also accepts all standard `ButtonHTMLAttributes<HTMLButtonElement>` except `color`.

## Variant Guide
- `clear` -- Plain text with no decoration. Default. Shows pressed background feedback on click.
- `underline` -- Text with underline decoration. Use for link-like inline actions within content.
- `arrow` -- Text with a right-pointing arrow icon appended. Use for navigation actions ("View all ->").

## Color Guide
- `primary` -- Brand blue text. Default. Use for actions that should draw attention.
- `neutral` -- Default text color. Use alongside primary-colored elements to avoid competing emphasis.
- `muted` -- Faded gray text. Lowest emphasis. Use for tertiary actions or footnote-level links.
- `error` -- Red text. Use ONLY for destructive text actions.

## Common Patterns

### As secondary action below a filled Button
```tsx
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
  <Button buttonType="filled" color="primary" layout="fillWidth" onClick={onSubmit}>
    Sign Up
  </Button>
  <TextButton variant="clear" color="primary" onClick={onLogin}>
    Already have an account?
  </TextButton>
</div>
```

### Navigation link with arrow
```tsx
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h3>Recent Orders</h3>
  <TextButton variant="arrow" color="primary" size="small" onClick={onViewAll}>
    View All
  </TextButton>
</div>
```

### Inline link in content
```tsx
<p>
  By continuing, you agree to our{' '}
  <TextButton variant="underline" color="primary" size="small" onClick={onTerms}>
    Terms of Service
  </TextButton>
</p>
```

### Muted low-emphasis action
```tsx
<TextButton variant="clear" color="muted" size="small" onClick={onSkip}>
  Skip for now
</TextButton>
```

## Do / Don't

- DO: Use TextButton as a supporting action paired with a filled Button for clear visual hierarchy
- DON'T: Use TextButton as the primary CTA -- it lacks visual prominence
- DO: Use the `arrow` variant for navigation-style links that take users to another page
- DON'T: Place TextButton on a background where text color contrast is insufficient
- DO: Keep labels short and action-oriented
- DON'T: Use TextButton where a full Button is needed for emphasis

## Token Usage
| Property | Token |
|----------|-------|
| Text color (primary) | `cssVarColors.content.brand.default` |
| Text pressed (primary) | `cssVarColors.surface.brand.defaultPressed` |
| Text color (neutral) | `cssVarColors.content.base.default` |
| Text color (muted) | `cssVarColors.content.base.neutral` |
| Text color (error) | `cssVarColors.content.error.default` |
| Pressed background | `cssVarColors.fill.alternative` |
| Disabled text | `cssVarColors.content.disabled.default` |
| Font weight | `typography.fontWeight.medium` |
| Padding | `spacing.primitive[1]` vertical, `spacing.primitive[2]` horizontal |
| Border radius | `radius.primitive.sm` |
| Font sizes (xSmall-xLarge) | `spacing.component.textButton.fontSize.xs` through `.xl` |

## Accessibility
- Renders native `<button>` element -- keyboard accessible by default
- `disabled` sets both `disabled` and `aria-disabled="true"`
- Arrow variant icon is decorative (no additional aria needed since label text is present)
- Ensure adequate color contrast, especially with `muted` color on light backgrounds
