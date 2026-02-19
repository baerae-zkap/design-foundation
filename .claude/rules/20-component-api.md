# Component API Conventions

## Variant System
| Variant | Visual | Use Case |
|---------|--------|----------|
| `filled` | Solid background color | Primary actions, strong emphasis |
| `weak` | Tinted background, no border | Secondary actions, softer emphasis |
| `outlined` | Border, transparent background | Tertiary actions (Card, Chip, ListCard, SegmentedControl) |
| `ghost` | Fully transparent, no border | Minimal emphasis (IconButton) |

Not all components support all variants. Check each component's type.

## Color Prop Values
| Value | Semantic |
|-------|----------|
| `primary` | Brand/accent actions |
| `neutral` | Default, non-emphasis |
| `success` | Positive confirmation |
| `error` | Destructive/warning actions |
| `warning` | Caution states |
| `info` | Informational |
| `kakao` | Kakao social login |
| `google` | Google social login |
| `muted` | Low-emphasis text (TextButton only) |

## Size Values
Standard: `sm`, `md`, `lg`. Some components use `small`, `medium`, `large`, `xLarge` (Button).

## Common Prop Patterns
```ts
// Interactive components (Button, IconButton, TextButton, Chip, ActionArea)
onClick: () => void         // Required for interaction
disabled?: boolean          // Disables pointer + keyboard
className?: string          // External style override
isLoading?: boolean         // Loading state (Button)

// Content components with interaction (Card, ListCard)
onClick?: () => void        // Optional -- makes it interactive
// Uses "Slot Props" pattern for layout:
children: ReactNode         // or render function for slots
```

## Slot Props Pattern (Card, ListCard)
When a content component needs structured layout:
```tsx
<Card onClick={() => {}}>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

## Rules
- No inline style overrides in consumer code -- use `className` or token values
- All interactive components must accept `onClick`
- `disabled` must disable both pointer events AND keyboard interaction
- Color prop always has a sensible default (usually `primary` or `neutral`)
- Components use `forwardRef` for ref forwarding
