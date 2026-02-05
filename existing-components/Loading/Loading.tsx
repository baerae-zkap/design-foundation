import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { AppState, View } from 'react-native';
import { ComponentProps, useCallback, useEffect } from 'react';
import * as styles from '@/design-system/components/Loading/Loading.css';
import { Box } from '@/design-system/components/Box/Box';

type LoadingProps = {
  size?: AnimatedCircleProps['size'];
  delay?: AnimatedCircleProps['delay'][];
};

export const Loading = ({
  size = 6,
  delay = [0, 150, 300],
  color,
  ...props
}: LoadingProps &
  styles.AnimatedCircleVariants &
  Omit<ComponentProps<typeof Box>, 'color' | 'layout' | 'align' | 'style'>) => {
  return (
    <Box layout="hug" align="center" {...props} style={styles.animatedCircleContainer()}>
      {delay.map((delay, index) => (
        <AnimatedCircle size={size} key={index} color={color} delay={delay} />
      ))}
    </Box>
  );
};

Loading.displayName = 'Loading';

type AnimatedCircleProps = {
  size: number;
  delay: number;
};

const AnimatedCircle = ({
  size,
  color,
  delay,
}: AnimatedCircleProps & styles.AnimatedCircleVariants) => {
  const { tokens } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const startAnimation = useCallback(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.75, {
            duration: 500,
            easing: Easing.in(Easing.ease),
          }),
          withTiming(1, {
            duration: 500,
            easing: Easing.out(Easing.ease),
          }),
        ),
        -1,
      ),
    );

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7, {
            duration: 500,
            easing: Easing.in(Easing.ease),
          }),
          withTiming(1, {
            duration: 500,
            easing: Easing.out(Easing.ease),
          }),
        ),
        -1,
      ),
    );
  }, [delay, opacity, scale]);

  useEffect(() => {
    startAnimation();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        cancelAnimation(scale);
        cancelAnimation(opacity);
        scale.value = 1;
        opacity.value = 1;
        startAnimation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [startAnimation, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[{ width: size, height: size }, animatedStyle]}>
      <View style={styles.animatedCircle({ tokens, color })} />
    </Animated.View>
  );
};

AnimatedCircle.displayName = 'AnimatedCircle';
