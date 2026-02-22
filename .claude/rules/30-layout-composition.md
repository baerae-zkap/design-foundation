# Layout Composition

## Page Structure
```
+---------------------------+
|     Top Navigation        |  Fixed header (56px height)
+---------------------------+
|                           |
|   Scrollable Content      |  Screen padding: 20px horizontal
|                           |
|   Section A               |
|   (32-40px gap)           |
|   Section B               |
|                           |
+---------------------------+
|   Bottom Fixed Actions    |  Optional: sticky CTA bar
+---------------------------+
```

Use `spacing.semantic.screen.paddingX` (20px) for horizontal page padding. Use `spacing.semantic.screen.paddingTop` (16px) and `paddingBottom` (20px) for vertical.

## Spacing Rhythm

| Between... | Gap | Token |
|------------|-----|-------|
| Major sections | 32-40px | `spacing.primitive[8]` to `[10]` |
| Items within a section | 8-16px | `spacing.primitive[2]` to `[4]` |
| Label and its input | 8px | `spacing.component.input.labelGap` |
| Helper text and input | 4px | `spacing.component.input.helperGap` |
| Buttons in a group | 8-12px | `spacing.primitive[2]` to `[3]` |

## Card Patterns

- Cards do NOT nest inside other cards.
- Cards have consistent internal padding: 16-20px (`spacing.component.card.padding.sm` or `.md`).
- Use `Card variant="outlined"` for bordered cards, `Card variant="filled"` for solid background.
- Card always requires `onClick` -- it is always interactive. The Card handles keyboard a11y internally.

```tsx
// Slot mode (structured)
<Card
  variant="outlined"
  heading="Order #1234"
  caption="Delivered on Jan 15"
  onClick={() => navigate('/detail')}
/>

// Children mode (custom content)
<Card variant="elevated" padding="medium" onClick={() => navigate('/detail')}>
  <h3 style={{ ...typography.semantic.title.sm, margin: 0 }}>Order #1234</h3>
  <p style={{ ...typography.semantic.body.sm, color: 'var(--content-base-secondary)', margin: 0 }}>
    Delivered on Jan 15
  </p>
</Card>
```

## List Patterns

- **Media content lists** (feed, products, search results): Use `ListCard` with thumbnail.
- **Settings / options lists** (menu, preferences): Use `ListCell` with optional trailing element.
- Group related list items under a `SectionHeader`.
- List items have zero gap between them (`spacing.component.list.itemGap` = 0). Dividers are built in.
- Section-to-section gap is 32px (`spacing.component.list.sectionGap`).

```tsx
<SectionHeader title="General" />
<ListCell title="Language" trailing="English" onClick={onLanguage} />
<ListCell title="Dark Mode" trailing={<Switch checked={dark} onChange={setDark} />} />

<SectionHeader title="Account" />
<ListCell title="Change Password" onClick={onPassword} />
<ListCell title="Delete Account" onClick={onDelete} />
```

## Form Layout

- Stack inputs vertically with 16px gap (`spacing.primitive[4]`).
- Group related fields together. Add a `SectionHeader` between groups.
- Single-column layout on mobile. Two-column only on wide desktop.
- Primary CTA at bottom, full-width or right-aligned.
- Destructive actions (delete account) separated from primary actions by 32px+ or placed in a different section.

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <TextField label="Name" value={name} onChange={setName} />
  <TextField label="Email" type="email" value={email} onChange={setEmail} />
  {/* For selection fields, use Radio/RadioGroup or SegmentedControl -- no Select component exists */}
  <Button buttonType="filled" color="primary" onClick={onSave} style={{ marginTop: 16 }}>
    Save Profile
  </Button>
</div>
```

## Action Placement

- **Primary CTA**: Bottom of form or screen section. Filled + primary.
- **Secondary action**: Left of primary or above it. Weak + neutral.
- **Destructive action**: Separated from primary cluster. Error color. Consider adding confirmation.

## Empty States

Center vertically and horizontally. Include:
1. Illustration or icon (optional)
2. Heading text (headline.sm or title.sm)
3. Body text explaining why it's empty (body.sm, secondary color)
4. Optional CTA button

```tsx
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 40 }}>
  <EmptyIcon />
  <h3 style={{ ...typography.semantic.headline.sm, margin: 0 }}>No results found</h3>
  <p style={{ ...typography.semantic.body.sm, color: 'var(--content-base-secondary)', margin: 0 }}>
    Try adjusting your search or filters.
  </p>
  <Button buttonType="weak" color="primary" onClick={onReset}>Clear Filters</Button>
</div>
```

## Loading States

- Use skeleton patterns for content areas (shimmer placeholders matching content shape).
- Use `isLoading` prop on Button for action loading states.
- Never block the entire UI with a full-screen spinner. Show skeleton inline.
- Disable interactive elements during submission but keep the layout visible.
