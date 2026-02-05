import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  PropsWithChildren,
  createContext,
  forwardRef,
  useContext,
  useMemo,
} from 'react';
import * as styles from '@/design-system/components/Dialog/Dialog.css';
import * as DialogPrimitive from '@rn-primitives/dialog';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/design-system/providers/ThemeProvider/ThemeProvider';

type RootContextProps = {
  isHideOverlay?: boolean;
};

export const RootContext = createContext<RootContextProps>({} as RootContextProps);

export const Root = ({
  isHideOverlay,
  ...props
}: ComponentProps<typeof DialogPrimitive.Root> & RootContextProps) => {
  const value = useMemo(() => ({ isHideOverlay }), [isHideOverlay]);

  return (
    <RootContext.Provider value={value}>
      <DialogPrimitive.Root {...props} />
    </RootContext.Provider>
  );
};

Root.displayName = DialogPrimitive.Root.displayName;

export const Trigger = forwardRef<
  ElementRef<typeof DialogPrimitive.Trigger>,
  PropsWithChildren<ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>>
>(({ ...props }, ref) => {
  return (
    <View style={styles.triggerLayout()}>
      <View style={styles.triggerRoot()}>
        <DialogPrimitive.Trigger ref={ref} {...props} />
      </View>
    </View>
  );
});

Trigger.displayName = DialogPrimitive.Trigger.displayName;
const Portal = DialogPrimitive.Portal;

export const Close = DialogPrimitive.Close;

const Overlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  PropsWithChildren<ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>> &
    styles.OverlayVariants
>(({ children, ...props }, ref) => {
  const { isHideOverlay } = useContext(ContentContext);

  return (
    <DialogPrimitive.Overlay ref={ref} style={StyleSheet.absoluteFill} {...props}>
      <Animated.View
        entering={FadeIn.duration(250)}
        // exiting={FadeOut.duration(250)}
        // TODO: @JeongEuiwang, router.dismissTo로 이동하면서 Dialog가 꺼질 때, App crash 이슈가 발견되었습니다.
        // exiting 애니메이션이 언마운트된 컴포넌트를 참조하는 것이 문제인 것으로 추측됩니다.
        // https://github.com/callstack/react-native-paper/issues/4809
        // https://github.com/wix/react-native-navigation/issues/8096
        // https://github.com/software-mansion/react-native-reanimated/issues/7493
        // 추후 버전이 업데이트 되어 관련 이슈가 해결되면 주석 해제합니다.
        style={styles.overlay({ isHideOverlay })}
      >
        {children}
      </Animated.View>
    </DialogPrimitive.Overlay>
  );
});

Overlay.displayName = DialogPrimitive.Overlay.displayName;

type ContentContextProps = {
  isHideOverlay?: RootContextProps['isHideOverlay'];
  size?: 'medium' | 'large';
};

export const ContentContext = createContext<ContentContextProps>({} as ContentContextProps);

export const Content = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
    ContentContextProps &
    styles.ContentVariants
>(({ size = 'medium', ...props }, ref) => {
  const { tokens } = useTheme();
  const { isHideOverlay } = useContext(RootContext);
  const value = useMemo(() => ({ isHideOverlay, size }), [isHideOverlay, size]);

  return (
    <Portal>
      <ContentContext.Provider value={value}>
        <Overlay>
          <DialogPrimitive.Content ref={ref} style={styles.content({ tokens, size })} {...props} />
        </Overlay>
      </ContentContext.Provider>
    </Portal>
  );
});

Content.displayName = DialogPrimitive.Content.displayName;

export const Header = ({
  children,
  ...props
}: ComponentProps<typeof View> & styles.HeaderVariants) => {
  const { size } = useContext(ContentContext);

  return (
    <View style={styles.header({ size })} {...props}>
      <View style={styles.headerContent()}>{children}</View>
    </View>
  );
};

Header.displayName = 'Header';

export const Body = ({ ...props }: ComponentProps<typeof View> & styles.BodyVariants) => {
  const { size } = useContext(ContentContext);

  return <View style={styles.body({ size })} {...props} />;
};

Body.displayName = 'Body';

export const Footer = ({ ...props }: ComponentProps<typeof View> & styles.FooterVariants) => {
  const { size } = useContext(ContentContext);

  return <View style={styles.footer({ size })} {...props} />;
};

Footer.displayName = 'Footer';

export const Title = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & styles.TitleVariants
>(({ isHide, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} style={styles.title({ isHide })} {...props} />
));

Title.displayName = DialogPrimitive.Title.displayName;

export const Description = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & styles.DescriptionVariants
>(({ isHide, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    style={styles.description({ isHide })}
    data-dialog-description
    {...props}
  />
));

Description.displayName = DialogPrimitive.Description.displayName;
