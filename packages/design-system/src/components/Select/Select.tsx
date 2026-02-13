/**
 * Select Component (Web)
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
 */

import { forwardRef, useState, useEffect, useRef, type ReactNode } from 'react';
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
  style?: React.CSSProperties;
}

const sizeConfig: Record<SelectSize, { height: number; fontSize: number; paddingHorizontal: number; iconSize: number }> = {
  small: {
    height: 36,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.input.paddingX,
    iconSize: 14,
  },
  medium: {
    height: 44,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.input.paddingX,
    iconSize: 16,
  },
  large: {
    height: 52,
    fontSize: typography.fontSize.md,
    paddingHorizontal: spacing.component.input.paddingX,
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
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: chipHeight,
        paddingLeft: chipPaddingX,
        paddingRight: chipPaddingX,
        borderRadius: radius.component.chip.default,
        backgroundColor: colors.surface.base.alternative,
        gap: spacing.primitive[1],
      }}
    >
      <span
        style={{
          fontSize: chipFontSize,
          fontFamily: typography.fontFamily.base,
          color: colors.content.base.default,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      {!disabled && (
        <button
          type="button"
          onClick={onRemove}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: iconSize + 2,
            height: iconSize + 2,
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: colors.content.base.secondary,
          }}
          aria-label={`Remove ${label}`}
        >
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export const Select = forwardRef<HTMLDivElement, SelectProps>(
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
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

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
        setIsOpen(!isOpen);
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

    const renderTriggerContent = () => {
      const hasSelection = selectedValues.length > 0;

      // Text render type (comma-separated)
      if (renderType === 'text' || !multiple) {
        const displayText = hasSelection
          ? selectedOptions.map((opt) => opt.label).join(', ')
          : placeholder;

        return (
          <span
            style={{
              fontSize: sizeStyle.fontSize,
              fontFamily: typography.fontFamily.base,
              color: hasSelection
                ? colors.content.base.default
                : colors.content.base.placeholder,
              flex: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {displayText}
          </span>
        );
      }

      // Chip render type
      if (hasSelection) {
        return (
          <div
            style={{
              flex: 1,
              display: 'flex',
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
          </div>
        );
      }

      return (
        <span
          style={{
            fontSize: sizeStyle.fontSize,
            fontFamily: typography.fontFamily.base,
            color: colors.content.base.placeholder,
            flex: 1,
          }}
        >
          {placeholder}
        </span>
      );
    };

    const triggerStyle: React.CSSProperties = {
      minHeight: sizeStyle.height,
      paddingLeft: sizeStyle.paddingHorizontal,
      paddingRight: sizeStyle.paddingHorizontal,
      paddingTop: renderType === 'chip' && multiple ? spacing.primitive[2] : 0,
      paddingBottom: renderType === 'chip' && multiple ? spacing.primitive[2] : 0,
      borderRadius: radius.component.input.default,
      border: `1px solid ${getBorderColor()}`,
      backgroundColor: getBackgroundColor(),
      display: 'flex',
      alignItems: 'center',
      gap: spacing.primitive[2],
      cursor: disabled || readOnly ? 'not-allowed' : 'pointer',
      transition: 'border-color 0.2s ease',
    };

    return (
      <div ref={ref} style={{ position: 'relative', ...style }}>
        {/* Label with required badge */}
        {label && (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: spacing.component.input.labelGap }}>
            <span
              style={{
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
                fontFamily: typography.fontFamily.base,
                color: colors.content.base.default,
              }}
            >
              {label}
            </span>
            {required && (
              <span
                style={{
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.medium,
                  fontFamily: typography.fontFamily.base,
                  color: colors.content.error.default,
                  marginLeft: 2,
                }}
              >
                *
              </span>
            )}
          </div>
        )}

        {/* Trigger */}
        <div
          ref={dropdownRef}
          onClick={handleOpen}
          data-testid={testID}
          role="button"
          aria-label={accessibilityLabel || label}
          aria-expanded={isOpen}
          aria-disabled={disabled}
          style={triggerStyle}
        >
          {leadingIcon && <div style={{ marginLeft: -4 }}>{leadingIcon}</div>}
          {renderTriggerContent()}
          <svg
            width={sizeStyle.iconSize}
            height={sizeStyle.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={disabled ? colors.content.disabled.default : colors.content.base.secondary}
            strokeWidth={2}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* Description */}
        {description && !error && (
          <div
            style={{
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.base,
              color: colors.content.base.secondary,
              marginTop: spacing.component.input.helperGap,
            }}
          >
            {description}
          </div>
        )}

        {/* Error Message */}
        {error && errorMessage && (
          <div
            style={{
              fontSize: typography.fontSize.xs,
              fontFamily: typography.fontFamily.base,
              color: colors.content.error.default,
              marginTop: spacing.component.input.helperGap,
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Dropdown Panel */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: spacing.primitive[1],
              backgroundColor: colors.surface.base.default,
              borderRadius: radius.component.card.sm,
              boxShadow: `0 4px 12px ${colors.overlay.dim}`,
              maxHeight: 400,
              overflowY: 'auto',
              zIndex: 1000,
            }}
          >
            {options.map((item, index) => {
              const isSelected = selectedValues.includes(item.value);
              const isDisabled = item.disabled;

              return (
                <div key={item.value}>
                  <div
                    onClick={() => !isDisabled && handleSelect(item.value)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingLeft: spacing.semantic.inset.sm,
                      paddingRight: spacing.semantic.inset.sm,
                      paddingTop: spacing.semantic.inset.sm,
                      paddingBottom: spacing.semantic.inset.sm,
                      backgroundColor: isSelected ? colors.surface.brand.secondary : 'transparent',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isDisabled && !isSelected) {
                        e.currentTarget.style.backgroundColor = colors.surface.base.alternative;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDisabled && !isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {multiple && (
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: radius.primitive.xs,
                          border: isSelected ? 'none' : `1.5px solid ${colors.border.solid.alternative}`,
                          backgroundColor: isSelected ? colors.surface.brand.default : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: spacing.primitive[2],
                        }}
                      >
                        {isSelected && (
                          <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke={palette.static.white} strokeWidth={2.5}>
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                    )}
                    <span
                      style={{
                        flex: 1,
                        fontSize: typography.fontSize.sm,
                        fontFamily: typography.fontFamily.base,
                        color: isDisabled
                          ? colors.content.disabled.default
                          : isSelected
                          ? colors.content.brand.default
                          : colors.content.base.default,
                        fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.regular,
                      }}
                    >
                      {item.label}
                    </span>
                    {!multiple && isSelected && (
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: radius.primitive.full,
                          backgroundColor: colors.surface.brand.default,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={palette.static.white} strokeWidth={3}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {index < options.length - 1 && (
                    <div
                      style={{
                        height: 1,
                        backgroundColor: colors.border.solid.alternative,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
