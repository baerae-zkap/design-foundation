/**
 * TextArea Component (Web)
 *
 * @description 여러 줄의 텍스트 입력을 받는 텍스트 영역입니다.
 * @see docs/components/TextArea.md - AI용 상세 가이드
 *
 * @example
 * <TextArea
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 *   label="설명"
 *   placeholder="설명을 입력하세요"
 *   resize="limited"
 *   rows={5}
 * />
 */

import { forwardRef, useState, type TextareaHTMLAttributes, type ReactNode, type ChangeEvent } from 'react';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { transitions } from '../../utils/styles';

export type TextAreaResize = 'normal' | 'limited' | 'fixed';

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  /** 입력 값 */
  value: string;
  /** 변경 핸들러 (native event) */
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  /** 변경 핸들러 (string convenience) */
  onValueChange?: (value: string) => void;
  /** 플레이스홀더 */
  placeholder?: string;

  // Label & Description
  /** 라벨 */
  label?: string;
  /** 필수 필드 표시 (빨간 * 아이콘) */
  required?: boolean;
  /** 도움말 텍스트 (description) */
  description?: string;
  /** 도움말 텍스트 (구버전 호환) */
  helperText?: string;

  // States
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 읽기 전용 상태 */
  readOnly?: boolean;

  // Resize behavior
  /** 높이 조절 방식: 'normal' (무제한 자동 확장), 'limited' (최대 높이 제한), 'fixed' (고정) */
  resize?: TextAreaResize;
  /** 표시할 줄 수 (기본 5) */
  rows?: number;

  // Character count
  /** 최대 길이 */
  maxLength?: number;
  /** 글자 수 표시 */
  showCount?: boolean;

  // Bottom bar content
  /** 하단 바 왼쪽 영역 콘텐츠 */
  bottomLeading?: ReactNode;
  /** 하단 바 오른쪽 영역 콘텐츠 */
  bottomTrailing?: ReactNode;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
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
      resize = 'limited',
      rows = 5,
      maxLength,
      showCount = false,
      bottomLeading,
      bottomTrailing,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Backward compatibility: helperText -> description
    const effectiveDescription = description || helperText;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      onValueChange?.(e.target.value);
    };

    const getBorderColor = () => {
      if (disabled) return colors.border.disabled.default;
      if (error) return colors.border.error.default;
      if (isFocused) return colors.border.brand.default;
      return colors.border.base.default;
    };

    const getBackgroundColor = () => {
      if (disabled || readOnly) return colors.surface.base.alternative;
      return colors.surface.base.default;
    };

    // Calculate heights based on resize mode
    const lineHeight = spacing.primitive[5]; // 20px line height
    const paddingVertical = spacing.component.input.paddingY; // 12px
    const baseMinHeight = rows * lineHeight + paddingVertical * 2;

    let minHeight: number | undefined;
    let maxHeight: number | undefined;
    let height: number | undefined;
    let cssResize: 'none' | 'vertical' | 'both' = 'none';

    switch (resize) {
      case 'normal':
        // Unlimited auto-grow
        minHeight = baseMinHeight;
        maxHeight = undefined;
        cssResize = 'vertical';
        break;
      case 'limited':
        // Auto-grow with max height
        minHeight = baseMinHeight;
        maxHeight = spacing.primitive[5] * 3 + paddingVertical * 2; // ~3 lines (84px)
        cssResize = 'none';
        break;
      case 'fixed':
        // Fixed height, content scrolls
        height = baseMinHeight;
        cssResize = 'none';
        break;
    }

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...style,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.default,
      marginBottom: spacing.component.input.labelGap,
    };

    const requiredStyle: React.CSSProperties = {
      color: colors.content.error.default,
      marginLeft: spacing.primitive[1],
    };

    const textAreaContainerStyle: React.CSSProperties = {
      minHeight: height || minHeight,
      height,
      maxHeight,
      padding: `${spacing.component.input.paddingY}px ${spacing.component.input.paddingX}px`,
      borderRadius: radius.component.input.default,
      border: `1px solid ${getBorderColor()}`,
      backgroundColor: getBackgroundColor(),
      transition: transitions.border,
    };

    const textAreaStyle: React.CSSProperties = {
      fontSize: typography.fontSize.sm,
      fontFamily: typography.fontFamily.base,
      color: disabled ? colors.content.disabled.default : colors.content.base.default,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: 0,
      width: '100%',
      minHeight: '100%',
      resize: cssResize,
      opacity: disabled ? 0.38 : 1,
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: error ? colors.content.error.default : colors.content.base.secondary,
      marginTop: spacing.component.input.helperGap,
    };

    const bottomBarStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.component.input.helperGap,
    };

    const countStyle: React.CSSProperties = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
    };

    const displayDescription = error ? errorMessage : effectiveDescription;

    // Character counter content
    const characterCounter = showCount && maxLength ? (
      <span style={countStyle}>
        {value.length} / {maxLength}
      </span>
    ) : null;

    // Determine bottom bar content
    const showBottomBar = bottomLeading || bottomTrailing || (characterCounter && !displayDescription);
    const finalBottomLeading = bottomLeading;
    const finalBottomTrailing = bottomTrailing || (characterCounter && !displayDescription ? characterCounter : null);

    return (
      <div style={containerStyle}>
        {/* Label with Required Badge */}
        {label && (
          <label style={labelStyle}>
            {label}
            {required && <span style={requiredStyle}> *</span>}
          </label>
        )}

        {/* TextArea Container */}
        <div style={textAreaContainerStyle}>
          <textarea
            ref={ref}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={textAreaStyle}
            aria-label={label}
            aria-invalid={error}
            aria-required={required}
            data-testid={props['data-testid']}
            {...props}
          />
        </div>

        {/* Description / Error Message */}
        {displayDescription && <div style={descriptionStyle}>{displayDescription}</div>}

        {/* Bottom Bar */}
        {showBottomBar && (
          <div style={bottomBarStyle}>
            <div>{finalBottomLeading}</div>
            <div>{finalBottomTrailing}</div>
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
