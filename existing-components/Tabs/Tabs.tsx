import { TabView, Route } from 'react-native-tab-view';
import {
  Children,
  ComponentProps,
  createContext,
  Dispatch,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { PropsWithSymbol } from '@/design-system/types/utility';
import * as styles from '@/design-system/components/Tabs/Tabs.css';
import { FirstParameter } from '@/types/types';

const TABS_TRIGGER_SYMBOL = Symbol('Tabs.Trigger');
const TABS_LIST_SYMBOL = Symbol('Tabs.List');

type ContextProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const TabsContext = createContext<ContextProps>({} as ContextProps);

type TabsRootProps = {
  defaultValue?: string;
};

export const Root = ({ children, defaultValue }: PropsWithChildren<TabsRootProps>) => {
  const { tokens } = useTheme();
  const [value, setValue] = useState(defaultValue ?? '');

  const list = Children.toArray(children).find(
    (child) =>
      isValidElement(child) && (child.type as PropsWithSymbol)._symbol === TABS_LIST_SYMBOL,
  ) as ReactElement<ComponentProps<typeof View>> | undefined;

  const triggers =
    list && isValidElement(list)
      ? Children.toArray(list.props.children).filter(
          (child): child is ReactElement<ComponentProps<typeof Trigger>> =>
            isValidElement(child) &&
            (child.type as PropsWithSymbol)._symbol === TABS_TRIGGER_SYMBOL,
        )
      : [];

  const index = triggers.findIndex((trigger) => {
    const element = trigger as ReactElement<ComponentProps<typeof Trigger>>;
    const { value: triggerValue } = element.props;

    return triggerValue === value;
  });

  const routes = triggers.map((trigger) => {
    const element = trigger as ReactElement<ComponentProps<typeof Trigger>>;
    const { value } = element.props;

    return {
      key: value,
      title: value,
    };
  }) satisfies Route[];

  const handleOnIndexChange = (
    newIndex: FirstParameter<ComponentProps<typeof TabView>['onIndexChange']>,
  ) => {
    const direction = newIndex > index ? 1 : -1;

    const nextIndex = Array.from({ length: triggers.length })
      .map((_, i) => index + direction * (i + 1))
      .find((i) => i >= 0 && i < triggers.length && !triggers[i]?.props.disabled);

    if (typeof nextIndex === 'number') {
      setValue(routes[nextIndex].key);
    }
  };

  return (
    <TabsContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      <TabView
        navigationState={{ index, routes }}
        onIndexChange={handleOnIndexChange}
        renderScene={({ route }) => {
          const content = Children.toArray(children)
            .filter(
              (child): child is ReactElement<ComponentProps<typeof Content>> =>
                isValidElement(child) &&
                typeof child.props === 'object' &&
                child.props !== null &&
                'value' in child.props,
            )
            .find((child) => child.props.value === route.key);

          const isDisabled = triggers.some(
            (trigger) =>
              isValidElement(trigger) &&
              trigger.props.value === route.key &&
              trigger.props.disabled,
          );

          if (!content || isDisabled) return null;

          return content.props.children;
        }}
        renderTabBar={() => (
          <View style={list?.props.style ?? styles.triggerWrapper({ tokens })}>
            {triggers.map((trigger) => trigger)}
          </View>
        )}
      />
      {children}
    </TabsContext.Provider>
  );
};

export const List = Object.assign(
  ({ children }: PropsWithChildren) => {
    return <View style={styles.list()}>{children}</View>;
  },
  {
    displayName: 'Tabs.List',
    _symbol: TABS_LIST_SYMBOL,
  },
);

type TriggerProps = {
  value: string;
  onPress?: ComponentProps<typeof Pressable>['onPress'];
  disabled?: boolean;
};

export const Trigger = Object.assign(
  ({ value, children, disabled, onPress }: PropsWithChildren<TriggerProps>) => {
    const { value: current, setValue } = useContext(TabsContext);
    const { tokens } = useTheme();
    const isFocused = current === value;

    const handleOnPress = (event: GestureResponderEvent) => {
      if (disabled) return;

      onPress?.(event);
      setValue(value);
    };

    return (
      <Pressable onPress={handleOnPress} style={styles.trigger({ tokens, isFocused })}>
        {typeof children === 'string' ? (
          <Text style={styles.triggerText({ tokens, isFocused })}>{children}</Text>
        ) : (
          children
        )}
      </Pressable>
    );
  },
  {
    displayName: 'Tabs.Trigger',
    _symbol: TABS_TRIGGER_SYMBOL,
  },
);

type ContentProps = {
  value: string;
};

export const Content = ({ children }: PropsWithChildren<ContentProps>) => {
  return <View style={styles.content()}>{children}</View>;
};

Content.displayName = 'Tabs.Content';
