/**
 * TimePicker Component (React Native)
 *
 * @description 시간을 선택하는 컴포넌트입니다.
 * @see docs/components/TimePicker.md - AI용 상세 가이드
 *
 * @example
 * <TimePicker
 *   value={selectedTime}
 *   onChange={setSelectedTime}
 *   format="A hh:mm"
 *   placeholder="시간 선택"
 * />
 */

import React, { forwardRef, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { Clock } from 'lucide-react-native';
import { colors, palette } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type TimePickerMode = '12h' | '24h';
export type TimePickerFormat = 'HH:mm' | 'A hh:mm' | 'A hh:mm:ss' | 'HH:mm:ss';
export type TimePickerSize = 'small' | 'medium' | 'large';

export interface TimePickerProps {
  /** 선택된 시간 */
  value: Date | null;
  /** 변경 핸들러 */
  onChange: (date: Date) => void;
  /** 시간 포맷 */
  format?: TimePickerFormat;
  /** 12시간제 또는 24시간제 (deprecated: format 사용 권장) */
  mode?: TimePickerMode;
  /** 분 간격 */
  minuteInterval?: 1 | 5 | 10 | 15 | 30;
  /** 라벨 */
  label?: string;
  /** 필수 입력 뱃지 (*) */
  required?: boolean;
  /** 설명 텍스트 */
  description?: string;
  /** 도움말 텍스트 (description의 하위 호환 별칭) */
  helperText?: string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 비활성 상태 */
  disabled?: boolean;
  /** 읽기 전용 상태 */
  readOnly?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 확인/취소 버튼 영역 표시 */
  showActionArea?: boolean;
  /** 크기 */
  size?: TimePickerSize;
  /** 테스트 ID */
  testID?: string;
  /** 접근성 라벨 */
  accessibilityLabel?: string;
  /** 커스텀 스타일 */
  style?: ViewStyle;
}

const sizeConfig: Record<TimePickerSize, { height: number; fontSize: number }> = {
  small: { height: 36, fontSize: typography.fontSize.sm },
  medium: { height: 44, fontSize: typography.fontSize.sm },
  large: { height: 52, fontSize: typography.fontSize.md },
};

export const TimePicker = forwardRef<View, TimePickerProps>(
  (
    {
      value,
      onChange,
      format: formatProp,
      mode,
      minuteInterval = 1,
      label,
      required = false,
      description,
      helperText,
      placeholder = '시간 선택',
      disabled = false,
      readOnly = false,
      error = false,
      errorMessage,
      showActionArea = true,
      size = 'medium',
      testID,
      accessibilityLabel,
      style,
    },
    ref
  ) => {
    // Resolve format from mode (backward compatibility)
    const resolvedFormat: TimePickerFormat = formatProp || (mode === '24h' ? 'HH:mm' : 'A hh:mm');

    const [isOpen, setIsOpen] = useState(false);
    const [tempHour, setTempHour] = useState<number>(12);
    const [tempMinute, setTempMinute] = useState<number>(0);
    const [tempSecond, setTempSecond] = useState<number>(0);
    const [tempPeriod, setTempPeriod] = useState<'오전' | '오후'>('오전');

    const sizeStyle = sizeConfig[size];
    const resolvedDescription = description || helperText;
    const displayHelperText = error ? errorMessage : resolvedDescription;

    const is12Hour = resolvedFormat.startsWith('A');
    const hasSeconds = resolvedFormat.includes(':ss');

    // Initialize temp values when modal opens
    useEffect(() => {
      if (isOpen && value) {
        const hours = value.getHours();
        const minutes = value.getMinutes();
        const seconds = value.getSeconds();

        if (is12Hour) {
          const period = hours >= 12 ? '오후' : '오전';
          const hour12 = hours % 12 || 12;
          setTempHour(hour12);
          setTempPeriod(period);
        } else {
          setTempHour(hours);
        }
        setTempMinute(minutes);
        setTempSecond(seconds);
      } else if (isOpen && !value) {
        // Default to current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        if (is12Hour) {
          const period = hours >= 12 ? '오후' : '오전';
          const hour12 = hours % 12 || 12;
          setTempHour(hour12);
          setTempPeriod(period);
        } else {
          setTempHour(hours);
        }
        setTempMinute(Math.floor(minutes / minuteInterval) * minuteInterval);
        setTempSecond(seconds);
      }
    }, [isOpen, value, is12Hour, minuteInterval]);

    // Auto-confirm when showActionArea is false
    useEffect(() => {
      if (isOpen && !showActionArea) {
        handleConfirmInternal();
      }
    }, [tempHour, tempMinute, tempSecond, tempPeriod, isOpen, showActionArea]);

    // Format display time
    const formatTime = (date: Date | null): string => {
      if (!date) return placeholder;

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      switch (resolvedFormat) {
        case 'HH:mm':
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        case 'HH:mm:ss':
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        case 'A hh:mm': {
          const period = hours >= 12 ? '오후' : '오전';
          const hour12 = hours % 12 || 12;
          return `${period} ${hour12}:${minutes.toString().padStart(2, '0')}`;
        }
        case 'A hh:mm:ss': {
          const period = hours >= 12 ? '오후' : '오전';
          const hour12 = hours % 12 || 12;
          return `${period} ${hour12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        default:
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    };

    // Generate hour options
    const getHourOptions = (): number[] => {
      if (is12Hour) {
        return Array.from({ length: 12 }, (_, i) => i + 1);
      } else {
        return Array.from({ length: 24 }, (_, i) => i);
      }
    };

    // Generate minute options
    const getMinuteOptions = (): number[] => {
      return Array.from({ length: 60 / minuteInterval }, (_, i) => i * minuteInterval);
    };

    // Generate second options
    const getSecondOptions = (): number[] => {
      return Array.from({ length: 60 }, (_, i) => i);
    };

    const handleConfirmInternal = () => {
      let hours = tempHour;

      if (is12Hour) {
        if (tempPeriod === '오후' && tempHour !== 12) {
          hours = tempHour + 12;
        } else if (tempPeriod === '오전' && tempHour === 12) {
          hours = 0;
        }
      }

      const newDate = new Date();
      newDate.setHours(hours, tempMinute, hasSeconds ? tempSecond : 0, 0);
      onChange(newDate);
    };

    const handleConfirm = () => {
      handleConfirmInternal();
      setIsOpen(false);
    };

    const handleCancel = () => {
      setIsOpen(false);
    };

    const getBorderColor = () => {
      if (disabled || readOnly) return colors.border.disabled.default;
      if (error) return colors.border.error.default;
      if (isOpen) return colors.border.brand.default;
      return colors.border.solid.alternative;
    };

    const triggerStyle: ViewStyle = {
      height: sizeStyle.height,
      paddingHorizontal: spacing.component.input.paddingX,
      borderRadius: radius.component.input.default,
      borderWidth: 1,
      borderColor: getBorderColor(),
      backgroundColor: disabled || readOnly
        ? colors.surface.base.alternative
        : colors.surface.base.default,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.semantic.horizontal['2xs'],
    };

    const labelStyle: TextStyle = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.default,
      marginBottom: spacing.component.input.labelGap,
    };

    const requiredBadgeStyle: TextStyle = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.error.default,
      marginLeft: spacing.primitive[1],
    };

    const textStyle: TextStyle = {
      fontSize: sizeStyle.fontSize,
      fontFamily: typography.fontFamily.base,
      color: value ? colors.content.base.default : colors.content.base.placeholder,
    };

    const descriptionStyle: TextStyle = {
      fontSize: typography.fontSize.xs,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
      marginTop: spacing.component.input.helperGap,
    };

    const errorStyle: TextStyle = {
      ...descriptionStyle,
      color: colors.content.error.default,
    };

    const renderClockIcon = () => (
      <Clock
        size={16}
        color={
          disabled || readOnly
            ? colors.content.disabled.default
            : colors.content.base.secondary
        }
        strokeWidth={1.5}
      />
    );

    const renderWheelPicker = (
      values: number[],
      selectedValue: number,
      onValueChange: (value: number) => void,
      format?: (v: number) => string
    ) => {
      const ITEM_HEIGHT = 40;

      return (
        <ScrollView
          style={{ height: ITEM_HEIGHT * 5 }}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
        >
          {values.map((val) => {
            const isSelected = val === selectedValue;
            return (
              <Pressable
                key={val}
                onPress={() => onValueChange(val)}
                style={{
                  height: ITEM_HEIGHT,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: isSelected ? typography.fontSize.xl : typography.fontSize.md,
                    fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.regular,
                    fontFamily: typography.fontFamily.base,
                    color: isSelected ? colors.content.brand.default : colors.content.base.secondary,
                  }}
                >
                  {format ? format(val) : val}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      );
    };

    const renderPeriodPicker = () => {
      const ITEM_HEIGHT = 40;
      const periods: Array<'오전' | '오후'> = ['오전', '오후'];

      return (
        <ScrollView
          style={{ height: ITEM_HEIGHT * 5 }}
          contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
        >
          {periods.map((period) => {
            const isSelected = period === tempPeriod;
            return (
              <Pressable
                key={period}
                onPress={() => setTempPeriod(period)}
                style={{
                  height: ITEM_HEIGHT,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: isSelected ? typography.fontSize.xl : typography.fontSize.md,
                    fontWeight: isSelected ? typography.fontWeight.semibold : typography.fontWeight.regular,
                    fontFamily: typography.fontFamily.base,
                    color: isSelected ? colors.content.brand.default : colors.content.base.secondary,
                  }}
                >
                  {period}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      );
    };

    return (
      <View ref={ref} style={style}>
        {/* Label + Required Badge */}
        {label && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={labelStyle}>{label}</Text>
            {required && <Text style={requiredBadgeStyle}>*</Text>}
          </View>
        )}

        {/* Trigger */}
        <Pressable
          onPress={() => !disabled && !readOnly && setIsOpen(true)}
          disabled={disabled || readOnly}
          testID={testID}
          accessibilityLabel={accessibilityLabel || label}
          accessibilityRole="button"
          accessibilityState={{ disabled: disabled || readOnly }}
          style={({ pressed }) => [
            triggerStyle,
            pressed && !disabled && !readOnly && { backgroundColor: colors.surface.base.alternative },
          ]}
        >
          <Text style={textStyle} numberOfLines={1}>
            {formatTime(value)}
          </Text>
          {renderClockIcon()}
        </Pressable>

        {/* Description / Error Message */}
        {displayHelperText && (
          <Text style={error ? errorStyle : descriptionStyle}>{displayHelperText}</Text>
        )}

        {/* Time Picker Modal */}
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={handleCancel}
        >
          <Pressable
            style={{
              flex: 1,
              backgroundColor: colors.overlay.dim,
              justifyContent: 'flex-end',
            }}
            onPress={handleCancel}
          >
            <Pressable
              style={{
                backgroundColor: colors.surface.base.default,
                borderTopLeftRadius: radius.component.bottomSheet.default,
                borderTopRightRadius: radius.component.bottomSheet.default,
                paddingBottom: spacing.component.bottomSheet.padding,
                shadowColor: palette.static.black,
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 8,
              }}
              onPress={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: colors.border.base.default,
                  borderRadius: 2,
                  alignSelf: 'center',
                  marginTop: spacing.primitive[3],
                  marginBottom: spacing.primitive[5],
                }}
              />

              {/* Title */}
              <Text
                style={{
                  fontSize: typography.fontSize.lg,
                  fontWeight: typography.fontWeight.semibold,
                  fontFamily: typography.fontFamily.base,
                  color: colors.content.base.default,
                  textAlign: 'center',
                  marginBottom: spacing.primitive[6],
                }}
              >
                {label || '시간 선택'}
              </Text>

              {/* Picker Wheels */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: spacing.semantic.horizontal.sm,
                  paddingHorizontal: spacing.component.bottomSheet.padding,
                }}
              >
                {/* Period (12h mode only) - Korean convention: 오전/오후 먼저 */}
                {is12Hour && (
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text
                      style={{
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.medium,
                        fontFamily: typography.fontFamily.base,
                        color: colors.content.base.secondary,
                        marginBottom: spacing.primitive[2],
                      }}
                    >
                      &nbsp;
                    </Text>
                    {renderPeriodPicker()}
                  </View>
                )}

                {/* Hour */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      fontFamily: typography.fontFamily.base,
                      color: colors.content.base.secondary,
                      marginBottom: spacing.primitive[2],
                    }}
                  >
                    시
                  </Text>
                  {renderWheelPicker(
                    getHourOptions(),
                    tempHour,
                    setTempHour,
                    (v) => v.toString().padStart(2, '0')
                  )}
                </View>

                {/* Separator */}
                <Text
                  style={{
                    fontSize: typography.fontSize.xl,
                    fontWeight: typography.fontWeight.semibold,
                    fontFamily: typography.fontFamily.base,
                    color: colors.content.brand.default,
                    marginBottom: spacing.primitive[6],
                  }}
                >
                  :
                </Text>

                {/* Minute */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: typography.fontSize.xs,
                      fontWeight: typography.fontWeight.medium,
                      fontFamily: typography.fontFamily.base,
                      color: colors.content.base.secondary,
                      marginBottom: spacing.primitive[2],
                    }}
                  >
                    분
                  </Text>
                  {renderWheelPicker(
                    getMinuteOptions(),
                    tempMinute,
                    setTempMinute,
                    (v) => v.toString().padStart(2, '0')
                  )}
                </View>

                {/* Seconds (if format includes seconds) */}
                {hasSeconds && (
                  <>
                    {/* Separator */}
                    <Text
                      style={{
                        fontSize: typography.fontSize.xl,
                        fontWeight: typography.fontWeight.semibold,
                        fontFamily: typography.fontFamily.base,
                        color: colors.content.brand.default,
                        marginBottom: spacing.primitive[6],
                      }}
                    >
                      :
                    </Text>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: typography.fontSize.xs,
                          fontWeight: typography.fontWeight.medium,
                          fontFamily: typography.fontFamily.base,
                          color: colors.content.base.secondary,
                          marginBottom: spacing.primitive[2],
                        }}
                      >
                        초
                      </Text>
                      {renderWheelPicker(
                        getSecondOptions(),
                        tempSecond,
                        setTempSecond,
                        (v) => v.toString().padStart(2, '0')
                      )}
                    </View>
                  </>
                )}
              </View>

              {/* Action Buttons */}
              {showActionArea && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: spacing.component.modal.buttonGap,
                    paddingHorizontal: spacing.component.bottomSheet.padding,
                    marginTop: spacing.primitive[6],
                  }}
                >
                  <Pressable
                    onPress={handleCancel}
                    style={({ pressed }) => ({
                      flex: 1,
                      height: 44,
                      borderRadius: radius.component.button.lg,
                      backgroundColor: pressed ? colors.surface.base.containerPressed : colors.surface.base.container,
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                  >
                    <Text
                      style={{
                        fontSize: typography.fontSize.sm,
                        fontWeight: typography.fontWeight.semibold,
                        fontFamily: typography.fontFamily.base,
                        color: colors.content.base.default,
                      }}
                    >
                      취소
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={handleConfirm}
                    style={({ pressed }) => ({
                      flex: 1,
                      height: 44,
                      borderRadius: radius.component.button.lg,
                      backgroundColor: pressed ? colors.surface.brand.defaultPressed : colors.surface.brand.default,
                      alignItems: 'center',
                      justifyContent: 'center',
                    })}
                  >
                    <Text
                      style={{
                        fontSize: typography.fontSize.sm,
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
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

TimePicker.displayName = 'TimePicker';
