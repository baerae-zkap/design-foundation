import { Text, TouchableOpacity, View } from 'react-native';
import * as styles from '@/design-system/components/Keypad/Keypad.css';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { createContext, PropsWithChildren, useContext, useMemo, useRef } from 'react';
import { Icon } from '@/design-system/components/Icon/Icon';

type KeyProps = {
  value?: string | number;
  keyType?: 'value' | 'remove';
  onPressIn?: (key: string | number) => void;
  onPressOut?: () => void;
};

function Key({ value, keyType = 'value', onPressIn, onPressOut }: KeyProps) {
  const { tokens } = useTheme();

  const handleOnPress = () => {
    const keyToPress = keyType === 'remove' ? 'remove' : value;

    if (keyToPress !== null && keyToPress !== undefined) {
      onPressIn?.(keyToPress);
    }
  };

  return (
    <TouchableOpacity
      style={styles.keyRoot({ tokens })}
      onPressIn={handleOnPress}
      onPressOut={onPressOut}
    >
      {keyType === 'remove' ? (
        <Icon asset="arrowLeft" color="baseDefault" size="xxxxLarge" />
      ) : (
        <Text style={styles.keyValue({ tokens })}>{value}</Text>
      )}
    </TouchableOpacity>
  );
}

type KeypadContextProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  maxLength?: number;
};

const KeypadContext = createContext<KeypadContextProps | null>(null);

export function useKeypad() {
  const context = useContext(KeypadContext);

  return context;
}

export function Provider({
  maxLength,
  onValueChange,
  value: keypadValue,
  children,
}: PropsWithChildren<KeypadContextProps>) {
  const value = useMemo(
    () =>
      ({
        value: keypadValue,
        onValueChange,
        maxLength,
      }) satisfies KeypadContextProps,
    [keypadValue, onValueChange, maxLength],
  );

  return <KeypadContext.Provider value={value}>{children}</KeypadContext.Provider>;
}

type NumberKeypadProps = {
  spareKeyValue?: string;
  isShuffle?: boolean;
  inputType?: 'number' | 'password';
};

export function NumberKeypad({
  spareKeyValue,
  isShuffle,
  inputType = 'number',
}: NumberKeypadProps) {
  const { tokens } = useTheme();
  const keypad = useKeypad();

  if (!keypad) {
    throw new Error('Keypad.NumberKeypad must be used within a Keypad.Provider');
  }

  const { value = '', onValueChange, maxLength } = keypad;
  const baseKeypadValues = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 0], []);

  const keypadValues = useMemo(() => {
    const values = [...baseKeypadValues];

    if (isShuffle) {
      for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
      }
    }

    return values;
  }, [baseKeypadValues, isShuffle]);

  const rows = [
    keypadValues.slice(0, 3),
    keypadValues.slice(3, 6),
    keypadValues.slice(6, 9),
    [spareKeyValue, keypadValues[9], 'remove'],
  ];

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRepeat = 300;
  const repeatPeriod = 100;

  const clearMyTimeout = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const handleKeyPress = (key: string | number) => {
    if (maxLength && value.length >= maxLength && key !== 'remove') {
      return;
    }

    if (key === 'remove') {
      onValueChange?.(value.slice(0, -1));

      return;
    }

    if (key === 0 && value === '0' && inputType === 'number') {
      return;
    }

    if (key === '.') {
      if (value?.includes('.')) {
        return;
      }

      onValueChange?.(value?.length === 0 ? '0.' : value + '.');

      return;
    }

    onValueChange?.(value + key);
  };

  const handlePressIn = (key: string | number) => {
    const startRepeating = (cnt: number) => {
      handleKeyPress(key);
      clearMyTimeout();

      timer.current = setTimeout(
        () => {
          startRepeating(cnt + 1);
        },
        cnt === 0 ? firstRepeat : repeatPeriod,
      );
    };

    startRepeating(0);
  };

  const handlePressOut = () => {
    clearMyTimeout();
  };

  return (
    <View style={styles.layout({ tokens })}>
      <View style={styles.root({ tokens })}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row()}>
            {row.map((value, colIndex) => {
              if (value === null || value === undefined) return <Key key={colIndex} />;

              if (value === 'remove')
                return (
                  <Key
                    key={colIndex}
                    keyType="remove"
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                  />
                );

              return (
                <Key
                  key={colIndex}
                  value={value}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                />
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

type PasswordIndicatorProps = styles.PasswordIndicatorRootVariants &
  styles.PasswordIndicatorItemVariants & {};

export function PasswordIndicator({ size = 'medium' }: PasswordIndicatorProps) {
  const { tokens } = useTheme();
  const keypad = useKeypad();

  if (!keypad) {
    throw new Error('Keypad.PasswordIndicator must be used within a Keypad.Provider');
  }

  const { value, maxLength } = keypad;
  const length = maxLength ?? value?.length ?? 0;

  return (
    <View style={styles.passwordIndicatorRoot({ tokens, size })}>
      {!!length &&
        Array.from({ length }).map((_, index) => {
          const isEmpty = index >= (value?.length ?? 0);

          return (
            <View key={index} style={styles.passwordIndicatorItem({ tokens, isEmpty, size })} />
          );
        })}
      {!length && <View style={styles.passwordIndicatorItem({ tokens, isVoid: true, size })} />}
    </View>
  );
}
