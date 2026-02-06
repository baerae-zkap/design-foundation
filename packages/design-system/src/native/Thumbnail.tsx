/**
 * Thumbnail Component (React Native)
 *
 * @description 이미지/비디오 콘텐츠를 표시하는 컴포넌트입니다.
 * @see docs/components/Thumbnail.md - AI용 상세 가이드
 *
 * @example
 * <Thumbnail
 *   src={{ uri: "https://example.com/image.jpg" }}
 *   alt="Image description"
 *   aspectRatio="16:9"
 *   radius
 *   size={200}
 * />
 */

import { useState, type ReactNode } from 'react';
import { View, Image, Pressable, Text, StyleSheet, type ImageSourcePropType, type ViewStyle, type ImageStyle } from 'react-native';

export type ThumbnailAspectRatio = '1:1' | '16:9' | '4:3' | '3:2' | '2:1' | '9:16' | '3:4';

export interface ThumbnailProps {
  /** 이미지 소스 (React Native ImageSourcePropType) */
  src: ImageSourcePropType;
  /** 대체 텍스트 */
  alt?: string;
  /** 종횡비 */
  aspectRatio?: ThumbnailAspectRatio;
  /** 너비 크기 */
  size?: number;
  /** 라운드 모서리 적용 (12px) */
  radius?: boolean;
  /** 테두리 표시 */
  border?: boolean;
  /** 재생 아이콘 표시 (비디오용) */
  playIcon?: boolean;
  /** 실패 시 대체 콘텐츠 */
  fallback?: string | ReactNode;
  /** 오버레이 콘텐츠 */
  overlay?: ReactNode;
  /** 클릭 핸들러 */
  onPress?: () => void;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

const aspectRatioMap: Record<ThumbnailAspectRatio, number> = {
  '1:1': 1,
  '16:9': 16 / 9,
  '4:3': 4 / 3,
  '3:2': 3 / 2,
  '2:1': 2,
  '9:16': 9 / 16,
  '3:4': 3 / 4,
};

export function Thumbnail({
  src,
  alt = '',
  aspectRatio = '1:1',
  size,
  radius = true,
  border = false,
  playIcon = false,
  fallback,
  overlay,
  onPress,
  style,
}: ThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  const containerStyle: ViewStyle = {
    position: 'relative',
    width: size || '100%',
    aspectRatio: aspectRatioMap[aspectRatio],
    overflow: 'hidden',
    borderRadius: radius ? 12 : 0,
    borderWidth: border ? 1 : 0,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    ...style,
  };

  const imageStyle: ImageStyle = {
    width: '100%',
    height: '100%',
  };

  const overlayContainerStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const playIconContainerStyle: ViewStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const fallbackContainerStyle: ViewStyle = {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  };

  const fallbackTextStyle = {
    color: '#94a3b8',
    fontSize: 14,
  };

  const content = (
    <View style={containerStyle}>
      {hasError ? (
        <View style={fallbackContainerStyle}>
          {typeof fallback === 'string' ? (
            <Text style={fallbackTextStyle}>{fallback || 'Image unavailable'}</Text>
          ) : (
            fallback || <Text style={fallbackTextStyle}>Image unavailable</Text>
          )}
        </View>
      ) : (
        <>
          <Image
            source={src}
            style={imageStyle}
            resizeMode="cover"
            onError={() => setHasError(true)}
            accessibilityLabel={alt}
          />
          {overlay && <View style={overlayContainerStyle}>{overlay}</View>}
          {playIcon && (
            <View style={playIconContainerStyle}>
              <View style={styles.playTriangle} />
            </View>
          )}
        </>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={alt}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  playTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderLeftColor: 'white',
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    marginLeft: 3,
  },
});
