/**
 * Loading Component (React Native)
 *
 * @description 진행 중인 작업을 나타내는 원형 회전 스피너입니다.
 * @see docs/components/Loading.md - AI용 상세 가이드
 *
 * @example
 * <Loading size="medium" color="brand" />
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  Easing,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { typography, spacing } from '../tokens';

export type LoadingSize = 'small' | 'medium' | 'large' | number;
export type LoadingColor = 'brand' | 'base' | 'onColor' | 'inherit';

export interface LoadingProps {
  /** Size variant or custom number */
  size?: LoadingSize;
  /** Color variant */
  color?: LoadingColor;
  /** Disabled state */
  disabled?: boolean;
  /** Loading message label */
  label?: string;
  /** Fade-in delay (ms) to prevent flash for fast operations */
  fadeInDelay?: number;
  /** Overlay mode - shows centered on semi-transparent backdrop */
  overlay?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

const sizeConfig = {
  small: 20,
  medium: 32,
  large: 48,
};

const colorMap: Record<Exclude<LoadingColor, 'inherit'>, string> = {
  brand: colors.surface.brand.default,      // #0066ff
  base: colors.content.base.default,        // #3e4651
  onColor: colors.content.base.onColor,     // #ffffff
};

const trackColorMap: Record<Exclude<LoadingColor, 'inherit'>, string> = {
  brand: colors.surface.base.container,     // #eaebed
  base: colors.surface.base.container,      // #eaebed
  onColor: 'rgba(255, 255, 255, 0.2)',      // Semi-transparent white
};

export const Loading = forwardRef<View, LoadingProps>(
  (
    {
      size = 'medium',
      color = 'brand',
      disabled = false,
      label,
      fadeInDelay = 0,
      overlay = false,
      style,
      testID,
    },
    ref
  ) => {
    const rotation = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(fadeInDelay > 0 ? 0 : 1)).current;

    const spinnerSize = typeof size === 'number' ? size : sizeConfig[size];
    const borderThickness = Math.max(2, Math.round(spinnerSize / 10));

    // Rotation animation
    useEffect(() => {
      const animation = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );

      animation.start();

      return () => {
        animation.stop();
      };
    }, [rotation]);

    // Fade-in animation with delay
    useEffect(() => {
      if (fadeInDelay > 0) {
        const timer = setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }, fadeInDelay);

        return () => clearTimeout(timer);
      }
    }, [fadeInDelay, fadeAnim]);

    const rotateInterpolate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const spinnerColor = disabled
      ? colors.content.disabled.default  // #a7adb5
      : color === 'inherit'
      ? 'currentColor'
      : colorMap[color];

    const trackColor = disabled
      ? colors.surface.base.container     // #eaebed
      : color === 'inherit'
      ? 'rgba(128, 128, 128, 0.2)'
      : trackColorMap[color];

    const containerStyle: ViewStyle = {
      width: spinnerSize,
      height: spinnerSize,
      position: 'relative',
    };

    // Track ring (background circle)
    const trackStyle: ViewStyle = {
      position: 'absolute',
      width: spinnerSize,
      height: spinnerSize,
      borderRadius: radius.primitive.full, // 9999
      borderWidth: borderThickness,
      borderColor: trackColor,
    };

    // Spinner arc (animated part)
    const spinnerStyle: ViewStyle = {
      width: spinnerSize,
      height: spinnerSize,
      borderRadius: radius.primitive.full, // 9999
      borderWidth: borderThickness,
      borderTopColor: spinnerColor,
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderLeftColor: 'transparent',
    };

    // Label font size based on spinner size
    const labelFontSize = typeof size === 'number'
      ? Math.max(typography.fontSize.xs, Math.round(size / 3))
      : size === 'small'
      ? typography.fontSize.xs
      : size === 'large'
      ? typography.fontSize.md
      : typography.fontSize.sm;

    const labelStyle: TextStyle = {
      marginTop: spacing.primitive[2], // 8px gap
      fontFamily: typography.fontFamily.base,
      fontSize: labelFontSize,
      lineHeight: labelFontSize * 1.4,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.base.secondary,
      textAlign: 'center',
    };

    const spinnerContent = (
      <Animated.View
        style={{
          alignItems: 'center',
          opacity: fadeAnim,
        }}
      >
        <View
          ref={ref}
          style={[containerStyle, !overlay && style]}
          testID={testID}
          accessibilityRole="progressbar"
          accessibilityLabel={label || "Loading"}
          accessibilityValue={{ text: label || 'Loading in progress' }}
        >
          {/* Track ring */}
          <View style={trackStyle} />

          {/* Animated spinner arc */}
          <Animated.View
            style={[
              spinnerStyle,
              {
                transform: [{ rotate: rotateInterpolate }],
              },
            ]}
          />
        </View>
        {label && <Text style={labelStyle}>{label}</Text>}
      </Animated.View>
    );

    if (overlay) {
      return (
        <View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // palette.static.black with 0.4 opacity
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            },
            style,
          ]}
        >
          {spinnerContent}
        </View>
      );
    }

    return spinnerContent;
  }
);

Loading.displayName = 'Loading';
