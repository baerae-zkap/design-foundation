/**
 * Card Component (React Native)
 *
 * @description 콘텐츠를 담는 카드 컨테이너입니다.
 * @see docs/components/Card.md - AI용 상세 가이드
 *
 * @example
 * <Card
 *   variant="elevated"
 *   padding="medium"
 *   onPress={() => {}}
 * >
 *   <Text>Card Title</Text>
 *   <Text>Card content...</Text>
 * </Card>
 */

import { forwardRef, type ReactNode } from 'react';
import { View, Pressable, type ViewStyle, type PressableProps } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';
export type CardPadding = 'none' | 'small' | 'medium' | 'large';

export interface CardProps extends Omit<PressableProps, 'children' | 'style'> {
  /** 카드 스타일 - elevated(그림자), outlined(테두리), filled(채워진 배경) */
  variant?: CardVariant;
  /** 내부 패딩 크기 */
  padding?: CardPadding;
  /** 자식 요소 */
  children: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

const paddingStyles: Record<CardPadding, number> = {
  none: 0,
  small: 12,   // primitive.3
  medium: 20,  // card.padding.md
  large: 24,   // card.padding.lg
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
    bg: 'white', // surface.base.default (static.white)
    bgPressed: '#f8fafc', // surface.base.alternative (palette.grey.99)
    shadow: {
      shadowColor: '#000', // static.black
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2, // Android elevation
    },
  },
  outlined: {
    bg: 'white', // surface.base.default (static.white)
    bgPressed: '#f8fafc', // surface.base.alternative (palette.grey.99)
    border: '#e2e8f0', // border.base.default (palette.grey.95)
  },
  filled: {
    bg: '#f8fafc', // surface.base.alternative (palette.grey.99)
    bgPressed: '#e2e8f0', // border.base.default (palette.grey.95) - pressed state darker
  },
};

export const Card = forwardRef<View, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'medium',
      disabled = false,
      children,
      style,
      onPress,
      ...props
    },
    ref
  ) => {
    const isClickable = !!onPress && !disabled;
    const variantStyle = variantStyles[variant];

    const baseStyle: ViewStyle = {
      borderRadius: 12, // card.sm (radius.semantic.card.sm)
      padding: paddingStyles[padding],
      opacity: disabled ? 0.5 : 1,
    };

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
          {children}
        </Pressable>
      );
    }

    const staticStyle: ViewStyle = {
      ...baseStyle,
      backgroundColor: variantStyle.bg,
      ...(variant === 'outlined' && { borderWidth: 1, borderColor: variantStyle.border }),
      ...(variant === 'elevated' && variantStyle.shadow),
    };

    return (
      <View ref={ref} style={[staticStyle, style]} {...props}>
        {children}
      </View>
    );
  }
);

Card.displayName = 'Card';
