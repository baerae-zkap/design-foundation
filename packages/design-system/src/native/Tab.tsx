/**
 * Tab Component
 *
 * Horizontal tab navigation with animated underline indicator.
 * Follows Montage design system patterns with Foundation tokens.
 */

import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Animated,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type TabMode = 'scroll' | 'fluid';
export type TabSize = 'small' | 'medium' | 'large';

/**
 * TabItem Props
 */
export interface TabItemProps {
  /** Tab label text */
  label: string;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional badge number */
  badge?: number;
  /** Show notification dot (red bean) */
  showDot?: boolean;
}

/**
 * TabList Props
 */
export interface TabListProps {
  /** Array of TabItem configurations */
  children: TabItemProps[];
  /** Currently selected tab index */
  selectedIndex: number;
  /** Callback when tab is selected */
  onSelect: (index: number) => void;
  /** Tab layout mode */
  mode?: TabMode;
  /** Tab size variant */
  size?: TabSize;
  /** Gap between tab items */
  itemGap?: number;
  /** 좌우 여백 표시 여부 */
  horizontalPadding?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Test ID for automation */
  testID?: string;
}

/**
 * Internal TabItem component for rendering individual tabs
 */
const TabItemComponent = forwardRef<
  View,
  TabItemProps & {
    isSelected: boolean;
    onPress: () => void;
    onLayout: (event: any) => void;
    mode: TabMode;
    size: TabSize;
  }
>(({ label, disabled, icon, badge, showDot, isSelected, onPress, onLayout, mode, size }, ref) => {
  const textColor = disabled
    ? colors.content.disabled.default
    : isSelected
    ? colors.content.base.default
    : colors.content.base.assistive;

  const sizeConfig = {
    small: { fontSize: 13, height: 36 },
    medium: { fontSize: 14, height: 40 },
    large: { fontSize: 15, height: spacing.component.tabBar.height },
  };
  const { fontSize, height: tabHeight } = sizeConfig[size];

  return (
    <Pressable
      ref={ref}
      onPress={disabled ? undefined : onPress}
      onLayout={onLayout}
      disabled={disabled}
      style={({ pressed }) => [
        styles.tabItem,
        { height: tabHeight },
        mode === 'fluid' && styles.tabItemFluid,
        pressed && !disabled && styles.tabItemPressed,
      ]}
    >
      <View style={styles.tabItemContent}>
        {icon && <View style={styles.tabIcon}>{icon}</View>}
        <View style={{ position: 'relative' }}>
          <Text style={[
            styles.tabLabel,
            {
              color: textColor,
              fontSize,
              fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.regular,
            }
          ]}>{label}</Text>
          {showDot && (
            <View
              style={{
                position: 'absolute',
                top: -2,
                right: -8,
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.content.error.default,
              }}
            />
          )}
        </View>
        {badge !== undefined && badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
});

TabItemComponent.displayName = 'TabItem';

/**
 * TabList Component
 *
 * Horizontal scrollable tab navigation with animated indicator.
 *
 * @example
 * ```tsx
 * const [selectedIndex, setSelectedIndex] = useState(0);
 *
 * <TabList
 *   selectedIndex={selectedIndex}
 *   onSelect={setSelectedIndex}
 * >
 *   {[
 *     { label: 'Home' },
 *     { label: 'Profile' },
 *     { label: 'Settings', disabled: true }
 *   ]}
 * </TabList>
 * ```
 */
export const TabList = forwardRef<ScrollView, TabListProps>(
  ({ children, selectedIndex, onSelect, mode = 'scroll', size = 'large', itemGap = spacing.primitive[5], horizontalPadding = true, style, testID }, ref) => {
    const tabRefs = useRef<(View | null)[]>([]);
    const [tabLayouts, setTabLayouts] = useState<
      { x: number; width: number }[]
    >([]);
    const indicatorAnim = useRef(new Animated.Value(0)).current;
    const indicatorWidthAnim = useRef(new Animated.Value(0)).current;

    // Measure tab positions for indicator animation
    const handleTabLayout = (index: number, event: any) => {
      const { x, width } = event.nativeEvent.layout;
      setTabLayouts((prev) => {
        const updated = [...prev];
        updated[index] = { x, width };
        return updated;
      });
    };

    // Animate indicator when selectedIndex changes
    useLayoutEffect(() => {
      if (tabLayouts[selectedIndex]) {
        const { x, width } = tabLayouts[selectedIndex];
        Animated.parallel([
          Animated.spring(indicatorAnim, {
            toValue: x,
            useNativeDriver: true,
            tension: 300,
            friction: 30,
          }),
          Animated.spring(indicatorWidthAnim, {
            toValue: width,
            useNativeDriver: false,
            tension: 300,
            friction: 30,
          }),
        ]).start();
      }
    }, [selectedIndex, tabLayouts, indicatorAnim, indicatorWidthAnim]);

    const tabHeightMap = {
      small: 36,
      medium: 40,
      large: spacing.component.tabBar.height,
    };
    const tabHeight = tabHeightMap[size];
    const indicatorHeight = 2;
    const hPadding = horizontalPadding ? spacing.semantic.horizontal.xs : 0;

    if (mode === 'fluid') {
      return (
        <View style={[styles.container, { height: tabHeight }, style]} testID={testID}>
          <View style={[styles.fluidContainer, { gap: itemGap, paddingHorizontal: hPadding }]}>
            {children.map((item, index) => (
              <TabItemComponent
                key={index}
                ref={(el) => { tabRefs.current[index] = el; }}
                {...item}
                isSelected={index === selectedIndex}
                onPress={() => onSelect(index)}
                onLayout={(event) => handleTabLayout(index, event)}
                mode={mode}
                size={size}
              />
            ))}
          </View>
          <View style={styles.bottomBorder} />
          <Animated.View
            style={[
              styles.indicator,
              {
                height: indicatorHeight,
                transform: [{ translateX: indicatorAnim }],
                width: indicatorWidthAnim,
              },
            ]}
          />
        </View>
      );
    }

    return (
      <View style={[styles.container, { height: tabHeight }, style]} testID={testID}>
        <ScrollView
          ref={ref}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { gap: itemGap, paddingHorizontal: hPadding }]}
        >
          {children.map((item, index) => (
            <TabItemComponent
              key={index}
              ref={(el) => { tabRefs.current[index] = el; }}
              {...item}
              isSelected={index === selectedIndex}
              onPress={() => onSelect(index)}
              onLayout={(event) => handleTabLayout(index, event)}
              mode={mode}
              size={size}
            />
          ))}
        </ScrollView>
        <View style={styles.bottomBorder} />
        <Animated.View
          style={[
            styles.indicator,
            {
              height: indicatorHeight,
              transform: [{ translateX: indicatorAnim }],
              width: indicatorWidthAnim,
            },
          ]}
        />
      </View>
    );
  }
);

TabList.displayName = 'TabList';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.base.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.solid.alternative,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fluidContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tabItem: {
    paddingHorizontal: spacing.semantic.horizontal.xs, // 12px
    paddingVertical: spacing.semantic.inset.sm, // 16px
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.primitive.none, // 0
  },
  tabItemFluid: {
    flex: 1,
  },
  tabItemPressed: {
    opacity: 0.7,
  },
  tabItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[2], // 8px - icon-text gap
  },
  tabIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontFamily: typography.fontFamily.base,
    letterSpacing: -0.01,
  } as TextStyle,
  badge: {
    backgroundColor: colors.surface.brand.default,
    borderRadius: radius.component.badge.pill, // 9999
    paddingHorizontal: spacing.primitive[2], // 8px
    paddingVertical: spacing.primitive[1], // 4px
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.content.base.onColor,
    fontSize: typography.fontSize['2xs'],
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.base,
  } as TextStyle,
  bottomBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.border.solid.alternative,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.surface.brand.default,
    borderRadius: 1,
  },
});

/**
 * Export both TabList and TabItemProps for convenience
 */
export const Tab = {
  List: TabList,
};
