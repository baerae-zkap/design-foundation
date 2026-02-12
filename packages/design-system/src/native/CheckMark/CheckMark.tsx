/**
 * CheckMark Component (React Native)
 *
 * @description 약관/동의 확인을 위한 체크마크 컴포넌트. 컨트롤(체크 아이콘) + 라벨로 구성되며, 라벨을 포함한 전체 영역이 클릭 가능합니다.
 * @see docs/components/CheckMark.md - AI용 상세 가이드
 *
 * @example
 * <CheckMark
 *   label="이용약관에 동의합니다"
 *   checked={agreed}
 *   onPress={() => setAgreed(!agreed)}
 *   size="medium"
 * />
 */

import React, { forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet, type ViewStyle, type TextStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export type CheckMarkSize = 'small' | 'medium';

export interface CheckMarkProps {
  /** Label text displayed next to the check icon */
  label: string;
  /** Whether the checkmark is active (checked) */
  checked?: boolean;
  /** Press handler to toggle state */
  onPress?: () => void;
  /** Size variant */
  size?: CheckMarkSize;
  /** Tight spacing mode (reduces gap between items) */
  tight?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Test identifier */
  testID?: string;
}

// Size configuration
const sizeConfig = {
  small: {
    iconSize: 16,
    fontSize: typography.fontSize.sm, // 14
    lineHeight: typography.lineHeight.sm, // 20
  },
  medium: {
    iconSize: 20,
    fontSize: typography.fontSize.md, // 16
    lineHeight: typography.lineHeight.md, // 24
  },
} as const;

export const CheckMark = forwardRef<View, CheckMarkProps>(
  (
    {
      label,
      checked = false,
      onPress,
      size = 'medium',
      tight = false,
      disabled = false,
      style,
      testID,
    },
    ref
  ) => {
    const config = sizeConfig[size];

    // Color logic based on state
    const getIconColor = (pressed: boolean) => {
      if (disabled) {
        return colors.content.disabled.default;
      }
      if (checked) {
        return pressed ? colors.content.brand.default : colors.content.brand.default;
      }
      return pressed ? colors.content.base.secondary : colors.content.base.alternative;
    };

    const getTextColor = () => {
      if (disabled) {
        return colors.content.disabled.default;
      }
      return colors.content.base.default;
    };

    const getOpacity = (pressed: boolean) => {
      if (disabled) return 1;
      return pressed ? 0.8 : 1;
    };

    return (
      <Pressable
        ref={ref}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        accessibilityLabel={label}
        testID={testID}
        style={({ pressed }) => [
          styles.container,
          tight && styles.containerTight,
          { opacity: getOpacity(pressed) },
          style,
        ]}
      >
        {({ pressed }) => (
          <>
            <Check
              size={config.iconSize}
              color={getIconColor(pressed)}
              strokeWidth={2}
            />
            <Text
              style={[
                styles.label,
                {
                  fontSize: config.fontSize,
                  lineHeight: config.lineHeight,
                  color: getTextColor(),
                },
              ]}
            >
              {label}
            </Text>
          </>
        )}
      </Pressable>
    );
  }
);

CheckMark.displayName = 'CheckMark';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[2], // 8px
    minHeight: 44, // Minimum touch target
    paddingVertical: spacing.primitive[2], // 8px
  },
  containerTight: {
    paddingVertical: spacing.primitive[1], // 4px (tight mode)
  },
  label: {
    flex: 1,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
  },
});
