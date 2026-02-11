/**
 * Card Component (React Native)
 *
 * @description 콘텐츠에 대한 정보를 간략하게 표현하는 카드 요소입니다.
 * 이미지, 텍스트, 뱃지 등 다양한 요소를 조합하여 정보를 시각적으로 일관성 있게 전달합니다.
 * Montage 디자인 시스템 패턴을 따릅니다.
 * @see docs/components/Card.md - AI용 상세 가이드
 *
 * @example
 * // Container mode (기존)
 * <Card variant="elevated" padding="medium">
 *   <Text>콘텐츠</Text>
 * </Card>
 *
 * // Content card mode (Montage)
 * <Card
 *   thumbnail={{ uri: 'https://example.com/image.jpg' }}
 *   heading="제목"
 *   caption="설명"
 * />
 */

import { forwardRef, type ReactNode } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  type ViewStyle,
  type PressableProps,
  type ImageSourcePropType,
} from 'react-native';
import { colors, palette } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps extends Omit<PressableProps, 'children' | 'style'> {
  /** 카드 스타일 - elevated(그림자), outlined(테두리), filled(채워진 배경) */
  variant?: CardVariant;
  /** 내부 패딩 크기 (container mode에서 사용) */
  padding?: CardPadding;
  /** 자식 요소 */
  children?: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 식별자 */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;

  // --- Montage Content Card Props ---

  /** 썸네일 이미지 소스 */
  thumbnail?: ImageSourcePropType;
  /** 썸네일 비율 (기본: 3/2) */
  thumbnailAspectRatio?: number;
  /** 썸네일 위 오버레이 캡션 */
  overlayCaption?: string;
  /** 토글 아이콘 (북마크, 좋아요 등) */
  toggleIcon?: ReactNode;
  /** 토글 아이콘 press 핸들러 */
  onTogglePress?: () => void;
  /** Heading 상단 커스텀 콘텐츠 */
  topContent?: ReactNode;
  /** 메인 제목 */
  heading?: string;
  /** 제목 최대 줄 수 (기본: 2) */
  headingNumberOfLines?: number;
  /** 설명 텍스트 */
  caption?: string;
  /** 설명 최대 줄 수 (기본: 1) */
  captionNumberOfLines?: number;
  /** 보조 설명 */
  subCaption?: string;
  /** 추가 설명 */
  extraCaption?: string;
  /** Caption 하단 커스텀 콘텐츠 */
  bottomContent?: ReactNode;
  /** 카드 너비 */
  width?: number;
}

const paddingStyles: Record<CardPadding, number> = {
  none: 0,
  small: spacing.primitive[3],                  // 12px
  medium: spacing.component.card.padding.md,    // 20px
  large: spacing.component.card.padding.lg,     // 24px
};

const variantStyles: Record<CardVariant, {
  bg: string;
  bgPressed: string;
  border?: string;
  shadow?: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}> = {
  elevated: {
    bg: colors.surface.base.default,
    bgPressed: colors.surface.base.alternative,
    shadow: {
      shadowColor: palette.static.black,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
  },
  outlined: {
    bg: colors.surface.base.default,
    bgPressed: colors.surface.base.alternative,
    border: colors.border.base.default,
  },
  filled: {
    bg: colors.surface.base.default,
    bgPressed: colors.surface.base.alternative,
  },
};

/**
 * Thumbnail section with optional overlay and toggle icon
 */
function CardThumbnail({
  source,
  aspectRatio,
  overlayCaption,
  toggleIcon,
  onTogglePress,
}: {
  source: ImageSourcePropType;
  aspectRatio: number;
  overlayCaption?: string;
  toggleIcon?: ReactNode;
  onTogglePress?: () => void;
}) {
  return (
    <View style={{
      width: '100%' as any,
      aspectRatio,
      overflow: 'hidden',
      borderTopLeftRadius: radius.component.card.sm,  // 12px
      borderTopRightRadius: radius.component.card.sm, // 12px
    }}>
      <Image
        source={source}
        style={{
          width: '100%' as any,
          height: '100%' as any,
        }}
        resizeMode="cover"
      />

      {/* Overlay caption */}
      {overlayCaption && (
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: spacing.semantic.inset.xs, // 12px
          paddingVertical: spacing.primitive[2],         // 8px
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
        }}>
          <Text style={{
            fontFamily: typography.fontFamily.base,
            fontSize: typography.fontSize.xs,   // 12px (closest to Montage 13px)
            fontWeight: typography.fontWeight.semibold,
            color: palette.static.white,
            lineHeight: typography.fontSize.xs * 1.5,
          }}>
            {overlayCaption}
          </Text>
        </View>
      )}

      {/* Toggle icon (bookmark, favorite) */}
      {toggleIcon && (
        <Pressable
          onPress={onTogglePress}
          hitSlop={spacing.primitive[2]} // 8px
          style={{
            position: 'absolute',
            top: spacing.primitive[3],   // 12px
            right: spacing.primitive[3], // 12px
            width: spacing.primitive[6], // 24px
            height: spacing.primitive[6],
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {toggleIcon}
        </Pressable>
      )}
    </View>
  );
}

/**
 * Content section with heading, caption, and custom content areas
 */
function CardContent({
  topContent,
  heading,
  headingNumberOfLines,
  caption,
  captionNumberOfLines,
  subCaption,
  extraCaption,
  bottomContent,
}: {
  topContent?: ReactNode;
  heading?: string;
  headingNumberOfLines: number;
  caption?: string;
  captionNumberOfLines: number;
  subCaption?: string;
  extraCaption?: string;
  bottomContent?: ReactNode;
}) {
  return (
    <View style={{
      paddingHorizontal: spacing.component.card.padding.md, // 20px
      paddingTop: spacing.primitive[3],                     // 12px
      paddingBottom: spacing.primitive[4],                  // 16px
    }}>
      {/* ── Top content (badges) ── */}
      {topContent && (
        <View style={{ marginBottom: spacing.primitive[2] }}>
          {topContent}
        </View>
      )}

      {/* ── Primary group: Heading + Caption (tight 2px gap) ── */}
      {heading && (
        <Text
          numberOfLines={headingNumberOfLines}
          style={{
            fontFamily: typography.fontFamily.base,
            fontSize: typography.fontSize.md,         // 16px
            fontWeight: typography.fontWeight.bold,    // 700
            color: colors.content.base.default,
            lineHeight: 22,
            letterSpacing: -0.2,
            marginBottom: caption ? 2 : 0,            // 2px tight bond with caption
          }}
        >
          {heading}
        </Text>
      )}

      {caption && (
        <Text
          numberOfLines={captionNumberOfLines}
          style={{
            fontFamily: typography.fontFamily.base,
            fontSize: 14,
            fontWeight: typography.fontWeight.medium,  // 500
            color: colors.content.base.secondary,
            lineHeight: 20,
            letterSpacing: -0.1,
          }}
        >
          {caption}
        </Text>
      )}

      {/* ── Group separator: 8px between primary and secondary ── */}
      {(subCaption || extraCaption) && (
        <View style={{ marginTop: spacing.primitive[2] }}>
          {/* ── Secondary group: SubCaption + ExtraCaption (tight 2px gap) ── */}
          {subCaption && (
            <Text
              numberOfLines={1}
              style={{
                fontFamily: typography.fontFamily.base,
                fontSize: 13,
                fontWeight: typography.fontWeight.regular, // 400
                color: colors.content.base.assistive,
                lineHeight: 18,
                letterSpacing: -0.05,
                marginBottom: extraCaption ? 2 : 0,       // 2px tight bond
              }}
            >
              {subCaption}
            </Text>
          )}
          {extraCaption && (
            <Text
              numberOfLines={1}
              style={{
                fontFamily: typography.fontFamily.base,
                fontSize: 13,
                fontWeight: typography.fontWeight.regular, // 400
                color: colors.content.base.assistive,
                lineHeight: 18,
                letterSpacing: -0.05,
              }}
            >
              {extraCaption}
            </Text>
          )}
        </View>
      )}

      {/* ── Bottom content: 12px clear separation ── */}
      {bottomContent && (
        <View style={{ marginTop: spacing.primitive[3] }}>
          {bottomContent}
        </View>
      )}
    </View>
  );
}

export const Card = forwardRef<View, CardProps>(
  (
    {
      variant = 'filled',
      padding = 'medium',
      disabled = false,
      children,
      style,
      onPress,
      // Montage props
      thumbnail,
      thumbnailAspectRatio = 3 / 2,
      overlayCaption,
      toggleIcon,
      onTogglePress,
      topContent,
      heading,
      headingNumberOfLines = 2,
      caption,
      captionNumberOfLines = 1,
      subCaption,
      extraCaption,
      bottomContent,
      width,
      ...props
    },
    ref
  ) => {
    const isContentCard = !!(thumbnail || heading || caption);
    const isClickable = !!onPress && !disabled;
    const variantStyle = variantStyles[variant];

    const baseStyle: ViewStyle = {
      borderRadius: radius.component.card.sm, // 12px
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
      ...(width !== undefined && { width }),
      // Container mode: use padding prop. Content card mode: no container padding.
      ...(!isContentCard && { padding: paddingStyles[padding] }),
    };

    // Build the inner content
    const innerContent = isContentCard ? (
      <>
        {thumbnail && (
          <CardThumbnail
            source={thumbnail}
            aspectRatio={thumbnailAspectRatio}
            overlayCaption={overlayCaption}
            toggleIcon={toggleIcon}
            onTogglePress={onTogglePress}
          />
        )}
        {(heading || caption || topContent || bottomContent) && (
          <CardContent
            topContent={topContent}
            heading={heading}
            headingNumberOfLines={headingNumberOfLines}
            caption={caption}
            captionNumberOfLines={captionNumberOfLines}
            subCaption={subCaption}
            extraCaption={extraCaption}
            bottomContent={bottomContent}
          />
        )}
        {children && (
          <View style={{
            paddingHorizontal: spacing.component.card.padding.md, // 20px
            paddingBottom: spacing.primitive[4],                  // 16px
          }}>
            {children}
          </View>
        )}
      </>
    ) : (
      children
    );

    // Pressable (clickable) card
    if (isClickable) {
      return (
        <Pressable
          ref={ref}
          disabled={disabled}
          onPress={onPress}
          style={({ pressed }) => {
            const backgroundColor = pressed ? variantStyle.bgPressed : variantStyle.bg;
            const borderStyle = variant === 'outlined'
              ? { borderWidth: 1, borderColor: variantStyle.border }
              : {};
            const shadowStyle = variant === 'elevated' ? variantStyle.shadow : {};

            return [
              baseStyle,
              {
                backgroundColor,
                ...borderStyle,
                ...shadowStyle,
              },
              style,
            ];
          }}
          {...props}
        >
          {innerContent}
        </Pressable>
      );
    }

    // Static (non-clickable) card
    const staticStyle: ViewStyle = {
      ...baseStyle,
      backgroundColor: variantStyle.bg,
      ...(variant === 'outlined' && { borderWidth: 1, borderColor: variantStyle.border }),
      ...(variant === 'elevated' && variantStyle.shadow),
    };

    return (
      <View ref={ref} style={[staticStyle, style]} {...props}>
        {innerContent}
      </View>
    );
  }
);

Card.displayName = 'Card';
