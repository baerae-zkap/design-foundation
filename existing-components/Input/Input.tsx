import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import * as styles from '@/design-system/components/Input/Input.css';
import { Pressable, TextInput, View } from 'react-native';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { Layout } from '@/design-system/components/Layout/Layout';
import { Icon } from '@/design-system/components/Icon/Icon';
import { useNavigation } from '@react-navigation/native';

export type InputProps = {
  isError?: boolean;
  prefixContent?: ReactNode;
  suffixContent?: ReactNode;
  isShowClear?: boolean;
};

export const InputPrimitive = forwardRef<
  TextInput,
  Omit<ComponentPropsWithoutRef<typeof TextInput>, 'size' | 'editable'> &
    InputProps &
    styles.RootVariants &
    styles.InputVariants
>(
  (
    {
      layout = 'hug',
      disabled,
      prefixContent,
      suffixContent,
      maxLength,
      value,
      align,
      inputType,
      color,
      size,
      onChangeText,
      isShowClear,
      isHidden,
      autoFocus,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const { tokens } = useTheme();
    const navigation = useNavigation();
    useImperativeHandle(ref, () => inputRef.current as TextInput);

    useEffect(() => {
      if (autoFocus) {
        // useNavigation type issues with TypeScript, so we use `any` here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const unsubscribe = (navigation as any).addListener('transitionEnd', () => {
          inputRef.current?.focus();
        });

        return unsubscribe;
      }
    }, [autoFocus, navigation]);

    return (
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={styles.root({
          tokens,
          layout,
          disabled,
          size,
          isHidden,
          inputType,
          color,
          isFocused,
        })}
      >
        {prefixContent}
        <View style={styles.centerContent()}>
          <View>
            <TextInput
              style={styles.input({ tokens, align, disabled, isHidden })}
              ref={inputRef}
              editable={!disabled}
              value={value}
              maxLength={maxLength}
              selectionColor={tokens.content.brand.default}
              placeholderTextColor={tokens.content.base.placeholder}
              onChangeText={onChangeText}
              autoFocus={autoFocus}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
          </View>
        </View>
        {suffixContent}
        {value && isShowClear && !disabled && (
          <Pressable
            style={styles.clearButton({ tokens })}
            onPress={() => {
              if (inputRef.current) {
                inputRef.current.clear();
                onChangeText?.('');
              }
            }}
          >
            <Icon asset="deleteFilled" color="baseSecondary" size="medium" />
          </Pressable>
        )}
      </Pressable>
    );
  },
);

InputPrimitive.displayName = 'InputPrimitive';

export const Input = forwardRef<
  ElementRef<typeof InputPrimitive>,
  ComponentProps<typeof InputPrimitive> & ComponentProps<typeof Layout>
>(({ layout = 'hug', pointerEvents, ...props }, ref) => {
  return (
    <Layout layout={layout} pointerEvents={pointerEvents}>
      <InputPrimitive ref={ref} layout={layout} {...props} />
    </Layout>
  );
});

Input.displayName = 'Input';
