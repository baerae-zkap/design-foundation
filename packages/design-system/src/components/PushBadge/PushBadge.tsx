/**
 * PushBadge Component (Web)
 *
 * @description 다른 UI 요소 위에 오버레이되어 알림 수 또는 상태를 표시하는 배지 컴포넌트입니다.
 * 탭 바 아이콘, 아바타, 버튼 등 요소를 children으로 감싸서 사용합니다.
 *
 * Anatomy: wrapper(position:relative) → children + badge(position:absolute, top-right)
 *
 * @example
 * // Number badge
 * <PushBadge count={3}>
 *   <IconButton aria-label="알림" icon={<BellIcon />} />
 * </PushBadge>
 *
 * @example
 * // Dot badge
 * <PushBadge variant="dot">
 *   <IconButton aria-label="메시지" icon={<MessageIcon />} />
 * </PushBadge>
 *
 * @example
 * // Hidden when no notifications
 * <PushBadge count={unreadCount} hidden={unreadCount === 0}>
 *   <IconButton aria-label="알림" icon={<BellIcon />} />
 * </PushBadge>
 */

import type { ReactNode, HTMLAttributes, JSX } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';

export type PushBadgeVariant = 'dot' | 'number' | 'new';
export type PushBadgeSize = 'default' | 'small' | 'tiny';
export type PushBadgeColor = 'error' | 'primary' | 'success' | 'warning';

export type PushBadgeProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  /** The element the badge is overlaid on (required) */
  children: ReactNode;
  /**
   * Visual variant
   * - 'number': shows count text inside the badge
   * - 'dot': shows a plain colored circle (no text)
   * - 'new': shows fixed "N" text to indicate new/unread content
   * @default 'number'
   */
  variant?: PushBadgeVariant;
  /**
   * Badge color
   * @default 'error'
   */
  color?: PushBadgeColor;
  /**
   * Badge size
   * @default 'default'
   */
  size?: PushBadgeSize;
  /**
   * Numeric count to display (only used when variant="number")
   * When count is provided, variant defaults to 'number'
   */
  count?: number;
  /**
   * Maximum count. When count exceeds max, shows "N+" (e.g. "99+")
   * @default 99
   */
  max?: number;
  /**
   * When true, the badge is removed from DOM (children still rendered)
   * @default false
   */
  hidden?: boolean;
};

const sizeConfig = {
  default: {
    height: spacing.component.badge.height.lg,     // 26
    paddingX: spacing.component.badge.paddingX.lg, // 10
    fontSize: typography.fontSize['2xs'],           // 11
    dotSize: 10,
    offset: -spacing.primitive[1],                 // -4
  },
  small: {
    height: spacing.component.badge.height.md,     // 22
    paddingX: spacing.component.badge.paddingX.md, // 8
    fontSize: typography.fontSize['3xs'],           // 10
    dotSize: 8,
    offset: -spacing.primitive[1],                 // -4
  },
  tiny: {
    height: spacing.component.badge.height.sm,     // 18
    paddingX: spacing.component.badge.paddingX.sm, // 6
    fontSize: typography.fontSize['3xs'],           // 10
    dotSize: 6,
    offset: -spacing.primitive[1],                 // -4
  },
} as const;

const colorConfig: Record<PushBadgeColor, { bg: string; text: string }> = {
  error: {
    bg: cssVarColors.surface.error.solid,
    text: cssVarColors.content.base.onColor,
  },
  primary: {
    bg: cssVarColors.surface.brand.default,
    text: cssVarColors.content.base.onColor,
  },
  success: {
    bg: cssVarColors.surface.success.solid,
    text: cssVarColors.content.base.onColor,
  },
  warning: {
    bg: cssVarColors.surface.warning.solid,
    text: cssVarColors.content.base.onColor,
  },
};

export function PushBadge({
  children,
  variant = 'number',
  color = 'error',
  size = 'default',
  count,
  max = 99,
  hidden = false,
  style,
  ...props
}: PushBadgeProps): JSX.Element {
  const sc = sizeConfig[size];
  const cc = colorConfig[color];

  // Resolve display count string
  const displayCount =
    count !== undefined && count > max ? `${max}+` : String(count ?? '');

  const isDot = variant === 'dot';
  const isNew = variant === 'new';

  const pillStyle: React.CSSProperties = {
    position: 'absolute',
    top: sc.offset,
    right: sc.offset,
    height: sc.height,
    minWidth: sc.height,
    paddingLeft: sc.paddingX,
    paddingRight: sc.paddingX,
    borderRadius: radius.primitive.full,
    backgroundColor: cc.bg,
    color: cc.text,
    fontSize: sc.fontSize,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
  };

  const badgeStyle: React.CSSProperties = isDot
    ? {
        position: 'absolute',
        top: sc.offset,
        right: sc.offset,
        width: sc.dotSize,
        height: sc.dotSize,
        borderRadius: radius.primitive.full,
        backgroundColor: cc.bg,
        zIndex: 1,
      }
    : pillStyle;

  const ariaLabel = isDot
    ? '새 알림'
    : isNew
    ? '새 항목'
    : `${displayCount}개 알림`;

  const badgeContent = isDot ? null : isNew ? 'N' : displayCount;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        ...style,
      }}
      {...props}
    >
      {children}
      {!hidden && (
        <span
          role="status"
          aria-live="polite"
          aria-label={ariaLabel}
          style={badgeStyle}
        >
          {badgeContent}
        </span>
      )}
    </div>
  );
}

PushBadge.displayName = 'PushBadge';
