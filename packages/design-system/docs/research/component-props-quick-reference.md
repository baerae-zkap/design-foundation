# Component Props Quick Reference Guide

## How to Use This Document

This quick reference helps you make component API decisions by comparing how Montage and Toss handle similar components. Use when:
- Designing new component props
- Deciding variant names
- Structuring component APIs
- Making size/state decisions

---

## 🎨 Variant Patterns

### Common Variant Approaches

| Component | Montage | Toss | Recommendation |
|-----------|---------|------|----------------|
| **Button** | Primary, Secondary, Tertiary | Fill, Weak | Use Fill/Weak (more reusable) |
| **Badge** | Solid, Outlined + Neutral, Accent | Fill, Weak + color prop | Combine: Fill/Weak + semantic colors |
| **Toast** | Normal, Positive, Cautionary, Negative | Position-based (top/bottom) | Semantic status + position prop |
| **Loading** | Circular (only) | Not documented | Add variant prop for future expansion |

### Variant Naming Convention

```typescript
// ✅ RECOMMENDED: Toss-style (reusable)
type Variant = 'fill' | 'weak' | 'ghost' | 'outline';

// ⚠️ ALTERNATIVE: Montage-style (semantic)
type Variant = 'primary' | 'secondary' | 'tertiary';

// 🎯 HYBRID: Best of both
type Variant = 'fill' | 'weak' | 'outline';
type Semantic = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
```

---

## 📏 Size Systems

### Named Sizes (Preferred)

| Component | Montage | Toss | Tokens to Use |
|-----------|---------|------|---------------|
| **Button** | — | small, medium, large, xlarge | `button.sm`, `button.md`, `button.lg`, `button.xl` |
| **Badge** | xsmall/small: 6px gap, medium: 8px gap | xsmall, small, medium, large | `badge.xs`, `badge.sm`, `badge.md`, `badge.lg` |
| **Icon Button** | 24px (fixed) | — | `icon.sm` (16px), `icon.md` (24px), `icon.lg` (32px) |
| **Tab** | — | large, small | `tab.sm`, `tab.lg` |

### Size Prop Pattern

```typescript
// ✅ RECOMMENDED: Named sizes with numeric fallback
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;

// Example usage:
<Button size="md" />        // Named
<Icon size={28} />          // Custom numeric
```

---

## 🎯 Required vs Optional Props

### Component Prop Requirements

| Component | Montage Pattern | Toss Pattern | Recommendation |
|-----------|----------------|--------------|----------------|
| **Badge** | Optional defaults | **ALL required** (variant, size, color) | **Require** for consistency |
| **Button** | Defaults provided | **Type required**, size optional | **Require variant**, optional size |
| **Checkbox** | — | **inputType required** | Require type for clarity |
| **Toast** | Defaults provided | **open, position required** | Require critical behavior props |

### Required Props Philosophy

```typescript
// ✅ REQUIRE: Design-critical props
interface ButtonProps {
  variant: 'fill' | 'weak' | 'outline';  // Required: defines visual weight
  size?: 'sm' | 'md' | 'lg';             // Optional: has sensible default
  children: ReactNode;                   // Required: content
}

// ✅ REQUIRE: Behavior-critical props
interface ToastProps {
  open: boolean;                          // Required: controls visibility
  position: 'top' | 'bottom';            // Required: defines behavior
  message: string;                       // Required: content
  duration?: number;                     // Optional: has default
}
```

---

## 🏗️ Sub-component Patterns

### When to Use Sub-components

| Component | Structure | Benefit |
|-----------|-----------|---------|
| **Bottom Sheet** | `<BottomSheet.Header>`, `<BottomSheet.CTA>`, `<BottomSheet.DoubleCTA>` | Flexible layout composition |
| **Toast** | `<Toast.Icon>`, `<Toast.Lottie>` | Optional addons |
| **Checkbox** | `<Checkbox.Circle>`, `<Checkbox.Line>` | Visual variant selection |
| **Modal** | `<Modal.Header>`, `<Modal.Body>`, `<Modal.Footer>` | Semantic structure |
| **Card** | `<Card.Image>`, `<Card.Content>`, `<Card.Actions>` | Consistent layout |

### Sub-component Code Pattern

```typescript
// ✅ RECOMMENDED: Compound component pattern
const BottomSheet = ({ children }) => { /* ... */ };
BottomSheet.Header = ({ children }) => { /* ... */ };
BottomSheet.CTA = ({ children }) => { /* ... */ };
BottomSheet.DoubleCTA = ({ left, right }) => { /* ... */ };

// Usage:
<BottomSheet>
  <BottomSheet.Header>Title</BottomSheet.Header>
  <div>Content</div>
  <BottomSheet.DoubleCTA
    left={<Button>Cancel</Button>}
    right={<Button>Confirm</Button>}
  />
</BottomSheet>
```

---

## 🎭 State Props

### Standard State Props (All Components)

| State | Prop Name | Type | Visual Effect |
|-------|-----------|------|---------------|
| **Hover** | — (automatic) | — | Opacity 0.0375-0.075 |
| **Active** | — (automatic) | — | Opacity 0.09-0.18 |
| **Focus** | — (automatic) | — | 2px outline |
| **Disabled** | `disabled` | boolean | 0.3 opacity, cursor disabled |
| **Loading** | `loading` or `isLoading` | boolean | Spinner animation |

### Component-specific States

```typescript
// Button
interface ButtonProps {
  disabled?: boolean;
  loading?: boolean;
}

// Checkbox
interface CheckboxProps {
  checked?: boolean;           // Controlled
  defaultChecked?: boolean;    // Uncontrolled
  disabled?: boolean;
}

// Switch (Toss pattern)
interface SwitchProps {
  checked: boolean;
  disabled?: boolean;
  hasTouchEffect?: boolean;    // Mobile-specific
}

// Toast
interface ToastProps {
  open: boolean;
  duration?: number;
  onClose?: () => void;
  onExited?: () => void;       // After animation
}
```

---

## 🎨 Color Props

### Color Prop Patterns

| Approach | Example | Use Case |
|----------|---------|----------|
| **Semantic** | `color="primary" \| "success" \| "danger"` | Buttons, Badges (meaning-based) |
| **Palette** | `color="blue" \| "red" \| "green"` | Decorative components |
| **Accent** | `accent="primary"` (separate from base color) | Highlights within neutral components |

### Montage Approach
```typescript
// Uses CSS variables internally
<Badge variant="solid" color="accent" />
// Maps to: --semantic-primary-normal
```

### Toss Approach
```typescript
// Explicit color prop required
<Badge variant="fill" size="medium" color="blue" />
<Button variant="fill" size="large" color="primary" />
```

### Recommendation
```typescript
// Semantic for interactive components
<Button variant="fill" color="primary" />
<Button variant="weak" color="danger" />

// Palette for decorative components
<Badge variant="fill" color="blue" />
<Badge variant="weak" color="red" />
```

---

## 📐 Layout & Display Props

### Button Display Modes (Toss)

```typescript
type Display = 'inline' | 'block' | 'full';

<Button display="inline" />  // Inline with other elements
<Button display="block" />   // New line, expands to screen width
<Button display="full" />    // 100% parent width
```

### Bottom Sheet Resize Types (Montage)

```typescript
type ResizeType = 'hug' | 'flexible' | 'fill' | 'fixed';

<BottomSheet resize="hug" />        // Content-fit height
<BottomSheet resize="flexible" />   // 50% initial, expandable
<BottomSheet resize="fill" />       // Full screen
<BottomSheet resize="fixed" maxHeight={400} />  // Specified height
```

### Tab Scroll Behavior (Toss)

```typescript
<Tab fluid={false} />  // Fixed width, max 4 items recommended
<Tab fluid={true} />   // Horizontal scroll for 4+ items
```

---

## ♿ Accessibility Props

### Required ARIA Props

| Component | Built-in ARIA | Developer Must Provide |
|-----------|---------------|------------------------|
| **Button** | `role="button"` | `aria-label` (if icon-only) |
| **Checkbox** | `role="checkbox"`, `aria-checked` | `aria-label` (describing purpose) |
| **Switch** | `role="switch"`, `aria-checked` | `aria-label` (describing function) |
| **Tab** | `role="tablist"`, `aria-selected` | `aria-label` (if icon/unclear) |
| **Toast** | `aria-live="polite"` | — (auto-managed) |

### Accessibility Prop Pattern

```typescript
// ✅ RECOMMENDED: Separate accessibility props
interface ButtonProps {
  // Visual props
  variant: 'fill' | 'weak';
  children?: ReactNode;

  // Accessibility (require when no children)
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// TypeScript enforcement:
type ButtonProps =
  | { children: ReactNode; 'aria-label'?: string }
  | { 'aria-label': string; children?: never };
```

---

## 🎬 Animation Props

### Duration Patterns

| Component | Default Duration | Configurable? | Example |
|-----------|------------------|---------------|---------|
| **Toast** | 3000ms (5000ms with action) | Yes | `duration={4000}` |
| **Skeleton** | 2000ms pulse | No | — |
| **Accordion** | 300ms expand/collapse | No (via CSS) | — |

### Lifecycle Callbacks

```typescript
// Toast pattern (Toss)
interface ToastProps {
  onClose?: () => void;      // Called when closing begins
  onExited?: () => void;     // Called after animation completes
}

// Modal pattern
interface ModalProps {
  onOpen?: () => void;
  onClose?: () => void;
  onAnimationEnd?: () => void;
}
```

---

## 🔧 Customization Props

### CSS Variable Exposure

**Toss Pattern (Explicit per component):**
```typescript
// Button CSS variables
--button-color
--button-background-color
--button-loader-color
--button-disabled-opacity-color
--button-gradient-color

// Usage:
<Button style={{
  '--button-color': 'blue',
  '--button-background-color': 'lightblue'
}} />
```

**Montage Pattern (Semantic tokens):**
```css
--semantic-primary-normal
--semantic-label-neutral
--semantic-fill-normal
```

### Style Props

```typescript
// ✅ RECOMMENDED: Limited style prop exposure
interface ComponentProps {
  className?: string;        // Allow custom classes
  style?: CSSProperties;     // Allow inline styles
  htmlStyle?: CSSProperties; // Toss pattern: explicit HTML style
}

// ❌ AVOID: Too many individual style props
interface ComponentProps {
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  // ... becomes unwieldy
}
```

---

## 📋 Component Prop Templates

### Interactive Component (Button, Chip)

```typescript
interface InteractiveComponentProps {
  // Visual
  variant: 'fill' | 'weak' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'danger';

  // Content
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  // State
  disabled?: boolean;
  loading?: boolean;

  // Interaction
  onClick?: () => void;

  // Accessibility
  'aria-label'?: string;

  // Customization
  className?: string;
  style?: CSSProperties;
}
```

### Feedback Component (Toast, Snackbar)

```typescript
interface FeedbackComponentProps {
  // Visibility
  open: boolean;

  // Content
  message: string;
  icon?: ReactNode;
  action?: ReactNode;

  // Behavior
  position: 'top' | 'bottom';
  duration?: number;
  variant?: 'normal' | 'success' | 'warning' | 'error';

  // Callbacks
  onClose?: () => void;
  onExited?: () => void;

  // Accessibility
  'aria-live'?: 'polite' | 'assertive';
}
```

### Overlay Component (Modal, BottomSheet)

```typescript
interface OverlayComponentProps {
  // Visibility
  open: boolean;
  onClose: () => void;

  // Sizing
  maxHeight?: number;
  resize?: 'hug' | 'flexible' | 'fill' | 'fixed';

  // Structure (use sub-components instead)
  children: ReactNode;

  // Behavior
  closeOnDimmerClick?: boolean;
  disableFocusLock?: boolean;

  // Accessibility
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}
```

### Input Component (Checkbox, Radio, Switch)

```typescript
interface InputComponentProps {
  // State (controlled)
  checked?: boolean;
  onChange?: (checked: boolean) => void;

  // State (uncontrolled)
  defaultChecked?: boolean;

  // Configuration
  inputType?: 'checkbox' | 'radio';
  size?: number;
  disabled?: boolean;

  // Visual (use sub-components for variants)
  // <Checkbox.Circle /> vs <Checkbox.Line />

  // Accessibility
  'aria-label': string;  // Required
  name?: string;
}
```

---

## 🎯 Decision Matrix

Use this to quickly decide component prop structure:

### Should I make this prop required?

| Scenario | Required? | Example |
|----------|-----------|---------|
| Defines core behavior | ✅ Yes | `open` (Toast), `variant` (Button) |
| Has sensible default | ❌ No | `size="md"` (Button), `duration={3000}` (Toast) |
| Critical for accessibility | ✅ Yes (when needed) | `aria-label` (icon-only buttons) |
| Design consistency critical | ✅ Yes | `variant`, `color` (Badge) |

### Should I use sub-components?

| Scenario | Use Sub-components? | Example |
|----------|---------------------|---------|
| Multiple visual variants | ✅ Yes | `<Checkbox.Circle>` vs `<Checkbox.Line>` |
| Complex nested structure | ✅ Yes | `<Modal.Header>`, `<Modal.Body>`, `<Modal.Footer>` |
| Optional addons | ✅ Yes | `<Toast.Icon>`, `<Toast.Lottie>` |
| Simple boolean toggle | ❌ No (use prop) | `leadingIcon={true}` |

### Should I expose this as a prop?

| Scenario | Expose? | Alternative |
|----------|---------|-------------|
| User needs control | ✅ Yes | `size`, `variant`, `color` |
| Internal implementation detail | ❌ No | Animation timing (use CSS) |
| Rarely customized | ⚠️ CSS variable | `--component-border-radius` |
| Design system control | ❌ No (token only) | Spacing values |

---

## 📚 Real-World Examples

### Example 1: Designing a new Alert component

**Step 1: Choose variant pattern**
- Semantic variants: `variant="success" | "warning" | "error" | "info"`

**Step 2: Decide required props**
- Required: `variant` (defines behavior), `children` (message)
- Optional: `icon`, `action`, `onClose`

**Step 3: Structure**
```typescript
interface AlertProps {
  variant: 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
  'aria-live'?: 'polite' | 'assertive';
}
```

### Example 2: Designing a new Card component

**Step 1: Use sub-components (complex structure)**

**Step 2: Define sub-components**
- `Card` (container)
- `Card.Image` (thumbnail)
- `Card.Content` (main content area)
- `Card.Header` (title section)
- `Card.Footer` (actions)

**Step 3: Structure**
```typescript
const Card = ({ children, variant = 'elevated' }) => { /* ... */ };
Card.Image = ({ src, aspectRatio = '3/2' }) => { /* ... */ };
Card.Content = ({ children, padding = 'md' }) => { /* ... */ };
Card.Header = ({ title, subtitle }) => { /* ... */ };
Card.Footer = ({ children }) => { /* ... */ };

// Usage:
<Card variant="elevated">
  <Card.Image src="..." aspectRatio="16/9" />
  <Card.Content>
    <Card.Header title="Title" subtitle="Subtitle" />
    <p>Description</p>
  </Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## 🔍 Quick Checklist for New Components

Before finalizing component props, verify:

- [ ] **Variants**: Using consistent naming (Fill/Weak) across system?
- [ ] **Required Props**: Are design-critical props required?
- [ ] **Sizes**: Using named sizes (xs/sm/md/lg/xl) with numeric fallback?
- [ ] **States**: Controlled/uncontrolled patterns for inputs?
- [ ] **Sub-components**: Would structure benefit from composition?
- [ ] **Accessibility**: All ARIA attributes handled?
- [ ] **Callbacks**: Clear naming (onChange, onClose, onExited)?
- [ ] **CSS Variables**: Key customization points exposed?
- [ ] **TypeScript**: Props properly typed with JSDoc?
- [ ] **Documentation**: All props documented with examples?

---

**Last Updated:** 2026-02-06
**Based on:** Montage Design System + Toss Design System (TDS Mobile) analysis
