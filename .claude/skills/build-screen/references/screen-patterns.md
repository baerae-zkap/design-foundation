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
Thumbnail (hero image, aspect ratio 16:9)
---
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

**Key components:** `Thumbnail`, `ContentBadge`, `SectionHeader`, `ListCell`, `Button`

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
