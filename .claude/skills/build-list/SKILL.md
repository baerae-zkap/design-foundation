# Skill: Build List

## When to Use
When building list screens, feed screens, search results, or settings menus.

## List Type Selector

| Content Type | Component | When |
|-------------|-----------|------|
| Media items (image + title + meta) | ListCard | Product listings, article feeds |
| Settings / menu rows | ListCell | App settings, option menus |
| Section-grouped items | SectionHeader + ListCard/ListCell | Grouped settings, categorized lists |

## Workflow

### Step 1: Choose list component
- Does each item have an image/thumbnail? → ListCard
- Is it a settings-style row? → ListCell

### Step 2: Structure the list
```tsx
// Settings list pattern
<div>
  <SectionHeader title="Account" />
  <ListCell title="Email" trailing="user@example.com" />
  <ListCell title="Password" trailing="Change" onClick={onPassword} />
  <ListCell title="Notifications" trailing={<Switch checked={notifs} onChange={setNotifs} />} />

  <SectionHeader title="App" />
  <ListCell title="Language" trailing="English" onClick={onLanguage} />
</div>

// Media feed pattern
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

### Step 3: Required states (ALL lists must have)
```tsx
if (isLoading) return <SkeletonList count={5} />;
if (error) return <ErrorState message="Failed to load" onRetry={refetch} />;
if (items.length === 0) return <EmptyState message="No items yet" />;
return <ItemList items={items} />;
```

### Step 4: Filtering / Search
- Add SearchField above the list for search
- Add Chip group for filter tags
- Show result count in SectionHeader

## Do / Don't
- DO: Always handle loading, empty, error states
- DON'T: Show blank area when list is empty
- DO: Group related items with SectionHeader
- DO: Use consistent item height within a list
- DON'T: Mix ListCard and ListCell in the same section

## References
- `.claude/resources/components/contents/ListCard.md`
- `.claude/resources/components/contents/ListCell.md`
- `.claude/resources/components/contents/SectionHeader.md`
- `.claude/rules/60-state-model.md`
