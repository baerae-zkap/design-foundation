/**
 * Popup Component (Web)
 *
 * @description 즉각적인 사용자 응답이 필요한 상황에서 현재 작업을 중단하고
 * 사용자의 주의를 집중시키는 모달 다이얼로그입니다.
 *
 * Anatomy (Montage 패턴):
 *   Scene (backdrop) -> Container -> [Navigation] -> Contents (scrollable) -> [Action]
 *
 * - navigation: normal | emphasize | floating
 * - actionLayout: strong | neutral | cancel | compact
 * - size: medium | large | xlarge
 * - type: fixed | hug
 *
 * @example
 * <Popup
 *   open={isOpen}
 *   onClose={() => setOpen(false)}
 *   title="설정"
 *   navigation="normal"
 *   size="medium"
 *   actions={[
 *     { label: '취소', onClick: () => setOpen(false) },
 *     { label: '확인', onClick: handleConfirm },
 *   ]}
 * >
 *   <p>팝업 내용</p>
 * </Popup>
 */

'use client';

import { useState, useEffect, useId, type ReactNode, type JSX } from 'react';
import { createPortal } from 'react-dom';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex, borderWidth } from '../../tokens/general';
import { cssVarShadow } from '../../tokens/shadow';
import { duration, easing } from '../../tokens/motion';
import { Button } from '../Button/Button';
import type { ButtonColor } from '../Button/Button';

// ─── Inject keyframe animations once ─────────────────────────────────────────

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes _zkap_popup_backdrop_in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes _zkap_popup_backdrop_out {
      from { opacity: 1; }
      to   { opacity: 0; }
    }
    @keyframes _zkap_popup_in {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes _zkap_popup_out {
      from { opacity: 1; transform: translateY(0);    }
      to   { opacity: 0; transform: translateY(28px); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PopupAction {
  /** 버튼 레이블 */
  label: string;
  /** 버튼 클릭 핸들러 */
  onClick: () => void;
  /** 버튼 색상 */
  color?: ButtonColor;
  /** 버튼 타입 */
  variant?: 'filled' | 'weak';
}

export type PopupSize = 'medium' | 'large' | 'xlarge';
export type PopupNavigation = 'normal' | 'emphasize' | 'floating';
export type PopupActionLayout = 'strong' | 'neutral' | 'cancel' | 'compact';
export type PopupType = 'fixed' | 'hug';

export interface PopupProps {
  /** 팝업 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 제목 (navigation이 floating이 아닌 경우 표시) */
  title?: ReactNode;
  /** 내비게이션 스타일 (기본: title이 있으면 'normal', 없으면 'floating') */
  navigation?: PopupNavigation;
  /** 팝업 본문 내용 */
  children: ReactNode;
  /** 액션 버튼 목록 */
  actions?: PopupAction[];
  /** 액션 레이아웃 (기본: 1개면 'strong', 2개면 'neutral') */
  actionLayout?: PopupActionLayout;
  /** 팝업 크기 (기본: 'medium') */
  size?: PopupSize;
  /** 컨테이너 높이 전략 (기본: 'hug') */
  type?: PopupType;
  /** 백드롭 클릭 시 닫기 여부 (기본: false) */
  closeOnDimmerClick?: boolean;
  /** title 없을 때 접근성용 레이블 */
  'aria-label'?: string;
}

// ─── Size Config ─────────────────────────────────────────────────────────────

const SIZE_CONFIG = {
  medium:  { maxWidth: 400, padding: spacing.primitive[5], fixedHeight: 480, hugMaxHeight: 760 },
  large:   { maxWidth: 560, padding: spacing.primitive[6], fixedHeight: 480, hugMaxHeight: 760 },
  xlarge:  { maxWidth: 640, padding: spacing.primitive[8], fixedHeight: 560, hugMaxHeight: 760 },
} as const;

// ─── Constants ───────────────────────────────────────────────────────────────

const ANIMATION_DURATION = duration.fast; // ms

// ─── Close Icon ──────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Popup({
  open,
  onClose,
  title,
  navigation,
  children,
  actions,
  actionLayout,
  size = 'medium',
  type = 'hug',
  closeOnDimmerClick = false,
  'aria-label': ariaLabel,
}: PopupProps): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const id = useId();
  const titleId = `${id}-popup-title`;

  // Resolve navigation mode
  const nav = navigation ?? (title ? 'normal' : 'floating');

  // Resolve action layout
  const resolvedLayout: PopupActionLayout | undefined = actionLayout ?? (
    actions && actions.length === 1 ? 'strong' :
    actions && actions.length >= 2 ? 'neutral' :
    undefined
  );

  const config = SIZE_CONFIG[size];

  useEffect(() => {
    injectStyles();
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!mounted || typeof document === 'undefined') return null;

  // ─── Styles ──────────────────────────────────────────────────────────────

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: cssVarColors.overlay.dim,
    zIndex: zIndex.modal,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.primitive[4]}px ${spacing.primitive[5]}px`,
    animation: `${visible ? '_zkap_popup_backdrop_in' : '_zkap_popup_backdrop_out'} ${ANIMATION_DURATION}ms ${easing.easeInOut} both`,
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: cssVarColors.surface.base.default,
    borderRadius: radius.primitive['2xl'],
    boxShadow: cssVarShadow.semantic.modal.default,
    width: '100%',
    maxWidth: config.maxWidth,
    maxHeight: type === 'fixed' ? config.fixedHeight : config.hugMaxHeight,
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    position: 'relative',
    animation: `${visible ? '_zkap_popup_in' : '_zkap_popup_out'} ${ANIMATION_DURATION}ms ${easing.easeOut} both`,
  };

  const closeButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: spacing.primitive[1],
    color: cssVarColors.content.base.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.primitive.sm,
  };

  const contentsStyle: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: config.padding,
  };

  const actionAreaStyle: React.CSSProperties = {
    padding: `${spacing.primitive[4]}px ${config.padding}px`,
    borderTop: `${borderWidth.default}px solid var(--divider)`,
    display: 'flex',
    gap: spacing.primitive[2],
  };

  // ─── Nav Bar ─────────────────────────────────────────────────────────────

  const renderNavBar = () => {
    if (nav === 'floating') return null;

    const isEmphasize = nav === 'emphasize';

    const navStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isEmphasize ? 'flex-start' : 'center',
      position: 'relative',
      padding: `${spacing.primitive[4]}px ${config.padding}px`,
      borderBottom: `${borderWidth.default}px solid var(--divider)`,
      minHeight: 56,
      flexShrink: 0,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: isEmphasize ? typography.fontSize.lg : typography.fontSize.md,
      fontWeight: isEmphasize ? typography.fontWeight.bold : typography.fontWeight.semibold,
      color: cssVarColors.content.base.default,
      lineHeight: 1.4,
      paddingRight: spacing.primitive[10],
    };

    return (
      <div style={navStyle}>
        {title && <div id={titleId} style={titleStyle}>{title}</div>}
        <button
          onClick={onClose}
          style={{
            ...closeButtonStyle,
            position: 'absolute',
            right: config.padding,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          aria-label="닫기"
        >
          <CloseIcon />
        </button>
      </div>
    );
  };

  // ─── Floating Close ──────────────────────────────────────────────────────

  const renderFloatingClose = () => {
    if (nav !== 'floating') return null;

    return (
      <button
        onClick={onClose}
        style={{
          ...closeButtonStyle,
          position: 'absolute',
          top: config.padding,
          right: config.padding,
          zIndex: 1,
        }}
        aria-label="닫기"
      >
        <CloseIcon />
      </button>
    );
  };

  // ─── Actions ─────────────────────────────────────────────────────────────

  const renderActions = () => {
    if (!actions || actions.length === 0) return null;

    if (resolvedLayout === 'strong') {
      const action = actions[0];
      return (
        <div style={actionAreaStyle}>
          <Button
            buttonType="filled"
            color={action.color ?? 'primary'}
            size="large"
            layout="fillWidth"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        </div>
      );
    }

    // neutral, cancel, compact — sub button + main button
    return (
      <div style={actionAreaStyle}>
        {actions.map((action, i) => (
          <Button
            key={i}
            buttonType={action.variant ?? (i === actions.length - 1 ? 'filled' : 'weak')}
            color={action.color ?? (i === actions.length - 1 ? 'primary' : 'neutral')}
            size="large"
            layout="fillWidth"
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────

  return createPortal(
    <div
      style={backdropStyle}
      onClick={closeOnDimmerClick ? onClose : undefined}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title && nav !== 'floating' ? titleId : undefined}
        aria-label={!title || nav === 'floating' ? ariaLabel : undefined}
        style={containerStyle}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {renderNavBar()}
        {renderFloatingClose()}
        <div style={contentsStyle}>
          {children}
        </div>
        {renderActions()}
      </div>
    </div>,
    document.body
  );
}

Popup.displayName = 'Popup';
