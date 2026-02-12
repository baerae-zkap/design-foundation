/**
 * Tooltip Component (React Native)
 *
 * @description 트리거 요소에 앵커된 정보 툴팁 컴포넌트입니다.
 * @see docs/components/Tooltip.md - AI용 상세 가이드
 *
 * @example
 * <Tooltip message="This is a tooltip">
 *   <IconButton variant="ghost" color="secondary" size="small">
 *     <Info />
 *   </IconButton>
 * </Tooltip>
 */

import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
  type ViewStyle,
} from 'react-native';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type TooltipPlacement = 'top' | 'bottom';
export type TooltipSize = 'small' | 'medium';
export type TooltipArrowAlign = 'start' | 'center' | 'end';

export interface TooltipProps {
  /** 트리거 요소 (wraps children) */
  children: React.ReactNode;
  /** 툴팁 텍스트 */
  message: string;
  /** 키보드 단축키 텍스트 */
  shortcut?: string;
  /** 배치 위치 (top | bottom) */
  placement?: TooltipPlacement;
  /** 크기 */
  size?: TooltipSize;
  /** 제어 모드 표시 여부 (always-on 모드) */
  visible?: boolean;
  /** 표시 상태 변경 핸들러 */
  onVisibleChange?: (visible: boolean) => void;
  /** 초기 표시 여부 (uncontrolled mode) */
  defaultVisible?: boolean;
  /** 탭 외부 클릭 시 닫기 */
  dismissible?: boolean;
  /** 화면 가장자리에서 자동으로 위치 전환 */
  autoFlip?: boolean;
  /** 트리거로부터의 거리 (px) */
  offset?: number;
  /** 최대 너비 */
  maxWidth?: number;
  /** 화살표 표시 여부 */
  hasArrow?: boolean;
  /** 화살표 수평 정렬 (start: 좌측, center: 중앙, end: 우측) */
  arrowAlign?: TooltipArrowAlign;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
}

const sizeConfig: Record<
  TooltipSize,
  {
    paddingHorizontal: number;
    paddingVertical: number;
    fontSize: number;
    lineHeight: number;
    minWidth: number;
  }
> = {
  small: {
    paddingHorizontal: spacing.primitive[2], // 8
    paddingVertical: spacing.primitive[1], // 4
    fontSize: typography.fontSize.xs, // 12
    lineHeight: 16,
    minWidth: 36,
  },
  medium: {
    paddingHorizontal: spacing.primitive[3], // 12
    paddingVertical: spacing.primitive[2], // 8
    fontSize: 13,
    lineHeight: 18,
    minWidth: 64,
  },
};

const ARROW_SIZE = 8;

export const Tooltip = forwardRef<View, TooltipProps>(
  (
    {
      children,
      message,
      shortcut,
      placement = 'bottom',
      size = 'medium',
      visible: controlledVisible,
      onVisibleChange,
      defaultVisible = false,
      dismissible = true,
      autoFlip = true,
      offset = 8,
      maxWidth = 280,
      hasArrow = true,
      arrowAlign = 'center',
      style,
      testID,
    },
    ref
  ) => {
    const [internalVisible, setInternalVisible] = useState(defaultVisible);
    const fadeAnim = useRef(new Animated.Value(defaultVisible ? 1 : 0)).current;
    const scaleAnim = useRef(new Animated.Value(defaultVisible ? 1 : 0.95)).current;

    const isControlled = controlledVisible !== undefined;
    const isVisible = isControlled ? controlledVisible : internalVisible;
    const sizeStyle = sizeConfig[size];

    const handlePress = useCallback(() => {
      if (isControlled) return;

      const next = !internalVisible;
      setInternalVisible(next);
      onVisibleChange?.(next);
    }, [isControlled, internalVisible, onVisibleChange]);

    const handleDismiss = useCallback(() => {
      if (isControlled) return;
      setInternalVisible(false);
      onVisibleChange?.(false);
    }, [isControlled, onVisibleChange]);

    // Dismissible: close on outside click (web)
    useEffect(() => {
      if (!isVisible || isControlled || !dismissible || Platform.OS !== 'web') return;

      const handleOutsideClick = () => {
        handleDismiss();
      };

      // Delay listener to avoid the same click that opened the tooltip
      const timer = setTimeout(() => {
        (document as any).addEventListener('pointerdown', handleOutsideClick);
      }, 0);

      return () => {
        clearTimeout(timer);
        (document as any).removeEventListener('pointerdown', handleOutsideClick);
      };
    }, [isVisible, isControlled, dismissible, handleDismiss]);

    // Animation
    useEffect(() => {
      if (isVisible) {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        fadeAnim.setValue(0);
        scaleAnim.setValue(0.95);
      }
    }, [isVisible, fadeAnim, scaleAnim]);

    const totalOffset = offset + (hasArrow ? ARROW_SIZE / 2 : 0);
    const wrapperOverflow = Math.ceil(maxWidth / 2);
    const ARROW_INSET = spacing.primitive[4]; // 16px from bubble edge

    // Horizontal spread & alignment based on arrowAlign
    const horizontalSpread: ViewStyle =
      arrowAlign === 'start'
        ? { left: 0, right: -maxWidth, alignItems: 'flex-start' as const }
        : arrowAlign === 'end'
        ? { left: -maxWidth, right: 0, alignItems: 'flex-end' as const }
        : { left: -wrapperOverflow, right: -wrapperOverflow, alignItems: 'center' as const };

    // Tooltip vertical position (relative to trigger)
    const tooltipPositionStyle: ViewStyle =
      placement === 'top'
        ? { bottom: '100%' as any, marginBottom: totalOffset, ...horizontalSpread }
        : { top: '100%' as any, marginTop: totalOffset, ...horizontalSpread };

    // Arrow vertical position
    const arrowVerticalStyle: ViewStyle =
      placement === 'top'
        ? { bottom: -ARROW_SIZE / 2 }
        : { top: -ARROW_SIZE / 2 };

    // Arrow horizontal position
    const arrowHorizontalStyle: ViewStyle =
      arrowAlign === 'start'
        ? { left: ARROW_INSET }
        : arrowAlign === 'end'
        ? { right: ARROW_INSET }
        : { alignSelf: 'center' as const };

    const arrowPositionStyle: ViewStyle = { ...arrowVerticalStyle, ...arrowHorizontalStyle };

    return (
      <View
        ref={ref}
        style={[styles.container, style]}
        testID={testID}
      >
        {/* Children (trigger element) rendered directly */}
        {children}

        {/* Transparent press overlay to capture taps */}
        {!isControlled && (
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={handlePress}
            accessibilityRole="button"
            accessibilityLabel={message}
          />
        )}

        {/* Tooltip bubble */}
        {isVisible && (
          <Animated.View
            style={[
              styles.tooltipWrapper,
              tooltipPositionStyle,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
            pointerEvents="none"
          >
            <View
              style={[
                styles.tooltipContainer,
                {
                  paddingHorizontal: sizeStyle.paddingHorizontal,
                  paddingVertical: sizeStyle.paddingVertical,
                  maxWidth,
                  minWidth: sizeStyle.minWidth,
                },
              ]}
            >
              {/* Arrow */}
              {hasArrow && (
                <View style={[styles.arrow, arrowPositionStyle]} />
              )}

              {/* Label */}
              <Text
                style={[
                  styles.label,
                  {
                    fontSize: sizeStyle.fontSize,
                    lineHeight: sizeStyle.lineHeight,
                  },
                ]}
              >
                {message}
              </Text>

              {/* Shortcut */}
              {shortcut && (
                <Text style={styles.shortcut}>{shortcut}</Text>
              )}
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
);

Tooltip.displayName = 'Tooltip';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible' as any,
  },
  tooltipWrapper: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 9999,
    overflow: 'visible' as any,
  },
  tooltipContainer: {
    backgroundColor: palette.grey[15], // #131a1f
    borderRadius: radius.component.tooltip.default, // 8
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[2], // 8
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  arrow: {
    position: 'absolute',
    width: ARROW_SIZE,
    height: ARROW_SIZE,
    backgroundColor: palette.grey[15],
    transform: [{ rotate: '45deg' }],
  },
  label: {
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: palette.static.white,
    flexShrink: 1,
  },
  shortcut: {
    fontSize: typography.fontSize['2xs'], // 11
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.assistive,
    fontWeight: typography.fontWeight.medium,
  },
});
