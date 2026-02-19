/**
 * StateView Component (Web)
 *
 * @description 범용 상태 표시 컴포넌트입니다.
 * 빈 상태, 오류 상태, 액션 완료(성공/실패/처리중) 등 다양한 상태를 하나의 API로 표현합니다.
 *
 * Anatomy: figure → title → description → actions
 *
 * Variants:
 * - 'inline': 리스트, 카드 본문, 검색 결과 등 콘텐츠 영역 내 인라인 표시
 * - 'page': 결제 완료, 오류 페이지 등 페이지 전체를 차지하는 레이아웃
 *
 * @example
 * // Empty state (inline)
 * <StateView
 *   figure={<EmptyIcon />}
 *   title="아직 항목이 없어요"
 *   description="새 항목을 추가해 시작해보세요."
 *   primaryAction={<Button buttonType="weak" color="primary">추가하기</Button>}
 * />
 *
 * @example
 * // Success result (page)
 * <StateView
 *   variant="page"
 *   figure={<SuccessIcon />}
 *   title="결제가 완료됐어요"
 *   description="주문이 정상적으로 접수됐습니다."
 *   primaryAction={<Button buttonType="filled" color="primary" layout="fillWidth">홈으로</Button>}
 *   secondaryAction={<Button buttonType="weak" color="neutral" layout="fillWidth">주문 내역 보기</Button>}
 * />
 *
 * @example
 * // Error state (inline, compact)
 * <StateView
 *   size="compact"
 *   figure={<ErrorIcon />}
 *   title="불러오지 못했어요"
 *   primaryAction={<TextButton onClick={onRetry}>다시 시도</TextButton>}
 * />
 */

import type { ReactNode, HTMLAttributes, JSX } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';

export type StateViewVariant = 'inline' | 'page';
export type StateViewSize = 'default' | 'compact';

export interface StateViewProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Visual figure: illustration, icon, or emoji */
  figure?: ReactNode;
  /** Primary heading text */
  title?: ReactNode;
  /** Supporting description */
  description?: ReactNode;
  /** Primary action button (full-width layout recommended for page variant) */
  primaryAction?: ReactNode;
  /** Secondary action button (full-width layout recommended for page variant) */
  secondaryAction?: ReactNode;
  /**
   * Layout variant
   * - 'inline': embedded within content areas (lists, cards, search results)
   * - 'page': full-height centered, for page-level outcomes (success, error, processing)
   * @default 'inline'
   */
  variant?: StateViewVariant;
  /**
   * Size (applies to 'inline' variant only)
   * - 'default': generous spacing for full content areas
   * - 'compact': tighter spacing for constrained containers
   * @default 'default'
   */
  size?: StateViewSize;
}

export function StateView({
  figure,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = 'inline',
  size = 'default',
  style,
  ...props
}: StateViewProps): JSX.Element {
  const isPage = variant === 'page';
  const isCompact = !isPage && size === 'compact';

  // Spacing based on variant/size
  const paddingV = isPage ? spacing.primitive[10] : (isCompact ? spacing.primitive[6] : spacing.primitive[10]);
  const figureMaxSize = isPage ? 160 : (isCompact ? 80 : 120);
  const figureGap = isPage ? spacing.primitive[8] : (isCompact ? spacing.primitive[3] : spacing.primitive[5]);
  const titleDescGap = isCompact ? spacing.primitive[1] : spacing.primitive[2];
  const actionGap = isPage ? spacing.primitive[8] : (isCompact ? spacing.primitive[3] : spacing.primitive[5]);

  const titleFontSize = isPage
    ? typography.fontSize['2xl']
    : (isCompact ? typography.fontSize.lg : typography.fontSize.xl);

  const hasActions = primaryAction || secondaryAction;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: `${paddingV}px ${spacing.semantic.screen.paddingX}px`,
    ...(isPage ? {
      justifyContent: 'center',
      minHeight: '100%',
    } : {}),
    ...style,
  };

  return (
    <div
      {...(!isPage ? { role: 'status' } : {})}
      style={containerStyle}
      {...props}
    >
      {figure && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: figureMaxSize,
          height: figureMaxSize,
          marginBottom: figureGap,
          flexShrink: 0,
        }}>
          {figure}
        </div>
      )}

      {title && (
        isPage ? (
          <h1 style={{
            fontSize: titleFontSize,
            fontWeight: typography.fontWeight.bold,
            color: cssVarColors.content.base.default,
            lineHeight: 1.3,
            margin: 0,
            marginBottom: description ? titleDescGap : (hasActions ? actionGap : 0),
          }}>
            {title}
          </h1>
        ) : (
          <div style={{
            fontSize: titleFontSize,
            fontWeight: typography.fontWeight.bold,
            color: cssVarColors.content.base.default,
            lineHeight: 1.4,
            marginBottom: description ? titleDescGap : (hasActions ? actionGap : 0),
          }}>
            {title}
          </div>
        )
      )}

      {description && (
        <p style={{
          fontSize: isCompact ? typography.fontSize.compact : typography.fontSize.sm,
          color: cssVarColors.content.base.secondary,
          lineHeight: 1.6,
          margin: 0,
          ...(isPage ? { maxWidth: 320 } : {}),
          marginBottom: hasActions ? actionGap : 0,
        }}>
          {description}
        </p>
      )}

      {hasActions && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: spacing.primitive[3],
          ...(isPage ? { width: '100%', maxWidth: 320 } : {}),
        }}>
          {primaryAction}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}

StateView.displayName = 'StateView';
