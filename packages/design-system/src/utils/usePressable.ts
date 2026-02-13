import { useState, useCallback, type MouseEventHandler } from 'react';

interface UsePressableOptions<T extends Element = Element> {
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<T>;
  onMouseUp?: MouseEventHandler<T>;
  onMouseLeave?: MouseEventHandler<T>;
  onMouseEnter?: MouseEventHandler<T>;
}

interface UsePressableReturn<T extends Element = Element> {
  isPressed: boolean;
  isHovered: boolean;
  handlers: {
    onMouseDown: MouseEventHandler<T>;
    onMouseUp: MouseEventHandler<T>;
    onMouseLeave: MouseEventHandler<T>;
    onMouseEnter: MouseEventHandler<T>;
  };
}

/**
 * 웹 컴포넌트의 pressed/hovered 상태를 관리하는 공유 훅
 *
 * @example
 * const { isPressed, isHovered, handlers } = usePressable<HTMLButtonElement>({ disabled });
 * return <button {...handlers} style={{ background: isPressed ? pressedBg : defaultBg }} />;
 */
export function usePressable<T extends Element = Element>(
  options: UsePressableOptions<T> = {}
): UsePressableReturn<T> {
  const { disabled, onMouseDown, onMouseUp, onMouseLeave, onMouseEnter } = options;
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseDown: MouseEventHandler<T> = useCallback(
    (e) => {
      if (!disabled) setIsPressed(true);
      onMouseDown?.(e);
    },
    [disabled, onMouseDown]
  );

  const handleMouseUp: MouseEventHandler<T> = useCallback(
    (e) => {
      setIsPressed(false);
      onMouseUp?.(e);
    },
    [onMouseUp]
  );

  const handleMouseLeave: MouseEventHandler<T> = useCallback(
    (e) => {
      setIsPressed(false);
      setIsHovered(false);
      onMouseLeave?.(e);
    },
    [onMouseLeave]
  );

  const handleMouseEnter: MouseEventHandler<T> = useCallback(
    (e) => {
      if (!disabled) setIsHovered(true);
      onMouseEnter?.(e);
    },
    [disabled, onMouseEnter]
  );

  return {
    isPressed: disabled ? false : isPressed,
    isHovered: disabled ? false : isHovered,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
  };
}
