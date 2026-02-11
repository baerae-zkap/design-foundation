/**
 * Divider Component (React Native)
 *
 * @description 콘텐츠를 시각적으로 구분하는 구분선 컴포넌트입니다.
 * @see docs/components/Divider.md - AI용 상세 가이드
 *
 * @example
 * <Divider />
 * <Divider color="strong" inset={20} />
 * <Divider orientation="vertical" />
 */

import React from 'react';
import { View, type ViewProps, type ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerColor = 'default' | 'strong' | 'subtle';

export interface DividerProps extends ViewProps {
  /** 방향 (default: 'horizontal') */
  orientation?: DividerOrientation;
  /** 색상 강도 (default: 'default') */
  color?: DividerColor;
  /** 두께 (default: 1) */
  thickness?: number;
  /** 인셋 (좌우 여백). 숫자 또는 { left, right } 객체 */
  inset?: number | { left?: number; right?: number };
  /** 상하 여백 (horizontal) 또는 좌우 여백 (vertical) */
  spacing?: number;
  /** 스타일 오버라이드 */
  style?: ViewStyle;
}

const colorMap: Record<DividerColor, string> = {
  default: colors.border.base.default,
  strong: colors.border.solid.default,
  subtle: colors.border.solid.alternative,
};

export const Divider = React.memo<DividerProps>(function Divider({
  orientation = 'horizontal',
  color = 'default',
  thickness = 1,
  inset,
  spacing: spacingProp,
  style,
  ...rest
}) {
  const dividerColor = colorMap[color];
  const defaultSpacing = spacingProp ?? 0;

  const insetLeft =
    typeof inset === 'number'
      ? inset
      : typeof inset === 'object'
        ? (inset.left ?? 0)
        : 0;

  const insetRight =
    typeof inset === 'number'
      ? inset
      : typeof inset === 'object'
        ? (inset.right ?? 0)
        : 0;

  const isHorizontal = orientation === 'horizontal';

  const dividerStyle: ViewStyle = isHorizontal
    ? {
        height: thickness,
        backgroundColor: dividerColor,
        marginLeft: insetLeft,
        marginRight: insetRight,
        marginTop: defaultSpacing,
        marginBottom: defaultSpacing,
      }
    : {
        width: thickness,
        backgroundColor: dividerColor,
        marginTop: insetLeft,
        marginBottom: insetRight,
        marginLeft: defaultSpacing,
        marginRight: defaultSpacing,
        alignSelf: 'stretch' as const,
      };

  return <View {...rest} style={[dividerStyle, style]} />;
});

/**
 * Preset: Screen-inset divider (좌우 20px 인셋)
 */
export const DividerInset = React.memo<Omit<DividerProps, 'inset'>>(
  function DividerInset(props) {
    return <Divider {...props} inset={spacing.semantic.screen.paddingX} />;
  },
);

/**
 * Preset: Section divider (상하 16px 여백)
 */
export const DividerSection = React.memo<Omit<DividerProps, 'spacing'>>(
  function DividerSection(props) {
    return <Divider {...props} spacing={spacing.component.divider.marginY} />;
  },
);
