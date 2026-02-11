/**
 * TextField Component (React Native)
 *
 * @description 사용자 입력을 받는 텍스트 입력 필드입니다.
 * @see docs/components/TextField.md - AI용 상세 가이드
 *
 * @example
 * <TextField
 *   value={text}
 *   onChangeText={setText}
 *   label="이름"
 *   required
 *   placeholder="이름을 입력하세요"
 *   size="medium"
 * />
 */

import React, { forwardRef, useState, type ReactNode } from 'react';
import {
  View,
  TextInput,
  Text,
  Pressable,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { colors, typography, spacing, radius } from '../tokens';

export type TextFieldSize = 'small' | 'medium' | 'large';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  /** 입력 값 */
  value: string;
  /** 변경 핸들러 */
  onChangeText: (text: string) => void;
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
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 비밀번호 입력 */
  secureTextEntry?: boolean;
  /** 키보드 타입 */
  keyboardType?: TextInputProps['keyboardType'];
  /** 커스텀 스타일 */
  style?: ViewStyle;
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

export const TextField = forwardRef<TextInput, TextFieldProps>(
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
      testID,
      accessibilityLabel,
      secureTextEntry,
      keyboardType,
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

    const getBorderColor = () => {
      if (disabled || readOnly) return colors.border.disabled.default;
      if (error) return colors.border.error.default;
      if (isFocused) return colors.border.brand.default;
      return colors.border.solid.alternative;
    };

    const getBackgroundColor = () => {
      if (disabled) return colors.surface.base.alternative;
      if (readOnly) return colors.surface.base.alternative;
      return colors.surface.base.default;
    };

    const inputContainerStyle: ViewStyle = {
      height: sizeStyle.height,
      borderRadius: radius.component.input.default,
      borderWidth: 1,
      borderColor: getBorderColor(),
      backgroundColor: getBackgroundColor(),
      flexDirection: 'row',
      alignItems: 'center',
    };

    const textInputStyle = {
      flex: 1,
      fontSize: sizeStyle.fontSize,
      fontFamily: typography.fontFamily.base,
      color: disabled ? colors.content.disabled.default : colors.content.base.default,
      padding: 0,
    };

    const labelStyle = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.default,
      marginBottom: spacing.component.input.labelGap,
    };

    const requiredBadgeStyle = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.error.default,
      marginLeft: spacing.primitive[1],
    };

    const descriptionStyle = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
      marginTop: spacing.component.input.helperGap,
    };

    const errorStyle = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: colors.content.error.default,
      marginTop: spacing.component.input.helperGap,
    };

    const affixStyle = {
      fontSize: sizeStyle.fontSize,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
    };

    const countStyle = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
      marginTop: spacing.component.input.helperGap,
      textAlign: 'right' as const,
    };

    const displayHelperText = error ? errorMessage : resolvedDescription;

    return (
      <View style={style}>
        {/* Label + Required Badge */}
        {label && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={labelStyle}>{label}</Text>
            {required && <Text style={requiredBadgeStyle}>*</Text>}
          </View>
        )}

        {/* Input Container */}
        <View style={inputContainerStyle}>
          {/* Input Area (flex) */}
          <Pressable
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.primitive[2],
              paddingLeft: sizeStyle.paddingHorizontal,
              paddingRight: (resolvedTrailingContent || trailingButton) ? 0 : sizeStyle.paddingHorizontal,
              height: '100%',
            }}
            onPress={() => {
              if (!disabled && !readOnly && ref && 'current' in ref && ref.current) {
                ref.current.focus();
              }
            }}
          >
            {/* Leading Icon */}
            {resolvedLeadingIcon && <View style={{ flexShrink: 0 }}>{resolvedLeadingIcon}</View>}

            {/* Prefix */}
            {prefix && (
              <View style={{ flexShrink: 0 }}>
                {typeof prefix === 'string'
                  ? <Text style={affixStyle}>{prefix}</Text>
                  : prefix}
              </View>
            )}

            {/* Text Input */}
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={colors.content.base.placeholder}
              editable={!disabled && !readOnly}
              maxLength={maxLength}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              testID={testID}
              accessibilityLabel={accessibilityLabel || label}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={textInputStyle}
              {...props}
            />

            {/* Suffix */}
            {suffix && (
              <View style={{ flexShrink: 0 }}>
                {typeof suffix === 'string'
                  ? <Text style={affixStyle}>{suffix}</Text>
                  : suffix}
              </View>
            )}
          </Pressable>

          {/* Trailing Content (independent fixed area) */}
          {resolvedTrailingContent && (
            <View style={{
              flexShrink: 0,
              paddingLeft: spacing.primitive[2],
              paddingRight: trailingButton ? spacing.primitive[3] : sizeStyle.paddingHorizontal,
              justifyContent: 'center',
            }}>
              {resolvedTrailingContent}
            </View>
          )}

          {/* Trailing Button (fixed position, separate area) */}
          {trailingButton && (
            <>
              <View style={{
                width: 1,
                alignSelf: 'stretch',
                backgroundColor: colors.border.solid.alternative,
              }} />
              <Pressable
                style={({ pressed }) => ({
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: spacing.primitive[3],
                  borderTopRightRadius: radius.component.input.default - 1,
                  borderBottomRightRadius: radius.component.input.default - 1,
                  backgroundColor: pressed
                    ? colors.surface.base.alternative
                    : 'transparent',
                })}
                onPress={() => {}}
              >
                {trailingButton}
              </Pressable>
            </>
          )}
        </View>

        {/* Description / Error Message */}
        {displayHelperText && (
          <Text style={error ? errorStyle : descriptionStyle}>{displayHelperText}</Text>
        )}

        {/* Character Count */}
        {showCount && maxLength && (
          <Text style={countStyle}>
            {value.length} / {maxLength}
          </Text>
        )}
      </View>
    );
  }
);

TextField.displayName = 'TextField';
