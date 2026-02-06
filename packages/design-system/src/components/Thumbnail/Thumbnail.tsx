/**
 * Thumbnail Component (Web)
 *
 * @description 이미지/비디오 콘텐츠를 표시하는 컴포넌트입니다.
 * @see docs/components/Thumbnail.md - AI용 상세 가이드
 *
 * @example
 * <Thumbnail
 *   src="/image.jpg"
 *   alt="Image description"
 *   aspectRatio="16:9"
 *   radius
 *   size={200}
 * />
 */

import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';

export type ThumbnailAspectRatio = '1:1' | '16:9' | '4:3' | '3:2' | '2:1' | '9:16' | '3:4';

export interface ThumbnailProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** 이미지 소스 URL */
  src: string;
  /** 대체 텍스트 */
  alt?: string;
  /** 종횡비 */
  aspectRatio?: ThumbnailAspectRatio;
  /** 너비 크기 (px 또는 css 단위) */
  size?: number | string;
  /** 라운드 모서리 적용 (12px) */
  radius?: boolean;
  /** 테두리 표시 */
  border?: boolean;
  /** 재생 아이콘 표시 (비디오용) */
  playIcon?: boolean;
  /** 실패 시 대체 콘텐츠 */
  fallback?: string | ReactNode;
  /** 오버레이 콘텐츠 */
  overlay?: ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
}

const aspectRatioMap: Record<ThumbnailAspectRatio, string> = {
  '1:1': '100%',
  '16:9': '56.25%',
  '4:3': '75%',
  '3:2': '66.67%',
  '2:1': '50%',
  '9:16': '177.78%',
  '3:4': '133.33%',
};

export const Thumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  (
    {
      src,
      alt = '',
      aspectRatio = '1:1',
      size,
      radius = true,
      border = false,
      playIcon = false,
      fallback,
      overlay,
      onClick,
      style,
      ...props
    },
    ref
  ) => {
    const [hasError, setHasError] = useState(false);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      width: typeof size === 'number' ? `${size}px` : size || '100%',
      overflow: 'hidden',
      borderRadius: radius ? 12 : 0,
      border: border ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    };

    const aspectBoxStyle: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      paddingBottom: aspectRatioMap[aspectRatio],
    };

    const imageStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };

    const overlayContainerStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const playIconStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 48,
      height: 48,
      borderRadius: '50%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      pointerEvents: 'none',
    };

    const triangleStyle: React.CSSProperties = {
      width: 0,
      height: 0,
      borderLeft: '12px solid white',
      borderTop: '8px solid transparent',
      borderBottom: '8px solid transparent',
      marginLeft: 3,
    };

    const fallbackStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f5f9',
      color: '#94a3b8',
      fontSize: 14,
    };

    return (
      <div ref={ref} style={containerStyle} onClick={onClick} {...props}>
        <div style={aspectBoxStyle}>
          {hasError ? (
            <div style={fallbackStyle}>
              {typeof fallback === 'string' ? fallback : fallback || 'Image unavailable'}
            </div>
          ) : (
            <>
              <img
                src={src}
                alt={alt}
                style={imageStyle}
                onError={() => setHasError(true)}
              />
              {overlay && <div style={overlayContainerStyle}>{overlay}</div>}
              {playIcon && (
                <div style={playIconStyle}>
                  <div style={triangleStyle} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

Thumbnail.displayName = 'Thumbnail';
