/**
 * Snackbar Component (React Native)
 *
 * @description 화면 하단에 나타나는 간단한 피드백 알림입니다.
 * @see https://montage.wanted.co.kr/docs/components/feedback/snackbar/design
 *
 * @example
 * <Snackbar
 *   description="저장되었습니다"
 *   heading="완료"
 *   leadingContent={<Icon name="check" />}
 *   action={{ label: "실행 취소", onPress: () => {} }}
 *   onClose={() => {}}
 *   duration={4000}
 * />
 */

import React, { useEffect, useRef, forwardRef, ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet, Animated, ViewStyle } from 'react-native';
import { X } from 'lucide-react-native';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';

export interface SnackbarAction {
  label: string;
  onPress: () => void;
}

export interface SnackbarProps {
  /** Optional heading text */
  heading?: string;
  /** Required description/message text */
  description: string;
  /** Leading content - icon, image, or avatar */
  leadingContent?: ReactNode;
  /** Action button */
  action?: SnackbarAction;
  /** Close button handler (shows X when provided) */
  onClose?: () => void;
  /** Auto-dismiss duration in ms (default: 4000) */
  duration?: number;
  /** Callback when dismissed (auto or manual) */
  onDismiss?: () => void;
  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Custom style */
  style?: ViewStyle;
}

export const Snackbar = forwardRef<View, SnackbarProps>(
  (
    {
      heading,
      description,
      leadingContent,
      action,
      onClose,
      duration = 4000,
      onDismiss,
      testID,
      accessibilityLabel,
      style,
    },
    ref
  ) => {
    const slideAnim = useRef(new Animated.Value(100)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    // Enter animation
    useEffect(() => {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
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

    // Auto-dismiss with exit animation
    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          // Exit animation
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: 100,
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
          });
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onDismiss, slideAnim, opacityAnim]);

    const handleClose = () => {
      // Exit animation on manual close
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onClose?.();
        onDismiss?.();
      });
    };

    return (
      <Animated.View
        ref={ref}
        testID={testID}
        accessibilityLabel={accessibilityLabel || description}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite"
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
            opacity: opacityAnim,
          },
          style,
        ]}
      >
        {leadingContent && (
          <View style={styles.leadingContent}>{leadingContent}</View>
        )}

        <View style={styles.content}>
          {heading && <Text style={styles.heading}>{heading}</Text>}
          <Text style={styles.description}>{description}</Text>
        </View>

        {action && (
          <Pressable
            onPress={action.onPress}
            style={({ pressed }) => [
              styles.actionButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <Text style={styles.actionText}>{action.label}</Text>
          </Pressable>
        )}

        {onClose && (
          <Pressable
            onPress={handleClose}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closeButtonPressed,
            ]}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <X size={16} color={colors.content.base.onColor} strokeWidth={2} />
          </Pressable>
        )}
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    // backgroundColor: content.base.strong (#131a1f)
    backgroundColor: colors.content.base.strong,
    // borderRadius: toast.default (12px)
    borderRadius: radius.component.toast.default,
    // padding: inset.sm (16px)
    padding: spacing.semantic.inset.sm,
    // gap: horizontal.2xs (8px)
    gap: spacing.semantic.horizontal['2xs'],
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 54,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  leadingContent: {
    flexShrink: 0,
  },
  content: {
    flex: 1,
    // gap: vertical.3xs (4px)
    gap: spacing.semantic.vertical['3xs'],
  },
  heading: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.content.base.onColor,
  },
  description: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.onColor,
  },
  actionButton: {
    flexShrink: 0,
    // paddingX: primitive.2 (8px)
    paddingHorizontal: spacing.primitive[2],
    // paddingY: primitive.1 (4px)
    paddingVertical: spacing.primitive[1],
  },
  actionButtonPressed: {
    opacity: 0.6,
  },
  actionText: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.content.brand.default,
  },
  closeButton: {
    flexShrink: 0,
    width: spacing.primitive[6], // 24px
    height: spacing.primitive[6], // 24px
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonPressed: {
    opacity: 0.6,
  },
});

Snackbar.displayName = 'Snackbar';
