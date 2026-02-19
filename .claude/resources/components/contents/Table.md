# Table

> Status: stable
> Import: `import { Table, TableHead, TableBody, TableRow, TableHeadCell, TableCell } from '@baerae-zkap/design-system'`

## What It Is
A data table component for displaying tabular information in rows and columns. Desktop-oriented. Composed of six sub-components that map to native HTML table elements.

## When to Use
- Use for tabular data with 3+ columns that need cross-column comparison
- Use for data tables on desktop/wide viewports
- Use when data has a consistent columnar structure (name, value, status, action)

## When NOT to Use
- Do NOT use for simple key-value list rows on mobile -- use `ListCell` instead
- Do NOT use for media-rich items -- use `ListCard` instead
- Do NOT use for single-column mobile layouts -- use `ListCell` instead

## Sub-Components

| Component | HTML Element | Purpose |
|-----------|-------------|---------|
| `Table` | `<table>` | Root wrapper. Provides variant/size context |
| `TableHead` | `<thead>` | Header section wrapper |
| `TableBody` | `<tbody>` | Body section wrapper |
| `TableRow` | `<tr>` | Row with bottom border |
| `TableHeadCell` | `<th>` | Header cell. Left-aligned, semibold, alternative bg |
| `TableCell` | `<td>` | Data cell. Left-aligned, regular weight |

## Props

### Table (root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "striped"` | `"default"` | Table style. `striped` applies alternating row backgrounds |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Cell padding and font sizes |
| `children` | `ReactNode` | (required) | TableHead and TableBody |

### TableHeadCell / TableCell

Accept all standard `<th>` / `<td>` HTML attributes respectively.

## Size Guide
| Size | Head Padding | Data Padding | Font Size |
|------|-------------|-------------|-----------|
| `small` | 16px x `spacing.component.table.headCellPaddingY.sm` | 16px x 12px | compact |
| `medium` | 20px x `spacing.component.table.headCellPaddingY.md` | 20px x 16px | 14px (sm) |
| `large` | 24px x `spacing.component.table.headCellPaddingY.lg` | 24px x 20px | 16px (md) |

## Common Patterns

### Basic data table
```tsx
<Table variant="default" size="medium">
  <TableHead>
    <TableRow>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Role</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell>
          <ContentBadge color={user.active ? 'success' : 'neutral'} size="small">
            {user.active ? 'Active' : 'Inactive'}
          </ContentBadge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Striped variant
```tsx
<Table variant="striped" size="small">
  <TableHead>
    <TableRow>
      <TableHeadCell>Asset</TableHeadCell>
      <TableHeadCell>Amount</TableHeadCell>
      <TableHeadCell>Value</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {assets.map(asset => (
      <TableRow key={asset.id}>
        <TableCell>{asset.name}</TableCell>
        <TableCell>{asset.amount}</TableCell>
        <TableCell>{asset.value}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Empty state
```tsx
<Table>
  <TableHead>
    <TableRow>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {items.length === 0 ? (
      <TableRow>
        <TableCell colSpan={2} style={{ textAlign: 'center', padding: 40 }}>
          No data available
        </TableCell>
      </TableRow>
    ) : (
      items.map(item => (
        <TableRow key={item.id}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.status}</TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>
```

## Do / Don't

- DO: Always include TableHead with descriptive column headers
- DON'T: Omit column headers -- users need context for data
- DO: Handle empty state with a message row
- DON'T: Show an empty table body with no explanation
- DO: Use `small` size for dense data tables
- DON'T: Use Table for simple key-value pairs on mobile -- use ListCell

## Token Usage
| Property | Token |
|----------|-------|
| Table bg | `cssVarColors.surface.base.default` |
| Outer border | `borderWidth.default` + `cssVarColors.border.base.default` |
| Outer radius | `radius.component.card.sm` |
| Row border | `borderWidth.default` + `cssVarColors.border.base.default` |
| Head cell bg | `cssVarColors.surface.base.alternative` |
| Head cell color | `cssVarColors.content.base.neutral` |
| Head cell weight | `typography.fontWeight.semibold` |
| Data cell color | `cssVarColors.content.base.default` |

## Accessibility
- Uses native `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` elements
- `<th>` elements have `textAlign: 'left'` by default
- Table uses `borderCollapse: 'separate'` with `borderSpacing: 0` for proper radius clipping
- Context API (`TableContext`) shares variant/size config to child cells
