/**
 * ActionArea Component (React Native)
 *
 * @description 모달, 바텀시트, 화면 하단에서 버튼 그룹을 제공하는 컴포넌트입니다.
 * 스크롤 시 하단에 고정되며, 상단 그라데이션으로 콘텐츠가 자연스럽게 페이드됩니다.
 *
 * ActionArea는 Button, TextButton 컴포넌트를 children으로 받아 레이아웃을 구성합니다.
 * @see docs/components/ActionArea.md - AI용 상세 가이드
 *
 * @example
 * <ActionArea variant="strong" position="absolute">
 *   <Button buttonType="filled" color="brandDefault" onPress={() => {}}>
 *     확인
 *   </Button>
 *   <Button buttonType="outlined" color="brandDefault" onPress={() => {}}>
 *     취소
 *   </Button>
 * </ActionArea>
 */

import React, { forwardRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

// ============================================
// Types
// ============================================

export type ActionAreaVariant = 'strong' | 'neutral' | 'compact';
export type ActionAreaPosition = 'static' | 'absolute';

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
  /** 버튼 요소들 (Button, TextButton 컴포넌트) */
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

    // Process children to add layout="fillWidth" for non-vertical layouts
    const processedChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // Check if it's a Button component (not TextButton)
        const childType = child.type as { displayName?: string };
        const isButton = childType.displayName === 'Button';
        const isTextButton = childType.displayName === 'TextButton';

        // Type the child props
        const childProps = child.props as { layout?: string; style?: ViewStyle };

        if (isButton) {
          // In non-compact horizontal layouts, buttons should fill width equally
          // In vertical layout, buttons should also fill width
          const shouldFillWidth = !isCompact;
          return React.cloneElement(child as React.ReactElement<{ layout?: string; style?: ViewStyle }>, {
            layout: shouldFillWidth ? 'fillWidth' : childProps.layout,
            style: {
              ...childProps.style,
              // In horizontal layouts, each button gets flex: 1 for equal width
              ...((!isVertical && !isCompact) && { flex: 1 }),
            },
          });
        }

        if (isTextButton) {
          // TextButton should be centered in the container
          return React.cloneElement(child as React.ReactElement<{ style?: ViewStyle }>, {
            style: {
              ...childProps.style,
              alignSelf: 'center',
            },
          });
        }
      }
      return child;
    });

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
          <View style={buttonContainerStyle}>{processedChildren}</View>
        </View>
      </View>
    );
  }
);

ActionArea.displayName = 'ActionArea';

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
