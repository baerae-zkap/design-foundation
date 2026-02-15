/**
 * TextField Component (Web)
 *
 * @description 사용자 입력을 받는 텍스트 입력 필드입니다.
 * @see docs/components/TextField.md - AI용 상세 가이드
 *
 * @example
 * <TextField
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 *   label="이름"
 *   required
 *   placeholder="이름을 입력하세요"
 *   size="medium"
 * />
 */

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode, type ChangeEvent } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { transitions } from '../../utils/styles';

export type TextFieldSize = 'small' | 'medium' | 'large';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** 입력 값 */
  value: string;
  /** 변경 핸들러 (native event) */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  /** 변경 핸들러 (string convenience) */
  onValueChange?: (value: string) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 라벨 */
  label?: string;
  /** 필수 입력 뱃지 (*) */
  required?: boolean;
  /** 설명 텍스트 (필드 아래 표시) */
  description?: string;
  /** 도움말 텍스트 (description의 하위 호환 별칭) */
  helperText?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 읽기 전용 상태 */
  readOnly?: boolean;
  /** 크기 */
  size?: TextFieldSize;
  /** 왼쪽 아이콘 (leadingIcon의 하위 호환 별칭) */
  leftIcon?: ReactNode;
  /** 앞쪽 아이콘 */
  leadingIcon?: ReactNode;
  /** 오른쪽 아이콘 (trailingContent의 하위 호환 별칭) */
  rightIcon?: ReactNode;
  /** 뒤쪽 컨텐츠 (뱃지, 텍스트, 아이콘, 타이머) */
  trailingContent?: ReactNode;
  /** 뒤쪽 버튼 (필드 내부 우측 버튼) */
  trailingButton?: ReactNode;
  /** 접두사 (텍스트 또는 아이콘) */
  prefix?: ReactNode;
  /** 접미사 (텍스트 또는 아이콘) */
  suffix?: ReactNode;
  /** 최대 길이 */
  maxLength?: number;
  /** 글자 수 표시 */
  showCount?: boolean;
}

const sizeConfig: Record<
  TextFieldSize,
  { height: number; fontSize: number; paddingHorizontal: number; iconSize: number }
> = {
  small: {
    height: 36,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.input.paddingX,
    iconSize: 16,
  },
  medium: {
    height: 44,
    fontSize: typography.fontSize.sm,
    paddingHorizontal: spacing.component.input.paddingX,
    iconSize: 18,
  },
  large: {
    height: 52,
    fontSize: typography.fontSize.md,
    paddingHorizontal: spacing.component.input.paddingX,
    iconSize: 20,
  },
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      value,
      onChange,
      onValueChange,
      placeholder,
      label,
      required = false,
      description,
      helperText,
      error = false,
      errorMessage,
      disabled = false,
      readOnly = false,
      size = 'medium',
      leftIcon,
      leadingIcon,
      rightIcon,
      trailingContent,
      trailingButton,
      prefix,
      suffix,
      maxLength,
      showCount = false,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const sizeStyle = sizeConfig[size];

    // Backward compatibility: map old props to new props
    const resolvedLeadingIcon = leadingIcon || leftIcon;
    const resolvedTrailingContent = trailingContent || rightIcon;
    const resolvedDescription = description || helperText;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const getBorderColor = () => {
      if (disabled || readOnly) return cssVarColors.border.disabled.default;
      if (error) return cssVarColors.border.error.default;
      if (isFocused) return cssVarColors.border.brand.default;
      return cssVarColors.border.solid.alternative;
    };

    const getBackgroundColor = () => {
      if (disabled) return cssVarColors.surface.base.alternative;
      if (readOnly) return cssVarColors.surface.base.alternative;
      return cssVarColors.surface.base.default;
    };

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.component.input.labelGap,
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: cssVarColors.content.base.default,
      display: 'flex',
      alignItems: 'center',
      gap: spacing.primitive[1],
    };

    const requiredBadgeStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: cssVarColors.content.error.default,
    };

    const inputContainerStyle: React.CSSProperties = {
      height: sizeStyle.height,
      borderRadius: radius.component.input.default,
      border: `1px solid ${getBorderColor()}`,
      backgroundColor: getBackgroundColor(),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      transition: transitions.border,
      overflow: 'hidden',
    };

    const inputAreaStyle: React.CSSProperties = {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.primitive[2],
      paddingLeft: sizeStyle.paddingHorizontal,
      paddingRight: (resolvedTrailingContent || trailingButton) ? 0 : sizeStyle.paddingHorizontal,
      height: '100%',
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      fontSize: sizeStyle.fontSize,
      fontFamily: typography.fontFamily.base,
      color: disabled ? cssVarColors.content.disabled.default : cssVarColors.content.base.default,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: 0,
      minWidth: 0,
    };

    const affixStyle: React.CSSProperties = {
      fontSize: sizeStyle.fontSize,
      fontFamily: typography.fontFamily.base,
      color: cssVarColors.content.base.secondary,
      flexShrink: 0,
    };

    const trailingContentStyle: React.CSSProperties = {
      flexShrink: 0,
      paddingLeft: spacing.primitive[2],
      paddingRight: trailingButton ? spacing.primitive[3] : sizeStyle.paddingHorizontal,
      display: 'flex',
      alignItems: 'center',
    };

    const trailingButtonStyle: React.CSSProperties = {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: spacing.primitive[3],
      paddingRight: spacing.primitive[3],
      borderLeft: `1px solid ${cssVarColors.border.solid.alternative}`,
      cursor: 'pointer',
      transition: transitions.background,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: error ? cssVarColors.content.error.default : cssVarColors.content.base.secondary,
      marginTop: spacing.component.input.helperGap,
    };

    const countStyle: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: cssVarColors.content.base.secondary,
      marginTop: spacing.component.input.helperGap,
      textAlign: 'right',
    };

    const displayHelperText = error ? errorMessage : resolvedDescription;

    return (
      <div style={containerStyle}>
        {/* Label + Required Badge */}
        {label && (
          <label style={labelStyle}>
            {label}
            {required && <span style={requiredBadgeStyle}>*</span>}
          </label>
        )}

        {/* Input Container */}
        <div style={inputContainerStyle}>
          {/* Input Area (flex) */}
          <div style={inputAreaStyle}>
            {/* Leading Icon */}
            {resolvedLeadingIcon && <div style={{ flexShrink: 0 }}>{resolvedLeadingIcon}</div>}

            {/* Prefix */}
            {prefix && (
              <div style={{ flexShrink: 0 }}>
                {typeof prefix === 'string' ? <span style={affixStyle}>{prefix}</span> : prefix}
              </div>
            )}

            {/* Text Input */}
            <input
              ref={ref}
              type="text"
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              maxLength={maxLength}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={inputStyle}
              aria-label={label}
              aria-invalid={error}
              aria-required={required}
              data-testid={props['data-testid']}
              {...props}
            />

            {/* Suffix */}
            {suffix && (
              <div style={{ flexShrink: 0 }}>
                {typeof suffix === 'string' ? <span style={affixStyle}>{suffix}</span> : suffix}
              </div>
            )}
          </div>

          {/* Trailing Content (independent fixed area) */}
          {resolvedTrailingContent && (
            <div style={trailingContentStyle}>{resolvedTrailingContent}</div>
          )}

          {/* Trailing Button (fixed position, separate area) */}
          {trailingButton && (
            <button
              type="button"
              style={trailingButtonStyle}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = cssVarColors.surface.base.alternative;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              {trailingButton}
            </button>
          )}
        </div>

        {/* Description / Error Message */}
        {displayHelperText && <div style={descriptionStyle}>{displayHelperText}</div>}

        {/* Character Count */}
        {showCount && maxLength && (
          <div style={countStyle}>
            {value.length} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
