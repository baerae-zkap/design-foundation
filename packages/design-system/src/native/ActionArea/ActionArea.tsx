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

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
  Platform,
  type ViewProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

// ============================================
// Types
// ============================================

export type ActionAreaVariant = 'strong' | 'neutral' | 'compact';
export type ActionAreaPosition = 'static' | 'absolute' | 'fixed';
export type ActionAreaAnimation = 'slide' | 'fade' | 'scale';

export interface ActionAreaProps extends ViewProps {
  /** 레이아웃 variant - strong(세로/메인상단), neutral(가로/균등), compact(가로/우측정렬) */
  variant?: ActionAreaVariant;
  /** 위치 설정 - static(기본), absolute(하단고정), fixed(하단고정 + 전체폭) */
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
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 스크롤 시 숨김 (스크롤 다운: 숨김, 스크롤 업: 표시) */
  hideOnScroll?: boolean;
  /** hideOnScroll 사용 시 필요한 스크롤 Y 위치 Animated.Value */
  scrollY?: Animated.Value;
  /** 키보드 위에 고정 (키보드가 나타나면 그 위로 이동) */
  fixedAboveKeyboard?: boolean;
  /** 지연 후 애니메이션과 함께 표시 */
  showAfterDelay?: {
    animation: ActionAreaAnimation;
    delay: number;
  };
  /** 상단 추가 콘텐츠 (버튼 위에 표시, 예: 가격 요약) */
  topAccessory?: React.ReactNode;
  /** 하단 추가 콘텐츠 (버튼 아래에 표시, 예: 면책 조항) */
  bottomAccessory?: React.ReactNode;
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

// Tokens are imported from '../../tokens/spacing'

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
      backgroundColor = colors.surface.base.default,
      children,
      style,
      testID,
      accessibilityLabel,
      hideOnScroll = false,
      scrollY,
      fixedAboveKeyboard = false,
      showAfterDelay,
      topAccessory,
      bottomAccessory,
      ...props
    },
    ref
  ) => {
    const insets = useSafeArea ? useSafeAreaInsets() : { bottom: 0 };
    const isVertical = variant === 'strong';
    const isCompact = variant === 'compact';
    const isFixed = position === 'fixed' || position === 'absolute';

    // Animation values
    const translateY = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(showAfterDelay ? 0 : 1)).current;
    const scale = useRef(new Animated.Value(showAfterDelay ? 0.8 : 1)).current;
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const lastScrollY = useRef(0);

    // Entry animation
    useEffect(() => {
      if (showAfterDelay) {
        const timer = setTimeout(() => {
          const animations: Animated.CompositeAnimation[] = [];

          if (showAfterDelay.animation === 'slide') {
            translateY.setValue(100);
            animations.push(
              Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              })
            );
          }

          if (showAfterDelay.animation === 'fade' || showAfterDelay.animation === 'scale') {
            animations.push(
              Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
              })
            );
          }

          if (showAfterDelay.animation === 'scale') {
            animations.push(
              Animated.spring(scale, {
                toValue: 1,
                useNativeDriver: true,
                damping: 15,
                stiffness: 150,
              })
            );
          }

          Animated.parallel(animations).start();
        }, showAfterDelay.delay);

        return () => clearTimeout(timer);
      }
    }, [showAfterDelay, translateY, opacity, scale]);

    // Scroll hide/show behavior
    useEffect(() => {
      if (hideOnScroll && scrollY) {
        const listenerId = scrollY.addListener(({ value }) => {
          const diff = value - lastScrollY.current;
          lastScrollY.current = value;

          if (diff > 5) {
            // Scrolling down - hide
            Animated.timing(translateY, {
              toValue: 100,
              duration: 200,
              useNativeDriver: true,
            }).start();
          } else if (diff < -5) {
            // Scrolling up - show
            Animated.timing(translateY, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
        });

        return () => scrollY.removeListener(listenerId);
      }
    }, [hideOnScroll, scrollY, translateY]);

    // Keyboard avoidance
    useEffect(() => {
      if (fixedAboveKeyboard && isFixed) {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showListener = Keyboard.addListener(showEvent, (e) => {
          setKeyboardHeight(e.endCoordinates.height);
        });

        const hideListener = Keyboard.addListener(hideEvent, () => {
          setKeyboardHeight(0);
        });

        return () => {
          showListener.remove();
          hideListener.remove();
        };
      }
    }, [fixedAboveKeyboard, isFixed]);

    const containerStyle: ViewStyle = {
      ...(isFixed && {
        position: 'absolute',
        bottom: keyboardHeight,
        left: 0,
        right: 0,
      }),
    };

    const innerStyle: ViewStyle = {
      padding: spacing.component.bottomSheet.padding,
      paddingBottom: spacing.component.bottomSheet.padding + insets.bottom,
      backgroundColor,
    };

    const buttonContainerStyle: ViewStyle = {
      flexDirection: isVertical ? 'column' : 'row',
      gap: spacing.component.modal.buttonGap,
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

    const animatedStyle: Animated.AnimatedProps<ViewStyle> = {
      transform: [
        { translateY },
        ...(showAfterDelay?.animation === 'scale' ? [{ scale }] : []),
      ],
      opacity,
    };

    return (
      <Animated.View
        ref={ref}
        style={[containerStyle, animatedStyle, style]}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        {...props}
      >
        {/* Gradient Overlay */}
        {showGradient && (
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
          {/* Top Accessory */}
          {topAccessory && (
            <View style={{ marginBottom: spacing.component.modal.buttonGap }}>
              {topAccessory}
            </View>
          )}

          {/* Caption */}
          {caption && (
            <Text style={styles.caption}>{caption}</Text>
          )}

          {/* Buttons */}
          <View style={buttonContainerStyle}>{processedChildren}</View>

          {/* Bottom Accessory */}
          {bottomAccessory && (
            <View style={{ marginTop: spacing.component.modal.buttonGap }}>
              {bottomAccessory}
            </View>
          )}
        </View>
      </Animated.View>
    );
  }
);

ActionArea.displayName = 'ActionArea';

// ============================================
// Styles
// ============================================

const styles = StyleSheet.create({
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.secondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: spacing.component.modal.buttonGap,
  },
});
