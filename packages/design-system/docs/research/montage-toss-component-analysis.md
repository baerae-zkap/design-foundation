# Montage & Toss Design System Component Analysis

## Research Overview

This document provides a comprehensive comparison of component Props/Variants structures from two leading Korean design systems:
- **Montage Design System** (by Wanted)
- **Toss Design System (TDS Mobile)**

---

## Component Comparison Matrix

### 1. Toast / Snackbar

#### Montage Toast
| Category | Details |
|----------|---------|
| **Variants** | Normal, Positive, Cautionary, Negative |
| **Props** | Leading Icon (True/False), Message (max 2 lines) |
| **Sizing** | Height: 54px, Max width: 420px, Min width: 356px (≥768px) |
| **States** | Default display at bottom |
| **Structure** | Container, Leading icon, Message |

#### Montage Snackbar
| Category | Details |
|----------|---------|
| **Variants** | Similar to Toast with action button support |
| **Props** | Icon indicators (20px), Action buttons, Title/message |
| **Sizing** | Mobile: 100% width, Desktop: 356-420px |
| **Visual** | Backdrop blur (32px), 12px border-radius, 52% opacity inverse background |
| **Z-index** | 5500 for top-level positioning |

#### Toss Toast
| Category | Details |
|----------|---------|
| **Variants** | Position-based (top/bottom) |
| **Props** | `open`, `position`, `text`, `duration` (3000ms default), `leftAddon`, `button`, `onClose`, `onExited` |
| **Addons** | Toast.Icon, Toast.Lottie for visual enhancements |
| **Special** | `higherThanCTA` positions above fixed bottom buttons |
| **Accessibility** | `aria-live`: "assertive" or "polite" |
| **States** | Auto-close (5000ms with button) |

**Key Insight**: Montage uses semantic status variants (Positive/Negative), while Toss focuses on position and action integration.

---

### 2. Alert / Dialog

#### Montage Alert
| Category | Details |
|----------|---------|
| **Documentation** | Limited extraction (CSS styling only) |
| **Structure** | General interactive patterns visible |
| **Status** | Requires component-specific documentation |

#### Toss Dialog (Alert/Confirm)
| Category | Details |
|----------|---------|
| **Variants** | Alert (single action), Confirm (dual action) |
| **Status** | 404 on direct page access |
| **Access** | Likely available through overlay utilities (useDialog hook) |

---

### 3. Button

#### Montage Button
| Category | Details |
|----------|---------|
| **Variants** | Primary, Secondary/Outline, Tertiary, Icon Button |
| **Props** | Display, Padding (9px 20px), Gap (5px), Border-radius (10px) |
| **States** | Hover (opacity 0.075/0.0375), Active (0.18/0.09), Disabled, Focus-visible (2px outline), Loading |
| **Sizing** | Default padding: 9px 20px, Icon: 18px SVG, 16px loading spinner |
| **Typography** | 0.9375rem font, 1.375rem line-height |
| **Colors** | Semantic color theming via CSS variables |

#### Toss Button
| Category | Details |
|----------|---------|
| **Variants** | Fill (high saturation), Weak (low saturation) |
| **Sizes** | Small, Medium, Large, XLarge (default) |
| **Display** | Inline, Block, Full |
| **Colors** | Primary (default), Dark, Danger, Light |
| **States** | Loading (3-dot animation with `aria-busy`), Disabled |
| **CSS Vars** | `--button-color`, `--button-background-color`, `--button-loader-color`, `--button-disabled-opacity-color`, `--button-gradient-color` |
| **Accessibility** | Semantic HTML5, `aria-label` for icon buttons, supports `<button>` and `<a>` via `as` prop |
| **Props** | `type` (button/submit/reset), `htmlStyle` for inline styling |

**Key Insight**: Toss provides more explicit size/display control, while Montage focuses on style variants.

---

### 4. Chip / Badge

#### Montage Chip
| Category | Details |
|----------|---------|
| **Status** | Listed in Actions category |
| **Documentation** | Details not extracted from navigation page |

#### Montage Content Badge
| Category | Details |
|----------|---------|
| **Variants** | Solid (filled), Outlined (border) |
| **Colors** | Neutral (supplementary info), Accent (important info with foreground colors) |
| **Props** | Leading icon (optional), Label, Trailing icon (optional), Container |
| **Sizing** | Fixed height, adaptive width, Spacing: 6px (XS/S), 8px (M) |
| **Hierarchy** | Level 4 (most important, attention-grabbing) |

#### Toss Badge
| Category | Details |
|----------|---------|
| **Variants** | Fill (high saturation), Weak (low saturation) |
| **Sizes** | xsmall, small, medium, large |
| **Colors** | blue, teal, green, red, yellow, elephant (gray) |
| **Props** | `variant` (required), `size` (required), `color` (required) |
| **Typography** | Adapts to font size tiers (f11–f42) |

**Key Insight**: Toss requires all three props explicitly, Montage uses icon addons and hierarchy levels.

---

### 5. Icon Button / Text Button

#### Montage Icon Button
| Category | Details |
|----------|---------|
| **Shape** | Circular (border-radius: 9999px) |
| **Props** | Font size: 24px for icon rendering |
| **States** | Hover (0.0375), Active (0.09), Focus-visible (2px outline), Disabled |
| **Features** | Badge wrapper support, SVG scaling (height: 1em), Touch action: none |
| **Visual** | Transparent background, semantic color system |

#### Montage Text Button
| Category | Details |
|----------|---------|
| **Style** | No background, no border, text-only labels |
| **Props** | Gap: 4px, Border-radius: 6px |
| **States** | Hover (7.5% opacity), Active (18% opacity), Focus-visible, Disabled |
| **Loading** | 16px centered spinner |
| **Sizing** | SVG icon: 20px, Text: 1rem font-size, 600 weight |
| **Use Case** | Secondary actions with lower priority |

**Key Insight**: Montage separates Icon Button (fully circular) from Text Button (minimal with text).

---

### 6. Accordion

#### Montage Accordion
| Category | Details |
|----------|---------|
| **Structure** | Summary/Header (trigger), Details Section, Divider, Icon (animated chevron) |
| **Animation** | 0.3s cubic-bezier(0.25, 0.1, 0.25, 1) rotation |
| **States** | Hover (reduced divider opacity), Active (hidden dividers), Focus-visible (outline) |
| **Padding** | Summary: 16px vertical/0px horizontal, Details: same scheme |
| **Visual** | Border-radius: 12px, semantic color tokens |

---

### 7. Card

#### Montage Card
| Category | Details |
|----------|---------|
| **Structure** | Thumbnail section (aspect 3/2), Content wrapper, Title, Caption |
| **Padding** | 14px for thumbnail content |
| **Typography** | Title: 1rem font/1.5rem line-height/600 weight, Caption: 0.8125rem/500 weight |
| **Visual** | Border-radius: 12px (thumbnail), 24px (full card), 1px solid neutral border |
| **Effects** | Hover image scaling (1.025 transform), Gradient overlay with CSS masks |
| **Responsive** | Aspect ratios: 3/2, 4/3, 760/529, Breakpoints: 768px, 1200px |

---

### 8. Bottom Sheet / Modal

#### Montage Bottom Sheet
| Category | Details |
|----------|---------|
| **Structure** | Handle, Content area, Action area, Scrim, Container |
| **Handle Variants** | True (draggable), False (button-only close) |
| **Resize Types** | Hug (content-fit), Flexible (50% initial, expandable), Fill (full screen), Fixed (8px increments) |
| **Max Height** | Web: 40px below browser top, App: 10px below status bar |
| **Action Patterns** | Strong (vertical stack), Neutral (side-by-side), Cancel (Cancel/Confirm) |

#### Toss Bottom Sheet
| Category | Details |
|----------|---------|
| **Props** | `open`, `onClose`, `maxHeight`, `expandedMaxHeight`, `header`, `headerDescription`, `cta`, `children` |
| **Sub-components** | BottomSheet.Header, BottomSheet.HeaderDescription, BottomSheet.CTA, BottomSheet.DoubleCTA, BottomSheet.Select |
| **Features** | `UNSAFE_disableFocusLock`, `disableDimmer`, `expandBottomSheet`, `hasTextField` (keyboard accommodation) |
| **Accessibility** | `ariaLabelledBy`, `ariaDescribedBy`, Focus management, `a11yIncludeHeaderInScroll` |

**Key Insight**: Montage emphasizes resize behaviors, Toss focuses on composition with sub-components.

---

### 9. Popup / Dialog

#### Montage Popup
| Category | Details |
|----------|---------|
| **Purpose** | Modal for immediate attention and response |
| **Structure** | Navigation (header), Contents area, Scrim, Additional element |
| **Behavior** | Overlays with scrim, requires explicit user dismissal |
| **Platforms** | Design, Web, iOS, Android tabs |

---

### 10. Tab

#### Montage Tab
| Category | Details |
|----------|---------|
| **Structure** | Tab List Container (sticky), Tab Items, Tab Motion Element (animated underline) |
| **States** | `aria-selected` (true/false), `aria-disabled`, Focus-visible (-1px offset outline) |
| **Visual** | 2px height underline for active state, color transitions |
| **Layout** | CSS vars: `--wds-tab-list-item-flex`, `--wds-tab-list-item-overflow`, `--wds-tab-padding-x/y` |
| **Scroll** | Smooth scroll behavior, sticky positioning with 48px margin-bottom |

#### Toss Tab
| Category | Details |
|----------|---------|
| **Sizes** | Large (default), Small |
| **Props** | `children` (Tab.Item), `onChange` (callback), `size`, `fluid` (horizontal scroll), `itemGap` (spacing), `ariaLabel` |
| **TabItem Props** | `selected` (required), `redBean` (notification badge) |
| **Accessibility** | `role="tablist"`, `role="tab"`, `aria-selected` auto-updates |
| **Guidelines** | Max 4 items without `fluid`, enable `fluid` for 4+ items |

**Key Insight**: Toss includes notification badge (`redBean`) and explicit fluid scroll control.

---

### 11. Loading / Spinner

#### Montage Loading
| Category | Details |
|----------|---------|
| **Variants** | Circular (primary for short load times) |
| **Props** | `size` (adjustable), `color` (customizable) |
| **Aspect** | 1:1 ratio (square proportions) |
| **Use Cases** | Button loading states, content area loading, centered placement |
| **Best Practice** | Continue until content appears or user navigates away |

---

### 12. Skeleton

#### Montage Skeleton
| Category | Details |
|----------|---------|
| **Variants** | Text (line wrapping), Rectangle (general areas), Circle (avatars) |
| **Rectangle Props** | `width`, `height`, `color`, `borderRadius`, `opacity` |
| **Circle Props** | `width`, `height`, `color`, `opacity` |
| **Text Alignment** | leading, center, trailing |
| **Animation** | 2s pulse (50% ↔ 100% opacity) |
| **Flexibility** | Auto-adjusts for multi-line text scenarios |

---

### 13. Checkbox

#### Toss Checkbox
| Category | Details |
|----------|---------|
| **Variants** | Checkbox.Circle (icon in circle), Checkbox.Line (standalone check) |
| **Props** | `inputType` ("checkbox"/"radio"), `size` (24 default), `checked`, `onCheckedChange`, `defaultChecked`, `disabled` |
| **State Management** | Controlled (checked + onCheckedChange), Uncontrolled (defaultChecked) |
| **Interaction** | Shake animation on disabled interaction |
| **Accessibility** | `role="checkbox"`, `aria-checked`, `aria-disabled`, requires `aria-label` |

---

### 14. Radio

#### Montage Radio
| Category | Details |
|----------|---------|
| **Status** | 404 on direct page access |

---

### 15. Switch

#### Toss Switch
| Category | Details |
|----------|---------|
| **States** | Active (checked), Inactive (unchecked), Disabled (0.3 opacity) |
| **Props** | `checked`, `disabled`, `name`, `hasTouchEffect` (true default), `onChange`, `onClick` |
| **Dimensions** | 50px × 30px, 15px border-radius |
| **Animation** | Thumb translates left/right, optional touch effect |
| **Accessibility** | `role="switch"`, `aria-checked`, `aria-disabled`, `aria-label` (required) |

---

### 16. TextField

#### Montage TextField
| Category | Details |
|----------|---------|
| **Status** | 404 on direct page access |

#### Toss TextField
| Category | Details |
|----------|---------|
| **Status** | 404 on direct page access |
| **Related** | Split TextField, TextArea variants documented |

---

### 17. List Cell

#### Montage List Cell
| Category | Details |
|----------|---------|
| **Structure** | Primary Container, Text content wrapper, Divider, Interactive overlay, Trailing content |
| **Padding** | Vertical: 8px/7px, Horizontal: 20px |
| **Visual** | Border-radius: 12px, Min-height: 24px for text |
| **States** | Hover (0.0375), Active (0.09), Selected (`aria-current='page'`) |
| **Content** | Leading content (icons/avatars), Primary text (ellipsis on desktop), Trailing elements |

---

## Design Pattern Insights

### Variant Organization Patterns

#### Montage Approach
1. **Semantic Status Variants**: Normal, Positive, Cautionary, Negative (Toast)
2. **Style Variants**: Solid, Outlined (Badge)
3. **Behavioral Variants**: Handle True/False, Resize Types (Bottom Sheet)
4. **Shape Variants**: Text, Rectangle, Circle (Skeleton)

#### Toss Approach
1. **Visual Weight**: Fill (high saturation), Weak (low saturation) - used consistently across Button, Badge
2. **Explicit Sizing**: xsmall, small, medium, large, xlarge
3. **Display Modes**: Inline, Block, Full (Button)
4. **Position-based**: top/bottom (Toast)
5. **Sub-component Composition**: Header, CTA, DoubleCTA (Bottom Sheet)

### Props Structure Patterns

#### Montage Characteristics
- **Boolean Props**: Leading Icon (True/False), Handle (True/False)
- **CSS Variable Customization**: Flexible styling through design tokens
- **Semantic Colors**: Uses `--semantic-primary-normal`, `--semantic-label-neutral`, etc.
- **Adaptive Sizing**: Responsive with breakpoints (768px, 1200px)
- **Animation Details**: Explicit timing functions (cubic-bezier values)

#### Toss Characteristics
- **Required Props Pattern**: All three required (variant, size, color) for Badge
- **Callback Props**: `onChange`, `onClose`, `onExited` with clear lifecycle
- **CSS Variable Exposure**: `--button-color`, `--button-background-color`, etc.
- **Accessibility First**: Built-in ARIA support with developer guidance
- **State Management**: Both controlled and uncontrolled patterns
- **Sub-component Pattern**: Component.SubComponent (Toast.Icon, BottomSheet.CTA)

### State Management

#### Common States Across Both Systems
- **Hover**: Opacity changes (Montage: 0.0375-0.075, Toss: similar)
- **Active**: Increased opacity or visual feedback
- **Disabled**: Reduced opacity, cursor disabled, pointer-events: none
- **Focus-visible**: Outline styling for keyboard navigation
- **Loading**: Animated indicators with accessibility attributes

#### Toss-Specific States
- **Touch Effect**: `hasTouchEffect` prop for mobile interactions
- **Aria-busy**: Loading state communication
- **Aria-live**: Toast priority levels (assertive/polite)

### Sizing Approaches

#### Montage
- **Fixed Heights**: 54px (Toast), 24px (Icon Button)
- **Responsive Widths**: Min/max constraints (356-420px)
- **Adaptive**: Content-based (Card, Skeleton)
- **Incremental**: 8px increments (Bottom Sheet Fixed mode)

#### Toss
- **Named Sizes**: xsmall, small, medium, large, xlarge
- **Numeric Sizes**: Checkbox size prop (default 24)
- **Height Control**: `maxHeight`, `expandedMaxHeight` (Bottom Sheet)
- **Typography-linked**: Badge scales with font tiers (f11-f42)

### Accessibility Patterns

#### Both Systems Emphasize
- Semantic HTML roles
- ARIA attributes (aria-checked, aria-disabled, aria-selected)
- Focus management
- Screen reader support

#### Toss Additional Features
- `aria-live` for dynamic content announcements
- `aria-busy` for loading states
- Guidance on aria-label usage (exclude redundant element type names)
- Focus lock controls (`UNSAFE_disableFocusLock`)

---

## Key Takeaways

### For Component API Design

1. **Variant Naming**: Choose between semantic (Normal/Positive/Negative) vs. visual (Fill/Weak)
2. **Required vs. Optional**: Toss makes size/color required for consistency, Montage uses defaults
3. **Sub-components**: Toss Pattern.SubPattern composition enables flexible layouts
4. **CSS Variables**: Both expose theming variables, but Toss is more explicit per-component
5. **State Props**: Separate controlled (`checked`) vs. uncontrolled (`defaultChecked`) patterns
6. **Callbacks**: Clear lifecycle hooks (onChange, onClose, onExited)
7. **Accessibility**: Build ARIA support in, provide clear guidance for developers

### Structural Patterns to Consider

1. **Anatomy Documentation**: Both systems clearly define component structure (Container, Icon, Label, etc.)
2. **Responsive Behavior**: Explicit breakpoint documentation
3. **Animation Specifications**: Timing functions and duration values
4. **Usage Guidelines**: When to use each variant, maximum item counts, spacing recommendations
5. **Platform Variants**: Separate specs for Web, iOS, Android (Montage)

### For Your Design System

When defining component Props/Variants, consider:

- **Consistency**: Use the same variant names across similar components (Fill/Weak pattern)
- **Explicitness**: Required props force intentional design decisions
- **Composition**: Sub-component pattern for complex layouts
- **Flexibility**: CSS variables for advanced customization
- **Developer Experience**: Clear prop names, TypeScript types, accessibility guidance
- **Platform Awareness**: Mobile-first with responsive considerations

---

## Components Not Fully Documented

### Montage (404/Limited)
- Alert (only CSS styling extracted)
- Chip (listed but details unavailable)
- Radio (404)
- Switch (404)
- TextField (404)

### Toss (404/Limited)
- TextField (404)
- Dialog (404, likely in overlay utilities)
- Several advanced components in categories

---

## Next Steps for Research

1. **Direct Component API Inspection**: View actual TypeScript interfaces from source code
2. **Storybook/Examples**: Analyze interactive examples and edge cases
3. **Migration Guides**: Review how systems evolved (Toss has v1→v2 migration docs)
4. **Platform Parity**: Compare Web vs. iOS vs. Android implementations
5. **Token Systems**: Deep dive into design token structures (spacing, radius, colors)

---

## References

**Montage Design System:**
- Component documentation: https://montage.wanted.co.kr/docs/components/

**Toss Design System (TDS Mobile):**
- Main documentation: https://tossmini-docs.toss.im/tds-mobile/
- Component library: 30+ components with detailed props documentation

**Analysis Date:** 2026-02-06
