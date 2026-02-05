# @baerae-zkap/design-system - AI Documentation

> 이 문서는 AI가 바이브코딩 시 참조하는 컴포넌트 가이드입니다.

## Quick Start

```tsx
// Web
import { Button, TextButton, ActionArea, ActionAreaButton } from '@baerae-zkap/design-system';

// React Native
import { Button, TextButton, ActionArea, ActionAreaButton } from '@baerae-zkap/design-system/native';
```

## Available Components

| Component | Description | Doc |
|-----------|-------------|-----|
| Button | 작업을 수행하는 클릭 가능한 요소 | [Button.md](./components/Button.md) |
| TextButton | 텍스트 기반의 가벼운 액션 버튼 | [TextButton.md](./components/TextButton.md) |
| ActionArea | 모달/시트 하단의 버튼 그룹 컨테이너 (sticky, gradient 지원) | [ActionArea.md](./components/ActionArea.md) |
| ActionAreaButton | ActionArea 내부 전용 버튼 (main/alternative/sub) | [ActionArea.md](./components/ActionArea.md) |

## Design Tokens (Foundation)

### Spacing
| Token | Value | Usage |
|-------|-------|-------|
| `primitive.1` | 4px | 최소 간격 |
| `primitive.2` | 8px | 아이콘-텍스트 간격 |
| `primitive.3` | 12px | 버튼 그룹 간격 (modal.buttonGap) |
| `primitive.4` | 16px | 기본 패딩 |
| `primitive.5` | 20px | BottomSheet 패딩 |
| `primitive.6` | 24px | Modal 패딩 |
| `primitive.12` | 48px | xLarge 버튼 높이 |

### Button Heights
| Size | Height |
|------|--------|
| small | 36px |
| medium | 40px |
| large | 44px |
| xLarge | 48px |

### Colors
| Color Token | Usage |
|-------------|-------|
| `brandDefault` | 주요 액션 (결제, 저장, 확인) |
| `brandSecondary` | 보조 브랜드 액션 |
| `baseContainer` | 중립 액션 (취소, 닫기) |
| `successDefault` | 성공/완료 액션 |
| `errorDefault` | 위험 액션 (삭제, 탈퇴) |

## Global Rules (전역 규칙)

### 1. Event Handlers
```tsx
// ✅ Web
<Button onClick={() => {}} />

// ✅ React Native
<Button onPress={() => {}} />
```

### 2. Accessibility
- 최소 터치 영역: 44x44px
- icon-only 버튼: `aria-label` (Web) / `accessibilityLabel` (RN) 필수
- disabled 상태에서도 색상 대비 4.5:1 유지

### 3. Layout Spacing
```tsx
// Modal 내부
<View style={{ padding: 24, gap: 12 }}>  {/* modal.padding, modal.buttonGap */}

// BottomSheet 내부
<View style={{ padding: 20, gap: 12 }}>  {/* bottomSheet.padding, modal.buttonGap */}
```

### 4. Button Combinations
| 상황 | Main | Alternative | 배치 |
|------|------|-------------|------|
| 중요한 결정 | filled + brandDefault | outlined + baseContainer | 세로 (Main 위) |
| 균등한 선택 | filled + brandDefault | outlined + baseContainer | 가로 (Main 오른쪽) |
| 위험 액션 | filled + errorDefault | outlined + baseContainer | 세로 (Main 위) |

## File Structure

각 컴포넌트 폴더 구조:
```
ComponentName/
├── ComponentName.tsx      # 컴포넌트 구현
├── ComponentName.css.ts   # 스타일 (recipe 패턴)
├── ComponentName.md       # AI용 문서 ← 이 파일 참조
└── index.ts               # export
```

## See Also

- [Button.md](./components/Button.md) - 버튼 상세 규칙
- [TextButton.md](./components/TextButton.md) - 텍스트 버튼 상세 규칙
- [ActionArea.md](./components/ActionArea.md) - 액션 영역 상세 규칙
- [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - 전체 토큰 목록
