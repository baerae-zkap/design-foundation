/**
 * FilterButton Component (React Native)
 *
 * @description 드롭다운 메뉴가 내장된 필터 버튼입니다.
 * 단일 선택 또는 다중 선택을 지원하며, 선택된 값을 버튼 라벨에 표시합니다.
 * @see docs/components/FilterButton.md - AI용 상세 가이드
 *
 * @example
 * // 단일 선택
 * <FilterButton
 *   label="카테고리"
 *   variant="solid"
 *   size="medium"
 *   items={[
 *     { id: '1', label: '옵션 1' },
 *     { id: '2', label: '옵션 2' },
 *   ]}
 *   selectionMode="single"
 *   selectedIds={['1']}
 *   onSelectionChange={(ids) => console.log(ids)}
 * />
 *
 * // 다중 선택
 * <FilterButton
 *   label="필터"
 *   variant="outlined"
 *   items={items}
 *   selectionMode="multiple"
 *   selectedIds={selectedIds}
 *   onSelectionChange={setSelectedIds}
 * />
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  Animated,
  ViewStyle,
  Platform,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type FilterButtonVariant = 'solid' | 'outlined';
export type FilterButtonSize = 'xsmall' | 'small' | 'medium' | 'large';

export interface FilterButtonItem {
  id: string;
  label: string;
}

export interface FilterButtonProps {
  /** Label text (shown when no selection) */
  label: string;
  /** Visual variant */
  variant?: FilterButtonVariant;
  /** Size */
  size?: FilterButtonSize;
  /** Menu items */
  items?: FilterButtonItem[];
  /** Selection mode */
  selectionMode?: 'single' | 'multiple';
  /** Currently selected item IDs */
  selectedIds?: string[];
  /** Selection change handler */
  onSelectionChange?: (ids: string[]) => void;
  /** Simple press handler (when no items, acts as toggle button) */
  onPress?: () => void;
  /** Disabled */
  disabled?: boolean;
  /** Custom style */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}

// Size configuration using Foundation tokens
const sizeConfig: Record<
  FilterButtonSize,
  {
    height: number;
    fontSize: number;
    paddingX: number;
    iconSize: number;
    borderRadius: number;
  }
> = {
  xsmall: {
    height: 28,
    fontSize: typography.fontSize.xs, // 12
    paddingX: spacing.primitive[2], // 8
    iconSize: 14,
    borderRadius: radius.primitive.sm, // 8
  },
  small: {
    height: 32,
    fontSize: 13,
    paddingX: spacing.primitive[3], // 12
    iconSize: 16,
    borderRadius: radius.primitive.sm, // 8
  },
  medium: {
    height: 36,
    fontSize: typography.fontSize.sm, // 14
    paddingX: spacing.primitive[4], // 16
    iconSize: 18,
    borderRadius: radius.primitive.sm, // 8
  },
  large: {
    height: 40,
    fontSize: typography.fontSize.md, // 16
    paddingX: spacing.primitive[5], // 20
    iconSize: 20,
    borderRadius: radius.component.button.sm, // 8
  },
};

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  variant = 'solid',
  size = 'medium',
  items = [],
  selectionMode = 'single',
  selectedIds = [],
  onSelectionChange,
  onPress,
  disabled = false,
  style,
  testID = 'filter-button',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(selectedIds);
  const chevronRotation = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const sizeStyle = sizeConfig[size];
  const hasItems = items.length > 0;
  const hasSelection = selectedIds.length > 0;

  // Sync internal state with props
  useEffect(() => {
    setInternalSelectedIds(selectedIds);
  }, [selectedIds]);

  // Animate chevron rotation
  useEffect(() => {
    Animated.timing(chevronRotation, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  // Animate menu appearance
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  const chevronRotate = chevronRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Compute display label
  const getDisplayLabel = (): string => {
    if (selectedIds.length === 0) return label;

    if (selectionMode === 'single' && selectedIds.length === 1) {
      const selectedItem = items.find((item) => item.id === selectedIds[0]);
      return selectedItem?.label || label;
    }

    if (selectionMode === 'multiple' && selectedIds.length > 0) {
      const firstItem = items.find((item) => item.id === selectedIds[0]);
      if (!firstItem) return label;
      if (selectedIds.length === 1) return firstItem.label;
      return `${firstItem.label} 외 ${selectedIds.length - 1}개`;
    }

    return label;
  };

  // Get button background color
  const getButtonBackgroundColor = (pressed: boolean): string => {
    if (disabled) {
      if (variant === 'solid') {
        return hasSelection
          ? colors.surface.brand.default
          : colors.surface.base.container;
      }
      return 'transparent';
    }

    if (variant === 'solid') {
      if (hasSelection) {
        return pressed
          ? colors.surface.brand.defaultPressed
          : colors.surface.brand.default;
      }
      return pressed
        ? colors.surface.base.alternative
        : colors.surface.base.container;
    }

    // outlined
    return 'transparent';
  };

  // Get button border color
  const getButtonBorderColor = (): string => {
    if (variant === 'outlined') {
      return hasSelection
        ? colors.content.brand.default
        : colors.border.solid.default;
    }
    return 'transparent';
  };

  // Get text color
  const getTextColor = (): string => {
    if (disabled) {
      return variant === 'solid' && hasSelection
        ? colors.content.base.onColor
        : colors.content.disabled.default;
    }

    if (variant === 'solid' && hasSelection) {
      return colors.content.base.onColor;
    }

    if (variant === 'outlined' && hasSelection) {
      return colors.content.brand.default;
    }

    return colors.content.base.default;
  };

  // Get icon color
  const getIconColor = (): string => {
    if (disabled) {
      return variant === 'solid' && hasSelection
        ? colors.content.base.onColor
        : colors.content.disabled.default;
    }

    if (variant === 'solid' && hasSelection) {
      return colors.content.base.onColor;
    }

    if (variant === 'outlined' && hasSelection) {
      return colors.content.brand.default;
    }

    return colors.content.base.default;
  };

  // Handle trigger press
  const handleTriggerPress = () => {
    if (disabled) return;

    if (hasItems) {
      setIsOpen(true);
    } else {
      onPress?.();
    }
  };

  // Handle item press
  const handleItemPress = (itemId: string) => {
    if (selectionMode === 'single') {
      const newSelectedIds = [itemId];
      setInternalSelectedIds(newSelectedIds);
      onSelectionChange?.(newSelectedIds);
      setIsOpen(false);
    } else {
      // multiple mode: toggle selection
      const newSelectedIds = internalSelectedIds.includes(itemId)
        ? internalSelectedIds.filter((id) => id !== itemId)
        : [...internalSelectedIds, itemId];
      setInternalSelectedIds(newSelectedIds);
    }
  };

  // Handle confirm (multiple mode)
  const handleConfirm = () => {
    onSelectionChange?.(internalSelectedIds);
    setIsOpen(false);
  };

  // Handle close
  const handleClose = () => {
    // Reset internal state on cancel
    setInternalSelectedIds(selectedIds);
    setIsOpen(false);
  };

  return (
    <View style={[{ alignSelf: 'flex-start' }, style]}>
      {/* Trigger Button */}
      <Pressable
        onPress={handleTriggerPress}
        disabled={disabled}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{
          disabled,
          selected: hasSelection,
          expanded: isOpen,
        }}
        style={({ pressed }) => ({
          height: sizeStyle.height,
          paddingHorizontal: sizeStyle.paddingX,
          borderRadius: sizeStyle.borderRadius,
          backgroundColor: getButtonBackgroundColor(pressed),
          borderWidth: variant === 'outlined' ? 1 : 0,
          borderColor: getButtonBorderColor(),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: spacing.primitive[2], // 8
          opacity: disabled ? 0.4 : 1,
        })}
      >
        <Text
          style={{
            fontSize: sizeStyle.fontSize,
            fontWeight: typography.fontWeight.medium,
            fontFamily: typography.fontFamily.base,
            color: getTextColor(),
          }}
          numberOfLines={1}
        >
          {getDisplayLabel()}
        </Text>

        <Animated.View
          style={{
            transform: [{ rotate: chevronRotate }],
          }}
        >
          <ChevronDown
            size={sizeStyle.iconSize}
            color={getIconColor()}
            strokeWidth={2}
          />
        </Animated.View>
      </Pressable>

      {/* Dropdown Menu Modal */}
      {hasItems && (
        <Modal
          visible={isOpen}
          transparent
          animationType="none"
          onRequestClose={handleClose}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: colors.overlay.dim,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleClose}
          >
            <Animated.View
              style={{
                backgroundColor: colors.surface.elevated.default,
                borderRadius: radius.component.card.sm, // 12
                minWidth: 240,
                maxWidth: 320,
                maxHeight: 400,
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
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
              }}
              onStartShouldSetResponder={() => true}
            >
              {/* Items List */}
              <ScrollView
                style={{ flexGrow: 0 }}
                showsVerticalScrollIndicator={false}
              >
                {items.map((item) => {
                  const isSelected = internalSelectedIds.includes(item.id);

                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => handleItemPress(item.id)}
                      style={({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: spacing.component.list.itemPaddingX, // 20
                        paddingVertical: spacing.component.input.paddingY, // 12
                        minHeight: 48,
                        backgroundColor: pressed
                          ? colors.surface.base.container
                          : 'transparent',
                      })}
                      testID={`${testID}-item-${item.id}`}
                    >
                      <Text
                        style={{
                          fontSize: typography.fontSize.md, // 16
                          fontFamily: typography.fontFamily.base,
                          fontWeight: typography.fontWeight.regular,
                          color: colors.content.base.default,
                          flex: 1,
                        }}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>

                      {/* Check icon for selected items */}
                      {isSelected && (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Check
                            size={20}
                            color={colors.content.brand.default}
                            strokeWidth={2}
                          />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </ScrollView>

              {/* Confirm Button (multiple mode only) */}
              {selectionMode === 'multiple' && (
                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: colors.border.base.default,
                    paddingTop: spacing.primitive[3], // 12
                    paddingHorizontal: spacing.primitive[3], // 12
                    paddingBottom: spacing.primitive[2], // 8
                  }}
                >
                  <Pressable
                    onPress={handleConfirm}
                    style={({ pressed }) => ({
                      height: 40,
                      backgroundColor: pressed
                        ? colors.surface.brand.defaultPressed
                        : colors.surface.brand.default,
                      borderRadius: radius.component.button.sm, // 8
                      justifyContent: 'center',
                      alignItems: 'center',
                    })}
                  >
                    <Text
                      style={{
                        fontSize: typography.fontSize.md, // 16
                        fontWeight: typography.fontWeight.semibold,
                        fontFamily: typography.fontFamily.base,
                        color: colors.content.base.onColor,
                      }}
                    >
                      확인
                    </Text>
                  </Pressable>
                </View>
              )}
            </Animated.View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

FilterButton.displayName = 'FilterButton';
