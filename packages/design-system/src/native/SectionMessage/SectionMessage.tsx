import React, { forwardRef, type ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet, type ViewProps, type ViewStyle } from 'react-native';
import { Info, CircleCheck, TriangleAlert, CircleX, X } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { typography } from '../../tokens/typography';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';

export type SectionMessageStatus = 'custom' | 'info' | 'success' | 'warning' | 'error';

export interface SectionMessageAction {
  label: string;
  onPress: () => void;
}

export interface SectionMessageProps extends Omit<ViewProps, 'style'> {
  /** 메시지 상태 */
  status?: SectionMessageStatus;
  /** 아이콘 (status별 기본 아이콘 제공, custom일 때 필수) */
  icon?: ReactNode;
  /** 헤딩 텍스트 (선택) */
  heading?: string;
  /** 설명 텍스트 */
  description: string;
  /** 트레일링 버튼 - 우측 인라인 (짧은 메시지용) */
  trailingAction?: SectionMessageAction;
  /** 바텀 버튼 - 하단 배치 (긴 메시지용) */
  bottomAction?: SectionMessageAction;
  /** 닫기 버튼 표시 */
  onClose?: () => void;
  /** 커스텀 콘텐츠 색상 (Montage Customize) */
  contentColor?: string;
  /** 커스텀 배경 색상 (Montage Customize) */
  backgroundColor?: string;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}

const statusConfig = {
  custom: {
    bg: colors.surface.base.container,
    iconColor: colors.content.base.secondary,
    textColor: colors.content.base.default,
    actionColor: colors.content.base.strong,
    Icon: null,
  },
  info: {
    bg: colors.surface.info.default,
    iconColor: colors.content.info.default,
    textColor: colors.content.base.strong,
    actionColor: colors.content.brand.default,
    Icon: Info,
  },
  success: {
    bg: colors.surface.success.default,
    iconColor: colors.content.success.default,
    textColor: colors.content.base.strong,
    actionColor: colors.content.success.default,
    Icon: CircleCheck,
  },
  warning: {
    bg: colors.surface.warning.default,
    iconColor: colors.content.warning.default,
    textColor: colors.content.base.strong,
    actionColor: colors.content.warning.default,
    Icon: TriangleAlert,
  },
  error: {
    bg: colors.surface.error.default,
    iconColor: colors.content.error.default,
    textColor: colors.content.base.strong,
    actionColor: colors.content.error.default,
    Icon: CircleX,
  },
};

export const SectionMessage = forwardRef<View, SectionMessageProps>(
  (
    {
      status = 'info',
      icon,
      heading,
      description,
      trailingAction,
      bottomAction,
      onClose,
      contentColor,
      backgroundColor: customBg,
      style,
      testID,
      accessibilityLabel,
      ...props
    },
    ref
  ) => {
    const config = statusConfig[status];
    const IconComponent = icon ? null : config.Icon;

    // Customize colors
    const bgColor = customBg || config.bg;
    const iconColor = contentColor || config.iconColor;
    const textColor = contentColor || config.textColor;
    const actionColor = contentColor || config.actionColor;

    // Show trailing action button if provided AND no close button
    const showTrailingAction = trailingAction && !onClose;

    return (
      <View
        ref={ref}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        style={[styles.container, { backgroundColor: bgColor }, style]}
        {...props}
      >
        <View style={styles.mainRow}>
          {/* Icon */}
          <View style={styles.iconWrapper}>
            {icon ? (
              icon
            ) : IconComponent ? (
              <IconComponent size={20} color={iconColor} strokeWidth={2} />
            ) : null}
          </View>

          {/* Content */}
          <View style={styles.content}>
            {heading && (
              <Text style={[styles.heading, { color: textColor }]}>{heading}</Text>
            )}
            <Text style={[styles.description, { color: textColor }]}>{description}</Text>

            {/* Bottom Action (below description) */}
            {bottomAction && (
              <Pressable
                onPress={bottomAction.onPress}
                style={({ pressed }) => [
                  styles.bottomAction,
                  pressed && styles.actionPressed,
                ]}
              >
                <Text style={[styles.actionText, { color: actionColor }]}>
                  {bottomAction.label}
                </Text>
              </Pressable>
            )}
          </View>

          {/* Trailing Action or Close Button */}
          {showTrailingAction ? (
            <Pressable
              onPress={trailingAction.onPress}
              style={({ pressed }) => [
                styles.trailingAction,
                pressed && styles.actionPressed,
              ]}
            >
              <Text style={[styles.actionText, { color: actionColor }]}>
                {trailingAction.label}
              </Text>
            </Pressable>
          ) : onClose ? (
            <Pressable
              onPress={onClose}
              style={({ pressed }) => [
                styles.closeButton,
                pressed && styles.actionPressed,
              ]}
              hitSlop={8}
            >
              <X size={20} color={textColor} strokeWidth={2} />
            </Pressable>
          ) : null}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.component.card.sm, // 12px
    padding: spacing.semantic.inset.sm, // 16px
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    alignSelf: 'flex-start',
    marginTop: 2, // Top-aligned with first line
    marginRight: spacing.semantic.horizontal['2xs'], // 8px
  },
  content: {
    flex: 1,
  },
  heading: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.sm,
    marginBottom: spacing.primitive[1], // 4px
  },
  description: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.lineHeight.sm,
  },
  bottomAction: {
    alignSelf: 'flex-start',
    marginTop: spacing.primitive[2], // 8px
    paddingVertical: spacing.primitive[1], // 4px
  },
  trailingAction: {
    alignSelf: 'center',
    marginLeft: spacing.semantic.horizontal['2xs'], // 8px
    paddingVertical: spacing.primitive[1], // 4px
    paddingHorizontal: spacing.primitive[1], // 4px
  },
  closeButton: {
    alignSelf: 'flex-start',
    marginLeft: spacing.semantic.horizontal['2xs'], // 8px
    padding: spacing.primitive[1], // 4px
  },
  actionText: {
    fontFamily: typography.fontFamily.base,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.sm,
  },
  actionPressed: {
    opacity: 0.7,
  },
});

SectionMessage.displayName = 'SectionMessage';
