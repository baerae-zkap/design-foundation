import React, { forwardRef, useState, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  Animated,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { Search, Check, X } from 'lucide-react-native';
import { colors, palette } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { radius } from '../../tokens/radius';
import { typography } from '../../tokens/typography';

export interface AutocompleteOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

export type AutocompleteSize = 'small' | 'medium' | 'large';

export interface AutocompleteProps {
  value: string | null;
  onChange: (value: string) => void;
  options: AutocompleteOption[];
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  size?: AutocompleteSize;
  maxVisibleItems?: number;
  noResultsText?: string;
  style?: any;
  testID?: string;
}

interface GroupedOption {
  type: 'header' | 'option';
  group?: string;
  option?: AutocompleteOption;
}

interface SizeStyle {
  paddingX: number;
  paddingY: number;
  fontSize: number;
  iconSize: number;
}

export const Autocomplete = forwardRef<TextInput, AutocompleteProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder = 'Search...',
      label,
      error = false,
      errorMessage,
      disabled = false,
      size = 'medium',
      maxVisibleItems = 6,
      noResultsText = 'No results found',
      style,
      testID = 'autocomplete',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const internalRef = useRef<TextInput>(null);
    const inputRef = (ref as React.RefObject<TextInput>) || internalRef;

    const selectedOption = useMemo(
      () => options.find((opt) => opt.value === value),
      [options, value]
    );

    const filteredOptions = useMemo(() => {
      if (!query.trim()) return options;
      const lowerQuery = query.toLowerCase();
      return options.filter((opt) =>
        opt.label.toLowerCase().includes(lowerQuery)
      );
    }, [options, query]);

    const groupedOptions = useMemo(() => {
      const result: GroupedOption[] = [];
      const groups = new Map<string, AutocompleteOption[]>();

      filteredOptions.forEach((opt) => {
        if (opt.group) {
          if (!groups.has(opt.group)) {
            groups.set(opt.group, []);
          }
          groups.get(opt.group)!.push(opt);
        } else {
          if (!groups.has('')) {
            groups.set('', []);
          }
          groups.get('')!.push(opt);
        }
      });

      groups.forEach((opts, group) => {
        if (group) {
          result.push({ type: 'header', group });
        }
        opts.forEach((opt) => {
          result.push({ type: 'option', option: opt });
        });
      });

      return result;
    }, [filteredOptions]);

    const sizeStyles: SizeStyle = useMemo(() => {
      switch (size) {
        case 'small':
          return {
            paddingX: spacing.component.input.paddingX - spacing.primitive[1],
            paddingY: spacing.component.input.paddingY - spacing.primitive[1],
            fontSize: typography.fontSize.sm,
            iconSize: 16,
          };
        case 'large':
          return {
            paddingX: spacing.component.input.paddingX + spacing.primitive[1],
            paddingY: spacing.component.input.paddingY + spacing.primitive[1],
            fontSize: typography.fontSize.md,
            iconSize: 22,
          };
        default:
          return {
            paddingX: spacing.component.input.paddingX,
            paddingY: spacing.component.input.paddingY,
            fontSize: typography.fontSize.md,
            iconSize: 20,
          };
      }
    }, [size]);

    useEffect(() => {
      if (isOpen) {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }
    }, [isOpen, fadeAnim]);

    const handleFocus = () => {
      setIsFocused(true);
      setIsOpen(true);
      setQuery('');
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const handleSelect = (option: AutocompleteOption) => {
      if (option.disabled) return;
      onChange(option.value);
      setQuery('');
      setIsOpen(false);
      inputRef.current?.blur();
    };

    const handleClear = () => {
      onChange('');
      setQuery('');
      setIsOpen(true);
      inputRef.current?.focus();
    };

    const handleCloseModal = () => {
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
    };

    const renderItem = ({ item }: { item: GroupedOption }) => {
      if (item.type === 'header') {
        return (
          <View style={styles.groupHeader}>
            <Text style={styles.groupHeaderText}>{item.group}</Text>
          </View>
        );
      }

      const option = item.option!;
      const isSelected = option.value === value;

      return (
        <Pressable
          onPress={() => handleSelect(option)}
          disabled={option.disabled}
          style={({ pressed }) => [
            styles.optionItem,
            pressed && !option.disabled && styles.optionItemPressed,
            option.disabled && styles.optionItemDisabled,
          ]}
          testID={`${testID}-option-${option.value}`}
        >
          <View style={styles.optionContent}>
            <View style={styles.optionTextContainer}>
              <Text
                style={[
                  styles.optionLabel,
                  option.disabled && styles.optionLabelDisabled,
                ]}
                numberOfLines={1}
              >
                {option.label}
              </Text>
              {option.description && (
                <Text style={styles.optionDescription} numberOfLines={1}>
                  {option.description}
                </Text>
              )}
            </View>
            {isSelected && (
              <Check
                size={20}
                color={colors.content.brand.default}
                style={styles.checkIcon}
              />
            )}
          </View>
        </Pressable>
      );
    };

    const containerBorderColor = error
      ? colors.border.error.default
      : isFocused
      ? colors.border.brand.default
      : colors.border.base.default;

    return (
      <View style={[styles.container, style]} testID={testID}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View
          style={[
            styles.inputContainer,
            { borderColor: containerBorderColor },
            disabled && styles.inputContainerDisabled,
          ]}
        >
          <Search
            size={sizeStyles.iconSize}
            color={
              disabled
                ? colors.content.disabled.default
                : colors.content.base.secondary
            }
            style={styles.searchIcon}
          />
          <TextInput
            ref={inputRef}
            value={isFocused ? query : selectedOption?.label || ''}
            onChangeText={setQuery}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={colors.content.base.alternative}
            editable={!disabled}
            style={[
              styles.input,
              {
                paddingVertical: sizeStyles.paddingY,
                fontSize: sizeStyles.fontSize,
                fontFamily: typography.fontFamily.base,
                lineHeight: sizeStyles.fontSize * 1.5,
              },
              disabled && styles.inputDisabled,
            ]}
            testID={`${testID}-input`}
          />
          {(value || query) && !disabled && (
            <Pressable
              onPress={handleClear}
              hitSlop={spacing.primitive[2]}
              testID={`${testID}-clear`}
            >
              <X
                size={sizeStyles.iconSize}
                color={colors.content.base.secondary}
              />
            </Pressable>
          )}
        </View>

        {error && errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <Modal
          visible={isOpen}
          transparent
          animationType="none"
          onRequestClose={handleCloseModal}
        >
          <Pressable style={styles.modalOverlay} onPress={handleCloseModal}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.keyboardAvoid}
            >
              <Animated.View
                style={[
                  styles.dropdownContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-10, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {groupedOptions.length === 0 ? (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>{noResultsText}</Text>
                  </View>
                ) : (
                  <FlatList
                    data={groupedOptions}
                    renderItem={renderItem}
                    keyExtractor={(item, index) =>
                      item.type === 'header'
                        ? `header-${item.group}-${index}`
                        : `option-${item.option!.value}`
                    }
                    style={styles.optionList}
                    contentContainerStyle={styles.optionListContent}
                    keyboardShouldPersistTaps="handled"
                    testID={`${testID}-list`}
                  />
                )}
              </Animated.View>
            </KeyboardAvoidingView>
          </Pressable>
        </Modal>
      </View>
    );
  }
);

Autocomplete.displayName = 'Autocomplete';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.base,
    color: colors.content.base.default,
    marginBottom: spacing.component.input.labelGap,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.base.default,
    borderWidth: 1,
    borderRadius: radius.component.input.default,
    paddingHorizontal: spacing.component.input.paddingX,
    gap: spacing.primitive[2],
  },
  inputContainerDisabled: {
    backgroundColor: colors.surface.base.alternative,
    borderColor: colors.border.base.default,
  },
  searchIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    color: colors.content.base.default,
    fontWeight: typography.fontWeight.regular,
    padding: 0,
  },
  inputDisabled: {
    color: colors.content.disabled.default,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.error.default,
    marginTop: spacing.component.input.helperGap,
    lineHeight: typography.lineHeight.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay.dim,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoid: {
    width: '90%',
    maxWidth: 400,
  },
  dropdownContainer: {
    backgroundColor: colors.surface.elevated.default,
    borderRadius: radius.component.card.md,
    maxHeight: 400 + spacing.primitive[4],
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  optionList: {
    flexGrow: 0,
  },
  optionListContent: {
    paddingVertical: spacing.primitive[2],
  },
  groupHeader: {
    paddingHorizontal: spacing.component.list.itemPaddingX,
    paddingVertical: spacing.primitive[2],
    backgroundColor: colors.surface.base.alternative,
  },
  groupHeaderText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.content.base.secondary,
    lineHeight: typography.lineHeight.xs,
  },
  optionItem: {
    paddingHorizontal: spacing.component.list.itemPaddingX,
    paddingVertical: spacing.component.input.paddingY,
  },
  optionItemPressed: {
    backgroundColor: colors.surface.base.container,
  },
  optionItemDisabled: {
    opacity: 0.5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.primitive[3],
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.default,
    lineHeight: typography.lineHeight.md,
  },
  optionLabelDisabled: {
    color: colors.content.disabled.default,
  },
  optionDescription: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.secondary,
    marginTop: spacing.primitive[1],
    lineHeight: typography.lineHeight.xs,
  },
  checkIcon: {
    flexShrink: 0,
  },
  noResultsContainer: {
    paddingHorizontal: spacing.component.list.itemPaddingX,
    paddingVertical: spacing.primitive[6],
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.base,
    fontWeight: typography.fontWeight.regular,
    color: colors.content.base.secondary,
    lineHeight: typography.lineHeight.md,
  },
});
