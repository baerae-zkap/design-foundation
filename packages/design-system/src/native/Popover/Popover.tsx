/**
 * Popover Component (React Native)
 *
 * @description 트리거 요소에 앵커된 플로팅 패널 컴포넌트입니다.
 * @see docs/components/Popover.md - AI용 상세 가이드
 *
 * @example
 * <Popover
 *   trigger={<Button>Open</Button>}
 *   heading="Heading"
 *   description="Description text"
 *   showCloseButton
 *   action={{ label: "Confirm", onPress: () => {} }}
 * />
 */

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  Animated,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { X } from 'lucide-react-native';
import { TextButton } from '../TextButton/TextButton';
import { IconButton } from '../IconButton/IconButton';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverAction {
  label: string;
  onPress: () => void;
}

export interface PopoverProps {
  /** Trigger element */
  trigger: React.ReactNode;
  /** Heading text */
  heading?: string;
  /** Description text */
  description?: string;
  /** Custom content (used instead of heading/description when provided) */
  children?: React.ReactNode;
  /** Show close button */
  showCloseButton?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Primary action button */
  action?: PopoverAction;
  /** Secondary action button */
  subAction?: PopoverAction;
  /** Controlled visibility */
  visible?: boolean;
  /** Visibility change handler */
  onVisibleChange?: (visible: boolean) => void;
  /** Placement relative to trigger */
  placement?: PopoverPlacement;
  /** Custom container style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

export const Popover = forwardRef<View, PopoverProps>(
  (
    {
      trigger,
      heading,
      description,
      children,
      showCloseButton = false,
      onClose,
      action,
      subAction,
      visible: controlledVisible,
      onVisibleChange,
      placement = 'bottom',
      style,
      testID,
    },
    ref
  ) => {
    const [internalVisible, setInternalVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    const isControlled = controlledVisible !== undefined;
    const isVisible = isControlled ? controlledVisible : internalVisible;

    const handleOpen = () => {
      if (isControlled) {
        onVisibleChange?.(true);
      } else {
        setInternalVisible(true);
      }
    };

    const handleClose = () => {
      if (isControlled) {
        onVisibleChange?.(false);
      } else {
        setInternalVisible(false);
      }
      onClose?.();
    };

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

    const hasActions = action || subAction;

    return (
      <View ref={ref} style={style}>
        {/* Trigger */}
        <Pressable
          onPress={handleOpen}
          testID={testID}
          accessibilityRole="button"
          accessibilityState={{ expanded: isVisible }}
        >
          {trigger}
        </Pressable>

        {/* Popover Modal */}
        <Modal
          visible={isVisible}
          transparent
          animationType="none"
          onRequestClose={handleClose}
        >
          <Pressable style={styles.overlay} onPress={handleClose}>
            <Animated.View
              style={[
                styles.animatedContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Pressable onPress={(e) => e.stopPropagation()}>
                <View style={styles.container}>
                  {/* Close Button */}
                  {showCloseButton && (
                    <View style={styles.closeButton}>
                      <IconButton
                        variant="ghost"
                        color="secondary"
                        size="small"
                        onPress={handleClose}
                        accessibilityLabel="Close popover"
                      >
                        <X />
                      </IconButton>
                    </View>
                  )}

                  {/* Content */}
                  {children ? (
                    children
                  ) : (
                    <>
                      {heading && (
                        <Text
                          style={[
                            styles.heading,
                            showCloseButton && styles.headingWithClose,
                          ]}
                        >
                          {heading}
                        </Text>
                      )}
                      {description && (
                        <Text style={styles.description}>{description}</Text>
                      )}
                    </>
                  )}

                  {/* Action Area */}
                  {hasActions && (
                    <View style={styles.actionArea}>
                      {subAction && (
                        <TextButton
                          color="secondary"
                          size="small"
                          onPress={subAction.onPress}
                        >
                          {subAction.label}
                        </TextButton>
                      )}
                      {action && (
                        <TextButton
                          color="primary"
                          size="small"
                          onPress={action.onPress}
                        >
                          {action.label}
                        </TextButton>
                      )}
                    </View>
                  )}
                </View>
              </Pressable>
            </Animated.View>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

Popover.displayName = 'Popover';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    // Animation wrapper
  },
  container: {
    backgroundColor: colors.surface.elevated.default,
    borderRadius: radius.component.card.sm, // 12
    minWidth: 140,
    maxWidth: 360,
    paddingHorizontal: spacing.semantic.inset.sm, // 16
    paddingVertical: spacing.semantic.inset.sm, // 16
    shadowColor: palette.static.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.primitive[2], // 8
    right: spacing.primitive[2], // 8
    zIndex: 1,
  },
  heading: {
    fontSize: typography.fontSize.md, // 16
    fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.default,
  },
  headingWithClose: {
    paddingRight: 28, // Space for close button
  },
  description: {
    fontSize: typography.fontSize.sm, // 14
    fontWeight: typography.fontWeight.regular as TextStyle['fontWeight'],
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.secondary,
    lineHeight: 20,
    marginTop: spacing.primitive[1], // 4
  },
  actionArea: {
    flexDirection: 'row',
    gap: spacing.primitive[4], // 16
    justifyContent: 'flex-end',
    marginTop: spacing.primitive[3], // 12
  },
});
