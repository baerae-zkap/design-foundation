# @baerae-zkap/design-system 개발자 가이드

## 소개

배래 디자인 시스템은 사내 서비스에서 사용하는 React Native 컴포넌트 라이브러리입니다.
53개의 컴포넌트와 Foundation 디자인 토큰을 제공합니다.

- **Storybook**: https://design-foundation.vercel.app
- **패키지**: `@baerae-zkap/design-system@0.1.13`
- **레지스트리**: Google Artifact Registry

---

## 시작하기

### 1. 레지스트리 설정

프로젝트 루트에 `.npmrc` 파일을 생성합니다:

```
@baerae-zkap:registry=https://asia-northeast3-npm.pkg.dev/zkap-dev/zkap-npm-packages/
//asia-northeast3-npm.pkg.dev/zkap-dev/zkap-npm-packages/:always-auth=true
```

Google Artifact Registry 인증:
```bash
npx google-artifactregistry-auth
```

### 2. 패키지 설치

```bash
pnpm add @baerae-zkap/design-system
```

### 3. Peer Dependencies

```bash
pnpm add react-native-svg react-native-reanimated react-native-safe-area-context lucide-react-native
```

(Optional: `@react-native-community/datetimepicker` - DatePicker/TimePicker 사용 시)

### 4. Import

```tsx
// React Native 컴포넌트
import { Button, TextButton, Card } from '@baerae-zkap/design-system/native';

// 디자인 토큰
import { colors, typography, spacing, radius } from '@baerae-zkap/design-system/native';
```

### 5. 기본 사용 예제

```tsx
import { Button, ActionArea } from '@baerae-zkap/design-system/native';

export function ConfirmScreen() {
  return (
    <ActionArea variant="strong">
      <Button variant="solid" color="assistive" onPress={() => {}}>
        취소
      </Button>
      <Button variant="solid" color="primary" onPress={() => {}}>
        확인
      </Button>
    </ActionArea>
  );
}
```

---

## 컴포넌트 카탈로그

> 각 컴포넌트의 전체 Props와 인터랙티브 예제는 [Storybook](https://design-foundation.vercel.app)에서 확인하세요.

### Actions (액션 컴포넌트)

#### Button
> 다양한 스타일과 크기를 지원하는 기본 액션 버튼

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'solid' \| 'outlined' \| 'weak'` | `'solid'` | 버튼 스타일 |
| `color` | `'primary' \| 'secondary' \| 'assistive' \| 'success' \| 'danger'` | `'primary'` | 버튼 색상 |
| `size` | `'small' \| 'medium' \| 'large' \| 'xlarge'` | `'medium'` | 버튼 크기 |
| `display` | `'inline' \| 'block' \| 'full'` | `'inline'` | 레이아웃 |
| `loading` | `boolean` | `false` | 로딩 상태 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `leadingIcon` | `ReactNode` | - | 왼쪽 아이콘 |
| `trailingIcon` | `ReactNode` | - | 오른쪽 아이콘 |

**사용 예시:**

```tsx
import { Button } from '@baerae-zkap/design-system/native';

// 기본 버튼
<Button variant="solid" color="primary" onPress={() => {}}>
  확인
</Button>

// 아이콘 포함 버튼
<Button
  variant="outlined"
  color="secondary"
  leadingIcon={<PlusIcon size={20} />}
  onPress={() => {}}
>
  항목 추가
</Button>

// 로딩 상태
<Button loading onPress={() => {}}>
  처리 중...
</Button>
```

#### TextButton
> 텍스트 기반 경량 액션 버튼

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'clear' \| 'underline' \| 'arrow'` | `'clear'` | 스타일 |
| `color` | `'primary' \| 'secondary' \| 'danger'` | `'primary'` | 색상 |
| `size` | `'xsmall' \| 'small' \| 'medium' \| 'large' \| 'xlarge' \| 'xxlarge'` | `'medium'` | 크기 |
| `loading` | `boolean` | `false` | 로딩 상태 |

**사용 예시:**

```tsx
import { TextButton } from '@baerae-zkap/design-system/native';

// 화살표 스타일
<TextButton variant="arrow" color="primary" onPress={() => {}}>
  더보기
</TextButton>

// 밑줄 스타일
<TextButton variant="underline" color="secondary" onPress={() => {}}>
  자세히 보기
</TextButton>
```

#### IconButton
> 아이콘 전용 원형 버튼

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'ghost' \| 'solid' \| 'outlined'` | `'ghost'` | 스타일 |
| `color` | `'primary' \| 'secondary' \| 'danger'` | `'secondary'` | 색상 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |

**사용 예시:**

```tsx
import { IconButton } from '@baerae-zkap/design-system/native';
import { Heart, Share2, MoreVertical } from 'lucide-react-native';

// 고스트 스타일 (투명 배경)
<IconButton variant="ghost" onPress={() => {}}>
  <Heart size={20} />
</IconButton>

// 솔리드 스타일 (배경 있음)
<IconButton variant="solid" color="primary" onPress={() => {}}>
  <Share2 size={20} />
</IconButton>
```

#### Chip
> 선택, 필터링에 사용하는 컴팩트한 요소

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'solid' \| 'outlined'` | `'solid'` | 스타일 |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'danger'` | `'secondary'` | 색상 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `selected` | `boolean` | `false` | 선택 상태 |
| `onClose` | `() => void` | - | 닫기 버튼 핸들러 |

**사용 예시:**

```tsx
import { Chip } from '@baerae-zkap/design-system/native';

// 필터 칩
<Chip variant="solid" selected={true} onPress={() => {}}>
  신상품
</Chip>

// 닫기 버튼 포함
<Chip
  variant="outlined"
  onClose={() => handleRemove()}
>
  React Native
</Chip>
```

#### ActionArea
> 버튼 그룹 컨테이너 (모달, 바텀시트 하단 등)

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'strong' \| 'neutral' \| 'compact'` | `'strong'` | 스타일 |
| `position` | `'static' \| 'absolute' \| 'fixed'` | `'static'` | 위치 |
| `showGradient` | `boolean` | `true` | 상단 그라데이션 |
| `useSafeArea` | `boolean` | `true` | Safe Area 패딩 |
| `caption` | `string` | - | 버튼 위 설명 텍스트 |

**사용 예시:**

```tsx
import { ActionArea, Button } from '@baerae-zkap/design-system/native';

// 모달/바텀시트 하단 버튼
<ActionArea variant="strong" position="fixed">
  <Button variant="solid" color="assistive" onPress={() => {}}>
    취소
  </Button>
  <Button variant="solid" color="primary" onPress={() => {}}>
    확인
  </Button>
</ActionArea>

// 설명 포함
<ActionArea caption="확인 시 변경사항이 저장됩니다">
  <Button variant="solid" color="primary" display="full" onPress={() => {}}>
    저장
  </Button>
</ActionArea>
```

---

### Contents (콘텐츠 컴포넌트)

#### Accordion
> 펼치기/접기 가능한 콘텐츠 컨테이너

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `title` | `ReactNode` | (필수) | 제목 |
| `expanded` | `boolean` | - | 제어 모드 |
| `defaultExpanded` | `boolean` | `false` | 비제어 모드 초기값 |
| `disabled` | `boolean` | `false` | 비활성화 |

**사용 예시:**

```tsx
import { Accordion } from '@baerae-zkap/design-system/native';

// 비제어 모드
<Accordion title="자주 묻는 질문" defaultExpanded={false}>
  <Text>답변 내용이 여기에 표시됩니다.</Text>
</Accordion>

// 제어 모드
<Accordion
  title="고급 설정"
  expanded={isExpanded}
  onToggle={setIsExpanded}
>
  <Text>고급 설정 옵션</Text>
</Accordion>
```

#### Card
> 콘텐츠를 담는 카드 컨테이너

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'filled'` | 스타일 |
| `padding` | `'none' \| 'small' \| 'medium' \| 'large'` | `'medium'` | 내부 패딩 |
| `thumbnail` | `ImageSourcePropType` | - | 상단 이미지 |
| `heading` | `string` | - | 제목 |
| `caption` | `string` | - | 설명 |

**사용 예시:**

```tsx
import { Card } from '@baerae-zkap/design-system/native';

// 간단한 래퍼
<Card variant="outlined" padding="medium">
  <Text>카드 내용</Text>
</Card>

// 콘텐츠 카드
<Card
  thumbnail={require('./product.jpg')}
  heading="상품명"
  caption="상품 설명 텍스트"
  onPress={() => navigation.navigate('Detail')}
/>
```

#### ContentBadge
> 상태, 카테고리 라벨 표시용 뱃지

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'filled' \| 'weak'` | `'filled'` | 스타일 |
| `color` | `'primary' \| 'neutral' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'neutral'` | 색상 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `leftIcon` | `ReactNode` | - | 좌측 아이콘 |

**사용 예시:**

```tsx
import { ContentBadge } from '@baerae-zkap/design-system/native';

// 상태 표시
<ContentBadge variant="filled" color="success">
  완료
</ContentBadge>

// 보조 정보
<ContentBadge variant="weak" color="error">
  품절
</ContentBadge>

// 카테고리
<ContentBadge variant="weak" color="neutral" size="small">
  공지사항
</ContentBadge>
```

#### ListCard
> 썸네일이 있는 수평 리스트 카드

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `title` | `ReactNode` | (필수) | 제목 |
| `subtitle` | `ReactNode` | - | 부제목 |
| `thumbnail` | `ReactNode` | - | 왼쪽 이미지 |
| `meta` | `ReactNode` | - | 메타 정보 (가격 등) |
| `action` | `ReactNode` | - | 오른쪽 액션 |

**사용 예시:**

```tsx
import { ListCard, Thumbnail } from '@baerae-zkap/design-system/native';

<ListCard
  thumbnail={<Thumbnail src={require('./product.jpg')} size={80} />}
  title="상품명"
  subtitle="상품 설명"
  meta={<Text style={{ fontWeight: 'bold' }}>₩29,000</Text>}
  action={<TextButton variant="arrow" onPress={() => {}}>보기</TextButton>}
  onPress={() => navigation.navigate('ProductDetail')}
/>
```

#### ListCell
> 리스트 아이템 레이아웃

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `title` | `ReactNode` | (필수) | 제목 |
| `subtitle` | `ReactNode` | - | 부제목 |
| `leading` | `ReactNode` | - | 왼쪽 영역 |
| `trailing` | `ReactNode` | - | 오른쪽 영역 |
| `divider` | `boolean` | `false` | 하단 구분선 |

**사용 예시:**

```tsx
import { ListCell, Switch } from '@baerae-zkap/design-system/native';
import { Bell } from 'lucide-react-native';

<ListCell
  leading={<Bell size={24} />}
  title="알림 설정"
  subtitle="푸시 알림을 받습니다"
  trailing={<Switch value={enabled} onValueChange={setEnabled} />}
  divider
/>
```

#### PlayBadge
> 영상 콘텐츠 재생 아이콘 뱃지

**주요 Props:**

| Props | 타입 | 기본값 |
|-------|------|--------|
| `variant` | `'normal' \| 'alternative'` | `'normal'` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |

**사용 예시:**

```tsx
import { PlayBadge } from '@baerae-zkap/design-system/native';

<View style={{ position: 'relative' }}>
  <Thumbnail src={require('./video-thumb.jpg')} aspectRatio="16:9" />
  <PlayBadge variant="normal" size="medium" onPress={() => playVideo()} />
</View>
```

#### SectionHeader
> 리스트 섹션 제목

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `title` | `string` | (필수) | 섹션 제목 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `description` | `string` | - | 설명 |
| `action` | `ReactNode` | - | 오른쪽 액션 |
| `showArrow` | `boolean` | `false` | 화살표 표시 |

**사용 예시:**

```tsx
import { SectionHeader, TextButton } from '@baerae-zkap/design-system/native';

<SectionHeader
  title="추천 상품"
  description="회원님을 위한 맞춤 추천"
  action={
    <TextButton variant="arrow" onPress={() => {}}>
      더보기
    </TextButton>
  }
/>
```

#### Table / TableHead / TableBody / TableRow / TableCell / TableHeadCell
> 데이터 테이블 컴포넌트 세트

**주요 Props (Table):**

| Props | 타입 | 기본값 |
|-------|------|--------|
| `variant` | `'default' \| 'striped'` | `'default'` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` |

**사용 예시:**

```tsx
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell
} from '@baerae-zkap/design-system/native';

<Table variant="striped" size="medium">
  <TableHead>
    <TableRow>
      <TableHeadCell>상품명</TableHeadCell>
      <TableHeadCell align="center">수량</TableHeadCell>
      <TableHeadCell align="right">가격</TableHeadCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>상품 A</TableCell>
      <TableCell align="center">2</TableCell>
      <TableCell align="right">₩10,000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>상품 B</TableCell>
      <TableCell align="center">1</TableCell>
      <TableCell align="right">₩25,000</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Thumbnail
> 이미지/영상 썸네일

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `src` | `ImageSourcePropType` | (필수) | 이미지 소스 |
| `aspectRatio` | `'1:1' \| '16:9' \| '4:3' \| '3:2' \| '2:3' \| '9:16'` | `'1:1'` | 비율 |
| `size` | `number` | - | 너비 (px) |
| `fill` | `boolean` | `false` | 부모 너비 채움 |
| `playIcon` | `boolean` | `false` | 재생 아이콘 |

**사용 예시:**

```tsx
import { Thumbnail } from '@baerae-zkap/design-system/native';

// 정사각형 썸네일
<Thumbnail
  src={require('./image.jpg')}
  aspectRatio="1:1"
  size={120}
/>

// 16:9 비디오 썸네일
<Thumbnail
  src={{ uri: 'https://example.com/video-thumb.jpg' }}
  aspectRatio="16:9"
  fill
  playIcon
/>
```

---

### Feedback (피드백 컴포넌트)

#### Alert
> 사용자 확인이 필요한 모달 다이얼로그

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `visible` | `boolean` (필수) | 표시 여부 |
| `onClose` | `() => void` (필수) | 닫기 콜백 |
| `title` | `string` | 제목 |
| `body` | `string` (필수) | 본문 |
| `primaryAction` | `AlertAction` (필수) | 주요 버튼 |
| `secondaryAction` | `AlertAction` | 보조 버튼 |

**사용 예시:**

```tsx
import { Alert } from '@baerae-zkap/design-system/native';

const [showAlert, setShowAlert] = useState(false);

<Alert
  visible={showAlert}
  onClose={() => setShowAlert(false)}
  title="삭제 확인"
  body="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
  primaryAction={{
    label: '삭제',
    onPress: () => {
      handleDelete();
      setShowAlert(false);
    }
  }}
  secondaryAction={{
    label: '취소',
    onPress: () => setShowAlert(false)
  }}
/>
```

#### FallbackView
> 빈 상태 / 에러 상태 플레이스홀더

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `icon` | `ReactNode` | 아이콘 |
| `title` | `string` | 제목 |
| `description` | `string` | 설명 |
| `action` | `{ label: string; onPress: () => void }` | 액션 버튼 |

**사용 예시:**

```tsx
import { FallbackView } from '@baerae-zkap/design-system/native';
import { Search } from 'lucide-react-native';

<FallbackView
  icon={<Search size={48} />}
  title="검색 결과 없음"
  description="다른 검색어로 시도해보세요"
  action={{
    label: '다시 검색',
    onPress: () => setQuery('')
  }}
/>
```

#### PushBadge
> 푸시 알림 뱃지 (숫자 또는 점)

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `count` | `number` | - | 숫자 표시 |
| `dot` | `boolean` | `false` | 점 모드 |
| `max` | `number` | `99` | 최대 표시 숫자 |

**사용 예시:**

```tsx
import { PushBadge } from '@baerae-zkap/design-system/native';

// 숫자 뱃지
<View style={{ position: 'relative' }}>
  <BellIcon />
  <PushBadge count={5} />
</View>

// 점 뱃지
<View style={{ position: 'relative' }}>
  <MailIcon />
  <PushBadge dot />
</View>
```

#### SectionMessage
> 섹션 레벨 안내/경고 메시지

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'info' \| 'warning' \| 'error' \| 'success'` | `'info'` | 메시지 유형 |
| `title` | `string` | - | 제목 |
| `description` | `string` | (필수) | 내용 |
| `action` | `ReactNode` | - | 액션 영역 |

**사용 예시:**

```tsx
import { SectionMessage } from '@baerae-zkap/design-system/native';

<SectionMessage
  variant="warning"
  title="주의"
  description="이 작업은 되돌릴 수 없습니다."
  action={<TextButton onPress={() => {}}>자세히 보기</TextButton>}
/>
```

#### Snackbar
> 하단 알림 메시지 (헤딩 + 액션 포함)

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `visible` | `boolean` | (필수) | 표시 여부 |
| `description` | `string` | (필수) | 메시지 |
| `action` | `{ label: string; onPress: () => void }` | - | 액션 버튼 |
| `duration` | `number` | `4000` | 자동 닫힘 시간 (ms) |

**사용 예시:**

```tsx
import { Snackbar } from '@baerae-zkap/design-system/native';

const [showSnackbar, setShowSnackbar] = useState(false);

<Snackbar
  visible={showSnackbar}
  description="저장되었습니다"
  action={{
    label: '실행취소',
    onPress: () => handleUndo()
  }}
  duration={4000}
  onDismiss={() => setShowSnackbar(false)}
/>
```

#### Toast
> 경량 피드백 메시지 (자동 사라짐)

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `message` | `string` | (필수) | 메시지 |
| `status` | `'success' \| 'error' \| 'info' \| 'warning'` | `'info'` | 상태 |
| `position` | `'top' \| 'bottom'` | `'bottom'` | 위치 |
| `duration` | `number` | `3000` | 표시 시간 (ms) |
| `visible` | `boolean` | - | 표시 여부 |

**사용 예시:**

```tsx
import { Toast } from '@baerae-zkap/design-system/native';

const [toast, setToast] = useState({ show: false, message: '' });

// 성공 메시지
<Toast
  message="복사되었습니다"
  status="success"
  position="bottom"
  visible={toast.show}
  duration={3000}
  onDismiss={() => setToast({ show: false, message: '' })}
/>
```

---

### Loading (로딩 컴포넌트)

#### Loading
> 회전 스피너

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `color` | `'brand' \| 'neutral' \| 'white'` | `'brand'` | 색상 |
| `overlay` | `boolean` | `false` | 전체 화면 오버레이 |
| `label` | `string` | - | 로딩 텍스트 |

**사용 예시:**

```tsx
import { Loading } from '@baerae-zkap/design-system/native';

// 인라인 스피너
<Loading size="medium" color="brand" />

// 전체 화면 오버레이
<Loading overlay label="처리 중..." />

// 조건부 렌더링
{isLoading && <Loading overlay />}
```

#### LoadingDots
> 3개 점 파동 애니메이션

**주요 Props:**

| Props | 타입 | 기본값 |
|-------|------|--------|
| `color` | `string` | `'#2563eb'` |
| `size` | `number` | `6` |

**사용 예시:**

```tsx
import { LoadingDots } from '@baerae-zkap/design-system/native';

<View style={{ alignItems: 'center', padding: 20 }}>
  <LoadingDots color="#2563eb" size={8} />
</View>
```


### Navigations (네비게이션 컴포넌트)

#### BottomNavigation
> 하단 탭 네비게이션 바

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `items` | `NavigationItem[]` | 탭 아이템 배열 |
| `selectedIndex` | `number` | 선택된 인덱스 |
| `onSelect` | `(index: number) => void` | 탭 선택 콜백 |

**사용 예시:**

```tsx
import { BottomNavigation } from '@baerae-zkap/design-system/native';
import { Home, Search, User } from 'lucide-react-native';

const [selectedTab, setSelectedTab] = useState(0);

<BottomNavigation
  items={[
    { icon: <Home size={24} />, label: '홈' },
    { icon: <Search size={24} />, label: '검색' },
    { icon: <User size={24} />, label: '마이' },
  ]}
  selectedIndex={selectedTab}
  onSelect={setSelectedTab}
/>
```

#### TopNavigation
> 상단 헤더 네비게이션

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `variant` | `'normal' \| 'transparent' \| 'prominent'` | `'normal'` | 스타일 |
| `title` | `string` | - | 제목 |
| `onBackPress` | `() => void` | - | 뒤로가기 핸들러 |
| `toolbar` | `ReactNode` | - | 오른쪽 툴바 |

**사용 예시:**

```tsx
import { TopNavigation, IconButton } from '@baerae-zkap/design-system/native';
import { MoreVertical } from 'lucide-react-native';

<TopNavigation
  variant="normal"
  title="설정"
  onBackPress={() => navigation.goBack()}
  toolbar={
    <IconButton variant="ghost" onPress={() => {}}>
      <MoreVertical size={20} />
    </IconButton>
  }
/>
```

#### Category
> 카테고리 필터 탭

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `items` | `CategoryItem[]` | 카테고리 아이템 |
| `selectedIndex` | `number` | 선택된 인덱스 |
| `onSelect` | `(index: number) => void` | 선택 콜백 |

**사용 예시:**

```tsx
import { Category } from '@baerae-zkap/design-system/native';

<Category
  items={[
    { label: '전체', count: 120 },
    { label: '의류', count: 45 },
    { label: '가방', count: 23 },
  ]}
  selectedIndex={0}
  onSelect={setCategory}
/>
```

#### Tab
> 수평 탭 네비게이션

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `selectedIndex` | `number` | (필수) | 선택된 인덱스 |
| `onSelect` | `(index: number) => void` | (필수) | 선택 콜백 |
| `mode` | `'fixed' \| 'scroll'` | `'fixed'` | 레이아웃 모드 |

**사용 예시:**

```tsx
import { Tab } from '@baerae-zkap/design-system/native';

<Tab selectedIndex={tabIndex} onSelect={setTabIndex} mode="scroll">
  <Tab.Item label="전체" />
  <Tab.Item label="인기" badge={5} />
  <Tab.Item label="최신" />
  <Tab.Item label="추천" />
</Tab>
```

#### Pagination
> 페이지네이션 컨트롤

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `currentPage` | `number` | 현재 페이지 (1-indexed) |
| `totalPages` | `number` | 전체 페이지 수 |
| `onPageChange` | `(page: number) => void` | 페이지 변경 콜백 |

**사용 예시:**

```tsx
import { Pagination } from '@baerae-zkap/design-system/native';

<Pagination
  currentPage={currentPage}
  totalPages={10}
  onPageChange={setCurrentPage}
/>
```

#### PaginationDots
> 페이지 인디케이터 점

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `count` | `number` | 전체 페이지 수 |
| `activeIndex` | `number` | 활성 인덱스 |

**사용 예시:**

```tsx
import { PaginationDots } from '@baerae-zkap/design-system/native';

<PaginationDots count={5} activeIndex={currentSlide} />
```

#### PageCounter
> 페이지 카운터 텍스트

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `current` | `number` | 현재 페이지 |
| `total` | `number` | 전체 페이지 |

**사용 예시:**

```tsx
import { PageCounter } from '@baerae-zkap/design-system/native';

<PageCounter current={3} total={10} />  {/* "3 / 10" */}
```

#### ProgressIndicator
> 선형 진행 표시기

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `progress` | `number` | (필수) | 진행률 (0-1) |
| `color` | `'primary' \| 'secondary' \| 'success'` | `'primary'` | 색상 |
| `showLabel` | `boolean` | `false` | 퍼센트 표시 |

**사용 예시:**

```tsx
import { ProgressIndicator } from '@baerae-zkap/design-system/native';

<ProgressIndicator
  progress={0.65}  // 65%
  color="success"
  showLabel
/>
```

#### ProgressTracker
> 단계별 진행 트래커

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `steps` | `Step[]` | 단계 배열 |
| `currentStep` | `number` | 현재 단계 인덱스 |

**사용 예시:**

```tsx
import { ProgressTracker } from '@baerae-zkap/design-system/native';

<ProgressTracker
  steps={[
    { label: '주문', status: 'completed' },
    { label: '결제', status: 'active' },
    { label: '배송', status: 'pending' },
    { label: '완료', status: 'pending' },
  ]}
  currentStep={1}
/>
```

---

### Presentation (프레젠테이션 컴포넌트)

#### BottomSheet
> 하단 슬라이드업 모달

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `visible` | `boolean` | (필수) | 표시 여부 |
| `onClose` | `() => void` | (필수) | 닫기 콜백 |
| `title` | `string` | - | 제목 |
| `actionArea` | `ReactNode` | - | 하단 액션 영역 |
| `scrollable` | `boolean` | `true` | 스크롤 가능 여부 |

**사용 예시:**

```tsx
import { BottomSheet, ActionArea, Button } from '@baerae-zkap/design-system/native';

const [showSheet, setShowSheet] = useState(false);

<BottomSheet
  visible={showSheet}
  onClose={() => setShowSheet(false)}
  title="필터"
  actionArea={
    <ActionArea variant="compact">
      <Button
        variant="solid"
        color="primary"
        display="full"
        onPress={handleApply}
      >
        적용
      </Button>
    </ActionArea>
  }
>
  {/* 필터 옵션 콘텐츠 */}
  <View style={{ padding: 16 }}>
    <Text>필터 설정</Text>
  </View>
</BottomSheet>
```

#### Popup
> 중앙 모달 다이얼로그

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `visible` | `boolean` | (필수) | 표시 여부 |
| `onClose` | `() => void` | (필수) | 닫기 콜백 |
| `title` | `string` | - | 제목 |
| `description` | `string` | - | 설명 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |

**사용 예시:**

```tsx
import { Popup } from '@baerae-zkap/design-system/native';

<Popup
  visible={showPopup}
  onClose={() => setShowPopup(false)}
  title="업데이트 알림"
  description="새로운 버전이 출시되었습니다."
  size="medium"
>
  <ActionArea variant="strong">
    <Button variant="solid" color="primary" onPress={handleUpdate}>
      업데이트
    </Button>
  </ActionArea>
</Popup>
```

#### Autocomplete
> 자동완성 입력

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `value` | `string` | 입력값 |
| `onChangeText` | `(text: string) => void` | 텍스트 변경 콜백 |
| `suggestions` | `string[]` | 자동완성 제안 목록 |
| `onSelectSuggestion` | `(item: string) => void` | 제안 선택 콜백 |

**사용 예시:**

```tsx
import { Autocomplete } from '@baerae-zkap/design-system/native';

<Autocomplete
  value={query}
  onChangeText={setQuery}
  suggestions={searchSuggestions}
  onSelectSuggestion={(item) => {
    setQuery(item);
    handleSearch(item);
  }}
  placeholder="검색어를 입력하세요"
/>
```

#### Menu
> 드롭다운 메뉴

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `trigger` | `ReactNode` | 메뉴 트리거 요소 |
| `items` | `MenuItem[]` | 메뉴 아이템 배열 |
| `onSelect` | `(item: MenuItem) => void` | 아이템 선택 콜백 |

**사용 예시:**

```tsx
import { Menu, IconButton } from '@baerae-zkap/design-system/native';
import { MoreVertical } from 'lucide-react-native';

<Menu
  trigger={
    <IconButton variant="ghost">
      <MoreVertical size={20} />
    </IconButton>
  }
  items={[
    { label: '수정', value: 'edit' },
    { label: '삭제', value: 'delete', danger: true },
  ]}
  onSelect={(item) => handleMenuAction(item.value)}
/>
```

#### Popover
> 앵커 기반 팝오버

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `visible` | `boolean` | (필수) | 표시 여부 |
| `anchor` | `ReactNode` | (필수) | 앵커 요소 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | 위치 |

**사용 예시:**

```tsx
import { Popover } from '@baerae-zkap/design-system/native';

<Popover
  visible={showPopover}
  anchor={<Button onPress={() => setShowPopover(true)}>정보</Button>}
  placement="top"
  onClose={() => setShowPopover(false)}
>
  <View style={{ padding: 12 }}>
    <Text>추가 정보가 여기에 표시됩니다.</Text>
  </View>
</Popover>
```

#### Tooltip
> 도움말 팝업

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `message` | `string` | (필수) | 툴팁 메시지 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | 위치 |

**사용 예시:**

```tsx
import { Tooltip } from '@baerae-zkap/design-system/native';

<Tooltip message="이 기능은 실험적입니다" placement="top">
  <IconButton variant="ghost">
    <InfoIcon size={20} />
  </IconButton>
</Tooltip>
```

#### Divider
> 구분선

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향 |
| `thickness` | `number` | `1` | 두께 |
| `color` | `string` | - | 색상 |

**사용 예시:**

```tsx
import { Divider } from '@baerae-zkap/design-system/native';

// 수평 구분선
<Divider orientation="horizontal" />

// 수직 구분선 (flexDirection: row 내에서)
<View style={{ flexDirection: 'row', height: 40 }}>
  <Button>A</Button>
  <Divider orientation="vertical" />
  <Button>B</Button>
</View>
```

---

### Selection & Input (선택 및 입력 컴포넌트)

#### TextField
> 텍스트 입력 필드

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `value` | `string` | - | 입력값 |
| `onChangeText` | `(text: string) => void` | - | 텍스트 변경 콜백 |
| `label` | `string` | - | 라벨 |
| `placeholder` | `string` | - | 플레이스홀더 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 크기 |
| `error` | `string` | - | 에러 메시지 |
| `disabled` | `boolean` | `false` | 비활성화 |

**사용 예시:**

```tsx
import { TextField } from '@baerae-zkap/design-system/native';

<TextField
  value={name}
  onChangeText={setName}
  label="이름"
  placeholder="이름을 입력하세요"
  size="medium"
  error={nameError}
/>
```

#### TextArea
> 여러 줄 텍스트 입력

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `value` | `string` | - | 입력값 |
| `onChangeText` | `(text: string) => void` | - | 텍스트 변경 콜백 |
| `rows` | `number` | `4` | 행 수 |
| `maxLength` | `number` | - | 최대 길이 |
| `showCounter` | `boolean` | `false` | 글자 수 표시 |

**사용 예시:**

```tsx
import { TextArea } from '@baerae-zkap/design-system/native';

<TextArea
  value={description}
  onChangeText={setDescription}
  label="설명"
  rows={6}
  maxLength={500}
  showCounter
  placeholder="상세 설명을 입력하세요"
/>
```

#### SearchField
> 검색 입력 필드

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `value` | `string` | 입력값 |
| `onChangeText` | `(text: string) => void` | 텍스트 변경 콜백 |
| `onSearch` | `(text: string) => void` | 검색 실행 콜백 |
| `placeholder` | `string` | 플레이스홀더 |

**사용 예시:**

```tsx
import { SearchField } from '@baerae-zkap/design-system/native';

<SearchField
  value={searchQuery}
  onChangeText={setSearchQuery}
  onSearch={handleSearch}
  placeholder="검색어를 입력하세요"
/>
```

#### Checkbox
> 체크박스

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `checked` | `boolean` | `false` | 체크 상태 |
| `onPress` | `() => void` | - | 클릭 핸들러 |
| `label` | `string` | - | 라벨 |
| `disabled` | `boolean` | `false` | 비활성화 |

**사용 예시:**

```tsx
import { Checkbox } from '@baerae-zkap/design-system/native';

<Checkbox
  checked={agreedToTerms}
  onPress={() => setAgreedToTerms(!agreedToTerms)}
  label="약관에 동의합니다"
/>

<Checkbox
  checked={rememberMe}
  onPress={() => setRememberMe(!rememberMe)}
  label="로그인 상태 유지"
/>
```

#### Radio
> 라디오 버튼

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `selected` | `boolean` | `false` | 선택 상태 |
| `onPress` | `() => void` | - | 클릭 핸들러 |
| `label` | `string` | - | 라벨 |
| `disabled` | `boolean` | `false` | 비활성화 |

**사용 예시:**

```tsx
import { Radio } from '@baerae-zkap/design-system/native';

<View>
  <Radio
    selected={gender === 'male'}
    onPress={() => setGender('male')}
    label="남성"
  />
  <Radio
    selected={gender === 'female'}
    onPress={() => setGender('female')}
    label="여성"
  />
</View>
```

#### Switch
> 토글 스위치

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `value` | `boolean` | `false` | 상태 |
| `onValueChange` | `(value: boolean) => void` | - | 상태 변경 콜백 |
| `label` | `string` | - | 라벨 |
| `disabled` | `boolean` | `false` | 비활성화 |

**사용 예시:**

```tsx
import { Switch } from '@baerae-zkap/design-system/native';

<Switch
  value={darkMode}
  onValueChange={setDarkMode}
  label="다크 모드"
/>

<Switch
  value={notificationsEnabled}
  onValueChange={setNotificationsEnabled}
  label="푸시 알림"
/>
```

#### Select
> 드롭다운 선택

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `value` | `string` | 선택된 값 |
| `onChange` | `(value: string) => void` | 선택 변경 콜백 |
| `options` | `SelectOption[]` | 옵션 배열 |
| `placeholder` | `string` | 플레이스홀더 |
| `label` | `string` | 라벨 |

**사용 예시:**

```tsx
import { Select } from '@baerae-zkap/design-system/native';

<Select
  value={selectedCountry}
  onChange={setSelectedCountry}
  options={[
    { label: '대한민국', value: 'kr' },
    { label: '미국', value: 'us' },
    { label: '일본', value: 'jp' },
  ]}
  label="국가"
  placeholder="국가를 선택하세요"
/>
```

#### CheckMark
> 체크 마크 아이콘

**사용 예시:**

```tsx
import { CheckMark } from '@baerae-zkap/design-system/native';

<CheckMark checked={true} size="medium" />
```

#### FilterButton
> 필터 선택 버튼

**사용 예시:**

```tsx
import { FilterButton } from '@baerae-zkap/design-system/native';

<FilterButton
  label="가격"
  selected={priceFilterActive}
  onPress={() => setPriceFilterActive(!priceFilterActive)}
/>
```

#### FramedStyle
> 프레임 스타일 선택기

**사용 예시:**

```tsx
import { FramedStyle } from '@baerae-zkap/design-system/native';

<FramedStyle
  options={['A', 'B', 'C']}
  selected="A"
  onSelect={setSelected}
/>
```

#### SegmentedControl
> 세그먼트 컨트롤

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `segments` | `string[]` | 세그먼트 라벨 배열 |
| `selectedIndex` | `number` | 선택된 인덱스 |
| `onSelect` | `(index: number) => void` | 선택 콜백 |

**사용 예시:**

```tsx
import { SegmentedControl } from '@baerae-zkap/design-system/native';

<SegmentedControl
  segments={['일간', '주간', '월간']}
  selectedIndex={period}
  onSelect={setPeriod}
/>
```

#### Slider
> 슬라이더

**주요 Props:**

| Props | 타입 | 기본값 | 설명 |
|-------|------|--------|------|
| `value` | `number` | (필수) | 현재 값 |
| `onValueChange` | `(value: number) => void` | (필수) | 값 변경 콜백 |
| `min` | `number` | `0` | 최소값 |
| `max` | `number` | `100` | 최대값 |
| `step` | `number` | `1` | 증감 단위 |

**사용 예시:**

```tsx
import { Slider } from '@baerae-zkap/design-system/native';

<Slider
  value={volume}
  onValueChange={setVolume}
  min={0}
  max={100}
  step={1}
/>
```

#### DatePicker
> 날짜 선택기

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `value` | `Date` | 선택된 날짜 |
| `onChange` | `(date: Date) => void` | 날짜 변경 콜백 |
| `minimumDate` | `Date` | 최소 날짜 |
| `maximumDate` | `Date` | 최대 날짜 |

**사용 예시:**

```tsx
import { DatePicker } from '@baerae-zkap/design-system/native';

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  minimumDate={new Date()}
/>
```

**참고:** `@react-native-community/datetimepicker` 설치 필요

#### TimePicker
> 시간 선택기

**주요 Props:**

| Props | 타입 | 설명 |
|-------|------|------|
| `value` | `Date` | 선택된 시간 |
| `onChange` | `(time: Date) => void` | 시간 변경 콜백 |

**사용 예시:**

```tsx
import { TimePicker } from '@baerae-zkap/design-system/native';

<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
/>
```

**참고:** `@react-native-community/datetimepicker` 설치 필요

---

## Foundation 디자인 토큰

디자인 시스템 전체에서 일관된 스타일을 유지하기 위해 Foundation 토큰을 사용합니다.

```tsx
import { colors, typography, spacing, radius } from '@baerae-zkap/design-system/native';
```

### Spacing (간격)

**Inset (내부 패딩):**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `spacing.inset.3xs` | 4px | 뱃지, 태그 내부 |
| `spacing.inset.2xs` | 8px | 소형 칩, 아이콘 버튼 |
| `spacing.inset.xs` | 12px | 소형 버튼, 입력 필드 |
| `spacing.inset.sm` | 16px | 기본 버튼, 카드 내부 |
| `spacing.inset.md` | 20px | 중형 카드, 리스트 |
| `spacing.inset.lg` | 24px | 대형 카드, 모달 |
| `spacing.inset.xl` | 32px | 섹션, 화면 여백 |

**Stack (수직 간격):**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `spacing.stack.3xs` | 4px | 밀집된 리스트 |
| `spacing.stack.2xs` | 8px | 텍스트 줄 간격 |
| `spacing.stack.xs` | 12px | 관련 요소 그룹 |
| `spacing.stack.sm` | 16px | 기본 간격 |
| `spacing.stack.md` | 20px | 섹션 내 간격 |
| `spacing.stack.lg` | 24px | 섹션 간 간격 |
| `spacing.stack.xl` | 32px | 주요 섹션 구분 |

**Horizontal (수평 간격):**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `spacing.horizontal.3xs` | 4px | 아이콘-텍스트 간격 |
| `spacing.horizontal.2xs` | 8px | 버튼 내 아이콘 간격 |
| `spacing.horizontal.xs` | 12px | 관련 요소 간격 |
| `spacing.horizontal.sm` | 16px | 기본 수평 간격 |
| `spacing.horizontal.md` | 20px | 카드 간격 |
| `spacing.horizontal.lg` | 24px | 그리드 간격 |

### Radius (모서리)

**Button (버튼):**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `radius.button.sm` | 8px | 소/중형 버튼 |
| `radius.button.lg` | 12px | 대형 버튼 |

**Card (카드):**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `radius.card.sm` | 12px | 소형 카드, 칩 |
| `radius.card.md` | 16px | 기본 카드 |
| `radius.card.lg` | 20px | 대형 카드 |

**Input (입력 필드):**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `radius.input.default` | 8px | TextField, TextArea |

**Modal (모달):**

| 토큰 | 값 | 용도 |
|------|-----|------|
| `radius.modal.default` | 24px | 모달, 다이얼로그, 바텀시트 |

### Colors (색상)

**Brand:**

| 토큰 | 색상 코드 | 용도 |
|------|----------|------|
| `colors.brand.primary` | `#2563eb` | 주요 액션, 강조 |
| `colors.brand.primaryHover` | `#1d4ed8` | 호버 상태 |
| `colors.brand.secondary` | `#64748b` | 보조 액션 |

**Neutral:**

| 토큰 | 색상 코드 | 용도 |
|------|----------|------|
| `colors.neutral.black` | `#000000` | 제목, 주요 텍스트 |
| `colors.neutral.gray900` | `#171717` | 본문 텍스트 |
| `colors.neutral.gray700` | `#404040` | 부제목 |
| `colors.neutral.gray500` | `#737373` | 보조 텍스트 |
| `colors.neutral.gray300` | `#d4d4d4` | 구분선 |
| `colors.neutral.gray100` | `#f5f5f5` | 배경 |
| `colors.neutral.white` | `#ffffff` | 흰색 배경 |

**Semantic:**

| 토큰 | 색상 코드 | 용도 |
|------|----------|------|
| `colors.semantic.success` | `#10b981` | 성공, 완료 |
| `colors.semantic.error` | `#ef4444` | 에러, 위험 |
| `colors.semantic.warning` | `#f59e0b` | 경고 |
| `colors.semantic.info` | `#3b82f6` | 정보 |

### Typography (타이포그래피)

**Heading (제목):**

| 토큰 | 크기 | 굵기 | 용도 |
|------|------|------|------|
| `typography.heading.h1` | 32px | 700 | 페이지 제목 |
| `typography.heading.h2` | 24px | 700 | 섹션 제목 |
| `typography.heading.h3` | 20px | 600 | 서브 섹션 제목 |
| `typography.heading.h4` | 18px | 600 | 카드 제목 |

**Body (본문):**

| 토큰 | 크기 | 굵기 | 용도 |
|------|------|------|------|
| `typography.body.large` | 16px | 400 | 강조 본문 |
| `typography.body.medium` | 14px | 400 | 기본 본문 |
| `typography.body.small` | 12px | 400 | 보조 텍스트 |
| `typography.body.xsmall` | 10px | 400 | 캡션 |

### 사용 예시

```tsx
import { spacing, radius, colors, typography } from '@baerae-zkap/design-system/native';
import { View, Text } from 'react-native';

<View style={{
  padding: spacing.inset.sm,        // 16px
  borderRadius: radius.card.sm,     // 12px
  backgroundColor: colors.neutral.white,
  gap: spacing.stack.xs,            // 12px
}}>
  <Text style={{
    fontSize: typography.heading.h4.fontSize,
    fontWeight: typography.heading.h4.fontWeight,
    color: colors.neutral.black,
  }}>
    카드 제목
  </Text>
  <Text style={{
    fontSize: typography.body.medium.fontSize,
    color: colors.neutral.gray700,
  }}>
    카드 본문 텍스트
  </Text>
</View>
```

---

## 자주 쓰는 패턴

### 확인/취소 버튼 그룹

```tsx
import { ActionArea, Button } from '@baerae-zkap/design-system/native';

<ActionArea variant="strong" position="fixed">
  <Button variant="solid" color="assistive" onPress={handleCancel}>
    취소
  </Button>
  <Button variant="solid" color="primary" onPress={handleConfirm}>
    확인
  </Button>
</ActionArea>
```

### 설정 리스트

```tsx
import { View } from 'react-native';
import { SectionHeader, ListCell, Switch } from '@baerae-zkap/design-system/native';

<View>
  <SectionHeader title="알림 설정" />
  <ListCell
    title="푸시 알림"
    subtitle="실시간으로 알림을 받습니다"
    trailing={<Switch value={pushEnabled} onValueChange={setPushEnabled} />}
    divider
  />
  <ListCell
    title="이메일 알림"
    subtitle="중요한 정보를 이메일로 받습니다"
    trailing={<Switch value={emailEnabled} onValueChange={setEmailEnabled} />}
    divider
  />
  <ListCell
    title="SMS 알림"
    trailing={<Switch value={smsEnabled} onValueChange={setSmsEnabled} />}
    divider
  />
</View>
```

### 바텀시트 + 액션 버튼

```tsx
import { BottomSheet, ActionArea, Button, Radio } from '@baerae-zkap/design-system/native';

const [showSort, setShowSort] = useState(false);
const [sortOrder, setSortOrder] = useState('latest');

<BottomSheet
  visible={showSort}
  onClose={() => setShowSort(false)}
  title="정렬"
  actionArea={
    <ActionArea variant="compact">
      <Button
        variant="solid"
        color="primary"
        display="full"
        onPress={() => {
          applySorting(sortOrder);
          setShowSort(false);
        }}
      >
        적용
      </Button>
    </ActionArea>
  }
>
  <View style={{ padding: 16, gap: 12 }}>
    <Radio
      selected={sortOrder === 'latest'}
      onPress={() => setSortOrder('latest')}
      label="최신순"
    />
    <Radio
      selected={sortOrder === 'popular'}
      onPress={() => setSortOrder('popular')}
      label="인기순"
    />
    <Radio
      selected={sortOrder === 'price_low'}
      onPress={() => setSortOrder('price_low')}
      label="낮은 가격순"
    />
  </View>
</BottomSheet>
```

### 토스트 피드백

```tsx
import { Toast } from '@baerae-zkap/design-system/native';

const [toast, setToast] = useState({ show: false, message: '', status: 'success' });

// 성공 메시지 표시
const showSuccessToast = (message) => {
  setToast({ show: true, message, status: 'success' });
};

<Toast
  message={toast.message}
  status={toast.status}
  visible={toast.show}
  position="bottom"
  duration={3000}
  onDismiss={() => setToast({ ...toast, show: false })}
/>
```

### 상품 리스트 카드

```tsx
import { ListCard, Thumbnail, ContentBadge, TextButton } from '@baerae-zkap/design-system/native';
import { View, Text } from 'react-native';

<ListCard
  thumbnail={<Thumbnail src={product.image} size={80} aspectRatio="1:1" />}
  title={product.name}
  subtitle={
    <View style={{ gap: 4 }}>
      <ContentBadge variant="filled" color="brandDefault" size="small">
        {product.category}
      </ContentBadge>
      <Text style={{ fontSize: 12, color: '#737373' }}>
        {product.description}
      </Text>
    </View>
  }
  meta={
    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
      ₩{product.price.toLocaleString()}
    </Text>
  }
  action={<TextButton variant="arrow" onPress={() => {}}>보기</TextButton>}
  onPress={() => navigation.navigate('ProductDetail', { id: product.id })}
/>
```


### 필터 칩 리스트

```tsx
import { Chip } from '@baerae-zkap/design-system/native';
import { ScrollView } from 'react-native';

const [selectedFilters, setSelectedFilters] = useState(['전체']);

<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 16 }}>
    {filters.map((filter) => (
      <Chip
        key={filter}
        variant="solid"
        selected={selectedFilters.includes(filter)}
        onPress={() => toggleFilter(filter)}
      >
        {filter}
      </Chip>
    ))}
  </View>
</ScrollView>
```

---

## AI 코딩 도구에서 활용하기

이 디자인 시스템은 AI 코딩 도구(Claude, Cursor, Copilot 등)와 함께 사용할 수 있도록 문서가 구조화되어 있습니다.

### AI 참조 문서 구조

```
node_modules/@baerae-zkap/design-system/
├── docs/
│   └── COMPONENTS.md    ← 53개 컴포넌트 카탈로그 (AI 참조용)
└── dist/                ← 타입 정의 파일 (.d.ts)
```

### CLAUDE.md에 추가하기

프로젝트의 `CLAUDE.md` (또는 `.cursorrules`)에 아래 내용을 추가하면, AI가 컴포넌트를 정확하게 사용합니다:

```markdown
## 디자인 시스템

이 프로젝트는 `@baerae-zkap/design-system` 패키지를 사용합니다.

- 컴포넌트 문서: `node_modules/@baerae-zkap/design-system/docs/COMPONENTS.md`
- 컴포넌트 import: `from '@baerae-zkap/design-system/native'`
- 스토리북: https://design-foundation.vercel.app

### 컴포넌트 사용 규칙
- Button 조합 시 ActionArea로 감싸기
- 취소 버튼: `color="assistive"`, 확인 버튼: `color="primary"`
- 하드코딩 스타일 대신 Foundation 토큰 사용 (spacing, radius, colors, typography)
- 이벤트 핸들러: `onPress` (React Native)
- 아이콘은 `lucide-react-native` 사용
```

### Cursor Rules에 추가하기

`.cursorrules` 파일에 동일한 내용을 추가합니다:

```
이 프로젝트는 @baerae-zkap/design-system 패키지의 React Native 컴포넌트를 사용합니다.
컴포넌트 참조: node_modules/@baerae-zkap/design-system/docs/COMPONENTS.md
Import 경로: import { ComponentName } from '@baerae-zkap/design-system/native'
Storybook: https://design-foundation.vercel.app

컴포넌트 사용 규칙:
- Button 조합 시 ActionArea로 감싸기
- 취소 버튼: color="assistive", 확인 버튼: color="primary"
- 하드코딩 스타일 대신 Foundation 토큰 사용
- 이벤트 핸들러: onPress (React Native)
```

### AI에게 물어보는 프롬프트 예시

```
"@baerae-zkap/design-system의 Button 컴포넌트로 확인/취소 버튼을 만들어줘"

"디자인 시스템의 BottomSheet와 ActionArea를 사용해서 필터 모달을 구현해줘"

"ListCell과 Switch를 사용해서 설정 화면을 만들어줘"

"spacing과 radius 토큰을 사용해서 카드 레이아웃을 만들어줘"

"docs/COMPONENTS.md를 읽고 이 화면에 맞는 컴포넌트를 추천해줘"
```

### 패키지 내 docs 폴더 활용

패키지에 포함된 `docs/COMPONENTS.md`는 AI가 읽기 최적화된 문서입니다:
- 53개 전체 컴포넌트 목록과 카테고리
- import 경로와 기본 사용법
- Foundation 디자인 토큰 참조 테이블
- 컴포넌트 조합 규칙 (Button + ActionArea 등)

AI 도구에서 이 파일을 참조하도록 설정하면, 디자인 시스템에 맞는 코드를 자동 생성할 수 있습니다.

---

## 트러블슈팅

### 아이콘이 안 보여요
`lucide-react-native`와 `react-native-svg`가 설치되어 있는지 확인하세요:
```bash
pnpm add lucide-react-native react-native-svg
cd ios && pod install
```

### 타입 에러가 발생해요
패키지 버전을 최신으로 업데이트하세요:
```bash
pnpm update @baerae-zkap/design-system
```

TypeScript 5.x 이상이 필요합니다.

### 애니메이션이 동작하지 않아요
`react-native-reanimated`가 올바르게 설정되어 있는지 확인하세요:
```bash
pnpm add react-native-reanimated
```

`babel.config.js`에 플러그인 추가:
```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

iOS의 경우 Pod 설치:
```bash
cd ios && pod install
```

### 패키지 업데이트 방법
```bash
# 최신 버전 확인
pnpm view @baerae-zkap/design-system version

# 업데이트
pnpm update @baerae-zkap/design-system

# 특정 버전 설치
pnpm add @baerae-zkap/design-system@0.1.13
```

### Google Artifact Registry 인증 만료
```bash
npx google-artifactregistry-auth
```

### DatePicker/TimePicker가 작동하지 않아요
`@react-native-community/datetimepicker` 설치가 필요합니다:
```bash
pnpm add @react-native-community/datetimepicker
cd ios && pod install
```

### Safe Area가 제대로 작동하지 않아요
`react-native-safe-area-context` 설정을 확인하세요:

```tsx
// App.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* 앱 컴포넌트 */}
    </SafeAreaProvider>
  );
}
```

---

## 컴포넌트 전체 목록

### Actions (5개)
- Button
- TextButton
- IconButton
- Chip
- ActionArea

### Contents (10개)
- Accordion
- Card
- ContentBadge
- ListCard
- ListCell
- PlayBadge
- SectionHeader
- Table (+ TableHead, TableBody, TableRow, TableCell, TableHeadCell)
- Thumbnail

### Feedback (6개)
- Alert
- FallbackView
- PushBadge
- SectionMessage
- Snackbar
- Toast

### Loading (2개)
- Loading
- LoadingDots

### Navigations (11개)
- BottomNavigation
- TopNavigation
- Category
- Tab
- Pagination
- PaginationDots
- PageCounter
- ProgressIndicator
- ProgressTracker

### Presentation (6개)
- BottomSheet
- Popup
- Autocomplete
- Menu
- Popover
- Tooltip
- Divider

### Selection & Input (12개)
- TextField
- TextArea
- SearchField
- Checkbox
- Radio
- Switch
- Select
- CheckMark
- FilterButton
- FramedStyle
- SegmentedControl
- Slider
- DatePicker
- TimePicker

**총 53개 컴포넌트**

---

> 더 자세한 정보는 [Storybook](https://design-foundation.vercel.app)에서 각 컴포넌트의 인터랙티브 예제를 확인하세요.
>
> 궁금한 점이 있으면 팀 슬랙 채널 `#design-system`에 문의해주세요.
