# Component Category Patterns

## Action Components
**Examples:** Button, IconButton, TextButton, Chip, ActionArea

**Characteristics:**
- Click-driven interaction is the primary purpose
- Always use `usePressable` hook for hover/press states
- Support `variant` + `color` prop system
- `onClick` is the core interaction prop
- `disabled` blocks pointer + keyboard
- Use `forwardRef` with `<button>` element
- `transitions.background` for state changes

**Typical props:**
```ts
interface ActionProps {
  variant?: 'filled' | 'weak' | 'ghost';
  color?: 'primary' | 'neutral' | 'error';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}
```

## Content Components
**Examples:** Card, ListCard, ListCell, ContentBadge, SectionHeader, Table, Thumbnail, Accordion

**Characteristics:**
- Display-focused; interaction is optional
- Minimal or no `usePressable` (only if clickable variant exists)
- May use `variant` for visual style but not always `color`
- Layout-heavy components use **Slot Props** pattern
- Accordion uses `transitions.expand` for open/close animation

**Slot Props pattern (Card, ListCard):**
```tsx
// Parent holds onClick; children provide layout slots
<Card variant="outlined" onClick={handleClick}>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

**Typical props:**
```ts
interface ContentProps {
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;    // optional -- makes it interactive
  children: ReactNode;
  className?: string;
}
```

## Input Components
**Examples:** TextField, TextArea, SearchField, Select, Checkbox, Radio, Switch, Slider, SegmentedControl

**Characteristics:**
- Controlled value with `onChange` callback
- Error + disabled states are core requirements
- Label association via `id` + `<label htmlFor>` or `aria-label`
- Use `radius.component.input.*` for border radius
- Use `borderWidth.default` for input borders
- Border color changes on focus/error: `cssVarColors.divider.*`
- Focus ring: `var(--effect-alpha-brand-selection)`

**Typical props:**
```ts
interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Boolean inputs (Checkbox, Radio, Switch):**
```ts
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}
```
