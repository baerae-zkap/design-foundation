/**
 * SearchField Component (React Native)
 *
 * @description 검색 입력을 위한 필 형태(pill-shaped) 입력 필드입니다.
 * @see docs/components/SearchField.md - AI용 상세 가이드
 *
 * @example
 * <SearchField
 *   value={searchQuery}
 *   onChangeText={setSearchQuery}
 *   onSearch={handleSearch}
 *   placeholder="검색어를 입력하세요"
 *   size="medium"
 * />
 */

import React, { forwardRef, useState, useRef, useEffect, type ReactNode } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Animated,
  Text,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { Search, CircleX } from 'lucide-react-native';
import { TextButton } from '../TextButton/TextButton';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type SearchFieldSize = 'small' | 'medium';

export interface SearchFieldProps extends Omit<TextInputProps, 'style'> {
  /** 검색 값 */
  value: string;
  /** 변경 핸들러 */
  onChangeText: (text: string) => void;
  /** 검색 제출 핸들러 (엔터키 또는 검색 아이콘 클릭 시) */
  onSearch?: (text: string) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 클리어 버튼 표시 */
  showClearButton?: boolean;
  /** 클리어 핸들러 */
  onClear?: () => void;
  /** 삭제 버튼 클릭 핸들러 (TDS 호환, onClear와 동일) */
  onDeleteClick?: () => void;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 크기 */
  size?: SearchFieldSize;
  /** 자동 포커스 */
  autoFocus?: boolean;
  /** 상단 고정 (sticky positioning) */
  fixed?: boolean;
  /** fixed일 때 공간 차지 여부 */
  takeSpace?: boolean;
  /** 취소 버튼 표시 (focused일 때) */
  showCancelButton?: boolean;
  /** 취소 버튼 클릭 핸들러 */
  onCancel?: () => void;
  /** 커스텀 좌측 아이콘 */
  leftIcon?: React.ReactNode;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
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

export const SearchField = forwardRef<TextInput, SearchFieldProps>(
  (
    {
      value,
      onChangeText,
      onSearch,
      placeholder = '검색',
      showClearButton = true,
      onClear,
      onDeleteClick,
      disabled = false,
      size = 'medium',
      autoFocus = false,
      fixed = false,
      takeSpace = true,
      showCancelButton = false,
      onCancel,
      leftIcon,
      testID,
      accessibilityLabel,
      style,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const sizeStyle = sizeConfig[size];

    // Animated values
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    const cancelButtonWidth = useRef(new Animated.Value(0)).current;
    const inputRef = useRef<TextInput>(null);

    // Animate border color on focus
    useEffect(() => {
      Animated.timing(borderColorAnim, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [isFocused, borderColorAnim]);

    // Cancel button visibility (always visible when showCancelButton is true)
    useEffect(() => {
      Animated.timing(cancelButtonWidth, {
        toValue: showCancelButton ? 60 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, [showCancelButton, cancelButtonWidth]);

    const handleClear = () => {
      onChangeText('');
      onClear?.();
      onDeleteClick?.();
    };

    const handleSubmit = () => {
      onSearch?.(value);
    };

    const handleCancel = () => {
      onChangeText('');
      inputRef.current?.blur();
      onCancel?.();
    };

    const getBorderColor = () => {
      if (disabled) return colors.border.disabled.default; // palette.grey[90] = #bcc1c7
      return borderColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['transparent', colors.border.brand.default], // transparent → #0066ff
      });
    };

    const getBackgroundColor = () => {
      if (disabled) return colors.surface.disabled.default; // palette.grey[95] = #d6d9dd
      return colors.surface.base.alternative; // palette.grey[99] = #f7f8f9
    };

    const searchInputContainerStyle: ViewStyle = {
      height: sizeStyle.height,
      paddingHorizontal: sizeStyle.paddingHorizontal, // 12
      borderRadius: radius.component.input.search, // 9999 (pill shape)
      borderWidth: 1,
      backgroundColor: getBackgroundColor(),
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.primitive[2], // 8
      flex: 1,
    };

    const textInputStyle = {
      flex: 1,
      fontSize: sizeStyle.fontSize,
      lineHeight: sizeStyle.lineHeight,
      fontFamily: 'Pretendard',
      color: disabled ? colors.content.disabled.default : colors.content.base.default, // palette.grey[80] / palette.grey[30]
      padding: 0,
    };

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.primitive[3], // 12
    };

    const fixedContainerStyle: ViewStyle = fixed
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: colors.surface.base.default,
          paddingHorizontal: spacing.semantic.screen.paddingX, // 20
          paddingVertical: spacing.primitive[2], // 8
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
        }
      : {};

    const spacerHeight = fixed && takeSpace ? sizeStyle.height + spacing.primitive[2] * 2 : 0; // height + vertical padding

    const searchFieldContent = (
      <View style={containerStyle}>
        <Animated.View
          style={[
            searchInputContainerStyle,
            { borderColor: getBorderColor() },
          ]}
        >
          {/* Left Icon (Search or Custom) */}
          {leftIcon ? (
            leftIcon
          ) : (
            <Search
              size={sizeStyle.iconSize}
              color={disabled ? colors.content.disabled.default : colors.content.base.secondary}
              strokeWidth={2}
            />
          )}

          {/* Text Input */}
          <TextInput
            ref={(r) => {
              inputRef.current = r;
              if (typeof ref === 'function') {
                ref(r);
              } else if (ref) {
                ref.current = r;
              }
            }}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.content.base.placeholder} // palette.grey[70] = #92999f
            editable={!disabled}
            autoFocus={autoFocus}
            returnKeyType="search"
            onSubmitEditing={handleSubmit}
            testID={testID}
            accessibilityLabel={accessibilityLabel || placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={textInputStyle}
            {...props}
          />

          {/* Clear Button (Right) - show when has value */}
          {showClearButton && value.length > 0 && !disabled && (
            <Pressable
              onPress={handleClear}
              hitSlop={8}
              accessibilityLabel="검색어 지우기"
              accessibilityRole="button"
            >
              <CircleX
                size={sizeStyle.iconSize}
                color={colors.content.base.secondary}
                strokeWidth={2}
              />
            </Pressable>
          )}
        </Animated.View>

        {/* Cancel Button - always visible when showCancelButton is true */}
        {showCancelButton && (
          <Animated.View style={{ width: cancelButtonWidth, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
            <TextButton
              variant="clear"
              color="primary"
              size="medium"
              onPress={handleCancel}
              accessibilityLabel="취소"
            >
              취소
            </TextButton>
          </Animated.View>
        )}
      </View>
    );

    if (fixed) {
      return (
        <>
          <View style={[fixedContainerStyle, style]}>{searchFieldContent}</View>
          {takeSpace && <View style={{ height: spacerHeight }} />}
        </>
      );
    }

    return <View style={style}>{searchFieldContent}</View>;
  }
);

SearchField.displayName = 'SearchField';
