# Required UI State Model

Every interactive element and data section MUST implement the states listed below. Missing states are bugs, not optional polish.

## Button / Action States

| State | When | How |
|-------|------|-----|
| `default` | Always present | Normal rendered state |
| `hover` | Cursor over element | Built-in via usePressable — no extra code needed |
| `pressed` | Mouse/touch down | Built-in — no extra code needed |
| `disabled` | Precondition not met | `disabled={true}` prop — blocks pointer + keyboard |
| `loading` | Async op in progress | `isLoading={true}` prop on Button — shows spinner |

```tsx
<Button
  buttonType="filled"
  color="primary"
  disabled={!formIsValid}
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Save
</Button>
```

## Input Field States

| State | When | How |
|-------|------|-----|
| `default` | Empty, untouched | Normal state |
| `focused` | User is typing | Built-in |
| `filled` | Has value | Built-in |
| `error` | Validation failed | `error="Error message string"` prop |
| `disabled` | Field not editable | `disabled={true}` prop |

Rule: Do NOT show error state before user has interacted with the field (validate on blur or submit).

## List / Data Section States

Every list, table, or data-fetched section needs ALL four:

| State | Required Component/Pattern |
|-------|---------------------------|
| `loading` | Skeleton placeholders matching content shape |
| `empty` | Centered message + optional CTA (see `30-layout-composition.md`) |
| `error` | Error message + Retry button (contained, not full-page) |
| `populated` | Normal content render |

```tsx
// Required pattern for every data list
if (isLoading) return <SkeletonList />;
if (error) return <ErrorState onRetry={refetch} />;
if (items.length === 0) return <EmptyState message="No items yet" />;
return <ItemList items={items} />;
```

## Toggle / Switch States

| State | When |
|-------|------|
| `on` | Active/enabled |
| `off` | Inactive/disabled value |
| `disabled` | Toggle not available |

Switch changes take effect immediately. If async, show optimistic update and revert on failure.

## Numeric Tie-Breakers (Component Selection)

| Decision | Rule |
|----------|------|
| Chip vs SegmentedControl | `Chip` for filter/tag behavior (multi-select OK); `SegmentedControl` for exclusive view/mode switching (2-5 options) |
| Switch vs Checkbox | `Switch` for **immediate** setting effect; `Checkbox` for **form submission** values |
| TextButton vs Button | `TextButton` for inline low-emphasis actions within content; `Button` for standalone CTAs |
