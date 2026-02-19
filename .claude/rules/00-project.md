# Project Overview

## Package: `@baerae-zkap/design-system`
React + TypeScript design system with token pipeline and Next.js documentation site.

## Repo Structure
```
/
├── packages/design-system/src/
│   ├── components/        # Web components (source of truth)
│   ├── tokens/            # Design tokens (TS + re-exports)
│   ├── utils/             # Shared hooks & helpers
│   └── index.ts           # Public API barrel
├── src/
│   ├── app/               # Next.js App Router (docs site)
│   │   ├── components/    # Doc pages: actions/, contents/
│   │   ├── generated-color-tokens.css      # AUTO-GENERATED
│   │   └── generated-foundation-tokens.css # AUTO-GENERATED
│   └── components/        # Shared doc-site components (Sidebar, docs/*)
├── public/                # Token source JSONs + static assets
├── scripts/               # Token generation scripts
└── AGENTS.md              # Machine-readable project state
```

## Component Index (24 total)

### Actions (5/5 complete -- code + docs)
| Component | Path | Code | Docs |
|-----------|------|:----:|:----:|
| Button | `components/Button/Button.tsx` | done | done |
| IconButton | `components/IconButton/IconButton.tsx` | done | done |
| TextButton | `components/TextButton/TextButton.tsx` | done | done |
| Chip | `components/Chip/Chip.tsx` | done | done |
| ActionArea | `components/ActionArea/ActionArea.tsx` | done | done |

### Contents (8 -- code done for 2, doc-style done for all)
| Component | Path | Code | Docs |
|-----------|------|:----:|:----:|
| Accordion | `components/Accordion/Accordion.tsx` | done | style-only |
| Card | `components/Card/Card.tsx` | done | style-only |
| ContentBadge | `components/ContentBadge/ContentBadge.tsx` | TODO | style-only |
| ListCard | `components/ListCard/ListCard.tsx` | TODO | style-only |
| ListCell | `components/ListCell/ListCell.tsx` | TODO | style-only |
| SectionHeader | `components/SectionHeader/SectionHeader.tsx` | TODO | style-only |
| Table | `components/Table/Table.tsx` | TODO | style-only |
| Thumbnail | `components/Thumbnail/Thumbnail.tsx` | TODO | style-only |

### Inputs (11 -- code exists, no doc pages)
TextField, TextArea, SearchField, Select, Checkbox, CheckMark, Radio, Switch, Slider, SegmentedControl, FramedStyle

All paths relative to `packages/design-system/src/`.

## Quick Commands
```bash
npm run dev            # Start docs dev server
npm run build          # Token gen + lint + next build
npm run tokens         # Regenerate all token files
npm run check:tokens   # Parity (blocking) + WCAG contrast (warn)
npm run check:raw-colors  # Detect leftover hex literals
```

## Generated Files (DO NOT edit directly)
- `packages/design-system/src/tokens/colors.ts`
- `packages/design-system/src/tokens/effects.ts`
- `packages/design-system/src/tokens/shadow.ts`
- `src/app/generated-color-tokens.css`
- `src/app/generated-foundation-tokens.css`
