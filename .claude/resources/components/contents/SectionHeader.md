# SectionHeader

> Status: stable
> Import: `import { SectionHeader } from '@baerae-zkap/design-system'`

## What It Is
A section title component placed above list groups to label and organize content sections. Supports an optional trailing action (e.g., "View All" link).

## When to Use
- Use above groups of `ListCell` items to label sections (General, Account, Privacy)
- Use above content lists to provide section titles with optional "View All" actions
- Use to visually separate distinct sections on a page

## When NOT to Use
- Do NOT use as a page title -- use a heading element (`<h1>`, `<h2>`) instead
- Do NOT use inside cards -- the card itself provides context
- Do NOT use for inline labels -- use `<label>` or typography tokens directly

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | (required) | Section title text. Rendered uppercase with letter-spacing |
| `action` | `ReactNode` | -- | Right-side action (typically a TextButton) |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Font size of the title |

Also accepts all standard `HTMLAttributes<HTMLDivElement>`.

## Size Guide
| Size | Font Size | Padding X | Padding Top | Padding Bottom |
|------|-----------|-----------|-------------|----------------|
| `small` | `typography.fontSize.compact` | 16px | 16px | 8px |
| `medium` | `typography.fontSize.sm` (14px) | 16px | 16px | 8px |
| `large` | `typography.fontSize.md` (16px) | 16px | 16px | 8px |

## Common Patterns

### Simple section label
```tsx
<SectionHeader title="General" />
<ListCell title="Language" trailing="English" onClick={onLanguage} divider />
<ListCell title="Region" trailing="Korea" onClick={onRegion} />
```

### With action link
```tsx
<SectionHeader
  title="Recent Orders"
  action={<TextButton variant="arrow" color="primary" size="small" onClick={onViewAll}>View All</TextButton>}
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
- DO: Keep title text short (1-3 words)
- DON'T: Use long sentences as section titles
- DO: Use TextButton with `arrow` variant for "View All" actions
- DON'T: Put Button or IconButton in the action slot -- too visually heavy

## Token Usage
| Property | Token |
|----------|-------|
| Title color | `cssVarColors.content.base.neutral` |
| Title weight | `typography.fontWeight.semibold` |
| Title transform | `textTransform: 'uppercase'` |
| Letter spacing | `0.02em` |
| Padding X | `spacing.primitive[4]` (16px) |
| Padding top | `spacing.primitive[4]` (16px) |
| Padding bottom | `spacing.primitive[2]` (8px) |

## Accessibility
- Renders as a plain `<div>` with flex layout
- Title is uppercase for visual hierarchy but screen readers read the original text
- Action area is keyboard-accessible if the action element (e.g., TextButton) supports it
