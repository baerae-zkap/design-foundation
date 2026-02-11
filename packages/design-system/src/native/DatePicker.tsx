/**
 * DatePicker Component (React Native)
 *
 * @description Custom calendar component for date selection following Montage design system.
 * @see docs/components/DatePicker.md - AI용 상세 가이드
 *
 * @example
 * <DatePicker
 *   value={date}
 *   onChange={setDate}
 *   variant="date"
 *   size="medium"
 * />
 */

import React, { forwardRef, useState, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react-native';
import { colors } from '../tokens/colors';
import { spacing } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';

export type DatePickerVariant = 'date' | 'month';
export type DatePickerSize = 'small' | 'medium';

export interface DatePickerProps {
  /** Selected date */
  value: Date | null;
  /** Change handler */
  onChange: (date: Date) => void;
  /** Variant - 'date' for YYYY.MM.DD, 'month' for YYYY.MM */
  variant?: DatePickerVariant;
  /** Minimum selectable date */
  minimumDate?: Date;
  /** Maximum selectable date */
  maximumDate?: Date;
  /** Show action area (confirm/cancel buttons) */
  actionArea?: boolean;
  /** Action area leading content */
  actionAreaLeading?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Size */
  size?: DatePickerSize;
  /** Test ID */
  testID?: string;
  /** Custom style */
  style?: ViewStyle;
}

type ViewMode = 'calendar' | 'yearMonth';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const isSameDay = (date1: Date | null, date2: Date): boolean => {
  if (!date1) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isToday = (date: Date): boolean => {
  const today = new Date();
  return isSameDay(today, date);
};

const isDateDisabled = (date: Date, min?: Date, max?: Date): boolean => {
  if (min && date < min) return true;
  if (max && date > max) return true;
  return false;
};

export const DatePicker = forwardRef<View, DatePickerProps>(
  (
    {
      value,
      onChange,
      variant = 'date',
      minimumDate,
      maximumDate,
      actionArea = false,
      actionAreaLeading,
      disabled = false,
      size = 'medium',
      testID,
      style,
    },
    ref
  ) => {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<ViewMode>('calendar');
    const [currentDate, setCurrentDate] = useState<Date>(value || new Date());
    const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(value);

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calendar data
    const calendarDays = useMemo(() => {
      const daysInMonth = getDaysInMonth(currentYear, currentMonth);
      const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
      const days: (Date | null)[] = [];

      // Previous month padding
      for (let i = 0; i < firstDay; i++) {
        const prevDate = new Date(currentYear, currentMonth, -i);
        days.unshift(prevDate);
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(new Date(currentYear, currentMonth, i));
      }

      // Next month padding (complete 6 weeks)
      const remaining = 42 - days.length;
      for (let i = 1; i <= remaining; i++) {
        days.push(new Date(currentYear, currentMonth + 1, i));
      }

      return days;
    }, [currentYear, currentMonth]);

    const handlePrevMonth = () => {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const handlePrevYear = () => {
      setCurrentDate(new Date(currentYear - 1, currentMonth, 1));
    };

    const handleNextYear = () => {
      setCurrentDate(new Date(currentYear + 1, currentMonth, 1));
    };

    const handleDateSelect = (date: Date) => {
      if (isDateDisabled(date, minimumDate, maximumDate)) return;

      if (actionArea) {
        setTempSelectedDate(date);
      } else {
        onChange(date);
        setShowPicker(false);
      }
    };

    const handleMonthSelect = (monthIndex: number) => {
      const newDate = new Date(currentYear, monthIndex, 1);
      setCurrentDate(newDate);
      if (!actionArea) {
        onChange(newDate);
        if (variant === 'month') {
          setShowPicker(false);
        }
      } else {
        setTempSelectedDate(newDate);
      }
      if (variant === 'date') {
        setViewMode('calendar');
      }
    };

    const handleTodayPress = () => {
      const today = new Date();
      setCurrentDate(today);
      if (actionArea) {
        setTempSelectedDate(today);
      } else {
        onChange(today);
      }
      if (variant === 'date' && viewMode === 'yearMonth') {
        setViewMode('calendar');
      }
    };

    const handleConfirm = () => {
      if (tempSelectedDate) {
        onChange(tempSelectedDate);
        setShowPicker(false);
      }
    };

    const handleHeaderPress = () => {
      if (variant === 'date') {
        setViewMode(viewMode === 'calendar' ? 'yearMonth' : 'calendar');
      }
    };

    // Format display value
    const formatDisplayValue = () => {
      if (!value) return variant === 'month' ? '월 선택' : '날짜 선택';

      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, '0');

      if (variant === 'month') {
        return `${year}.${month}`;
      }

      const day = String(value.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };

    // Styles
    const containerStyle: ViewStyle = {
      width: '100%',
      maxWidth: 336,
      opacity: disabled ? 0.4 : 1,
    };

    const inputTriggerStyle = (pressed: boolean): ViewStyle => ({
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface.base.default,
      borderWidth: 1,
      borderColor: showPicker
        ? colors.content.brand.default
        : pressed
        ? colors.border.solid.default
        : colors.border.solid.alternative,
      borderRadius: radius.primitive.sm,
      paddingHorizontal: spacing.primitive[3],
      paddingVertical: spacing.primitive[2],
    });

    const inputTextStyle: TextStyle = {
      fontSize: typography.fontSize.md,
      fontFamily: typography.fontFamily.base,
      color: value ? colors.content.base.default : colors.content.base.assistive,
    };

    const calendarContainerStyle: ViewStyle = {
      backgroundColor: colors.surface.base.default,
      borderRadius: radius.component.card.sm,
      padding: spacing.primitive[4],
      marginTop: spacing.primitive[2],
    };

    const headerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.primitive[3],
    };

    const headerTextStyle: TextStyle = {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.strong,
    };

    const dayHeaderStyle: ViewStyle = {
      flexDirection: 'row',
      marginBottom: spacing.primitive[1],
    };

    const dayHeaderTextStyle: TextStyle = {
      flex: 1,
      textAlign: 'center',
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.secondary,
    };

    const calendarGridStyle: ViewStyle = {
      gap: spacing.primitive[1],
    };

    const calendarRowStyle: ViewStyle = {
      flexDirection: 'row',
      gap: spacing.primitive[1],
    };

    const dayCellStyle = (
      date: Date | null,
      isCurrentMonth: boolean,
      pressed: boolean
    ): ViewStyle => {
      const isSelected = date && isSameDay(tempSelectedDate || value, date);
      const isTodayDate = date && isToday(date);
      const isDisabled = date ? isDateDisabled(date, minimumDate, maximumDate) : false;

      return {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.primitive.full,
        backgroundColor: isSelected
          ? colors.surface.brand.default
          : pressed && !isDisabled
          ? colors.surface.base.alternative
          : 'transparent',
        borderWidth: isTodayDate && !isSelected ? 1 : 0,
        borderColor: colors.content.brand.default,
      };
    };

    const dayTextStyle = (
      date: Date | null,
      isCurrentMonth: boolean
    ): TextStyle => {
      const isSelected = date && isSameDay(tempSelectedDate || value, date);
      const isDisabled = date ? isDateDisabled(date, minimumDate, maximumDate) : false;

      return {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.base,
        color: isSelected
          ? colors.content.base.onColor
          : isDisabled
          ? colors.content.disabled.default
          : isCurrentMonth
          ? colors.content.base.default
          : colors.content.base.assistive,
      };
    };

    const monthGridStyle: ViewStyle = {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.primitive[2],
    };

    const monthCellStyle = (monthIndex: number, pressed: boolean): ViewStyle => {
      const isSelected = monthIndex === currentMonth;
      return {
        width: '30%',
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.primitive.sm,
        backgroundColor: isSelected
          ? colors.surface.brand.default
          : pressed
          ? colors.surface.base.alternative
          : 'transparent',
      };
    };

    const monthTextStyle = (monthIndex: number): TextStyle => {
      const isSelected = monthIndex === currentMonth;
      return {
        fontSize: typography.fontSize.sm,
        fontFamily: typography.fontFamily.base,
        color: isSelected ? colors.content.base.onColor : colors.content.base.default,
      };
    };

    const actionAreaStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: spacing.primitive[3],
      marginTop: spacing.primitive[3],
      borderTopWidth: 1,
      borderTopColor: colors.border.solid.alternative,
      gap: spacing.primitive[3],
    };

    const actionButtonsStyle: ViewStyle = {
      flexDirection: 'row',
      gap: spacing.component.modal.buttonGap,
    };

    const todayButtonStyle = (pressed: boolean): ViewStyle => ({
      paddingHorizontal: spacing.primitive[3],
      paddingVertical: spacing.primitive[2],
      borderRadius: radius.primitive.sm,
      backgroundColor: pressed ? colors.surface.base.alternative : 'transparent',
    });

    const todayButtonTextStyle: TextStyle = {
      fontSize: typography.fontSize.sm,
      fontFamily: typography.fontFamily.base,
      color: colors.content.brand.default,
    };

    const confirmButtonStyle = (pressed: boolean): ViewStyle => ({
      paddingHorizontal: spacing.primitive[5],
      paddingVertical: spacing.primitive[2],
      borderRadius: radius.component.button.sm,
      backgroundColor: pressed
        ? colors.surface.brand.defaultPressed
        : colors.surface.brand.default,
    });

    const confirmButtonTextStyle: TextStyle = {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      fontFamily: typography.fontFamily.base,
      color: colors.content.base.onColor,
    };

    // Render functions
    const renderCalendarView = () => {
      const weeks: Date[][] = [];
      for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7) as Date[]);
      }

      return (
        <>
          {/* Day headers */}
          <View style={dayHeaderStyle}>
            {DAY_NAMES.map((day) => (
              <Text key={day} style={dayHeaderTextStyle}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={calendarGridStyle}>
            {weeks.map((week, weekIndex) => (
              <View key={weekIndex} style={calendarRowStyle}>
                {week.map((date, dayIndex) => {
                  const isCurrentMonth = date.getMonth() === currentMonth;
                  return (
                    <Pressable
                      key={dayIndex}
                      onPress={() => handleDateSelect(date)}
                      disabled={disabled}
                      style={({ pressed }) =>
                        dayCellStyle(date, isCurrentMonth, pressed)
                      }
                    >
                      <Text style={dayTextStyle(date, isCurrentMonth)}>
                        {date.getDate()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </>
      );
    };

    const renderYearMonthView = () => {
      return (
        <View style={monthGridStyle}>
          {MONTH_NAMES.map((monthName, index) => (
            <Pressable
              key={index}
              onPress={() => handleMonthSelect(index)}
              disabled={disabled}
              style={({ pressed }) => monthCellStyle(index, pressed)}
            >
              <Text style={monthTextStyle(index)}>{monthName}</Text>
            </Pressable>
          ))}
        </View>
      );
    };

    const renderMonthVariant = () => {
      return (
        <View style={monthGridStyle}>
          {MONTH_NAMES.map((monthName, index) => (
            <Pressable
              key={index}
              onPress={() => handleMonthSelect(index)}
              disabled={disabled}
              style={({ pressed }) => monthCellStyle(index, pressed)}
            >
              <Text style={monthTextStyle(index)}>{monthName}</Text>
            </Pressable>
          ))}
        </View>
      );
    };

    return (
      <View ref={ref} style={[containerStyle, style]} testID={testID}>
        {/* Input Field Trigger */}
        <Pressable
          onPress={() => !disabled && setShowPicker(!showPicker)}
          disabled={disabled}
          style={({ pressed }) => inputTriggerStyle(pressed)}
        >
          <Text style={inputTextStyle}>{formatDisplayValue()}</Text>
          <Calendar size={20} color={colors.content.base.secondary} />
        </Pressable>

        {/* Calendar (shown when showPicker is true) */}
        {showPicker && (
          <View style={calendarContainerStyle}>
            {/* Header */}
            <View style={headerStyle}>
              <Pressable
                onPress={viewMode === 'yearMonth' ? handlePrevYear : handlePrevMonth}
                disabled={disabled}
              >
                <ChevronLeft size={20} color={colors.content.base.default} />
              </Pressable>

              <Pressable onPress={handleHeaderPress} disabled={disabled || variant === 'month'}>
                <Text style={headerTextStyle}>
                  {viewMode === 'yearMonth' || variant === 'month'
                    ? `${currentYear}`
                    : `${currentYear}년 ${currentMonth + 1}월`}
                </Text>
              </Pressable>

              <Pressable
                onPress={viewMode === 'yearMonth' ? handleNextYear : handleNextMonth}
                disabled={disabled}
              >
                <ChevronRight size={20} color={colors.content.base.default} />
              </Pressable>
            </View>

            {/* Content */}
            {variant === 'month'
              ? renderMonthVariant()
              : viewMode === 'calendar'
              ? renderCalendarView()
              : renderYearMonthView()}

            {/* Action Area */}
            {actionArea && (
              <View style={actionAreaStyle}>
                {actionAreaLeading && <View style={{ flex: 1 }}>{actionAreaLeading}</View>}
                <View style={actionButtonsStyle}>
                  <Pressable
                    onPress={handleTodayPress}
                    disabled={disabled}
                    style={({ pressed }) => todayButtonStyle(pressed)}
                  >
                    <Text style={todayButtonTextStyle}>오늘</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleConfirm}
                    disabled={disabled || !tempSelectedDate}
                    style={({ pressed }) => confirmButtonStyle(pressed)}
                  >
                    <Text style={confirmButtonTextStyle}>확인</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
);

DatePicker.displayName = 'DatePicker';
