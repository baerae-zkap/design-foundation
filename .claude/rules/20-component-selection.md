# Component Selection Guide

> **Note**: Button uses `buttonType` prop (not `variant`). See `.claude/resources/components/actions/Button.md` for full API.

Use this decision tree to pick the correct component. Follow top-to-bottom; use the first match.

## Actions -- "User does something"

| IF the user needs to... | THEN use | Example |
|-------------------------|----------|---------|
| Perform the primary action on screen | `<Button buttonType="filled" color="primary">` | Submit, Save, Continue |
| Perform a secondary/cancel action | `<Button buttonType="weak" color="neutral">` | Cancel, Back, Skip |
| Perform a destructive action | `<Button buttonType="filled" color="error">` | Delete, Remove |
| Perform a soft destructive action | `<Button buttonType="weak" color="error">` | Remove item from list |
| Click a text-only inline link | `<TextButton>` | "Forgot password?", "View all" |
| Click an icon-only action | `<IconButton aria-label="Close">` | Close, Menu, Share |
| Toggle/select a tag or filter | `<Chip>` | Category filter, tag selector |
| Tap a large custom-content area | `<ActionArea>` | Banner, promotional card |

```tsx
// Primary + Secondary pair
<div style={{ display: 'flex', gap: 12 }}>
  <Button buttonType="weak" color="neutral" onClick={onCancel}>Cancel</Button>
  <Button buttonType="filled" color="primary" onClick={onSubmit}>Save</Button>
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
<Button buttonType="filled" color="primary" onClick={onLogin} style={{ width: '100%' }}>
  Log In
</Button>
```

## Feedback -- "System communicates to the user"

| IF you need to... | THEN use | Example |
|-------------------|----------|---------|
| Show brief auto-dismiss notification (single message) | `<Snackbar>` | "저장됐어요", "복사했어요" |
| Show richer notification with heading + description | `<Toast>` | "저장 완료" + "클라우드에 업로드됐어요" |
| Show inline contextual status within page content | `<SectionMessage variant="...">` | Form error, success confirmation, info banner |
| Block user for critical confirmation before action | `<AlertDialog>` | Delete, logout, irreversible action |
| Show empty/error/result state for a content area | `<StateView>` | Empty list, error page, payment complete |
| Show notification count overlay on an icon/button | `<PushBadge>` | Unread count on bell icon |

```tsx
// Transient feedback
<Snackbar open={saved} message="저장됐어요." onClose={() => setSaved(false)} />
<Toast open={saved} heading="저장 완료" description="클라우드에 업로드됐어요." onClose={() => setSaved(false)} />

// Inline contextual
<SectionMessage variant="error" heading="오류" description="저장에 실패했습니다." />

// Blocking confirmation
<AlertDialog open={isOpen} onClose={close} title="삭제?" actions={[...]} />

// Empty state
<StateView figure={<EmptyIcon />} title="항목 없음" primaryAction={<Button>추가</Button>} />

// Notification badge
<PushBadge count={unread} hidden={unread === 0}><IconButton>...</IconButton></PushBadge>
```

### Snackbar vs Toast Decision
| Use `Snackbar` | Use `Toast` |
|----------------|-------------|
| Single short message | Heading + supporting detail |
| "저장됐어요" | "저장 완료" + "파일이 업로드됐어요" |
| Undo action button | Context action ("파일 보기") |

### SectionMessage vs AlertDialog vs Toast
| Component | When | Persistence | Blocks UI |
|-----------|------|-------------|-----------|
| `SectionMessage` | Inline in content | Persistent | No |
| `Toast` / `Snackbar` | Global transient | Auto-dismiss | No |
| `AlertDialog` | Critical confirmation | Until dismissed | Yes |

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
- A section MUST have at most one `buttonType="filled" color="primary"` Button. Additional CTAs use `weak`/`neutral`.
- `Card` MUST NOT nest inside another `Card`.
- `ListCell` trailing element: use `Switch`, `ContentBadge`, or a text string — not a full `Button`.

## What NOT to Do

- **DO NOT** create `<div onClick>` for button-like behavior. Use `Button`, `IconButton`, or `ActionArea`.
- **DO NOT** use native `<input>`, `<select>`, or `<textarea>`. Always use `TextField`, `Select`, `TextArea`.
- **DO NOT** hardcode hex colors. Use CSS variables or token imports.
- **DO NOT** build custom card containers with `box-shadow`. Use `Card`.
- **DO NOT** create custom toggle switches. Use `Switch`.
