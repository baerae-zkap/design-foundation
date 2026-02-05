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
  /** 탭 핸들러 */
  onPress?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 커스텀 스타일 */
  style?: ViewStyle;
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
    padding: 12,      // primitive.3
    thumbnailSize: 56,
    gap: 12,          // primitive.3
    titleSize: 14,
    subtitleSize: 12,
    metaSize: 13,
  },
  medium: {
    padding: 16,      // primitive.4
    thumbnailSize: 80,
    gap: 12,          // primitive.3
    titleSize: 15,
    subtitleSize: 13,
    metaSize: 14,
  },
  large: {
    padding: 16,      // primitive.4
    thumbnailSize: 100,
    gap: 16,          // primitive.4
    titleSize: 16,
    subtitleSize: 14,
    metaSize: 15,
  },
};

// Variant styles
const getVariantStyle = (variant: ListCardVariant, pressed: boolean = false): ViewStyle => {
  const pressedBg = pressed ? 'rgba(0,0,0,0.02)' : undefined;

  switch (variant) {
    case 'elevated':
      return {
        backgroundColor: pressedBg || 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      };
    case 'outlined':
      return {
        backgroundColor: pressedBg || 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0', // border.base.default
      };
    case 'filled':
      return {
        backgroundColor: pressed ? '#f1f5f9' : '#f8fafc', // surface.base.alternative
      };
    default:
      return {};
  }
};

export const ListCard = forwardRef<View, ListCardProps>(
  (
    {
      variant = 'elevated',
      size = 'medium',
      thumbnail,
      title,
      subtitle,
      meta,
      action,
      badges,
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
      borderRadius: 12, // radius.semantic.card.sm
      opacity: disabled ? 0.5 : 1,
    };

    const thumbnailContainerStyle: ViewStyle = {
      width: sizeStyle.thumbnailSize,
      height: sizeStyle.thumbnailSize,
      borderRadius: 8, // primitive.sm
      overflow: 'hidden',
      backgroundColor: '#f1f5f9', // surface.base.container
      alignItems: 'center',
      justifyContent: 'center',
    };

    const contentStyle: ViewStyle = {
      flex: 1,
      gap: 4, // primitive.1
    };

    const titleStyle: TextStyle = {
      fontSize: sizeStyle.titleSize,
      fontWeight: '600',
      color: '#334155', // content.base.default
      lineHeight: sizeStyle.titleSize * 1.4,
    };

    const subtitleStyle: TextStyle = {
      fontSize: sizeStyle.subtitleSize,
      fontWeight: '400',
      color: '#64748b', // content.base.secondary
      lineHeight: sizeStyle.subtitleSize * 1.4,
    };

    const metaStyle: TextStyle = {
      fontSize: sizeStyle.metaSize,
      fontWeight: '700',
      color: '#334155', // content.base.default
      marginTop: 4,
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
            <View style={{ flexDirection: 'row', gap: 4, marginBottom: 4 }}>
              {badges}
            </View>
          )}

          {typeof title === 'string' ? (
            <Text style={titleStyle} numberOfLines={2}>{title}</Text>
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
            typeof meta === 'string' ? (
              <Text style={metaStyle}>{meta}</Text>
            ) : (
              meta
            )
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

    if (isInteractive) {
      return (
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
      );
    }

    return (
      <View ref={ref} style={[containerStyle, getVariantStyle(variant), style]} {...props}>
        {content}
      </View>
    );
  }
);

ListCard.displayName = 'ListCard';
