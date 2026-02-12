/**
 * ProgressIndicator Component (React Native)
 *
 * @description 완료 퍼센트를 보여주는 선형 진행 표시줄입니다.
 *
 * @example
 * <ProgressIndicator
 *   progress={0.6}
 *   size="medium"
 *   animate={true}
 * />
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import {
  Animated,
  View,
  type ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';

export type ProgressIndicatorSize = 'small' | 'medium' | 'large';

export interface ProgressIndicatorProps {
  /** 진행률 (0.0 ~ 1.0) */
  progress: number;
  /** 표시줄 크기 */
  size?: ProgressIndicatorSize;
  /** 인디케이터(채워진 부분) 색상 */
  color?: string;
  /** 트랙(배경) 색상 */
  trackColor?: string;
  /** 부드러운 애니메이션 활성화 */
  animate?: boolean;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
}

const sizeConfig: Record<ProgressIndicatorSize, number> = {
  small: 2,
  medium: 4,
  large: 6,
};

export const ProgressIndicator = forwardRef<View, ProgressIndicatorProps>(
  (
    {
      progress,
      size = 'small',
      color = colors.surface.brand.default,
      trackColor = colors.surface.base.alternative,
      animate = true,
      style,
      testID,
    },
    ref
  ) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const height = sizeConfig[size];

    const widthAnim = useRef(new Animated.Value(clampedProgress)).current;

    useEffect(() => {
      if (animate) {
        Animated.timing(widthAnim, {
          toValue: clampedProgress,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } else {
        widthAnim.setValue(clampedProgress);
      }
    }, [clampedProgress, animate, widthAnim]);

    const animatedWidth = widthAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    });

    return (
      <View
        ref={ref}
        testID={testID}
        style={[
          {
            width: '100%',
            height,
            backgroundColor: trackColor,
            borderRadius: radius.primitive.full,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        <Animated.View
          style={{
            height: '100%',
            width: animatedWidth,
            backgroundColor: color,
            borderRadius: radius.primitive.full,
          }}
        />
      </View>
    );
  }
);

ProgressIndicator.displayName = 'ProgressIndicator';
