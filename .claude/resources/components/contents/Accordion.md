# Accordion

> Status: stable
> Import: `import { Accordion } from '@baerae-zkap/design-system'`

## What It Is
An expandable/collapsible content panel with a clickable header. Follows WAI-ARIA Accordion pattern with full keyboard support. Supports both controlled and uncontrolled modes.

## When to Use
- Use for FAQ sections where answers are hidden by default
- Use for settings groups that can be collapsed to save space
- Use for progressive disclosure of detailed information

## When NOT to Use
- Do NOT use for content that should always be visible -- just render it directly
- Do NOT use for navigation menus -- use a dedicated nav component
- Do NOT use for tab-like switching between views -- use `SegmentedControl` instead

## Decision Rules

| Intent | Config |
|--------|--------|
| FAQ section (all collapsed by default) | `defaultExpanded={false}` (default), `size="medium"` |
| Detail panel visible on first load | `defaultExpanded={true}` |
| App-state controlled open/close | Controlled: `expanded={state}` + `onChange={setState}` |
| Prominent section header | `size="large"` |
| Dense list of items | `size="medium"` |

**Rules:**
- Use uncontrolled mode (`defaultExpanded`) for simple show/hide — no state needed
- Use controlled mode (`expanded` + `onChange`) when parent needs to know or control open state
- Do NOT nest Accordion inside another Accordion
- For tab-like view switching, use `SegmentedControl` (when available) — not Accordion
- Put non-critical, supplementary content inside accordion panels. Never hide required info behind a collapsed accordion

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | (required) | Header text or content |
| `children` | `ReactNode` | (required) | Expandable panel content |
| `defaultExpanded` | `boolean` | `false` | Initial expanded state (uncontrolled mode) |
| `expanded` | `boolean` | -- | Controlled expanded state. When provided, component is controlled |
| `onChange` | `(expanded: boolean) => void` | -- | Callback when expanded state changes |
| `size` | `"medium" \| "large"` | `"medium"` | Header height and icon size |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `title` and `onChange`.

## Size Guide
| Size | Height | Icon Size | Use For |
|------|--------|-----------|---------|
| `medium` | `spacing.component.accordion.height.md` | `spacing.component.accordion.iconSize` | Default, most contexts |
| `large` | `spacing.component.accordion.height.lg` | `spacing.component.accordion.iconSize` | Prominent sections |

## Common Patterns

### Uncontrolled (simple)
```tsx
<Accordion title="Frequently Asked Questions">
  <p>Answer content here...</p>
</Accordion>
```

### Controlled
```tsx
const [expanded, setExpanded] = useState(false);

<Accordion
  title="Advanced Settings"
  expanded={expanded}
  onChange={setExpanded}
>
  <SettingsForm />
</Accordion>
```

### FAQ list
```tsx
{faqs.map(faq => (
  <Accordion key={faq.id} title={faq.question}>
    <p>{faq.answer}</p>
  </Accordion>
))}
```

### Default expanded
```tsx
<Accordion title="Details" defaultExpanded>
  <p>This content is visible on first render.</p>
</Accordion>
```

## Do / Don't

- DO: Use for content that benefits from progressive disclosure
- DON'T: Nest accordions inside other accordions
- DO: Keep titles concise and descriptive
- DON'T: Put critical information inside a collapsed accordion that users might miss

## Token Usage
| Property | Token |
|----------|-------|
| Container border | `borderWidth.default` + `cssVarColors.border.base.default` |
| Container bg | `cssVarColors.surface.base.default` |
| Container radius | `radius.component.card.sm` |
| Header padding | `spacing.primitive[4]` left and right |
| Header bg (expanded) | `cssVarColors.surface.elevated.alternative` |
| Title font size | `typography.fontSize.md` |
| Title font weight | `typography.fontWeight.semibold` |
| Title color | `cssVarColors.content.base.default` |
| Chevron color | `cssVarColors.content.base.secondary` |
| Content padding | `spacing.primitive[4]` |
| Expand transition | `transitions.expand` |
| Chevron rotation transition | `transitions.transform` |
| Background transition | `transitions.background` |

## Accessibility
- Header has `role="button"`, `tabIndex={0}`, `aria-expanded`, and `aria-controls`
- Panel has `role="region"` and `aria-labelledby` pointing to the header
- Keyboard: Enter and Space toggle expanded state
- Uses `useId()` for unique header/panel ID pairs
- Animated height transition with overflow hidden
