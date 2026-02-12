/**
 * Skeleton Component (React Native)
 *
 * @description 콘텐츠 로딩 중 레이아웃 시프트를 방지하는 플레이스홀더 컴포넌트입니다.
 * @see docs/components/Skeleton.md - AI용 상세 가이드
 *
 * @example
 * <Skeleton variant="text" lines={3} />
 * <Skeleton variant="circle" width={48} height={48} />
 * <Skeleton variant="rectangle" width="100%" height={200} />
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Easing,
  type ViewStyle,
  type DimensionValue,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type SkeletonVariant = 'text' | 'rectangle' | 'circle';
export type SkeletonAlign = 'leading' | 'center' | 'trailing';

export interface SkeletonProps {
  /** Variant type */
  variant?: SkeletonVariant;
  /** Width (number in px or string like '100%') */
  width?: DimensionValue;
  /** Height in px */
  height?: number;
  /** Number of lines (for text variant) */
  lines?: number;
  /** Line height (for text variant) */
  lineHeight?: number;
  /** Gap between lines (for text variant) */
  lineGap?: number;
  /** Text alignment (for text variant) */
  align?: SkeletonAlign;
  /** Border radius override */
  borderRadius?: number;
  /** Background color override */
  color?: string;
  /** Enable animation */
  animated?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

export const Skeleton = forwardRef<View, SkeletonProps>(
  (
    {
      variant = 'text',
      width,
      height,
      lines = 1,
      lineHeight = typography.fontSize.sm,
      lineGap = spacing.semantic.vertical['3xs'], // 4
      align = 'leading',
      borderRadius,
      color = colors.surface.base.container, // #eaebed
      animated = true,
      style,
      testID,
    },
    ref
  ) => {
    const opacity = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
      if (!animated) return;

      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1.0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );

      animation.start();

      return () => {
        animation.stop();
      };
    }, [animated, opacity]);

    const getDefaultDimensions = (): { width: DimensionValue; height: number } => {
      switch (variant) {
        case 'text':
          return { width: width ?? '100%', height: height ?? lineHeight };
        case 'circle':
          return { width: width ?? 48, height: height ?? 48 };
        case 'rectangle':
          return { width: width ?? '100%', height: height ?? 100 };
        default:
          return { width: '100%', height: 14 };
      }
    };

    const getDefaultBorderRadius = () => {
      if (borderRadius !== undefined) return borderRadius;

      switch (variant) {
        case 'text':
          return radius.component.skeleton.text; // 4
        case 'circle':
          return radius.primitive.full; // 9999
        case 'rectangle':
          return radius.component.skeleton.image; // 12
        default:
          return radius.component.skeleton.text; // 4
      }
    };

    const dimensions = getDefaultDimensions();
    const finalBorderRadius = getDefaultBorderRadius();

    const alignItemsMap: Record<SkeletonAlign, 'flex-start' | 'center' | 'flex-end'> = {
      leading: 'flex-start',
      center: 'center',
      trailing: 'flex-end',
    };

    // Single skeleton bar
    if (variant !== 'text' || lines === 1) {
      const skeletonStyle: ViewStyle = {
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: color,
        borderRadius: finalBorderRadius,
      };

      return (
        <Animated.View
          ref={ref}
          style={[skeletonStyle, { opacity: animated ? opacity : 1 }, style]}
          testID={testID}
        />
      );
    }

    // Multi-line text skeleton
    return (
      <View
        ref={ref}
        style={[
          {
            width: dimensions.width,
            alignItems: alignItemsMap[align],
          },
          style,
        ]}
        testID={testID}
      >
        {Array.from({ length: lines }).map((_, index) => {
          const isLastLine = index === lines - 1;
          const lineWidth = isLastLine ? '70%' : '100%';

          return (
            <Animated.View
              key={index}
              style={{
                width: lineWidth,
                height: lineHeight,
                backgroundColor: color,
                borderRadius: finalBorderRadius,
                marginBottom: isLastLine ? 0 : lineGap,
                opacity: animated ? opacity : 1,
              }}
            />
          );
        })}
      </View>
    );
  }
);

Skeleton.displayName = 'Skeleton';
