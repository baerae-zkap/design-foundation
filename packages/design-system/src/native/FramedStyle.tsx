/**
 * FramedStyle Component (React Native)
 *
 * @description 여러 요소를 하나의 프레임으로 감싸 정보의 그룹화를 명확히 하기 위한 컴포넌트.
 * 그룹 단위의 선택된 상태를 시각적으로 강조하기 위해 사용.
 * @see docs/components/FramedStyle.md - AI용 상세 가이드
 *
 * @example
 * <FramedStyle size="medium" selected={false}>
 *   <ListCell title="홍길동" subtitle="hong@example.com" />
 * </FramedStyle>
 */

import React, { forwardRef } from 'react';
import { View, Pressable, Platform, type ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';

export type FramedStyleVariant = 'normal' | 'negative';
export type FramedStyleSize = 'small' | 'medium' | 'large' | 'xlarge';

export interface FramedStyleProps {
  /** Child content to wrap */
  children: React.ReactNode;
  /** Visual variant */
  variant?: FramedStyleVariant;
  /** Selected state - shows brand border + shadow */
  selected?: boolean;
  /** Size preset (padding + borderRadius) */
  size?: FramedStyleSize;
  /** Custom padding override */
  padding?: number;
  /** Custom borderRadius override */
  borderRadius?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Press handler (makes the frame tappable) */
  onPress?: () => void;
  /** Custom style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

// Size config using Foundation tokens
const sizeConfig: Record<FramedStyleSize, { padding: number; borderRadius: number }> = {
  small: { padding: spacing.primitive[2], borderRadius: radius.primitive.sm },       // 8, 8
  medium: { padding: spacing.primitive[3], borderRadius: radius.primitive.md },      // 12, 12
  large: { padding: spacing.primitive[4], borderRadius: radius.primitive.lg },       // 16, 16
  xlarge: { padding: spacing.primitive[5], borderRadius: radius.primitive.xl },      // 20, 20
};

export const FramedStyle = forwardRef<View, FramedStyleProps>(
  (
    {
      children,
      variant = 'normal',
      selected = false,
      size = 'medium',
      padding: customPadding,
      borderRadius: customBorderRadius,
      disabled = false,
      onPress,
      style,
      testID,
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];
    const isInteractive = !!onPress && !disabled;

    // Determine border color based on variant and selection
    const getBorderColor = () => {
      if (selected) {
        return variant === 'negative'
          ? colors.border.error.default
          : colors.content.brand.default;
      }
      return colors.border.solid.alternative;
    };

    const containerStyle: ViewStyle = {
      backgroundColor: colors.surface.base.default,
      borderWidth: selected ? 1.5 : 1,
      borderColor: getBorderColor(),
      borderRadius: customBorderRadius ?? sizeStyle.borderRadius,
      padding: customPadding ?? sizeStyle.padding,
      opacity: disabled ? 0.4 : 1,
      // Shadow for selected state
      ...(selected && Platform.OS === 'ios' && {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      }),
      ...(selected && Platform.OS === 'android' && {
        elevation: 4,
      }),
    };

    const content = <View style={{ flex: 1 }}>{children}</View>;

    if (isInteractive) {
      return (
        <Pressable
          ref={ref as React.Ref<View>}
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [
            containerStyle,
            pressed && {
              backgroundColor: colors.surface.base.container,
            },
            style,
          ]}
          testID={testID}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View
        ref={ref}
        style={[containerStyle, style]}
        testID={testID}
      >
        {content}
      </View>
    );
  }
);

FramedStyle.displayName = 'FramedStyle';
