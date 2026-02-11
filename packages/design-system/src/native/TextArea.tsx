/**
 * TextArea Component (React Native)
 *
 * @description 여러 줄의 텍스트 입력을 받는 텍스트 영역입니다.
 * @see docs/components/TextArea.md - AI용 상세 가이드
 *
 * @example
 * <TextArea
 *   value={text}
 *   onChangeText={setText}
 *   label="설명"
 *   placeholder="설명을 입력하세요"
 *   resize="limited"
 * />
 */

import React, { forwardRef, useState, type ReactNode } from 'react';
import {
  View,
  TextInput,
  Text,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type TextAreaResize = 'normal' | 'limited' | 'fixed';

export interface TextAreaProps extends Omit<TextInputProps, 'style' | 'multiline'> {
  /** 입력 값 */
  value: string;
  /** 변경 핸들러 */
  onChangeText: (text: string) => void;
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
  /** 표시할 줄 수 (구버전 호환) */
  numberOfLines?: number;
  /** 높이 자동 증가 (구버전 호환, resize='normal'로 매핑) */
  autoGrow?: boolean;

  // Height control
  /** 고정 높이 (px) */
  height?: number;
  /** 최소 높이 (px) */
  minHeight?: number;
  /** 최대 높이 (px) */
  maxHeight?: number;

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

  // Other
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

export const TextArea = forwardRef<TextInput, TextAreaProps>(
  (
    {
      value,
      onChangeText,
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
      numberOfLines = 5,
      autoGrow = false,
      height,
      minHeight,
      maxHeight,
      maxLength,
      showCount = false,
      bottomLeading,
      bottomTrailing,
      testID,
      accessibilityLabel,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Backward compatibility: autoGrow -> resize='normal'
    const effectiveResize = autoGrow ? 'normal' : resize;

    // Backward compatibility: helperText -> description
    const effectiveDescription = description || helperText;

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
    const baseMinHeight = numberOfLines * lineHeight + paddingVertical * 2;

    let calculatedMinHeight: number | undefined;
    let calculatedMaxHeight: number | undefined;
    let calculatedHeight: number | undefined;

    if (height) {
      // Fixed height specified
      calculatedHeight = height;
    } else {
      switch (effectiveResize) {
        case 'normal':
          // Unlimited auto-grow
          calculatedMinHeight = minHeight || baseMinHeight;
          calculatedMaxHeight = undefined;
          break;
        case 'limited':
          // Auto-grow with max height
          calculatedMinHeight = minHeight || baseMinHeight;
          calculatedMaxHeight = maxHeight || (spacing.primitive[5] * 3 + paddingVertical * 2); // ~3 lines (20*3 + 12*2 = 84px)
          break;
        case 'fixed':
          // Fixed height, content scrolls
          calculatedHeight = minHeight || baseMinHeight;
          break;
      }
    }

    const inputContainerStyle: ViewStyle = {
      minHeight: calculatedHeight || calculatedMinHeight,
      height: calculatedHeight,
      maxHeight: calculatedMaxHeight,
      paddingHorizontal: spacing.component.input.paddingX, // 16px
      paddingVertical: spacing.component.input.paddingY, // 12px
      borderRadius: radius.component.input.default, // 8px
      borderWidth: 1,
      borderColor: getBorderColor(),
      backgroundColor: getBackgroundColor(),
    };

    const textInputStyle = {
      fontSize: typography.fontSize.sm, // 14px
      fontFamily: typography.fontFamily.base,
      color: disabled
        ? colors.content.disabled.default
        : readOnly
        ? colors.content.base.default
        : colors.content.base.default,
      padding: 0,
      textAlignVertical: 'top' as const,
      flex: 1,
      opacity: disabled ? 0.38 : 1,
    };

    const labelStyle = {
      fontSize: typography.fontSize.sm, // 14px
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.default,
      marginBottom: spacing.component.input.labelGap, // 8px
    };

    const requiredStyle = {
      color: colors.content.error.default,
      marginLeft: spacing.primitive[1],
    };

    const descriptionStyle = {
      fontSize: typography.fontSize.xs, // 12px
      fontFamily: typography.fontFamily.base,
      color: error ? colors.content.error.default : colors.content.base.secondary,
      marginTop: spacing.component.input.helperGap, // 4px
    };

    const bottomBarStyle: ViewStyle = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: spacing.component.input.helperGap, // 4px
    };

    const countStyle = {
      fontSize: typography.fontSize.xs, // 12px
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
    };

    const displayDescription = error ? errorMessage : effectiveDescription;

    // Character counter content
    const characterCounter = showCount && maxLength ? (
      <Text style={countStyle}>
        {value.length} / {maxLength}
      </Text>
    ) : null;

    // Determine bottom bar content
    const showBottomBar = bottomLeading || bottomTrailing || (characterCounter && !displayDescription);
    const finalBottomLeading = bottomLeading;
    const finalBottomTrailing = bottomTrailing || (characterCounter && !displayDescription ? characterCounter : null);

    return (
      <View style={style}>
        {/* Label with Required Badge */}
        {label && (
          <Text style={labelStyle}>
            {label}
            {required && <Text style={requiredStyle}> *</Text>}
          </Text>
        )}

        {/* Input Container */}
        <View style={inputContainerStyle}>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.content.base.placeholder}
            editable={!disabled && !readOnly}
            maxLength={maxLength}
            multiline
            numberOfLines={numberOfLines}
            testID={testID}
            accessibilityLabel={accessibilityLabel || label}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={textInputStyle}
            scrollEnabled={effectiveResize === 'fixed'}
            {...props}
          />
        </View>

        {/* Description / Error Message */}
        {displayDescription && (
          <Text style={descriptionStyle}>{displayDescription}</Text>
        )}

        {/* Bottom Bar */}
        {showBottomBar && (
          <View style={bottomBarStyle}>
            <View>{finalBottomLeading}</View>
            <View>{finalBottomTrailing}</View>
          </View>
        )}
      </View>
    );
  }
);

TextArea.displayName = 'TextArea';
