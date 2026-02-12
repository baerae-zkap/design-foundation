# AI 코딩 도구와 함께 디자인 시스템 사용하기

> 이 가이드는 AI 코딩 도구(Claude Code, Cursor, Windsurf, Copilot 등)에서 `@baerae-zkap/design-system`을 효과적으로 활용하는 방법을 안내합니다.

---

## 목차

1. [개요](#개요)
2. [AI 설정 파일 구성](#ai-설정-파일-구성)
3. [프롬프트 가이드](#프롬프트-가이드)
4. [AI 참조 문서 구조](#ai-참조-문서-구조)
5. [실전 활용 예시](#실전-활용-예시)

---

## 개요

이 디자인 시스템은 AI 바이브코딩에 최적화된 문서 구조를 갖추고 있습니다:

- **`docs/COMPONENTS.md`**: 53개 컴포넌트 카탈로그 (AI가 참조하는 메인 문서)
- **타입 정의 (`dist/*.d.ts`)**: AI가 자동완성과 타입 체크에 활용
- **Storybook**: https://design-foundation.vercel.app (시각적 참고)

AI 도구에 디자인 시스템 컨텍스트를 제공하면, AI가 올바른 컴포넌트를 선택하고 정확한 Props를 사용하여 코드를 생성합니다.

---

## AI 설정 파일 구성

### Claude Code (CLAUDE.md)

프로젝트 루트에 `CLAUDE.md` 파일을 생성하고 아래 내용을 추가하세요:

```markdown
## 디자인 시스템

이 프로젝트는 `@baerae-zkap/design-system` 패키지를 사용합니다.

### 참조 문서
- 컴포넌트 카탈로그: `node_modules/@baerae-zkap/design-system/docs/COMPONENTS.md`
- Storybook: https://design-foundation.vercel.app

### Import 규칙
- React Native: `import { ComponentName } from '@baerae-zkap/design-system/native'`
- 이벤트 핸들러: `onPress` (React Native), `onClick` (Web)

### 컴포넌트 사용 규칙
- Button 그룹은 반드시 `ActionArea`로 감싸기
- 취소 버튼: `<Button variant="solid" color="assistive">`
- 확인 버튼: `<Button variant="solid" color="primary">`
- 위험 액션: `<Button variant="solid" color="danger">`
- 하드코딩 스타일 값 금지, Foundation 토큰 사용

### 주요 컴포넌트 Props 요약

#### Button
- `variant`: 'solid' | 'outlined' | 'weak' (기본: 'solid')
- `color`: 'primary' | 'secondary' | 'assistive' | 'success' | 'danger' (기본: 'primary')
- `size`: 'small' | 'medium' | 'large' | 'xlarge' (기본: 'medium')
- `display`: 'inline' | 'block' | 'full' (기본: 'inline')
- `loading`, `disabled`, `leadingIcon`, `trailingIcon`

#### ActionArea
- `variant`: 'strong' | 'neutral' | 'compact' (기본: 'strong')
- `position`: 'static' | 'absolute' | 'fixed' (기본: 'static')
- 항상 Button/TextButton을 children으로 사용

#### BottomSheet
- `visible` (필수), `onClose` (필수), `title`, `children`
- 하단 버튼은 `actionArea` prop으로 ActionArea 전달

#### TextField
- `value` (필수), `onChangeText` (필수), `label`, `placeholder`
- `error`, `errorMessage` — 에러 상태 표시

#### ListCell
- `title` (필수), `subtitle`, `leading`, `trailing`, `divider`
- 설정 화면의 기본 레이아웃 컴포넌트

### 자주 사용하는 패턴

```tsx
// 확인/취소 버튼
<ActionArea variant="strong">
  <Button variant="solid" color="assistive" onPress={onCancel}>취소</Button>
  <Button variant="solid" color="primary" onPress={onConfirm}>확인</Button>
</ActionArea>

// 설정 리스트
<ListCell title="알림" trailing={<Switch value={v} onValueChange={setV} />} divider />

// 바텀시트
<BottomSheet visible={show} onClose={close} title="제목">
  {/* 콘텐츠 */}
</BottomSheet>
```
```

### Cursor (.cursorrules)

프로젝트 루트에 `.cursorrules` 파일을 생성하세요:

```
이 프로젝트는 @baerae-zkap/design-system React Native 컴포넌트 라이브러리를 사용합니다.

## 필수 참조 문서
- node_modules/@baerae-zkap/design-system/docs/COMPONENTS.md

## Import
- import { ComponentName } from '@baerae-zkap/design-system/native'
- 아이콘: import { IconName } from 'lucide-react-native'

## 핵심 규칙
1. Button 그룹은 ActionArea로 감싸기
2. 취소: Button color="assistive", 확인: Button color="primary"
3. 이벤트: onPress (React Native)
4. 하드코딩 스타일 금지, Foundation 토큰 사용
5. 모달/시트 하단 버튼은 ActionArea + position="fixed" 사용

## 주요 컴포넌트
- Button: variant(solid/outlined/weak) + color(primary/secondary/assistive/success/danger)
- TextButton: variant(clear/underline/arrow) + color(primary/secondary/danger)
- IconButton: variant(ghost/solid/outlined) — children으로 아이콘 전달
- ActionArea: variant(strong/neutral/compact) — Button 그룹 컨테이너
- BottomSheet: visible + onClose + title + children
- Popup: visible + onClose + title + description
- Alert: visible + onClose + body + primaryAction
- ListCell: title + subtitle + leading + trailing
- TextField: value + onChangeText + label + error + errorMessage
- Checkbox: checked + onPress + label
- Radio: selected + onPress + label
- Switch: value + onValueChange + label
- Toast: message + status(default/success/warning/error)
```

### Windsurf (.windsurfrules)

Cursor와 동일한 형식으로 `.windsurfrules` 파일을 생성하세요. 내용은 `.cursorrules`와 동일합니다.

### Copilot (.github/copilot-instructions.md)

GitHub Copilot을 사용한다면 `.github/copilot-instructions.md`에 동일한 내용을 추가하세요.

---

## 프롬프트 가이드

### 기본 프롬프트 템플릿

AI에게 작업을 요청할 때 아래 템플릿을 활용하세요.

#### 새 화면 만들기

```
@baerae-zkap/design-system의 컴포넌트를 사용해서 [화면 이름] 화면을 만들어줘.

요구사항:
- [기능 1]
- [기능 2]
- [기능 3]

참고: docs/COMPONENTS.md를 읽고 적절한 컴포넌트를 선택해줘.
```

#### 기존 화면에 컴포넌트 추가

```
이 화면에 @baerae-zkap/design-system의 [컴포넌트명]을 추가해줘.
import는 '@baerae-zkap/design-system/native'에서 해줘.
```

#### 컴포넌트 교체

```
이 화면의 [기존 요소]를 @baerae-zkap/design-system의 [컴포넌트명]으로 교체해줘.
docs/COMPONENTS.md를 참고해서 올바른 Props를 사용해줘.
```

### 화면별 프롬프트 예시

#### 로그인 화면

```
@baerae-zkap/design-system/native의 컴포넌트로 로그인 화면을 만들어줘.

필요한 컴포넌트:
- TopNavigation: 상단 헤더 (variant="normal", title="로그인")
- TextField: 이메일/비밀번호 입력 (label, placeholder, error 상태)
- Button: 로그인 버튼 (variant="solid", color="primary", display="full")
- TextButton: 비밀번호 찾기 (variant="underline")
- ActionArea: 하단 버튼 영역 (position="fixed")
```

#### 상품 목록 화면

```
@baerae-zkap/design-system/native로 상품 목록 화면을 구현해줘.

구성:
- TopNavigation: title="상품", toolbar에 검색/장바구니 IconButton
- Tab: 카테고리 탭 (mode="scroll")
- SectionHeader: 섹션 제목 + "더보기" TextButton
- ListCard: 상품 카드 (thumbnail, title, subtitle, meta에 가격)
- ContentBadge: 상태 뱃지 (NEW, SALE 등)

FlatList로 스크롤 구현하고, 빈 상태는 FallbackView 사용.
```

#### 설정 화면

```
@baerae-zkap/design-system/native로 설정 화면을 만들어줘.

구성:
- TopNavigation: title="설정", onBackPress
- SectionHeader: 각 섹션 구분
- ListCell: 설정 항목들
  - trailing에 Switch (토글 설정)
  - trailing에 TextButton variant="arrow" (이동 설정)
  - trailing에 Text (값 표시)
- divider로 항목 구분
- Alert: 로그아웃 확인 다이얼로그
```

#### 주문 완료 화면

```
@baerae-zkap/design-system/native로 주문 완료 화면을 만들어줘.

구성:
- Card: 주문 정보 카드 (variant="outlined")
- ContentBadge: 주문 상태 (color="successDefault")
- Table: 주문 상세 (상품명, 수량, 가격)
- ActionArea: 하단 버튼
  - Button: "주문 내역" (color="assistive")
  - Button: "홈으로" (color="primary")
- Toast: "주문이 완료되었습니다" (status="success")
```

#### 필터 바텀시트

```
@baerae-zkap/design-system/native로 필터 바텀시트를 구현해줘.

구성:
- BottomSheet: visible/onClose
- SectionHeader: 필터 카테고리별 제목
- Chip: 필터 옵션 (selected 상태 관리)
- Radio: 단일 선택 옵션
- Checkbox: 다중 선택 옵션
- ActionArea: "초기화" (color="assistive") + "적용" (color="primary")
```

### 컴포넌트 조합 프롬프트

#### 모달 패턴

```
Alert, Popup, BottomSheet 중 상황에 맞는 걸 선택해줘:
- 간단한 확인/취소: Alert
- 내용이 있는 안내: Popup
- 스크롤이 필요한 콘텐츠: BottomSheet
```

#### 피드백 패턴

```
사용자 피드백에 맞는 컴포넌트를 선택해줘:
- 짧은 성공/실패 알림: Toast (자동 사라짐)
- 실행 취소가 필요한 알림: Snackbar (action 포함)
- 즉시 주의가 필요한 알림: Alert (모달)
- 섹션 레벨 안내: SectionMessage (인라인)
```

#### 네비게이션 패턴

```
네비게이션에 맞는 컴포넌트:
- 앱 전체 탭: BottomNavigation (3-5개)
- 화면 내 탭: Tab (mode="scroll" 또는 "fluid")
- 페이지 상단: TopNavigation (variant에 따라 back/close/search)
- 카테고리: Category
```

---

## AI 참조 문서 구조

### 패키지 내 문서

```
node_modules/@baerae-zkap/design-system/
├── docs/
│   └── COMPONENTS.md    ← AI가 읽는 메인 문서 (53개 컴포넌트 카탈로그)
│       ├── Available Components (53) - 카테고리별 목록
│       ├── Design Tokens - Spacing, Button Heights, Colors
│       └── Global Rules - 이벤트, 접근성, 레이아웃, 버튼 조합 규칙
│
├── dist/
│   ├── index.d.ts          ← Web 타입 정의
│   └── native/
│       └── index.d.ts      ← React Native 타입 정의 (AI 자동완성 활용)
│
└── package.json            ← exports 필드로 import 경로 확인
```

### COMPONENTS.md 활용법

AI에게 이 파일을 읽도록 지시하면 됩니다:

```
docs/COMPONENTS.md를 읽고 이 화면에 필요한 컴포넌트를 추천해줘.
```

```
node_modules/@baerae-zkap/design-system/docs/COMPONENTS.md를 참조해서
올바른 Props와 사용 패턴으로 코드를 작성해줘.
```

이 문서에는 다음이 포함되어 있습니다:
- 53개 컴포넌트 이름과 설명
- Design Token 참조 (Spacing, Colors, Button Heights)
- Global Rules (이벤트 핸들러, 접근성, 레이아웃, 버튼 조합)

### 타입 정의 활용

AI 도구는 `dist/native/index.d.ts`의 타입 정의를 자동으로 참조합니다.
별도 설정 없이도 자동완성과 Props 검증이 작동합니다.

---

## 실전 활용 예시

### 예시 1: Claude Code로 화면 만들기

```bash
# Claude Code에서
> @baerae-zkap/design-system/native의 컴포넌트를 사용해서
> 프로필 편집 화면을 만들어줘.
>
> - TopNavigation에 "프로필 수정" 타이틀과 뒤로가기
> - Thumbnail로 프로필 사진 (원형, onPress로 사진 변경)
> - TextField로 이름, 한 줄 소개 입력
> - Select로 직군 선택
> - ActionArea에 저장 버튼
>
> docs/COMPONENTS.md를 읽고 올바른 Props를 사용해줘.
```

### 예시 2: Cursor에서 컴포넌트 교체

```
// Cmd+K로 인라인 편집
이 View를 @baerae-zkap/design-system/native의 Card variant="outlined"로 교체해줘.
안의 텍스트는 heading과 caption props로 이동해줘.
```

### 예시 3: 디자인 시스템 기반 화면 리뷰

```
이 화면의 코드를 리뷰해줘.
@baerae-zkap/design-system 컴포넌트로 교체할 수 있는 부분을 찾아줘.
docs/COMPONENTS.md를 참고해서 적절한 컴포넌트를 추천해줘.
```

### 예시 4: 디자인 토큰 적용

```
이 화면의 하드코딩된 스타일 값을 @baerae-zkap/design-system의
Foundation 토큰으로 교체해줘.

참고:
- padding 16 → spacing.inset.sm
- borderRadius 12 → radius.card.sm
- gap 8 → spacing.horizontal.2xs
```

---

## 팁

1. **문서 먼저 읽히기**: AI에게 작업을 요청하기 전에 `docs/COMPONENTS.md를 읽어줘`라고 먼저 요청하면 더 정확한 결과를 얻을 수 있습니다.

2. **컴포넌트 이름 명시**: "버튼" 대신 "Button"처럼 정확한 컴포넌트 이름을 사용하세요.

3. **Props 명시**: 핵심 Props를 프롬프트에 포함하면 AI가 더 정확한 코드를 생성합니다.

4. **패턴 활용**: "설정 화면 패턴", "필터 바텀시트 패턴"처럼 패턴을 언급하면 AI가 컴포넌트 조합을 더 잘 이해합니다.

5. **Storybook 참조**: 시각적으로 확인이 필요할 때는 https://design-foundation.vercel.app 을 참고하세요.

---

> 이 가이드에 대한 피드백이나 추가 요청이 있다면 디자인 시스템 팀에 문의해주세요.
