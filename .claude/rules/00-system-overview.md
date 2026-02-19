# zkap Design System Overview

## What It Is
`@baerae-zkap/design-system` is a React component library and design token system for building product UIs. It provides 24 ready-to-use components and a full token set for spacing, typography, colors, and radius.

## Installation
```bash
npm install @baerae-zkap/design-system
```

## Imports
```tsx
// Components
import { Button, Card, TextField, ListCell } from '@baerae-zkap/design-system';

// Tokens
import { spacing, typography, radius, lightColors, darkColors } from '@baerae-zkap/design-system';
```

## Theme
Colors are CSS-variable-based. Light and dark mode switch automatically via `prefers-color-scheme`. No manual theme toggling is needed in product code. Just include the generated CSS file and components adapt.

## All 24 Components

### Actions (5)
| Component | Purpose |
|-----------|---------|
| `Button` | Primary and secondary actions with label text |
| `IconButton` | Icon-only actions (requires aria-label) |
| `TextButton` | Inline text link-style actions |
| `Chip` | Tags, filters, selectable labels |
| `ActionArea` | Large tappable region wrapping custom content |

### Contents (8)
| Component | Purpose |
|-----------|---------|
| `Card` | Container for grouped content, optionally clickable |
| `ListCard` | Horizontal layout: thumbnail + text, for media lists |
| `ListCell` | Single-row list item for settings, menus, options |
| `SectionHeader` | Section title with optional trailing action |
| `Accordion` | Expandable/collapsible content panel |
| `ContentBadge` | Small status or category label |
| `Table` | Rows and columns for tabular data |
| `Thumbnail` | Image with fixed aspect ratio |

### Inputs (11)
| Component | Purpose |
|-----------|---------|
| `TextField` | Single-line text input with label and validation |
| `TextArea` | Multi-line text input |
| `SearchField` | Search input with built-in clear button |
| `Select` | Dropdown selection |
| `Checkbox` | Multi-select toggle |
| `Radio` | Single-select from a group |
| `Switch` | Binary on/off toggle |
| `Slider` | Range value selector |
| `SegmentedControl` | Tab-like segmented selector |
| `CheckMark` | Standalone check indicator |
| `FramedStyle` | Wrapper for custom input styling |

## Core Principle
Always use system components and tokens. Never create custom buttons, inputs, or cards. Never hardcode color hex values. If a system component exists for the job, use it.
