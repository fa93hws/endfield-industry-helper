import type { Meta, StoryObj } from '@storybook/react';
import { AppLayout } from '@ui/layout/app_layout';

const meta = {
  title: 'UI/AppLayout',
  component: AppLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AppLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    current: 'items',
    children: <h1>Hello World</h1>,
  },
};
