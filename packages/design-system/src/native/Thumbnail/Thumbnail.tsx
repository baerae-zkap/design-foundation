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
import { View, Image, Pressable, Text, type ImageSourcePropType, type ViewStyle, type ImageStyle } from 'react-native';
import { Play, ImageOff } from 'lucide-react-native';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius as radiusTokens } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ThumbnailAspectRatio =
  | '1:1' | '5:4' | '4:3' | '3:2' | '16:10' | '1.618:1' | '16:9' | '2:1' | '21:9'
  | '4:5' | '3:4' | '2:3' | '10:16' | '1:1.618' | '9:16' | '1:2' | '9:21';

export interface ThumbnailProps {
  /** 이미지 소스 (React Native ImageSourcePropType) */
  src: ImageSourcePropType;
  /** 대체 텍스트 */
  alt?: string;
  /** 종횡비 */
  aspectRatio?: ThumbnailAspectRatio;
  /** 너비 크기 */
  size?: number;
  /** 부모 너비를 가득 채움 (size 무시) */
  fill?: boolean;
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
  /** 테스트 ID */
  testID?: string;
}

const aspectRatioMap: Record<ThumbnailAspectRatio, number> = {
  '1:1': 1,
  '5:4': 5 / 4,
  '4:3': 4 / 3,
  '3:2': 3 / 2,
  '16:10': 16 / 10,
  '1.618:1': 1.618,
  '16:9': 16 / 9,
  '2:1': 2,
  '21:9': 21 / 9,
  '4:5': 4 / 5,
  '3:4': 3 / 4,
  '2:3': 2 / 3,
  '10:16': 10 / 16,
  '1:1.618': 1 / 1.618,
  '9:16': 9 / 16,
  '1:2': 1 / 2,
  '9:21': 9 / 21,
};

export function Thumbnail({
  src,
  alt = '',
  aspectRatio = '1:1',
  size,
  fill = false,
  radius = true,
  border = false,
  playIcon = false,
  fallback,
  overlay,
  onPress,
  style,
  testID,
}: ThumbnailProps) {
  const [hasError, setHasError] = useState(false);

  const containerStyle: ViewStyle = {
    position: 'relative',
    width: fill ? '100%' : (size || '100%'),
    aspectRatio: aspectRatioMap[aspectRatio],
    overflow: 'hidden',
    borderRadius: radius ? radiusTokens.component.card.sm : 0, // 12px
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

  const borderOverlayStyle: ViewStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: border ? 1 : 0,
    borderColor: 'rgba(0, 0, 0, 0.08)', // Transparent border overlay (Montage spec)
    borderRadius: radius ? radiusTokens.component.card.sm : 0,
    pointerEvents: 'none',
  };

  const playIconContainerStyle: ViewStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -28 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // More transparent bg (Montage spec)
    justifyContent: 'center',
    alignItems: 'center',
  };

  const fallbackContainerStyle: ViewStyle = {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface.base.alternative, // palette.grey[99] = #f7f8f9
  };

  const content = (
    <View style={containerStyle} testID={testID}>
      {hasError ? (
        <View style={fallbackContainerStyle}>
          {typeof fallback === 'string' ? (
            <Text style={{ fontFamily: typography.fontFamily.base, color: colors.content.disabled.default, fontSize: typography.fontSize.sm }}>
              {fallback || 'Image unavailable'}
            </Text>
          ) : fallback !== undefined ? (
            fallback
          ) : (
            <ImageOff size={32} color={colors.content.disabled.default} />
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
          {border && <View style={borderOverlayStyle} />}
          {overlay && <View style={overlayContainerStyle}>{overlay}</View>}
          {playIcon && (
            <View style={playIconContainerStyle}>
              <Play size={24} color={palette.static.white} fill={palette.static.white} strokeWidth={0} />
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
