/**
 * PaginationDots Component (React Native)
 *
 * @description 캐러셀/슬라이더용 점 기반 페이지네이션 인디케이터
 * @see docs/components/PaginationDots.md - AI용 상세 가이드
 *
 * @example
 * <PaginationDots
 *   total={5}
 *   current={0}
 *   onDotPress={(index) => {}}
 *   variant="normal"
 *   size="small"
 * />
 */

import React, { forwardRef, useEffect, useRef } from 'react';
import {
  View,
  Pressable,
  Animated,
  type ViewStyle,
} from 'react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type PaginationDotsVariant = 'normal' | 'white';
export type PaginationDotsSize = 'small' | 'medium';

export interface PaginationDotsProps {
  /** 전체 점 개수 */
  total: number;
  /** 현재 활성 점 인덱스 (0-based) */
  current: number;
  /** 점 클릭 핸들러 */
  onDotPress?: (index: number) => void;
  /** 색상 변형 - normal(default), white(어두운 배경용) */
  variant?: PaginationDotsVariant;
  /** 크기 - small(6px), medium(8px) */
  size?: PaginationDotsSize;
  /** 최대 표시 점 개수 (슬라이딩 윈도우) */
  maxDots?: number;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
}

/**
 * PaginationDots
 *
 * 캐러셀/슬라이더용 점 기반 페이지네이션 인디케이터.
 * total > maxDots인 경우 슬라이딩 윈도우로 표시.
 */
export const PaginationDots = forwardRef<View, PaginationDotsProps>(
  (
    {
      total,
      current,
      onDotPress,
      variant = 'normal',
      size = 'small',
      maxDots = 5,
      style,
      testID,
    },
    ref
  ) => {
    // 크기별 설정
    const dotSize = size === 'small' ? 6 : 8;
    const activeDotScale = 1.5;
    const gap = size === 'small' ? spacing.primitive[1] : spacing.primitive[2]; // 4px / 8px

    // 색상 설정
    const activeDotColor =
      variant === 'normal'
        ? colors.surface.brand.default // #0066ff
        : colors.content.base.onColor; // white
    const inactiveDotColor =
      variant === 'normal'
        ? colors.border.base.default // grey
        : 'rgba(255,255,255,0.4)';

    // 슬라이딩 윈도우 계산
    const visibleDots = Math.min(total, maxDots);
    let startIndex = 0;
    if (total > maxDots) {
      startIndex = Math.max(0, Math.min(current - Math.floor(maxDots / 2), total - maxDots));
    }
    const visibleIndices = Array.from({ length: visibleDots }, (_, i) => startIndex + i);

    return (
      <View
        ref={ref}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap,
          },
          style,
        ]}
        accessibilityRole="tablist"
        testID={testID}
      >
        {visibleIndices.map((index) => (
          <Dot
            key={index}
            index={index}
            active={index === current}
            dotSize={dotSize}
            activeDotScale={activeDotScale}
            activeDotColor={activeDotColor}
            inactiveDotColor={inactiveDotColor}
            onPress={onDotPress}
          />
        ))}
      </View>
    );
  }
);

PaginationDots.displayName = 'PaginationDots';

/**
 * 개별 Dot 컴포넌트
 */
interface DotProps {
  index: number;
  active: boolean;
  dotSize: number;
  activeDotScale: number;
  activeDotColor: string;
  inactiveDotColor: string;
  onPress?: (index: number) => void;
}

function Dot({
  index,
  active,
  dotSize,
  activeDotScale,
  activeDotColor,
  inactiveDotColor,
  onPress,
}: DotProps) {
  const scaleAnim = useRef(new Animated.Value(active ? activeDotScale : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: active ? activeDotScale : 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, [active, activeDotScale, scaleAnim]);

  const handlePress = () => {
    if (onPress) {
      onPress(index);
    }
  };

  return (
    <Pressable
      onPress={onPress ? handlePress : undefined}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`Page ${index + 1}`}
      disabled={!onPress}
    >
      <Animated.View
        style={{
          width: dotSize,
          height: dotSize,
          borderRadius: radius.primitive.full, // 9999
          backgroundColor: active ? activeDotColor : inactiveDotColor,
          transform: [{ scale: scaleAnim }],
        }}
      />
    </Pressable>
  );
}
