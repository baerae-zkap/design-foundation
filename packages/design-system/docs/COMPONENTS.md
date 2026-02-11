# @baerae-zkap/design-system - AI Documentation

> 이 문서는 AI가 바이브코딩 시 참조하는 컴포넌트 가이드입니다.

## Quick Start

```tsx
// Web
import { Button, TextButton, ActionArea } from '@baerae-zkap/design-system';

// React Native
import { Button, TextButton, ActionArea } from '@baerae-zkap/design-system/native';
```

## Available Components (53)

### Actions (5)

| Component | Description | Doc |
|-----------|-------------|-----|
| Button | 작업을 수행하는 클릭 가능한 요소 | [Button.md](./components/Button.md) |
| TextButton | 텍스트 기반의 가벼운 액션 버튼 | [TextButton.md](./components/TextButton.md) |
| IconButton | 아이콘만으로 구성된 원형 버튼 | [IconButton.md](./components/IconButton.md) |
| Chip | 입력, 속성, 액션을 나타내는 컴팩트한 인터랙티브 요소 | [Chip.md](./components/Chip.md) |
| ActionArea | 모달/시트 하단의 버튼 그룹 컨테이너 (sticky, gradient 지원) | [ActionArea.md](./components/ActionArea.md) |

### Contents (9)

| Component | Description | Doc |
|-----------|-------------|-----|
| Accordion | 펼침/접힘 가능한 콘텐츠 컨테이너 | [Accordion.md](./components/Accordion.md) |
| Card | 콘텐츠 정보를 간략하게 표현하는 카드 요소 | [Card.md](./components/Card.md) |
| ContentBadge | 콘텐츠의 상태, 카테고리, 라벨을 표시하는 비인터랙티브 요소 | [ContentBadge.md](./components/ContentBadge.md) |
| ListCell | 리스트 아이템을 표시하는 수평 레이아웃 컴포넌트 | [ListCell.md](./components/ListCell.md) |
| ListCard | 리스트 카드 컴포넌트 | [ListCard.md](./components/ListCard.md) |
| PlayBadge | 재생 시간을 표시하는 비디오 뱃지 | [PlayBadge.md](./components/PlayBadge.md) |
| SectionHeader | 섹션 헤더 컴포넌트 | [SectionHeader.md](./components/SectionHeader.md) |
| Table | 테이블 데이터 표시 컴포넌트 | [Table.md](./components/Table.md) |
| Thumbnail | 썸네일 이미지 컴포넌트 | [Thumbnail.md](./components/Thumbnail.md) |

### Feedback (6)

| Component | Description | Doc |
|-----------|-------------|-----|
| Alert | 모달 다이얼로그로 주의할 내용을 안내하는 컴포넌트 | [Alert.md](./components/Alert.md) |
| FallbackView | 빈 상태, 에러 상태, 연결 없음 등의 fallback 화면 표시 | [FallbackView.md](./components/FallbackView.md) |
| PushBadge | 푸시 알림 뱃지 | [PushBadge.md](./components/PushBadge.md) |
| SectionMessage | 인라인 정보 메시지 | [SectionMessage.md](./components/SectionMessage.md) |
| Snackbar | 일시적 알림 메시지 (하단 표시) | [Snackbar.md](./components/Snackbar.md) |
| Toast | 짧은 피드백 메시지 (비차단) | [Toast.md](./components/Toast.md) |

### Loading (3)

| Component | Description | Doc |
|-----------|-------------|-----|
| Loading | 원형 회전 스피너로 진행 중인 작업 표시 | [Loading.md](./components/Loading.md) |
| LoadingDots | 점 애니메이션 로딩 인디케이터 | [LoadingDots.md](./components/LoadingDots.md) |
| Skeleton | 콘텐츠 로딩 중 레이아웃 시프트를 방지하는 플레이스홀더 | [Skeleton.md](./components/Skeleton.md) |

### Navigations (9)

| Component | Description | Doc |
|-----------|-------------|-----|
| BottomNavigation | 하단 고정 네비게이션 바 (3-5개 탭) | [BottomNavigation.md](./components/BottomNavigation.md) |
| TopNavigation | 상단 네비게이션 바 (타이틀 및 액션 버튼) | [TopNavigation.md](./components/TopNavigation.md) |
| Category | 카테고리 네비게이션 | [Category.md](./components/Category.md) |
| Tab | 수평 탭 네비게이션 (애니메이션 인디케이터) | [Tab.md](./components/Tab.md) |
| Pagination | 페이지네이션 컴포넌트 | [Pagination.md](./components/Pagination.md) |
| PaginationDots | 점 형태 페이지 인디케이터 | [PaginationDots.md](./components/PaginationDots.md) |
| PageCounter | 페이지 카운터 (예: 1/10) | [PageCounter.md](./components/PageCounter.md) |
| ProgressIndicator | 진행률 표시 컴포넌트 | [ProgressIndicator.md](./components/ProgressIndicator.md) |
| ProgressTracker | 단계별 진행 추적 컴포넌트 | [ProgressTracker.md](./components/ProgressTracker.md) |

### Presentation (7)

| Component | Description | Doc |
|-----------|-------------|-----|
| Autocomplete | 검색 입력과 필터링된 제안 드롭다운 | [Autocomplete.md](./components/Autocomplete.md) |
| BottomSheet | 하단에서 올라오는 모달 시트 | [BottomSheet.md](./components/BottomSheet.md) |
| Menu | 컨텍스트 액션 메뉴 (드롭다운) | [Menu.md](./components/Menu.md) |
| Popover | 팝오버 컴포넌트 | [Popover.md](./components/Popover.md) |
| Popup | 일반 모달 다이얼로그 | [Popup.md](./components/Popup.md) |
| Tooltip | 툴팁 컴포넌트 | [Tooltip.md](./components/Tooltip.md) |
| Divider | 구분선 컴포넌트 | [Divider.md](./components/Divider.md) |

### Selection & Input (14)

| Component | Description | Doc |
|-----------|-------------|-----|
| CheckMark | 체크마크 아이콘 컴포넌트 | [CheckMark.md](./components/CheckMark.md) |
| Checkbox | 옵션을 선택하거나 해제할 수 있는 체크박스 | [Checkbox.md](./components/Checkbox.md) |
| Radio | 여러 옵션 중 하나만 선택할 수 있는 라디오 버튼 | [Radio.md](./components/Radio.md) |
| DatePicker | 날짜를 선택하는 입력 필드 | [DatePicker.md](./components/DatePicker.md) |
| TimePicker | 시간을 선택하는 입력 필드 | [TimePicker.md](./components/TimePicker.md) |
| FilterButton | 필터 선택 버튼 | [FilterButton.md](./components/FilterButton.md) |
| FramedStyle | 프레임 스타일 컴포넌트 | [FramedStyle.md](./components/FramedStyle.md) |
| SearchField | 검색 입력 필드 | [SearchField.md](./components/SearchField.md) |
| SegmentedControl | 세그먼트 컨트롤 (토글 그룹) | [SegmentedControl.md](./components/SegmentedControl.md) |
| Select | 드롭다운 선택 컴포넌트 | [Select.md](./components/Select.md) |
| Slider | 범위 선택 슬라이더 | [Slider.md](./components/Slider.md) |
| Switch | 온/오프 토글 스위치 | [Switch.md](./components/Switch.md) |
| TextArea | 여러 줄 텍스트 입력 필드 | [TextArea.md](./components/TextArea.md) |
| TextField | 텍스트 입력 필드 | [TextField.md](./components/TextField.md) |

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

### 주요 컴포넌트 문서
- [Button.md](./components/Button.md) - 버튼 상세 규칙 (Actions)
- [Card.md](./components/Card.md) - 카드 레이아웃 (Contents)
- [Alert.md](./components/Alert.md) - 모달 알림 (Feedback)
- [Loading.md](./components/Loading.md) - 로딩 스피너 (Loading)
- [Tab.md](./components/Tab.md) - 탭 네비게이션 (Navigations)
- [Menu.md](./components/Menu.md) - 컨텍스트 메뉴 (Presentation)
- [TextField.md](./components/TextField.md) - 텍스트 입력 (Selection & Input)

### 기타 문서
- [DESIGN_TOKENS.md](./DESIGN_TOKENS.md) - 전체 토큰 목록
