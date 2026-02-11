import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native-web-vite';
import { View, Text } from 'react-native';
import { Pagination } from '@baerae-zkap/design-system/native';

const meta: Meta<typeof Pagination> = {
  title: '@baerae-zkap/Navigations/Pagination',
  component: Pagination,
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Total number of pages',
    },
    variant: {
      control: { type: 'select' },
      options: ['extended', 'compact', 'minimize'],
      description: 'Visual variant of pagination',
    },
    siblingCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of pages shown around current page (extended only)',
    },
    boundaryCount: {
      control: { type: 'number', min: 0, max: 5 },
      description: 'Number of pages shown at start/end (extended only)',
    },
    currentPage: {
      table: { disable: true },
      description: 'Current active page (controlled via state)',
    },
    onPageChange: {
      table: { disable: true },
      description: 'Callback when page changes',
    },
    style: {
      table: { disable: true },
    },
    testID: {
      table: { disable: true },
    },
  },
  args: {
    totalPages: 20,
    variant: 'extended',
    siblingCount: 2,
    boundaryCount: 1,
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(6);

    return (
      <View style={{ padding: 20 }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#334155' }}>
          Current Page: {currentPage}
        </Text>
      </View>
    );
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    totalPages: 10,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(5);

    return (
      <View style={{ padding: 20 }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#334155' }}>
          Current Page: {currentPage}
        </Text>
      </View>
    );
  },
};

export const Minimize: Story = {
  args: {
    variant: 'minimize',
    totalPages: 20,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(8);

    return (
      <View style={{ padding: 20 }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#334155' }}>
          Current Page: {currentPage}
        </Text>
      </View>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [extendedPage, setExtendedPage] = useState(6);
    const [compactPage, setCompactPage] = useState(5);
    const [minimizePage, setMinimizePage] = useState(8);

    return (
      <View style={{ padding: 20, gap: 40 }}>
        <View>
          <Text style={{ marginBottom: 12, fontWeight: '600', fontSize: 16, color: '#131a1f' }}>
            Extended (Desktop)
          </Text>
          <Pagination
            totalPages={20}
            currentPage={extendedPage}
            onPageChange={setExtendedPage}
            variant="extended"
          />
          <Text style={{ marginTop: 8, fontSize: 13, color: '#68707a' }}>
            Shows boundary pages and siblings around current page
          </Text>
        </View>

        <View>
          <Text style={{ marginBottom: 12, fontWeight: '600', fontSize: 16, color: '#131a1f' }}>
            Compact (Mobile Web)
          </Text>
          <Pagination
            totalPages={10}
            currentPage={compactPage}
            onPageChange={setCompactPage}
            variant="compact"
          />
          <Text style={{ marginTop: 8, fontSize: 13, color: '#68707a' }}>
            Shows max 7 pages for mobile devices
          </Text>
        </View>

        <View>
          <Text style={{ marginBottom: 12, fontWeight: '600', fontSize: 16, color: '#131a1f' }}>
            Minimize (Space-efficient)
          </Text>
          <Pagination
            totalPages={20}
            currentPage={minimizePage}
            onPageChange={setMinimizePage}
            variant="minimize"
          />
          <Text style={{ marginTop: 8, fontSize: 13, color: '#68707a' }}>
            Most compact: only shows current/total with nav arrows
          </Text>
        </View>
      </View>
    );
  },
};

export const FewPages: Story = {
  args: {
    totalPages: 3,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(2);

    return (
      <View style={{ padding: 20 }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#334155' }}>
          Current Page: {currentPage} (No ellipsis needed)
        </Text>
      </View>
    );
  },
};

export const ManyPages: Story = {
  args: {
    totalPages: 100,
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(50);

    return (
      <View style={{ padding: 20 }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 14, color: '#334155' }}>
          Current Page: {currentPage} / {args.totalPages}
        </Text>
      </View>
    );
  },
};
