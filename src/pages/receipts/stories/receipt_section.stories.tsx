import type { Meta, StoryObj } from '@storybook/react';
import { ReceiptSection } from '../receipt_section';
import { Receipt } from '@data/receipts/type';
import { Stack } from '@mui/material';

const meta = {
  title: 'Pages/Receipts/ReceiptSection',
  component: ReceiptSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ReceiptSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const bottleRecipes: Receipt[] = [
  {
    inputs: [{ item: 'amethystFiber', perMin: 60 }],
    outputs: [{ item: 'amethystBottle', perMin: 30 }],
  },
  {
    inputs: [{ item: 'ferrium', perMin: 60 }],
    outputs: [{ item: 'ferriumBottle', perMin: 30 }],
  },
  {
    inputs: [{ item: 'steel', perMin: 60 }],
    outputs: [{ item: 'steelBottle', perMin: 30 }],
  },
];

const componentRecipes: Receipt[] = [
  {
    inputs: [
      { item: 'origocrust', perMin: 30 },
      { item: 'amethystFiber', perMin: 30 },
    ],
    outputs: [{ item: 'amethystComponent', perMin: 6 }],
  },
  {
    inputs: [
      { item: 'origocrust', perMin: 60 },
      { item: 'ferrium', perMin: 60 },
    ],
    outputs: [{ item: 'ferriumComponent', perMin: 6 }],
  },
];

const carbonRecipes: Receipt[] = [
  {
    inputs: [{ item: 'buckflower', perMin: 30 }],
    outputs: [{ item: 'carbon', perMin: 30 }],
  },
  {
    inputs: [{ item: 'sandleaf', perMin: 30 }],
    outputs: [{ item: 'carbon', perMin: 30 }],
  },
  {
    inputs: [{ item: 'originiumOre', perMin: 60 }],
    outputs: [{ item: 'carbon', perMin: 30 }],
  },
  {
    inputs: [
      { item: 'sandleafPowder', perMin: 30 },
      { item: 'carbonPowder', perMin: 60 },
    ],
    outputs: [{ item: 'denseCarbonPowder', perMin: 30 }],
  },
];

export const OneSection: Story = {
  args: {
    title: '瓶子',
    recipes: bottleRecipes,
  },
  render: (args) => (
    <Stack spacing={2}>
      <ReceiptSection {...args} />
    </Stack>
  ),
};

export const TwoSections: Story = {
  args: {
    title: '瓶子',
    recipes: bottleRecipes,
  },
  render: () => (
    <Stack spacing={2}>
      <ReceiptSection title="瓶子" recipes={bottleRecipes} />
      <ReceiptSection title="装备组件" recipes={componentRecipes} />
    </Stack>
  ),
};

export const TwoSectionsWithSharedOutputs: Story = {
  args: {
    title: '矿石',
    recipes: carbonRecipes,
  },
  render: () => (
    <Stack spacing={2}>
      <ReceiptSection title="矿石" recipes={carbonRecipes} />
      <ReceiptSection title="装备组件" recipes={componentRecipes} />
    </Stack>
  ),
};
