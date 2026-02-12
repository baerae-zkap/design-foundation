/**
 * Slider Component (React Native)
 *
 * @description 값 범위를 선택하는 슬라이더 컴포넌트입니다.
 * @see docs/components/Slider.md - AI용 상세 가이드
 *
 * @example
 * <Slider
 *   value={50}
 *   onValueChange={(value) => console.log(value)}
 *   minimumValue={0}
 *   maximumValue={100}
 *   size="medium"
 * />
 */

import React, { forwardRef, useRef } from 'react';
import {
  View,
  PanResponder,
  Animated,
  Text,
  type ViewStyle,
  type TextStyle,
  type GestureResponderEvent,
  type PanResponderGestureState,
} from 'react-native';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type SliderSize = 'small' | 'medium' | 'large';

export interface SliderProps {
  /** Current value */
  value: number;
  /** Change handler */
  onValueChange: (value: number) => void;
  /** Minimum value */
  minimumValue?: number;
  /** Maximum value */
  maximumValue?: number;
  /** Step increment */
  step?: number;
  /** Show value label (deprecated - use showTooltip) */
  showValue?: boolean;
  /** Show tooltip above thumb */
  showTooltip?: boolean;
  /** Custom tooltip formatter */
  tooltipContent?: (value: number) => string;
  /** Labels for min/max/mid positions */
  labels?: {
    min?: string;
    max?: string;
    mid?: string;
  };
  /** Track filled color */
  trackColor?: string;
  /** Track background color */
  trackBgColor?: string;
  /** Range mode */
  range?: boolean;
  /** Range value [min, max] */
  rangeValue?: [number, number];
  /** Range change handler */
  onRangeChange?: (value: [number, number]) => void;
  /** Disabled */
  disabled?: boolean;
  /** Size */
  size?: SliderSize;
  /** Test ID */
  testID?: string;
  accessibilityLabel?: string;
  style?: ViewStyle;
}

const sizeConfig: Record<SliderSize, {
  trackHeight: number;
  thumbSize: number;
}> = {
  small: {
    trackHeight: 3,
    thumbSize: 20,
  },
  medium: {
    trackHeight: 5,
    thumbSize: 24,
  },
  large: {
    trackHeight: 6,
    thumbSize: 28,
  },
};

export const Slider = forwardRef<View, SliderProps>(
  (
    {
      value,
      onValueChange,
      minimumValue = 0,
      maximumValue = 100,
      step = 1,
      showValue = false,
      showTooltip = false,
      tooltipContent,
      labels,
      trackColor,
      trackBgColor,
      range = false,
      rangeValue,
      onRangeChange,
      disabled = false,
      size = 'medium',
      testID,
      accessibilityLabel,
      style,
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const containerRef = useRef<View>(null);
    const containerWidth = useRef(0);
    const animatedValue = useRef(new Animated.Value(value)).current;
    const tooltipOpacity = useRef(new Animated.Value(0)).current;
    const [isDragging, setIsDragging] = React.useState(false);

    // Calculate percentage from value
    const percentage = ((value - minimumValue) / (maximumValue - minimumValue)) * 100;

    // Show tooltip or use legacy showValue
    const shouldShowTooltip = showTooltip || showValue;
    const formatTooltip = tooltipContent || ((v: number) => Math.round(v).toString());

    // Update animated value when value prop changes
    React.useEffect(() => {
      Animated.spring(animatedValue, {
        toValue: value,
        useNativeDriver: false,
      }).start();
    }, [value, animatedValue]);

    // Tooltip fade animation
    React.useEffect(() => {
      Animated.timing(tooltipOpacity, {
        toValue: isDragging && shouldShowTooltip ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, [isDragging, shouldShowTooltip, tooltipOpacity]);

    const handleValueChange = (newValue: number) => {
      if (disabled) return;

      // Apply step
      const steppedValue = Math.round(newValue / step) * step;

      // Clamp value
      const clampedValue = Math.max(minimumValue, Math.min(maximumValue, steppedValue));

      onValueChange(clampedValue);
    };

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onMoveShouldSetPanResponder: () => !disabled,
        onPanResponderGrant: (evt: GestureResponderEvent) => {
          if (disabled) return;

          setIsDragging(true);
          const locationX = evt.nativeEvent.locationX;
          const newPercentage = (locationX / containerWidth.current) * 100;
          const newValue = minimumValue + (newPercentage / 100) * (maximumValue - minimumValue);
          handleValueChange(newValue);
        },
        onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
          if (disabled) return;

          const locationX = Math.max(0, Math.min(containerWidth.current, gestureState.moveX - gestureState.x0 + evt.nativeEvent.locationX));
          const newPercentage = (locationX / containerWidth.current) * 100;
          const newValue = minimumValue + (newPercentage / 100) * (maximumValue - minimumValue);
          handleValueChange(newValue);
        },
        onPanResponderRelease: () => {
          setIsDragging(false);
        },
        onPanResponderTerminate: () => {
          setIsDragging(false);
        },
      })
    ).current;

    const handleLayout = (event: any) => {
      containerWidth.current = event.nativeEvent.layout.width;
    };

    const containerStyle: ViewStyle = {
      width: '100%',
      paddingVertical: spacing.primitive[3],
      ...style,
    };

    const trackContainerStyle: ViewStyle = {
      height: config.trackHeight,
      borderRadius: radius.primitive.full,
      backgroundColor: disabled
        ? colors.content.disabled.default
        : trackBgColor || colors.border.base.default,
      position: 'relative',
      overflow: 'hidden',
      opacity: disabled ? 0.5 : 1,
    };

    const fillStyle: ViewStyle = {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: `${percentage}%`,
      backgroundColor: trackColor || colors.surface.brand.default,
      borderRadius: radius.primitive.full,
    };

    const thumbContainerStyle: ViewStyle = {
      position: 'absolute',
      top: -((config.thumbSize - config.trackHeight) / 2),
      left: `${percentage}%`,
      marginLeft: -(config.thumbSize / 2),
      width: config.thumbSize,
      height: config.thumbSize,
      justifyContent: 'center',
      alignItems: 'center',
    };

    const thumbStyle: ViewStyle = {
      width: config.thumbSize,
      height: config.thumbSize,
      borderRadius: radius.primitive.full,
      backgroundColor: colors.surface.base.default,
      shadowColor: palette.static.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5,
    };

    const tooltipStyle: ViewStyle = {
      position: 'absolute',
      top: -(config.thumbSize + spacing.primitive[3] + 8), // Arrow height
      left: '50%',
      transform: [{ translateX: -50 }],
      backgroundColor: palette.grey[15] || '#1a1a1a',
      paddingHorizontal: spacing.primitive[2],
      paddingVertical: spacing.primitive[1],
      borderRadius: radius.primitive.sm,
      minWidth: 32,
      alignItems: 'center',
    };

    const tooltipTextStyle: TextStyle = {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.onColor,
    };

    const tooltipArrowStyle: ViewStyle = {
      position: 'absolute',
      bottom: -4,
      left: '50%',
      marginLeft: -4,
      width: 0,
      height: 0,
      borderLeftWidth: 4,
      borderRightWidth: 4,
      borderTopWidth: 4,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: palette.grey[15] || '#1a1a1a',
    };

    const trackLabelStyle: TextStyle = {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.regular,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
      marginTop: spacing.primitive[2],
    };

    return (
      <View
        ref={ref}
        style={containerStyle}
        testID={testID}
        accessibilityRole="adjustable"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{
          min: minimumValue,
          max: maximumValue,
          now: value,
        }}
      >
        <View
          ref={containerRef}
          onLayout={handleLayout}
          {...panResponder.panHandlers}
        >
          <View style={trackContainerStyle}>
            <View style={fillStyle} />
            <View style={thumbContainerStyle}>
              <View style={thumbStyle} />
              {shouldShowTooltip && (
                <Animated.View style={[tooltipStyle, { opacity: tooltipOpacity }]}>
                  <Text style={tooltipTextStyle}>{formatTooltip(value)}</Text>
                  <View style={tooltipArrowStyle} />
                </Animated.View>
              )}
            </View>
          </View>

          {/* Track labels */}
          {labels && (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.primitive[2] }}>
              {labels.min && <Text style={trackLabelStyle}>{labels.min}</Text>}
              {labels.mid && (
                <Text style={[trackLabelStyle, { position: 'absolute', left: '50%', transform: [{ translateX: -50 }] }]}>
                  {labels.mid}
                </Text>
              )}
              {labels.max && <Text style={trackLabelStyle}>{labels.max}</Text>}
            </View>
          )}
        </View>
      </View>
    );
  }
);

Slider.displayName = 'Slider';
