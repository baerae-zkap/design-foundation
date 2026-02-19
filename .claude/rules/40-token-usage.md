# Token Usage in Product Code

## Color Tokens

Colors are managed through CSS custom properties. They switch automatically between light and dark mode.

**In CSS or inline styles, use CSS variables directly:**
```tsx
<p style={{ color: 'var(--content-base-default)' }}>Primary text</p>
<p style={{ color: 'var(--content-base-secondary)' }}>Secondary text</p>
<div style={{ backgroundColor: 'var(--surface-base-default)' }}>Background</div>
```

**Key CSS variables:**
| Variable | Use For |
|----------|---------|
| `--surface-base-default` | Page/card background |
| `--surface-base-alternative` | Subtle background difference |
| `--surface-brand-default` | Brand-colored surface |
| `--content-base-default` | Primary text |
| `--content-base-secondary` | Secondary/helper text |
| `--content-base-disabled` | Disabled text |
| `--content-brand-default` | Brand-colored text |
| `--divider` | Borders and separators |
| `--fill-base-default` | Default fill for icons/shapes |

**For JS-side token access** (e.g., conditional styling):
```tsx
import { lightColors, darkColors } from '@baerae-zkap/design-system';
// lightColors.content.base.default -> hex string for light mode
// darkColors.content.base.default -> hex string for dark mode
```

**NEVER hardcode hex values.** Always use CSS variables or token imports.

## Spacing Tokens

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

## Typography Tokens

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

## Radius Tokens

```tsx
import { radius } from '@baerae-zkap/design-system';

radius.component.button.md   // 8
radius.component.card.md     // 16
radius.component.input.default // 8
radius.primitive.full         // 9999 (pill shape)
```

## Dark Mode

**No manual handling required.** CSS custom properties switch automatically via `prefers-color-scheme`. Components using the system tokens adapt automatically.

If you need to detect theme in JS for non-token purposes:
```tsx
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

But for all visual styling, rely on CSS variables. They just work.
