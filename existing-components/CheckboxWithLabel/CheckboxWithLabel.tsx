import { Checkbox } from '@/design-system/components/Checkbox/Checkbox';
import * as styles from '@/design-system/components/CheckboxWithLabel/CheckboxWithLabel.css';
import * as labelStyles from '@/design-system/components/Label/Label.css';
import * as Label from '@/design-system/components/Label/Label';
import { ComponentProps, PropsWithChildren, useId } from 'react';
import { View } from 'react-native';
import { Layout } from '@/design-system/components/Layout/Layout';

type CheckboxWithLabelProps = { checkboxPosition?: 'left' | 'right' } & Omit<
  ComponentProps<typeof Checkbox> &
    ComponentProps<typeof Label.Text> &
    PropsWithChildren &
    styles.CheckboxWithLabelVariants &
    labelStyles.LabelVariants,
  'ref'
>;

const CheckboxWithLabelPrimitive = ({
  children,
  disabled,
  id,
  checked,
  onCheckedChange,
  layout = 'hug',
  checkboxPosition = 'left',
  ...props
}: Readonly<CheckboxWithLabelProps>) => {
  const uniqueId = useId();

  return (
    <Label.Root
      style={styles.checkboxWithLabel({ disabled })}
      onPress={() => onCheckedChange?.(!checked)}
    >
      {checkboxPosition === 'left' && (
        <View style={styles.checkbox()}>
          <Checkbox
            nativeID={`${id || uniqueId}`}
            disabled={disabled}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </View>
      )}
      <Label.Text
        layout={layout}
        accessibilityLabelledBy={`${id || uniqueId}`}
        disabled={disabled}
        {...props}
      >
        {children}
      </Label.Text>
      {checkboxPosition === 'right' && (
        <View style={styles.checkbox()}>
          <Checkbox
            nativeID={`${id || uniqueId}`}
            disabled={disabled}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </View>
      )}
    </Label.Root>
  );
};

export const CheckboxWithLabel = ({
  layout = 'hug',
  ...props
}: ComponentProps<typeof CheckboxWithLabelPrimitive> & ComponentProps<typeof Layout>) => {
  return (
    <Layout layout={layout}>
      <CheckboxWithLabelPrimitive layout={layout} {...props} />
    </Layout>
  );
};

CheckboxWithLabel.displayName = 'CheckboxWithLabel';
