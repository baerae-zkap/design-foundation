'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { transitions } from '../../utils/styles';
import { usePressable } from '../../utils/usePressable';
import { borderWidth } from '../../tokens/general';

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export type TabSize = 'sm' | 'md' | 'lg';
export type TabResize = 'hug' | 'fill';

export interface TabProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  size?: TabSize;
  /** hug: 텍스트 길이에 맞춤 + 오버플로우 스크롤 / fill: 컨테이너 폭 균등 분배 */
  resize?: TabResize;
  fixedPadding?: boolean;
  iconButton?: ReactNode;
  className?: string;
}

interface TabSizeStyle {
  height: number;
  fontSize: number;
  lineHeight: number;
  paddingX: number;
}

const sizeStyles: Record<TabSize, TabSizeStyle> = {
  sm: {
    height: spacing.component.input.height.sm,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.xs,
    paddingX: spacing.primitive[3],
  },
  md: {
    height: spacing.component.input.height.md,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    paddingX: spacing.primitive[4],
  },
  lg: {
    height: spacing.component.input.height.lg,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
    paddingX: spacing.primitive[5],
  },
};

const SCROLL_CLASS = 'zds-tab-scroll';
const ICON_SLOT_WIDTH = spacing.primitive[14];

interface TabButtonProps {
  item: TabItem;
  selected: boolean;
  onSelect: (value: string) => void;
  sizeStyle: TabSizeStyle;
  fill: boolean;
}

function TabButton({ item, selected, onSelect, sizeStyle, fill }: TabButtonProps) {
  const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({
    disabled: item.disabled,
  });

  const getTextColor = (): string => {
    if (item.disabled) return cssVarColors.content.disabled.default;
    if (selected) return cssVarColors.content.brand.default;
    if (isHovered || isPressed) return cssVarColors.content.base.default;
    return cssVarColors.content.base.secondary;
  };

  const buttonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: sizeStyle.height,
    padding: `0 ${sizeStyle.paddingX}px`,
    fontSize: sizeStyle.fontSize,
    lineHeight: `${sizeStyle.lineHeight}px`,
    fontWeight: selected ? typography.fontWeight.medium : typography.fontWeight.regular,
    whiteSpace: 'nowrap',
    border: 'none',
    borderBottom: `${borderWidth.strong}px solid ${selected ? cssVarColors.surface.brand.default : 'transparent'}`,
    backgroundColor: 'transparent',
    color: getTextColor(),
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    transition: transitions.all,
    flexShrink: fill ? 0 : undefined,
    flex: fill ? 1 : undefined,
    minWidth: 0,
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : selected ? 0 : -1}
      onClick={() => !item.disabled && onSelect(item.value)}
      style={buttonStyle}
      {...handlers}
    >
      {item.label}
    </button>
  );
}

export function Tab({
  items,
  value,
  onChange,
  size = 'md',
  resize = 'hug',
  fixedPadding = false,
  iconButton,
  className,
}: TabProps) {
  if (items.length === 0) return null;

  const sizeStyle = sizeStyles[size];
  const activeValue = items.some((item) => item.value === value) ? value : items[0].value;
  const isFill = resize === 'fill';

  const rootStyle: CSSProperties = {
    width: '100%',
    position: 'relative',
  };

  const hPadding = fixedPadding ? sizeStyle.paddingX : 0;

  const scrollStyle: CSSProperties = {
    width: '100%',
    overflowX: isFill ? 'visible' : 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
    paddingLeft: hPadding,
    paddingRight: iconButton ? ICON_SLOT_WIDTH : hPadding,
    borderBottom: `${borderWidth.default}px solid ${cssVarColors.border.base.default}`,
    boxSizing: 'border-box',
  };

  const listStyle: CSSProperties = {
    display: isFill ? 'flex' : 'inline-flex',
    alignItems: 'stretch',
    width: isFill ? '100%' : 'max-content',
    minWidth: isFill ? undefined : '100%',
  };

  const iconFadeStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: spacing.primitive[6],
    pointerEvents: 'none',
    background: `linear-gradient(90deg, transparent 0%, ${cssVarColors.surface.base.default} 45%)`,
  };

  return (
    <div className={className} style={rootStyle}>
      <style>
        {`
          .${SCROLL_CLASS}::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <nav
        role="tablist"
        aria-label="탭 탐색"
        className={SCROLL_CLASS}
        style={scrollStyle}
      >
        <div style={listStyle}>
          {items.map((item) => (
            <TabButton
              key={item.value}
              item={item}
              selected={item.value === activeValue}
              onSelect={onChange}
              sizeStyle={sizeStyle}
              fill={isFill}
            />
          ))}
        </div>
      </nav>

      {iconButton && (
        <div style={iconFadeStyle}>
          <div style={{ pointerEvents: 'auto' }}>{iconButton}</div>
        </div>
      )}
    </div>
  );
}
