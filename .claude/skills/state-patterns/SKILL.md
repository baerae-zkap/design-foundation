# Skill: State Patterns

## When to Use
When a screen or section needs loading, empty, error, or success states. Load this skill to ensure all required states are implemented.

## Required States by Section Type

### Data List / Feed
| State | Implementation |
|-------|---------------|
| Loading | Skeleton items (3-5 placeholder rows matching content shape) |
| Empty | Centered icon + heading + body text + optional CTA |
| Error | Error message + Retry button |
| Populated | Normal list render |

### Form / Input Section
| State | Implementation |
|-------|---------------|
| Idle | All fields enabled, submit button disabled until valid |
| Validating | Field-level error messages shown on blur |
| Submitting | Submit button shows isLoading, fields disabled |
| Success | Navigate away or show success message |
| Error (server) | Error message above submit button |

### Button / Action
| State | Implementation |
|-------|---------------|
| Default | Normal interactive |
| Disabled | `disabled={!preconditionMet}` |
| Loading | `isLoading={isAsyncOperationInProgress}` |

### Toggle / Switch
| State | How |
|-------|-----|
| Optimistic update | Change UI immediately, revert on API failure |
| Loading | Show spinner inline if needed |

## Code Templates

### List states
```tsx
function DataList() {
  const { data, isLoading, error, refetch } = useData();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ height: 72, backgroundColor: 'var(--surface-base-alternative)', margin: '1px 0' }} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: 40 }}>
        <p style={{ fontSize: 14, color: 'var(--content-base-secondary)' }}>Failed to load.</p>
        <Button buttonType="weak" color="primary" onClick={refetch}>Retry</Button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--content-base-default)', margin: 0 }}>No items yet</p>
        <p style={{ fontSize: 14, color: 'var(--content-base-secondary)', margin: 0 }}>Items you add will appear here.</p>
      </div>
    );
  }

  return <>{data.map(item => <ListCell key={item.id} title={item.name} onClick={() => onSelect(item)} />)}</>;
}
```

### Form submit state
```tsx
<Button
  buttonType="filled"
  color="primary"
  layout="fillWidth"
  size="xLarge"
  disabled={!isFormValid}
  isLoading={isSubmitting}
  onClick={handleSubmit}
>
  Save Changes
</Button>
```

## Rules
- NEVER show a blank white area -- always show loading, empty, or error state
- NEVER block the entire screen with a full-page spinner -- contain to section
- Form submit button must have BOTH `disabled` and `isLoading` states
- Destructive actions need confirmation before executing

## References
- `.claude/rules/60-state-model.md`
- `.claude/rules/50-ux-patterns.md`
- `.claude/resources/components/actions/Button.md`
