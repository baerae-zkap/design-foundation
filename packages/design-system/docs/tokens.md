# Design Tokens

Design tokens are the single source of truth for all visual decisions in the system — colors, spacing, typography, radius, and motion. Using tokens consistently ensures components adapt correctly to dark mode, maintain visual rhythm, and remain themeable.

---

## Color Tokens

Colors are managed through CSS custom properties. They switch automatically between light and dark mode via `prefers-color-scheme`. No manual theme handling is required in product code.

### Using CSS Variables (Preferred)

In all inline styles and CSS, reference color tokens as CSS variables:

```tsx
// Text colors
<p style={{ color: 'var(--content-base-default)' }}>Primary text</p>
<p style={{ color: 'var(--content-base-secondary)' }}>Secondary or helper text</p>
<p style={{ color: 'var(--content-base-disabled)' }}>Disabled text</p>
<span style={{ color: 'var(--content-brand-default)' }}>Brand-colored text</span>

// Surface (background) colors
<div style={{ backgroundColor: 'var(--surface-base-default)' }}>Page or card background</div>
<div style={{ backgroundColor: 'var(--surface-base-alternative)' }}>Subtle background offset</div>
<div style={{ backgroundColor: 'var(--surface-brand-default)' }}>Brand-tinted surface</div>

// Borders and dividers
<hr style={{ borderColor: 'var(--divider)' }} />
<div style={{ border: '1px solid var(--divider)' }}>Outlined container</div>

// Fill colors (icons, shapes)
<svg style={{ fill: 'var(--fill-base-default)' }} />
```

### Key CSS Variable Reference

| Variable | Use For |
|----------|---------|
| `--surface-base-default` | Page background, card fill |
| `--surface-base-alternative` | Slightly offset surface (e.g., preview area background) |
| `--surface-brand-default` | Brand-tinted surface |
| `--content-base-default` | Primary text, headings |
| `--content-base-secondary` | Supporting text, captions, helper text |
| `--content-base-disabled` | Disabled text and icons |
| `--content-brand-default` | Brand-colored text or icon |
| `--content-disabled-default` | Preferred alias for disabled content (use over `content-base-disabled`) |
| `--divider` | Borders, separators, list dividers |
| `--fill-base-default` | Default fill for icons and decorative shapes |
| `--fill-normal` | Standard fill (e.g., drag handle) |
| `--overlay-dim` | Backdrop/scrim behind modals and sheets |

### Using JS Token Imports

Only use JavaScript color imports when you need hex values for non-CSS rendering (canvas, SVG generation, chart libraries):

```tsx
import { lightColors, darkColors } from '@baerae-zkap/design-system';

// lightColors and darkColors expose the full semantic token tree as hex strings
const chartLineColor = prefersDark
  ? darkColors.content.brand.default
  : lightColors.content.brand.default;
```

Never import `lightColors`/`darkColors` just to use in `style` props — use CSS variables instead.

### Component Color Props

Components accept semantic color names on their `color` prop. These map to the CSS variable layer automatically:

| Value | Meaning | When to Use |
|-------|---------|-------------|
| `primary` | Brand blue | Main CTA, key interactive elements |
| `neutral` | Gray | Secondary actions, non-emphasis states |
| `success` | Green | Positive confirmation, completion status |
| `error` | Red | Destructive actions, validation errors |
| `warning` | Amber | Caution states, alerts |
| `info` | Blue (lighter) | Informational notices |
| `kakao` | Yellow | Kakao social login only |
| `google` | White/outlined | Google social login only |
| `muted` | Faded gray | Low-emphasis text links (`TextButton` only) |

```tsx
<Button buttonType="filled" color="primary">Save</Button>
<Button buttonType="weak" color="neutral">Cancel</Button>
<Button buttonType="filled" color="error">Delete</Button>
<Chip color="success">Confirmed</Chip>
<TextButton color="muted">Skip for now</TextButton>
```

### Dark Mode

No manual handling required. CSS custom properties resolve to light or dark values automatically via `prefers-color-scheme`. Components using system tokens adapt without any additional code.

If you need to detect the theme in JavaScript for non-styling purposes:

```tsx
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

---

## Spacing Tokens

The spacing system uses a base unit of 4px. All spacing values are multiples of 4, ensuring a consistent visual rhythm across the product.

### Import

```tsx
import { spacing } from '@baerae-zkap/design-system';
```

### Primitive Scale

Direct multiples of the 4px base unit:

```tsx
spacing.primitive[1]   // 4px  — tight gap between related elements
spacing.primitive[2]   // 8px  — default item gap
spacing.primitive[3]   // 12px — comfortable gap
spacing.primitive[4]   // 16px — standard internal padding
spacing.primitive[5]   // 20px — generous padding
spacing.primitive[6]   // 24px — section-level padding
spacing.primitive[7]   // 28px
spacing.primitive[8]   // 32px — section separation
spacing.primitive[10]  // 40px — large section gap
spacing.primitive[12]  // 48px — very large section gap
```

### Semantic Spacing

Named contexts for common layout scenarios:

```tsx
spacing.semantic.screen.paddingX     // 20px — horizontal page padding
spacing.semantic.screen.paddingTop   // 16px — top page padding
spacing.semantic.screen.paddingBottom // 20px — bottom page padding
spacing.semantic.inset.sm            // 16px — standard container inset
spacing.semantic.vertical.lg         // 24px — vertical section gap
spacing.semantic.minTouchTarget      // 44px — minimum touch/click target size
```

### Component-Level Spacing

```tsx
spacing.component.input.paddingX     // 16px — text field horizontal padding
spacing.component.input.labelGap     // 8px  — gap between label and input
spacing.component.input.helperGap    // 4px  — gap between input and helper/error text
spacing.component.card.padding.sm    // 16px — card internal padding (compact)
spacing.component.card.padding.md    // 20px — card internal padding (default)
spacing.component.list.itemGap       // 0px  — list items have no gap (dividers built-in)
spacing.component.list.sectionGap    // 32px — gap between list sections
```

### Spacing Usage Guide

| Context | Value | Token |
|---------|-------|-------|
| Tight gap (icon + label, badge + text) | 4px | `spacing.primitive[1]` |
| Default item gap | 8px | `spacing.primitive[2]` |
| Comfortable gap between related items | 12px | `spacing.primitive[3]` |
| Standard container padding | 16px | `spacing.primitive[4]` |
| Screen horizontal padding | 20px | `spacing.semantic.screen.paddingX` |
| Section separation | 32px | `spacing.primitive[8]` |
| Large section gap | 40–48px | `spacing.primitive[10]` or `[12]` |

```tsx
// Vertical form stack
<div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[4] }}>
  <TextField label="Name" />
  <TextField label="Email" />
</div>

// Screen-level horizontal padding
<div style={{ paddingInline: spacing.semantic.screen.paddingX }}>
  {/* page content */}
</div>

// Section gap
<div style={{ marginTop: spacing.primitive[8] }}>
  <SectionHeader title="Account" />
</div>
```

---

## Typography Tokens

The type system is built on **Pretendard** (Korean-optimized sans-serif) with **Spoqa Han Sans Neo** (tabular-nums) for numeric values.

### Import

```tsx
import { typography } from '@baerae-zkap/design-system';
```

### Semantic Styles (Recommended)

Spread semantic style objects directly onto elements. Each object contains `fontSize`, `fontWeight`, `lineHeight`, and `letterSpacing` as needed:

```tsx
<h1 style={{ ...typography.semantic.display.md, margin: 0 }}>Hero heading</h1>
<h2 style={{ ...typography.semantic.headline.md, margin: 0 }}>Page title</h2>
<h3 style={{ ...typography.semantic.headline.sm, margin: 0 }}>Section title</h3>
<h4 style={{ ...typography.semantic.title.sm, margin: 0 }}>Card title</h4>
<p style={{ ...typography.semantic.body.md, margin: 0 }}>Body paragraph</p>
<p style={{ ...typography.semantic.body.sm, margin: 0 }}>Compact body text</p>
<label style={{ ...typography.semantic.label.md }}>Form field label</label>
<span style={{ ...typography.semantic.caption.md }}>Timestamp or footnote</span>
```

### Semantic Scale Reference

| Style | Font Size | Weight | Line Height | Use For |
|-------|-----------|--------|-------------|---------|
| `display.md` | 36px | Bold | 1.2 | Hero headings |
| `display.sm` | 32px | Bold | 1.2 | Large display text |
| `headline.md` | 24px | Semibold | 1.3 | Page titles |
| `headline.sm` | 20px | Semibold | 1.4 | Section titles |
| `title.sm` | 18px | Bold | 1.4 | Card headings, subheadings |
| `body.md` | 16px | Regular | 1.6 | Main body copy |
| `body.sm` | 14px | Regular | 1.6 | Compact body, descriptions |
| `label.md` | 14px | Medium | 1.4 | Form labels, UI labels |
| `label.sm` | 12px | Medium | 1.4 | Small labels, tags |
| `caption.md` | 12px | Regular | 1.5 | Timestamps, footnotes, metadata |

### Individual Token Values

For cases where you need a single property rather than a full semantic style:

```tsx
// Font sizes (numeric px values)
typography.fontSize.xs    // 12
typography.fontSize.sm    // 14
typography.fontSize.md    // 16
typography.fontSize.lg    // 18
typography.fontSize.xl    // 20
typography.fontSize['2xl'] // 24

// Font weights
typography.fontWeight.regular   // '400'
typography.fontWeight.medium    // '500'
typography.fontWeight.semibold  // '600'
typography.fontWeight.bold      // '700'

// Line heights
typography.lineHeight.sm   // 1.4
typography.lineHeight.md   // 1.6
```

---

## Radius Tokens

### Import

```tsx
import { radius } from '@baerae-zkap/design-system';
```

### Component Radius

Semantic radius values aligned to component types:

```tsx
radius.component.button.md      // 8  — standard button
radius.component.button.lg      // 12 — large button
radius.component.card.md        // 16 — card container
radius.component.card.sm        // 12 — compact card
radius.component.input.default  // 8  — text fields, selects
radius.component.chip.default   // 8  — chips, tags
```

### Primitive Radius

```tsx
radius.primitive.xs    // 4   — very subtle rounding
radius.primitive.sm    // 6   — small elements
radius.primitive.md    // 8   — buttons, inputs
radius.primitive.lg    // 12  — cards
radius.primitive.xl    // 16  — large cards, sheets
radius.primitive['2xl'] // 24 — dialogs
radius.primitive.full  // 9999 — pill / fully round shape
```

### Radius Usage Guide

| Element | Value | Token |
|---------|-------|-------|
| Buttons (default) | 8px | `radius.component.button.md` |
| Buttons (large) | 12px | `radius.component.button.lg` |
| Cards | 16px | `radius.component.card.md` |
| Text inputs | 8px | `radius.component.input.default` |
| Chips / tags | 8px | `radius.component.chip.default` |
| Pills / avatars | 9999px | `radius.primitive.full` |
| Bottom sheet top corners | 16px | `radius.primitive.xl` |
| Modal dialogs | 24px | `radius.primitive['2xl']` |

---

## Motion Tokens

### Import

```tsx
import { duration, easing, transitions } from '@baerae-zkap/design-system';
```

### Duration

```tsx
duration.instant  // 100ms — tooltips, micro-interactions
duration.fast     // 150ms — popovers, small overlays
duration.normal   // 250ms — most UI transitions
duration.slow     // 350ms — sheet slide-up, page transitions
```

### Easing

```tsx
easing.easeIn     // Accelerating — elements leaving the screen
easing.easeOut    // Decelerating — elements entering the screen
easing.easeInOut  // Both — backdrop fades, symmetric transitions
easing.linear     // No easing — progress indicators
```

### Preset Transitions

```tsx
transitions.background  // 'background-color 200ms ease'
transitions.all         // 'all 200ms ease'
transitions.expand      // For height/max-height accordion-style reveals
```

### Motion Guidelines

- Keep UI feedback under 200ms for interactions that feel instant.
- Never exceed 500ms for any standard UI response.
- Use `easeOut` for elements entering the screen (slide in, fade in).
- Use `easeIn` for elements leaving (fade out, slide out).
- Use `easeInOut` for backdrop overlays and symmetric open/close pairs.

---

## Token Anti-Patterns

Never do these:

```tsx
// BAD — hardcoded hex
style={{ color: '#1a73e8' }}
style={{ backgroundColor: '#ffffff' }}

// BAD — rgb/hsl literals
style={{ color: 'rgb(26, 115, 232)' }}

// BAD — arbitrary spacing
style={{ gap: 13, padding: '15px 20px' }}

// BAD — importing lightColors for inline styles
import { lightColors } from '@baerae-zkap/design-system';
style={{ color: lightColors.content.base.default }}  // Use var(--content-base-default) instead

// BAD — custom motion values
style={{ transition: 'all 0.3s cubic-bezier(...)' }}
```

Always use:

```tsx
// GOOD — CSS variables
style={{ color: 'var(--content-base-default)' }}
style={{ backgroundColor: 'var(--surface-base-default)' }}

// GOOD — spacing tokens
style={{ gap: spacing.primitive[3], padding: spacing.primitive[4] }}

// GOOD — preset transitions
style={{ transition: transitions.all }}
```
