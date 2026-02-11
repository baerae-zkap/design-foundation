/**
 * Segmented Control Component (React Native)
 *
 * @description 여러 옵션 중 하나를 선택하는 수평 버튼 그룹 컴포넌트입니다.
 * 선택된 항목은 시각적으로 강조되며, 같은 콘텐츠 영역 내에서 보기 방식이나 필터를 변경할 때 사용됩니다.
 *
 * @see docs/components/SegmentedControl.md - AI용 상세 가이드
 * @reference Montage Design System - Segmented Control
 * @reference TDS Mobile - Segmented Control
 *
 * @example
 * // Value-based (권장)
 * <SegmentedControl
 *   value={selected}
 *   onChange={(value) => setSelected(value)}
 * >
 *   <SegmentedControl.Item value="all" label="전체" />
 *   <SegmentedControl.Item value="progress" label="진행중" />
 *   <SegmentedControl.Item value="done" label="완료" />
 * </SegmentedControl>
 *
 * @example
 * // Segments array
 * <SegmentedControl
 *   segments={[
 *     { label: '전체', value: 'all' },
 *     { label: '진행중', value: 'progress' },
 *     { label: '완료', value: 'done' },
 *   ]}
 *   value="all"
 *   onChange={(value) => {}}
 * />
 */

import React, { forwardRef, useRef, useEffect, useState, useCallback, type ReactNode } from 'react';
import {
  View,
  Pressable,
  Text,
  Animated,
  ScrollView,
  LayoutChangeEvent,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';

// ─── Types ───────────────────────────────────────────────────────────

export interface SegmentItem {
  /** 세그먼트 라벨 */
  label: string;
  /** 세그먼트 고유 값 */
  value: string;
  /** 좌측 아이콘 */
  icon?: ReactNode;
  /** 개별 비활성화 여부 */
  disabled?: boolean;
}

export type SegmentedControlSize = 'small' | 'medium' | 'large';

export type SegmentedControlVariant = 'solid' | 'outlined';

export type SegmentedControlAlignment = 'fixed' | 'fluid';

export interface SegmentedControlProps {
  /** 세그먼트 배열 (segments 방식) */
  segments?: SegmentItem[];
  /** 자식 컴포넌트 (compound 방식) */
  children?: ReactNode;

  // ── Value-based API (권장, Toss 스타일) ──
  /** 선택된 값 (controlled) */
  value?: string;
  /** 초기 선택 값 (uncontrolled) */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;

  // ── Index-based API (하위 호환) ──
  /** 선택된 인덱스 */
  selectedIndex?: number;
  /** 인덱스 변경 핸들러 */
  onIndexChange?: (index: number) => void;

  // ── Options ──
  /** 전체 비활성화 */
  disabled?: boolean;
  /** 크기: small(32px) / medium(36px) / large(42px) */
  size?: SegmentedControlSize;
  /** 변형: solid(채워진 인디케이터) / outlined(테두리 컨테이너) */
  variant?: SegmentedControlVariant;
  /** 정렬: fixed(균등 분할) / fluid(콘텐츠 기반 + 스크롤) */
  alignment?: SegmentedControlAlignment;
  /** 전체 너비 사용 */
  fullWidth?: boolean;

  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

// ─── Size Config (Foundation 토큰 기반) ──────────────────────────────

const scTokens = spacing.component.segmentedControl;
const rcTokens = radius.component.segmentedControl;

const sizeConfig: Record<
  SegmentedControlSize,
  { height: number; fontSize: number; lineHeight: number; paddingHorizontal: number }
> = {
  small: {
    height: scTokens.height.sm,                          // 32
    fontSize: typography.semantic.label.sm.fontSize,      // 12
    lineHeight: typography.semantic.label.sm.lineHeight,  // 18
    paddingHorizontal: scTokens.paddingX.sm,             // 12
  },
  medium: {
    height: scTokens.height.md,                          // 36
    fontSize: typography.semantic.label.md.fontSize,      // 14
    lineHeight: typography.semantic.label.md.lineHeight,  // 20
    paddingHorizontal: scTokens.paddingX.md,             // 16
  },
  large: {
    height: scTokens.height.lg,                          // 42
    fontSize: typography.semantic.body.sm.fontSize,       // 14
    lineHeight: typography.semantic.body.sm.lineHeight,   // 20
    paddingHorizontal: scTokens.paddingX.lg,             // 20
  },
};

// ─── SegmentedControl.Item (compound component 지원) ─────────────────

export interface SegmentedControlItemProps {
  /** 세그먼트 고유 값 */
  value: string;
  /** 세그먼트 라벨 */
  label?: string;
  /** children을 label로 사용 */
  children?: ReactNode;
  /** 좌측 아이콘 */
  icon?: ReactNode;
  /** 개별 비활성화 */
  disabled?: boolean;
}

function SegmentedControlItem(_props: SegmentedControlItemProps): null {
  // 렌더링되지 않음. 부모가 props를 추출하여 사용.
  return null;
}
SegmentedControlItem.displayName = 'SegmentedControl.Item';

// ─── Helper: children에서 segments 추출 ──────────────────────────────

function extractSegmentsFromChildren(children: ReactNode): SegmentItem[] {
  const segments: SegmentItem[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<SegmentedControlItemProps>(child)) {
      const { value, label, children: itemChildren, icon, disabled } = child.props;
      segments.push({
        value,
        label: label || (typeof itemChildren === 'string' ? itemChildren : ''),
        icon,
        disabled,
      });
    }
  });
  return segments;
}

// ─── Main Component ──────────────────────────────────────────────────

export const SegmentedControl = Object.assign(
  forwardRef<View, SegmentedControlProps>(
    (
      {
        segments: segmentsProp,
        children,
        value: valueProp,
        defaultValue,
        onChange,
        selectedIndex: selectedIndexProp,
        onIndexChange,
        disabled = false,
        size = 'medium',
        variant = 'solid',
        alignment = 'fixed',
        fullWidth = false,
        testID,
        accessibilityLabel,
        style,
      },
      ref
    ) => {
      // ── Segments 결정 (prop vs children) ──
      const segments = segmentsProp || extractSegmentsFromChildren(children);

      // ── 선택 상태 관리 (value-based 우선, index fallback) ──
      const isValueControlled = valueProp !== undefined;
      const isIndexControlled = selectedIndexProp !== undefined;

      const [internalValue, setInternalValue] = useState<string>(() => {
        if (valueProp !== undefined) return valueProp;
        if (defaultValue !== undefined) return defaultValue;
        if (selectedIndexProp !== undefined && segments[selectedIndexProp]) {
          return segments[selectedIndexProp].value;
        }
        return segments[0]?.value || '';
      });

      const currentValue = isValueControlled ? valueProp : internalValue;
      const selectedIndex = segments.findIndex((s) => s.value === currentValue);
      const safeSelectedIndex = selectedIndex >= 0 ? selectedIndex : 0;

      // Sync external selectedIndex prop
      useEffect(() => {
        if (isIndexControlled && !isValueControlled && segments[selectedIndexProp!]) {
          setInternalValue(segments[selectedIndexProp!].value);
        }
      }, [selectedIndexProp, isIndexControlled, isValueControlled, segments]);

      const handleSelect = useCallback(
        (index: number) => {
          const segment = segments[index];
          if (!segment || disabled || segment.disabled) return;

          if (!isValueControlled) {
            setInternalValue(segment.value);
          }
          onChange?.(segment.value);
          onIndexChange?.(index);
        },
        [segments, disabled, isValueControlled, onChange, onIndexChange]
      );

      // ── Layout & Animation ──
      const sizeStyle = sizeConfig[size];
      const isFluid = alignment === 'fluid';
      const indicatorAnim = useRef(new Animated.Value(0)).current;
      const [segmentLayouts, setSegmentLayouts] = useState<{ x: number; width: number }[]>([]);
      const scrollViewRef = useRef<ScrollView>(null);

      useEffect(() => {
        if (segmentLayouts.length > safeSelectedIndex) {
          Animated.spring(indicatorAnim, {
            toValue: safeSelectedIndex,
            damping: 20,
            stiffness: 200,
            mass: 0.8,
            useNativeDriver: false,
          }).start();

          // Fluid 모드: 선택 항목으로 자동 스크롤
          if (isFluid && scrollViewRef.current && segmentLayouts[safeSelectedIndex]) {
            scrollViewRef.current.scrollTo({
              x: Math.max(0, segmentLayouts[safeSelectedIndex].x - scTokens.paddingX.md),
              animated: true,
            });
          }
        }
      }, [safeSelectedIndex, segmentLayouts, indicatorAnim, isFluid]);

      const handleSegmentLayout = useCallback(
        (index: number, event: LayoutChangeEvent) => {
          const { x, width } = event.nativeEvent.layout;
          setSegmentLayouts((prev) => {
            const newLayouts = [...prev];
            newLayouts[index] = { x, width };
            return newLayouts;
          });
        },
        []
      );

      // ── Styles ──
      const containerStyle: ViewStyle = {
        backgroundColor:
          variant === 'solid'
            ? colors.surface.base.alternative   // grey[99] - 라이트 그레이 배경
            : colors.surface.base.default,      // white
        borderRadius: rcTokens.container,       // 8px
        padding: variant === 'solid' ? scTokens.containerPadding : 0,  // outlined: 0 (flush)
        ...(variant === 'solid' && { overflow: 'hidden' as const }),
        ...(variant === 'outlined' && {
          borderWidth: 1,
          borderColor: colors.border.base.default,
        }),
        opacity: disabled ? 0.4 : 1,
        ...(fullWidth && { alignSelf: 'stretch' as const, width: '100%' as any }),
      };

      const innerContainerStyle: ViewStyle = {
        flexDirection: 'row',
        position: 'relative',
      };

      const segmentBaseStyle: ViewStyle = {
        flex: !isFluid ? 1 : undefined,
        height: sizeStyle.height,
        paddingHorizontal: sizeStyle.paddingHorizontal,
        borderRadius: rcTokens.segment,         // 6px
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: scTokens.iconGap,                  // 8px
        zIndex: 2,
      };

      const getSegmentStyle = (index: number, isPressed: boolean): ViewStyle => {
        const segment = segments[index];
        const isDisabled = disabled || segment.disabled;

        return {
          ...segmentBaseStyle,
          backgroundColor: isPressed && !isDisabled ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
        };
      };

      const getTextStyle = (index: number): TextStyle => {
        const isSelected = index === safeSelectedIndex;
        const segment = segments[index];
        const isDisabled = disabled || segment.disabled;

        return {
          fontSize: sizeStyle.fontSize,
          lineHeight: sizeStyle.lineHeight,
          fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.medium,
          fontFamily: typography.fontFamily.base,
          color: isDisabled
            ? colors.content.base.disable           // grey[90]
            : isSelected
              ? colors.content.brand.default        // blue - 선택된 텍스트
              : colors.content.base.secondary,      // grey[50]
        };
      };

      const getIconColor = (index: number): string => {
        const isSelected = index === safeSelectedIndex;
        const segment = segments[index];
        const isDisabled = disabled || segment.disabled;

        if (isDisabled) return colors.content.base.disable;
        if (isSelected) return colors.content.brand.default;  // blue
        return colors.content.base.secondary;
      };

      // ── Animated Indicator ──
      const isOutlined = variant === 'outlined';
      const borderOverlap = isOutlined ? 1 : 0; // outlined: 인디케이터가 컨테이너 border를 덮도록

      const getIndicatorStyle = (): Animated.AnimatedProps<ViewStyle> => {
        if (segmentLayouts.length === 0 || segmentLayouts.length < segments.length) {
          return {
            position: 'absolute',
            height: sizeStyle.height,
            backgroundColor:
              variant === 'solid'
                ? colors.surface.base.default          // white - 흰 카드 인디케이터
                : colors.surface.brand.secondary,      // blue[95] - 연한 파란 배경
            borderRadius: isOutlined ? rcTokens.container : rcTokens.segment,
            zIndex: 1,
            opacity: 0,
          };
        }

        const inputRange = segments.map((_, i) => i);
        // outlined: 인디케이터를 1px씩 확장하여 컨테이너 border를 덮음
        const outputRangeX = segmentLayouts.map((layout) => (layout?.x ?? 0) - borderOverlap);
        const outputRangeWidth = segmentLayouts.map((layout) => (layout?.width ?? 0) + borderOverlap * 2);

        return {
          position: 'absolute',
          top: -borderOverlap,
          height: sizeStyle.height + borderOverlap * 2,
          backgroundColor:
            variant === 'solid'
              ? colors.surface.base.default            // white - 흰 카드 인디케이터
              : colors.surface.brand.secondary,        // blue[95] - 연한 파란 배경
          borderRadius: isOutlined ? rcTokens.container : rcTokens.segment,
          zIndex: 1,
          left: inputRange.length > 1
            ? indicatorAnim.interpolate({
                inputRange,
                outputRange: outputRangeX,
                extrapolate: 'clamp',
              })
            : outputRangeX[0],
          width: inputRange.length > 1
            ? indicatorAnim.interpolate({
                inputRange,
                outputRange: outputRangeWidth,
                extrapolate: 'clamp',
              })
            : outputRangeWidth[0],
          ...(variant === 'solid'
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.12,
                shadowRadius: 3,
                elevation: 2,
              }
            : {
                borderWidth: 1,
                borderColor: colors.border.brand.default,  // blue - 파란 테두리가 gray 테두리를 덮음
              }),
        };
      };

      // ── Render ──
      const renderSegments = () => (
        <>
          <Animated.View style={getIndicatorStyle()} />
          {segments.map((segment, index) => {
            const isSelected = index === safeSelectedIndex;
            const isDisabled = disabled || segment.disabled;
            const iconColor = getIconColor(index);

            return (
              <Pressable
                key={segment.value}
                disabled={isDisabled}
                onPress={() => handleSelect(index)}
                onLayout={(e) => handleSegmentLayout(index, e)}
                accessibilityRole="radio"
                accessibilityState={{
                  checked: isSelected,
                  disabled: isDisabled,
                }}
                accessibilityLabel={segment.label || undefined}
                style={({ pressed }) => getSegmentStyle(index, pressed)}
              >
                {segment.icon
                  ? React.isValidElement(segment.icon)
                    ? React.cloneElement(segment.icon as React.ReactElement<any>, {
                        color: iconColor,
                      })
                    : segment.icon
                  : null}
                {segment.label ? (
                  <Text style={getTextStyle(index)} numberOfLines={1}>
                    {segment.label}
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
        </>
      );

      if (isFluid) {
        return (
          <View ref={ref} style={[containerStyle, style]} testID={testID}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              accessibilityRole="radiogroup"
              accessibilityLabel={accessibilityLabel}
            >
              <View style={innerContainerStyle}>{renderSegments()}</View>
            </ScrollView>
          </View>
        );
      }

      return (
        <View
          ref={ref}
          style={[containerStyle, style]}
          testID={testID}
          accessibilityRole="radiogroup"
          accessibilityLabel={accessibilityLabel}
        >
          <View style={innerContainerStyle}>{renderSegments()}</View>
        </View>
      );
    }
  ),
  { Item: SegmentedControlItem }
);

SegmentedControl.displayName = 'SegmentedControl';
