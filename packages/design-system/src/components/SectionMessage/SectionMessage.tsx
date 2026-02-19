/**
 * SectionMessage Component (Web)
 *
 * @description 페이지 내 섹션 레벨에서 중요한 정보, 경고, 오류, 성공 상태를 인라인으로 표시하는 배너 컴포넌트입니다.
 *
 * @example
 * <SectionMessage variant="info" heading="업데이트 안내" description="새로운 기능이 추가되었습니다." />
 * <SectionMessage variant="error" heading="오류가 발생했습니다." onClose={() => setVisible(false)} />
 */

import { type HTMLAttributes, type ReactNode, type JSX } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type SectionMessageVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

export interface SectionMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Status variant — controls background color and default icon. Default: 'info' */
  variant?: SectionMessageVariant;
  /** Bold heading text */
  heading?: ReactNode;
  /** Body description text */
  description?: ReactNode;
  /** Custom icon (overrides variant default icon) */
  icon?: ReactNode;
  /** Optional action slot (Button / TextButton) */
  action?: ReactNode;
  /** If provided, renders a close (X) button at top-right */
  onClose?: () => void;
}

// ─── Variant color config ────────────────────────────────────────────────────

const variantConfig: Record<SectionMessageVariant, {
  bg: string;
  iconColor: string;
}> = {
  default: {
    bg: cssVarColors.surface.brand.secondary,
    iconColor: cssVarColors.content.brand.default,
  },
  info: {
    bg: cssVarColors.surface.info.default,
    iconColor: cssVarColors.icon.info,
  },
  success: {
    bg: cssVarColors.surface.success.default,
    iconColor: cssVarColors.icon.success,
  },
  warning: {
    bg: cssVarColors.surface.warning.default,
    iconColor: cssVarColors.icon.warning,
  },
  error: {
    bg: cssVarColors.surface.error.default,
    iconColor: cssVarColors.icon.error,
  },
};

// ─── Built-in variant icons (inline SVG 20×20) ───────────────────────────────

function DefaultIcon({ color }: { color: string }): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.5" />
      <rect x="9.25" y="9" width="1.5" height="5.5" rx="0.75" fill={color} />
      <circle cx="10" cy="6.5" r="0.875" fill={color} />
    </svg>
  );
}

function InfoIcon({ color }: { color: string }): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.5" />
      <rect x="9.25" y="9" width="1.5" height="5.5" rx="0.75" fill={color} />
      <circle cx="10" cy="6.5" r="0.875" fill={color} />
    </svg>
  );
}

function SuccessIcon({ color }: { color: string }): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.5" />
      <path d="M6.5 10.5L8.5 12.5L13.5 7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon({ color }: { color: string }): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.134 3.5C9.519 2.833 10.481 2.833 10.866 3.5L17.526 15C17.911 15.667 17.43 16.5 16.66 16.5H3.34C2.57 16.5 2.089 15.667 2.474 15L9.134 3.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="9.25" y="8" width="1.5" height="5" rx="0.75" fill={color} />
      <circle cx="10" cy="14.5" r="0.875" fill={color} />
    </svg>
  );
}

function ErrorIcon({ color }: { color: string }): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.5" />
      <path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function getDefaultIcon(variant: SectionMessageVariant, color: string): JSX.Element {
  switch (variant) {
    case 'default': return <DefaultIcon color={color} />;
    case 'info': return <InfoIcon color={color} />;
    case 'success': return <SuccessIcon color={color} />;
    case 'warning': return <WarningIcon color={color} />;
    case 'error': return <ErrorIcon color={color} />;
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export function SectionMessage({
  variant = 'info',
  heading,
  description,
  icon,
  action,
  onClose,
  style,
  ...props
}: SectionMessageProps): JSX.Element {
  const config = variantConfig[variant];
  const resolvedIcon = icon ?? getDefaultIcon(variant, config.iconColor);

  // aria role: alert for error/warning (assertive), status for others (polite)
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  const ariaLive = variant === 'error' || variant === 'warning' ? 'assertive' : 'polite';

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.primitive[3],
    padding: spacing.primitive[4],
    backgroundColor: config.bg,
    borderRadius: radius.component.card.md,
    position: 'relative',
    width: '100%',
    boxSizing: 'border-box',
    ...style,
  };

  const iconWrapStyle: React.CSSProperties = {
    flexShrink: 0,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1, // optical alignment with heading
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.primitive[1],
  };

  const headingStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: String(typography.lineHeight.sm / typography.fontSize.sm),
    color: cssVarColors.content.base.strong,
    margin: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: String(typography.lineHeight.sm / typography.fontSize.sm),
    color: cssVarColors.content.base.secondary,
    margin: 0,
  };

  const actionWrapStyle: React.CSSProperties = {
    marginTop: spacing.primitive[1],
    marginLeft: -spacing.primitive[2], // compensate TextButton paddingLeft (8px) for visual alignment
  };

  const closeButtonStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: cssVarColors.content.base.secondary,
    borderRadius: radius.primitive.xs,
    marginTop: -2, // optical alignment
  };

  return (
    <div
      role={role}
      aria-live={ariaLive}
      style={containerStyle}
      {...props}
    >
      {/* Leading icon */}
      <span style={iconWrapStyle}>
        {resolvedIcon}
      </span>

      {/* Main content */}
      <div style={contentStyle}>
        {heading && (
          <p style={headingStyle}>
            {heading}
          </p>
        )}
        {description && (
          <p style={descriptionStyle}>
            {description}
          </p>
        )}
        {action && (
          <div style={actionWrapStyle}>
            {action}
          </div>
        )}
      </div>

      {/* Close button */}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          style={closeButtonStyle}
          aria-label="닫기"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}

SectionMessage.displayName = 'SectionMessage';
