# StateView

> A centered content area component for communicating empty states, error states, loading outcomes, and full-page results — with optional figure, title, description, and action slots.

## When to Use

- **Empty state**: A list, search, or feed has no items to display yet.
- **Error state**: Content failed to load and a retry action is available.
- **Success/completion**: A process has finished (e.g., payment complete, order placed).
- **Loading outcome**: Background processing has finished (e.g., file uploaded, export ready).

## When NOT to Use

- For inline validation errors on a form field — use the `error` prop on `TextField`.
- For brief transient notifications — use `Snackbar` or `Toast`.
- For blocking confirmations requiring user input — use `Dialog`.
- When the content area is already occupied — `StateView` is for sections with nothing else to show.

## Import

```tsx
import { StateView } from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `figure` | `ReactNode` | — | Visual element: illustration, icon, emoji, or any React node. Constrained to a max-size bounding box. |
| `title` | `ReactNode` | — | Primary heading text. Rendered as `<h1>` for `page` variant, `<div>` for `inline`. |
| `description` | `ReactNode` | — | Supporting explanation below the title. |
| `primaryAction` | `ReactNode` | — | Main CTA — pass a `Button` or `TextButton`. Full-width layout recommended for `page` variant. |
| `secondaryAction` | `ReactNode` | — | Secondary CTA shown below the primary action. |
| `variant` | `'inline' \| 'page'` | `'inline'` | Layout mode. `inline` embeds within a content area; `page` fills the full height of its container. |
| `size` | `'default' \| 'compact'` | `'default'` | Spacing density. Applies to `inline` variant only. `compact` uses tighter padding and smaller type. |
| `style` | `CSSProperties` | — | Inline style overrides for the container. Inherited from `HTMLAttributes<HTMLDivElement>`. |

All other `HTMLAttributes<HTMLDivElement>` props are forwarded to the container.

## Basic Usage

```tsx
// Empty list state (inline)
<StateView
  figure={<EmptyBoxIcon />}
  title="Nothing here yet"
  description="Add your first item to get started."
  primaryAction={
    <Button buttonType="weak" color="primary" onClick={onAdd}>Add Item</Button>
  }
/>

// Error state (inline, compact)
<StateView
  size="compact"
  figure={<ErrorIcon />}
  title="Failed to load"
  primaryAction={
    <TextButton onClick={onRetry}>Try again</TextButton>
  }
/>

// Payment complete (page)
<StateView
  variant="page"
  figure={<SuccessIllustration />}
  title="Payment complete"
  description="Your order has been placed and will be delivered within 3–5 days."
  primaryAction={
    <Button buttonType="filled" color="primary" layout="fillWidth" onClick={goHome}>
      Go to Home
    </Button>
  }
  secondaryAction={
    <Button buttonType="weak" color="neutral" layout="fillWidth" onClick={viewOrder}>
      View Order
    </Button>
  }
/>
```

## Variants

### Layout (`variant`)

| Value | Description | Title element | Typical use |
|-------|-------------|---------------|-------------|
| `inline` | Embeds within a content area. Centered, but takes only as much height as content needs. | `<div>` | Empty list, empty search, inline error |
| `page` | Fills full height of its container with vertical centering (`minHeight: 100%`, `justifyContent: center`). | `<h1>` | Success/error full-page results, onboarding completion |

### Size (`size`) — inline variant only

| Value | Padding | Figure max-size | Title size | Use for |
|-------|---------|-----------------|------------|---------|
| `default` | `spacing.primitive[10]` | 120px | `typography.fontSize.xl` | Standard content sections |
| `compact` | `spacing.primitive[6]` | 80px | `typography.fontSize.lg` | Dense panels, sidebars, constrained containers |

## States

`StateView` itself is a presentational component with no internal state. The "state" it communicates is the application state you pass in:

| Application state | Recommended content |
|-------------------|---------------------|
| Empty | Figure (empty box illustration), title, description, optional add/create CTA |
| Error | Figure (error icon), title ("Failed to load"), `primaryAction` with retry |
| Loading outcome (success) | Figure (success illustration/emoji), title, description, two actions |
| Loading outcome (failure) | Figure (warning icon), title, description, retry action |
| No search results | Figure (search icon), title ("No results found"), description suggesting filter adjustment |

## Accessibility

- The `inline` variant renders with `role="status"`, which announces content changes to screen readers using a polite `aria-live` region.
- The `page` variant omits `role="status"` — it is a full-page structure, not a dynamic status update.
- The `title` is rendered as `<h1>` in `page` mode, which places it correctly in the document heading hierarchy. Ensure the page has no other `<h1>` when using `variant="page"`.
- Supplement figure icons with `aria-hidden="true"` on decorative SVGs passed in the `figure` slot.
- Action buttons passed to `primaryAction` and `secondaryAction` retain their own accessible roles.

## Do / Don't

**Do** always show a `StateView` (or equivalent) when a list or data area is empty — never leave a blank white space.

**Do** include a `primaryAction` with a retry or create CTA whenever the state is recoverable.

**Do** use `variant="page"` for full-page outcome screens (payment, submission, onboarding complete) so the content is vertically centered in the viewport.

**Don't** nest `StateView` inside a `Card` — it is a standalone section component, not a card slot.

**Don't** use `StateView` for loading placeholders — use `Skeleton` for content-shaped loading states and `Spinner` for action-in-progress indicators.

**Don't** provide only a `description` without a `title` — the title is the primary communication element. Description alone lacks sufficient visual hierarchy.

## Design Tokens Used

| Token | Usage |
|-------|-------|
| `cssVarColors.content.base.default` | Title text color |
| `cssVarColors.content.base.secondary` | Description text color |
| `typography.fontSize['2xl']` | Page variant title font size |
| `typography.fontSize.xl` | Inline default title font size |
| `typography.fontSize.lg` | Inline compact title font size |
| `typography.fontSize.sm` | Description font size (default) |
| `typography.fontSize.compact` | Description font size (compact) |
| `typography.fontWeight.bold` | Title font weight |
| `spacing.primitive[10]` | Default vertical padding |
| `spacing.primitive[6]` | Compact vertical padding |
| `spacing.primitive[8]` | Page figure/action gap |
| `spacing.primitive[5]` | Inline default figure/action gap |
| `spacing.primitive[3]` | Compact figure/action gap and action gap |
| `spacing.semantic.screen.paddingX` | Horizontal padding |

## Related Components

- **Skeleton** — For loading placeholders while content is being fetched.
- **Spinner** — For indicating an in-progress action (e.g., button submit loading).
- **SectionMessage** — For persistent inline status within page content (not a full empty state).
- **Dialog** — For blocking confirmations, not for outcomes or empty states.
- **Button** / **TextButton** — Pass these as `primaryAction` and `secondaryAction`.
