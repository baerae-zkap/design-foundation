# zkap Design System Overview

## What It Is
`@baerae-zkap/design-system` is a React component library and design token system for building product UIs. It provides 43 ready-to-use components and a full token set for spacing, typography, colors, and radius.

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

## All 42 Components

### Actions (5)
| Component | Purpose |
|-----------|---------|
| `Button` | Primary and secondary actions with label text |
| `IconButton` | Icon-only actions (requires aria-label) |
| `TextButton` | Inline text link-style actions |
| `Chip` | Tags, filters, selectable labels |
| `ActionArea` | Bottom-fixed container for action button groups in modals, sheets, and screen footers. Supports `topAccessory` for additional content above buttons. |

### Contents (8)
| Component | Purpose |
|-----------|---------|
| `Card` | Container for grouped content, optionally clickable |
| `ListCard` | Horizontal layout: thumbnail + text, for media lists |
| `ListCell` | Single-row list item for settings, menus, options |
| `SectionHeader` | Section title with optional trailing action |
| `Accordion` | Expandable/collapsible content panel |
| `ContentBadge` | Small status or category label |
| `Avatar` | User profile image with fallback (also `AvatarGroup`) |
| `Badge` | Numeric or status badge overlay |

### Inputs (9)
| Component | Purpose |
|-----------|---------|
| `TextField` | Single-line text input with label and validation |
| `TextArea` | Multi-line text input |
| `SearchField` | Search input with built-in clear button |
| `Checkbox` | Multi-select toggle |
| `Radio` | Single-select from a group (also `RadioGroup`) |
| `Switch` | Binary on/off toggle |
| `Slider` | Range value selector |
| `SegmentedControl` | Tab-like segmented selector |
| `CheckMark` | Standalone check indicator |

> **Note**: There is no `Select` (dropdown) component. For small option sets (2-5 options), use `Radio`/`RadioGroup`. For tab-style exclusive selection, use `SegmentedControl`.

### Feedback (8)
| Component | Purpose |
|-----------|---------|
| `Snackbar` | Brief auto-dismiss notification (single message) |
| `Toast` | Richer notification with heading + description |
| `SectionMessage` | Inline contextual status within page content |
| `Dialog` | Blocking confirmation dialog (AlertDialog) |
| `StateView` | Empty/error/result state for a content area |
| `PushBadge` | Notification count overlay on icon/button |
| `Skeleton` | Loading placeholder matching content shape |
| `Spinner` | Indeterminate loading indicator |

### Navigation (7)
| Component | Purpose |
|-----------|---------|
| `BottomNavigation` | Mobile bottom tab bar |
| `CategoryNavigation` | Horizontal category scroll navigation |
| `PageCounter` | Pagination indicator (dots or numbers) |
| `ProgressIndicator` | Step or percentage progress bar |
| `ProgressTracker` | Multi-step process tracker |
| `Tab` | Tab strip for switching views |
| `TopNavigation` | App bar / top navigation header |

### Overlays (4)
| Component | Purpose |
|-----------|---------|
| `BottomSheet` | Bottom-anchored modal sheet |
| `Popover` | Anchored floating content panel |
| `Popup` | Modal popup with actions |
| `Tooltip` | Contextual hover/tap hint |

## Core Principle
Always use system components and tokens. Never create custom buttons, inputs, or cards. Never hardcode color hex values. If a system component exists for the job, use it.
