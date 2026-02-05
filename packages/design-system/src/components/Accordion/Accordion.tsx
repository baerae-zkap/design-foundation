/**
 * Accordion Component (Web)
 *
 * @description 펼침/접힘 가능한 콘텐츠 컨테이너입니다.
 * @see docs/components/Accordion.md - AI용 상세 가이드
 *
 * @example
 * <Accordion title="제목">
 *   콘텐츠
 * </Accordion>
 */

import { forwardRef, useState, useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';

export type AccordionSize = 'medium' | 'large';

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  /** 헤더 제목 */
  title: ReactNode;
  /** 콘텐츠 */
  children: ReactNode;
  /** 기본 펼침 상태 (비제어) */
  defaultExpanded?: boolean;
  /** 펼침 상태 (제어) */
  expanded?: boolean;
  /** 펼침 상태 변경 핸들러 */
  onChange?: (expanded: boolean) => void;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 크기 */
  size?: AccordionSize;
}

const sizeStyles: Record<AccordionSize, { height: number; iconSize: number }> = {
  medium: { height: 48, iconSize: 16 },
  large: { height: 56, iconSize: 16 },
};

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      children,
      defaultExpanded = false,
      expanded: controlledExpanded,
      onChange,
      disabled = false,
      size = 'medium',
      style,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledExpanded !== undefined;
    const [uncontrolledExpanded, setUncontrolledExpanded] = useState(defaultExpanded);
    const expanded = isControlled ? controlledExpanded : uncontrolledExpanded;

    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);

    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [children, expanded]);

    const handleToggle = () => {
      if (disabled) return;

      const newExpanded = !expanded;
      if (!isControlled) {
        setUncontrolledExpanded(newExpanded);
      }
      onChange?.(newExpanded);
    };

    const sizeStyle = sizeStyles[size];

    const containerStyle: React.CSSProperties = {
      borderRadius: 12, // card.sm (radius.semantic.card.sm)
      border: '1px solid #e2e8f0', // border.base.default (palette.grey.95)
      backgroundColor: 'white', // surface.base.default (static.white)
      overflow: 'hidden',
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      height: sizeStyle.height,
      paddingLeft: 16, // primitive.4
      paddingRight: 16, // primitive.4
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: disabled ? 'not-allowed' : 'pointer',
      backgroundColor: expanded ? '#fafbfc' : 'white', // surface.elevated.alternative (palette.grey.99) : surface.base.default (static.white)
      transition: 'background-color 0.2s ease',
      opacity: disabled ? 0.5 : 1,
    };

    const titleStyle: React.CSSProperties = {
      fontSize: 15,
      fontWeight: 600,
      color: '#334155', // content.base.default (palette.grey.30)
      margin: 0,
      flex: 1,
    };

    const iconStyle: React.CSSProperties = {
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      color: '#64748b', // content.base.secondary (palette.grey.50)
    };

    const contentWrapperStyle: React.CSSProperties = {
      height: expanded ? contentHeight : 0,
      overflow: 'hidden',
      transition: 'height 0.2s ease',
    };

    const contentStyle: React.CSSProperties = {
      padding: 16, // primitive.4
    };

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={headerStyle} onClick={handleToggle}>
          <div style={titleStyle}>{title}</div>
          <svg
            style={iconStyle}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div style={contentWrapperStyle}>
          <div ref={contentRef} style={contentStyle}>
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
