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
  Pressable,
  type ViewProps,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

export type SectionHeaderSize = 'small' | 'medium' | 'large';

export interface SectionHeaderProps extends Omit<ViewProps, 'style'> {
  /** 섹션 타이틀 */
  title: string;
  /** 타이틀 우측 콘텐츠 (FilterButton, IconButton, Chip 등) */
  headingContent?: ReactNode;
  /** 우측 액션 영역 (버튼, 링크 등) - 최우선 */
  action?: ReactNode;
  /** 크기 */
  size?: SectionHeaderSize;
  /** 설명 텍스트 */
  description?: string;
  /** 설명 위치 (title 기준) */
  descriptionPosition?: 'top' | 'bottom';
  /** 우측 텍스트 */
  rightText?: string;
  /** 우측 영역 클릭 핸들러 */
  onRightPress?: () => void;
  /** 화살표 표시 (rightText와 함께 사용) */
  showArrow?: boolean;
  /** 타이틀 굵기 */
  titleWeight?: 'regular' | 'medium' | 'bold';
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

// Size configurations (from Foundation tokens + Montage spec)
const sizeConfig: Record<SectionHeaderSize, {
  fontSize: number;
  lineHeight: number;
  paddingX: number;
  paddingTop: number;
  paddingBottom: number;
}> = {
  small: {
    fontSize: 17,                     // Montage: Headline 1/Bold
    lineHeight: 17 * 1.35,            // ~23px
    paddingX: spacing.component.list.itemPaddingX, // 20px
    paddingTop: spacing.component.list.itemPaddingY, // 16px
    paddingBottom: spacing.primitive[2], // 8px
  },
  medium: {
    fontSize: 20,                     // Montage: Heading 2/Bold
    lineHeight: 20 * 1.35,            // ~27px
    paddingX: spacing.component.list.itemPaddingX, // 20px
    paddingTop: spacing.component.list.itemPaddingY, // 16px
    paddingBottom: spacing.primitive[2], // 8px
  },
  large: {
    fontSize: 24,                     // Montage: Title 3/Bold
    lineHeight: 24 * 1.35,            // ~32px
    paddingX: spacing.component.list.itemPaddingX, // 20px
    paddingTop: spacing.component.list.itemPaddingY, // 16px
    paddingBottom: spacing.primitive[3], // 12px
  },
};

export const SectionHeader = forwardRef<View, SectionHeaderProps>(
  (
    {
      title,
      headingContent,
      action,
      size = 'medium',
      description,
      descriptionPosition = 'bottom',
      rightText,
      onRightPress,
      showArrow = false,
      titleWeight = 'bold',
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];

    const containerStyle: ViewStyle = {
      paddingHorizontal: sizeStyle.paddingX,
      paddingTop: sizeStyle.paddingTop,
      paddingBottom: sizeStyle.paddingBottom,
    };

    const rowStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'flex-end', // Montage: baseline-align
      justifyContent: 'space-between',
    };

    const titleStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.fontSize,
      fontWeight: titleWeight === 'regular' ? typography.fontWeight.regular : titleWeight === 'medium' ? typography.fontWeight.medium : typography.fontWeight.bold,
      color: colors.content.base.default, // Montage: dark text, NOT secondary
      lineHeight: sizeStyle.lineHeight,
      letterSpacing: -0.3, // Montage: tight tracking for headings
    };

    const descriptionStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.fontSize - 1,
      fontWeight: typography.fontWeight.regular,
      color: colors.content.base.secondary,
      lineHeight: (sizeStyle.fontSize - 1) * 1.4,
      marginTop: descriptionPosition === 'bottom' ? spacing.primitive[1] : 0,
      marginBottom: descriptionPosition === 'top' ? spacing.primitive[1] : 0,
    };

    const rightTextStyle: TextStyle = {
      fontFamily: typography.fontFamily.base,
      fontSize: sizeStyle.fontSize - 1,
      fontWeight: typography.fontWeight.medium,
      color: colors.content.brand.default,
    };

    // Priority: action > rightText/rightPress
    const rightContent = action ? (
      <View>{action}</View>
    ) : (rightText || onRightPress) ? (
      <Pressable
        onPress={onRightPress}
        hitSlop={8}
        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.primitive[1] }}
        disabled={!onRightPress}
      >
        {rightText && <Text style={rightTextStyle}>{rightText}</Text>}
        {showArrow && (
          <ChevronRight
            size={16}
            color={colors.content.brand.default}
            strokeWidth={2}
          />
        )}
      </Pressable>
    ) : null;

    return (
      <View ref={ref} style={[containerStyle, style]} {...props}>
        {description && descriptionPosition === 'top' && (
          <Text style={descriptionStyle}>{description}</Text>
        )}
        <View style={rowStyle}>
          {/* Title + heading content */}
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-end',
            gap: spacing.primitive[2] // 8px
          }}>
            <Text style={titleStyle} numberOfLines={2}>{title}</Text>
            {headingContent}
          </View>
          {/* Trailing: action or rightText */}
          {rightContent}
        </View>
        {description && descriptionPosition === 'bottom' && (
          <Text style={descriptionStyle}>{description}</Text>
        )}
      </View>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
