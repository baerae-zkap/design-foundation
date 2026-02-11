# Montage & Toss Design System Research
## Presentation Summary

**Research Date:** 2026-02-06
**Scope:** 20+ components from two leading Korean design systems
**Purpose:** Inform Design Foundation component API design decisions

---

## 📊 Executive Summary

### What We Researched

**Montage Design System** (by Wanted)
- 15 components analyzed
- Emphasis on semantic variants and animation details
- Strong responsive design documentation

**Toss Design System (TDS Mobile)**
- 10 components analyzed
- Focus on reusable patterns and accessibility
- Excellent TypeScript/React API design

### Key Finding

**Toss's approach is more systematic and scalable**, but **Montage has valuable domain-specific patterns** (especially for feedback components).

**Recommendation:** Adopt Toss's structural patterns + Montage's semantic variants for feedback.

---

## 🎯 Top 5 Patterns to Adopt

### 1. Fill/Weak Variant System ⭐⭐⭐⭐⭐
**Source:** Toss

**What:** Consistent visual weight system across all components
- `fill` = High saturation, primary emphasis
- `weak` = Low saturation, secondary emphasis
- `outline` = Border only (add to their system)
- `ghost` = Minimal styling (add to their system)

**Why Better Than Alternatives:**
- ❌ Montage uses: Primary/Secondary/Tertiary (not reusable)
- ✅ Toss uses: Fill/Weak (works for Button, Badge, Alert, etc.)

**Code Example:**
```typescript
// Same variant system across components
<Button variant="fill" color="primary">Submit</Button>
<Badge variant="weak" color="success">New</Badge>
<Alert variant="fill" color="danger">Error</Alert>
```

**Adoption Impact:**
- Reduces cognitive load (learn once, use everywhere)
- Consistent visual hierarchy
- Easier to maintain

---

### 2. Sub-component Composition ⭐⭐⭐⭐⭐
**Source:** Toss

**What:** Complex components split into composable sub-components

**Before (Montage pattern):**
```typescript
<BottomSheet
  title="Confirm"
  description="Are you sure?"
  primaryButton="Yes"
  secondaryButton="No"
  onPrimaryClick={handleYes}
  onSecondaryClick={handleNo}
/>
// Problems: Too many props, inflexible
```

**After (Toss pattern):**
```typescript
<BottomSheet open={true} onClose={handleClose}>
  <BottomSheet.Header>Confirm</BottomSheet.Header>
  <BottomSheet.HeaderDescription>
    Are you sure?
  </BottomSheet.HeaderDescription>
  <BottomSheet.DoubleCTA
    left={<Button variant="weak">No</Button>}
    right={<Button variant="fill">Yes</Button>}
  />
</BottomSheet>
// Benefits: Flexible, composable, type-safe
```

**Best For:**
- ✅ Modal, BottomSheet, Card (complex layouts)
- ✅ Components with many structural variations
- ❌ Button, Badge (simple components - use flat props)

**Adoption Impact:**
- More flexible without prop explosion
- Better TypeScript inference
- Tree-shaking friendly

---

### 3. Required Props for Consistency ⭐⭐⭐⭐
**Source:** Toss

**What:** Force developers to specify design-critical props

**Toss Badge (all required):**
```typescript
interface BadgeProps {
  variant: 'fill' | 'weak';  // Required
  size: 'xs' | 'sm' | 'md';  // Required
  color: 'blue' | 'red';     // Required
}

// ✅ Must specify all
<Badge variant="fill" size="md" color="blue">New</Badge>

// ❌ TypeScript error: missing props
<Badge>New</Badge>
```

**Vs. Montage (all optional):**
```typescript
interface BadgeProps {
  variant?: 'solid' | 'outlined';  // Defaults to 'solid'
  size?: 'sm' | 'md';              // Defaults to 'md'
}

// Works but leads to inconsistent usage
<Badge>New</Badge>
<Badge variant="solid">New</Badge>
<Badge size="sm">New</Badge>
```

**Recommendation:**
```typescript
// Require design-critical props only
interface ButtonProps {
  variant: 'fill' | 'weak';     // Required: defines visual weight
  size?: 'sm' | 'md' | 'lg';    // Optional: has sensible default
  color?: 'primary' | 'danger';  // Optional: has sensible default
}
```

**Adoption Impact:**
- Forces intentional design decisions
- Prevents inconsistent component usage
- Better TypeScript developer experience

---

### 4. Built-in Accessibility ⭐⭐⭐⭐⭐
**Source:** Both (Toss has better docs)

**What:** Automatic ARIA management + required props when needed

**Example: Switch (Toss)**
```typescript
<Switch
  checked={enabled}
  onChange={setEnabled}
  aria-label="Enable notifications"  // Required prop
  // Auto-managed:
  // role="switch"
  // aria-checked={enabled}
  // aria-disabled={disabled}
  // Keyboard navigation (Space/Enter)
/>
```

**Example: Toast (Toss)**
```typescript
<Toast
  open={true}
  message="Payment successful"
  aria-live="assertive"  // Screen reader priority
  // Announces immediately to screen readers
/>
```

**Key Learnings:**
1. **Auto-manage** standard ARIA (role, aria-checked, aria-disabled)
2. **Require** context ARIA (aria-label when no visible label)
3. **Build in** keyboard navigation
4. **Provide guidance** in docs: "Don't say 'checkbox' in aria-label"

**Adoption Impact:**
- WCAG compliant by default
- Better screen reader support
- Reduced developer burden

---

### 5. Controlled & Uncontrolled Patterns ⭐⭐⭐⭐
**Source:** Both (standard React pattern)

**What:** Support both internal and external state management

**Uncontrolled (simple use):**
```typescript
// Component manages its own state
<Checkbox defaultChecked={true} aria-label="Accept terms" />
```

**Controlled (complex use):**
```typescript
// Parent manages state
const [accepted, setAccepted] = useState(false);
<Checkbox
  checked={accepted}
  onChange={setAccepted}
  aria-label="Accept terms"
/>
```

**Implementation:**
```typescript
const Checkbox = ({ checked, defaultChecked, onChange }) => {
  const [internal, setInternal] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internal;

  const handleChange = (newValue) => {
    if (!isControlled) setInternal(newValue);
    onChange?.(newValue);
  };
  // ...
};
```

**Adoption Impact:**
- Progressive enhancement (start simple, add control later)
- Flexibility for different use cases
- Standard React pattern (familiar to developers)

---

## 🚫 Top 3 Anti-patterns to Avoid

### 1. Too Many Optional Props ❌
**Bad (Montage pattern):**
```typescript
<Button
  // Everything optional with defaults
  variant="primary"
  size="md"
  color="blue"
/>
// Problem: Easy to be inconsistent, hard to maintain consistency
```

**Good (Toss pattern):**
```typescript
<Button
  variant="fill"  // Required: forces decision
  size="md"       // Optional: sensible default
  color="primary" // Optional: sensible default
/>
```

---

### 2. Boolean Props for Variants ❌
**Bad:**
```typescript
<Toast
  leadingIcon={true}
  positive={false}
  cautionary={false}
  negative={false}
/>
// Problem: Multiple booleans = confusing, error-prone
```

**Good:**
```typescript
<Toast
  variant="success"
  icon={<CheckIcon />}
/>
// Or with sub-components:
<Toast variant="success">
  <Toast.Icon><CheckIcon /></Toast.Icon>
  Message here
</Toast>
```

---

### 3. No Accessibility Consideration ❌
**Bad:**
```typescript
<button onClick={toggle} className="switch">
  {/* No ARIA, no keyboard support */}
</button>
```

**Good:**
```typescript
<button
  role="switch"
  aria-checked={checked}
  aria-label="Enable notifications"
  onClick={toggle}
  onKeyDown={handleKeyDown}  // Space/Enter support
>
  {/* Visual switch */}
</button>
```

---

## 📊 Component Comparison Matrix

### Most Important Components

| Component | Montage Approach | Toss Approach | Recommendation |
|-----------|------------------|---------------|----------------|
| **Button** | Style variants (Primary/Secondary) | Weight variants (Fill/Weak) + sizes | **Toss** (more systematic) |
| **Badge** | Optional props | **All required** (variant/size/color) | **Toss** (forces consistency) |
| **Toast** | **Semantic variants** (Positive/Negative) | Position-based | **Combine both** |
| **Bottom Sheet** | **Resize behaviors** (Hug/Flexible/Fill) | Sub-components | **Combine both** |
| **Checkbox** | Not documented | **Sub-components** (Circle/Line) | **Toss** |
| **Tab** | Sticky positioning | **Fluid scroll** + notification badge | **Toss** (more features) |

---

## 🎨 Design Token Integration

### Both Systems Use Tokens

**Montage:**
```css
--semantic-primary-normal
--semantic-label-neutral
--semantic-fill-normal
```

**Toss:**
```css
--button-color
--button-background-color
--button-loader-color
```

**Our Foundation Tokens:**
```json
// /public/spacing-tokens.json
{
  "button": { "gap": 8, "padding": { "sm": 12, "md": 16, "lg": 20 } },
  "card": { "padding": { "md": 20 } }
}

// /public/radius-tokens.json
{
  "button": { "sm": 8, "lg": 12 },
  "card": { "sm": 12 }
}
```

**Action Item:** Ensure ALL new components use these tokens (no hardcoded values).

---

## 📋 Implementation Roadmap

### Phase 1: Foundation (2 weeks)
**Goal:** Establish core patterns

- [ ] Define Fill/Weak variant system
- [ ] Establish xs/sm/md/lg/xl size scale
- [ ] Create component CSS variable structure
- [ ] Document animation tokens
- [ ] Update existing components to use tokens

### Phase 2: Core Components (2 weeks)
**Goal:** Implement most-used components

- [ ] Button: Toss-style API (variant/size/display)
- [ ] Badge: Required props pattern
- [ ] Toast: Semantic variants + position
- [ ] Checkbox: Sub-component shapes
- [ ] Switch: Built-in accessibility

### Phase 3: Complex Components (2 weeks)
**Goal:** Implement layout components

- [ ] BottomSheet: Resize + sub-components
- [ ] Modal: Sub-component composition
- [ ] Card: Structured sections
- [ ] Tab: Fluid scroll + notification badge

### Phase 4: Polish (2 weeks)
**Goal:** Quality assurance

- [ ] Accessibility audit (screen reader testing)
- [ ] Animation refinement
- [ ] Complete documentation
- [ ] Storybook examples for all variants

---

## 💬 Discussion Questions

### For Design Team

1. **Variant naming:** Prefer Fill/Weak (Toss) or Primary/Secondary (Montage)?
2. **Required props:** Should we force variant/size on all components?
3. **Color system:** Semantic (primary/danger) or palette (blue/red)?
4. **Animation:** What durations feel right for our brand?

### For Engineering Team

1. **Sub-components:** Which components need composition pattern?
2. **TypeScript:** How strict should prop typing be?
3. **CSS variables:** Expose all variables or just key ones?
4. **Testing:** Accessibility testing strategy?

### For Product Team

1. **Priority:** Which components do we need first?
2. **Mobile:** React Native parity needed immediately?
3. **Scope:** Are we missing any critical components?
4. **Timeline:** 8-week roadmap realistic?

---

## 🎯 Success Metrics

### Developer Experience
- ✅ Component prop discovery time < 2 minutes
- ✅ 90%+ prop names are self-explanatory
- ✅ TypeScript autocomplete works perfectly

### Design Consistency
- ✅ Same variant names across all components
- ✅ All components use Foundation tokens
- ✅ Zero hardcoded spacing/radius values

### Accessibility
- ✅ 100% WCAG 2.1 AA compliance
- ✅ All components keyboard navigable
- ✅ Screen reader tested and documented

### Performance
- ✅ Bundle size < 100KB (tree-shaken)
- ✅ Zero runtime CSS-in-JS (use CSS modules)
- ✅ All components lazy-loadable

---

## 📚 Resources

### Full Documentation
- **README.md** - Navigation and overview
- **montage-toss-component-analysis.md** - Complete component breakdown
- **key-findings-summary.md** - Strategic recommendations
- **component-props-quick-reference.md** - Fast lookup guide
- **implementation-patterns.md** - Code templates
- **visual-comparison-chart.md** - Visual decision matrices

### External Links
- Montage: https://montage.wanted.co.kr/docs/components/
- Toss: https://tossmini-docs.toss.im/tds-mobile/

---

## 🚀 Next Steps

### Immediate (This Week)
1. **Review this presentation** with design + engineering leads
2. **Make decisions** on variant naming, required props, color system
3. **Update MEMORY.md** with team decisions

### Short-term (Next 2 Weeks)
1. **Phase 1 implementation** (foundation patterns)
2. **Update existing components** to use new patterns
3. **Document decisions** in component guidelines

### Long-term (Next 2 Months)
1. **Complete roadmap** (Phases 2-4)
2. **Migration guide** for existing components
3. **Training materials** for team

---

## ✅ Summary

### What We Learned
- Toss has more systematic, scalable component APIs
- Montage has valuable domain-specific patterns
- Both emphasize accessibility and tokens
- Sub-components enable flexibility without prop explosion

### What We Recommend
1. ✅ Adopt Fill/Weak variant system (Toss)
2. ✅ Use sub-components for complex layouts (Toss)
3. ✅ Require design-critical props (Toss)
4. ✅ Build in accessibility by default (Both)
5. ✅ Keep semantic variants for feedback (Montage)

### Expected Outcomes
- More consistent component usage
- Better developer experience
- Improved accessibility
- Easier maintenance
- Faster component development

---

**Prepared by:** Claude (oh-my-claudecode:researcher agent)
**Research Duration:** ~2 hours (automated analysis)
**Total Pages:** 6 comprehensive documents (92KB total)
**Ready for:** Team review and decision-making

---

## 🙋 Q&A

*Add your questions here during the presentation*
