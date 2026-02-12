/**
 * PageCounter - Passive page position indicator component
 *
 * A simple informational component showing current page position like "1 / 5".
 * No interaction - purely passive indicator.
 * Used in galleries, sliders, document viewers.
 *
 * Foundation tokens:
 * - colors.content.base.onColor (white text)
 * - spacing.primitive[2] (8px) for small horizontal padding
 * - spacing.primitive[3] (12px) for medium horizontal padding
 * - radius.primitive.full (9999px) for pill shape
 * - typography.fontSize['2xs'] (11px) for small text
 * - typography.fontSize.xs (12px) for medium text
 * - typography.fontWeight.bold (700) for current page
 * - typography.fontWeight.regular (400) for slash/total
 */

import React, { forwardRef, useMemo } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type PageCounterVariant = 'normal' | 'alternative';
export type PageCounterSize = 'small' | 'medium';

export interface PageCounterProps {
  /**
   * Current page number (1-based)
   */
  current: number;

  /**
   * Total number of pages
   */
  total: number;

  /**
   * Visual variant
   * - normal: Glass/chrome effect (for web/iOS) - rgba(0, 0, 0, 0.45)
   * - alternative: Solid dark (for Android) - rgba(0, 0, 0, 0.65)
   * @default 'normal'
   */
  variant?: PageCounterVariant;

  /**
   * Size of the counter
   * - small: height 24px, fontSize 11px, paddingHorizontal 8px
   * - medium: height 28px, fontSize 12px, paddingHorizontal 12px
   * @default 'small'
   */
  size?: PageCounterSize;

  /**
   * Custom style for the container
   */
  style?: ViewStyle;

  /**
   * Test ID for testing
   */
  testID?: string;
}

/**
 * PageCounter Component
 *
 * Displays current page position in format "1 / 5"
 *
 * @example
 * ```tsx
 * <PageCounter current={1} total={5} variant="normal" size="small" />
 * ```
 */
export const PageCounter = forwardRef<View, PageCounterProps>(
  (
    {
      current,
      total,
      variant = 'normal',
      size = 'small',
      style,
      testID,
    },
    ref
  ) => {
    // Clamp current page between 1 and total
    const safeCurrent = useMemo(() => {
      return Math.max(1, Math.min(current, total));
    }, [current, total]);

    // Get container styles based on variant and size
    const containerStyle = useMemo(() => {
      const baseStyle: ViewStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: radius.primitive.full, // pill shape (9999px)
      };

      // Variant styles
      if (variant === 'normal') {
        baseStyle.backgroundColor = 'rgba(0, 0, 0, 0.45)'; // glass/chrome effect
      } else {
        baseStyle.backgroundColor = 'rgba(0, 0, 0, 0.65)'; // solid dark
      }

      // Size styles
      if (size === 'small') {
        baseStyle.height = 24;
        baseStyle.paddingHorizontal = spacing.primitive[2]; // 8px
      } else {
        baseStyle.height = 28;
        baseStyle.paddingHorizontal = spacing.primitive[3]; // 12px
      }

      return baseStyle;
    }, [variant, size]);

    // Get text styles based on size
    const textStyle = useMemo(() => {
      return {
        color: colors.content.base.onColor, // white
        fontSize: size === 'small' ? typography.fontSize['2xs'] : typography.fontSize.xs, // 11px or 12px
        lineHeight: size === 'small' ? 16 : 18,
      };
    }, [size]);

    return (
      <View
        ref={ref}
        style={[containerStyle, style]}
        testID={testID}
      >
        <Text
          style={[
            textStyle,
            { fontWeight: typography.fontWeight.bold }, // bold for current page
          ]}
        >
          {safeCurrent}
        </Text>
        <Text style={textStyle}> / </Text>
        <Text style={textStyle}>{total}</Text>
      </View>
    );
  }
);

PageCounter.displayName = 'PageCounter';
