/**
 * Tooltip Component (Web)
 *
 * @description 특정 UI 요소 위에 간략한 레이블이나 추가 정보를 제공하는 컴포넌트입니다.
 * 커서를 올리거나 클릭하면 나타나며, 방향/크기/모드를 커스터마이즈할 수 있습니다.
 *
 * Anatomy:
 *   Container → Arrow → Label → [Shortcut badge]
 *
 * @example
 * <Tooltip label="복사하기" position="top">
 *   <IconButton aria-label="복사"><CopyIcon /></IconButton>
 * </Tooltip>
 *
 * @example
 * <Tooltip label="저장" shortcut="Ctrl+S" position="bottom">
 *   <Button>저장</Button>
 * </Tooltip>
 */

'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useId,
  useCallback,
  cloneElement,
  type ReactElement,
  type JSX,
} from 'react';
import { createPortal } from 'react-dom';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { zIndex, borderWidth } from '../../tokens/general';
import { duration, easing } from '../../tokens/motion';

// ─── Inject keyframe animations + arrow styles once ─────────────────────────

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;
  const style = document.createElement('style');
  style.textContent = `
    @keyframes _zkap_tooltip_in {
      from { opacity: 0; transform: scale(0.94); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes _zkap_tooltip_out {
      from { opacity: 1; transform: scale(1); }
      to   { opacity: 0; transform: scale(0.94); }
    }
    ._zkap_tooltip_arrow {
      position: absolute;
      width: 0;
      height: 0;
    }
    /* CSS injection — cannot use JS tokens */
    ._zkap_tooltip_arrow[data-position='top'] {
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid var(--content-base-default);
    }
    ._zkap_tooltip_arrow[data-position='bottom'] {
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid var(--content-base-default);
    }
    ._zkap_tooltip_arrow[data-position='left'] {
      right: -6px;
      top: 50%;
      transform: translateY(-50%);
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid var(--content-base-default);
    }
    ._zkap_tooltip_arrow[data-position='right'] {
      left: -6px;
      top: 50%;
      transform: translateY(-50%);
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid var(--content-base-default);
    }
  `;
  document.head.appendChild(style);
}

// ─── Types ───────────────────────────────────────────────────────────────────

export type TooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end';

export type TooltipSize = 'small' | 'medium';
export type TooltipMode = 'hover' | 'always' | 'click';

export interface TooltipProps {
  /** Tooltip 내용 */
  label: string;
  /** 트리거 요소 */
  children: ReactElement;
  /** 표시 방향 @default 'bottom' */
  position?: TooltipPosition;
  /** 크기 @default 'medium' */
  size?: TooltipSize;
  /** 트리거 모드 @default 'hover' */
  mode?: TooltipMode;
  /** 키보드 단축키 배지 (선택적) */
  shortcut?: string;
  /** 비제어 초기 열림 여부 */
  defaultOpen?: boolean;
  /** 제어 모드: 열림 상태 */
  open?: boolean;
  /** 제어 모드: 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** 비활성화 */
  disabled?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ANIMATION_DURATION = duration.instant; // ms (150ms → nearest token: instant=100ms)
const GAP = spacing.primitive[2]; // px between trigger and tooltip

const SIZE_CONFIG = {
  small: {
    fontSize: typography.fontSize.xs,
    minWidth: 36,
    padding: `${spacing.primitive[2]}px ${spacing.primitive[2] + 2}px`, // 10px = primitive[2] + 2px optical
  },
  medium: {
    fontSize: typography.fontSize.sm,
    minWidth: 64,
    padding: `${spacing.primitive[2]}px ${spacing.primitive[2] + 2}px`, // 10px = primitive[2] + 2px optical
  },
} as const;

// ─── Position Calculation ────────────────────────────────────────────────────

function getTooltipStyle(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  position: TooltipPosition,
): React.CSSProperties {
  const { top, left, right, bottom, width, height } = triggerRect;
  const tw = tooltipRect.width;
  const th = tooltipRect.height;

  const basePos = position.split('-')[0] as 'top' | 'bottom' | 'left' | 'right';
  const align = position.split('-')[1] as 'start' | 'end' | undefined;

  let x = 0;
  let y = 0;

  if (basePos === 'top') {
    y = top - th - GAP;
    x = align === 'start' ? left : align === 'end' ? right - tw : left + width / 2 - tw / 2;
  } else if (basePos === 'bottom') {
    y = bottom + GAP;
    x = align === 'start' ? left : align === 'end' ? right - tw : left + width / 2 - tw / 2;
  } else if (basePos === 'left') {
    x = left - tw - GAP;
    y = top + height / 2 - th / 2;
  } else if (basePos === 'right') {
    x = right + GAP;
    y = top + height / 2 - th / 2;
  }

  return { position: 'fixed', top: y, left: x };
}

function getArrowPosition(position: TooltipPosition): string {
  return position.split('-')[0];
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Tooltip({
  label,
  children,
  position = 'bottom',
  size = 'medium',
  mode = 'hover',
  shortcut,
  defaultOpen,
  open,
  onOpenChange,
  disabled = false,
}: TooltipProps): JSX.Element {
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const isOpen = disabled ? false : isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (disabled) return;
      if (!isControlled) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [disabled, isControlled, onOpenChange],
  );

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});

  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const tooltipId = `${id}-tooltip`;

  const sizeConfig = SIZE_CONFIG[size];

  // Inject styles on mount
  useEffect(() => {
    injectStyles();
  }, []);

  // Mount/unmount animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Position calculation
  useLayoutEffect(() => {
    if (isOpen && mounted && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      setTooltipStyle(getTooltipStyle(triggerRect, tooltipRect, position));
    }
  }, [isOpen, mounted, position, label, shortcut]);

  // Click outside handler for click mode
  useEffect(() => {
    if (mode !== 'click' || !isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mode, isOpen, setOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen || mode === 'always') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, mode, setOpen]);

  // Trigger event handlers
  const triggerProps: Record<string, unknown> = {};

  if (mode === 'hover') {
    triggerProps.onMouseEnter = () => setOpen(true);
    triggerProps.onMouseLeave = () => setOpen(false);
    triggerProps.onFocus = () => setOpen(true);
    triggerProps.onBlur = () => setOpen(false);
  } else if (mode === 'click') {
    triggerProps.onClick = () => setOpen(!isOpen);
  }
  // 'always' mode: no trigger events

  // Tooltip container style
  const containerStyle: React.CSSProperties = {
    ...tooltipStyle,
    zIndex: zIndex.toast,
    backgroundColor: cssVarColors.content.base.default,
    color: cssVarColors.surface.base.default,
    fontSize: sizeConfig.fontSize,
    fontWeight: typography.fontWeight.medium,
    lineHeight: 1.4,
    padding: sizeConfig.padding,
    borderRadius: radius.primitive.md,
    maxWidth: 280,
    minWidth: sizeConfig.minWidth,
    whiteSpace: label.length < 30 ? 'nowrap' : 'normal',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.primitive[1],
    pointerEvents: 'none',
    animation: `${visible ? '_zkap_tooltip_in' : '_zkap_tooltip_out'} ${ANIMATION_DURATION}ms ${easing.easeOut} both`,
  };

  const arrowBasePos = getArrowPosition(position);

  return (
    <>
      <span
        ref={triggerRef}
        style={{ display: 'inline-block', position: 'relative' }}
        aria-describedby={isOpen ? tooltipId : undefined}
        {...triggerProps}
      >
        {children}
      </span>

      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <div ref={tooltipRef} id={tooltipId} role="tooltip" style={containerStyle}>
            <span>{label}</span>
            {shortcut && (
              <span
                style={{
                  marginLeft: spacing.primitive[1],
                  padding: `1px ${spacing.primitive[1]}px`,
                  border: `${borderWidth.default}px solid currentColor`,
                  borderRadius: radius.primitive.xs,
                  fontSize: typography.fontSize.xs,
                  fontFamily: 'monospace',
                  opacity: 0.7,
                  lineHeight: 1.2,
                }}
              >
                {shortcut}
              </span>
            )}
            <div className="_zkap_tooltip_arrow" data-position={arrowBasePos} />
          </div>,
          document.body,
        )}
    </>
  );
}

Tooltip.displayName = 'Tooltip';
