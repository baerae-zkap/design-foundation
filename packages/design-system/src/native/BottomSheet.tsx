/**
 * BottomSheet Component
 *
 * Presentational overlay component that appears at the bottom of the screen.
 * Pure React Native implementation (not using @gorhom/bottom-sheet).
 *
 * Foundation tokens used:
 * - colors.surface.base.default (#ffffff) - sheet background
 * - colors.border.base.default (#d6d9dd) - handle color
 * - scrim: 'rgba(0, 0, 0, 0.4)' - overlay background
 * - colors.content.base.default (#3e4651) - text
 * - colors.border.base.default (#d6d9dd) - separator
 * - spacing.component.bottomSheet.padding (20) - sheet padding
 * - spacing.component.bottomSheet.handleGap (16) - handle to content gap
 * - spacing.component.modal.buttonGap (12) - button gap
 * - radius.component.bottomSheet.default (20) - sheet top corners
 * - handle radius: 2px (half of height)
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  Pressable,
  type ViewStyle,
} from 'react-native';
import { colors, palette } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface BottomSheetProps {
  /** Whether the bottom sheet is visible */
  visible: boolean;
  /** Callback when the sheet is closed */
  onClose: () => void;
  /** Optional title for the sheet */
  title?: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Content to display in the sheet */
  children: React.ReactNode;
  /** Whether to show the drag handle */
  showHandle?: boolean;
  /** Optional action area (buttons) at the bottom */
  actionArea?: React.ReactNode;
  /** Custom scrim color (default: 'rgba(0, 0, 0, 0.4)') */
  scrimColor?: string;
  /** Additional container styles */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
}

export const BottomSheet = forwardRef<View, BottomSheetProps>(
  (
    {
      visible,
      onClose,
      title,
      subtitle,
      children,
      showHandle = true,
      actionArea,
      scrimColor = 'rgba(0, 0, 0, 0.4)',
      style,
      testID,
    },
    ref
  ) => {
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const scrimOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (visible) {
        // Slide up animation
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 30,
            stiffness: 300,
          }),
          Animated.timing(scrimOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start();
      } else {
        // Slide down animation
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scrimOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [visible, translateY, scrimOpacity]);

    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={onClose}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          {/* Scrim (backdrop) */}
          <Animated.View
            style={[
              styles.scrim,
              {
                backgroundColor: scrimColor,
                opacity: scrimOpacity,
              },
            ]}
          >
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          </Animated.View>

          {/* Bottom Sheet Container */}
          <Animated.View
            ref={ref}
            testID={testID}
            style={[
              styles.sheetContainer,
              {
                transform: [{ translateY }],
              },
              style,
            ]}
          >
            {/* Handle */}
            {showHandle && (
              <View style={styles.handleContainer}>
                <View style={styles.handle} />
              </View>
            )}

            {/* Title */}
            {title && (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && (
                  <Text style={styles.subtitle}>{subtitle}</Text>
                )}
              </View>
            )}

            {/* Content */}
            <View style={styles.contentContainer}>{children}</View>

            {/* Action Area */}
            {actionArea && (
              <View style={styles.actionAreaContainer}>{actionArea}</View>
            )}
          </Animated.View>
        </View>
      </Modal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetContainer: {
    backgroundColor: colors.surface.base.default, // #ffffff
    borderTopLeftRadius: radius.component.bottomSheet.default, // 20
    borderTopRightRadius: radius.component.bottomSheet.default, // 20
    paddingHorizontal: spacing.component.bottomSheet.padding, // 20
    paddingBottom: spacing.component.bottomSheet.padding, // 20
    maxHeight: SCREEN_HEIGHT * 0.9, // Max 90% of screen height
    shadowColor: palette.static.black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: spacing.primitive[3], // 12px
    paddingBottom: spacing.component.bottomSheet.handleGap, // 16px
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border.base.default, // darker for better visibility
    borderRadius: 2, // 2px (half of height)
  },
  titleContainer: {
    marginBottom: spacing.component.bottomSheet.handleGap, // 16px
  },
  title: {
    fontSize: typography.fontSize.xl, // 20
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.bold,
    color: colors.content.base.default, // #3e4651
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: typography.fontSize.sm, // 14
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.secondary, // #64748b
    marginTop: spacing.primitive[1], // 4px
  },
  contentContainer: {
    // Content area - flexible
  },
  actionAreaContainer: {
    marginTop: spacing.component.modal.buttonGap, // 12px
  },
});
