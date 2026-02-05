import { Icon } from '@/design-system/components/Icon/Icon';
import * as Slot from '@rn-primitives/slot';
import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '@rn-primitives/types';
import { ComponentPropsWithRef, createContext, ElementRef, forwardRef, useContext } from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import * as styles from '@/design-system/components/Checkbox/Checkbox.css';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';

type RootContext = {
  nativeID?: string;
} & RootProps;

type RootProps = Omit<SlottablePressableProps, 'asChild'> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

const CheckboxContext = createContext<RootContext | null>(null);

const Root = forwardRef<PressableRef, RootProps>(
  ({ disabled = false, checked, onCheckedChange, nativeID, ...props }, ref) => {
    return (
      <CheckboxContext.Provider
        value={{
          disabled,
          checked,
          onCheckedChange,
          nativeID,
        }}
      >
        <Trigger ref={ref} {...props} />
      </CheckboxContext.Provider>
    );
  },
);

Root.displayName = 'Checkbox.Root';

function useCheckboxContext() {
  const context = useContext(CheckboxContext);

  if (!context) {
    throw new Error(
      'Checkbox compound components cannot be rendered outside the Checkbox component',
    );
  }

  return context;
}

const Trigger = forwardRef<PressableRef, SlottablePressableProps>(
  ({ asChild, onPress: onPressProp, ...props }, ref) => {
    const { disabled, checked, onCheckedChange, nativeID } = useCheckboxContext();

    const onPress = (event: GestureResponderEvent) => {
      /* istanbul ignore next */
      if (disabled) return;
      const newValue = !checked;
      onCheckedChange?.(newValue);
      onPressProp?.(event);
    };

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        nativeID={nativeID}
        aria-disabled={disabled}
        role="checkbox"
        aria-checked={checked}
        onPress={onPress}
        accessibilityState={{
          checked,
          disabled,
        }}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Trigger.displayName = 'Checkbox.Trigger';

type IndicatorProps = ForceMountable & SlottableViewProps;

const Indicator = forwardRef<ViewRef, IndicatorProps>(({ asChild, forceMount, ...props }, ref) => {
  const { checked, disabled } = useCheckboxContext();

  if (!forceMount) {
    if (!checked) {
      return null;
    }
  }

  const Component = asChild ? Slot.View : View;

  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      aria-hidden={!(forceMount || checked)}
      role="presentation"
      {...props}
    />
  );
});

Indicator.displayName = 'Checkbox.Indicator';

export const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithRef<typeof Root> & styles.RootVariants
>(({ checked, disabled, ...props }, ref) => {
  const { tokens } = useTheme();

  return (
    <Root
      ref={ref}
      style={styles.root({ tokens, checked, disabled })}
      checked={checked}
      disabled={disabled}
      {...props}
    >
      <Indicator style={styles.indicator()}>
        <Icon
          asset="circleCheckFilled"
          size="small"
          color={disabled ? 'baseSecondary' : 'brandDefault'}
        />
      </Indicator>
    </Root>
  );
});

Checkbox.displayName = 'Checkbox';

// Export internal components for testing purposes
export { Root, Trigger, Indicator };
