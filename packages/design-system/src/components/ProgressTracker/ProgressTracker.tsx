'use client';

import { Fragment, type CSSProperties, type ReactNode } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { transitions } from '../../utils/styles';
import { borderWidth } from '../../tokens/general';
import { radius } from '../../tokens/radius';
import { duration, easing } from '../../tokens/motion';

export interface ProgressTrackerStep {
  label?: string;
  icon?: ReactNode;
}

export type ProgressTrackerVariant = 'default' | 'compact';
export type ProgressTrackerOrientation = 'horizontal' | 'vertical';

type ProgressTrackerState = 'completed' | 'active' | 'upcoming';

export interface ProgressTrackerProps {
  steps: ProgressTrackerStep[] | number;
  activeStep: number;
  variant?: ProgressTrackerVariant;
  orientation?: ProgressTrackerOrientation;
  checkForFinish?: boolean;
  className?: string;
}

function normalizeSteps(steps: ProgressTrackerStep[] | number): ProgressTrackerStep[] {
  if (Array.isArray(steps)) return steps;

  const count = Number.isFinite(steps) ? Math.max(0, Math.floor(steps)) : 0;
  return Array.from({ length: count }, () => ({}));
}

function normalizeActiveStep(activeStep: number): number {
  if (!Number.isFinite(activeStep)) return 0;
  return Math.max(0, Math.floor(activeStep));
}

function getStepState(index: number, activeStep: number): ProgressTrackerState {
  if (index < activeStep) return 'completed';
  if (index === activeStep) return 'active';
  return 'upcoming';
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12l5 5L20 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ProgressTracker({
  steps,
  activeStep,
  variant = 'default',
  orientation = 'horizontal',
  checkForFinish = false,
  className,
}: ProgressTrackerProps) {
  const stepItems = normalizeSteps(steps);

  if (stepItems.length === 0) return null;

  const resolvedActiveStep = normalizeActiveStep(activeStep);
  const isCompact = variant === 'compact';
  const isVertical = orientation === 'vertical';

  const nodeSize = isCompact ? spacing.primitive[2] : spacing.primitive[6];
  const activeNodeSize = isCompact ? spacing.primitive[3] : spacing.primitive[6];
  const connectorThickness = borderWidth.strong;
  const horizontalConnectorOffset = nodeSize / 2 - connectorThickness / 2;
  const verticalConnectorMinHeight = isCompact ? spacing.primitive[4] : spacing.primitive[6];

  const rootStyle: CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: isVertical ? 'flex-start' : 'flex-start',
  };

  return (
    <div className={className} style={rootStyle} role="list">
      {stepItems.map((step, index) => {
        const state = getStepState(index, resolvedActiveStep);
        const isActive = state === 'active';
        const isCompleted = state === 'completed';
        const nodeCurrentSize = isActive ? activeNodeSize : nodeSize;
        const showLabel = !isCompact && Boolean(step.label);

        const labelColor =
          state === 'active'
            ? cssVarColors.content.brand.default
            : cssVarColors.content.base.secondary;

        let nodeContent: ReactNode = null;
        if (!isCompact) {
          if (isCompleted && checkForFinish) {
            nodeContent = <CheckIcon />;
          } else if (step.icon) {
            nodeContent = step.icon;
          } else {
            nodeContent = String(index + 1);
          }
        }

        const nodeStyle: CSSProperties = {
          width: nodeCurrentSize,
          height: nodeCurrentSize,
          borderRadius: radius.primitive.full,
          boxSizing: 'border-box',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border:
            state === 'upcoming'
              ? `${borderWidth.default}px solid ${cssVarColors.border.base.default}`
              : `${borderWidth.default}px solid transparent`,
          backgroundColor:
            state === 'upcoming'
              ? cssVarColors.fill.alternative
              : cssVarColors.surface.brand.default,
          color:
            state === 'upcoming'
              ? cssVarColors.content.base.secondary
              : cssVarColors.content.base.onColor,
          fontSize: typography.fontSize.compact,
          lineHeight: `${typography.lineHeight.compact}px`,
          fontWeight: typography.fontWeight.medium,
          transition: `${transitions.all}, box-shadow ${duration.fast}ms ${easing.easeOut}, width ${duration.fast}ms ${easing.easeOut}, height ${duration.fast}ms ${easing.easeOut}`,
          boxShadow:
            !isCompact && isActive
              ? `0 0 0 ${spacing.primitive[1]}px ${cssVarColors.surface.brand.secondary}`
              : 'none',
        };

        const stepStyle: CSSProperties = isVertical
          ? {
              display: 'flex',
              alignItems: 'center',
              gap: isCompact ? 0 : spacing.primitive[2],
              minHeight: activeNodeSize,
            }
          : {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: nodeCurrentSize,
              flexShrink: 0,
              gap: showLabel ? spacing.primitive[2] : 0,
            };

        const labelStyle: CSSProperties = {
          color: labelColor,
          fontSize: typography.fontSize.compact,
          lineHeight: `${typography.lineHeight.compact}px`,
          fontWeight: typography.fontWeight.regular,
          textAlign: isVertical ? 'left' : 'center',
          whiteSpace: 'nowrap',
          transition: transitions.all,
        };

        const connectorCompleted = index < resolvedActiveStep;
        const connectorColor = connectorCompleted
          ? cssVarColors.surface.brand.default
          : cssVarColors.fill.alternative;

        const connectorStyle: CSSProperties = isVertical
          ? {
              width: connectorThickness,
              minHeight: verticalConnectorMinHeight,
              flexGrow: 1,
              marginLeft: nodeSize / 2 - connectorThickness / 2,
              borderRadius: radius.primitive.full,
              backgroundColor: connectorColor,
              transition: transitions.all,
            }
          : {
              flex: 1,
              minWidth: spacing.primitive[3],
              height: connectorThickness,
              marginTop: horizontalConnectorOffset,
              borderRadius: radius.primitive.full,
              backgroundColor: connectorColor,
              transition: transitions.all,
            };

        const nodeContentStyle: CSSProperties = {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          lineHeight: 1,
        };

        return (
          <Fragment key={index}>
            <div
              role="listitem"
              aria-current={isActive ? 'step' : undefined}
              aria-label={step.label ?? `Step ${index + 1}`}
              style={stepStyle}
            >
              <div style={nodeStyle}>
                {!isCompact && <span style={nodeContentStyle}>{nodeContent}</span>}
              </div>
              {showLabel && <span style={labelStyle}>{step.label}</span>}
            </div>

            {index < stepItems.length - 1 && (
              <div aria-hidden="true" style={connectorStyle} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
