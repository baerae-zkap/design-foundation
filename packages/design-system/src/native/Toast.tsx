/**
 * Toast Component (React Native)
 *
 * @description 사용자 피드백을 화면 상단/하단에 표시하는 컴포넌트입니다.
 * Montage + TDS 참조: status별 배경색, bottom에서 action 버튼 지원
 *
 * @see https://montage.wanted.co.kr/docs/components/feedback/toast/design
 *
 * @example
 * <Toast
 *   status="success"
 *   message="저장되었습니다"
 *   position="bottom"
 *   action={{ label: '실행취소', onPress: () => {} }}
 *   duration={3000}
 *   onDismiss={() => {}}
 * />
 */

import React, { useEffect, useRef, forwardRef, type ReactNode } from 'react';
import { View, Text, Pressable, Animated, StyleSheet, type ViewStyle } from 'react-native';
import { CircleCheck, TriangleAlert, CircleX } from 'lucide-react-native';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastProps {
  /** Status determines icon and color */
  status?: 'default' | 'success' | 'warning' | 'error';
  /** Message text (max 2 lines) */
  message: string;
  /** Custom leading content (overrides status icon) */
  leadingContent?: ReactNode;
  /** Action button (bottom position only). Duration defaults to 5000ms when provided */
  action?: ToastAction;
  /** Auto-dismiss duration in ms (default: 3000, 5000 with action) */
  duration?: number;
  /** Position on screen */
  position?: 'top' | 'bottom';
  /** Callback when closing starts */
  onClose?: () => void;
  /** Callback when fully dismissed (animation complete) */
  onDismiss?: () => void;
  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Custom style */
  style?: ViewStyle;
}

interface StatusConfig {
  Icon: React.ComponentType<{ size: number; color: string; strokeWidth: number }> | null;
  iconColor: string;
  backgroundColor: string;
  textColor: string;
  actionColor: string;
}

const statusConfig: Record<NonNullable<ToastProps['status']>, StatusConfig> = {
  default: {
    Icon: null,
    iconColor: colors.content.base.onColor,
    backgroundColor: colors.content.base.strong,
    textColor: colors.content.base.onColor,
    actionColor: colors.content.brand.default,
  },
  success: {
    Icon: CircleCheck,
    iconColor: colors.content.success.default,
    backgroundColor: colors.surface.success.default,
    textColor: colors.content.base.strong,
    actionColor: colors.content.success.default,
  },
  warning: {
    Icon: TriangleAlert,
    iconColor: colors.content.warning.default,
    backgroundColor: colors.surface.warning.default,
    textColor: colors.content.base.strong,
    actionColor: colors.content.warning.default,
  },
  error: {
    Icon: CircleX,
    iconColor: colors.content.error.default,
    backgroundColor: colors.surface.error.default,
    textColor: colors.content.base.strong,
    actionColor: colors.content.error.default,
  },
};

export const Toast = forwardRef<View, ToastProps>(
  (
    {
      status = 'default',
      message,
      leadingContent,
      action,
      duration,
      position = 'bottom',
      onClose,
      onDismiss,
      testID,
      accessibilityLabel,
      style,
    },
    ref
  ) => {
    // TDS pattern: duration defaults to 5000 when action is provided
    const effectiveDuration = duration ?? (action ? 5000 : 3000);
    // Action button is only shown at bottom position (TDS rule)
    const showAction = action && position === 'bottom';

    const slideAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    const runExitAnimation = (callback?: () => void) => {
      onClose?.();
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onDismiss?.();
        callback?.();
      });
    };

    // Enter animation
    useEffect(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }, [slideAnim, opacityAnim]);

    // Auto-dismiss timer
    useEffect(() => {
      if (effectiveDuration > 0) {
        const timer = setTimeout(() => {
          runExitAnimation();
        }, effectiveDuration);

        return () => clearTimeout(timer);
      }
    }, [effectiveDuration, onClose, onDismiss, slideAnim, opacityAnim]);

    const translateY = slideAnim.interpolate({
      inputRange: [0, 1],
      outputRange: position === 'top' ? [-50, 0] : [50, 0],
    });

    const config = statusConfig[status];
    const IconComponent = config.Icon;
    const shouldShowIcon = leadingContent || IconComponent;

    return (
      <Animated.View
        ref={ref}
        testID={testID}
        accessibilityLabel={accessibilityLabel || message}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={[
          styles.container,
          {
            backgroundColor: config.backgroundColor,
            opacity: opacityAnim,
            transform: [{ translateY }],
          },
          style,
        ]}
      >
        {shouldShowIcon && (
          <View style={styles.iconContainer}>
            {leadingContent || (
              IconComponent && (
                <IconComponent
                  size={20}
                  color={config.iconColor}
                  strokeWidth={2}
                />
              )
            )}
          </View>
        )}
        <Text style={[styles.message, { color: config.textColor }]} numberOfLines={2}>
          {message}
        </Text>
        {showAction && (
          <Pressable
            onPress={action.onPress}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <Text style={[styles.actionText, { color: config.actionColor }]}>
              {action.label}
            </Text>
          </Pressable>
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: dynamic per status (set inline)
    // borderRadius: toast.default (12px)
    borderRadius: radius.component.toast.default,
    // padding: inset.sm (16px)
    padding: spacing.semantic.inset.sm,
    // gap: horizontal.2xs (8px)
    gap: spacing.semantic.horizontal['2xs'],
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 54, // Montage spec
    maxWidth: 420, // Montage spec (for larger screens)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    flexShrink: 0,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm, // 14
    lineHeight: typography.lineHeight.sm, // 20
    fontWeight: typography.fontWeight.regular,
    // color: dynamic per status (set inline)
    flex: 1,
  },
  actionButton: {
    flexShrink: 0,
    paddingHorizontal: spacing.primitive[2], // 8px
    paddingVertical: spacing.primitive[1], // 4px
  },
  actionButtonPressed: {
    opacity: 0.6,
  },
  actionText: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm, // 14
    lineHeight: typography.lineHeight.sm, // 20
    fontWeight: typography.fontWeight.semibold,
    // color: dynamic per status (set inline)
  },
});

Toast.displayName = 'Toast';
