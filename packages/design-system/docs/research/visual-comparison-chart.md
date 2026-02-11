# Visual Comparison Chart: Montage vs. Toss

## Component Props Matrix

Quick visual reference showing how each system handles common component properties.

---

## 🎨 Variant Systems

### Button

| System | Variants | Description | Code Example |
|--------|----------|-------------|--------------|
| **Montage** | Primary, Secondary, Tertiary | Style-based hierarchy | `<Button variant="primary">` |
| **Toss** | Fill, Weak | Visual weight-based | `<Button variant="fill">` |
| **Recommendation** | **Fill, Weak, Outline, Ghost** | More reusable across components | `<Button variant="fill">` |

### Badge

| System | Variants | Additional Props | Code Example |
|--------|----------|------------------|--------------|
| **Montage** | Solid, Outlined + Neutral, Accent | Leading/Trailing icons | `<Badge variant="solid" color="accent">` |
| **Toss** | Fill, Weak | **All required**: variant, size, color | `<Badge variant="fill" size="md" color="blue">` |
| **Recommendation** | **Fill, Weak** + Required props | Forces consistency | `<Badge variant="fill" size="md" color="primary">` |

### Toast/Feedback

| System | Variants | Position | Code Example |
|--------|----------|----------|--------------|
| **Montage** | Normal, Positive, Cautionary, Negative | Bottom (fixed) | `<Toast variant="positive" leadingIcon={true}>` |
| **Toss** | None (position-based) | Top, Bottom | `<Toast position="top" leftAddon={<Icon />}>` |
| **Recommendation** | **Semantic + Position** | Both approaches | `<Toast variant="success" position="bottom">` |

---

## 📏 Size Systems

### Named Sizes Comparison

| Component | Montage | Toss | Recommendation |
|-----------|---------|------|----------------|
| **Button** | Default padding only | sm, md, lg, **xl** | xs, sm, md, lg, xl |
| **Badge** | Spacing hints (6px/8px) | **xs**, sm, md, lg | xs, sm, md, lg |
| **Tab** | Default only | **lg, sm** | sm, md, lg |
| **Icon Button** | 24px fixed | Not specified | sm(16px), md(24px), lg(32px) |

### Size Implementation Pattern

```typescript
// ✅ RECOMMENDED: Named with numeric fallback
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

// Usage
<Button size="md" />        // Named
<Button size={28} />        // Custom
```

---

## 🎯 Props Requirement Strategy

### Montage Approach: Defaults Provided

```typescript
// Optional with defaults
interface ButtonProps {
  variant?: 'primary' | 'secondary';  // Defaults to 'primary'
  size?: 'sm' | 'md' | 'lg';          // Defaults to 'md'
}

// Usage: Can omit props
<Button>Click me</Button>
```

**Pros:** Easy to use, less typing
**Cons:** Easy to be inconsistent

### Toss Approach: Required Props

```typescript
// Required for consistency
interface BadgeProps {
  variant: 'fill' | 'weak';     // Required
  size: 'xs' | 'sm' | 'md';     // Required
  color: 'blue' | 'red';        // Required
}

// Usage: Must specify all
<Badge variant="fill" size="md" color="blue">New</Badge>
```

**Pros:** Forces consistency, intentional decisions
**Cons:** More verbose

### Recommendation: Hybrid Approach

```typescript
// Require design-critical props
interface ButtonProps {
  variant: 'fill' | 'weak' | 'outline';  // Required: visual weight
  size?: 'sm' | 'md' | 'lg';             // Optional: has default 'md'
  color?: 'primary' | 'danger';          // Optional: has default 'primary'
}
```

---

## 🏗️ Component Structure Patterns

### Flat Props (Montage Pattern)

```typescript
<Toast
  variant="positive"
  leadingIcon={true}
  message="Success!"
/>
```

**Pros:** Simple API, fewer components
**Cons:** Limited flexibility, many boolean props

### Sub-components (Toss Pattern)

```typescript
<BottomSheet open={true}>
  <BottomSheet.Header>Title</BottomSheet.Header>
  <BottomSheet.HeaderDescription>Subtitle</BottomSheet.HeaderDescription>
  <div>Content</div>
  <BottomSheet.DoubleCTA
    left={<Button>Cancel</Button>}
    right={<Button>Confirm</Button>}
  />
</BottomSheet>
```

**Pros:** Very flexible, composable, type-safe
**Cons:** More code, more components to learn

### When to Use Each

| Use Flat Props | Use Sub-components |
|----------------|-------------------|
| Simple components (Badge, Button) | Complex layouts (Modal, Card) |
| Few optional features | Many structural variations |
| Clear single purpose | Nested content areas |

---

## 🎭 State Management

### Controlled vs. Uncontrolled

| Pattern | Montage | Toss | Code Example |
|---------|---------|------|--------------|
| **Controlled** | Supported | ✅ **Primary pattern** | `<Checkbox checked={value} onChange={setValue}>` |
| **Uncontrolled** | Supported | ✅ **Also supported** | `<Checkbox defaultChecked={true}>` |

### Standard State Props

| State | Prop Name | Type | Both Systems? |
|-------|-----------|------|---------------|
| Disabled | `disabled` | boolean | ✅ Yes |
| Loading | `loading` or `isLoading` | boolean | ✅ Yes |
| Hover | — (automatic) | — | ✅ Yes |
| Active | — (automatic) | — | ✅ Yes |
| Focus | — (automatic) | — | ✅ Yes |
| Touch Effect | `hasTouchEffect` | boolean | Toss only |

---

## ♿ Accessibility Comparison

### Built-in ARIA Support

| Component | Montage | Toss | Recommendation |
|-----------|---------|------|----------------|
| **Button** | role="button" | role="button" + aria-label guidance | Auto role + require aria-label when needed |
| **Checkbox** | Standard HTML | role="checkbox", aria-checked auto | Auto-manage all ARIA |
| **Switch** | Not documented | role="switch", aria-checked auto | Auto-manage all ARIA |
| **Tab** | aria-selected auto | role="tablist", aria-selected auto | Auto-manage all ARIA |
| **Toast** | Standard | **aria-live** (polite/assertive) | Include aria-live for announcements |

### Toss Excellence Examples

```typescript
// Switch with complete ARIA
<Switch
  checked={enabled}
  onChange={setEnabled}
  aria-label="Enable notifications"  // Required, describes function
  disabled={false}
/>

// Toast with priority levels
<Toast
  open={true}
  message="Payment successful"
  aria-live="assertive"  // Immediate announcement
/>

// Checkbox with guidance
<Checkbox
  checked={accepted}
  aria-label="Accept terms and conditions"  // Don't say "checkbox"
/>
```

---

## 🎬 Animation Specifications

### Duration Patterns

| Component | Montage | Toss | Recommendation |
|-----------|---------|------|----------------|
| **Toast** | User-controlled | 3000ms (5000ms with action) | 3000ms default, configurable |
| **Skeleton** | 2s pulse (50% ↔ 100%) | Not documented | 2s pulse |
| **Accordion** | 300ms cubic-bezier(0.25, 0.1, 0.25, 1) | Not documented | 300ms ease-out |
| **Modal** | Not specified | Callbacks (onClose, onExited) | 200-300ms with callbacks |

### Animation Tokens

```typescript
// Recommended animation token structure
export const animation = {
  duration: {
    fast: '150ms',      // Micro-interactions
    normal: '300ms',    // Standard transitions
    slow: '500ms',      // Complex animations
    pulse: '2000ms'     // Loading states
  },
  easing: {
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1)'
  }
};
```

---

## 🎨 Color System Integration

### Montage: Semantic Tokens

```css
--semantic-primary-normal
--semantic-primary-hover
--semantic-label-neutral
--semantic-label-strong
--semantic-fill-normal
--semantic-line-normal-alternative
```

**Pattern:** Semantic naming throughout (primary, label, fill, line)

### Toss: Explicit Props

```typescript
// Button colors
<Button color="primary" | "dark" | "danger" | "light" />

// Badge colors
<Badge color="blue" | "teal" | "green" | "red" | "yellow" | "elephant" />
```

**Pattern:** Component-specific color props mapped to CSS variables

### Recommendation: Hybrid System

```typescript
// Semantic for interactive components
<Button variant="fill" color="primary" />
<Button variant="weak" color="danger" />

// Palette for decorative components
<Badge variant="fill" color="blue" />
<Badge variant="weak" color="red" />

// Internal mapping to tokens
// color="primary" → var(--color-primary)
// color="blue" → var(--color-blue-500)
```

---

## 📐 Layout & Display

### Button Display Modes (Toss)

```typescript
<Button display="inline" />  // Inline with other elements
<Button display="block" />   // New line, expands to screen
<Button display="full" />    // 100% parent width
```

### Bottom Sheet Resize Types (Montage)

```typescript
<BottomSheet resize="hug" />        // Content-fit
<BottomSheet resize="flexible" />   // 50% → 90% expandable
<BottomSheet resize="fill" />       // Full screen
<BottomSheet resize="fixed" maxHeight={400} />
```

### Tab Scroll Behavior (Toss)

```typescript
<Tab fluid={false} />  // Fixed, max 4 items
<Tab fluid={true} />   // Horizontal scroll for 4+ items
```

---

## 🔧 Customization Approaches

### CSS Variables

| System | Pattern | Example |
|--------|---------|---------|
| **Montage** | Semantic tokens | `--semantic-primary-normal` |
| **Toss** | Component-specific | `--button-color`, `--button-background-color` |
| **Recommendation** | Both | Semantic internally, expose per-component |

### Implementation

```typescript
// Component with CSS variable support
<Button
  variant="fill"
  style={{
    '--button-color': 'white',
    '--button-background-color': '#FF6B6B'
  }}
>
  Custom Button
</Button>
```

---

## 📊 Feature Comparison Matrix

### Core Features

| Feature | Montage | Toss | Adopt? |
|---------|---------|------|--------|
| Fill/Weak variants | ❌ | ✅ | ✅ Yes |
| Semantic status variants | ✅ | ❌ | ✅ Yes (feedback) |
| Required props | ❌ | ✅ | ✅ Yes (design-critical) |
| Sub-components | ❌ | ✅ | ✅ Yes (complex) |
| Named sizes | Partial | ✅ | ✅ Yes |
| Numeric size fallback | ❌ | ✅ | ✅ Yes |
| aria-live support | ❌ | ✅ | ✅ Yes |
| Animation callbacks | ❌ | ✅ | ✅ Yes |
| Touch effects | ❌ | ✅ | ✅ Yes (mobile) |
| Display modes | ❌ | ✅ | ✅ Yes (Button) |
| Resize behaviors | ✅ | Partial | ✅ Yes (BottomSheet) |
| Detailed animation specs | ✅ | ❌ | ✅ Yes |
| Platform variants | ✅ | ❌ | ⚠️ Future |

---

## 🎯 Decision Flowchart

### Should I make this prop required?

```
Is it design-critical? (variant, size) ────────────> ✅ REQUIRED
                │
                └─> Has sensible default? ─────────> ❌ OPTIONAL
                                    │
                                    └─> Rarely changed? ─> ❌ OPTIONAL
```

### Should I use sub-components?

```
Complex nested structure? ────────────────────────> ✅ SUB-COMPONENTS
                │
                └─> Multiple visual variants? ─────> ✅ SUB-COMPONENTS
                                    │
                                    └─> Simple boolean? ─> ❌ USE PROP
```

### Which variant system?

```
Interactive component? ──────> Fill/Weak + Semantic color
                │
                └─> Feedback component? ──────> Semantic (success/warning/error)
                                    │
                                    └─> Decorative? ──> Palette colors (blue/red/green)
```

---

## 📋 Component Checklist

Before finalizing any component, verify:

### Design
- [ ] Variant system chosen (Fill/Weak or Semantic)
- [ ] Size system defined (xs/sm/md/lg/xl)
- [ ] Color system integrated (semantic or palette)
- [ ] States documented (hover, active, disabled, loading)

### Implementation
- [ ] Required props identified and enforced
- [ ] Sub-components created if needed
- [ ] CSS variables exposed for customization
- [ ] Controlled/uncontrolled patterns supported (if stateful)

### Accessibility
- [ ] ARIA roles auto-managed
- [ ] aria-label required when needed
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Focus management implemented

### Documentation
- [ ] All props documented with types
- [ ] Examples showing all variants
- [ ] Storybook stories created
- [ ] Accessibility guidelines included
- [ ] Animation specifications listed

### Tokens
- [ ] Uses Foundation tokens (spacing, radius)
- [ ] No hardcoded values
- [ ] Follows 5-location sync pattern

---

## 🚀 Quick Implementation Guide

### 1. Choose Your Pattern

```typescript
// Simple component: Flat props
<Badge variant="fill" size="md" color="primary">New</Badge>

// Complex component: Sub-components
<Card>
  <Card.Image src="..." />
  <Card.Content>
    <Card.Header title="Title" />
  </Card.Content>
</Card>
```

### 2. Define TypeScript Interface

```typescript
// Required for design-critical props
interface ComponentProps {
  variant: 'fill' | 'weak';        // Required
  size?: 'sm' | 'md' | 'lg';       // Optional with default
  color?: SemanticColor;           // Optional with default
  children: ReactNode;             // Required
}
```

### 3. Implement with Tokens

```typescript
// Use Foundation tokens
const className = clsx(
  'component',
  `component--${variant}`,
  `component--${size}`
);

// CSS with tokens
.component {
  padding: var(--spacing-component-padding);
  border-radius: var(--radius-component);
  gap: var(--spacing-component-gap);
}
```

### 4. Add Accessibility

```typescript
<button
  role="button"
  aria-label={ariaLabel}
  aria-disabled={disabled}
  {...props}
>
  {children}
</button>
```

---

## 📈 Adoption Priority

### High Priority (Phase 1-2)
1. ✅ Fill/Weak variant system
2. ✅ Required props for Button, Badge
3. ✅ Named size system (xs/sm/md/lg/xl)
4. ✅ Built-in ARIA support
5. ✅ Foundation token integration

### Medium Priority (Phase 3)
6. ⚠️ Sub-components (Modal, BottomSheet, Card)
7. ⚠️ Controlled/uncontrolled patterns
8. ⚠️ Animation callbacks (onExited)
9. ⚠️ CSS variable customization

### Low Priority (Phase 4+)
10. 🔄 Display modes (Button)
11. 🔄 Touch effects (mobile)
12. 🔄 Resize behaviors (BottomSheet)
13. 🔄 Platform variants (iOS/Android)

---

**Created:** 2026-02-06
**Based on:** Montage Design System + Toss Design System (TDS Mobile)
**Purpose:** Quick visual reference for component design decisions
