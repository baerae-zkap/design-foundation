'use client';

import { Layout } from '@/design-system/components/Layout/Layout';
import * as styles from '@/design-system/components/Skeleton/Skeleton.css';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { ComponentProps, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type SkeletonProps = {
  width?: number;
  height?: number;
  delay?: number;
  isHideAnimated?: boolean;
};

function SkeletonPrimitive({
  width,
  height,
  layout = 'hug',
  shape = 'rectangle',
  delay,
  style,
  isHideAnimated,
  ...props
}: ComponentProps<typeof View> & SkeletonProps & styles.SkeletonVariants) {
  const { tokens } = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    const animation = withRepeat(
      withTiming(1, {
        duration: 1500,
        easing: Easing.bezier(0.4, 0.0, 0.6, 1.0),
      }),
      -1,
      true,
    );

    progress.value = delay ? withDelay(delay, animation) : animation;
  }, [delay, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value * 0.5 + 0.5,
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [tokens.surface.base.container, tokens.surface.disabled.default],
      ),
    };
  });

  if (isHideAnimated) {
    return (
      <View
        style={[
          styles.skeleton({ layout, shape }),
          { width, height, backgroundColor: tokens.surface.base.container },
          style,
        ]}
        {...props}
      />
    );
  }

  return (
    <Animated.View
      style={[styles.skeleton({ layout, shape }), { width, height }, style, animatedStyle]}
      {...props}
    />
  );
}

export function Skeleton({
  layout = 'hug',
  ...props
}: ComponentProps<typeof SkeletonPrimitive> & ComponentProps<typeof Layout>) {
  return (
    <Layout layout={layout}>
      <SkeletonPrimitive layout={layout} {...props} />
    </Layout>
  );
}
