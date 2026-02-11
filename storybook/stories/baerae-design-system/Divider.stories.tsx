import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Divider, DividerInset, DividerSection } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof Divider> = {
  title: '@baerae-zkap/Contents/Divider',
  component: Divider,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

const Container: React.FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => (
  <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  </ScrollView>
);

export const Default: Story = {
  render: () => (
    <Container title="Default Divider">
      <View style={styles.section}>
        <Text style={styles.label}>Basic horizontal divider</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Content above</Text>
          <Divider />
          <Text style={styles.text}>Content below</Text>
        </View>
      </View>
    </Container>
  ),
};

export const Colors: Story = {
  render: () => (
    <Container title="Divider Colors">
      <View style={styles.section}>
        <Text style={styles.label}>default</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Default color</Text>
          <Divider color="default" />
          <Text style={styles.text}>Standard separator</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>strong</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Strong color</Text>
          <Divider color="strong" />
          <Text style={styles.text}>More visible separator</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>subtle</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Subtle color</Text>
          <Divider color="subtle" />
          <Text style={styles.text}>Less visible separator</Text>
        </View>
      </View>
    </Container>
  ),
};

export const WithInset: Story = {
  render: () => (
    <Container title="Divider with Inset">
      <View style={styles.section}>
        <Text style={styles.label}>No inset (full width)</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Item 1</Text>
          <Divider />
          <Text style={styles.text}>Item 2</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Symmetric inset (20px)</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Item 1</Text>
          <Divider inset={20} />
          <Text style={styles.text}>Item 2</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Asymmetric inset (left: 56, right: 0)</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.avatar} />
            <Text style={styles.text}>User with avatar</Text>
          </View>
          <Divider inset={{ left: 56, right: 0 }} />
          <View style={styles.row}>
            <View style={styles.avatar} />
            <Text style={styles.text}>Another user</Text>
          </View>
        </View>
      </View>
    </Container>
  ),
};

export const WithSpacing: Story = {
  render: () => (
    <Container title="Divider with Spacing">
      <View style={styles.section}>
        <Text style={styles.label}>No spacing</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Tight content</Text>
          <Divider />
          <Text style={styles.text}>No gap</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>spacing={8}</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Some content</Text>
          <Divider spacing={8} />
          <Text style={styles.text}>8px margin</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>spacing={16} (section divider)</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Section A</Text>
          <Divider spacing={16} />
          <Text style={styles.text}>Section B</Text>
        </View>
      </View>
    </Container>
  ),
};

export const Thickness: Story = {
  render: () => (
    <Container title="Divider Thickness">
      <View style={styles.section}>
        <Text style={styles.label}>1px (default)</Text>
        <View style={styles.card}>
          <Divider thickness={1} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>2px</Text>
        <View style={styles.card}>
          <Divider thickness={2} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>4px</Text>
        <View style={styles.card}>
          <Divider thickness={4} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>8px (section break)</Text>
        <View style={styles.card}>
          <Divider thickness={8} color="subtle" />
        </View>
      </View>
    </Container>
  ),
};

export const VerticalOrientation: Story = {
  render: () => (
    <Container title="Vertical Divider">
      <View style={styles.section}>
        <Text style={styles.label}>Between inline items</Text>
        <View style={[styles.card, styles.horizontalRow]}>
          <Text style={styles.text}>Left</Text>
          <Divider orientation="vertical" spacing={12} />
          <Text style={styles.text}>Right</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>In a toolbar</Text>
        <View style={[styles.card, styles.toolbar]}>
          <Text style={styles.toolbarItem}>Bold</Text>
          <Divider orientation="vertical" spacing={4} />
          <Text style={styles.toolbarItem}>Italic</Text>
          <Divider orientation="vertical" spacing={4} />
          <Text style={styles.toolbarItem}>Underline</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Strong vertical divider</Text>
        <View style={[styles.card, styles.horizontalRow]}>
          <Text style={styles.text}>Item A</Text>
          <Divider orientation="vertical" color="strong" spacing={16} />
          <Text style={styles.text}>Item B</Text>
          <Divider orientation="vertical" color="strong" spacing={16} />
          <Text style={styles.text}>Item C</Text>
        </View>
      </View>
    </Container>
  ),
};

export const Presets: Story = {
  render: () => (
    <Container title="Divider Presets">
      <View style={styles.section}>
        <Text style={styles.label}>DividerInset (screen paddingX: 20px)</Text>
        <View style={styles.card}>
          <Text style={[styles.text, { paddingHorizontal: 20 }]}>Content with padding</Text>
          <DividerInset />
          <Text style={[styles.text, { paddingHorizontal: 20 }]}>Matching divider inset</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>DividerSection (marginY: 16px)</Text>
        <View style={styles.card}>
          <Text style={styles.text}>Section A content</Text>
          <DividerSection />
          <Text style={styles.text}>Section B content</Text>
        </View>
      </View>
    </Container>
  ),
};

export const ListExample: Story = {
  render: () => (
    <Container title="List with Dividers">
      <View style={styles.card}>
        {['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'].map(
          (fruit, index, arr) => (
            <React.Fragment key={fruit}>
              <View style={styles.listItem}>
                <Text style={styles.listText}>{fruit}</Text>
              </View>
              {index < arr.length - 1 && <Divider inset={20} />}
            </React.Fragment>
          ),
        )}
      </View>
    </Container>
  ),
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#131a1f',
    marginBottom: 24,
  },
  content: {
    gap: 32,
  },
  section: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3e4651',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  text: {
    fontSize: 15,
    color: '#131a1f',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingHorizontal: 16,
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 12,
  },
  toolbarItem: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3e4651',
    paddingHorizontal: 8,
  },
  listItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  listText: {
    fontSize: 16,
    color: '#131a1f',
  },
});
