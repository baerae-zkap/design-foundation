# Component Selection Guide

Use this decision tree to pick the correct component. Follow top-to-bottom; use the first match.

## Actions -- "User does something"

| IF the user needs to... | THEN use | Example |
|-------------------------|----------|---------|
| Perform the primary action on screen | `<Button variant="filled" color="primary">` | Submit, Save, Continue |
| Perform a secondary/cancel action | `<Button variant="weak" color="neutral">` | Cancel, Back, Skip |
| Perform a destructive action | `<Button variant="filled" color="error">` | Delete, Remove |
| Perform a soft destructive action | `<Button variant="weak" color="error">` | Remove item from list |
| Click a text-only inline link | `<TextButton>` | "Forgot password?", "View all" |
| Click an icon-only action | `<IconButton aria-label="Close">` | Close, Menu, Share |
| Toggle/select a tag or filter | `<Chip>` | Category filter, tag selector |
| Tap a large custom-content area | `<ActionArea>` | Banner, promotional card |

```tsx
// Primary + Secondary pair
<div style={{ display: 'flex', gap: 12 }}>
  <Button variant="weak" color="neutral" onClick={onCancel}>Cancel</Button>
  <Button variant="filled" color="primary" onClick={onSubmit}>Save</Button>
</div>
```

## Contents -- "Display information"

| IF the content is... | THEN use |
|----------------------|----------|
| A self-contained info block, optionally clickable | `<Card>` |
| A horizontal thumbnail + text list item | `<ListCard>` |
| A simple text row in a settings/menu list | `<ListCell>` |
| A section title with optional action link | `<SectionHeader>` |
| Expandable/collapsible detail | `<Accordion>` |
| A small status or category label | `<ContentBadge>` |
| Tabular data with rows and columns | `<Table>` |
| An image with controlled aspect ratio | `<Thumbnail>` |

```tsx
// Settings list
<SectionHeader title="Account" />
<ListCell title="Email" trailing="user@example.com" />
<ListCell title="Password" trailing="Change" onClick={onChangePassword} />
<ListCell title="Notifications" trailing={<Switch checked={notifs} onChange={setNotifs} />} />
```

## Inputs -- "User provides data"

| IF the field is... | THEN use |
|--------------------|----------|
| Single-line text (name, email, phone) | `<TextField>` |
| Multi-line text (bio, description) | `<TextArea>` |
| Search with clear button | `<SearchField>` |
| Select from a dropdown list | `<Select>` |
| On/off toggle | `<Switch>` |
| Multiple checkboxes | `<Checkbox>` |
| Single choice from a group | `<Radio>` |
| Segmented tab-like selector | `<SegmentedControl>` |
| Numeric range | `<Slider>` |

```tsx
// Login form inputs
<TextField type="email" label="Email" placeholder="example@email.com" />
<TextField type="password" label="Password" />
<Button variant="filled" color="primary" onClick={onLogin} style={{ width: '100%' }}>
  Log In
</Button>
```

## Tie-Breakers

When two components seem equally valid, apply these rules:

| Decision | Rule |
|----------|------|
| `Radio` vs `Select` | **≤5 options** → Radio; **>5 options** or space-constrained → Select |
| `Chip` vs `SegmentedControl` | Multi-select / filter behavior → Chip; Exclusive mode/view switching → SegmentedControl |
| `Switch` vs `Checkbox` | Immediate effect on toggle → Switch; Value submitted with a form → Checkbox |
| `TextButton` vs `Button` | Inline within sentence/content → TextButton; Standalone CTA → Button |
| `ListCell` vs `Table` | Single-column mobile-friendly rows → ListCell; Multi-column data comparison → Table |
| `Card` vs `ActionArea` | Structured content block → Card; Custom layout that needs to be fully tappable → ActionArea |

## Composition Conflict Rules

- `ActionArea` MUST NOT contain `Button` or `IconButton` for the same action. Use one or the other.
- A section MUST have at most one `variant="filled" color="primary"` Button. Additional CTAs use `weak`/`neutral`.
- `Card` MUST NOT nest inside another `Card`.
- `ListCell` trailing element: use `Switch`, `ContentBadge`, or a text string — not a full `Button`.

## What NOT to Do

- **DO NOT** create `<div onClick>` for button-like behavior. Use `Button`, `IconButton`, or `ActionArea`.
- **DO NOT** use native `<input>`, `<select>`, or `<textarea>`. Always use `TextField`, `Select`, `TextArea`.
- **DO NOT** hardcode hex colors. Use CSS variables or token imports.
- **DO NOT** build custom card containers with `box-shadow`. Use `Card`.
- **DO NOT** create custom toggle switches. Use `Switch`.
