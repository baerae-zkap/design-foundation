import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TimePicker } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Selection and input/Time picker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // Hidden non-interactive props (state-managed, deprecated, style)
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    mode: { table: { disable: true } }, // deprecated: use format instead
    helperText: { table: { disable: true } }, // deprecated: use description instead
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
    // Visible interactive controls
    format: {
      control: 'inline-radio',
      options: ['HH:mm', 'A hh:mm', 'A hh:mm:ss', 'HH:mm:ss'],
      description: 'Time format',
    },
    minuteInterval: {
      control: 'inline-radio',
      options: [1, 5, 10, 15, 30],
      description: 'Minute interval',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Field size',
    },
    label: { control: 'text', description: 'Label text' },
    placeholder: { control: 'text', description: 'Placeholder text' },
    description: { control: 'text', description: 'Description text' },
    errorMessage: { control: 'text', description: 'Error message' },
    required: { control: 'boolean', description: 'Show required badge (*)' },
    disabled: { control: 'boolean', description: 'Disabled state' },
    readOnly: { control: 'boolean', description: 'Read-only state' },
    error: { control: 'boolean', description: 'Error state' },
    showActionArea: { control: 'boolean', description: 'Show action area' },
  },
  args: {
    label: 'Time',
    placeholder: 'Select time',
    description: '', // empty string default to prevent "Set string" button
    errorMessage: '', // empty string default to prevent "Set string" button
    format: 'A hh:mm',
    minuteInterval: 1,
    size: 'medium',
    disabled: false,
    readOnly: false,
    required: false,
    error: false,
    showActionArea: true,
  },
  decorators: [
    (Story) => (
      <View style={{ width: 340, padding: 20 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default TimePicker with interactive controls
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<Date | null>(null);
    return <TimePicker {...args} value={value} onChange={setValue} />;
  },
};

/**
 * Time format variants: HH:mm, A hh:mm, A hh:mm:ss, HH:mm:ss
 */
export const Formats: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value2, setValue2] = useState<Date | null>(null);
    const [value3, setValue3] = useState<Date | null>(null);
    const [value4, setValue4] = useState<Date | null>(null);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            HH:mm (24시간 시:분)
          </Text>
          <TimePicker
            label="출발 시간"
            placeholder="시간 선택"
            format="HH:mm"
            value={value1}
            onChange={setValue1}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            A hh:mm (12시간 오전/오후 시:분)
          </Text>
          <TimePicker
            label="약속 시간"
            placeholder="시간 선택"
            format="A hh:mm"
            value={value2}
            onChange={setValue2}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            A hh:mm:ss (12시간 오전/오후 시:분:초)
          </Text>
          <TimePicker
            label="정확한 시간"
            placeholder="시간 선택"
            format="A hh:mm:ss"
            value={value3}
            onChange={setValue3}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            HH:mm:ss (24시간 시:분:초)
          </Text>
          <TimePicker
            label="정확한 시간"
            placeholder="시간 선택"
            format="HH:mm:ss"
            value={value4}
            onChange={setValue4}
          />
        </View>
      </View>
    );
  },
};

/**
 * Sizes: Small (36px), Medium (44px), Large (52px)
 */
export const Sizes: Story = {
  render: () => {
    const [valueSmall, setValueSmall] = useState<Date | null>(null);
    const [valueMedium, setValueMedium] = useState<Date | null>(null);
    const [valueLarge, setValueLarge] = useState<Date | null>(null);

    return (
      <View style={{ gap: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Small (36px)
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간 선택"
            size="small"
            value={valueSmall}
            onChange={setValueSmall}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Medium (44px)
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간 선택"
            size="medium"
            value={valueMedium}
            onChange={setValueMedium}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Large (52px)
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간 선택"
            size="large"
            value={valueLarge}
            onChange={setValueLarge}
          />
        </View>
      </View>
    );
  },
};

/**
 * States: Normal, With Value, Error, Disabled, Read-only
 */
export const States: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState<Date | null>(null);
    const [withValue, setWithValue] = useState<Date | null>(() => {
      const date = new Date();
      date.setHours(14, 30, 0, 0);
      return date;
    });
    const [errorValue, setErrorValue] = useState<Date | null>(null);
    const [disabledValue] = useState<Date | null>(() => {
      const date = new Date();
      date.setHours(14, 30, 0, 0);
      return date;
    });
    const [readOnlyValue] = useState<Date | null>(() => {
      const date = new Date();
      date.setHours(14, 30, 0, 0);
      return date;
    });

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Normal (Empty)
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간을 선택하세요"
            value={normalValue}
            onChange={setNormalValue}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            With Value
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간을 선택하세요"
            value={withValue}
            onChange={setWithValue}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Error
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간을 선택하세요"
            error={true}
            errorMessage="시간을 선택해주세요"
            value={errorValue}
            onChange={setErrorValue}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Disabled
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간을 선택하세요"
            disabled={true}
            value={disabledValue}
            onChange={() => {}}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Read-only
          </Text>
          <TimePicker
            label="시간"
            placeholder="시간을 선택하세요"
            readOnly={true}
            value={readOnlyValue}
            onChange={() => {}}
          />
        </View>
      </View>
    );
  },
};

/**
 * Description variations: Label only, Label + Description, Label + Required, etc.
 */
export const WithDescription: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value2, setValue2] = useState<Date | null>(null);
    const [value3, setValue3] = useState<Date | null>(null);
    const [value4, setValue4] = useState<Date | null>(null);

    return (
      <View style={{ gap: 20 }}>
        <TimePicker
          label="Label only"
          placeholder="시간을 선택하세요"
          value={value1}
          onChange={setValue1}
        />
        <TimePicker
          label="Label + Description"
          placeholder="시간을 선택하세요"
          description="시간을 정확히 입력해주세요"
          value={value2}
          onChange={setValue2}
        />
        <TimePicker
          label="Label + Required"
          placeholder="시간을 선택하세요"
          required={true}
          value={value3}
          onChange={setValue3}
        />
        <TimePicker
          label="Label + Required + Description"
          placeholder="시간을 선택하세요"
          required={true}
          description="필수 입력 항목입니다"
          value={value4}
          onChange={setValue4}
        />
      </View>
    );
  },
};

/**
 * Minute intervals: 1, 5, 15, 30 minutes
 */
export const MinuteIntervals: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value5, setValue5] = useState<Date | null>(null);
    const [value15, setValue15] = useState<Date | null>(null);
    const [value30, setValue30] = useState<Date | null>(null);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            1 minute interval
          </Text>
          <TimePicker
            label="정확한 시간"
            placeholder="시간 선택"
            minuteInterval={1}
            value={value1}
            onChange={setValue1}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            5 minute interval
          </Text>
          <TimePicker
            label="약속 시간"
            placeholder="시간 선택"
            minuteInterval={5}
            value={value5}
            onChange={setValue5}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            15 minute interval
          </Text>
          <TimePicker
            label="회의 시간"
            placeholder="시간 선택"
            minuteInterval={15}
            value={value15}
            onChange={setValue15}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            30 minute interval
          </Text>
          <TimePicker
            label="예약 시간"
            placeholder="시간 선택"
            minuteInterval={30}
            value={value30}
            onChange={setValue30}
          />
        </View>
      </View>
    );
  },
};

/**
 * Action area: With and without confirm/cancel buttons
 */
export const ActionArea: Story = {
  render: () => {
    const [value1, setValue1] = useState<Date | null>(null);
    const [value2, setValue2] = useState<Date | null>(null);

    return (
      <View style={{ gap: 24 }}>
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            With Action Area (default)
          </Text>
          <TimePicker
            label="약속 시간"
            placeholder="시간 선택"
            description="확인/취소 버튼이 표시됩니다"
            showActionArea={true}
            value={value1}
            onChange={setValue1}
          />
        </View>

        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            Without Action Area
          </Text>
          <TimePicker
            label="빠른 선택"
            placeholder="시간 선택"
            description="선택 시 바로 적용됩니다"
            showActionArea={false}
            value={value2}
            onChange={setValue2}
          />
        </View>
      </View>
    );
  },
};

/**
 * Form example with multiple time pickers
 */
export const FormExample: Story = {
  render: () => {
    const [departureTime, setDepartureTime] = useState<Date | null>(null);
    const [arrivalTime, setArrivalTime] = useState<Date | null>(null);
    const [alarmTime, setAlarmTime] = useState<Date | null>(null);

    return (
      <View style={{ gap: 20 }}>
        <TimePicker
          label="출발 시간"
          placeholder="출발 시간 선택"
          format="A hh:mm"
          required={true}
          value={departureTime}
          onChange={setDepartureTime}
        />
        <TimePicker
          label="도착 시간"
          placeholder="도착 시간 선택"
          format="A hh:mm"
          description="예상 도착 시간을 선택하세요"
          value={arrivalTime}
          onChange={setArrivalTime}
        />
        <TimePicker
          label="알람 시간"
          placeholder="알람 시간 선택"
          format="HH:mm"
          minuteInterval={5}
          description="5분 단위로 설정 가능합니다"
          value={alarmTime}
          onChange={setAlarmTime}
        />
      </View>
    );
  },
};
