# Thumbnail

이미지/비디오 콘텐츠를 표시하는 컴포넌트입니다.

## Overview

Thumbnail은 다양한 종횡비와 스타일 옵션을 지원하여 이미지와 비디오 콘텐츠를 일관되게 표시합니다.

## Features

- **다양한 종횡비**: 1:1, 16:9, 4:3, 3:2, 2:1, 9:16, 3:4 지원
- **라운드 모서리**: radius 옵션으로 12px 라운드 적용
- **비디오 인디케이터**: playIcon으로 비디오 콘텐츠 표시
- **오버레이 지원**: 콘텐츠 위에 커스텀 오버레이 추가 가능
- **폴백 처리**: 이미지 로드 실패 시 대체 콘텐츠 표시

## Props

### Common Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `src` | `string` (Web) / `ImageSourcePropType` (RN) | ✅ | - | 이미지 소스 |
| `alt` | `string` | ❌ | `''` | 대체 텍스트 |
| `aspectRatio` | `ThumbnailAspectRatio` | ❌ | `'1:1'` | 종횡비 |
| `size` | `number \| string` (Web) / `number` (RN) | ❌ | - | 너비 크기 |
| `radius` | `boolean` | ❌ | `true` | 라운드 모서리 적용 (12px) |
| `border` | `boolean` | ❌ | `false` | 테두리 표시 |
| `playIcon` | `boolean` | ❌ | `false` | 재생 아이콘 표시 |
| `fallback` | `string \| ReactNode` | ❌ | - | 실패 시 대체 콘텐츠 |
| `overlay` | `ReactNode` | ❌ | - | 오버레이 콘텐츠 |

### Web-specific Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onClick` | `() => void` | ❌ | - | 클릭 핸들러 |

### React Native-specific Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onPress` | `() => void` | ❌ | - | 터치 핸들러 |
| `style` | `ViewStyle` | ❌ | - | 커스텀 스타일 |

## Types

```typescript
type ThumbnailAspectRatio = '1:1' | '16:9' | '4:3' | '3:2' | '2:1' | '9:16' | '3:4';
```

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Border Radius | 12px | radius=true일 때 적용 |
| Border Color | rgba(0,0,0,0.08) | border=true일 때 적용 |
| Play Icon Size | 48px | playIcon 크기 |
| Play Icon Background | rgba(0,0,0,0.6) | 반투명 검정 배경 |
| Fallback Background | #f1f5f9 | 에러 시 배경색 |

## Usage Guidelines

### When to Use

- 제품 이미지, 프로필 사진, 미디어 갤러리
- 비디오 썸네일 (playIcon과 함께)
- NFT 이미지, 암호화폐 아이콘
- 콘텐츠 카드의 이미지 영역

### Best Practices

- 콘텐츠 타입에 맞는 aspectRatio 선택 (프로필은 1:1, 비디오는 16:9)
- 비디오 콘텐츠에는 playIcon 활성화
- 이미지 로드 실패를 고려하여 fallback 제공
- 클릭 가능한 썸네일에는 onClick/onPress 추가

### Design Principles

1. **일관된 종횡비**: 같은 컨텍스트에서는 동일한 aspectRatio 사용
2. **적절한 크기**: 콘텐츠 중요도에 맞는 size 설정
3. **시각적 피드백**: 클릭 가능한 경우 cursor/onPress 제공

## Accessibility

- alt 텍스트 제공으로 스크린 리더 지원
- onPress 사용 시 accessibilityRole="button" 자동 설정
- 오버레이 텍스트는 충분한 대비 유지

## Examples

### Basic Usage

```tsx
// Web
<Thumbnail
  src="/images/product.jpg"
  alt="Product image"
  aspectRatio="1:1"
  size={200}
/>

// React Native
<Thumbnail
  src={{ uri: "https://example.com/product.jpg" }}
  alt="Product image"
  aspectRatio="1:1"
  size={200}
/>
```

### Video Thumbnail

```tsx
<Thumbnail
  src="/images/video-poster.jpg"
  alt="Video thumbnail"
  aspectRatio="16:9"
  playIcon
  onClick={() => console.log('Play video')}
/>
```

### With Overlay

```tsx
<Thumbnail
  src="/images/avatar.jpg"
  alt="User avatar"
  aspectRatio="1:1"
  overlay={
    <Text style={{ color: 'white', fontWeight: 'bold' }}>
      Online
    </Text>
  }
/>
```

### With Fallback

```tsx
<Thumbnail
  src="/broken-link.jpg"
  alt="Image"
  fallback="No image available"
/>
```

## ZKAP Use Cases

- 암호화폐 로고 썸네일 (1:1, 작은 size)
- NFT 갤러리 이미지 (1:1 또는 16:9)
- 사용자 프로필 이미지 (1:1, radius)
- 비디오 튜토리얼 썸네일 (16:9, playIcon)
