# Accordion

> An expandable/collapsible content panel that hides detail until the user requests it.

## When to Use
- FAQs where only one or a few answers are read at a time
- Long-form settings sections that can be collapsed for overview
- Progressive disclosure of secondary information that clutters the default view
- Detail panels that expand inline without navigating away

## When NOT to Use
- Content that is always relevant — show it inline instead
- Navigation or tab switching — use `Tab` or `SegmentedControl` instead
- A simple show/hide toggle with no animation — use a plain conditional render
- Content too short to benefit from hiding (fewer than 2-3 lines)

## Import
```tsx
import { Accordion } from '@baerae-zkap/design-system';
```

## Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Header label shown in the trigger row. |
| `children` | `ReactNode` | — | **Required.** Content revealed when expanded. |
| `defaultExpanded` | `boolean` | `false` | Initial expanded state for uncontrolled usage. |
| `expanded` | `boolean` | — | Controlled expanded state. When provided, component is fully controlled. |
| `onChange` | `(expanded: boolean) => void` | — | Called with the new expanded value on toggle. Required when using `expanded`. |
| `size` | `'medium' \| 'large'` | `'medium'` | Controls the header row height. |
| `style` | `React.CSSProperties` | — | Additional inline styles on the outer container. |

## Basic Usage

```tsx
import { Accordion } from '@baerae-zkap/design-system';

// Uncontrolled (manages its own state)
<Accordion title="What is the return policy?">
  Items can be returned within 30 days of purchase with the original receipt.
  Return shipping is free for defective items.
</Accordion>

// Starts expanded
<Accordion title="Shipping information" defaultExpanded>
  Standard delivery takes 3-5 business days.
  Express delivery is available at checkout.
</Accordion>

// Controlled
const [open, setOpen] = useState(false);

<Accordion
  title="Advanced settings"
  expanded={open}
  onChange={setOpen}
>
  <div>Advanced configuration options here...</div>
</Accordion>
```

## Sizes

| Size | Header Height |
|------|--------------|
| `medium` | from `spacing.component.accordion.height.md` |
| `large` | from `spacing.component.accordion.height.lg` |

## Controlled vs Uncontrolled

**Uncontrolled** (recommended for most cases): Pass `defaultExpanded` to set the initial state. The component manages its own `useState` internally.

**Controlled**: Pass both `expanded` and `onChange`. You own the state entirely. Use this when you need to synchronize accordion state with other UI — for example, closing one accordion when another opens.

```tsx
// Exclusive accordion group (only one open at a time)
const [openIndex, setOpenIndex] = useState<number | null>(null);

{items.map((item, i) => (
  <Accordion
    key={i}
    title={item.question}
    expanded={openIndex === i}
    onChange={(isOpen) => setOpenIndex(isOpen ? i : null)}
  >
    {item.answer}
  </Accordion>
))}
```

## States

| State | Behavior |
|-------|----------|
| Collapsed | Content height animates to 0, opacity to 0, chevron points down |
| Expanded | Content height animates to full `scrollHeight`, opacity to 1, chevron rotates 180° |
| Header hovered/focused | Header background changes to `surface.elevated.alternative` |

Content height animation uses `transitions.expand` — smooth height + opacity transition with no layout jank.

## Accessibility

- Header renders as `role="button"` with `tabIndex={0}`.
- `aria-expanded` on the header reflects current open state.
- `aria-controls` links the header to its content panel `id`.
- Content panel has `role="region"` with `aria-labelledby` pointing to the header `id`.
- `Enter` and `Space` toggle the accordion from the header.
- IDs are auto-generated with `useId()` — no manual `id` prop needed.

## Do / Don't
- Do: Use uncontrolled mode (`defaultExpanded`) for simple single accordions.
- Do: Use controlled mode + external state to build exclusive accordion groups.
- Do: Keep `title` short — it must fit on a single line within the header.
- Don't: Nest an `Accordion` inside another `Accordion` — creates confusing disclosure hierarchy.
- Don't: Put critical primary actions inside collapsed content — users may miss them.
- Don't: Use `Accordion` as a tab switcher — use `Tab` or `SegmentedControl` for that pattern.

## Design Tokens Used

| Token | Applied To |
|-------|-----------|
| `cssVarColors.surface.base.default` | Container and collapsed header background |
| `cssVarColors.surface.elevated.alternative` | Expanded header background |
| `cssVarColors.border.base.default` | Container border |
| `cssVarColors.content.base.default` | Title text |
| `cssVarColors.content.base.secondary` | Chevron icon color |
| `radius.component.card.sm` | Container corner radius |
| `borderWidth.default` (1) | Container border width |
| `spacing.primitive[4]` (16) | Header horizontal padding, content padding |
| `typography.fontSize.md` (16) | Title font size |
| `typography.fontWeight.semibold` | Title font weight |
| `transitions.background` | Header background transition |
| `transitions.transform` | Chevron rotation transition |
| `transitions.expand` | Content height + opacity transition |

## Related Components
- `Card` — static or interactive content container (no expand/collapse)
- `Tab` — switching between distinct views, not disclosure
- `SegmentedControl` — exclusive selection between 2-5 options
- `SectionHeader` — section label above a group of content
