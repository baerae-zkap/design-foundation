/**
 * Switch Component (React Native)
 *
 * @description On/Off 토글 스위치 컴포넌트입니다.
 * @see docs/components/Switch.md - AI용 상세 가이드
 *
 * @example
 * <Switch
 *   value={isEnabled}
 *   onValueChange={setIsEnabled}
 *   size="medium"
 * />
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import {
  Pressable,
  Animated,
  View,
  Text,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors, palette, typography, spacing, radius } from '../tokens';

export type SwitchSize = 'small' | 'medium' | 'large';

export interface SwitchProps {
  /** On/Off 상태 */
  value: boolean;
  /** 상태 변경 핸들러 */
  onValueChange: (value: boolean) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 크기 변형 */
  size?: SwitchSize;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 터치 피드백 표시 여부 (기본: true) */
  hasTouchEffect?: boolean;
  /** On 상태 트랙 색상 (기본: brandDefault) */
  onColor?: string;
  /** Off 상태 트랙 색상 (기본: border.base.default) */
  offColor?: string;
  /** 로딩 상태 */
  loading?: boolean;
}

// Size configuration based on TDS specs (TDS default: 50×30px)
const sizeConfig: Record<SwitchSize, {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  thumbOffset: number; // offset from edge when off
}> = {
  small: {
    trackWidth: 40,
    trackHeight: 24,
    thumbSize: 18,
    thumbOffset: 3, // (24 - 18) / 2
  },
  medium: {
    trackWidth: 52,
    trackHeight: 32,
    thumbSize: 24,
    thumbOffset: 4, // (32 - 24) / 2
  },
  large: {
    trackWidth: 60,
    trackHeight: 36,
    thumbSize: 28,
    thumbOffset: 4, // (36 - 28) / 2
  },
};

export const Switch = forwardRef<View, SwitchProps>(
  (
    {
      value,
      onValueChange,
      label,
      disabled = false,
      size = 'medium',
      testID,
      accessibilityLabel,
      style,
      hasTouchEffect = true,
      onColor,
      offColor,
      loading = false,
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.spring(animatedValue, {
        toValue: value ? 1 : 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }).start();
    }, [value, animatedValue]);

    // Loading spinner animation
    useEffect(() => {
      if (loading) {
        Animated.loop(
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          })
        ).start();
      } else {
        rotateValue.setValue(0);
      }
    }, [loading, rotateValue]);

    const handlePress = () => {
      if (!disabled && !loading) {
        // Touch effect animation
        if (hasTouchEffect) {
          Animated.sequence([
            Animated.spring(scaleValue, {
              toValue: 0.95,
              useNativeDriver: true,
              damping: 15,
              stiffness: 300,
            }),
            Animated.spring(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
              damping: 15,
              stiffness: 300,
            }),
          ]).start();
        }
        onValueChange(!value);
      }
    };

    // Calculate thumb position animation
    const thumbTranslateX = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        config.thumbOffset,
        config.trackWidth - config.thumbSize - config.thumbOffset,
      ],
    });

    const spinRotation = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const trackBackgroundColor = disabled
      ? colors.surface.disabled.default
      : value
      ? (onColor || colors.surface.brand.default)
      : (offColor || colors.border.base.default);

    const trackStyle: Animated.AnimatedProps<ViewStyle> = {
      width: config.trackWidth,
      height: config.trackHeight,
      borderRadius: radius.primitive.full,
      backgroundColor: trackBackgroundColor,
      justifyContent: 'center',
      opacity: disabled ? 0.38 : 1,
      transform: [{ scale: scaleValue }],
    };

    const thumbStyle: ViewStyle = {
      width: config.thumbSize,
      height: config.thumbSize,
      borderRadius: radius.primitive.full,
      backgroundColor: colors.surface.base.default,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
      alignItems: 'center',
      justifyContent: 'center',
    };

    const loadingSpinnerStyle: ViewStyle = {
      width: config.thumbSize * 0.5,
      height: config.thumbSize * 0.5,
      borderRadius: radius.primitive.full,
      borderWidth: 2,
      borderColor: colors.border.base.default,
      borderTopColor: 'transparent',
    };

    const labelStyle: TextStyle = {
      fontSize: size === 'large' ? typography.fontSize.md : typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: disabled ? colors.content.disabled.default : colors.content.base.default,
      marginLeft: spacing.primitive[3],
    };

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      ...style,
    };

    return (
      <Pressable
        ref={ref}
        onPress={handlePress}
        disabled={disabled || loading}
        testID={testID}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled: disabled || loading }}
        accessibilityLabel={accessibilityLabel || label}
        style={containerStyle}
      >
        <Animated.View style={trackStyle}>
          <Animated.View
            style={[
              thumbStyle,
              {
                transform: [{ translateX: thumbTranslateX }],
              },
            ]}
          >
            {loading && (
              <Animated.View
                style={[
                  loadingSpinnerStyle,
                  {
                    transform: [{ rotate: spinRotation }],
                  },
                ]}
              />
            )}
          </Animated.View>
        </Animated.View>
        {label && <Text style={labelStyle}>{label}</Text>}
      </Pressable>
    );
  }
);

Switch.displayName = 'Switch';
