'use client';

import React, { useState, type CSSProperties } from 'react';
import { cssVarColors } from '../../tokens/colors';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';
import { borderWidth } from '../../tokens/general';

// ─── Types ───────────────────────────────────────────────────────────

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image (also used for initials fallback) */
  alt?: string;
  /** Size @default 'md' */
  size?: AvatarSize;
  /** Shape @default 'circle' */
  shape?: 'circle' | 'rounded';
  /** Custom fallback text (initials). If not provided, derived from alt */
  fallback?: string;
  /** Whether to show online status indicator */
  online?: boolean;
  /** Click handler */
  onClick?: () => void;
  style?: CSSProperties;
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  /** Max avatars to show before overflow +N indicator */
  max?: number;
  /** Size applied to all children @default 'md' */
  size?: AvatarSize;
  style?: CSSProperties;
}

// ─── Size config ─────────────────────────────────────────────────────

const SIZE_CONFIG: Record<AvatarSize, { dimension: number; fontSize: number }> = {
  xs: { dimension: 24, fontSize: typography.fontSize['3xs'] },
  sm: { dimension: 32, fontSize: typography.fontSize.xs },
  md: { dimension: 40, fontSize: typography.fontSize.sm },
  lg: { dimension: 48, fontSize: typography.fontSize.md },
  xl: { dimension: 64, fontSize: typography.fontSize.xl },
};

// ─── Helpers ──────────────────────────────────────────────────────────

function getInitials(text?: string): string {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

// ─── Avatar ───────────────────────────────────────────────────────────

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar(props, ref) {
    const {
      src,
      alt,
      size = 'md',
      shape = 'circle',
      fallback,
      online = false,
      onClick,
      style,
    } = props;

    const [imgError, setImgError] = useState(false);

    const { dimension, fontSize } = SIZE_CONFIG[size];
    const borderRadius =
      shape === 'circle' ? radius.primitive.full : radius.component.avatar.square;

    const showImage = !!src && !imgError;
    const initials = showImage ? '' : (fallback ?? getInitials(alt));

    // Online indicator: 10px base, scale slightly for larger sizes
    const indicatorSize = size === 'xs' ? 8 : size === 'xl' ? 14 : 10;

    const containerStyle: CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dimension,
      height: dimension,
      borderRadius,
      backgroundColor: showImage ? 'transparent' : cssVarColors.fill.normal,
      flexShrink: 0,
      overflow: 'hidden',
      cursor: onClick ? 'pointer' : 'default',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      ...style,
    };

    const imageStyle: CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
    };

    const initialsStyle: CSSProperties = {
      fontSize,
      fontWeight: typography.fontWeight.medium,
      color: cssVarColors.content.base.secondary,
      lineHeight: 1,
      pointerEvents: 'none',
    };

    const indicatorStyle: CSSProperties = {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: indicatorSize,
      height: indicatorSize,
      borderRadius: radius.primitive.full,
      backgroundColor: cssVarColors.content.success.default,
      border: `${borderWidth.strong}px solid ${cssVarColors.content.base.onColor}`,
      boxSizing: 'border-box',
      pointerEvents: 'none',
    };

    const handleClick = onClick
      ? () => onClick()
      : undefined;

    const handleKeyDown = onClick
      ? (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }
      : undefined;

    return (
      <div
        ref={ref}
        style={containerStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={alt}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? ''}
            style={imageStyle}
            onError={() => setImgError(true)}
            draggable={false}
          />
        ) : (
          <span aria-hidden="true" style={initialsStyle}>
            {initials}
          </span>
        )}
        {online && <span aria-label="온라인" style={indicatorStyle} />}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';

// ─── AvatarGroup ──────────────────────────────────────────────────────

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  function AvatarGroup(props, ref) {
    const { children, max, size = 'md', style } = props;

    const childArray = React.Children.toArray(children);
    const hasMax = max !== undefined && max > 0;
    const visibleChildren = hasMax ? childArray.slice(0, max) : childArray;
    const overflowCount = hasMax ? childArray.length - max : 0;

    const { dimension, fontSize } = SIZE_CONFIG[size];
    const negativeMargin = -Math.round(dimension * 0.2);

    const containerStyle: CSSProperties = {
      display: 'inline-flex',
      flexDirection: 'row',
      alignItems: 'center',
      ...style,
    };

    const itemWrapperStyle = (index: number): CSSProperties => ({
      marginLeft: index === 0 ? 0 : negativeMargin,
      zIndex: visibleChildren.length - index,
      flexShrink: 0,
    });

    const overflowStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dimension,
      height: dimension,
      borderRadius: radius.primitive.full,
      backgroundColor: cssVarColors.fill.normal,
      fontSize,
      fontWeight: typography.fontWeight.medium,
      color: cssVarColors.content.base.secondary,
      marginLeft: negativeMargin,
      zIndex: 0,
      flexShrink: 0,
      userSelect: 'none',
      boxSizing: 'border-box',
      border: `${borderWidth.strong}px solid ${cssVarColors.content.base.onColor}`,
    };

    return (
      <div ref={ref} style={containerStyle} role="group">
        {visibleChildren.map((child, index) => (
          <div key={index} style={itemWrapperStyle(index)}>
            {React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<AvatarProps>, { size })
              : child}
          </div>
        ))}
        {overflowCount > 0 && (
          <span
            aria-label={`${overflowCount}명 더 보기`}
            style={overflowStyle}
          >
            +{overflowCount}
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
