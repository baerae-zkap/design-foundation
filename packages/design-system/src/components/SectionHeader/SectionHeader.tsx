/**
 * SectionHeader Component (Web)
 *
 * @description 리스트 섹션 상단에 사용되는 타이틀 컴포넌트입니다.
 * @see docs/components/SectionHeader.md - AI용 상세 가이드
 *
 * @example
 * <SectionHeader title="내 자산" />
 *
 * <SectionHeader
 *   title="최근 주문"
 *   description="최근 30일"
 *   descriptionPosition="top"
 *   action={<TextButton size="small">전체보기</TextButton>}
 * />
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export type SectionHeaderSize = 'small' | 'medium' | 'large';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 섹션 타이틀 */
  title: ReactNode;
  /** 보조 설명 텍스트 (날짜, 카운트 등) */
  description?: ReactNode;
  /** description 표시 위치 */
  descriptionPosition?: 'top' | 'bottom';
  /** 우측 액션 영역 (TextButton, 링크 등) */
  action?: ReactNode;
  /** 크기 */
  size?: SectionHeaderSize;
}

// Size configurations (from Foundation tokens)
const sizeConfig: Record<SectionHeaderSize, {
  titleFontSize: number;
  descFontSize: number;
  paddingX: number;
  paddingTop: number;
  paddingBottom: number;
}> = {
  small: {
    titleFontSize: typography.fontSize.compact,
    descFontSize: typography.fontSize.xs,
    paddingX: spacing.primitive[4],
    paddingTop: spacing.primitive[2],
    paddingBottom: spacing.primitive[1],
  },
  medium: {
    titleFontSize: typography.fontSize.sm,
    descFontSize: typography.fontSize.compact,
    paddingX: spacing.primitive[4],
    paddingTop: spacing.primitive[4],
    paddingBottom: spacing.primitive[2],
  },
  large: {
    titleFontSize: typography.fontSize.md,
    descFontSize: typography.fontSize.sm,
    paddingX: spacing.primitive[4],
    paddingTop: spacing.primitive[5],
    paddingBottom: spacing.primitive[2],
  },
};

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      description,
      descriptionPosition = 'top',
      action,
      size = 'medium',
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: sizeStyle.paddingX,
      paddingRight: sizeStyle.paddingX,
      paddingTop: sizeStyle.paddingTop,
      paddingBottom: sizeStyle.paddingBottom,
      gap: description ? spacing.primitive[1] : 0,
      ...style,
    };

    const titleRowStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const titleStyle: React.CSSProperties = {
      fontSize: sizeStyle.titleFontSize,
      fontWeight: typography.fontWeight.semibold,
      color: cssVarColors.content.base.default,
      lineHeight: 1.4,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: sizeStyle.descFontSize,
      fontWeight: typography.fontWeight.regular,
      color: cssVarColors.content.base.secondary,
      lineHeight: 1.4,
    };

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {description && descriptionPosition === 'top' && (
          <div style={descriptionStyle}>{description}</div>
        )}
        <div style={titleRowStyle}>
          <div style={titleStyle}>{title}</div>
          {action && <div style={{ flexShrink: 0 }}>{action}</div>}
        </div>
        {description && descriptionPosition === 'bottom' && (
          <div style={descriptionStyle}>{description}</div>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
