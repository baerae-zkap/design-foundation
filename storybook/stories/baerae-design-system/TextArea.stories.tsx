import type { Meta, StoryObj } from '@storybook/react';
import { View, Text } from 'react-native';
import React from 'react';
import { TextArea } from '@baerae-zkap/design-system/native';

const meta = {
  title: '@baerae-zkap/Selection and input/Text area',
  component: TextArea,
  argTypes: {
    value: { table: { disable: true } },
    onChangeText: { table: { disable: true } },
    autoGrow: { table: { disable: true } },
    helperText: { table: { disable: true } },
    bottomLeading: { table: { disable: true } },
    bottomTrailing: { table: { disable: true } },
    height: { table: { disable: true } },
    minHeight: { table: { disable: true } },
    maxHeight: { table: { disable: true } },
    style: { table: { disable: true } },
    testID: { table: { disable: true } },
    accessibilityLabel: { table: { disable: true } },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    required: {
      control: 'boolean',
      description: 'Show required badge (*)',
    },
    description: {
      control: 'text',
      description: 'Helper/description text',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only state',
    },
    resize: {
      control: 'inline-radio',
      options: ['normal', 'limited', 'fixed'],
      description: 'Height resize behavior',
    },
    numberOfLines: {
      control: 'number',
      description: 'Number of visible lines',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character length',
    },
    showCount: {
      control: 'boolean',
      description: 'Show character count',
    },
  },
  args: {
    placeholder: 'Enter your text here...',
    label: 'Description',
    description: '',
    errorMessage: '',
    resize: 'limited',
    numberOfLines: 5,
    maxLength: 500,
    error: false,
    disabled: false,
    readOnly: false,
    required: false,
    showCount: false,
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || '');
    return (
      <View style={{ padding: 20 }}>
        <TextArea {...args} value={value} onChangeText={setValue} />
      </View>
    );
  },
};

export const Resize: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Normal (Unlimited auto-grow)
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
            Height grows infinitely with content
          </Text>
          <TextArea
            value={value1}
            onChangeText={setValue1}
            placeholder="Type multiple lines to see unlimited growth..."
            label="Normal resize"
            resize="normal"
            numberOfLines={3}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Limited (Auto-grow with max height)
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
            Grows up to ~3 lines, then scrolls
          </Text>
          <TextArea
            value={value2}
            onChangeText={setValue2}
            placeholder="Type to see limited growth..."
            label="Limited resize"
            resize="limited"
            numberOfLines={3}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Fixed (Scrollable content)
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
            Fixed height, content scrolls inside
          </Text>
          <TextArea
            value={value3}
            onChangeText={setValue3}
            placeholder="Type to see scrolling..."
            label="Fixed resize"
            resize="fixed"
            numberOfLines={3}
          />
        </View>
      </View>
    );
  },
};

export const States: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('Focused state - click to see border change');
    const [value3, setValue3] = React.useState('Error state text');
    const [value4, setValue4] = React.useState('Disabled state text');
    const [value5, setValue5] = React.useState('Read-only state text');

    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Default
          </Text>
          <TextArea
            value={value1}
            onChangeText={setValue1}
            placeholder="Enter text..."
            label="Description"
            description="This is a helper text"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Focused (Click to focus)
          </Text>
          <TextArea
            value={value2}
            onChangeText={setValue2}
            label="Description"
            description="Border changes when focused"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Error
          </Text>
          <TextArea
            value={value3}
            onChangeText={setValue3}
            label="Description"
            error
            errorMessage="This field is required"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Disabled
          </Text>
          <TextArea
            value={value4}
            onChangeText={setValue4}
            label="Description"
            disabled
            description="This field is disabled"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Read-only
          </Text>
          <TextArea
            value={value5}
            onChangeText={setValue5}
            label="Description"
            readOnly
            description="This field is read-only"
          />
        </View>
      </View>
    );
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('This text has a character limit.');

    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Character Count - Bottom Right
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
            Shows "0/200" format in bottom bar
          </Text>
          <TextArea
            value={value1}
            onChangeText={setValue1}
            placeholder="Enter text..."
            label="Description"
            maxLength={200}
            showCount
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            With Description + Count
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
            Count appears separately when description is present
          </Text>
          <TextArea
            value={value2}
            onChangeText={setValue2}
            label="Short description"
            description="Keep it brief and clear"
            maxLength={100}
            showCount
          />
        </View>
      </View>
    );
  },
};

export const WithDescription: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            With Label Only
          </Text>
          <TextArea
            value={value1}
            onChangeText={setValue1}
            placeholder="Enter feedback..."
            label="Feedback"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            With Label + Description
          </Text>
          <TextArea
            value={value2}
            onChangeText={setValue2}
            placeholder="Describe the issue..."
            label="Issue Description"
            description="Be as detailed as possible"
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            With Required Badge
          </Text>
          <TextArea
            value={value3}
            onChangeText={setValue3}
            placeholder="Write your comment..."
            label="Comment"
            required
            description="This field is required"
          />
        </View>
      </View>
    );
  },
};

export const BottomContent: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');

    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Bottom Leading Content
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
            Custom content on the left side
          </Text>
          <TextArea
            value={value1}
            onChangeText={setValue1}
            placeholder="Enter text..."
            label="Description"
            bottomLeading={
              <Text style={{ fontSize: 12, color: '#6b7280' }}>
                Min 10 characters
              </Text>
            }
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Bottom Leading + Trailing
          </Text>
          <Text style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>
            Custom content on both sides
          </Text>
          <TextArea
            value={value2}
            onChangeText={setValue2}
            placeholder="Enter text..."
            label="Description"
            bottomLeading={
              <Text style={{ fontSize: 12, color: '#6b7280' }}>
                Min 10 characters
              </Text>
            }
            bottomTrailing={
              <Text style={{ fontSize: 12, color: '#2563eb' }}>
                Formatting help
              </Text>
            }
          />
        </View>
      </View>
    );
  },
};

export const Heights: Story = {
  render: () => {
    const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [value3, setValue3] = React.useState('');

    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Fixed Height (120px)
          </Text>
          <TextArea
            value={value1}
            onChangeText={setValue1}
            placeholder="Enter text..."
            label="Fixed 120px"
            height={120}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Min Height (80px, auto-grow)
          </Text>
          <TextArea
            value={value2}
            onChangeText={setValue2}
            placeholder="Enter text..."
            label="Min 80px"
            resize="normal"
            minHeight={80}
          />
        </View>

        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#6b7280' }}>
            Min-Max Height (60px - 150px)
          </Text>
          <TextArea
            value={value3}
            onChangeText={setValue3}
            placeholder="Enter text..."
            label="Limited growth"
            resize="limited"
            minHeight={60}
            maxHeight={150}
          />
        </View>
      </View>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [feedback, setFeedback] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [notes, setNotes] = React.useState('');

    return (
      <View style={{ gap: 24, padding: 20 }}>
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
            Feedback Form
          </Text>

          <TextArea
            value={feedback}
            onChangeText={setFeedback}
            placeholder="What do you think about our service?"
            label="Overall Feedback"
            required
            description="Share your honest opinion"
            resize="limited"
            numberOfLines={3}
          />

          <TextArea
            value={details}
            onChangeText={setDetails}
            placeholder="Describe any specific issues or suggestions..."
            label="Details"
            description="Optional - any additional context"
            resize="normal"
            numberOfLines={5}
            maxLength={500}
            showCount
          />

          <TextArea
            value={notes}
            onChangeText={setNotes}
            placeholder="Any other comments..."
            label="Additional Notes"
            resize="fixed"
            numberOfLines={4}
            maxLength={200}
            showCount
          />
        </View>
      </View>
    );
  },
};
