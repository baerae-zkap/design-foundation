# Screen Patterns Reference

Common product screen patterns with their component mappings.

## Settings Screen

```
SectionHeader ("Account")
  ListCell ("Email", trailing: value)
  ListCell ("Password", trailing: "Change", onClick)
SectionHeader ("Notifications")
  ListCell ("Push", trailing: Switch)
  ListCell ("Email", trailing: Switch)
SectionHeader ("Danger Zone")
  Button (variant="weak", color="error", "Delete Account")
```

**Key components:** `SectionHeader`, `ListCell`, `Switch`, `Button`

## Profile Screen

```
Card (avatar + name + bio)
SectionHeader ("Activity")
  ListCell ("Posts", trailing: count)
  ListCell ("Followers", trailing: count)
SectionHeader ("Actions")
  Button (variant="filled", color="primary", "Edit Profile")
  Button (variant="weak", color="neutral", "Share Profile")
```

**Key components:** `Card`, `SectionHeader`, `ListCell`, `Button`

## Feed / List Screen

```
SearchField (top, sticky)
SectionHeader ("Recent", action: "View All" TextButton)
  ListCard (thumbnail + title + description + metadata)
  ListCard (...)
  ListCard (...)
[Empty state if no items]
```

**Key components:** `SearchField`, `SectionHeader`, `ListCard`, `TextButton`

## Form Screen

```
Heading (typography.semantic.headline.md)
Description (typography.semantic.body.sm, secondary color)
---
TextField ("Name", required)
TextField ("Email", type="email", required)
TextArea ("Bio", optional)
Select ("Category", options)
---
Button (variant="filled", color="primary", "Submit", full-width)
```

**Key components:** `TextField`, `TextArea`, `Select`, `Button`

## Login Screen

```
Heading ("Log In", typography.semantic.headline.md)
---
TextField (type="email", label="Email")
TextField (type="password", label="Password")
TextButton ("Forgot password?", color="muted", align right)
---
Button (variant="filled", color="primary", "Log In", full-width)
---
Divider text ("or")
---
Button (variant="filled", color="kakao", "Continue with Kakao", full-width)
Button (variant="outlined", color="google", "Continue with Google", full-width)
---
TextButton ("Don't have an account? Sign up", color="primary")
```

**Key components:** `TextField`, `TextButton`, `Button` (primary, kakao, google)

## Detail Screen

```
Heading (typography.semantic.title.md)
ContentBadge (status: "Active", color="success")
Body text (typography.semantic.body.md)
---
SectionHeader ("Details")
  ListCell ("Created", trailing: date)
  ListCell ("Category", trailing: value)
  ListCell ("Status", trailing: ContentBadge)
---
Button bar (bottom fixed):
  Button (variant="weak", color="neutral", "Back")
  Button (variant="filled", color="primary", "Edit")
```

**Key components:** `ContentBadge`, `SectionHeader`, `ListCell`, `Button`

## Dashboard Screen

```
Heading ("Dashboard", typography.semantic.headline.md)
---
Row of Card (stat cards: metric + label, 2-3 per row)
---
SectionHeader ("Recent Activity", action: TextButton "View All")
  ListCard (item + timestamp)
  ListCard (...)
---
SectionHeader ("Quick Actions")
  Row of Button/ActionArea cards
```

**Key components:** `Card`, `SectionHeader`, `ListCard`, `TextButton`, `ActionArea`

---

## List Building Patterns

### List Type Selection

| Content Type | Component | When |
|-------------|-----------|------|
| Media items (image + title + meta) | ListCard | Product listings, article feeds |
| Settings / menu rows | ListCell | App settings, option menus |
| Section-grouped items | SectionHeader + ListCard/ListCell | Grouped settings, categorized lists |

### Settings List Pattern
```tsx
<div>
  <SectionHeader title="Account" />
  <ListCell title="Email" trailing="user@example.com" />
  <ListCell title="Password" trailing="Change" onClick={onPassword} />
  <ListCell title="Notifications" trailing={<Switch checked={notifs} onChange={setNotifs} />} />

  <SectionHeader title="App" />
  <ListCell title="Language" trailing="English" onClick={onLanguage} />
</div>
```

### Media Feed Pattern
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
  {items.map(item => (
    <ListCard
      key={item.id}
      thumbnail={<img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      title={item.title}
      subtitle={item.subtitle}
      onClick={() => navigate(`/item/${item.id}`)}
    />
  ))}
</div>
```

### Required States (ALL lists must have)
```tsx
if (isLoading) return <SkeletonList count={5} />;
if (error) return <ErrorState message="Failed to load" onRetry={refetch} />;
if (items.length === 0) return <EmptyState message="No items yet" />;
return <ItemList items={items} />;
```

### Filtering / Search
- Add SearchField above the list for search
- Add Chip group for filter tags
- Show result count in SectionHeader

### Do / Don't
- DO: Always handle loading, empty, error states
- DON'T: Show blank area when list is empty
- DO: Group related items with SectionHeader
- DO: Use consistent item height within a list
- DON'T: Mix ListCard and ListCell in the same section
