# Skill: Build a Product Screen

Follow these steps to build a complete, consistent product screen using `@baerae-zkap/design-system`.

## Step 1: Identify Screen Type

Classify the screen into one of these patterns:
- **List screen**: Feed, search results, product catalog
- **Form screen**: Registration, settings edit, checkout
- **Detail screen**: Profile view, item detail, order summary
- **Dashboard screen**: Overview with mixed content sections

## Step 2: Select Components

Read the component selection rules. Map every piece of content to a system component:

| Screen Element | Component |
|----------------|-----------|
| Page title | `SectionHeader` or styled heading with `typography.semantic.headline` |
| Content cards | `Card` |
| Media list items | `ListCard` |
| Settings/menu rows | `ListCell` |
| Status labels | `ContentBadge` |
| Primary action | `Button variant="filled" color="primary"` |
| Secondary action | `Button variant="weak" color="neutral"` |
| Text link | `TextButton` |
| Form fields | `TextField`, `Select`, `Switch`, etc. |

## Step 3: Structure the Layout

Apply the layout composition rules:
1. Set screen padding: `spacing.semantic.screen.paddingX` (20px) horizontal
2. Separate major sections by 32-40px
3. Separate items within sections by 8-16px
4. Place primary CTA at the bottom of the content area

```tsx
import { Button, SectionHeader, ListCell } from '@baerae-zkap/design-system';
import { spacing, typography } from '@baerae-zkap/design-system';

export function SettingsScreen() {
  return (
    <div style={{ padding: `${spacing.semantic.screen.paddingTop}px ${spacing.semantic.screen.paddingX}px` }}>
      <h1 style={{ ...typography.semantic.headline.md, margin: 0, marginBottom: spacing.primitive[8] }}>
        Settings
      </h1>

      <SectionHeader title="Account" />
      <ListCell title="Email" trailing="user@email.com" />
      <ListCell title="Password" trailing="Change" onClick={onChangePassword} />

      <div style={{ marginTop: spacing.component.list.sectionGap }}>
        <SectionHeader title="Preferences" />
        <ListCell title="Notifications" trailing={<Switch checked={notifs} onChange={setNotifs} />} />
        <ListCell title="Language" trailing="English" onClick={onLanguage} />
      </div>

      <div style={{ marginTop: spacing.primitive[10] }}>
        <Button variant="weak" color="error" onClick={onLogout} style={{ width: '100%' }}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
```

## Step 4: Apply Tokens

- All colors via CSS variables (`var(--content-base-default)`, etc.)
- All spacing via `spacing.primitive[N]` or `spacing.semantic.*`
- All typography via `typography.semantic.*` spread
- All radii via `radius.component.*`

## Step 5: Implement States

Every screen must handle:
- **Loading**: Skeleton placeholders or disabled state during data fetch
- **Empty**: Message + optional CTA when no data exists
- **Error**: Error message + retry button when fetch fails
- **Success**: Normal content display

## Step 6: Verify

Before considering the screen complete, check:
- [ ] No hardcoded hex colors anywhere
- [ ] No custom `<button>` or `<input>` elements -- all use system components
- [ ] Every `IconButton` has `aria-label`
- [ ] Every form input has a `label` prop
- [ ] Empty and error states exist for all data sections
- [ ] Only one `color="primary"` CTA per screen section
- [ ] Destructive actions use `color="error"` and have confirmation
- [ ] All spacing uses token values, not magic numbers
- [ ] Keyboard navigation works for all interactive elements
