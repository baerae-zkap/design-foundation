import React, { forwardRef } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { ChevronLeft, X, Search } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type TopNavigationVariant = 'normal' | 'display' | 'search';

export interface TopNavigationProps {
  /** Layout variant */
  variant?: TopNavigationVariant;
  /** Title text */
  title?: string;

  // ── Leading area (left side) ──
  /** Back button callback (shows ChevronLeft icon) */
  onBackPress?: () => void;
  /** Leading text button label */
  leadingText?: string;
  /** Leading text button callback */
  onLeadingPress?: () => void;
  /** Custom leading element (overrides onBackPress and leadingText) */
  leadingArea?: React.ReactNode;

  // ── Trailing area (right side) ──
  /** Close button callback (shows X icon) */
  onClosePress?: () => void;
  /** Trailing text button label */
  trailingText?: string;
  /** Trailing text button callback */
  onTrailingPress?: () => void;
  /** Custom trailing element (overrides onClosePress and trailingText) */
  trailingArea?: React.ReactNode;

  // ── Toolbar areas ──
  /** Toolbar content below the navigation bar */
  toolbar?: React.ReactNode;
  /** Extra toolbar content below the toolbar */
  extraToolbar?: React.ReactNode;

  // ── Search variant ──
  /** Search input placeholder (search variant) */
  searchPlaceholder?: string;
  /** Search input value (search variant) */
  searchValue?: string;
  /** Search input change handler (search variant) */
  onSearchChange?: (text: string) => void;
  /** Search submit handler */
  onSearchSubmit?: () => void;

  // ── Visual ──
  /** Show bottom border */
  borderVisible?: boolean;
  /** Custom container style */
  style?: ViewStyle;
  /** Test identifier */
  testID?: string;
}

/**
 * TopNavigation provides a top navigation bar with multiple layout variants.
 * Supports normal, display, and search modes.
 *
 * @example
 * ```tsx
 * // Normal variant
 * <TopNavigation
 *   variant="normal"
 *   title="Screen Title"
 *   onBackPress={() => {}}
 *   borderVisible
 * />
 *
 * // Display variant
 * <TopNavigation
 *   variant="display"
 *   title="Profile Name"
 *   trailingText="Edit"
 *   onTrailingPress={() => {}}
 * />
 *
 * // Search variant
 * <TopNavigation
 *   variant="search"
 *   onBackPress={() => {}}
 *   searchPlaceholder="Search..."
 *   searchValue={value}
 *   onSearchChange={setValue}
 * />
 * ```
 */
export const TopNavigation = forwardRef<View, TopNavigationProps>(
  (
    {
      variant = 'normal',
      title,
      onBackPress,
      leadingText,
      onLeadingPress,
      leadingArea,
      onClosePress,
      trailingText,
      onTrailingPress,
      trailingArea,
      toolbar,
      extraToolbar,
      searchPlaceholder = 'Search',
      searchValue,
      onSearchChange,
      onSearchSubmit,
      borderVisible = false,
      style,
      testID,
    },
    ref
  ) => {
    const isDisplay = variant === 'display';
    const isSearch = variant === 'search';

    // Icon colors
    const iconColor = colors.content.base.default;
    const titleColor = colors.content.base.strong;

    // Leading area logic
    const renderLeadingArea = () => {
      // 1. Custom leadingArea
      if (leadingArea) {
        return <View style={styles.leftSection}>{leadingArea}</View>;
      }

      // 2. Back button
      if (onBackPress) {
        return (
          <View style={styles.leftSection}>
            <Pressable
              onPress={onBackPress}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronLeft size={24} color={iconColor} />
            </Pressable>
          </View>
        );
      }

      // 4. Leading text button
      if (leadingText && onLeadingPress) {
        return (
          <View style={styles.leftSection}>
            <Pressable
              onPress={onLeadingPress}
              style={({ pressed }) => [
                styles.textButton,
                pressed && { opacity: 0.7 },
              ]}
              accessibilityRole="button"
            >
              <Text style={[styles.textButtonLabel, { color: colors.content.base.default }]}>
                {leadingText}
              </Text>
            </Pressable>
          </View>
        );
      }

      // 5. Empty space
      return <View style={styles.leftSection} />;
    };

    // Trailing area logic
    const renderTrailingArea = () => {
      // 1. Custom trailingArea
      if (trailingArea) {
        return <View style={styles.rightSection}>{trailingArea}</View>;
      }

      // 2. Close button
      if (onClosePress) {
        return (
          <View style={styles.rightSection}>
            <Pressable
              onPress={onClosePress}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={24} color={iconColor} />
            </Pressable>
          </View>
        );
      }

      // 3. Trailing text button
      if (trailingText && onTrailingPress) {
        return (
          <View style={styles.rightSection}>
            <Pressable
              onPress={onTrailingPress}
              style={({ pressed }) => [
                styles.textButton,
                pressed && { opacity: 0.7 },
              ]}
              accessibilityRole="button"
            >
              <Text style={[styles.textButtonLabel, { color: colors.content.brand.default }]}>
                {trailingText}
              </Text>
            </Pressable>
          </View>
        );
      }

      // 4. Empty space
      return <View style={styles.rightSection} />;
    };

    // Container styles
    const containerStyles = [
      styles.container,
      !isDisplay && !isSearch && styles.containerNormal,
      isDisplay && styles.containerDisplay,
      isSearch && styles.containerSearch,
      borderVisible && styles.containerWithBorder,
      style,
    ];

    // Render based on variant
    if (isDisplay) {
      return (
        <View ref={ref} style={containerStyles} testID={testID}>
          {/* Top row: leading + trailing */}
          <View style={styles.topRow}>
            {renderLeadingArea()}
            {renderTrailingArea()}
          </View>

          {/* Title section */}
          <View style={styles.titleSection}>
            {title && (
              <Text style={[styles.titleDisplay, { color: titleColor }]} numberOfLines={2}>
                {title}
              </Text>
            )}
          </View>

          {/* Toolbar */}
          {toolbar && (
            <View style={styles.toolbarContainer}>
              {toolbar}
            </View>
          )}

          {/* Extra toolbar */}
          {extraToolbar && (
            <View style={styles.toolbarContainer}>
              {extraToolbar}
            </View>
          )}
        </View>
      );
    }

    if (isSearch) {
      return (
        <View ref={ref} style={containerStyles} testID={testID}>
          {renderLeadingArea()}

          {/* Search input */}
          <View style={styles.searchInputContainer}>
            <Search size={20} color={colors.content.base.assistive} />
            <TextInput
              style={styles.searchInput}
              placeholder={searchPlaceholder}
              placeholderTextColor={colors.content.base.assistive}
              value={searchValue}
              onChangeText={onSearchChange}
              onSubmitEditing={onSearchSubmit}
              returnKeyType="search"
            />
          </View>

          {renderTrailingArea()}

          {/* Toolbar */}
          {toolbar && (
            <View style={styles.toolbarContainer}>
              {toolbar}
            </View>
          )}

          {/* Extra toolbar */}
          {extraToolbar && (
            <View style={styles.toolbarContainer}>
              {extraToolbar}
            </View>
          )}
        </View>
      );
    }

    // Normal
    return (
      <View ref={ref} style={containerStyles} testID={testID}>
        {renderLeadingArea()}

        {/* Center section with title */}
        <View style={styles.centerSection}>
          {title && (
            <Text style={[styles.titleNormal, { color: titleColor }]} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {renderTrailingArea()}

        {/* Toolbar */}
        {toolbar && (
          <View style={styles.toolbarContainer}>
            {toolbar}
          </View>
        )}

        {/* Extra toolbar */}
        {extraToolbar && (
          <View style={styles.toolbarContainer}>
            {extraToolbar}
          </View>
        )}
      </View>
    );
  }
);

TopNavigation.displayName = 'TopNavigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface.base.default,
    paddingHorizontal: spacing.component.header.paddingX, // 16px
  },
  containerNormal: {
    height: spacing.component.header.height, // 56px
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerDisplay: {
    flexDirection: 'column',
    paddingVertical: spacing.primitive[4], // 16px
  },
  containerSearch: {
    height: spacing.component.header.height, // 56px
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerWithBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.solid.alternative, // Light border color
  },
  leftSection: {
    minWidth: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.primitive[2], // 8px
  },
  rightSection: {
    minWidth: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.primitive[2], // -8px to align icon with edge
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    height: 44,
    paddingHorizontal: spacing.primitive[2], // 8px
    justifyContent: 'center',
  },
  textButtonLabel: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.base,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.primitive[3], // 12px
  },
  titleSection: {
    gap: spacing.primitive[1], // 4px
  },
  titleNormal: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    fontFamily: typography.fontFamily.base,
    textAlign: 'center',
  },
  titleDisplay: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.base,
    lineHeight: 32,
    flex: 1,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: colors.surface.base.alternative,
    borderRadius: 9999, // radius.input.search (full pill)
    paddingHorizontal: spacing.primitive[3], // 12px
    gap: spacing.primitive[2], // 8px
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.default,
    padding: 0, // Remove default padding
  },
  toolbarContainer: {
    marginTop: spacing.primitive[2], // 8px
    width: '100%',
  },
});
