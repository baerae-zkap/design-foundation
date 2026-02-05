# 컴포넌트 개선 계획서

> **목표**: 기존 existing-components를 TDS/Montage 수준으로 개선하여 최고의 디자인 시스템 구축
> **작성일**: 2026-02-05
> **참조**: Toss Design System, Montage Design System

---

## 1. 기존 컴포넌트 현황 (26개)

### 개선 대상 컴포넌트 (14개)

| # | 컴포넌트 | 현재 상태 | TDS 대응 | 우선순위 |
|---|----------|----------|----------|----------|
| 1 | **Badge** | ✅ 완성도 높음 | Badge | 🟡 Medium |
| 2 | **Button** | ✅ 완성도 높음 | Button | 🟡 Medium |
| 3 | **Checkbox** | ✅ 완성도 높음 | Checkbox | 🟡 Medium |
| 4 | **Input** | ✅ 완성도 높음 | TextField | 🟢 Low |
| 5 | **Toast** | ✅ 완성도 높음 | Toast | 🟡 Medium |
| 6 | **Loading** | ✅ 완성도 높음 | Loader | 🟢 Low |
| 7 | **Skeleton** | ✅ 완성도 높음 | Skeleton | 🟢 Low |
| 8 | **Tabs** | ✅ 완성도 높음 | Tab | 🟡 Medium |
| 9 | **Dialog** | ⚠️ 애니메이션 이슈 | Dialog | 🔴 High |
| 10 | **Drawer** | ✅ 완성도 높음 | BottomSheet | 🟢 Low |
| 11 | **ToggleGroup** | ✅ 기본 기능 | Switch | 🔴 High |
| 12 | **Tooltip** | ✅ 완성도 높음 | Tooltip | 🟢 Low |
| 13 | **Header** | ✅ 완성도 높음 | - | 🟢 Low |
| 14 | **Typography** | ✅ 완성도 높음 | - | 🟢 Low |

### 유지 컴포넌트 (개선 불필요, 12개)

| 컴포넌트 | 용도 | 비고 |
|----------|------|------|
| Box | 레이아웃 컨테이너 | 다형성 지원, 완성도 높음 |
| Icon | 아이콘 시스템 | SVG 기반, 스핀 애니메이션 |
| Image | 이미지 표시 | 에셋/URI 지원 |
| Layout | 레이아웃 유틸 | 기반 컴포넌트 |
| Link | 네비게이션 링크 | expo-router 래퍼 |
| Label | 접근성 라벨 | primitives 기반 |
| CheckboxWithLabel | 체크박스+라벨 | 조합 컴포넌트 |
| Keypad | 숫자 키패드 | 보안 기능 포함 |
| Scanner | QR/바코드 스캔 | expo-camera 기반 |
| Lottie | 애니메이션 | lottie 래퍼 |
| Chart | 차트 | 커스텀 바 차트 |
| TempTab | 임시 탭 | 제거 예정 |

---

## 2. 컴포넌트별 상세 개선 계획

### 2.1 Badge 개선

#### 현재 상태
```typescript
// existing-components/Badge
type BadgeProps = {
  layout: LayoutVariant;
  color: ColorVariant;
  size: SizeVariant;
  shape: 'square' | 'dot';
  badgeType: 'filled' | 'outlined';
  align: AlignVariant;
}
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Colors | 미확인 | blue, teal, green, red, yellow, elephant | ✅ 색상 확장 |
| Sizes | 미확인 | tiny, small, medium, large | ✅ 사이즈 표준화 |
| Styles | filled, outlined | fill, weak | ✅ 네이밍 통일 |
| Typography | - | t1-t7, st1-st13 연동 | ❌ 불필요 |

#### 개선 사항
1. **색상 시스템 확장**
   - `brandDefault` → `blue` (primary)
   - `successDefault` → `green`
   - `errorDefault` → `red`
   - `warningDefault` → `yellow`
   - `infoDefault` → `teal`
   - `baseDefault` → `elephant` (neutral)

2. **스타일 네이밍 통일**
   - `filled` → `fill` (선택적)
   - `outlined` → `weak`

3. **사이즈 표준화**
   ```typescript
   type BadgeSize = 'tiny' | 'small' | 'medium' | 'large';
   // tiny: 16px, small: 20px, medium: 24px, large: 28px
   ```

---

### 2.2 Button 개선 (이미 배포됨 - @baerae-zkap/design-system)

#### 현재 상태 (design-system 패키지)
```typescript
type ButtonProps = {
  buttonType: 'filled' | 'outlined';
  color: 'brandDefault' | 'brandSecondary' | 'baseContainer' | 'successDefault' | 'errorDefault';
  size: 'small' | 'medium' | 'large' | 'xLarge';
  layout: 'hug' | 'fillWidth';
  isLoading: boolean;
  leftContent: ReactNode;
  rightContent: ReactNode;
}
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Types | filled, outlined | fill, weak + primary/danger/light/dark | ⚠️ 검토 |
| Sizes | small-xLarge | tiny, medium, large, big | ✅ 매핑 |
| Display | hug, fillWidth | block, full | ✅ 네이밍 |
| Accessory | left/rightContent | leftAccessory | ✅ 이미 지원 |

#### 개선 사항
1. **plain 타입 추가** (텍스트 버튼과 통합 고려)
2. **Pressed 상태** ✅ 이미 구현됨 (어두워지는 방향)
3. **사이즈 매핑**
   ```typescript
   // TDS → 현재
   tiny → small (36px)
   medium → medium (40px)
   large → large (44px)
   big → xLarge (48px)
   ```

---

### 2.3 Checkbox 개선

#### 현재 상태
```typescript
// Compound pattern: Root, Trigger, Indicator
type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled: boolean;
}
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Variants | 단일 | Circle, Line | ✅ 추가 |
| Size | 고정 | number (기본 24) | ✅ 추가 |
| Animation | 없음 | disabled 시 shake | ⚠️ 선택적 |
| State | controlled only | controlled + uncontrolled | ✅ 추가 |

#### 개선 사항
1. **Variant 추가**
   ```typescript
   type CheckboxVariant = 'circle' | 'line';
   // circle: 원형 테두리 + 체크
   // line: 체크 아이콘만
   ```

2. **Size prop 추가**
   ```typescript
   size?: number; // default: 24
   ```

3. **Uncontrolled 지원**
   ```typescript
   defaultChecked?: boolean;
   ```

---

### 2.4 Input (TextField) 개선

#### 현재 상태
```typescript
type InputProps = {
  inputType: InputTypeVariant;
  color: ColorVariant;
  size: SizeVariant;
  disabled: boolean;
  isError: boolean;
  isShowClear: boolean;
  prefixContent: ReactNode;
  suffixContent: ReactNode;
  align: 'left' | 'center' | 'right';
  autoFocus: boolean;
}
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Variants | inputType | box, line, big, hero | ✅ 검토 |
| Label | 없음 | label + labelOption | ✅ 추가 |
| Help text | 없음 | help | ✅ 추가 |
| Formatters | 없음 | format.amount, format.phone | ⚠️ 선택적 |
| Clear | isShowClear | Clearable extension | ✅ 유사 |
| Button mode | 없음 | Button extension | ⚠️ 선택적 |

#### 개선 사항
1. **Label 시스템 추가**
   ```typescript
   label?: string;
   labelOption?: 'appear' | 'sustain';
   ```

2. **Help text 추가**
   ```typescript
   help?: string;
   hasError?: boolean; // isError → hasError 네이밍
   ```

3. **Variant 표준화**
   ```typescript
   type InputVariant = 'box' | 'line' | 'big' | 'hero';
   ```

---

### 2.5 Toast 개선

#### 현재 상태
```typescript
// react-native-toast-message 기반
type ToastProps = {
  title: string;
  description: string;
  leftContent: ReactNode;
  rightContent: ReactNode;
  backgroundColor: ColorVariant;
}
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Position | 미확인 | top, bottom | ✅ 확인 필요 |
| Duration | 미확인 | number (기본 3초) | ✅ 확인 필요 |
| Icon | leftContent | Toast.Icon, Toast.LottieIcon | ✅ 전용 컴포넌트 |
| Action | rightContent | button (bottom only) | ✅ 유사 |
| Animation | 미확인 | onEntered, onExited | ✅ 추가 |

#### 개선 사항
1. **Position prop 명시**
   ```typescript
   position?: 'top' | 'bottom';
   ```

2. **Duration prop 추가**
   ```typescript
   duration?: number; // seconds, default: 3
   ```

3. **Animation callbacks**
   ```typescript
   onEntered?: () => void;
   onExited?: () => void;
   ```

4. **Icon 전용 컴포넌트**
   ```typescript
   Toast.Icon // 일반 아이콘
   Toast.LottieIcon // 애니메이션 아이콘
   ```

---

### 2.6 Dialog 개선 🔴 HIGH PRIORITY

#### 현재 상태
```typescript
// @rn-primitives/dialog 기반
// ⚠️ Exiting animation disabled (RN Navigation crash issue)
type DialogProps = {
  isHideOverlay: boolean;
  size: 'medium' | 'large';
}
// Compound: Root, Trigger, Portal, Close, Overlay, Content, Header, Body, Footer, Title, Description
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Variants | 단일 (compound) | AlertDialog, ConfirmDialog | ✅ 추가 |
| Buttons | 자유 구성 | single vs dual 구분 | ✅ 간편화 |
| Animation | ⚠️ 비활성화 | onEntered, onExited | 🔴 수정 필요 |
| Overlay dismiss | isHideOverlay | closeOnDimmerClick | ✅ 네이밍 |

#### 개선 사항
1. **AlertDialog 추가** (단일 버튼)
   ```typescript
   <AlertDialog
     open={open}
     title="제목"
     description="설명"
     buttonText="확인"
     onButtonPress={() => {}}
     onClose={() => {}}
   />
   ```

2. **ConfirmDialog 추가** (듀얼 버튼)
   ```typescript
   <ConfirmDialog
     open={open}
     title="제목"
     description="설명"
     leftButton={<Button>취소</Button>}
     rightButton={<Button>확인</Button>}
     onClose={() => {}}
   />
   ```

3. **애니메이션 수정**
   - Exiting animation 버그 해결 필요
   - 또는 대체 구현 검토

---

### 2.7 Switch (ToggleGroup 개선) 🔴 HIGH PRIORITY

#### 현재 상태
```typescript
// @rn-primitives/toggle-group 기반
// ToggleGroup은 Switch와 다른 용도
type ToggleGroupProps = {
  size: 'small';
  layout: LayoutVariant;
}
// Compound: Root, Item
```

#### TDS 비교
**Switch는 별도 컴포넌트로 신규 생성 필요**

| 속성 | ToggleGroup | TDS Switch | 조치 |
|------|-------------|------------|------|
| 용도 | 다중 선택 토글 | on/off 스위치 | 🔴 분리 |
| Dimensions | 가변 | 50x30 고정 | - |
| Animation | 없음 | 트랜지션 | - |

#### 개선 사항
1. **Switch 컴포넌트 신규 생성**
   ```typescript
   type SwitchProps = {
     checked?: boolean;
     defaultChecked?: boolean;
     onCheckedChange?: (checked: boolean) => void;
     disabled?: boolean;
   }

   // 고정 크기: 50x30px
   // 애니메이션: indicator 좌우 이동 + 색상 전환
   ```

2. **ToggleGroup 유지** (다른 용도)

---

### 2.8 Tabs 개선

#### 현재 상태
```typescript
// react-native-tab-view 기반
type TabsProps = {
  defaultValue: string;
}
// Compound: Root, List, Trigger, Content
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Fluid | 미확인 | fluid (가변 너비 + 스크롤) | ✅ 추가 |
| Size | 없음 | large, small | ✅ 추가 |
| Badge | 없음 | redBean (알림 표시) | ✅ 추가 |
| State | defaultValue | value + onChange 추가 | ✅ controlled |

#### 개선 사항
1. **Size prop 추가**
   ```typescript
   size?: 'large' | 'small';
   ```

2. **Fluid mode 추가**
   ```typescript
   fluid?: boolean; // 가변 너비 + 수평 스크롤
   ```

3. **Badge (redBean) 추가**
   ```typescript
   // Tab.Trigger에 추가
   redBean?: boolean; // 빨간 점 알림 표시
   ```

4. **Controlled state 추가**
   ```typescript
   value?: string;
   onChange?: (value: string) => void;
   ```

---

### 2.9 Loader (Loading) 개선

#### 현재 상태
```typescript
type LoadingProps = {
  size: number; // default: 6
  delay: number[]; // default: [0, 150, 300]
  color: ColorVariant;
}
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Type | dots | spinner | ⚠️ 다른 스타일 |
| Size | number | small, medium, large | ✅ 표준화 |
| Delay | 애니메이션 지연 | 표시 지연 (flicker 방지) | ⚠️ 다른 용도 |
| Label | 없음 | label | ✅ 추가 |
| Variants | 없음 | FullScreen, Centered | ✅ 추가 |

#### 개선 사항
1. **Size 표준화**
   ```typescript
   type LoaderSize = 'small' | 'medium' | 'large';
   ```

2. **Label 추가**
   ```typescript
   label?: string;
   ```

3. **Layout variants**
   ```typescript
   Loading.FullScreen // 전체 화면 중앙
   Loading.Centered   // 패딩 있는 중앙
   ```

4. **Display delay**
   ```typescript
   displayDelay?: number; // ms, flicker 방지
   ```

---

### 2.10 Skeleton 개선

#### 현재 상태
```typescript
type SkeletonProps = {
  width: number;
  height: number;
  delay: number;
  shape: 'rectangle' | 'circle';
  isHideAnimated: boolean;
}
```

#### TDS 비교
| 속성 | 현재 | TDS | 개선 필요 |
|------|------|-----|----------|
| Dimensions | width, height | width, height | ✅ 동일 |
| Shape | shape variant | borderRadius | ⚠️ 방식 다름 |
| Animation | shimmer | shimmer | ✅ 동일 |

#### 개선 사항
1. **borderRadius 직접 지원** (더 유연)
   ```typescript
   borderRadius?: number | string; // '50%' 지원
   ```

2. **shape는 유지** (편의성)

---

## 3. 신규 컴포넌트 필요 목록

### 우선순위 High (기존 컴포넌트 개선 후)

| # | 컴포넌트 | TDS 대응 | 설명 |
|---|----------|----------|------|
| 1 | **Switch** | Switch | on/off 토글 (신규) |
| 2 | **AlertDialog** | AlertDialog | 단일 버튼 다이얼로그 |
| 3 | **ConfirmDialog** | ConfirmDialog | 듀얼 버튼 다이얼로그 |

### 우선순위 Medium (Phase 2)

| # | 컴포넌트 | TDS 대응 | 설명 |
|---|----------|----------|------|
| 1 | **Chip** | - | 태그, 필터 선택 |
| 2 | **Avatar** | - | 사용자 프로필 |
| 3 | **Card** | - | 콘텐츠 카드 |
| 4 | **Radio** | - | 라디오 버튼 |
| 5 | **Select** | - | 드롭다운 선택 |

---

## 4. Foundation 토큰 필요 사항

### 추가 필요 토큰

#### Colors (Semantic)
```json
{
  "badge": {
    "blue": { "fill": "#2563eb", "weak": "#dbeafe" },
    "teal": { "fill": "#14b8a6", "weak": "#ccfbf1" },
    "green": { "fill": "#22c55e", "weak": "#dcfce7" },
    "red": { "fill": "#ef4444", "weak": "#fee2e2" },
    "yellow": { "fill": "#eab308", "weak": "#fef9c3" },
    "elephant": { "fill": "#64748b", "weak": "#f1f5f9" }
  }
}
```

#### Switch 토큰
```json
{
  "switch": {
    "width": 50,
    "height": 30,
    "borderRadius": 15,
    "indicator": {
      "size": 26,
      "margin": 2
    },
    "colors": {
      "active": "#2563eb",
      "inactive": "#cbd5e1"
    }
  }
}
```

---

## 5. 작업 순서 (권장)

### Phase 1: 고우선순위 개선 (1-2주)
1. ✅ Switch 컴포넌트 신규 생성
2. ✅ Dialog → AlertDialog, ConfirmDialog 분리
3. ✅ Checkbox variant 추가 (circle, line)

### Phase 2: 중우선순위 개선 (2-3주)
4. Badge 색상/사이즈 표준화
5. Toast position, duration, callbacks 추가
6. Tabs fluid, size, badge 추가
7. Input label, help 시스템 추가

### Phase 3: 저우선순위 개선 (3-4주)
8. Loading variants, label 추가
9. Skeleton borderRadius 지원

### Phase 4: 신규 컴포넌트 (4주+)
10. Chip
11. Avatar
12. Card
13. Radio
14. Select

---

## 6. 체크리스트

### 개선 전 확인사항
- [ ] Foundation 토큰 정의 완료
- [ ] TDS 문서 상세 검토 완료
- [ ] existing-components 코드 분석 완료
- [ ] 네이밍 컨벤션 확정

### 각 컴포넌트별
- [ ] Props 인터페이스 설계
- [ ] Web 버전 구현
- [ ] Native 버전 구현
- [ ] Storybook 스토리 작성
- [ ] AI 문서 작성
- [ ] 문서 사이트 Demo 작성
- [ ] 빌드 & 배포
- [ ] zkap-rn-mvp 통합 테스트

---

## 7. 참고 자료

- [TDS Mobile Components](https://tossmini-docs.toss.im/tds-mobile/components/)
- [TDS React Native](https://tossmini-docs.toss.im/tds-react-native/)
- [Montage Design System](https://montage.wanted.co.kr/docs/components)
- [existing-components](/Users/jaden/design-foundation/existing-components/)
- [Foundation Tokens](/Users/jaden/design-foundation/public/*-tokens.json)
