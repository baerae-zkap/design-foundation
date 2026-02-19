/**
 * SectionHeader Component (Web)
 *
 * @description 콘텐츠 영역이나 특정 섹션의 시작을 명확하게 알려주는 제목 요소입니다.
 * @see docs/components/SectionHeader.md - AI용 상세 가이드
 *
 * Anatomy (Montage 패턴):
 *   [Heading title]  [headingContent slot]          [trailing slot]
 *
 * - headingContent: 타이틀 오른쪽 인라인 슬롯 (Chip, IconButton 등)
 * - trailing: 맨 우측 슬롯 (TextButton, Pagination, IconButton 등)
 * - 모든 슬롯은 타이틀 baseline(하단)에 정렬됨
 *
 * @example
 * <SectionHeader title="내 자산" />
 *
 * <SectionHeader
 *   title="최근 주문"
 *   headingContent={<ContentBadge color="primary">12</ContentBadge>}
 *   trailing={<TextButton size="small" onClick={onViewAll}>전체보기</TextButton>}
 * />
 */

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export type SectionHeaderSize = 'small' | 'medium' | 'large';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 섹션 타이틀 (최대 2줄) */
  title: ReactNode;
  /** 타이틀 오른쪽 인라인 슬롯 — Chip, ContentBadge, IconButton 등 */
  headingContent?: ReactNode;
  /** 맨 우측 슬롯 — TextButton, Pagination, IconButton 등 */
  trailing?: ReactNode;
  /** 크기 (폰트 및 패딩 스케일) */
  size?: SectionHeaderSize;
}

const sizeConfig: Record<SectionHeaderSize, {
  fontSize: number;
  paddingX: number;
  paddingTop: number;
  paddingBottom: number;
}> = {
  small: {
    fontSize: typography.fontSize.md,    // 16px
    paddingX: spacing.primitive[4],
    paddingTop: spacing.primitive[3],    // 12px
    paddingBottom: spacing.primitive[2], // 8px
  },
  medium: {
    fontSize: typography.fontSize.xl,    // 20px
    paddingX: spacing.primitive[4],
    paddingTop: spacing.primitive[4],    // 16px
    paddingBottom: spacing.primitive[3], // 12px
  },
  large: {
    fontSize: typography.fontSize['2xl'], // 24px
    paddingX: spacing.primitive[4],
    paddingTop: spacing.primitive[5],    // 20px
    paddingBottom: spacing.primitive[3], // 12px
  },
};

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      headingContent,
      trailing,
      size = 'medium',
      style,
      ...props
    },
    ref
  ) => {
    const sizeStyle = sizeConfig[size];

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-end',
      gap: spacing.primitive[4],
      paddingLeft: sizeStyle.paddingX,
      paddingRight: sizeStyle.paddingX,
      paddingTop: sizeStyle.paddingTop,
      paddingBottom: sizeStyle.paddingBottom,
      ...style,
    };

    // Heading area: title + optional headingContent (inline, baseline-aligned)
    const headingAreaStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      gap: spacing.primitive[2],
      minWidth: 0,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: sizeStyle.fontSize,
      fontWeight: typography.fontWeight.bold,
      color: cssVarColors.content.base.default,
      lineHeight: 1.4,
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      wordBreak: 'break-word',
    };

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {/* Heading area: title + headingContent (baseline-aligned) */}
        <div style={headingAreaStyle}>
          <div style={titleStyle}>{title}</div>
          {headingContent && (
            <div style={{ flexShrink: 0 }}>{headingContent}</div>
          )}
        </div>

        {/* Trailing: rightmost slot (baseline-aligned) */}
        {trailing && (
          <div style={{ flexShrink: 0 }}>{trailing}</div>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
