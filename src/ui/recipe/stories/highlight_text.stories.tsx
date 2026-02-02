import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';
import { HighlightText } from '../highlight_text';

const meta = {
  title: 'UI/Recipe/HighlightText',
  component: HighlightText,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ p: 2 }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof HighlightText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NoQuery: Story = {
  args: {
    text: '碳素材料',
    query: '',
    variant: 'body2',
  },
};

export const MatchFound: Story = {
  args: {
    text: '碳素材料',
    query: '碳',
    variant: 'body2',
  },
};

export const NoMatch: Story = {
  args: {
    text: '碳素材料',
    query: '水',
    variant: 'body2',
  },
};

export const HighlightBeginning: Story = {
  args: {
    text: '紫晶装备原件',
    query: '紫',
    variant: 'body2',
  },
};

export const HighlightMiddle: Story = {
  args: {
    text: '紫晶装备原件',
    query: '装备',
    variant: 'body2',
  },
};

export const HighlightEnd: Story = {
  args: {
    text: '紫晶装备原件',
    query: '原件',
    variant: 'body2',
  },
};

export const HighlightEntireText: Story = {
  args: {
    text: '碳',
    query: '碳',
    variant: 'body2',
  },
};

export const CaseInsensitive: Story = {
  args: {
    text: 'Carbon Powder',
    query: 'car',
    variant: 'body2',
  },
};

export const VariantBody1: Story = {
  args: {
    text: '碳素材料',
    query: '碳',
    variant: 'body1',
  },
};

export const VariantCaption: Story = {
  args: {
    text: '碳素材料',
    query: '碳',
    variant: 'caption',
  },
};

export const LongText: Story = {
  args: {
    text: '这是一个很长的文本用来测试高亮显示功能',
    query: '高亮',
    variant: 'body2',
  },
};

export const MultipleWords: Story = {
  args: {
    text: '紫晶装备原件制造配方',
    query: '装备原件',
    variant: 'body2',
  },
};
