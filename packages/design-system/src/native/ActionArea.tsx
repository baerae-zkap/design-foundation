/**
 * ActionArea Component (React Native)
 *
 * @description 모달, 바텀시트, 화면 하단에서 버튼 그룹을 제공하는 컴포넌트입니다.
 * 스크롤 시 하단에 고정되며, 상단 그라데이션으로 콘텐츠가 자연스럽게 페이드됩니다.
 * @see docs/components/ActionArea.md - AI용 상세 가이드
 *
 * @example
 * <ActionArea variant="strong" position="sticky">
 *   <ActionAreaButton variant="main" onPress={() => {}}>
 *     확인
 *   </ActionAreaButton>
 *   <ActionAreaButton variant="alternative" onPress={() => {}}>
 *     취소
 *   </ActionAreaButton>
 * </ActionArea>
 */

import React, { forwardRef } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  type ViewProps,
  type PressableProps,
  type ViewStyle,
  type TextStyle,
  type PressableStateCallbackType,
  type StyleProp,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

// ============================================
// Types
// ============================================

export type ActionAreaVariant = 'strong' | 'neutral' | 'compact';
export type ActionAreaPosition = 'static' | 'absolute';
export type ActionAreaButtonVariant = 'main' | 'alternative' | 'sub';

export interface ActionAreaProps extends ViewProps {
  /** 레이아웃 variant - strong(세로/메인상단), neutral(가로/균등), compact(가로/우측정렬) */
  variant?: ActionAreaVariant;
  /** 위치 설정 - static(기본), absolute(하단고정) */
  position?: ActionAreaPosition;
  /** 상단 그라데이션 표시 여부 */
  showGradient?: boolean;
  /** 그라데이션 높이 */
  gradientHeight?: number;
  /** 캡션 텍스트 (버튼 상단에 표시) */
  caption?: string;
  /** Safe area 하단 패딩 적용 여부 (모바일 홈 인디케이터 영역) */
  useSafeArea?: boolean;
  /** 배경색 */
  backgroundColor?: string;
  /** 버튼 요소들 */
  children: React.ReactNode;
}

export interface ActionAreaButtonProps extends Omit<PressableProps, 'children'> {
  /** 버튼 역할 - main(주요), alternative(대안), sub(보조) */
  variant?: ActionAreaButtonVariant;
  /** 버튼 크기 */
  size?: 'small' | 'medium' | 'large' | 'xLarge';
  /** 로딩 상태 */
  isLoading?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 버튼 텍스트 */
  children: React.ReactNode;
}

// ============================================
// Color Utilities
// ============================================

/**
 * Convert a color to its transparent version (alpha = 0)
 * This prevents the "transparent black" issue in gradients
 * where 'transparent' is interpreted as rgba(0,0,0,0)
 */
function toTransparent(color: string): string {
  // Handle common color names
  if (color === 'white' || color === '#fff' || color === '#ffffff') {
    return 'rgba(255,255,255,0)';
  }
  if (color === 'black' || color === '#000' || color === '#000000') {
    return 'rgba(0,0,0,0)';
  }
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    return `rgba(${r},${g},${b},0)`;
  }
  // Handle rgb/rgba
  if (color.startsWith('rgb')) {
    const match = color.match(/\d+/g);
    if (match) {
      const [r, g, b] = match;
      return `rgba(${r},${g},${b},0)`;
    }
  }
  // Fallback to transparent white
  return 'rgba(255,255,255,0)';
}

// ============================================
// Spacing Tokens (from Foundation)
// ============================================

const tokens = {
  modal: {
    padding: 24,
    buttonGap: 12,
  },
  bottomSheet: {
    padding: 20,
  },
};

// ============================================
// Button Styles
// ============================================

const buttonVariantStyles: Record<ActionAreaButtonVariant, { container: ViewStyle; text: TextStyle }> = {
  main: {
    container: {
      backgroundColor: '#2563eb',
      borderWidth: 0,
    },
    text: {
      color: 'white',
    },
  },
  alternative: {
    container: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#2563eb',
    },
    text: {
      color: '#2563eb',
    },
  },
  sub: {
    container: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    text: {
      color: '#6b7280',
    },
  },
};

const buttonSizeStyles: Record<string, { height: number; fontSize: number; paddingHorizontal: number }> = {
  small: { height: 36, fontSize: 14, paddingHorizontal: 16 },
  medium: { height: 40, fontSize: 14, paddingHorizontal: 16 },
  large: { height: 44, fontSize: 14, paddingHorizontal: 20 },
  xLarge: { height: 48, fontSize: 16, paddingHorizontal: 24 },
};

// ============================================
// ActionArea Component
// ============================================

export const ActionArea = forwardRef<View, ActionAreaProps>(
  (
    {
      variant = 'strong',
      position = 'static',
      showGradient = true,
      gradientHeight = 48,
      caption,
      useSafeArea = true,
      backgroundColor = 'white',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const insets = useSafeArea ? useSafeAreaInsets() : { bottom: 0 };

    const isVertical = variant === 'strong';
    const isCompact = variant === 'compact';

    const containerStyle: ViewStyle = {
      ...(position === 'absolute' && {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }),
    };

    const innerStyle: ViewStyle = {
      padding: tokens.bottomSheet.padding,
      paddingBottom: tokens.bottomSheet.padding + insets.bottom,
      backgroundColor,
    };

    const buttonContainerStyle: ViewStyle = {
      flexDirection: isVertical ? 'column' : 'row',
      gap: tokens.modal.buttonGap,
      ...(isCompact && { justifyContent: 'flex-end' }),
    };

    return (
      <View ref={ref} style={[containerStyle, style]} {...props}>
        {/* Gradient Overlay */}
        {showGradient && position === 'absolute' && (
          <LinearGradient
            colors={[toTransparent(backgroundColor), backgroundColor]}
            style={{
              position: 'absolute',
              top: -gradientHeight,
              left: 0,
              right: 0,
              height: gradientHeight,
            } as ViewStyle}
            pointerEvents="none"
          />
        )}

        {/* Content Area */}
        <View style={innerStyle}>
          {/* Caption */}
          {caption && (
            <Text style={styles.caption}>{caption}</Text>
          )}

          {/* Buttons */}
          <View style={buttonContainerStyle}>{children}</View>
        </View>
      </View>
    );
  }
);

ActionArea.displayName = 'ActionArea';

// ============================================
// ActionAreaButton Component
// ============================================

export const ActionAreaButton = forwardRef<View, ActionAreaButtonProps>(
  (
    {
      variant = 'main',
      size = 'xLarge',
      isLoading = false,
      disabled = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const variantStyle = buttonVariantStyles[variant];
    const sizeStyle = buttonSizeStyles[size];
    const isDisabled = disabled || isLoading;

    const buttonStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      borderRadius: 8,
      opacity: isDisabled ? 0.5 : 1,
      ...(variant === 'sub' ? { alignSelf: 'center' } : { flex: variant === 'main' || variant === 'alternative' ? 1 : undefined }),
      ...variantStyle.container,
      ...(isDisabled && {
        backgroundColor: variant === 'main' ? '#e2e8f0' : 'transparent',
        borderColor: variant === 'alternative' ? '#e2e8f0' : undefined,
      }),
    };

    const textStyle: TextStyle = {
      fontSize: sizeStyle.fontSize,
      fontWeight: '600',
      ...variantStyle.text,
      ...(isDisabled && { color: '#94a3b8' }),
    };

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        style={(state: PressableStateCallbackType): StyleProp<ViewStyle> => [
          buttonStyle,
          state.pressed && { opacity: 0.8 },
          style as ViewStyle,
        ]}
        {...props}
      >
        {isLoading ? (
          <LoadingDots color={variantStyle.text.color as string} />
        ) : (
          <Text style={textStyle}>{children}</Text>
        )}
      </Pressable>
    );
  }
);

ActionAreaButton.displayName = 'ActionAreaButton';

// ============================================
// LoadingDots
// ============================================

function LoadingDots({ color = 'white' }: { color?: string }) {
  return (
    <View style={{ flexDirection: 'row', gap: 4 }}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: color,
            opacity: 0.6,
          }}
        />
      ))}
    </View>
  );
}

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create({
  caption: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: tokens.modal.buttonGap,
  },
});
