/**
 * IconButton Component (React Native)
 *
 * @description 아이콘만으로 구성된 원형 버튼입니다.
 * @see docs/components/IconButton.md - AI용 상세 가이드
 *
 * @example
 * <IconButton
 *   variant="filled"
 *   color="brandDefault"
 *   size="medium"
 *   onPress={() => {}}
 * >
 *   <PlusIcon />
 * </IconButton>
 */

import { forwardRef, type ReactNode } from 'react';
import { Pressable, View, type PressableProps, type ViewStyle } from 'react-native';

export type IconButtonVariant = 'filled' | 'ghost' | 'outlined';
export type IconButtonColor = 'brandDefault' | 'baseDefault' | 'errorDefault';
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** 버튼 스타일 - filled(채워진), ghost(투명), outlined(테두리) */
  variant?: IconButtonVariant;
  /** 색상 테마 */
  color?: IconButtonColor;
  /** 버튼 크기 */
  size?: IconButtonSize;
  /** 아이콘 콘텐츠 */
  children: ReactNode;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

// Size: button size, icon size
const sizeStyles: Record<IconButtonSize, { size: number; iconSize: number }> = {
  small: { size: 32, iconSize: 18 },
  medium: { size: 40, iconSize: 22 },
  large: { size: 48, iconSize: 26 },
};

const colorStyles: Record<IconButtonColor, {
  filled: { bg: string; bgPressed: string; color: string };
  ghost: { bg: string; bgPressed: string; color: string; colorPressed: string };
  outlined: { bg: string; bgPressed: string; color: string; border: string };
}> = {
  brandDefault: {
    filled: {
      bg: '#2563eb', // surface.brand.default (palette.blue.50)
      bgPressed: '#1d4ed8', // surface.brand.defaultPressed (palette.blue.45)
      color: 'white' // content.base.onColor (palette.static.white)
    },
    ghost: {
      bg: 'transparent',
      bgPressed: 'rgba(37, 99, 235, 0.12)', // brand pressed overlay
      color: '#2563eb', // content.brand.default (palette.blue.50)
      colorPressed: '#1d4ed8' // content.brand.pressed (palette.blue.45)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#eff6ff', // surface.brand.secondary light (palette.blue.98)
      color: '#2563eb', // content.brand.default (palette.blue.50)
      border: '#2563eb' // border.brand.default (palette.blue.50)
    },
  },
  baseDefault: {
    filled: {
      bg: '#334155', // surface.base.default filled (palette.grey.30)
      bgPressed: '#1e293b', // surface.base.defaultPressed (palette.grey.20)
      color: 'white' // content.base.onColor (palette.static.white)
    },
    ghost: {
      bg: 'transparent',
      bgPressed: 'rgba(0, 0, 0, 0.08)', // base pressed overlay
      color: '#334155', // content.base.default (palette.grey.30)
      colorPressed: '#1e293b' // content.base.pressed (palette.grey.20)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#f8fafc', // surface.base.alternative (palette.grey.99)
      color: '#334155', // content.base.default (palette.grey.30)
      border: '#cbd5e1' // border.base.default (palette.grey.90)
    },
  },
  errorDefault: {
    filled: {
      bg: '#ef4444', // surface.error.default (palette.red.50)
      bgPressed: '#dc2626', // surface.error.defaultPressed (palette.red.45)
      color: 'white' // content.base.onColor (palette.static.white)
    },
    ghost: {
      bg: 'transparent',
      bgPressed: 'rgba(239, 68, 68, 0.12)', // error pressed overlay
      color: '#ef4444', // content.error.default (palette.red.50)
      colorPressed: '#dc2626' // content.error.pressed (palette.red.45)
    },
    outlined: {
      bg: 'white', // surface.base.default (palette.static.white)
      bgPressed: '#fef2f2', // surface.error.secondary (palette.red.98)
      color: '#dc2626', // content.error.strong (palette.red.45)
      border: '#ef4444' // border.error.default (palette.red.50)
    },
  },
};

export const IconButton = forwardRef<View, IconButtonProps>(
  (
    {
      variant = 'ghost',
      color = 'baseDefault',
      size = 'medium',
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeStyles[size];
    const colorStyle = colorStyles[color][variant];

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled: disabled ?? undefined }}
        hitSlop={8}
        style={({ pressed }) => {
          // Determine background color based on state
          let backgroundColor: string;
          if (variant === 'ghost') {
            const ghostStyle = colorStyle as typeof colorStyles.brandDefault.ghost;
            backgroundColor = pressed ? ghostStyle.bgPressed : ghostStyle.bg;
          } else if (variant === 'filled') {
            const filledStyle = colorStyle as typeof colorStyles.brandDefault.filled;
            backgroundColor = pressed ? filledStyle.bgPressed : filledStyle.bg;
          } else {
            const outlinedStyle = colorStyle as typeof colorStyles.brandDefault.outlined;
            backgroundColor = pressed ? outlinedStyle.bgPressed : outlinedStyle.bg;
          }

          const borderStyle = variant === 'outlined'
            ? { borderWidth: 1, borderColor: (colorStyle as typeof colorStyles.brandDefault.outlined).border }
            : {};

          return [
            {
              width: sizeStyle.size,
              height: sizeStyle.size,
              borderRadius: 9999, // radius.primitive.full (perfect circle)
              backgroundColor,
              alignItems: 'center' as const,
              justifyContent: 'center' as const,
              opacity: disabled ? 0.5 : 1,
              ...borderStyle,
            },
            style,
          ];
        }}
        {...props}
      >
        {({ pressed }) => {
          // Determine icon color based on state
          let iconColor: string;
          if (variant === 'ghost') {
            const ghostStyle = colorStyle as typeof colorStyles.brandDefault.ghost;
            iconColor = pressed ? ghostStyle.colorPressed : ghostStyle.color;
          } else {
            iconColor = (colorStyle as typeof colorStyles.brandDefault.filled).color;
          }

          return (
            <View
              style={{
                width: sizeStyle.iconSize,
                height: sizeStyle.iconSize,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {children}
            </View>
          );
        }}
      </Pressable>
    );
  }
);

IconButton.displayName = 'IconButton';
