/**
 * ListCard Component (React Native)
 *
 * @description 리스트 형태의 카드 컴포넌트입니다. 썸네일, 콘텐츠, 액션 영역으로 구성됩니다.
 * @see docs/components/ListCard.md - AI용 상세 가이드
 *
 * @example
 * <ListCard
 *   thumbnail={<Image source={{ uri: 'product.jpg' }} />}
 *   title="상품명"
 *   subtitle="상품 설명"
 *   meta="₩59,000"
 *   onPress={() => {}}
 * />
 */

import React, { forwardRef, type ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ListCardSize = 'small' | 'medium' | 'large';
export type ListCardVariant = 'elevated' | 'outlined' | 'filled';

export interface ListCardProps extends Omit<ViewProps, 'style'> {
  /** 카드 스타일 */
  variant?: ListCardVariant;
  /** 크기 */
  size?: ListCardSize;
  /** 좌측 썸네일 영역 */
  thumbnail?: ReactNode;
  /** 메인 타이틀 */
  title: ReactNode;
  /** 서브타이틀 */
  subtitle?: ReactNode;
  /** 메타 정보 (가격, 날짜 등) */
  meta?: ReactNode;
  /** 우측 액션 영역 */
  action?: ReactNode;
  /** 상단 뱃지 영역 */
  badges?: ReactNode;
  /** 하단 커스텀 콘텐츠 */
  bottomContent?: ReactNode;
  /** 하단 구분선 표시 */
  divider?: boolean;
  /** 탭 핸들러 */
  onPress?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
}

// Size configurations
const sizeConfig: Record<ListCardSize, {
  padding: number;
  thumbnailSize: number;
  gap: number;
  titleSize: number;
  subtitleSize: number;
  metaSize: number;
}> = {
  small: {
    padding: spacing.primitive[3], // 12px
    thumbnailSize: 56,
    gap: spacing.primitive[3], // 12px
    titleSize: 14,
    subtitleSize: typography.fontSize.xs, // 12px
    metaSize: 14,
  },
  medium: {
    padding: spacing.component.list.itemPaddingY, // 16px
    thumbnailSize: 80,
    gap: spacing.primitive[3], // 12px
    titleSize: typography.fontSize.md, // 16px
    subtitleSize: 14,
    metaSize: typography.fontSize.md, // 16px for price
  },
  large: {
    padding: spacing.component.list.itemPaddingY, // 16px
    thumbnailSize: 100,
    gap: spacing.primitive[4], // 16px
    titleSize: 17,
    subtitleSize: 14,
    metaSize: 17,
  },
};

// Variant styles
const getVariantStyle = (variant: ListCardVariant, pressed: boolean = false): ViewStyle => {
  const pressedBg = pressed ? colors.fill.alternative : undefined;

  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: pressedBg || colors.surface.base.default,
        shadowColor: palette.static.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      };
    case 'outlined':
      return {
        backgroundColor: pressedBg || colors.surface.base.default,
        borderWidth: 1,
        borderColor: colors.border.base.default,
      };
    case 'filled':
      return {
        backgroundColor: pressed ? colors.surface.base.alternative : colors.surface.base.default,
      };
    default:
      return {};
  }
};

export const ListCard = forwardRef<View, ListCardProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      thumbnail,
      title,
      subtitle,
      meta,
      action,
      badges,
      bottomContent,
      divider = false,
      onPress,
      disabled = false,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onPress && !disabled;

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: sizeStyle.gap,
      padding: sizeStyle.padding,
      borderRadius: radius.component.card.sm,
      opacity: disabled ? 0.5 : 1,
    };

    const thumbnailContainerStyle: ViewStyle = {
      width: sizeStyle.thumbnailSize,
      height: sizeStyle.thumbnailSize,
      borderRadius: radius.primitive.sm,
      overflow: 'hidden',
      backgroundColor: colors.surface.base.container,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const contentStyle: ViewStyle = {
      flex: 1,
      justifyContent: 'center',
    };

    const titleStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.titleSize,
      fontWeight: typography.fontWeight.bold,
      color: colors.content.base.default,
      lineHeight: sizeStyle.titleSize * 1.35,
      letterSpacing: -0.2,
    };

    const subtitleStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.subtitleSize,
      fontWeight: typography.fontWeight.medium,
      color: colors.content.base.secondary,
      lineHeight: sizeStyle.subtitleSize * 1.4,
      letterSpacing: -0.1,
    };

    const metaStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.metaSize,
      fontWeight: typography.fontWeight.bold,
      color: colors.content.base.default,
      lineHeight: sizeStyle.metaSize * 1.3,
      letterSpacing: -0.2,
    };

    const content = (
      <>
        {/* Thumbnail */}
        {thumbnail && (
          <View style={thumbnailContainerStyle}>
            {thumbnail}
          </View>
        )}

        {/* Content */}
        <View style={contentStyle}>
          {/* Badges */}
          {badges && (
            <View style={{ flexDirection: 'row', gap: spacing.primitive[1], marginBottom: spacing.primitive[1] }}>
              {badges}
            </View>
          )}

          {typeof title === 'string' ? (
            <Text style={[titleStyle, { marginBottom: subtitle ? 2 : 0 }]} numberOfLines={2}>{title}</Text>
          ) : (
            title
          )}
          {subtitle && (
            typeof subtitle === 'string' ? (
              <Text style={subtitleStyle} numberOfLines={1}>{subtitle}</Text>
            ) : (
              subtitle
            )
          )}
          {meta && (
            <View style={{ marginTop: spacing.primitive[2] }}>
              {typeof meta === 'string' ? (
                <Text style={metaStyle}>{meta}</Text>
              ) : (
                meta
              )}
            </View>
          )}
          {bottomContent && (
            <View style={{ marginTop: spacing.primitive[3] }}>
              {bottomContent}
            </View>
          )}
        </View>

        {/* Action */}
        {action && (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {action}
          </View>
        )}
      </>
    );

    const card = isInteractive ? (
      <Pressable
        ref={ref as React.Ref<View>}
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          containerStyle,
          getVariantStyle(variant, pressed),
          style,
        ]}
        {...props}
      >
        {content}
      </Pressable>
    ) : (
      <View ref={ref} style={[containerStyle, getVariantStyle(variant), style]} {...props}>
        {content}
      </View>
    );

    if (divider) {
      return (
        <View>
          {card}
          <View style={{
            height: 1,
            backgroundColor: colors.border.base.default,
            marginLeft: sizeStyle.padding + (thumbnail ? sizeStyle.thumbnailSize + sizeStyle.gap : 0),
          }} />
        </View>
      );
    }

    return card;
  }
);

ListCard.displayName = 'ListCard';
