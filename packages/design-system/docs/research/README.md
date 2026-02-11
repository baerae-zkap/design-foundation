# Montage & Toss Design System Research

## Overview

This directory contains comprehensive research and analysis of component Props/Variants structures from two leading Korean design systems:

- **Montage Design System** by Wanted (https://montage.wanted.co.kr/)
- **Toss Design System (TDS Mobile)** (https://tossmini-docs.toss.im/tds-mobile/)

**Research Date:** 2026-02-06

---

## 📚 Research Documents

### 1. [montage-toss-component-analysis.md](./montage-toss-component-analysis.md)
**Complete Component Analysis** - 20+ components analyzed in detail

**Contents:**
- Component-by-component breakdown
- Props, Variants, States, Sizes for each component
- Visual specifications (spacing, colors, typography)
- Design pattern insights
- Accessibility features
- Animation specifications

**Use when:** You need detailed information about a specific component from either system.

---

### 2. [key-findings-summary.md](./key-findings-summary.md)
**Executive Summary & Strategic Recommendations**

**Contents:**
- Critical design patterns comparison
- Variant naming philosophies (Semantic vs. Visual Weight)
- Props structure patterns (Required vs. Optional)
- Sub-component composition patterns
- Accessibility-first design approaches
- Implementation priorities (Phase 1-4)
- Team discussion questions

**Use when:** Making high-level architectural decisions about component APIs.

---

### 3. [component-props-quick-reference.md](./component-props-quick-reference.md)
**Quick Reference Guide** - Fast lookups during component design

**Contents:**
- Variant patterns comparison table
- Size systems (named vs. numeric)
- Required vs. Optional props guidelines
- Sub-component decision matrix
- State management patterns
- Color prop patterns
- Accessibility checklist
- Decision matrices for prop design

**Use when:** Designing a new component and need quick pattern references.

---

### 4. [implementation-patterns.md](./implementation-patterns.md)
**Code Templates & Practical Examples**

**Contents:**
- 10 implementation patterns with TypeScript code
- Fill/Weak variant system implementation
- Sub-component composition pattern
- Controlled/Uncontrolled state pattern
- Accessibility implementation
- CSS variable customization
- Animation lifecycle callbacks
- Complete component template

**Use when:** Actually coding a component and need copy-paste templates.

---

## 🎯 Quick Start Guide

### For Designers

**Start here:** [key-findings-summary.md](./key-findings-summary.md)
- Understand variant naming conventions
- Review size and color systems
- See visual examples of both systems

**Then review:** [component-props-quick-reference.md](./component-props-quick-reference.md)
- Use decision matrices for new components
- Check accessibility requirements
- Review standard state patterns

### For Developers

**Start here:** [implementation-patterns.md](./implementation-patterns.md)
- Copy component templates
- Implement variant systems
- Add accessibility features

**Then check:** [component-props-quick-reference.md](./component-props-quick-reference.md)
- Verify prop naming conventions
- Confirm state management approach
- Review TypeScript patterns

### For Product Managers

**Start here:** [key-findings-summary.md](./key-findings-summary.md)
- See competitive analysis
- Understand implementation priorities
- Review adoption recommendations

**Then check:** [montage-toss-component-analysis.md](./montage-toss-component-analysis.md)
- Deep dive into specific components
- Understand feature completeness
- Compare platform coverage

---

## 🔑 Key Takeaways

### Top 5 Patterns to Adopt

1. **Fill/Weak Variant System** (Toss)
   - Reusable across all components
   - Clear visual hierarchy
   - More consistent than semantic variants

2. **Sub-component Composition** (Toss)
   - Flexible layouts without complex props
   - Type-safe structure
   - Better for complex components (Modal, BottomSheet, Card)

3. **Required Props for Consistency** (Toss)
   - Forces intentional design decisions
   - Prevents inconsistent usage
   - Better TypeScript errors

4. **Built-in Accessibility** (Both)
   - Automatic ARIA management
   - Screen reader friendly by default
   - Keyboard navigation built-in

5. **Controlled & Uncontrolled State** (Both)
   - Flexibility in state management
   - Progressive enhancement
   - Standard React pattern

### Top 3 Anti-patterns to Avoid

1. **❌ Too Many Optional Props with Defaults**
   - Makes inconsistent usage easy
   - Harder to maintain consistency
   - Better: Require key props like variant, size

2. **❌ Mixing Controlled/Uncontrolled Without Clear Pattern**
   - Confusing for developers
   - State bugs
   - Better: Support both explicitly with `checked`/`defaultChecked`

3. **❌ No Accessibility Consideration**
   - Fails WCAG compliance
   - Poor screen reader experience
   - Better: Build ARIA in from the start

---

## 📊 Component Coverage

### Components Fully Analyzed

**Feedback Components:**
- Toast (Montage + Toss) ✅
- Snackbar (Montage) ✅
- Alert (Partial - Montage)

**Action Components:**
- Button (Montage + Toss) ✅
- Icon Button (Montage) ✅
- Text Button (Montage) ✅
- Chip (Montage - limited)

**Status Components:**
- Badge (Montage + Toss) ✅
- Content Badge (Montage) ✅

**Input Components:**
- Checkbox (Toss) ✅
- Switch (Toss) ✅
- Radio (404 - not found)
- TextField (404 - not found)

**Layout Components:**
- Card (Montage) ✅
- List Cell (Montage) ✅
- Accordion (Montage) ✅

**Overlay Components:**
- Bottom Sheet (Montage + Toss) ✅
- Modal/Popup (Montage - partial)
- Dialog (Toss - 404)

**Navigation Components:**
- Tab (Montage + Toss) ✅

**Loading Components:**
- Loading/Spinner (Montage) ✅
- Skeleton (Montage) ✅

### Components Not Documented (404 Errors)
- Radio (Montage)
- Switch (Montage)
- TextField (Both systems)
- Dialog (Toss - likely in overlay utilities)

---

## 🎨 Design System Philosophies

### Montage Design System

**Strengths:**
- ✅ Semantic status variants (Normal, Positive, Cautionary, Negative)
- ✅ Detailed animation specifications (cubic-bezier, duration)
- ✅ Responsive design documentation (breakpoints, constraints)
- ✅ Behavioral variants (Bottom Sheet resize types)

**Approach:**
- Semantic naming for feedback components
- CSS variable system with semantic tokens
- Platform-specific documentation (Web, iOS, Android)
- Visual hierarchy through color and style

### Toss Design System (TDS Mobile)

**Strengths:**
- ✅ Reusable variant system (Fill/Weak across components)
- ✅ Sub-component composition pattern
- ✅ Explicit prop requirements (forces consistency)
- ✅ Excellent accessibility documentation

**Approach:**
- Visual weight-based variants (Fill = high saturation, Weak = low)
- Required props for design-critical decisions
- Compound component patterns for flexibility
- Built-in ARIA support with developer guidance

---

## 💡 Implementation Recommendations

### Phase 1: Foundation (Weeks 1-2)
**Goal:** Establish core patterns and systems

- [ ] Define variant naming system (recommend: Fill/Weak + semantic colors)
- [ ] Establish size system (xs/sm/md/lg/xl with numeric fallback)
- [ ] Create CSS variable structure per component
- [ ] Document animation tokens (durations, easing functions)
- [ ] Set up token structure matching `/public/spacing-tokens.json`, `/public/radius-tokens.json`

### Phase 2: Core Components (Weeks 3-4)
**Goal:** Implement most-used components with new patterns

- [ ] Button: Toss-style variant/size/display props
- [ ] Badge: Required props pattern
- [ ] Toast: Combine Montage status + Toss position/action
- [ ] Checkbox/Radio: Sub-component pattern for shapes
- [ ] Switch: Built-in accessibility

### Phase 3: Complex Components (Weeks 5-6)
**Goal:** Implement layout and overlay components

- [ ] BottomSheet: Resize behaviors + sub-components
- [ ] Modal: Sub-component composition
- [ ] Card: Structured sections with sub-components
- [ ] Tab: Add fluid scroll + notification badge
- [ ] Accordion: Animation and keyboard navigation

### Phase 4: Polish (Weeks 7-8)
**Goal:** Finalize quality and documentation

- [ ] Accessibility audit (all ARIA attributes)
- [ ] Animation refinement (timing, easing)
- [ ] Documentation completion (all props documented)
- [ ] Storybook examples (all variants/states)
- [ ] Performance optimization
- [ ] Dark mode support

---

## 🔍 Research Methodology

### Data Collection

1. **Web Scraping:** Used WebFetch tool to extract documentation from official sites
2. **Component Analysis:** Analyzed 20+ components across both systems
3. **Pattern Recognition:** Identified common patterns and differences
4. **Code Examination:** Reviewed CSS and structural patterns
5. **Accessibility Review:** Checked ARIA implementations and guidelines

### Limitations

- Some components returned 404 errors (Radio, Switch, TextField)
- Alert component had limited CSS-only extraction
- Cannot access TypeScript source code (interfaces inferred from docs)
- Platform-specific details (iOS/Android) not fully explored
- Animation implementations inferred from CSS rather than JS

### Future Research Opportunities

1. **Source Code Analysis:** Review actual TypeScript interfaces
2. **Token Systems:** Deep dive into design token structures
3. **Theme Implementation:** Study dark/light mode switching
4. **Migration Patterns:** Analyze Toss v1→v2 breaking changes
5. **Performance Benchmarks:** Bundle size, render performance
6. **Platform Parity:** React Native implementation patterns

---

## 📖 How to Use This Research

### When Designing a New Component

1. **Check component-props-quick-reference.md** for similar components
2. **Review implementation-patterns.md** for code templates
3. **Consult decision matrices** for variant/size/prop choices
4. **Verify accessibility requirements** from patterns
5. **Test with actual users** and iterate

### When Making API Decisions

1. **Review key-findings-summary.md** for strategic patterns
2. **Check both systems' approaches** in montage-toss-component-analysis.md
3. **Use decision matrices** to justify choices
4. **Document rationale** in component docs
5. **Align with existing patterns** in the design system

### When Implementing

1. **Copy templates** from implementation-patterns.md
2. **Use Foundation tokens** from `/public/spacing-tokens.json`, `/public/radius-tokens.json`
3. **Follow accessibility patterns** for ARIA attributes
4. **Test with keyboard** and screen readers
5. **Add Storybook stories** showing all variants/states

---

## 🤝 Contributing

### Updating This Research

If you find new information or patterns:

1. Update the relevant document (analysis, summary, reference, or patterns)
2. Add date and source to the document
3. Update this README if adding new documents
4. Keep all documents in sync (cross-reference changes)

### Adding New Components

When researching additional components:

1. Follow the same structure as existing analyses
2. Extract: Variants, Props, Sizes, States, Colors, Accessibility
3. Add to component-props-quick-reference.md for easy lookup
4. Create implementation pattern if novel approach found

---

## 🔗 External Resources

### Montage Design System
- **Documentation:** https://montage.wanted.co.kr/docs/components/
- **Organization:** Wanted (원티드)
- **Focus:** Web, iOS, Android multi-platform consistency

### Toss Design System (TDS Mobile)
- **Documentation:** https://tossmini-docs.toss.im/tds-mobile/
- **Organization:** Toss (토스)
- **Focus:** Mobile-first financial services design

### Other Design Systems (for comparison)
- **Ant Design:** https://ant.design/
- **Material-UI:** https://mui.com/
- **Chakra UI:** https://chakra-ui.com/
- **Radix UI:** https://www.radix-ui.com/

---

## 📝 Document History

| Date | Document | Changes |
|------|----------|---------|
| 2026-02-06 | All | Initial research and analysis completed |
| 2026-02-06 | README.md | Created navigation and overview document |

---

## 💬 Questions?

For questions about this research or to request additional analysis:

1. Check the relevant document first (use navigation above)
2. Review the quick reference for fast answers
3. Consult implementation patterns for code examples
4. Refer to key findings for strategic guidance

---

**Research conducted by:** Claude (oh-my-claudecode:researcher agent)
**Analysis scope:** 20+ components, 4 comprehensive documents
**Total research time:** ~2 hours (automated web scraping + analysis)
**Primary focus:** Component Props/Variants structure patterns for Design Foundation project
