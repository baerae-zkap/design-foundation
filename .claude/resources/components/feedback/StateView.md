# StateView Component

## Purpose
Generic state display component. Handles empty state, error state, and action results (success/error/processing) in a single unified API.

- `variant="inline"` — embedded within content areas (lists, cards, search results)
- `variant="page"` — full-height centered layout for page-level outcomes (payment complete, error page)

## Import
```tsx
import { StateView } from '@baerae-zkap/design-system';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `figure` | `ReactNode` | — | Visual: illustration, icon, or emoji |
| `title` | `ReactNode` | — | Primary heading text |
| `description` | `ReactNode` | — | Supporting description |
| `primaryAction` | `ReactNode` | — | Primary action button |
| `secondaryAction` | `ReactNode` | — | Secondary action button |
| `variant` | `'inline' \| 'page'` | `'inline'` | Layout variant |
| `size` | `'default' \| 'compact'` | `'default'` | Size (inline only) |

All props optional. Extends `Omit<HTMLAttributes<HTMLDivElement>, 'title'>`.

## Size (inline variant only)

| Size | Padding | Figure max | Title fontSize |
|------|---------|------------|----------------|
| `default` | 40px | 120px | xl (20px) |
| `compact` | 24px | 80px | lg (18px) |

Page variant: padding 40px, figureMax 160px, title `<h1>` with fontSize 2xl (24px).

## Usage Patterns

### Empty State (inline, default)
```tsx
<StateView
  figure={<EmptyIllustration />}
  title="아직 항목이 없어요"
  description="새 항목을 추가해 시작해보세요."
  primaryAction={<Button buttonType="weak" color="primary">추가하기</Button>}
/>
```

### Error State (inline, compact)
```tsx
<StateView
  size="compact"
  figure={<ErrorIcon />}
  title="불러오지 못했어요"
  primaryAction={<TextButton onClick={onRetry}>다시 시도</TextButton>}
/>
```

### No Search Results
```tsx
<StateView
  figure={<SearchEmptyIcon />}
  title="검색 결과가 없어요"
  description={`"${query}"에 대한 결과를 찾을 수 없어요.`}
/>
```

### Page Success
```tsx
<StateView
  variant="page"
  figure={<SuccessAnimation />}
  title="결제가 완료됐어요"
  description="주문이 정상적으로 접수됐습니다."
  primaryAction={<Button buttonType="filled" color="primary" layout="fillWidth">홈으로</Button>}
  secondaryAction={<Button buttonType="weak" color="neutral" layout="fillWidth">주문 내역 보기</Button>}
/>
```

### Page Error
```tsx
<StateView
  variant="page"
  figure={<ErrorIllustration />}
  title="오류가 발생했어요"
  description="잠시 후 다시 시도해주세요."
  primaryAction={<Button buttonType="filled" color="primary" layout="fillWidth">다시 시도</Button>}
/>
```

## Variant Decision

| Situation | variant |
|-----------|---------|
| Empty list, card body, search results | `inline` |
| Payment complete, signup done, error page | `page` |
| Inside a card or tab panel | `inline` |
| Full screen after navigation action | `page` |

## Design Rules
- All slots are optional — render only what's needed
- `role="status"` applied only on `variant="inline"` for live region semantics
- Page variant renders `title` as `<h1>` for document heading hierarchy
- Use `layout="fillWidth"` on Button for page variant actions
- Max 2 actions (primaryAction + secondaryAction)
- Do NOT nest StateView inside another StateView
- Do NOT use `variant="page"` inside a Card
