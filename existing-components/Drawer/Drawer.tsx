'use client';

import {
  ComponentProps,
  createContext,
  forwardRef,
  PropsWithChildren,
  useMemo,
  ElementType,
  useCallback,
  ReactElement,
  cloneElement,
  isValidElement,
  useContext,
  RefObject,
  useEffect,
  useRef,
  ForwardedRef,
  useId,
  useLayoutEffect,
} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetSectionList,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetVirtualizedList,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet';
import * as styles from '@/design-system/components/Drawer/Drawer.css';
import * as boxStyles from '@/design-system/components/Box/Box.css';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';
import { AsChildProps, PolymorphicComponentProps } from '@/design-system/types/utility';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
  BackHandler,
} from 'react-native';
import { Layout } from '@/design-system/components/Layout/Layout';
import { useFocusEffect } from 'expo-router';
import { useControllableState } from '@rn-primitives/hooks';
import { Maybe } from '@/types/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const contentElements = {
  view: BottomSheet,
  modal: BottomSheetModal,
} as const;

type CustomContentElement = keyof typeof contentElements;

type Drawer = {
  id: string;
  as: CustomContentElement;
  ref: RefObject<Maybe<BottomSheetModal> | Maybe<BottomSheet>>;
  open: boolean;
  setOpen: (v: boolean) => void;
  onOpenChange?: (v: boolean) => void;
};

type DrawerMap = Record<string, Drawer>;

type ProviderContextType = {
  register: (props: { id: string; drawer: Drawer }) => void;
  unregister: (id: string) => void;
  getDrawer: (id: string) => Drawer | undefined;
  getDrawers: () => DrawerMap;
};

export const ProviderContext = createContext<ProviderContextType | null>(null);

const useDrawerProvider = () => {
  const context = useContext(ProviderContext);

  if (!context) throw new Error('useDrawerProvider must be used within Drawer.Provider');

  return context;
};

export const Provider = ({ children }: PropsWithChildren) => {
  const drawers: Record<string, Drawer> = useMemo(() => {
    return {};
  }, []);

  const register = useCallback(
    ({ id, drawer }: { id: string; drawer: Drawer }) => {
      drawers[id] = drawer;
    },
    [drawers],
  );

  const unregister = useCallback(
    (id: string) => {
      delete drawers[id];
    },
    [drawers],
  );

  const value = useMemo(
    () =>
      ({
        register,
        unregister,
        getDrawer: (id: string) => drawers[id],
        getDrawers: () => drawers,
      }) satisfies ProviderContextType,
    [drawers, register, unregister],
  );

  return (
    <ProviderContext.Provider value={value}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ProviderContext.Provider>
  );
};

type RootContextType = {
  id: string;
  as: CustomContentElement;
};

const RootContext = createContext<RootContextType | null>(null);

const useDrawerRoot = () => {
  const context = useContext(RootContext);

  if (!context) throw new Error('useDrawerRoot must be used within Drawer.Content');

  return context;
};

type RootProps = {
  as?: CustomContentElement;
  ref?: RefObject<BottomSheetModal | BottomSheet>;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type RootComponent = <T extends CustomContentElement = 'modal'>(
  props: PolymorphicComponentProps<typeof contentElements, T> &
    Pick<RootProps, 'open' | 'onOpenChange' | 'defaultOpen'>,
) => ReactElement;

const RootPrimitive = <T extends CustomContentElement = 'modal'>(
  {
    as = 'modal',
    children,
    open,
    defaultOpen,
    onOpenChange,
  }: Pick<PolymorphicComponentProps<typeof contentElements, T>, 'as' | 'children'> &
    Pick<RootProps, 'open' | 'onOpenChange' | 'defaultOpen'>,
  ref: ForwardedRef<BottomSheetModal | BottomSheet>,
) => {
  const id = useId();
  const { register, unregister, getDrawer } = useDrawerProvider();

  const [internalOpen = false, setInternalOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const drawerRef = useRef<BottomSheetModal | BottomSheet>(null);
  const mergedRef = (ref ?? drawerRef) as unknown as typeof drawerRef;

  const drawer = useMemo(
    () =>
      ({
        id,
        as,
        ref: mergedRef,
        open: internalOpen,
        setOpen: setInternalOpen,
        onOpenChange,
      }) satisfies Drawer,
    [id, as, mergedRef, internalOpen, setInternalOpen, onOpenChange],
  );

  const value = useMemo(() => ({ id, as }) satisfies RootContextType, [id, as]);
  const existingDrawer = getDrawer(id);

  if (!existingDrawer || existingDrawer !== drawer) {
    register({ id, drawer });
  }

  useLayoutEffect(() => {
    return () => unregister(id);
  }, [id, unregister]);

  useEffect(() => {
    if (as === 'modal' && mergedRef) {
      const ref = mergedRef as RefObject<BottomSheetModal>;

      if (internalOpen) {
        ref.current?.present?.();
        drawer.open = true;
      } else {
        ref.current?.dismiss?.();
        drawer.open = false;
      }
    }
  }, [as, mergedRef, internalOpen, drawer]);

  useFocusEffect(
    useCallback(() => {
      const ref = drawerRef as RefObject<BottomSheetModal>;

      if (as === 'modal' && ref.current && internalOpen) {
        ref.current.present();
        drawer.open = true;
      }

      return () => {
        if (as === 'modal' && ref.current && internalOpen) {
          ref.current.dismiss();
          drawer.open = false;
        }
      };
    }, [as, drawer, internalOpen]),
  );

  return <RootContext.Provider value={value}>{children}</RootContext.Provider>;
};

export const Root = forwardRef(RootPrimitive) as RootComponent;

export const Overlay = ({
  opacity = 0.4,
  ...props
}: ComponentProps<typeof BottomSheetBackdrop>) => (
  <BottomSheetBackdrop opacity={opacity} {...props} />
);

type ContentContextType = {
  id: string;
};

const ContentContext = createContext<ContentContextType | null>(null);

const useDrawerContent = () => {
  const context = useContext(ContentContext);

  if (!context) throw new Error('useDrawerContent must be used within Drawer.Content');

  return context;
};

type ContentProps = {
  isHideOverlay?: boolean;
  disableActionToClose?: boolean;
};

export const Content = <T extends CustomContentElement = 'modal'>({
  children,
  isHideOverlay,
  isHideHandle,
  borderRadius = 'xl',
  onChange,
  disableActionToClose,
  ...props
}: Omit<
  PolymorphicComponentProps<typeof contentElements, T>,
  'as' | 'ref' | 'enablePanDownToClose'
> &
  ContentProps &
  styles.ContentVariants &
  styles.HandleVariants &
  styles.IndicatorVariants) => {
  const { getDrawer, getDrawers } = useDrawerProvider();
  const { id, as } = useDrawerRoot();
  const drawer = getDrawer(id);
  const Element = contentElements[as ?? 'modal'] as ElementType;
  const { tokens } = useTheme();
  const value = useMemo(() => ({ id }), [id]);

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <Overlay
        {...backdropProps}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={disableActionToClose ? 'none' : 'close'}
      />
    ),
    [disableActionToClose],
  );

  if (!drawer) {
    throw new Error(`[Drawer.Content] Drawer with id "${id}" is not registered.`);
  }

  const handleOnChange = (index: number, position: number, type: SNAP_POINT_TYPE) => {
    onChange?.(index, position, type);

    if (index === 0) {
      drawer?.setOpen?.(true);

      return;
    }

    if (index === -1) {
      drawer?.setOpen?.(false);

      return;
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        const drawers = getDrawers();
        const currentOpenDrawer = Object.values(drawers).find(({ open }) => open);

        if (currentOpenDrawer && currentOpenDrawer.as === 'modal' && !disableActionToClose) {
          currentOpenDrawer.setOpen?.(false);

          return true;
        }

        return false;
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [disableActionToClose, getDrawers]),
  );

  return (
    <Element
      {...props}
      ref={drawer?.ref}
      backgroundStyle={styles.content({ tokens, borderRadius })}
      handleStyle={styles.handle({ tokens, isHideHandle })}
      handleIndicatorStyle={styles.indicator({ tokens, isHideHandle })}
      {...(isHideOverlay ? {} : { backdropComponent: renderBackdrop })}
      onChange={handleOnChange}
      enablePanDownToClose={!disableActionToClose}
    >
      <ContentContext.Provider value={value}>
        {!isHideHandle ? (
          children
        ) : (
          <View style={styles.content({ tokens, borderRadius })}>{children}</View>
        )}
      </ContentContext.Provider>
    </Element>
  );
};

type PressableLikeProps = {
  onPress?: (event: GestureResponderEvent) => void;
};

export const Trigger = ({
  asChild,
  onPress,
  children,
  ...rest
}: AsChildProps<ComponentProps<typeof Pressable>>) => {
  const { id } = useDrawerRoot();
  const { getDrawer } = useDrawerProvider();
  const drawer = getDrawer(id);

  if (!drawer) {
    throw new Error(`[Drawer.Trigger] Drawer with id "${id}" is not registered.`);
  }

  const handleOnPress = useCallback(
    (event: GestureResponderEvent) => {
      drawer?.setOpen?.(true);
      onPress?.(event);
    },
    [onPress, drawer],
  );

  if (asChild) {
    if (!isValidElement<PressableLikeProps>(children)) {
      throw new Error(
        'Drawer.Trigger with asChild=true requires a single React element as a child.',
      );
    }

    const childOnPress = children.props?.onPress;

    const mergedOnPress = (event: GestureResponderEvent) => {
      handleOnPress(event);
      childOnPress?.(event);
    };

    return cloneElement(children as ReactElement<PressableLikeProps>, {
      onPress: mergedOnPress,
    });
  }

  return (
    <Pressable onPress={handleOnPress} {...rest}>
      {children}
    </Pressable>
  );
};

export const Close = ({
  asChild,
  onPress,
  children,
  ...rest
}: AsChildProps<ComponentProps<typeof Pressable>>) => {
  const { id } = useDrawerContent();
  const { getDrawer } = useDrawerProvider();
  const drawer = getDrawer(id);

  if (!drawer) {
    throw new Error(`[Drawer.Close] Drawer with id "${id}" is not registered.`);
  }

  const handleOnPress = useCallback(
    (event: GestureResponderEvent) => {
      drawer?.setOpen?.(false);
      onPress?.(event);
    },
    [onPress, drawer],
  );

  if (asChild) {
    if (!isValidElement<PressableLikeProps>(children)) {
      throw new Error('Drawer.Close with asChild=true requires a single React element as a child.');
    }

    const childOnPress = children.props?.onPress;

    const mergedOnPress = (event: GestureResponderEvent) => {
      handleOnPress(event);
      childOnPress?.(event);
    };

    return cloneElement(children as ReactElement<PressableLikeProps>, {
      onPress: mergedOnPress,
    });
  }

  return (
    <Pressable onPress={handleOnPress} {...rest}>
      {children}
    </Pressable>
  );
};

const boxElements = {
  view: BottomSheetView,
  scrollView: BottomSheetScrollView,
} as const;

type CustomBoxElement = keyof typeof boxElements;

const BoxPrimitive = <T extends CustomBoxElement = 'view'>({
  as,
  layout = 'hug',
  orientation = 'horizontal',
  gap,
  sideGap,
  paddingTop,
  paddingBottom,
  color,
  align,
  style,
  ...props
}: Omit<PolymorphicComponentProps<typeof boxElements, T>, 'layout'> & boxStyles.BoxVariants) => {
  const Element = boxElements[as ?? 'view'] as ElementType;
  const { tokens } = useTheme();
  const safeArea = useSafeAreaInsets();
  const isContentStyle = as === 'scrollView';

  const combinedStyle = [
    boxStyles.box({
      tokens,
      safeArea,
      layout: isContentStyle && layout === 'fill' ? 'scrollViewFill' : layout,
      orientation,
      gap,
      sideGap,
      paddingTop,
      paddingBottom,
      color,
      align,
    }),
    style,
  ] satisfies StyleProp<ViewStyle>;

  return (
    <Element
      {...(isContentStyle ? { contentContainerStyle: combinedStyle } : { style: combinedStyle })}
      {...props}
    />
  );
};

export function Box<T extends CustomBoxElement = 'view'>({
  layout = 'hug',
  ...props
}: ComponentProps<typeof BoxPrimitive<T>> & ComponentProps<typeof Layout>) {
  return (
    <Layout layout={layout}>
      <BoxPrimitive layout={layout} {...props} />
    </Layout>
  );
}

export function FlatList<T>(props: ComponentProps<typeof BottomSheetFlatList<T>>) {
  return <BottomSheetFlatList<T> {...props} />;
}

export function FlashList<T>(props: ComponentProps<typeof BottomSheetFlashList<T>>) {
  return <BottomSheetFlashList<T> {...props} />;
}

export function SectionList<T>(props: ComponentProps<typeof BottomSheetSectionList<T>>) {
  return <BottomSheetSectionList<T> {...props} />;
}

export function VirtualizedList<T>(props: ComponentProps<typeof BottomSheetVirtualizedList<T>>) {
  return <BottomSheetVirtualizedList<T> {...props} />;
}

export const Footer = ({ ...props }: ComponentProps<typeof BottomSheetFooter>) => (
  <BottomSheetFooter {...props} />
);

Footer.displayName = 'Footer';

export const TextInput = ({ ...props }: ComponentProps<typeof BottomSheetTextInput>) => (
  <BottomSheetTextInput {...props} />
);

TextInput.displayName = 'TextInput';
