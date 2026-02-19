# AGENTS.md -- @baerae-zkap/design-system

> AI guidance for product developers building UIs with the zkap design system. Last updated: 2026-02-19.

## Purpose

This repository provides `@baerae-zkap/design-system` -- a React component library and design token system. The `.claude/rules/` and `.claude/skills/` files help AI assistants generate consistent, on-brand product UI code.

**Target audience:** Product developers who have installed `@baerae-zkap/design-system` and use AI to build screens, forms, and features.

## Quick Start

```tsx
import { Button, Card, TextField, ListCell } from '@baerae-zkap/design-system';
import { spacing, typography, radius } from '@baerae-zkap/design-system';
```

Theme is CSS-variable-based. Light/dark mode switches automatically. No manual theme code needed.

## Component Inventory (24 total)

### Actions (5)
`Button`, `IconButton`, `TextButton`, `Chip`, `ActionArea`

### Contents (8)
`Card`, `ListCard`, `ListCell`, `SectionHeader`, `Accordion`, `ContentBadge`, `Table`, `Thumbnail`

### Inputs (11)
`TextField`, `TextArea`, `SearchField`, `Select`, `Checkbox`, `CheckMark`, `Radio`, `Switch`, `Slider`, `SegmentedControl`, `FramedStyle`

## Token Exports

| Token | Import | Example |
|-------|--------|---------|
| Spacing | `spacing` | `spacing.primitive[4]` = 16px |
| Typography | `typography` | `typography.semantic.body.md` = { fontSize: 16, lineHeight: 24, ... } |
| Radius | `radius` | `radius.component.card.md` = 16 |
| Colors (light) | `lightColors` | `lightColors.content.base.default` = hex string |
| Colors (dark) | `darkColors` | `darkColors.content.base.default` = hex string |
| Colors (CSS var) | CSS variables | `var(--content-base-default)` |

## When to Load Which Skill

| Task | Skill | Path |
|------|-------|------|
| Building a new product screen or page | `build-screen` | `.claude/skills/build-screen/SKILL.md` |
| Adding a form or multi-field input section | `build-form` | `.claude/skills/build-form/SKILL.md` |

These skills are for **product UI development** -- building screens that consume the design system, not for editing the design system itself.

## Auto-Loaded Rules

The rules in `.claude/rules/` are loaded automatically and provide:

| Rule | Content |
|------|---------|
| `00-system-overview.md` | What the design system is, all 24 components, import statements |
| `10-visual-language.md` | Color philosophy, spacing rhythm, typography hierarchy, border radius |
| `20-component-selection.md` | Decision tree: IF user needs X, THEN use component Y |
| `30-layout-composition.md` | Page structure, card/list/form layout patterns, empty/loading states |
| `40-token-usage.md` | How to use spacing, typography, radius, and color tokens in code |
| `50-ux-patterns.md` | Button states, form validation, destructive confirmation, accessibility |

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| CSS variables for colors | Automatic light/dark mode. No manual theme switching in product code. |
| Semantic color props (`primary`, `error`, `neutral`) | Clear intent. One `primary` CTA per section, `error` for destructive. |
| 4px spacing grid | Consistent rhythm. All spacing values are multiples of 4. |
| `filled` + `weak` variant hierarchy | Filled = strong emphasis, Weak = soft secondary. Simple two-level system. |
| System components for all UI elements | No custom buttons, inputs, or cards. Consistency and accessibility built in. |
