/**
 * Radio Component (React Native)
 *
 * @description 사용자가 여러 옵션 중 하나를 선택할 수 있는 라디오 버튼입니다.
 * @see docs/components/Radio.md - AI용 상세 가이드
 *
 * @example
 * <Radio
 *   selected={selected === 'option1'}
 *   onPress={() => setSelected('option1')}
 *   label="옵션 1"
 * />
 */

import React, { useRef, useEffect } from 'react';
import {
  Pressable,
  Text,
  View,
  Animated,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type RadioSize = 'small' | 'medium';

export interface RadioProps {
  /** Selected state */
  selected: boolean;
  /** Press handler */
  onPress: () => void;
  /** Label text */
  label?: string;
  /** Size variant */
  size?: RadioSize;
  /** Tight spacing between control and label */
  tight?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Test ID */
  testID?: string;
  /** Custom style */
  style?: ViewStyle;
}

const sizeConfig: Record<
  RadioSize,
  { outer: number; inner: number; fontSize: number; gap: number; tightGap: number }
> = {
  small: {
    outer: 18,
    inner: 8,
    fontSize: 13,
    gap: spacing.primitive[2], // 8px normal
    tightGap: spacing.primitive[1], // 4px tight
  },
  medium: {
    outer: 22,
    inner: 10,
    fontSize: typography.fontSize.sm, // 14px
    gap: spacing.primitive[3], // 12px normal
    tightGap: spacing.primitive[2], // 8px tight
  },
};

export const Radio: React.FC<RadioProps> = ({
  selected,
  onPress,
  label,
  size = 'medium',
  tight = false,
  disabled = false,
  testID,
  style,
}) => {
  const sizeStyle = sizeConfig[size];
  const scaleAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  // Inner dot animation
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: selected ? 1 : 0,
      damping: 12,
      stiffness: 200,
      useNativeDriver: true,
    }).start();
  }, [selected, scaleAnim]);

  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  const getOuterCircleStyle = (pressed: boolean): ViewStyle => {
    return {
      width: sizeStyle.outer,
      height: sizeStyle.outer,
      borderRadius: radius.primitive.full, // 9999
      borderWidth: 2,
      borderColor: disabled
        ? selected
          ? colors.content.disabled.default
          : colors.border.disabled.default
        : selected
        ? colors.content.brand.default
        : colors.border.solid.alternative,
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: pressed && !disabled ? 0.7 : 1,
    };
  };

  const innerCircleStyle: ViewStyle = {
    width: sizeStyle.inner,
    height: sizeStyle.inner,
    borderRadius: radius.primitive.full, // 9999
    backgroundColor: disabled
      ? colors.content.disabled.default
      : colors.content.brand.default,
  };

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tight ? sizeStyle.tightGap : sizeStyle.gap,
    minHeight: 44, // Minimum touch target
    opacity: disabled ? 0.4 : 1,
  };

  const labelStyle: TextStyle = {
    fontSize: sizeStyle.fontSize,
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.base,
    color: disabled
      ? colors.content.disabled.default
      : colors.content.base.default,
    lineHeight: sizeStyle.fontSize * 1.5,
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={label}
      testID={testID}
      style={[containerStyle, style]}
    >
      {({ pressed }) => (
        <>
          <View style={getOuterCircleStyle(pressed)}>
            {selected && (
              <Animated.View style={[innerCircleStyle, { transform: [{ scale: scaleAnim }] }]} />
            )}
          </View>
          {label && <Text style={labelStyle}>{label}</Text>}
        </>
      )}
    </Pressable>
  );
};

Radio.displayName = 'Radio';
