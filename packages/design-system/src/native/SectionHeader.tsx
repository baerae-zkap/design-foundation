/**
 * SectionHeader Component (React Native)
 *
 * @description 리스트 섹션 상단에 사용되는 타이틀 컴포넌트입니다.
 * @see docs/components/SectionHeader.md - AI용 상세 가이드
 *
 * @example
 * <SectionHeader title="내 자산" />
 *
 * <SectionHeader
 *   title="설정"
 *   action={<TextButton size="small">전체보기</TextButton>}
 * />
 */

import React, { forwardRef, type ReactNode } from 'react';
import {
  View,
  Text,
  type ViewProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

export type SectionHeaderSize = 'small' | 'medium' | 'large';

export interface SectionHeaderProps extends Omit<ViewProps, 'style'> {
  /** 섹션 타이틀 */
  title: string;
  /** 우측 액션 영역 (버튼, 링크 등) */
  action?: ReactNode;
  /** 크기 */
  size?: SectionHeaderSize;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

// Size configurations (from Foundation tokens)
const sizeConfig: Record<SectionHeaderSize, {
  fontSize: number;
  paddingX: number;
  paddingTop: number;
  paddingBottom: number;
}> = {
  small: {
    fontSize: 13,
    paddingX: 16,  // primitive.4
    paddingTop: 16, // primitive.4
    paddingBottom: 8, // primitive.2
  },
  medium: {
    fontSize: 14,
    paddingX: 16,  // primitive.4
    paddingTop: 16, // primitive.4
    paddingBottom: 8, // primitive.2
  },
  large: {
    fontSize: 15,
    paddingX: 16,  // primitive.4
    paddingTop: 16, // primitive.4
    paddingBottom: 8, // primitive.2
  },
};

export const SectionHeader = forwardRef<View, SectionHeaderProps>(
  (
    {
      title,
      action,
      size = 'medium',
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: sizeStyle.paddingX,
      paddingTop: sizeStyle.paddingTop,
      paddingBottom: sizeStyle.paddingBottom,
    };

    const titleStyle: TextStyle = {
      fontSize: sizeStyle.fontSize,
      fontWeight: '600',
      color: '#94a3b8', // content.base.tertiary
      lineHeight: sizeStyle.fontSize * 1.4,
      textTransform: 'uppercase',
      letterSpacing: 0.3,
    };

    return (
      <View ref={ref} style={[containerStyle, style]} {...props}>
        <Text style={titleStyle}>{title}</Text>
        {action && <View>{action}</View>}
      </View>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
