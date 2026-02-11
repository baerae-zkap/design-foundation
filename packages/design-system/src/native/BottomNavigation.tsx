import React, { forwardRef, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

/**
 * Represents a single item in the bottom navigation bar.
 */
export type BottomNavigationItem = {
  /** The label text displayed below the icon */
  label: string;
  /** The icon element to display when inactive */
  icon: React.ReactNode;
  /** Optional icon to display when active (defaults to icon if not provided) */
  activeIcon?: React.ReactNode;
  /** Badge indicator: true for dot, number for count */
  badge?: number | boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Test identifier for automated testing */
  testID?: string;
};

/**
 * Props for the BottomNavigation component.
 */
export interface BottomNavigationProps {
  /** Array of navigation items (3-5 recommended) */
  items: BottomNavigationItem[];
  /** Index of the currently selected item */
  selectedIndex: number;
  /** Callback when an item is selected */
  onSelect: (index: number) => void;
  /** Additional styles for the container */
  style?: ViewStyle;
  /** Test identifier for the navigation bar */
  testID?: string;
}

/**
 * Individual tab item with animated press interaction.
 */
const NavItem = ({
  item,
  isActive,
  onPress,
}: {
  item: BottomNavigationItem;
  isActive: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const isDisabled = item.disabled;

  const handlePressIn = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.88,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.5,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const handlePressOut = useCallback(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 6,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim]);

  const rawIcon = isActive && item.activeIcon ? item.activeIcon : item.icon;

  // Inject color into icon element based on state
  const iconColor = isDisabled
    ? colors.content.disabled.default
    : isActive
    ? colors.content.brand.default
    : colors.content.base.alternative;
  const iconToDisplay = React.isValidElement(rawIcon)
    ? React.cloneElement(rawIcon as React.ReactElement<any>, {
        color: iconColor,
        fill: isActive && !isDisabled ? iconColor : 'none',
      })
    : rawIcon;

  return (
    <Pressable
      onPress={!isDisabled ? onPress : undefined}
      onPressIn={!isDisabled ? handlePressIn : undefined}
      onPressOut={!isDisabled ? handlePressOut : undefined}
      disabled={isDisabled}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: isDisabled }}
      accessibilityLabel={item.label}
      testID={item.testID}
      style={({ pressed }) => [
        styles.item,
        pressed && !isDisabled && styles.itemPressed,
      ]}
    >
      <Animated.View
        style={[
          styles.itemInner,
          {
            transform: [{ scale: isDisabled ? 1 : scaleAnim }],
            opacity: isDisabled ? 1 : opacityAnim,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <View
            style={[
              styles.iconWrapper,
              isDisabled && styles.disabledIcon,
            ]}
          >
            {iconToDisplay}
          </View>
          {item.badge !== undefined && item.badge !== false && (
            <View
              style={[
                styles.badge,
                typeof item.badge === 'number'
                  ? styles.badgeWithCount
                  : styles.badgeDot,
              ]}
            >
              {typeof item.badge === 'number' && item.badge > 0 && (
                <Text style={styles.badgeText}>
                  {item.badge > 99 ? '99+' : item.badge}
                </Text>
              )}
            </View>
          )}
        </View>
        <Text
          style={[
            styles.label,
            isActive && styles.labelActive,
            isDisabled && styles.labelDisabled,
          ]}
          numberOfLines={1}
        >
          {item.label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

/**
 * BottomNavigation provides a fixed bottom navigation bar for mobile apps.
 * Supports 3-5 tabs with icons, labels, and optional badges.
 *
 * Features:
 * - Active tab: brand blue icon + bold blue label
 * - Inactive tab: gray icon + regular gray label
 * - Smooth press animation (scale + background fade)
 * - Red badge for notifications (dot or count)
 * - Fixed height of 58px (web spec)
 *
 * @example
 * ```tsx
 * <BottomNavigation
 *   items={[
 *     { label: 'Home', icon: <HomeIcon />, badge: 3 },
 *     { label: 'Search', icon: <SearchIcon /> },
 *     { label: 'Profile', icon: <UserIcon />, activeIcon: <UserFilledIcon /> },
 *   ]}
 *   selectedIndex={0}
 *   onSelect={(index) => console.log('Selected:', index)}
 * />
 * ```
 */
export const BottomNavigation = forwardRef<View, BottomNavigationProps>(
  ({ items, selectedIndex, onSelect, style, testID }, ref) => {
    return (
      <View ref={ref} style={[styles.container, style]} testID={testID}>
        {items.map((item, index) => (
          <NavItem
            key={index}
            item={item}
            isActive={index === selectedIndex}
            onPress={() => onSelect(index)}
          />
        ))}
      </View>
    );
  }
);

BottomNavigation.displayName = 'BottomNavigation';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 58, // Fixed height per Montage web spec
    backgroundColor: colors.surface.base.default,
    borderTopWidth: 1,
    borderTopColor: colors.border.base.default,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemPressed: {
    backgroundColor: colors.surface.base.alternative,
  },
  itemInner: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.primitive[1], // 4px
    paddingVertical: spacing.primitive[1], // 4px
    paddingHorizontal: spacing.primitive[3], // 12px
    borderRadius: radius.primitive.sm, // 8px rounded press area
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledIcon: {
    opacity: 0.4,
  },
  label: {
    fontSize: typography.fontSize['2xs'],
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.alternative,
    textAlign: 'center',
  },
  labelActive: {
    fontWeight: typography.fontWeight.bold,
    color: colors.content.brand.default,
  },
  labelDisabled: {
    color: colors.content.disabled.default,
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -6,
    borderRadius: radius.primitive.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDot: {
    width: 8,
    height: 8,
    backgroundColor: colors.content.error.default,
  },
  badgeWithCount: {
    minWidth: 16,
    height: 16,
    paddingHorizontal: spacing.primitive[1], // 4px
    backgroundColor: colors.content.error.default,
  },
  badgeText: {
    fontSize: typography.fontSize['3xs'],
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.onColor,
  },
});
