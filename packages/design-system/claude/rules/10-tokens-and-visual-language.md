# Tokens & Visual Language

## Color System

The design system uses semantic color names on component props:

| Color | Meaning | When to Use |
|-------|---------|-------------|
| `primary` | Brand blue | Main CTA, key actions |
| `neutral` | Gray/default | Secondary actions, non-emphasis |
| `success` | Green | Positive confirmation, completion |
| `error` | Red | Destructive actions, validation errors |
| `warning` | Amber | Caution states, alerts |
| `info` | Blue (lighter) | Informational notices |
| `kakao` | Yellow | Kakao social login only |
| `google` | White/outlined | Google social login only |
| `muted` | Faded gray | Low-emphasis text links (TextButton only) |

### Color Usage Rules

1. **One primary CTA per screen section.** If a section has multiple buttons, only one should be `color="primary"`. Others use `neutral`.
2. **Destructive actions use `error` color.** Delete, remove, logout buttons must use `color="error"`.
3. **Social login buttons use their dedicated colors.** Kakao = `kakao`, Google = `google`. Never style these manually.
4. **Never mix multiple strong colors in a cluster.** A button group should not have both `primary` and `error` side by side unless one is clearly destructive and the other is the safe action.
5. **Semantic colors are for status only.** Don't use `success`/`warning`/`info` for general-purpose buttons. Use them for badges, alerts, and status indicators.

### Color Tokens

Colors are managed through CSS custom properties. They switch automatically between light and dark mode.

**NEVER hardcode hex values.** Always use CSS variables or token imports.

**In CSS or inline styles, use CSS variables directly:**
```tsx
<p style={{ color: 'var(--content-base-default)' }}>Primary text</p>
<p style={{ color: 'var(--content-base-secondary)' }}>Secondary text</p>
<div style={{ backgroundColor: 'var(--surface-base-default)' }}>Background</div>
```

**Key CSS variables:**
| Variable | Use For |
|----------|---------|
| `--surface-base-default` | Page background, card background (white in light mode) |
| `--surface-base-alternative` | Subtle background sections, search fields, disabled inputs, segmented control track (lightest grey) |
| `--surface-base-container` | Interactive element fills — buttons, chips, badges (slightly darker grey). **Do NOT use for section/page backgrounds.** Components use this internally. |
| `--surface-brand-default` | Brand-colored surface |
| `--content-base-default` | Primary text |
| `--content-base-secondary` | Secondary/helper text |
| `--content-base-disabled` | Disabled text |
| `--content-brand-default` | Brand-colored text |
| `--divider` | Borders and separators |
| `--fill-base-default` | Default fill for icons/shapes |

**For JS-side token access** (e.g., conditional logic, charts, canvas):
```tsx
import { lightColors, darkColors } from '@baerae-zkap/design-system';
// lightColors.content.base.default -> hex string for light mode
// darkColors.content.base.default -> hex string for dark mode
```
> **Important**: Prefer CSS variables (`var(--...)`) for all inline styles. Only use `lightColors`/`darkColors` when you need hex values in JavaScript logic (e.g., canvas rendering, chart libraries). Never import these just for inline `style` props.

## Spacing

Base unit: 4px. All spacing values are multiples of 4.

| Use Case | Value | Token |
|----------|-------|-------|
| Tight internal gap | 4px | `spacing.primitive[1]` |
| Default item gap | 8px | `spacing.primitive[2]` |
| Comfortable gap | 12px | `spacing.primitive[3]` |
| Standard padding | 16px | `spacing.primitive[4]` |
| Section separation | 32px | `spacing.primitive[8]` |
| Large section gap | 40-48px | `spacing.primitive[10]` or `[12]` |
| Screen horizontal padding | 20px | `spacing.semantic.screen.paddingX` |

### Spacing Tokens

```tsx
import { spacing } from '@baerae-zkap/design-system';

// Primitive scale (base 4px)
spacing.primitive[1]  // 4px
spacing.primitive[2]  // 8px
spacing.primitive[3]  // 12px
spacing.primitive[4]  // 16px
spacing.primitive[5]  // 20px
spacing.primitive[6]  // 24px
spacing.primitive[8]  // 32px
spacing.primitive[10] // 40px
spacing.primitive[12] // 48px

// Semantic spacing
spacing.semantic.screen.paddingX    // 20px - screen horizontal padding
spacing.semantic.inset.sm           // 16px - standard container inset
spacing.semantic.vertical.lg        // 24px - vertical section gap

// Component-specific
spacing.component.input.paddingX    // 16px
spacing.component.card.padding.md   // 20px
spacing.component.list.sectionGap   // 32px
```

## Typography

Font: Pretendard (Korean-optimized sans-serif). Numbers: Spoqa Han Sans Neo with tabular-nums.

| Level | Style | Font Size |
|-------|-------|-----------|
| Display | Bold, large headings | 32-48px |
| Headline | Semibold section titles | 20-28px |
| Title | Bold subheadings | 18-24px |
| Body | Regular reading text | 14-18px |
| Label | Medium, UI labels | 12-16px |
| Caption | Small supporting text | 11-14px |

### Typography Tokens

```tsx
import { typography } from '@baerae-zkap/design-system';

// Semantic styles (spread as inline style)
<h1 style={{ ...typography.semantic.headline.md, margin: 0 }}>Section Title</h1>
<p style={{ ...typography.semantic.body.md, margin: 0 }}>Body text here.</p>
<span style={{ ...typography.semantic.caption.md }}>Small helper text</span>
<span style={{ ...typography.semantic.label.md }}>Form label</span>

// Individual values
typography.fontSize.md    // 16
typography.fontWeight.semibold  // '600'
typography.lineHeight.md  // 24
```

Access via `typography.semantic.body.md`, `typography.semantic.headline.sm`, etc.

**Semantic type scale quick reference:**
| Style | Font Size | Weight | Use For |
|-------|-----------|--------|---------|
| `display.md` | 36px | Bold | Hero headings |
| `headline.md` | 24px | Semibold | Page titles |
| `headline.sm` | 20px | Semibold | Section titles |
| `title.sm` | 18px | Bold | Card/list titles |
| `body.md` | 16px | Regular | Body copy |
| `body.sm` | 14px | Regular | Compact body |
| `label.md` | 14px | Medium | Form labels, UI labels |
| `caption.md` | 12px | Regular | Timestamps, footnotes |

## Border Radius

| Element | Radius | Token |
|---------|--------|-------|
| Buttons | 8-12px | `radius.component.button.md` (8) |
| Cards | 12-16px | `radius.component.card.md` (16) |
| Inputs | 8px | `radius.component.input.default` (8) |
| Pills / full round | 9999px | `radius.primitive.full` |
| Chips | 8px | `radius.component.chip.default` (8) |

### Radius Tokens

```tsx
import { radius } from '@baerae-zkap/design-system';

radius.component.button.md   // 8
radius.component.card.md     // 16
radius.component.input.default // 8
radius.primitive.full         // 9999 (pill shape)
```

## Elevation

Use `Card` for contained content. Do not apply custom `box-shadow`. The system handles elevation through its token layer.

## Motion

Interactions should feel snappy. Use 200ms for most transitions. Never exceed 500ms for UI feedback. The system provides `transitions.background`, `transitions.all`, and `transitions.expand` presets.

## Dark Mode

**No manual handling required.** CSS custom properties switch automatically via `prefers-color-scheme`. Components using the system tokens adapt automatically.

If you need to detect theme in JS for non-token purposes:
```tsx
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

But for all visual styling, rely on CSS variables. They just work.
