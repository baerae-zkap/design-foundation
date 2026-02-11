/**
 * PlayBadge Component (React Native)
 *
 * @description 비디오 콘텐츠를 나타내는 재생 아이콘 오버레이 배지입니다.
 * @see docs/components/PlayBadge.md - AI용 상세 가이드
 *
 * @example
 * <PlayBadge
 *   variant="normal"
 *   size="medium"
 *   onPress={() => console.log('Play video')}
 * />
 */

import React, { forwardRef } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { Play } from 'lucide-react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';

export type PlayBadgeSize = 'small' | 'medium' | 'large';
export type PlayBadgeVariant = 'normal' | 'alternative';

export interface PlayBadgeProps extends Omit<PressableProps, 'style'> {
  /** Visual variant */
  variant?: PlayBadgeVariant;
  /** Size of the badge */
  size?: PlayBadgeSize;
  /** Press handler */
  onPress?: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Test ID */
  testID?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Custom style */
  style?: ViewStyle;
}

const sizeConfig: Record<PlayBadgeSize, { container: number; triangle: number }> = {
  small: { container: 32, triangle: 10 }, // 32px container, 10px triangle base
  medium: { container: 48, triangle: 16 }, // 48px container, 16px triangle base
  large: { container: 64, triangle: 20 }, // 64px container, 20px triangle base
};

export const PlayBadge = forwardRef<View, PlayBadgeProps>(
  (
    {
      variant = 'normal',
      size = 'medium',
      onPress,
      disabled = false,
      testID,
      accessibilityLabel,
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];

    const getContainerStyle = (pressed: boolean): ViewStyle => ({
      width: sizeStyle.container,
      height: sizeStyle.container,
      borderRadius: radius.primitive.full, // 9999
      backgroundColor:
        variant === 'normal'
          ? colors.overlay.dim // rgba(17, 26, 31, 0.4) - dark semi-transparent
          : colors.surface.base.default, // #ffffff - white
      alignItems: 'center',
      justifyContent: 'center',
      opacity: pressed ? 0 : 1, // fade out on press
    });

    const triangleColor =
      variant === 'normal'
        ? colors.content.base.onColor // #ffffff - white triangle on dark bg
        : colors.content.base.default; // #3e4651 - dark triangle on white bg

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || 'Play video'}
        testID={testID}
        style={style}
        {...props}
      >
        {({ pressed }) => (
          <View style={getContainerStyle(pressed)}>
            <View style={{ marginLeft: spacing.primitive[1] }}>
              <Play
                size={sizeStyle.triangle}
                color={triangleColor}
                fill={triangleColor}
                strokeWidth={0}
              />
            </View>
          </View>
        )}
      </Pressable>
    );
  }
);

PlayBadge.displayName = 'PlayBadge';
