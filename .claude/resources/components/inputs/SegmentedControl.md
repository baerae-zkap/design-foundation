# SegmentedControl

> Status: code_only (web implementation pending -- RN code exists, no web source or doc page yet)
> Import: `import { SegmentedControl } from '@baerae-zkap/design-system'` (planned)

## What It Is
A tab-like segmented selector for exclusive switching between 2-5 views or modes. Only one segment can be active at a time. Visually groups options into a single bar.

## When to Use
- Use for switching between 2-5 mutually exclusive views or modes (list/grid view, daily/weekly/monthly)
- Use as a view-mode toggle at the top of a content section
- Use when all options should be visible at once and selection is exclusive

## When NOT to Use
- Do NOT use for multi-select -- use `Chip` instead
- Do NOT use for more than 5 options -- use `Select` or tabs
- Do NOT use for filter tags that can have multiple selected -- use `Chip`
- Do NOT use for form data selection -- use `Radio` instead

## Expected Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | -- | Currently selected segment value |
| `onChange` | `(value: string) => void` | -- | Selection change handler |
| `options` | `Array<{ label: string; value: string }>` | -- | Segment options (2-5 items) |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Control height |
| `disabled` | `boolean` | `false` | Disables all segments |

Note: Exact prop API will be finalized when the web component is implemented.

## Common Patterns

### View mode toggle
```tsx
<SegmentedControl
  value={viewMode}
  onChange={setViewMode}
  options={[
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'grid' },
  ]}
/>
```

### Time period selector
```tsx
<SegmentedControl
  value={period}
  onChange={setPeriod}
  options={[
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ]}
/>
```

## Decision Rule
- Exclusive view/mode switching (2-5 options) -> use `SegmentedControl`
- Multi-select / filter behavior -> use `Chip`
- More than 5 options -> use `Select`

## Do / Don't

- DO: Keep segment labels short (1-2 words)
- DON'T: Use more than 5 segments -- it becomes too cramped
- DO: Use for view/mode switching at the top of a section
- DON'T: Use for form data that needs to be submitted -- use Radio

## Accessibility
- Keyboard: Arrow keys to navigate between segments, Enter/Space to select
- Active segment should be visually distinct and communicated to screen readers
- Consider using role="tablist" and role="tab" semantics
