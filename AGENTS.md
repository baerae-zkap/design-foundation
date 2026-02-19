# AGENTS.md -- @baerae-zkap/design-system

> Machine-readable project state for AI agents. Last updated: 2026-02-19.

## Project Purpose
Design Foundation with token pipeline and React web component library, served by a Next.js documentation site. Package name: `@baerae-zkap/design-system`.

## Tech Stack
- **Runtime:** React 19, TypeScript 5
- **Docs:** Next.js 16 (App Router), Tailwind CSS 4
- **Package:** Local-linked monorepo (`packages/design-system`)
- **Tokens:** JSON source -> Node scripts -> generated TS/CSS
- **No test framework currently configured**

## Repo Structure
```
/
├── packages/design-system/
│   └── src/
│       ├── components/     # 13 web components (Actions + Contents)
│       │   ├── Accordion/
│       │   ├── ActionArea/
│       │   ├── Button/
│       │   ├── Card/
│       │   ├── Chip/
│       │   ├── ContentBadge/
│       │   ├── IconButton/
│       │   ├── ListCard/
│       │   ├── ListCell/
│       │   ├── SectionHeader/
│       │   ├── Table/
│       │   ├── TextButton/
│       │   └── Thumbnail/
│       ├── tokens/         # Design tokens (TS exports)
│       │   ├── colors.ts       # AUTO-GENERATED
│       │   ├── effects.ts      # AUTO-GENERATED
│       │   ├── shadow.ts       # AUTO-GENERATED
│       │   ├── spacing.ts      # manual
│       │   ├── radius.ts       # manual
│       │   ├── typography.ts   # manual
│       │   ├── motion.ts       # manual
│       │   ├── general.ts      # manual (opacity, borderWidth, zIndex)
│       │   └── index.ts        # barrel
│       ├── utils/
│       │   ├── usePressable.ts # Shared press/hover state hook
│       │   └── styles.ts       # Re-exports transitions, disabled helpers
│       └── index.ts            # Public API barrel
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── components/
│   │   │   ├── actions/        # 5 doc pages (complete)
│   │   │   └── contents/       # 8 doc pages (style-only)
│   │   ├── generated-color-tokens.css      # AUTO-GENERATED
│   │   └── generated-foundation-tokens.css # AUTO-GENERATED
│   └── components/
│       ├── Sidebar.tsx         # Navigation with category labels
│       └── docs/               # Shared doc components
│           ├── Section.tsx     # Section, Subsection, InlineCode
│           ├── PropsTable.tsx  # Props table, ColorTableRow
│           ├── Cards.tsx       # DoCard, DontCard, PrincipleCard, VariantCard
│           ├── Playground.tsx  # RadioGroup, CopyButton
│           └── Labels.tsx      # DoLabel, DontLabel, NumberBadge
├── public/                     # Token source JSONs
│   ├── palette.json
│   ├── semantic-tokens.json
│   ├── effects-tokens.json
│   ├── shadow-tokens.json
│   ├── spacing-tokens.json
│   ├── radius-tokens.json
│   └── typography-tokens.json
├── scripts/                    # Token generation scripts
│   ├── generate-colors-ts.mjs
│   ├── generate-color-css.mjs
│   ├── generate-effects-ts.mjs
│   ├── generate-shadow-ts.mjs
│   ├── generate-foundation-css.mjs
│   ├── check-no-raw-colors.mjs
│   └── lint-tokens.mjs
├── .claude/
│   ├── rules/              # Project conventions (auto-loaded)
│   └── skills/             # On-demand recipes
│       ├── new-component/  # Create a new component
│       ├── token-edit/     # Add/modify design tokens
│       └── doc-page/       # Create a documentation page
└── AGENTS.md               # This file
```

## Component Completion Index

### Actions (5/5 -- fully complete)

| Component | File | Code Done | CSS Var | Color Rename | Variant | A11y | Doc Page | Doc Cross-Check |
|-----------|------|:---------:|:-------:|:------------:|:-------:|:----:|:--------:|:---------------:|
| Button | `Button/Button.tsx` | Y | Y | Y | filled+weak | -- | Y | Y |
| IconButton | `IconButton/IconButton.tsx` | Y | Y | Y | filled+ghost+weak | -- | Y | Y |
| TextButton | `TextButton/TextButton.tsx` | Y | Y | Y | -- | -- | Y | Y |
| Chip | `Chip/Chip.tsx` | Y | Y | Y | filled+weak | -- | Y | Y |
| ActionArea | `ActionArea/ActionArea.tsx` | Y | Y | -- | -- | -- | Y | Y |

### Contents (8 -- 2 code-complete, all doc-styled)

| Component | File | Code Done | CSS Var | API Improved | A11y | Doc Style | Doc Cross-Check |
|-----------|------|:---------:|:-------:|:------------:|:----:|:---------:|:---------------:|
| Accordion | `Accordion/Accordion.tsx` | Y | Y | Y | Y | Y | -- |
| Card | `Card/Card.tsx` | Y | Y | Y | Y | Y | -- |
| ContentBadge | `ContentBadge/ContentBadge.tsx` | -- | Y | TODO | -- | Y | -- |
| ListCard | `ListCard/ListCard.tsx` | -- | -- | TODO | -- | Y | -- |
| ListCell | `ListCell/ListCell.tsx` | -- | -- | TODO | -- | Y | -- |
| SectionHeader | `SectionHeader/SectionHeader.tsx` | -- | -- | TODO | -- | Y | -- |
| Table | `Table/Table.tsx` | -- | -- | TODO | -- | Y | -- |
| Thumbnail | `Thumbnail/Thumbnail.tsx` | -- | -- | TODO | -- | Y | -- |

### Inputs (11 -- code exists, no doc pages)

| Component | Code Exists | CSS Var | Tokenized | Doc Page |
|-----------|:-----------:|:-------:|:---------:|:--------:|
| TextField | Y | Y | Y | TODO |
| TextArea | Y | Y | Y | TODO |
| SearchField | Y | Y | Y | TODO |
| Select | Y | Y | Y | TODO |
| Checkbox | Y | Y | Y | TODO |
| CheckMark | Y | Y | Y | TODO |
| Radio | Y | Y | Y | TODO |
| Switch | Y | Y | Y | TODO |
| Slider | Y | Y | Y | TODO |
| SegmentedControl | Y | Y | Y | TODO |
| FramedStyle | Y | Y | Y | TODO |

## Token Pipeline

```
public/palette.json ──────────────────┐
public/semantic-tokens.json ──────────┤
public/effects-tokens.json ───────────┤
public/shadow-tokens.json ────────────┤
                                      ▼
  generate-colors-ts.mjs ──> tokens/colors.ts
      exports: palette, lightColors, darkColors, cssVarColors
  generate-color-css.mjs ──> generated-color-tokens.css
      exports: CSS custom properties (light + dark)
  generate-effects-ts.mjs ──> tokens/effects.ts
      exports: effects, darkEffects
  generate-shadow-ts.mjs ──> tokens/shadow.ts
      exports: shadow, darkShadow, cssVarShadow
  generate-foundation-css.mjs ──> generated-foundation-tokens.css
      exports: CSS custom properties (spacing, radius, typography)
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| `outlined` -> `weak` (Button, IconButton) | `weak` = tinted bg without border; cleaner 2-level hierarchy: filled (emphasis) + weak (secondary) |
| Color prop simplification | `brandDefault` -> `primary`, `baseDefault` -> `neutral`, etc. Matches industry conventions |
| `cssVarColors` internal-only | Components use CSS var strings for automatic theme switching; `lightColors`/`darkColors` hex values are public API for consumers |
| Component-level color token layer removed | Props provide the abstraction; no need for per-component token mapping |
| `usePressable` shared hook | Consistent hover/press handling across all interactive components |
| No inline style overrides | Consumers use `className`; tokens handle all visual values |
| HSLA color format | Source of truth in JSON uses HSLA for consistent manipulation |

## Quality Gates

| Command | What It Checks | Blocking? |
|---------|---------------|-----------|
| `npm run build` | Token gen + lint + Next.js build (35+ pages) | Yes |
| `npm run check:tokens` | Light/dark parity (103/103) + WCAG contrast | Parity: yes, WCAG: warn |
| `npm run check:raw-colors` | No hex literals in component files | Yes |

## When to Load Which Skill

| Task | Skill | Path |
|------|-------|------|
| Create a new component from scratch | `new-component` | `.claude/skills/new-component/SKILL.md` |
| Add/modify design tokens | `token-edit` | `.claude/skills/token-edit/SKILL.md` |
| Create a documentation page | `doc-page` | `.claude/skills/doc-page/SKILL.md` |

For general conventions, the rules in `.claude/rules/` are auto-loaded:

| Rule | Content |
|------|---------|
| `00-project.md` | Project overview, component index, quick commands |
| `10-tokens.md` | Token pipeline, cssVarColors policy, naming conventions |
| `20-component-api.md` | Variant/color/size conventions, prop patterns |
| `30-patterns.md` | usePressable, token imports, disabled handling, dark mode |
| `40-a11y.md` | Accessibility checklist, ARIA attributes, keyboard navigation |
| `50-docs.md` | Documentation authoring rules, canonical section order, shared components |
