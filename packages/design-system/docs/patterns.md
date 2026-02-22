# Layout and UX Patterns

Consistent patterns for page structure, component composition, and user interaction across the product. Follow these patterns to ensure every screen feels predictable, accessible, and on-brand.

---

## Page Structure

Every screen follows this layout skeleton:

```
+---------------------------+
|     Top Navigation        |  Fixed header — 56px height
+---------------------------+
|                           |
|   Scrollable Content      |  paddingInline: 20px (screen.paddingX)
|                           |  paddingTop: 16px, paddingBottom: 20px
|   Section A               |
|                           |
|   ── 32–40px gap ──       |
|                           |
|   Section B               |
|                           |
+---------------------------+
|   Bottom Fixed Actions    |  Optional sticky CTA bar (ActionArea or BottomCTA)
+---------------------------+
```

```tsx
// Page wrapper
<div style={{
  paddingInline: spacing.semantic.screen.paddingX,   // 20px
  paddingTop: spacing.semantic.screen.paddingTop,    // 16px
  paddingBottom: spacing.semantic.screen.paddingBottom, // 20px
}}>
  <SectionHeader title="Account" />

  <div style={{ marginTop: spacing.primitive[2] }}>
    {/* Section A content */}
  </div>

  <div style={{ marginTop: spacing.primitive[8] }}>
    {/* Section B — 32px below Section A */}
  </div>
</div>
```

---

## Spacing Rhythm

Consistent spacing prevents visual noise and creates hierarchy.

| Between... | Gap | Token |
|------------|-----|-------|
| Major page sections | 32–40px | `spacing.primitive[8]` to `[10]` |
| Items within a section | 8–16px | `spacing.primitive[2]` to `[4]` |
| Label and its input | 8px | `spacing.component.input.labelGap` |
| Helper text and input | 4px | `spacing.component.input.helperGap` |
| Buttons in a group | 8–12px | `spacing.primitive[2]` to `[3]` |
| Icon and adjacent text | 4–8px | `spacing.primitive[1]` to `[2]` |

Rules:
- All spacing values must be multiples of 4. Never use arbitrary values like 13px or 15px.
- Use `spacing.semantic.screen.paddingX` (20px) for all horizontal page edges — never hardcode `20`.
- Use `spacing.primitive[8]` (32px) as the default section separator.

---

## Card Patterns

Cards are always interactive (`onClick` required). They are self-contained content blocks.

```tsx
// Slot mode — structured content via props
<Card
  variant="outlined"
  heading="Order #1234"
  subheading="3 items"
  caption="Delivered Jan 15"
  onClick={() => navigate('/orders/1234')}
/>

// Children mode — custom internal layout
<Card variant="elevated" padding="medium" onClick={() => navigate('/detail')}>
  <h4 style={{ ...typography.semantic.title.sm, margin: 0 }}>Order #1234</h4>
  <p style={{
    ...typography.semantic.body.sm,
    color: 'var(--content-base-secondary)',
    margin: 0,
    marginTop: spacing.primitive[1],
  }}>
    Delivered Jan 15
  </p>
</Card>
```

Rules:
- Cards do **not** nest inside other cards.
- Cards always have `onClick` — use a non-interactive container (`div`) if the content is purely static.
- Internal padding: 16px (`card.padding.sm`) or 20px (`card.padding.md`). Never custom values.
- Card handles keyboard accessibility internally (Enter/Space to activate).

---

## List Patterns

### Media Content Lists

For feeds, product grids, and search results with thumbnails:

```tsx
<ListCard
  thumbnail={<img src={item.image} alt={item.name} />}
  title={item.name}
  description={item.description}
  trailing={<ContentBadge color="success">New</ContentBadge>}
  onClick={() => navigate(`/item/${item.id}`)}
/>
```

### Settings / Options Lists

For menu items, preferences, and navigation rows:

```tsx
<SectionHeader title="General" />
<ListCell title="Language" trailing="English" onClick={onLanguage} />
<ListCell title="Dark Mode" trailing={<Switch checked={dark} onChange={setDark} />} />
<ListCell title="Notifications" trailing={<Switch checked={notifs} onChange={setNotifs} />} />

<div style={{ marginTop: spacing.component.list.sectionGap }}>
  <SectionHeader title="Account" />
  <ListCell title="Change Password" onClick={onPassword} />
  <ListCell title="Delete Account" onClick={onDelete} />
</div>
```

Rules:
- List items have zero gap between them (`spacing.component.list.itemGap = 0`). Dividers are built into the components.
- Section-to-section gap is 32px (`spacing.component.list.sectionGap`).
- `ListCell` trailing element: use `Switch`, `ContentBadge`, or a text string — not a full `Button`.
- Group related list items under a `SectionHeader`.

---

## Form Layout

Forms are single-column on mobile. Stack inputs vertically with 16px gap.

```tsx
<form onSubmit={handleSubmit}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[4] }}>
    <TextField
      label="Full name"
      value={name}
      onChange={setName}
      error={errors.name}
    />
    <TextField
      label="Email address"
      type="email"
      value={email}
      onChange={setEmail}
      error={errors.email}
    />
    <TextArea
      label="Bio"
      value={bio}
      onChange={setBio}
      maxLength={300}
    />
  </div>

  <Button
    buttonType="filled"
    color="primary"
    layout="fillWidth"
    disabled={!isDirty || !isValid}
    isLoading={isSubmitting}
    style={{ marginTop: spacing.primitive[6] }}
  >
    Save Profile
  </Button>
</form>
```

Rules:
- Wrap in a `<form>` element with `onSubmit` handler.
- All fields must have a visible `label` prop.
- Primary CTA is at the bottom, full-width on mobile.
- Separate destructive actions (Delete Account) from primary actions by at least 32px or place them in a distinct section.
- Two-column layout is acceptable only on wide desktop breakpoints.

---

## Action Placement

### Primary CTA

Sits at the bottom of the form or screen section. `buttonType="filled" color="primary"`.

```tsx
<Button buttonType="filled" color="primary" layout="fillWidth" isLoading={saving}>
  Save
</Button>
```

### Secondary Action

Placed to the left of primary, or above it. `buttonType="weak" color="neutral"`.

```tsx
<div style={{ display: 'flex', gap: spacing.primitive[2] }}>
  <Button buttonType="weak" color="neutral" onClick={onCancel}>Cancel</Button>
  <Button buttonType="filled" color="primary" onClick={onSave}>Save</Button>
</div>
```

### Destructive Action

Separated from the primary cluster. Uses `color="error"`. Always requires a confirmation step before executing.

```tsx
{/* Separated by significant space from primary actions */}
<div style={{ marginTop: spacing.primitive[10] }}>
  <Button buttonType="weak" color="error" onClick={() => setShowConfirm(true)}>
    Delete Account
  </Button>
</div>
```

Rules:
- Maximum one `buttonType="filled" color="primary"` button per action group.
- Never place a destructive `color="error"` button adjacent to the primary CTA without visual separation.
- Use `ActionArea` for button groups at the bottom of overlays (BottomSheet, Popup, screen footer).

---

## Empty States

Every list, table, and data section must handle the empty case. Never show a blank white area.

```tsx
// Standard empty state
<div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing.primitive[4],
  padding: spacing.primitive[10],
  textAlign: 'center',
}}>
  <EmptyIllustration />
  <h3 style={{ ...typography.semantic.headline.sm, margin: 0 }}>
    No items yet
  </h3>
  <p style={{
    ...typography.semantic.body.sm,
    color: 'var(--content-base-secondary)',
    margin: 0,
  }}>
    Add your first item to get started.
  </p>
  <Button buttonType="weak" color="primary" onClick={onAdd}>
    Add item
  </Button>
</div>
```

Or use the `StateView` component for full standardized states:

```tsx
<StateView
  figure={<EmptyIcon />}
  title="No results found"
  description="Try adjusting your search or removing filters."
  primaryAction={
    <Button buttonType="weak" color="primary" onClick={onClearFilters}>
      Clear filters
    </Button>
  }
/>
```

### Empty State Variants

| Situation | Title | CTA |
|-----------|-------|-----|
| Empty list (no data yet) | "No [items] yet" | "Add [item]" |
| Empty search results | "No results for '[query]'" | "Clear search" |
| Filter returns nothing | "No matches" | "Reset filters" |
| Error loading content | "Something went wrong" | "Try again" |

---

## Loading States

### Content Loading — Skeleton

Use `Skeleton` for content areas where the shape of the incoming data is known. Never block the entire page with a spinner.

```tsx
// Loading list
if (isLoading) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.primitive[2] }}>
      <Skeleton height={72} borderRadius={8} />
      <Skeleton height={72} borderRadius={8} />
      <Skeleton height={72} borderRadius={8} />
    </div>
  );
}
```

### Action Loading — Button Spinner

Use `isLoading` on `Button` to indicate an async operation in progress. Keep the layout stable — do not hide or remove the button while loading.

```tsx
<Button
  buttonType="filled"
  color="primary"
  isLoading={isSubmitting}
  disabled={isSubmitting}
>
  Submit
</Button>
```

### Rules

- Never show a full-screen blocking spinner.
- Skeleton placeholder shape should match the shape of the real content.
- Disable interactive elements during form submission to prevent double-submit.
- On background operations (polling, sync), do not interrupt the user's current screen.

---

## Button States

Every interactive button must implement all applicable states:

| State | When | Implementation |
|-------|------|----------------|
| Default | Normal state | Rendered normally |
| Hover | Cursor over element | Built in — no extra code |
| Pressed | Mouse or touch down | Built in — no extra code |
| Disabled | Precondition not met | `disabled={true}` prop |
| Loading | Async operation in progress | `isLoading={true}` prop (Button only) |

```tsx
<Button
  buttonType="filled"
  color="primary"
  onClick={handleSubmit}
  disabled={!isFormValid}
  isLoading={isSubmitting}
>
  Save
</Button>
```

Rules:
- Show disabled state when required fields are empty or validation hasn't passed.
- Show loading state during any async operation triggered by the button.
- Never remove the button from the DOM while loading — replace the label with a spinner in-place.

---

## Form Validation

Validate on blur (field-level) and on submit (form-level). Show errors inline below the field using the `error` prop.

```tsx
const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState<string | undefined>();

const validateEmail = (value: string) => {
  if (!value) return 'Email is required';
  if (!value.includes('@')) return 'Enter a valid email address';
  return undefined;
};

<TextField
  label="Email"
  type="email"
  value={email}
  onChange={setEmail}
  error={emailError}
  onBlur={() => setEmailError(validateEmail(email))}
  placeholder="you@example.com"
/>
```

Rules:
- Do not show error state before the user has interacted with the field.
- Validate on blur for field-level errors, on submit for form-level.
- Keep the submit button visible but disabled until required fields are filled.
- Error messages should be specific and actionable: "Enter a valid email address" not "Invalid input".

---

## Destructive Action Confirmation

Any destructive action — delete, remove, logout, leave without saving — must have a confirmation step before executing.

### Option A: Dialog Confirmation (Recommended)

```tsx
// Trigger
<Button buttonType="weak" color="error" onClick={() => setShowConfirm(true)}>
  Delete Account
</Button>

// Confirmation popup
<Popup
  open={showConfirm}
  onClose={() => setShowConfirm(false)}
  title="Delete account?"
  actions={[
    {
      label: 'Cancel',
      onClick: () => setShowConfirm(false),
      color: 'neutral',
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      color: 'error',
      variant: 'filled',
    },
  ]}
>
  <p style={{ color: 'var(--content-base-secondary)', fontSize: 14 }}>
    This action is permanent and cannot be undone. All your data will be deleted.
  </p>
</Popup>
```

### Option B: Inline Confirmation

Replace the button with a two-button pair in-place:

```tsx
{!confirming ? (
  <Button buttonType="weak" color="error" onClick={() => setConfirming(true)}>
    Remove item
  </Button>
) : (
  <div style={{ display: 'flex', gap: spacing.primitive[2] }}>
    <Button buttonType="weak" color="neutral" onClick={() => setConfirming(false)}>
      Cancel
    </Button>
    <Button buttonType="filled" color="error" onClick={handleRemove}>
      Confirm removal
    </Button>
  </div>
)}
```

Rules:
- The confirm action always uses `color="error"`.
- The cancel action always uses `color="neutral"`.
- Do not allow the user to accidentally confirm by clicking in the same location as the original button.
- For irreversible actions, use Option A (Dialog) — inline confirmation is appropriate for lower-stakes removals.
- Never auto-execute a destructive action after a countdown or delay.

---

## Error States

Every data-fetching section must handle errors gracefully. Do not show blank areas or unhandled exceptions.

```tsx
if (isLoading) return <SkeletonList />;

if (error) {
  return (
    <StateView
      figure={<ErrorIcon />}
      title="Failed to load"
      description="Please check your connection and try again."
      primaryAction={
        <Button buttonType="weak" color="primary" onClick={refetch}>
          Retry
        </Button>
      }
    />
  );
}

if (items.length === 0) return <EmptyState />;

return <ItemList items={items} />;
```

Rules:
- Contain error states to their section — do not break adjacent content.
- Always provide a retry action.
- Show a human-readable message, not a stack trace or error code.
- After a failed form submission, keep the form values intact and show the error near the relevant field or at the top of the form.

---

## Accessibility Patterns

Apply these patterns consistently across all screens:

### Semantic HTML

```tsx
<main>
  <nav aria-label="Main navigation">...</nav>
  <section aria-labelledby="section-title">
    <h2 id="section-title">Account Settings</h2>
    {/* content */}
  </section>
  <form onSubmit={handleSubmit}>
    {/* inputs */}
  </form>
</main>
```

### Icon-Only Controls

Every `IconButton` and icon-only control must have an `aria-label`:

```tsx
// Required
<IconButton aria-label="Close dialog"><CloseIcon /></IconButton>
<IconButton aria-label="Share post"><ShareIcon /></IconButton>

// Also add a Tooltip for sighted users
<Tooltip label="Close" position="bottom">
  <IconButton aria-label="Close dialog"><CloseIcon /></IconButton>
</Tooltip>
```

### Touch Targets

Interactive elements must meet the minimum touch target of 44px (`spacing.semantic.minTouchTarget`). The system components handle this for `Button`, `IconButton`, `ListCell`, and `Switch`. For custom interactive elements:

```tsx
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && onClick()}
  onClick={onClick}
  style={{
    minWidth: spacing.semantic.minTouchTarget,
    minHeight: spacing.semantic.minTouchTarget,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  {/* content */}
</div>
```

### Color and State Communication

Color must not be the only indicator of state. Pair color changes with text or icons:

```tsx
// BAD — red text alone
<span style={{ color: 'var(--content-error-default)' }}>Invalid</span>

// GOOD — red text + error icon + text message
<span style={{ color: 'var(--content-error-default)', display: 'flex', gap: 4 }}>
  <ErrorIcon size={16} />
  Email address is invalid
</span>
```

---

## Language Consistency

Use consistent terminology throughout the product. Decide on one term per concept and never mix alternatives:

| Concept | Use | Avoid |
|---------|-----|-------|
| Persist changes | "Save" | "Submit", "Done", "OK" |
| Abandon action | "Cancel" | "Back", "Close", "Dismiss" (when meaning cancel) |
| Permanent removal | "Delete" | "Remove", "Erase", "Clear" (for permanent delete) |
| Reversible removal | "Remove" | "Delete" (implies permanent) |
| Confirm understanding | "Got it" | "OK", "Okay", "Understood" |

If the product uses Korean, apply the same consistency principle and use unified Korean terminology throughout.
