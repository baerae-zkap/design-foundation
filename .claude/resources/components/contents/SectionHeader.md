# SectionHeader

> Status: stable
> Import: `import { SectionHeader } from '@baerae-zkap/design-system'`

## What It Is
A section title component placed above list groups to label and organize content sections. Supports optional description text (above or below the title) and an optional trailing action.

## When to Use
- Use above groups of `ListCell` items to label sections (General, Account, Privacy)
- Use above content lists with optional "View All" actions
- Use `description` for contextual metadata (date range, count, last-updated info)

## When NOT to Use
- Do NOT use as a page title -- use a heading element (`<h1>`, `<h2>`) instead
- Do NOT use inside cards -- the card itself provides context
- Do NOT use for inline labels -- use `<label>` or typography tokens directly

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | (required) | Section title text |
| `description` | `ReactNode` | -- | Secondary metadata text (date, count, etc.) |
| `descriptionPosition` | `"top" \| "bottom"` | `"top"` | Where description renders relative to title |
| `action` | `ReactNode` | -- | Right-side action (typically a TextButton) |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Title font size and padding scale |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `title`.

## Size Guide
| Size | Title Font | Description Font | Padding X | Padding Top | Padding Bottom |
|------|-----------|-----------------|-----------|-------------|----------------|
| `small` | `typography.fontSize.compact` | `typography.fontSize.xs` | 16px | 8px | 4px |
| `medium` | `typography.fontSize.sm` (14px) | `typography.fontSize.compact` | 16px | 16px | 8px |
| `large` | `typography.fontSize.md` (16px) | `typography.fontSize.sm` | 16px | 20px | 8px |

## Common Patterns

### Simple section label
```tsx
<SectionHeader title="General" />
<ListCell title="Language" trailing="English" onClick={onLanguage} divider />
<ListCell title="Region" trailing="Korea" onClick={onRegion} />
```

### With description (top — default)
```tsx
// description top: context/metadata appears above the title
<SectionHeader
  title="내 자산"
  description="최근 30일"
  descriptionPosition="top"
  action={<TextButton size="small" onClick={onViewAll}>전체보기</TextButton>}
/>
```

### With description (bottom)
```tsx
// description bottom: title is prominent, description follows
<SectionHeader
  title="거래소 연동"
  description="2개 연결됨"
  descriptionPosition="bottom"
  action={<TextButton size="small" onClick={onAdd}>+ 추가</TextButton>}
/>
```

### Multiple sections
```tsx
<SectionHeader title="Account" />
<ListCell title="Email" trailing="user@example.com" divider />
<ListCell title="Password" trailing="Change" onClick={onChangePassword} />

<SectionHeader title="Preferences" />
<ListCell title="Dark Mode" trailing={<Switch checked={dark} onChange={setDark} />} divider />
<ListCell title="Notifications" trailing={<Switch checked={notifs} onChange={setNotifs} />} />
```

## Do / Don't

- DO: Place SectionHeader immediately above its related list items
- DON'T: Use SectionHeader without list content below it
- DO: Keep title text short (2-3 words)
- DON'T: Use long sentences as section titles
- DO: Use TextButton for the `action` slot
- DON'T: Put Button or IconButton in the action slot -- too visually heavy
- DO: Use `description` for concise metadata (date, count, last updated)
- DON'T: Put multi-line descriptions -- keep it to one short line

## Token Usage
| Property | Token |
|----------|-------|
| Title color | `cssVarColors.content.base.default` |
| Title weight | `typography.fontWeight.semibold` |
| Description color | `cssVarColors.content.base.secondary` |
| Description weight | `typography.fontWeight.regular` |
| Padding X | `spacing.primitive[4]` (16px) |
| Padding top (medium) | `spacing.primitive[4]` (16px) |
| Padding bottom (medium) | `spacing.primitive[2]` (8px) |
| Gap (when description present) | `spacing.primitive[1]` (4px) |

## Accessibility
- Renders as a plain `<div>` with flex layout
- Action area is keyboard-accessible if the action element (e.g., TextButton) supports it
- For screen reader page structure, consider wrapping title in an `<h2>`/`<h3>` via the `title` ReactNode prop
