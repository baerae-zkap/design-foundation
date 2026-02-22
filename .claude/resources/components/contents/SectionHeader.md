# SectionHeader

> Status: stable
> Import: `import { SectionHeader } from '@baerae-zkap/design-system'`

## What It Is
A section title component that labels content groups. Uses a 3-slot anatomy (Heading + Heading Content + Trailing) with baseline alignment across all slots.

## When to Use
- Above groups of `ListCell` items to label sections (General, Account, Privacy)
- Above content lists with optional "View All" actions
- With `headingContent` for inline badges or counts next to the title
- With `trailing` for right-side actions (TextButton, Pagination, IconButton)

## When NOT to Use
- Do NOT use as a page title -- use `<h1>`, `<h2>` instead
- Do NOT use inside cards -- the card itself provides context
- Do NOT use for inline labels -- use `<label>` or typography tokens directly

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | (required) | Section title text (max 2 lines) |
| `headingContent` | `ReactNode` | -- | Inline slot right of title (Chip, ContentBadge, IconButton) |
| `trailing` | `ReactNode` | -- | Rightmost slot (TextButton or Pagination preferred -- avoid IconButton, too visually heavy) |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Title font size and padding scale |

Also accepts all standard `HTMLAttributes<HTMLDivElement>` except `title`.

## Anatomy
```
[  title  ] [headingContent]          [trailing]
```
All slots are baseline (bottom) aligned via `align-items: flex-end`.

## Size Guide
| Size | Title Font | Weight | Padding X | Padding Top | Padding Bottom |
|------|-----------|--------|-----------|-------------|----------------|
| `small` | 16px | Bold | 16px | 12px | 8px |
| `medium` | 20px | Bold | 16px | 16px | 12px |
| `large` | 24px | Bold | 16px | 20px | 12px |

## Common Patterns

### Simple section label
```tsx
<SectionHeader title="General" />
<ListCell title="Language" trailing="English" onClick={onLanguage} />
<ListCell title="Region" trailing="Korea" onClick={onRegion} />
```

### With trailing action
```tsx
<SectionHeader
  title="최근 주문"
  trailing={<TextButton size="small" onClick={onViewAll}>전체보기</TextButton>}
/>
```

### With headingContent (inline badge)
```tsx
<SectionHeader
  title="내 자산"
  headingContent={<ContentBadge color="primary">12</ContentBadge>}
  trailing={<TextButton size="small" onClick={onViewAll}>전체보기</TextButton>}
/>
```

### With headingContent (new badge)
```tsx
<SectionHeader
  title="알림"
  headingContent={<ContentBadge color="error">3</ContentBadge>}
/>
```

### Size variants
```tsx
<SectionHeader size="small" title="소제목" />
<SectionHeader size="medium" title="중간 제목" />
<SectionHeader size="large" title="큰 제목" />
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
- DO: Keep title text short (2-3 words max)
- DON'T: Use long sentences as section titles
- DO: Use `TextButton` for the `trailing` slot
- DON'T: Put Button or IconButton in the trailing slot — too visually heavy
- DO: Use `headingContent` for counts, badges, or status indicators next to the title
- DON'T: Put full-width or large elements in `headingContent` — it's inline with the title

## Token Usage
| Property | Token |
|----------|-------|
| Title color | `cssVarColors.content.base.default` |
| Title weight | `typography.fontWeight.bold` |
| Padding X | `spacing.primitive[4]` (16px) |
| Padding top (medium) | `spacing.primitive[4]` (16px) |
| Padding bottom (medium) | `spacing.primitive[3]` (12px) |
| Heading area gap | `spacing.primitive[2]` (8px) |
| Container gap | `spacing.primitive[4]` (16px) |

## Accessibility
- Renders as a plain `<div>` with flex layout
- Trailing and headingContent areas are keyboard-accessible if their elements support it
- For screen reader page structure, consider wrapping title in an `<h2>`/`<h3>` via the `title` ReactNode prop
