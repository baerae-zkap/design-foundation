'use client';

import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { cssVarShadow } from '../../tokens/shadow';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { transitions } from '../../utils/styles';
import { zIndex } from '../../tokens/general';
import { SearchField } from '../SearchField/SearchField';

export type TopNavigationScrollEffect = 'none' | 'floating' | 'overlay';
export type TopNavigationVariant = 'normal' | 'display' | 'floating' | 'search';

export interface TopNavigationProps {
  variant?: TopNavigationVariant;
  title?: string;
  leadingButton?: ReactNode;
  trailingButtons?: ReactNode;
  toolbar?: ReactNode;
  fixed?: boolean;
  pad?: boolean;
  scrollEffect?: TopNavigationScrollEffect;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
  'aria-label'?: string;
}

export function TopNavigation({
  variant = 'normal',
  title,
  leadingButton,
  trailingButtons,
  toolbar,
  fixed = false,
  pad = false,
  scrollEffect = 'none',
  searchPlaceholder = '검색어를 입력하세요.',
  searchValue,
  onSearchChange,
  className,
  'aria-label': ariaLabel,
}: TopNavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!fixed) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => setScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fixed]);

  // floating variant always shows shadow
  const isFloatingVariant = variant === 'floating';
  const isDisplay = variant === 'display';
  const isSearch = variant === 'search';

  const rootStyle: CSSProperties = {
    width: '100%',
    position: fixed ? 'fixed' : 'relative',
    zIndex: fixed ? zIndex.sticky : undefined,
    top: fixed ? 0 : undefined,
    transition: transitions.all,
  };

  if (isFloatingVariant) {
    rootStyle.backgroundColor = cssVarColors.surface.base.default;
    rootStyle.boxShadow = cssVarShadow.semantic.header.scrolled;
  } else if (isDisplay) {
    rootStyle.backgroundColor = cssVarColors.surface.base.default;
  } else if (!fixed || scrollEffect === 'none') {
    rootStyle.backgroundColor = cssVarColors.surface.base.default;
  } else if (scrollEffect === 'floating') {
    rootStyle.backgroundColor = scrolled ? cssVarColors.surface.base.default : 'transparent';
    rootStyle.boxShadow = scrolled ? cssVarShadow.semantic.header.scrolled : 'none';
  } else if (scrollEffect === 'overlay') {
    rootStyle.backgroundColor = scrolled ? cssVarColors.surface.base.default : 'transparent';
    rootStyle.backdropFilter = scrolled ? 'blur(12px)' : 'none';
  }

  const headerHeight = isDisplay ? spacing.primitive[16] : spacing.component.header.height;

  const isCenteredTitle = !isDisplay && !isSearch;

  const headerRowStyle: CSSProperties = {
    height: headerHeight,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: pad ? spacing.component.header.paddingX : 0,
    paddingRight: pad ? spacing.component.header.paddingX : 0,
    position: 'relative',
  };

  const leadingSlotStyle: CSSProperties = {
    width: spacing.semantic.minTouchTarget,
    height: spacing.semantic.minTouchTarget,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const trailingSlotStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.primitive[1],
    flexShrink: 0,
    minWidth: spacing.semantic.minTouchTarget,
    justifyContent: 'flex-end',
    height: spacing.semantic.minTouchTarget,
  };

  // Title area
  let titleNode: ReactNode = null;

  if (isSearch) {
    titleNode = (
      <div style={{ flex: 1, paddingLeft: spacing.primitive[1], paddingRight: spacing.primitive[2] }}>
        <SearchField
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          aria-label={searchPlaceholder}
        />
      </div>
    );
  } else if (isDisplay) {
    titleNode = (
      <div style={{
        flex: 1,
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.bold,
        color: cssVarColors.content.base.default,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {title}
      </div>
    );
  } else {
    titleNode = (
      <div style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: 'calc(100% - 112px)',
        textAlign: 'center',
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        color: cssVarColors.content.base.default,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        pointerEvents: 'none',
      }}>
        {title}
      </div>
    );
  }

  return (
    <nav className={className} style={rootStyle} aria-label={ariaLabel}>
      <div style={headerRowStyle}>
        {leadingButton && <div style={leadingSlotStyle}>{leadingButton}</div>}
        {isCenteredTitle ? (
          <>
            {titleNode}
            <div style={{ flex: 1 }} />
          </>
        ) : titleNode}
        {trailingButtons && <div style={trailingSlotStyle}>{trailingButtons}</div>}
      </div>
      {toolbar && <div style={{ width: '100%' }}>{toolbar}</div>}
    </nav>
  );
}
