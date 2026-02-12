/**
 * Select Component (React Native)
 *
 * @description 드롭다운 목록에서 옵션을 선택하는 컴포넌트입니다.
 * @see docs/components/Select.md - AI용 상세 가이드
 *
 * @example
 * // Single select
 * <Select
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 *   options={[
 *     { label: '옵션 1', value: '1' },
 *     { label: '옵션 2', value: '2' },
 *   ]}
 *   placeholder="선택하세요"
 * />
 *
 * @example
 * // Multi select with chips
 * <Select
 *   multiple
 *   renderType="chip"
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 *   options={options}
 *   label="관심 분야"
 *   description="최대 5개까지 선택 가능합니다"
 * />
 */

import React, { forwardRef, useState, type ReactNode } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Check, ChevronDown, X } from 'lucide-react-native';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectRenderType = 'text' | 'chip';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  /** 선택된 값 (single: string | null, multiple: string[]) */
  value: string | string[] | null;
  /** 변경 핸들러 (single: string, multiple: string[]) */
  onChange: (value: string | string[]) => void;
  /** 옵션 목록 */
  options: SelectOption[];
  /** 플레이스홀더 */
  placeholder?: string;
  /** 라벨 */
  label?: string;
  /** 설명 텍스트 (helper text) */
  description?: string;
  /** 필수 입력 표시 */
  required?: boolean;
  /** 리딩 아이콘 */
  leadingIcon?: ReactNode;
  /** 다중 선택 지원 */
  multiple?: boolean;
  /** 렌더링 타입 (text: 콤마 구분, chip: 칩 형태) */
  renderType?: SelectRenderType;
  /** 오버플로우 (true: 고정 높이 + 스크롤, false: 자동 높이) */
  overflow?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 읽기 전용 상태 */
  readOnly?: boolean;
  /** 크기 */
  size?: SelectSize;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

const sizeConfig: Record<SelectSize, { height: number; fontSize: number; paddingHorizontal: number; paddingVertical: number; iconSize: number }> = {
  small: {
    height: 36,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.input.paddingX,
    paddingVertical: spacing.component.input.paddingY,
    iconSize: 14,
  },
  medium: {
    height: 44,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.input.paddingX,
    paddingVertical: spacing.component.input.paddingY,
    iconSize: 16,
  },
  large: {
    height: 52,
    fontSize: typography.fontSize.md,
    paddingHorizontal: spacing.component.input.paddingX,
    paddingVertical: spacing.component.input.paddingY,
    iconSize: 18,
  },
};

// Chip component for multi-select
const Chip: React.FC<{
  label: string;
  onRemove: () => void;
  disabled?: boolean;
  size: SelectSize;
}> = ({ label, onRemove, disabled, size }) => {
  const chipHeight = size === 'small' ? 20 : 24;
  const chipPaddingX = size === 'small' ? spacing.semantic.inset['3xs'] + 2 : spacing.primitive[2];
  const chipFontSize = size === 'small' ? typography.fontSize['2xs'] : typography.fontSize.xs;
  const iconSize = size === 'small' ? 10 : 12;

  return (
    <View
      style={{
        alignSelf: 'flex-start',
        height: chipHeight,
        paddingHorizontal: chipPaddingX,
        borderRadius: radius.component.chip.default,
        backgroundColor: colors.surface.base.alternative,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.primitive[1],
      }}
    >
      <Text
        style={{
          fontSize: chipFontSize,
          fontFamily: typography.fontFamily.base,
          color: colors.content.base.default,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
      {!disabled && (
        <Pressable
          onPress={onRemove}
          hitSlop={8}
          style={{
            width: iconSize + 2,
            height: iconSize + 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={iconSize} color={colors.content.base.secondary} strokeWidth={2} />
        </Pressable>
      )}
    </View>
  );
};

export const Select = forwardRef<View, SelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder = '선택하세요',
      label,
      description,
      required = false,
      leadingIcon,
      multiple = false,
      renderType = 'text',
      overflow = false,
      error = false,
      errorMessage,
      disabled = false,
      readOnly = false,
      size = 'medium',
      testID,
      accessibilityLabel,
      style,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const sizeStyle = sizeConfig[size];

    // Normalize value to array for consistent handling
    const selectedValues = multiple
      ? Array.isArray(value)
        ? value
        : []
      : value
      ? [value as string]
      : [];

    const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));

    const getBorderColor = () => {
      if (disabled) return colors.border.disabled.default;
      if (error) return colors.border.error.default;
      if (isOpen) return colors.border.brand.default;
      return colors.border.solid.alternative;
    };

    const getBackgroundColor = () => {
      if (disabled) return colors.surface.base.alternative;
      return colors.surface.base.default;
    };

    const handleOpen = () => {
      if (!disabled && !readOnly) {
        setIsOpen(true);
      }
    };

    const handleSelect = (selectedValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(selectedValue)
          ? selectedValues.filter((v) => v !== selectedValue)
          : [...selectedValues, selectedValue];
        onChange(newValues);
      } else {
        onChange(selectedValue);
        setIsOpen(false);
      }
    };

    const handleRemoveChip = (valueToRemove: string) => {
      if (multiple) {
        const newValues = selectedValues.filter((v) => v !== valueToRemove);
        onChange(newValues);
      }
    };

    const renderChevron = () => {
      const chevronColor = disabled
        ? colors.content.disabled.default
        : colors.content.base.secondary;
      return (
        <ChevronDown
          size={sizeStyle.iconSize}
          color={chevronColor}
          strokeWidth={2}
        />
      );
    };

    const renderCheckmark = () => (
      <View
        style={{
          width: 16,
          height: 16,
          borderRadius: radius.primitive.full,
          backgroundColor: colors.surface.brand.default,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Check size={12} color={palette.static.white} strokeWidth={3} />
      </View>
    );

    const renderCheckbox = (checked: boolean) => {
      const checkboxSize = spacing.primitive[4] + 2; // 18px
      return (
        <View
          style={{
            width: checkboxSize,
            height: checkboxSize,
            borderRadius: radius.primitive.xs,
            borderWidth: checked ? 0 : 1.5,
            borderColor: colors.border.solid.alternative,
            backgroundColor: checked
              ? colors.surface.brand.default
              : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {checked && (
            <Check size={10} color={palette.static.white} strokeWidth={2.5} />
          )}
        </View>
      );
    };

    const renderTriggerContent = () => {
      const hasSelection = selectedValues.length > 0;

      // Text render type (comma-separated)
      if (renderType === 'text' || !multiple) {
        const displayText = hasSelection
          ? selectedOptions.map((opt) => opt.label).join(', ')
          : placeholder;

        return (
          <Text
            style={{
              fontSize: sizeStyle.fontSize,
              fontFamily: typography.fontFamily.base,
              color: hasSelection
                ? colors.content.base.default
                : colors.content.base.placeholder,
              flex: 1,
            }}
            numberOfLines={1}
          >
            {displayText}
          </Text>
        );
      }

      // Chip render type
      if (hasSelection) {
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'nowrap',
              gap: spacing.primitive[1],
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            {selectedOptions.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                onRemove={() => handleRemoveChip(opt.value)}
                disabled={disabled || readOnly}
                size={size}
              />
            ))}
          </View>
        );
      }

      return (
        <Text
          style={{
            fontSize: sizeStyle.fontSize,
            fontFamily: typography.fontFamily.base,
            color: colors.content.base.placeholder,
            flex: 1,
          }}
        >
          {placeholder}
        </Text>
      );
    };

    const labelStyle: TextStyle = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.default,
      marginBottom: spacing.component.input.labelGap,
    };

    const descriptionStyle: TextStyle = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
      marginTop: spacing.component.input.helperGap,
    };

    const errorStyle: TextStyle = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: colors.content.error.default,
      marginTop: spacing.component.input.helperGap,
    };

    const triggerStyle: ViewStyle = {
      minHeight: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingHorizontal,
      paddingVertical: renderType === 'chip' && multiple ? spacing.primitive[2] : 0,
      borderRadius: radius.component.input.default,
      borderWidth: 1,
      borderColor: getBorderColor(),
      backgroundColor: getBackgroundColor(),
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.primitive[2],
    };

    return (
      <View ref={ref} style={style}>
        {/* Label with required badge */}
        {label && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.component.input.labelGap }}>
            <Text style={labelStyle}>{label}</Text>
            {required && (
              <Text style={{ ...labelStyle, color: colors.content.error.default, marginBottom: 0, marginLeft: 2 }}>
                *
              </Text>
            )}
          </View>
        )}

        {/* Trigger */}
        <Pressable
          onPress={handleOpen}
          disabled={disabled || readOnly}
          testID={testID}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityRole="button"
          accessibilityState={{ disabled, expanded: isOpen }}
          style={({ pressed }) => [
            triggerStyle,
            pressed && !disabled && !readOnly && {
              backgroundColor: colors.surface.base.alternative,
            },
          ]}
        >
          {leadingIcon && (
            <View style={{ marginLeft: -4 }}>{leadingIcon}</View>
          )}
          {renderTriggerContent()}
          {renderChevron()}
        </Pressable>

        {/* Description */}
        {description && !error && (
          <Text style={descriptionStyle}>{description}</Text>
        )}

        {/* Error Message */}
        {error && errorMessage && <Text style={errorStyle}>{errorMessage}</Text>}

        {/* Dropdown Modal */}
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: colors.overlay.dim,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setIsOpen(false)}
          >
            <Pressable
              style={{
                backgroundColor: colors.surface.base.default,
                borderRadius: radius.component.card.sm,
                minWidth: 240,
                maxWidth: 320,
                maxHeight: 400,
                shadowColor: palette.static.black,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
              onPress={(e) => e.stopPropagation()}
            >
              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => {
                  const isSelected = selectedValues.includes(item.value);
                  const isDisabled = item.disabled;

                  return (
                    <Pressable
                      onPress={() => !isDisabled && handleSelect(item.value)}
                      disabled={isDisabled}
                      style={({ pressed }) => ({
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: spacing.semantic.inset.sm,
                        paddingVertical: spacing.semantic.inset.sm,
                        backgroundColor:
                          pressed && !isDisabled
                            ? colors.surface.base.alternative
                            : isSelected
                            ? colors.surface.brand.secondary
                            : 'transparent',
                      })}
                    >
                      {multiple && (
                        <View style={{ marginRight: spacing.primitive[2] }}>
                          {renderCheckbox(isSelected)}
                        </View>
                      )}
                      <Text
                        style={{
                          flex: 1,
                          fontSize: typography.fontSize.sm,
                          fontFamily: typography.fontFamily.base,
                          color: isDisabled
                            ? colors.content.disabled.default
                            : isSelected
                            ? colors.content.brand.default
                            : colors.content.base.default,
                          fontWeight: isSelected
                            ? typography.fontWeight.semibold
                            : typography.fontWeight.regular,
                        }}
                        numberOfLines={1}
                      >
                        {item.label}
                      </Text>
                      {!multiple && isSelected && renderCheckmark()}
                    </Pressable>
                  );
                }}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: colors.border.solid.alternative,
                    }}
                  />
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

Select.displayName = 'Select';
