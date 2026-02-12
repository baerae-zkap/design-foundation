import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { palette } from '../../tokens/colors';

export interface LoadingDotsProps {
  /** Dot color */
  color?: string;
  /** Dot size (diameter) */
  size?: number;
  /** Gap between dots */
  gap?: number;
}

const PULSE_DURATION = 400;
const STAGGER = 160;
const TOTAL_CYCLE = PULSE_DURATION * 2 + STAGGER * 2;

export function LoadingDots({
  color = palette.static.white,
  size = 6,
  gap = 6,
}: LoadingDotsProps) {
  return (
    <View style={[styles.container, { gap }]}>
      {[0, 1, 2].map((index) => (
        <WaveDot key={index} size={size} color={color} index={index} />
      ))}
    </View>
  );
}

interface WaveDotProps {
  size: number;
  color: string;
  index: number;
}

function WaveDot({ size, color, index }: WaveDotProps) {
  const anim = useRef(new Animated.Value(0)).current;
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const preDelay = index * STAGGER;
    const postDelay = (2 - index) * STAGGER;

    const runCycle = () => {
      if (!mounted.current) return;

      Animated.sequence([
        Animated.delay(preDelay),
        Animated.timing(anim, {
          toValue: 1,
          duration: PULSE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: PULSE_DURATION,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(postDelay),
      ]).start(() => {
        if (mounted.current) {
          runCycle();
        }
      });
    };

    runCycle();

    return () => {
      mounted.current = false;
      anim.stopAnimation();
    };
  }, [anim, index]);

  const opacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale }],
        opacity,
      }}
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
