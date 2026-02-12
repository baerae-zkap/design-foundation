/**
 * Checkbox Component (React Native)
 *
 * @description 사용자가 옵션을 선택하거나 해제할 수 있는 체크박스입니다.
 * @see docs/components/Checkbox.md - AI용 상세 가이드
 *
 * @example
 * <Checkbox
 *   checked={checked}
 *   onPress={() => setChecked(!checked)}
 *   label="동의합니다"
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
import { Check, Minus } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type CheckboxSize = 'small' | 'medium';

export interface CheckboxProps {
  /** Checked state */
  checked: boolean;
  /** Indeterminate state (dash icon) */
  indeterminate?: boolean;
  /** Press handler */
  onPress: () => void;
  /** Label text */
  label?: string;
  /** Size variant */
  size?: CheckboxSize;
  /** Compact spacing between control and label */
  tight?: boolean;
  /** Bold label text weight */
  bold?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Test ID */
  testID?: string;
}

const sizeConfig: Record<
  CheckboxSize,
  { control: number; icon: number; fontSize: number; gap: number; tightGap: number }
> = {
  small: {
    control: 18,
    icon: 10,
    fontSize: typography.fontSize.sm, // 14px
    gap: spacing.primitive[2], // 8px
    tightGap: spacing.primitive[1], // 4px
  },
  medium: {
    control: 22,
    icon: 14,
    fontSize: typography.fontSize.md, // 16px
    gap: spacing.primitive[3], // 12px
    tightGap: spacing.primitive[2], // 8px
  },
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  indeterminate = false,
  onPress,
  label,
  size = 'medium',
  tight = false,
  bold = false,
  disabled = false,
  testID,
}) => {
  const sizeStyle = sizeConfig[size];
  const scaleAnim = useRef(new Animated.Value(checked || indeterminate ? 1 : 0)).current;

  // Check animation
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: checked || indeterminate ? 1 : 0,
      damping: 12,
      stiffness: 200,
      useNativeDriver: true,
    }).start();
  }, [checked, indeterminate, scaleAnim]);

  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  const getControlStyle = (pressed: boolean): ViewStyle => {
    return {
      width: sizeStyle.control,
      height: sizeStyle.control,
      borderRadius: radius.primitive.xs, // 4px
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: checked || indeterminate ? 0 : 1.5,
      borderColor: colors.border.solid.alternative,
      backgroundColor:
        checked || indeterminate
          ? colors.surface.brand.default
          : 'transparent',
      opacity: pressed && !disabled ? 0.7 : 1,
    };
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
    fontWeight: bold ? typography.fontWeight.semibold : typography.fontWeight.regular,
    color: colors.content.base.default,
    lineHeight: sizeStyle.fontSize * 1.5,
  };

  const renderIcon = () => {
    const iconColor = colors.content.base.onColor; // white

    if (indeterminate) {
      return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Minus size={sizeStyle.icon} color={iconColor} strokeWidth={2.5} />
        </Animated.View>
      );
    }

    if (checked) {
      return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Check size={sizeStyle.icon} color={iconColor} strokeWidth={2.5} />
        </Animated.View>
      );
    }

    return null;
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
      accessibilityLabel={label}
      testID={testID}
      style={containerStyle}
    >
      {({ pressed }) => (
        <>
          <View style={getControlStyle(pressed)}>{renderIcon()}</View>
          {label && <Text style={labelStyle}>{label}</Text>}
        </>
      )}
    </Pressable>
  );
};

Checkbox.displayName = 'Checkbox';
