/**
 * FilterButton Component (Web)
 *
 * @description 컴팩트한 필터 선택 컨트롤입니다. 라벨 + 트레일링 셰브론을 표시하며,
 * 클릭 시 드롭다운 메뉴를 토글하여 아이템을 선택할 수 있습니다.
 *
 * @example
 * <FilterButton
 *   items={[
 *     { label: '최신순', value: 'latest' },
 *     { label: '인기순', value: 'popular' },
 *   ]}
 *   value={selected}
 *   onSelect={setSelected}
 * >
 *   정렬
 * </FilterButton>
 */

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { opacity, borderWidth } from '../../tokens/general';
import { cssVarShadow } from '../../tokens/shadow';
import { usePressable } from '../../utils/usePressable';

export type FilterButtonVariant = 'filled' | 'outlined';
export type FilterButtonSize = 'small' | 'medium' | 'large';

export interface FilterItem {
  label: string;
  value: string;
}

export interface FilterButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'value' | 'onSelect'> {
  /** 버튼 스타일 */
  variant?: FilterButtonVariant;
  /** 버튼 크기 */
  size?: FilterButtonSize;
  /** 메뉴 아이템 목록 */
  items?: FilterItem[];
  /** 선택된 값 (controlled) */
  value?: string;
  /** 아이템 선택 콜백 */
  onSelect?: (value: string) => void;
  /** 비활성 */
  disabled?: boolean;
  /** 라벨 텍스트 */
  children: ReactNode;
}

// Size configurations
const sizeConfig: Record<FilterButtonSize, {
  height: number;
  fontSize: number;
  paddingLeft: number;
  paddingRight: number;
  gap: number;
  iconSize: number;
  borderRadius: number;
}> = {
  small: {
    height: spacing.component.filterButton.height.sm,
    fontSize: typography.fontSize.compact,
    paddingLeft: spacing.component.filterButton.paddingLeft.sm,
    paddingRight: spacing.component.filterButton.paddingRight.sm,
    gap: spacing.component.filterButton.gap.sm,
    iconSize: spacing.component.filterButton.iconSize.sm,
    borderRadius: radius.component.filterButton.sm,
  },
  medium: {
    height: spacing.component.filterButton.height.md,
    fontSize: typography.fontSize.sm,
    paddingLeft: spacing.component.filterButton.paddingLeft.md,
    paddingRight: spacing.component.filterButton.paddingRight.md,
    gap: spacing.component.filterButton.gap.md,
    iconSize: spacing.component.filterButton.iconSize.md,
    borderRadius: radius.component.filterButton.md,
  },
  large: {
    height: spacing.component.filterButton.height.lg,
    fontSize: typography.fontSize.md,
    paddingLeft: spacing.component.filterButton.paddingLeft.lg,
    paddingRight: spacing.component.filterButton.paddingRight.lg,
    gap: spacing.component.filterButton.gap.lg,
    iconSize: spacing.component.filterButton.iconSize.lg,
    borderRadius: radius.component.filterButton.lg,
  },
};

// Color configurations
const colorConfig: Record<FilterButtonVariant, {
  bg: string;
  bgHover: string;
  bgOpen: string;
  text: string;
  textSelected: string;
  border: string | null;
}> = {
  filled: {
    bg: cssVarColors.surface.base.alternative,
    bgHover: cssVarColors.surface.base.defaultPressed,
    bgOpen: cssVarColors.surface.base.defaultPressed,
    text: cssVarColors.content.base.default,
    textSelected: cssVarColors.content.base.default,
    border: null,
  },
  outlined: {
    bg: 'transparent',
    bgHover: cssVarColors.fill.alternative,
    bgOpen: cssVarColors.fill.alternative,
    text: cssVarColors.content.base.default,
    textSelected: cssVarColors.content.base.default,
    border: cssVarColors.border.solid.default,
  },
};

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      items,
      value,
      onSelect,
      disabled = false,
      children,
      style,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({
      disabled,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      onMouseEnter,
    });

    const sizeStyle = sizeConfig[size];
    const colorStyle = colorConfig[variant];

    // Determine if a value is selected
    const hasValue = value !== undefined && items?.some(item => item.value === value);
    const selectedItem = hasValue ? items?.find(item => item.value === value) : undefined;

    // Display label: show selected item label when value is set, otherwise children
    const displayLabel = selectedItem ? selectedItem.label : children;

    const getBackgroundColor = (): string => {
      if (isOpen) return colorStyle.bgOpen;
      if ((isPressed || isHovered) && !disabled) return colorStyle.bgHover;
      return colorStyle.bg;
    };

    const getTextColor = (): string => {
      if (disabled) return cssVarColors.content.disabled.default;
      if (hasValue) return colorStyle.textSelected;
      return colorStyle.text;
    };

    // Toggle dropdown on button click
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        setIsOpen(prev => !prev);
      }
      onClick?.(e);
    };

    // Handle item selection
    const handleItemClick = (itemValue: string) => {
      onSelect?.(itemValue);
      setIsOpen(false);
    };

    // Close on outside click
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    // Close on ESC key
    useEffect(() => {
      if (!isOpen) return;

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    // Merge refs
    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref]
    );

    const buttonStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizeStyle.gap,
      height: sizeStyle.height,
      paddingLeft: sizeStyle.paddingLeft,
      paddingRight: sizeStyle.paddingRight,
      fontSize: sizeStyle.fontSize,
      fontWeight: hasValue ? typography.fontWeight.semibold : typography.fontWeight.medium,
      color: getTextColor(),
      backgroundColor: getBackgroundColor(),
      border: colorStyle.border
        ? `${borderWidth.default}px solid ${colorStyle.border}`
        : 'none',
      borderRadius: sizeStyle.borderRadius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? opacity.disabled : 1,
      transition: 'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
      whiteSpace: 'nowrap',
      ...style,
    };

    const chevronStyle: CSSProperties = {
      width: sizeStyle.iconSize,
      height: sizeStyle.iconSize,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'transform 200ms ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    };

    const containerStyle: CSSProperties = {
      position: 'relative',
      display: 'inline-block',
    };

    const menuStyle: CSSProperties = {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: spacing.primitive[1],
      minWidth: 160,
      backgroundColor: cssVarColors.surface.base.default,
      border: `1px solid ${cssVarColors.border.solid.alternative}`,
      borderRadius: radius.primitive.lg,
      boxShadow: cssVarShadow.semantic.dropdown.default,
      zIndex: 1000,
      overflow: 'hidden',
      padding: `${spacing.primitive[1]}px 0`,
    };

    const getMenuItemStyle = (itemValue: string, isItemHovered: boolean): CSSProperties => {
      const isSelected = value === itemValue;
      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: `${spacing.primitive[3]}px ${spacing.primitive[4]}px`,
        fontSize: typography.fontSize.sm,
        fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.regular,
        color: cssVarColors.content.base.default,
        backgroundColor: isItemHovered ? cssVarColors.surface.base.alternative : 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        lineHeight: 1.5,
        boxSizing: 'border-box',
      };
    };

    return (
      <div ref={containerRef} style={containerStyle}>
        <button
          ref={setRefs}
          disabled={disabled}
          aria-expanded={isOpen || undefined}
          aria-haspopup="listbox"
          aria-disabled={disabled}
          style={buttonStyle}
          onClick={handleButtonClick}
          {...handlers}
          {...props}
        >
          {/* Label */}
          <span style={{ flex: '0 1 auto', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {displayLabel}
          </span>

          {/* Trailing chevron */}
          <span style={chevronStyle}>
            <svg
              width={sizeStyle.iconSize * 0.75}
              height={sizeStyle.iconSize * 0.75}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </span>
        </button>

        {/* Dropdown menu */}
        {isOpen && items && items.length > 0 && (
          <div role="listbox" style={menuStyle}>
            {items.map((item) => (
              <MenuItem
                key={item.value}
                item={item}
                isSelected={value === item.value}
                getMenuItemStyle={getMenuItemStyle}
                onItemClick={handleItemClick}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

FilterButton.displayName = 'FilterButton';

// ---- Internal MenuItem with hover state ----

function MenuItem({
  item,
  isSelected,
  getMenuItemStyle,
  onItemClick,
}: {
  item: FilterItem;
  isSelected: boolean;
  getMenuItemStyle: (value: string, isHovered: boolean) => CSSProperties;
  onItemClick: (value: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      role="option"
      aria-selected={isSelected}
      style={getMenuItemStyle(item.value, hovered)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onItemClick(item.value)}
    >
      <span>{item.label}</span>
      {isSelected && (
        <svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
}
