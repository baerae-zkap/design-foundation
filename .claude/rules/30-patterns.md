# Implementation Patterns

## usePressable Hook
Manages hover/press states for interactive components.
```ts
import { usePressable } from '../../utils/styles';  // canonical path

const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({ disabled });
// Spread handlers: <button {...handlers} />
```

**State priority order (always follow this):**
```ts
// disabled > pressed > hovered > default
const bg = disabled ? cssVarColors.surface.disabled.default
  : isPressed  ? colorMap.bgPressed
  : isHovered  ? colorMap.bgHover
  : colorMap.bg;
```

## CSS Variable Colors
```ts
import { cssVarColors } from '../../tokens/colors';

// Access pattern: cssVarColors.{category}.{group}.{variant}
cssVarColors.surface.brand.default       // "var(--surface-brand-default)"
cssVarColors.content.base.onColor        // "var(--content-base-on-color)"
cssVarColors.surface.disabled.default    // Disabled state background
cssVarColors.content.disabled.default    // Disabled state text
```

## Transition Tokens
```ts
import { transitions } from '../../utils/styles';  // canonical path

transition: transitions.background   // bg color transition
transition: transitions.all          // bg + color + border
transition: transitions.expand       // height + opacity (accordion)
```

## Border Width Tokens
```ts
import { borderWidth } from '../../tokens/general';
borderWidth: borderWidth.default     // 1
borderWidth: borderWidth.hairline    // 0.5
```

## Radius Tokens
```ts
import { radius } from '../../tokens/radius';
borderRadius: radius.component.button.sm   // 8
borderRadius: radius.component.card.md     // 16
borderRadius: radius.primitive.full        // 9999 (pill)
```

## Spacing Tokens
```ts
import { spacing } from '../../tokens/spacing';
gap: spacing.primitive[2]                      // 8
padding: spacing.component.button.paddingX.sm  // component-specific
```

## Opacity & Disabled State
```ts
import { opacity } from '../../tokens/general';
opacity: disabled ? opacity.disabled : 1   // 0.5 when disabled
cursor: disabled ? 'not-allowed' : 'pointer'
```

## Dark Mode
Automatic via CSS variables. **No manual dark mode handling needed.**
Components use `cssVarColors.*` which resolves to CSS custom properties.
The theme bootstrap script + media query fallback handles switching.
