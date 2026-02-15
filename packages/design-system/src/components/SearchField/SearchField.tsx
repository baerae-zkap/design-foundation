/**
 * SearchField Component (Web)
 *
 * @description 검색 입력을 위한 필 형태(pill-shaped) 입력 필드입니다.
 * @see docs/components/SearchField.md - AI용 상세 가이드
 *
 * @example
 * <SearchField
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   onSearch={handleSearch}
 *   placeholder="검색어를 입력하세요"
 *   size="medium"
 * />
 */

import { forwardRef, useState, type InputHTMLAttributes, type ChangeEvent, type KeyboardEvent } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type SearchFieldSize = 'small' | 'medium';

export interface SearchFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  /** 검색 값 */
  value: string;
  /** Native change handler */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** String value change handler (convenience) */
  onValueChange?: (text: string) => void;
  /** 검색 제출 핸들러 (엔터키 또는 검색 아이콘 클릭 시) */
  onSearch?: (text: string) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 클리어 버튼 표시 */
  showClearButton?: boolean;
  /** 클리어 핸들러 */
  onClear?: () => void;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 크기 */
  size?: SearchFieldSize;
  /** 자동 포커스 */
  autoFocus?: boolean;
  /** 취소 버튼 표시 (focused일 때) */
  showCancelButton?: boolean;
  /** 취소 버튼 클릭 핸들러 */
  onCancel?: () => void;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
}

const sizeConfig: Record<SearchFieldSize, { height: number; fontSize: number; lineHeight: number; iconSize: number; paddingHorizontal: number }> = {
  small: {
    height: 36,
    fontSize: typography.semantic.body.sm.fontSize, // 14
    lineHeight: typography.semantic.body.sm.lineHeight, // 20
    iconSize: 16,
    paddingHorizontal: spacing.semantic.inset.xs, // 12
  },
  medium: {
    height: 44,
    fontSize: typography.semantic.body.md.fontSize, // 16
    lineHeight: typography.semantic.body.md.lineHeight, // 24
    iconSize: 20,
    paddingHorizontal: spacing.semantic.inset.xs, // 12
  },
};

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      value,
      onChange,
      onValueChange,
      onSearch,
      placeholder = '검색',
      showClearButton = true,
      onClear,
      disabled = false,
      size = 'medium',
      autoFocus = false,
      showCancelButton = false,
      onCancel,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const sizeStyle = sizeConfig[size];

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const handleClear = () => {
      const syntheticEvent = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
      onValueChange?.('');
      onClear?.();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(value);
      }
    };

    const handleCancel = () => {
      handleClear();
      onCancel?.();
    };

    const getBorderColor = () => {
      if (disabled) return cssVarColors.border.disabled.default;
      if (isFocused) return cssVarColors.border.brand.default;
      return 'transparent';
    };

    const getBackgroundColor = () => {
      if (disabled) return cssVarColors.surface.disabled.default;
      return cssVarColors.surface.base.alternative;
    };

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.primitive[3], // 12
      ...style,
    };

    const searchInputContainerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.primitive[2], // 8
      height: sizeStyle.height,
      paddingLeft: sizeStyle.paddingHorizontal,
      paddingRight: sizeStyle.paddingHorizontal,
      borderRadius: radius.component.input.search, // 9999 (pill shape)
      border: `1px solid ${getBorderColor()}`,
      backgroundColor: getBackgroundColor(),
      flex: 1,
      transition: 'border-color 0.2s ease',
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      fontSize: sizeStyle.fontSize,
      lineHeight: `${sizeStyle.lineHeight}px`,
      fontFamily: typography.fontFamily.base,
      color: disabled ? cssVarColors.content.disabled.default : cssVarColors.content.base.default,
      padding: 0,
    };

    const iconButtonStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      border: 'none',
      background: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: cssVarColors.content.base.secondary,
    };

    return (
      <div style={containerStyle}>
        <div style={searchInputContainerStyle}>
          {/* Search Icon */}
          <svg
            width={sizeStyle.iconSize}
            height={sizeStyle.iconSize}
            viewBox="0 0 24 24"
            fill="none"
            stroke={disabled ? cssVarColors.content.disabled.default : cssVarColors.content.base.secondary}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          {/* Input */}
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            autoFocus={autoFocus}
            style={inputStyle}
            {...props}
          />

          {/* Clear Button */}
          {showClearButton && value.length > 0 && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              style={iconButtonStyle}
              aria-label="검색어 지우기"
            >
              <svg
                width={sizeStyle.iconSize}
                height={sizeStyle.iconSize}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m15 9-6 6" />
                <path d="m9 9 6 6" />
              </svg>
            </button>
          )}
        </div>

        {/* Cancel Button */}
        {showCancelButton && (
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: `${spacing.primitive[2]}px ${spacing.primitive[3]}px`,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: typography.fontSize.md,
              fontFamily: typography.fontFamily.base,
              color: cssVarColors.content.brand.default,
              whiteSpace: 'nowrap',
            }}
            aria-label="취소"
          >
            취소
          </button>
        )}
      </div>
    );
  }
);

SearchField.displayName = 'SearchField';
