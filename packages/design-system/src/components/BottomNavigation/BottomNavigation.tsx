'use client';

/**
 * BottomNavigation Component (Web)
 *
 * @description 화면 하단에 고정되는 기본 탭 네비게이션입니다. 앱의 주요 섹션 간 이동에 사용합니다.
 *
 * @example
 * <BottomNavigation
 *   items={[
 *     { icon: <HomeIcon />, label: '홈' },
 *     { icon: <SearchIcon />, label: '검색' },
 *     { icon: <ProfileIcon />, label: '내 정보' },
 *   ]}
 *   activeIndex={activeTab}
 *   onChange={setActiveTab}
 * />
 */

import { type CSSProperties, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { usePressable } from '../../utils/usePressable';
import { transitions } from '../../utils/styles';
import { duration, easing } from '../../tokens/motion';
import { borderWidth } from '../../tokens/general';

export interface BottomNavigationItem {
  /** 기본(비활성) 아이콘 */
  icon: ReactNode;
  /** 활성 상태 아이콘 (없으면 icon 사용) */
  activeIcon?: ReactNode;
  /** 탭 레이블 (최대 6자 권장) */
  label: string;
  /** 탭 클릭 핸들러 (onChange 외 추가 동작이 필요한 경우) */
  onClick?: () => void;
}

export interface BottomNavigationProps {
  /** 탭 목록 (2–5개) */
  items: BottomNavigationItem[];
  /** 현재 활성 탭 인덱스 */
  activeIndex: number;
  /** 탭 변경 핸들러 */
  onChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

const NAVIGATION_HEIGHT = 68;
const ICON_SIZE = 24;
const MAX_ITEMS = 5;

interface TabItemProps {
  item: BottomNavigationItem;
  isActive: boolean;
  itemCount: number;
  onSelect: () => void;
}

function TabItem({ item, isActive, itemCount, onSelect }: TabItemProps) {
  const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>();

  // Monochromatic: active = primary text, inactive = secondary text
  const iconColor = isActive
    ? cssVarColors.content.base.default
    : cssVarColors.content.base.secondary;

  // Pill width scales up as there are fewer tabs (more space per tab)
  const pillWidth = Math.min(80, Math.max(44, Math.round(240 / itemCount)));

  // Pill bg: only appears on press/hover, not on static active state
  const pillBg = isPressed || isHovered
    ? cssVarColors.surface.base.defaultPressed
    : 'transparent';

  const buttonStyle: CSSProperties = {
    flex: 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
    border: 'none',
    background: 'transparent',
    color: iconColor,
    cursor: 'pointer',
    padding: 0,
    margin: 0,
    outline: 'none',
  };

  const labelStyle: CSSProperties = {
    fontSize: typography.fontSize['3xs'],
    lineHeight: `${typography.lineHeight['3xs']}px`,
    fontWeight: typography.fontWeight.medium,
    color: 'currentColor',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  };

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      aria-label={item.label}
      onClick={onSelect}
      style={buttonStyle}
      {...handlers}
    >
      {/* Pill — bg + content scale together on press */}
      <span style={{
        width: pillWidth,
        borderRadius: radius.primitive.md,
        backgroundColor: pillBg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: spacing.primitive[1],
        paddingBottom: spacing.primitive[1],
        gap: spacing.primitive[1],
        flexShrink: 0,
        // Press: snap down quickly
        // Release: spring back with overshoot (울렁울렁 jiggle)
        transform: isPressed ? 'scale(0.88)' : 'scale(1)',
        transition: isPressed
          ? `background-color ${duration.fast}ms ${easing.easeOut}, transform ${duration.instant}ms ${easing.easeIn}`
          : `background-color ${duration.fast}ms ${easing.easeOut}, transform ${duration.slow}ms ${easing.spring}`,
      }}>
        <span style={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {isActive ? (item.activeIcon ?? item.icon) : item.icon}
        </span>
        <span style={labelStyle}>{item.label}</span>
      </span>
    </button>
  );
}


export function BottomNavigation({
  items,
  activeIndex,
  onChange,
  className,
  style,
}: BottomNavigationProps) {
  const visibleItems = items.slice(0, MAX_ITEMS);
  if (visibleItems.length === 0) return null;

  const clampedActive = Math.max(0, Math.min(activeIndex, visibleItems.length - 1));

  const containerStyle: CSSProperties = {
    width: '100%',
    height: NAVIGATION_HEIGHT,
    display: 'flex',
    alignItems: 'stretch',
    borderTop: `${borderWidth.default}px solid ${cssVarColors.border.base.default}`,
    backgroundColor: cssVarColors.surface.base.default,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    ...style,
  };

  return (
    <>
    <nav
      role="tablist"
      aria-label="하단 탭 바"
      className={className}
      style={containerStyle}
    >
      {visibleItems.map((item, index) => (
        <TabItem
          key={`${item.label}-${index}`}
          item={item}
          isActive={index === clampedActive}
          itemCount={visibleItems.length}
          onSelect={() => {
            onChange?.(index);
            item.onClick?.();
          }}
        />
      ))}
    </nav>
    </>
  );
}
