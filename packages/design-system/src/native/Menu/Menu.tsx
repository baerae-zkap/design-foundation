import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ViewStyle,
  TextStyle,
  Animated,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { Check } from 'lucide-react-native';

export type MenuSelectionMode = 'single' | 'radio' | 'checkbox';

export interface MenuSection {
  title?: string;
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
}

export type MenuPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

export interface MenuProps {
  trigger: React.ReactNode;
  sections: MenuSection[];
  // Selection
  selectionMode?: MenuSelectionMode;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  // Action area
  actionArea?: React.ReactNode;
  // Visibility
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  // Layout
  placement?: MenuPlacement;
  width?: number;
  // Style
  style?: ViewStyle;
  testID?: string;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  sections,
  selectionMode = 'single',
  selectedIds = [],
  onSelectionChange,
  actionArea,
  visible: controlledVisible,
  onVisibleChange,
  placement = 'bottom-start',
  width,
  style,
  testID = 'menu',
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const isControlled = controlledVisible !== undefined;
  const isVisible = isControlled ? controlledVisible : internalVisible;

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  const handleVisibilityChange = (visible: boolean) => {
    if (isControlled) {
      onVisibleChange?.(visible);
    } else {
      setInternalVisible(visible);
      onVisibleChange?.(visible);
    }
  };

  const handleTriggerPress = () => {
    handleVisibilityChange(!isVisible);
  };

  const handleItemPress = (item: MenuItem) => {
    if (item.disabled) return;

    let newSelectedIds: string[];

    if (selectionMode === 'single') {
      // Single mode: select one and close menu
      newSelectedIds = [item.id];
      onSelectionChange?.(newSelectedIds);
      handleVisibilityChange(false);
    } else if (selectionMode === 'radio') {
      // Radio mode: select one but don't close (needs action area)
      newSelectedIds = [item.id];
      onSelectionChange?.(newSelectedIds);
    } else {
      // Checkbox mode: toggle selection
      if (selectedIds.includes(item.id)) {
        newSelectedIds = selectedIds.filter(id => id !== item.id);
      } else {
        newSelectedIds = [...selectedIds, item.id];
      }
      onSelectionChange?.(newSelectedIds);
    }
  };

  const handleOverlayPress = () => {
    handleVisibilityChange(false);
  };

  const getPlacementStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      position: 'absolute',
    };

    switch (placement) {
      case 'bottom-start':
        return { ...baseStyle, top: '50%', left: '10%' };
      case 'bottom-end':
        return { ...baseStyle, top: '50%', right: '10%' };
      case 'top-start':
        return { ...baseStyle, bottom: '50%', left: '10%' };
      case 'top-end':
        return { ...baseStyle, bottom: '50%', right: '10%' };
      default:
        return { ...baseStyle, top: '50%', left: '10%' };
    }
  };

  const isSelected = (itemId: string) => selectedIds.includes(itemId);

  const renderRadioIndicator = (selected: boolean) => (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  const renderCheckboxIndicator = (selected: boolean) => (
    <View style={[styles.checkboxOuter, selected && styles.checkboxOuterSelected]}>
      {selected && (
        <Check size={16} color={colors.content.base.onColor} strokeWidth={2.5} />
      )}
    </View>
  );

  const renderSections = () => {
    const stickyIndices: number[] = [];
    const flatItems: React.ReactNode[] = [];
    let currentIndex = 0;

    sections.forEach((section, sectionIdx) => {
      // Section header
      if (section.title) {
        stickyIndices.push(currentIndex);
        flatItems.push(
          <View key={`section-header-${sectionIdx}`} style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        );
        currentIndex++;
      }

      // Section items
      section.items.forEach((item, itemIdx) => {
        const selected = isSelected(item.id);

        flatItems.push(
          <Pressable
            key={`${sectionIdx}-${itemIdx}-${item.id}`}
            onPress={() => handleItemPress(item)}
            disabled={item.disabled}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && !item.disabled && styles.menuItemPressed,
              item.disabled && styles.menuItemDisabled,
            ]}
            testID={`${testID}-item-${item.id}`}
          >
            {/* Leading: Radio or Checkbox */}
            {selectionMode === 'radio' && (
              <View style={styles.leadingContainer}>
                {renderRadioIndicator(selected)}
              </View>
            )}
            {selectionMode === 'checkbox' && (
              <View style={styles.leadingContainer}>
                {renderCheckboxIndicator(selected)}
              </View>
            )}

            {/* Icon */}
            {item.icon && (
              <View style={styles.iconContainer}>{item.icon}</View>
            )}

            {/* Label and Description */}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.menuItemLabel,
                  item.destructive && styles.menuItemLabelDestructive,
                  item.disabled && styles.menuItemLabelDisabled,
                ]}
                numberOfLines={1}
              >
                {item.label}
              </Text>
              {item.description && (
                <Text style={styles.menuItemDescription} numberOfLines={1}>
                  {item.description}
                </Text>
              )}
            </View>

            {/* Trailing: Check icon for single mode or custom content */}
            {selectionMode === 'single' && selected && (
              <View style={styles.trailingContainer}>
                <Check size={20} color={colors.content.brand.default} strokeWidth={2} />
              </View>
            )}
            {item.trailing && (
              <View style={styles.trailingContainer}>{item.trailing}</View>
            )}
          </Pressable>
        );
        currentIndex++;
      });
    });

    return (
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={stickyIndices}
      >
        {flatItems}
      </ScrollView>
    );
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Pressable onPress={handleTriggerPress} testID={`${testID}-trigger`}>
        {trigger}
      </Pressable>

      <Modal
        visible={isVisible}
        transparent
        animationType="none"
        onRequestClose={() => handleVisibilityChange(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.menuPanel,
              width ? { width } : undefined,
              getPlacementStyle(),
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            {renderSections()}

            {/* Action Area */}
            {actionArea && (
              <View style={styles.actionArea}>
                {actionArea}
              </View>
            )}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

Menu.displayName = 'Menu';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay.dim,
  },
  menuPanel: {
    backgroundColor: colors.surface.elevated.default,
    borderRadius: radius.component.card.sm, // 12
    minWidth: 140,
    maxWidth: 320,
    maxHeight: 400,
    paddingVertical: spacing.primitive[2], // 8
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  scrollView: {
    flexGrow: 0,
  },
  sectionHeader: {
    paddingHorizontal: spacing.component.list.itemPaddingX, // 20
    paddingVertical: spacing.primitive[2], // 8
    backgroundColor: colors.surface.elevated.default,
  },
  sectionHeaderText: {
    fontSize: typography.fontSize.xs, // 12
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.secondary,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.component.list.itemPaddingX, // 20
    paddingVertical: spacing.component.input.paddingY, // 12
    gap: spacing.primitive[2], // 8
    minHeight: 48,
  },
  menuItemPressed: {
    backgroundColor: colors.surface.base.container,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  leadingContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border.base.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.content.brand.default,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.content.brand.default,
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border.base.default,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOuterSelected: {
    backgroundColor: colors.content.brand.default,
    borderColor: colors.content.brand.default,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemLabel: {
    fontSize: typography.fontSize.md, // 16
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.default,
  },
  menuItemLabelDestructive: {
    color: colors.content.error.default,
  },
  menuItemLabelDisabled: {
    color: colors.content.disabled.default,
  },
  menuItemDescription: {
    fontSize: typography.fontSize.xs, // 12
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.secondary,
    marginTop: 2,
  },
  trailingContainer: {
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.primitive[2], // 8
  },
  actionArea: {
    borderTopWidth: 1,
    borderTopColor: colors.border.base.default,
    paddingTop: spacing.primitive[3], // 12
    paddingHorizontal: spacing.primitive[3], // 12
    paddingBottom: spacing.primitive[2], // 8
  },
});
