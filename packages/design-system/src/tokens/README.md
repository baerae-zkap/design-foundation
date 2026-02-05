# Color Tokens

Foundation 토큰에서 추출한 resolved color values (HSLA → Hex 변환)

## 사용법

```typescript
// Web (React)
import { colors, palette } from '@baerae-zkap/design-system';

// Semantic colors (권장)
const buttonBg = colors.surface.brand.default;        // #0060f0
const textColor = colors.content.base.default;        // #3d4551
const borderColor = colors.border.base.default;       // #d8dbdf

// Palette colors (직접 참조 시)
const customBlue = palette.blue[50];                   // #0060f0
const customGrey = palette.grey[97];                   // #e8eaed
```

## 구조

### Semantic Colors (`colors`)

Light 테마의 시맨틱 컬러 토큰:

- **surface**: 배경색 (surface.base, surface.brand, surface.error 등)
- **content**: 텍스트/아이콘 색상 (content.base, content.brand 등)
- **border**: 테두리 색상 (border.base, border.brand 등)
- **fill**: 컴포넌트 채움색 (opacity 포함)
- **interaction**: 인터랙션 상태 색상
- **visualization**: 차트/그래프 색상
- **icon**: 아이콘 전용 색상
- **overlay**: 오버레이/딤 배경

### Palette Colors (`palette`)

원시 팔레트 색상 (HSLA → Hex 변환됨):

- **grey**: 99, 98, 97, 96, 95, 90, 80, 70, 60, 50, 40, 30, 25, 23, 22, 20, 17, 15, 10, 7, 5
- **blue**: 99, 95, 90, 80, 70, 65, 60, 55, 50, 45, 40, 30, 20, 10
- **red, orange, yellow, green, teal, purple, navy, pink, cyan, lime**: 99, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10
- **static**: white, black

## 예제

```typescript
// Button with brand color
<button style={{
  backgroundColor: colors.surface.brand.default,      // #0060f0
  color: colors.content.base.onColor,                 // #ffffff
  borderRadius: 8,
}}>
  Click me
</button>

// Pressed state
<button style={{
  backgroundColor: colors.surface.brand.defaultPressed, // #0050db
}}>
  Pressed
</button>

// Custom color from palette
<div style={{
  backgroundColor: palette.blue[95],                  // #e1ebff
  borderColor: palette.blue[50],                      // #0060f0
}}>
  Custom styled
</div>
```

## 기반 파일

- `/Users/jaden/design-foundation/public/palette.json` - 원시 HSLA 색상
- `/Users/jaden/design-foundation/public/semantic-tokens.json` - 시맨틱 매핑

## 변환 로직

HSLA 값을 Hex로 변환하는 함수가 포함되어 있습니다:
- `hsla(216, 100%, 47%, 1)` → `#0060f0`
- Alpha 채널 지원: `hsla(216, 9%, 45%, 0.22)` → `#68717d38`
