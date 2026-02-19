# Visual Language

## Color Philosophy

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

## Color Usage Rules

1. **One primary CTA per screen section.** If a section has multiple buttons, only one should be `color="primary"`. Others use `neutral`.
2. **Destructive actions use `error` color.** Delete, remove, logout buttons must use `color="error"`.
3. **Social login buttons use their dedicated colors.** Kakao = `kakao`, Google = `google`. Never style these manually.
4. **Never mix multiple strong colors in a cluster.** A button group should not have both `primary` and `error` side by side unless one is clearly destructive and the other is the safe action.
5. **Semantic colors are for status only.** Don't use `success`/`warning`/`info` for general-purpose buttons. Use them for badges, alerts, and status indicators.

## Elevation
Use `Card` for contained content. Do not apply custom `box-shadow`. The system handles elevation through its token layer.

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

## Border Radius
| Element | Radius | Token |
|---------|--------|-------|
| Buttons | 8-12px | `radius.component.button.md` (8) |
| Cards | 12-16px | `radius.component.card.md` (16) |
| Inputs | 8px | `radius.component.input.default` (8) |
| Pills / full round | 9999px | `radius.primitive.full` |
| Chips | 8px | `radius.component.chip.default` (8) |

## Typography Hierarchy
Font: Pretendard (Korean-optimized sans-serif). Numbers: Spoqa Han Sans Neo with tabular-nums.

| Level | Style | Font Size |
|-------|-------|-----------|
| Display | Bold, large headings | 32-48px |
| Headline | Semibold section titles | 20-28px |
| Title | Bold subheadings | 18-24px |
| Body | Regular reading text | 14-18px |
| Label | Medium, UI labels | 12-16px |
| Caption | Small supporting text | 11-14px |

Access via `typography.semantic.body.md`, `typography.semantic.headline.sm`, etc.

## Motion
Interactions should feel snappy. Use 200ms for most transitions. Never exceed 500ms for UI feedback. The system provides `transitions.background`, `transitions.all`, and `transitions.expand` presets.
