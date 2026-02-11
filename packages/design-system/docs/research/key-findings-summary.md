# Key Findings: Montage & Toss Component Props/Variants Analysis

## Executive Summary

Analysis of 20+ components from two leading Korean design systems (Montage by Wanted, Toss Design System) reveals distinct approaches to component API design that can inform our Design Foundation system.

---

## Critical Design Patterns

### 1. Variant Naming Philosophy

**Two Distinct Approaches:**

| System | Approach | Example |
|--------|----------|---------|
| **Montage** | **Semantic/Status-based** | Normal, Positive, Cautionary, Negative (Toast) |
| **Toss** | **Visual Weight-based** | Fill (high saturation), Weak (low saturation) |

**Recommendation**: Toss's approach is more reusable—"Fill/Weak" works across Button, Badge, etc. Semantic variants require custom naming per component.

---

### 2. Props Structure Patterns

#### Montage Pattern
```typescript
// Boolean toggles for features
<Toast
  leadingIcon={true}
  message="Success!"
  variant="positive"
/>

// CSS Variable customization
--semantic-primary-normal
--semantic-label-neutral
```

#### Toss Pattern
```typescript
// Required props for consistency
<Badge
  variant="fill"        // Required
  size="medium"         // Required
  color="blue"          // Required
/>

// Explicit CSS variables per component
--button-color
--button-background-color
--button-loader-color
```

**Key Difference**: Toss requires all major props explicitly (no defaults), forcing intentional design decisions.

---

### 3. Sub-component Composition Pattern

**Toss uses extensively:**
```typescript
<BottomSheet>
  <BottomSheet.Header />
  <BottomSheet.HeaderDescription />
  <BottomSheet.CTA />
  <BottomSheet.DoubleCTA />
</BottomSheet>

<Toast.Icon />
<Toast.Lottie />
<Checkbox.Circle />
<Checkbox.Line />
```

**Benefits:**
- Flexible composition
- Clear structure
- Type-safe APIs
- Better tree-shaking

**Recommendation**: Adopt this pattern for complex components (Modal, BottomSheet, Card with sections).

---

### 4. Size System Comparison

#### Montage Approach
- **Fixed Heights**: 54px (Toast), 24px (Icon Button)
- **Responsive Widths**: Min/max constraints (356-420px)
- **Incremental**: 8px increments (Bottom Sheet)
- **Mixed**: Some numeric, some named

#### Toss Approach
- **Consistent Named Sizes**: xsmall, small, medium, large, xlarge
- **Numeric Options**: When appropriate (Checkbox `size={24}`)
- **Typography-linked**: Badge scales with font tiers (f11-f42)

**Recommendation**: Use named sizes for consistency, allow numeric override for advanced cases.

---

### 5. State Management Patterns

Both systems support **controlled and uncontrolled** patterns:

```typescript
// Controlled (external state)
<Checkbox
  checked={isChecked}
  onCheckedChange={setIsChecked}
/>

// Uncontrolled (internal state)
<Checkbox
  defaultChecked={true}
/>
```

**Critical Props:**
- `checked` / `defaultChecked` (state)
- `disabled` (interaction)
- `loading` / `aria-busy` (async)
- `onChange` / `onClose` / `onExited` (callbacks)

---

### 6. Accessibility-First Design

#### Toss Excellence Examples

**Built-in ARIA:**
- `role="switch"` / `role="checkbox"` / `role="tab"`
- `aria-checked`, `aria-disabled`, `aria-selected` auto-managed
- `aria-live="polite"` / `aria-live="assertive"` for Toast
- `aria-busy` for loading states

**Developer Guidance:**
- Provide `aria-label` when visual label unclear
- Don't repeat element type in label (screen readers announce it)
- Focus management controls (`UNSAFE_disableFocusLock`)

**Recommendation**: Build ARIA support into components, require accessibility props in TypeScript.

---

### 7. Interaction States

**Standard across both systems:**

| State | Visual Treatment | Props |
|-------|------------------|-------|
| **Hover** | Opacity 0.0375-0.075 | Automatic |
| **Active** | Opacity 0.09-0.18 | Automatic |
| **Focus** | 2px outline | Automatic |
| **Disabled** | 0.3 opacity, cursor disabled | `disabled={true}` |
| **Loading** | Spinner animation | `loading={true}` |

**Toss Addition:**
- `hasTouchEffect={true}` - Mobile touch animation
- Shake animation on disabled interaction (Checkbox)

---

### 8. Bottom Sheet / Modal Design

#### Montage: Resize Behavior Focus
- **Hug**: Content-fit height
- **Flexible**: 50% initial, expands on scroll
- **Fill**: Full screen
- **Fixed**: Specified height (8px increments)

#### Toss: Composition Focus
- `maxHeight` / `expandedMaxHeight` props
- Sub-components for structure (Header, CTA, DoubleCTA)
- Keyboard accommodation (`hasTextField`)
- Focus lock control

**Recommendation**: Combine both approaches—resize behaviors as props + sub-component composition.

---

### 9. Color System Integration

#### Montage
```css
--semantic-primary-normal
--semantic-label-neutral
--semantic-fill-normal
--semantic-line-normal-alternative
```

**Semantic naming** throughout.

#### Toss
```typescript
color="primary" | "dark" | "danger" | "light"  // Button
color="blue" | "teal" | "green" | "red" | "yellow" | "elephant"  // Badge
```

**Explicit color props** with CSS variable exposure.

**Recommendation**: Use semantic tokens internally, expose limited color props to developers.

---

### 10. Animation Specifications

Both systems **explicitly document** animation timing:

**Montage Examples:**
- Accordion chevron: `0.3s cubic-bezier(0.25, 0.1, 0.25, 1)`
- Skeleton pulse: `2s` (50% ↔ 100% opacity)
- Toast auto-dismiss: Configurable duration

**Toss Examples:**
- Toast duration: `3000ms` default, `5000ms` with button
- Switch thumb transition: Smooth translate
- Loading: 3-dot sequential animation

**Recommendation**: Document all animation durations and easing functions in design tokens.

---

## Component-Specific Insights

### Toast/Snackbar
- **Montage**: Status variants (Positive/Negative/Cautionary)
- **Toss**: Position-based (top/bottom) + action integration
- **Recommendation**: Combine both—semantic variants + position control + action buttons

### Button
- **Montage**: Style variants (Primary/Secondary/Tertiary)
- **Toss**: Weight variants (Fill/Weak) + explicit sizes + display modes
- **Recommendation**: Adopt Toss's explicit size/display system

### Badge
- **Montage**: Hierarchy levels (Level 4 = highest importance)
- **Toss**: Required variant/size/color props
- **Recommendation**: Make key props required to prevent inconsistent usage

### Checkbox/Radio
- **Toss**: Shape variants (Circle vs. Line) as sub-components
- **Recommendation**: Use sub-component pattern for visual variants

### Tab
- **Montage**: Sticky positioning + animated underline
- **Toss**: `fluid` prop for horizontal scroll + `redBean` notification badge
- **Recommendation**: Add notification indicator prop to our Tab component

---

## Adoption Recommendations for Design Foundation

### 1. Variant System
✅ Adopt **Fill/Weak** pattern from Toss (reusable across components)
✅ Use **semantic colors** internally (primary/success/danger/warning)
✅ Expose **limited color props** to developers

### 2. Props Structure
✅ **Required props** for critical design decisions (variant, size)
✅ **CSS variable exposure** for advanced customization
✅ **Boolean toggles** for features (leadingIcon, disabled)
✅ **Callback props** with clear naming (onChange, onClose, onExited)

### 3. Component Composition
✅ **Sub-component pattern** for complex structures:
```typescript
<Modal>
  <Modal.Header />
  <Modal.Body />
  <Modal.Footer />
</Modal>
```

### 4. Sizing System
✅ **Named sizes**: xs, sm, md, lg, xl (consistent across components)
✅ **Numeric fallback**: Allow `size={32}` for custom cases
✅ **Responsive constraints**: Min/max widths like Montage

### 5. State Management
✅ **Both patterns**: Controlled (checked/onChange) and Uncontrolled (defaultChecked)
✅ **Standard states**: hover, active, focus, disabled, loading
✅ **Mobile states**: Add `hasTouchEffect` for touch devices

### 6. Accessibility
✅ **Built-in ARIA**: Auto-manage role, aria-checked, aria-disabled
✅ **Required aria-label**: TypeScript prop for components needing labels
✅ **Focus management**: Provide controls like `disableFocusLock`
✅ **Screen reader**: Use aria-live for dynamic content (Toast)

### 7. Documentation Structure
✅ **Anatomy**: Define component structure (Container, Icon, Label)
✅ **Variants**: Document all visual options with examples
✅ **Props Table**: Type, default, description for every prop
✅ **States**: Show hover, active, disabled, loading states
✅ **Accessibility**: ARIA guidance and requirements
✅ **Usage Guidelines**: When to use, max items, spacing rules
✅ **Animation Specs**: Timing functions and durations

---

## Implementation Priorities

### Phase 1: Foundation (Week 1-2)
1. Define variant naming system (Fill/Weak + semantic colors)
2. Establish size system (xs/sm/md/lg/xl)
3. Create CSS variable structure per component
4. Document animation tokens

### Phase 2: Core Components (Week 3-4)
1. Button: Implement Toss-style variant/size/display props
2. Badge: Required props pattern
3. Toast: Combine Montage status + Toss position/action
4. Checkbox/Radio: Sub-component pattern for shapes

### Phase 3: Complex Components (Week 5-6)
1. BottomSheet: Resize behaviors + sub-components
2. Modal: Sub-component composition
3. Tab: Add fluid scroll + notification badge
4. Card: Structured sections with sub-components

### Phase 4: Polish (Week 7-8)
1. Accessibility audit (all ARIA attributes)
2. Animation refinement (timing, easing)
3. Documentation completion (all props documented)
4. Storybook examples (all variants/states)

---

## Competitive Advantages

By combining best practices from both systems:

✅ **Montage's semantic clarity** (status-based feedback)
✅ **Toss's compositional flexibility** (sub-components)
✅ **Montage's animation detail** (explicit timing)
✅ **Toss's accessibility excellence** (built-in ARIA)
✅ **Montage's responsive design** (breakpoint documentation)
✅ **Toss's developer experience** (clear prop types, required fields)

---

## Questions for Team Discussion

1. **Variant naming**: Prefer Fill/Weak (Toss) or semantic variants (Montage)?
2. **Required props**: Force all components to require variant/size, or allow defaults?
3. **Sub-components**: Which components need sub-component pattern immediately?
4. **Animation library**: Use Framer Motion, or CSS transitions like both systems?
5. **CSS variables**: Expose all styling variables, or only key ones?
6. **Platform variants**: Document web-only, or plan for React Native parity?

---

## Additional Research Needed

1. **TypeScript Interfaces**: View actual type definitions from both systems
2. **Token Structure**: Deep dive into spacing/radius/color token files
3. **Theme System**: How dark/light mode switching works
4. **Migration Patterns**: Study Toss v1→v2 breaking changes
5. **Performance**: Bundle size impact of sub-component patterns

---

**Analysis Date:** 2026-02-06
**Researcher:** Claude (oh-my-claudecode:researcher agent)
**Components Analyzed:** 20+ components across both systems
**Primary Sources:** Montage Design System docs, Toss Design System (TDS Mobile) docs
