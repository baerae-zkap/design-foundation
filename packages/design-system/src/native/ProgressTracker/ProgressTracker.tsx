import React, { forwardRef } from 'react';
import { View, Text, ViewStyle, StyleSheet } from 'react-native';
import { Check, ChevronRight } from 'lucide-react-native';
import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export type ProgressTrackerVariant = 'horizontal' | 'vertical' | 'stepper';
export type StepStatus = 'completed' | 'in_progress' | 'upcoming';

export interface ProgressTrackerStep {
  /** 단계 라벨 */
  label: string;
  /** 뱃지 텍스트 (라벨 옆 작은 칩) */
  badge?: string;
  /** 설명 텍스트 */
  description?: string;
  /** 단계별 커스텀 콘텐츠 (vertical에서 라벨 아래 표시) */
  content?: React.ReactNode;
}

export type LabelContents = 'badge' | 'label';

export interface ProgressTrackerProps {
  /** 단계 목록 */
  steps: ProgressTrackerStep[];
  /** 현재 단계 (0-based index) */
  currentStep: number;
  /** 레이아웃 변형 */
  variant?: ProgressTrackerVariant;
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 부가 텍스트(badge) 표시 방식 */
  labelContents?: LabelContents;
  /** 커스텀 스타일 */
  style?: ViewStyle;
  /** 테스트 ID */
  testID?: string;
}

const CIRCLE_SIZE = 28;

export const ProgressTracker = forwardRef<View, ProgressTrackerProps>(
  (
    {
      steps,
      currentStep,
      variant = 'horizontal',
      showLabel = true,
      labelContents = 'badge',
      style,
      testID = 'progress-tracker',
    },
    ref
  ) => {
    const getStepStatus = (index: number): StepStatus => {
      if (index < currentStep) return 'completed';
      if (index === currentStep) return 'in_progress';
      return 'upcoming';
    };

    const renderStepCircle = (index: number, status: StepStatus) => {
      const isCompleted = status === 'completed';
      const isUpcoming = status === 'upcoming';

      return (
        <View
          style={[
            styles.circle,
            isCompleted || !isUpcoming
              ? styles.circleActive
              : styles.circleUpcoming,
          ]}
          testID={`${testID}-step-${index}-circle`}
        >
          {isCompleted ? (
            <Check
              size={16}
              color={colors.content.base.onColor}
              strokeWidth={3}
            />
          ) : (
            <Text
              style={[
                styles.circleText,
                isUpcoming && styles.circleTextUpcoming,
              ]}
            >
              {index + 1}
            </Text>
          )}
        </View>
      );
    };

    const renderSecondaryText = (badge?: string) => {
      if (!badge) return null;
      if (labelContents === 'label') {
        return (
          <Text style={styles.secondaryLabel} numberOfLines={1}>
            {badge}
          </Text>
        );
      }
      return (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      );
    };

    // ─── Horizontal ───
    if (variant === 'horizontal') {
      return (
        <View
          ref={ref}
          style={[styles.containerHorizontal, style]}
          testID={testID}
        >
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isFirst = index === 0;
            const isLast = index === steps.length - 1;
            const leftCompleted = !isFirst && index - 1 < currentStep;
            const rightCompleted = !isLast && index < currentStep;
            return (
              <View
                key={index}
                style={styles.stepColumnHorizontal}
                accessibilityLabel={`Step ${index + 1} of ${steps.length}: ${step.label}, ${status.replace('_', ' ')}`}
              >
                <View style={styles.circleRow}>
                  <View
                    style={[
                      styles.halfConnector,
                      isFirst
                        ? styles.connectorTransparent
                        : leftCompleted
                        ? styles.connectorCompleted
                        : styles.connectorUpcoming,
                    ]}
                  />
                  {renderStepCircle(index, status)}
                  <View
                    style={[
                      styles.halfConnector,
                      isLast
                        ? styles.connectorTransparent
                        : rightCompleted
                        ? styles.connectorCompleted
                        : styles.connectorUpcoming,
                    ]}
                  />
                </View>
                {showLabel && (
                  <View style={styles.labelContainerHorizontal}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.labelText,
                        status === 'in_progress'
                          ? styles.labelTextActive
                          : styles.labelTextInactive,
                      ]}
                    >
                      {step.label}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      );
    }

    // ─── Stepper ───
    if (variant === 'stepper') {
      return (
        <View
          ref={ref}
          style={[styles.containerStepper, style]}
          testID={testID}
        >
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const isLast = index === steps.length - 1;
            return (
              <React.Fragment key={index}>
                <View
                  style={styles.stepperItem}
                  accessibilityLabel={`Step ${index + 1} of ${steps.length}: ${step.label}, ${status.replace('_', ' ')}`}
                >
                  {renderStepCircle(index, status)}
                  {showLabel && (
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.stepperLabel,
                        status === 'in_progress'
                          ? styles.labelTextActive
                          : styles.labelTextInactive,
                      ]}
                    >
                      {step.label}
                    </Text>
                  )}
                </View>
                {!isLast && (
                  <ChevronRight
                    size={16}
                    color={colors.content.base.alternative}
                    strokeWidth={2}
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>
      );
    }

    // ─── Vertical ───
    return (
      <View
        ref={ref}
        style={[styles.containerVertical, style]}
        testID={testID}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps.length - 1;
          const isCompletedConnector = index < currentStep;
          const hasContent = step.content || step.description;
          return (
            <View
              key={index}
              accessibilityLabel={`Step ${index + 1} of ${steps.length}: ${step.label}, ${status.replace('_', ' ')}`}
            >
              {/* Step header: circle + label + badge */}
              <View style={styles.stepHeaderVertical}>
                {renderStepCircle(index, status)}
                {showLabel && (
                  <View
                    style={[
                      styles.labelRowVertical,
                      labelContents === 'label' && styles.labelRowSpaceBetween,
                    ]}
                  >
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.verticalLabel,
                        status === 'in_progress'
                          ? styles.labelTextActive
                          : styles.labelTextInactive,
                      ]}
                    >
                      {step.label}
                    </Text>
                    {renderSecondaryText(step.badge)}
                  </View>
                )}
                {!showLabel && renderSecondaryText(step.badge)}
              </View>

              {/* Content area + vertical connector */}
              {!isLast && (
                <View style={styles.verticalContentRow}>
                  <View style={styles.connectorColumn}>
                    <View
                      style={[
                        styles.connectorVertical,
                        isCompletedConnector
                          ? styles.connectorCompleted
                          : styles.connectorUpcoming,
                      ]}
                    />
                  </View>
                  <View style={styles.verticalContentArea}>
                    {step.content ||
                      (step.description ? (
                        <Text style={styles.descriptionText}>
                          {step.description}
                        </Text>
                      ) : null)}
                  </View>
                </View>
              )}
              {/* Last step content (no connector) */}
              {isLast && hasContent && (
                <View style={styles.verticalContentRow}>
                  <View style={styles.connectorColumn} />
                  <View style={styles.verticalContentArea}>
                    {step.content || (
                      <Text style={styles.descriptionText}>
                        {step.description}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  }
);

ProgressTracker.displayName = 'ProgressTracker';

const styles = StyleSheet.create({
  // ─── Containers ───
  containerHorizontal: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  containerVertical: {
    flexDirection: 'column',
  },
  containerStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[2],
  },

  // ─── Horizontal ───
  stepColumnHorizontal: {
    flex: 1,
    alignItems: 'center',
  },
  circleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  halfConnector: {
    flex: 1,
    height: 2,
  },
  connectorTransparent: {
    backgroundColor: 'transparent',
  },
  labelContainerHorizontal: {
    marginTop: spacing.primitive[2],
    alignItems: 'center',
  },

  // ─── Stepper ───
  stepperItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[2],
  },
  stepperLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.base,
  },

  // ─── Vertical ───
  stepHeaderVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[3],
  },
  labelRowVertical: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[2],
  },
  labelRowSpaceBetween: {
    justifyContent: 'space-between',
  },
  verticalLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.base,
  },
  verticalContentRow: {
    flexDirection: 'row',
    paddingBottom: spacing.primitive[2],
  },
  connectorColumn: {
    width: CIRCLE_SIZE,
    alignItems: 'center',
  },
  verticalContentArea: {
    flex: 1,
    marginLeft: spacing.primitive[3],
  },
  connectorVertical: {
    width: 2,
    flex: 1,
    minHeight: 24,
  },

  // ─── Shared: Circle ───
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: radius.primitive.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleActive: {
    backgroundColor: colors.surface.brand.default,
  },
  circleUpcoming: {
    backgroundColor: colors.surface.base.alternative,
  },
  circleText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.onColor,
  },
  circleTextUpcoming: {
    color: colors.content.base.secondary,
  },

  // ─── Shared: Connectors ───
  connectorCompleted: {
    backgroundColor: colors.surface.brand.default,
  },
  connectorUpcoming: {
    backgroundColor: colors.border.solid.alternative,
  },

  // ─── Shared: Labels ───
  labelText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.base,
    textAlign: 'center',
  },
  labelTextActive: {
    fontWeight: typography.fontWeight.semibold,
    color: colors.content.base.default,
  },
  labelTextInactive: {
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.secondary,
  },

  // ─── Badge ───
  badge: {
    paddingHorizontal: spacing.primitive[2],
    paddingVertical: spacing.primitive[1],
    backgroundColor: colors.surface.base.alternative,
    borderRadius: radius.primitive.xs,
  },
  badgeText: {
    fontSize: typography.fontSize['3xs'],
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.secondary,
  },
  secondaryLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.secondary,
  },

  // ─── Description ───
  descriptionText: {
    fontSize: typography.fontSize['2xs'],
    fontWeight: typography.fontWeight.regular,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.secondary,
  },
});
