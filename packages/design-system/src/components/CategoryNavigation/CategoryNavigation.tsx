'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { transitions } from '../../utils/styles';
import { usePressable } from '../../utils/usePressable';

export interface CategoryNavigationItem {
  label: string;
  value: string;
}

export type CategoryNavigationSize = 'sm' | 'md' | 'lg' | 'xl';

export interface CategoryNavigationProps {
  items: CategoryNavigationItem[];
  value: string;
  onChange: (value: string) => void;
  size?: CategoryNavigationSize;
  iconButton?: ReactNode;
  fixedPadding?: boolean;
  className?: string;
}

interface CategoryNavigationSizeStyle {
  height: number;
  fontSize: number;
  lineHeight: number;
  paddingX: number;
  gap: number;
}

const sizeStyles: Record<CategoryNavigationSize, CategoryNavigationSizeStyle> = {
  sm: {
    height: spacing.component.chip.height.sm,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.xs,
    paddingX: spacing.component.chip.paddingX.sm,
    gap: spacing.primitive[2],
  },
  md: {
    height: spacing.component.chip.height.md,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.sm,
    paddingX: spacing.component.chip.paddingX.md,
    gap: spacing.primitive[2],
  },
  lg: {
    height: spacing.component.chip.height.lg,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.md,
    paddingX: spacing.component.chip.paddingX.lg,
    gap: spacing.primitive[3],
  },
  xl: {
    height: spacing.primitive[12],
    fontSize: typography.fontSize.lg,
    lineHeight: typography.lineHeight.lg,
    paddingX: spacing.primitive[5],
    gap: spacing.primitive[3],
  },
};

const SCROLL_CLASS = 'zds-category-navigation-scroll';
const ICON_SLOT_WIDTH = spacing.primitive[14];

interface CategoryChipProps {
  item: CategoryNavigationItem;
  selected: boolean;
  onSelect: (value: string) => void;
  sizeStyle: CategoryNavigationSizeStyle;
  fixedPadding: boolean;
}

function CategoryChip({
  item,
  selected,
  onSelect,
  sizeStyle,
  fixedPadding,
}: CategoryChipProps) {
  const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>();

  const getBackgroundColor = (): string => {
    if (selected) {
      return isPressed
        ? cssVarColors.surface.brand.defaultPressed
        : cssVarColors.surface.brand.default;
    }

    if (isPressed || isHovered) return cssVarColors.fill.normal;
    return cssVarColors.fill.alternative;
  };

  const chipStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: sizeStyle.height,
    padding: `0 ${fixedPadding
      ? `${sizeStyle.paddingX}px`
      : `clamp(${sizeStyle.paddingX}px, 3vw, ${sizeStyle.paddingX + spacing.primitive[3]}px)`}`,
    fontSize: sizeStyle.fontSize,
    lineHeight: `${sizeStyle.lineHeight}px`,
    fontWeight: typography.fontWeight.medium,
    whiteSpace: 'nowrap',
    border: 'none',
    borderRadius: radius.primitive.full,
    backgroundColor: getBackgroundColor(),
    color: selected
      ? cssVarColors.content.base.onColor
      : cssVarColors.content.base.default,
    cursor: 'pointer',
    transition: transitions.all,
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      onClick={() => onSelect(item.value)}
      style={chipStyle}
      {...handlers}
    >
      {item.label}
    </button>
  );
}

export function CategoryNavigation({
  items,
  value,
  onChange,
  size = 'md',
  iconButton,
  fixedPadding = false,
  className,
}: CategoryNavigationProps) {
  if (items.length === 0) return null;

  const sizeStyle = sizeStyles[size];
  const activeValue = items.some((item) => item.value === value) ? value : items[0].value;

  const rootStyle: CSSProperties = {
    width: '100%',
    position: 'relative',
  };

  const scrollStyle: CSSProperties = {
    width: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
    paddingRight: iconButton ? ICON_SLOT_WIDTH : 0,
  };

  const listStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    width: 'max-content',
    minWidth: '100%',
    gap: sizeStyle.gap,
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
        aria-label="카테고리 탐색"
        className={SCROLL_CLASS}
        style={scrollStyle}
      >
        <div style={listStyle}>
          {items.map((item) => (
            <CategoryChip
              key={item.value}
              item={item}
              selected={item.value === activeValue}
              onSelect={onChange}
              sizeStyle={sizeStyle}
              fixedPadding={fixedPadding}
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
