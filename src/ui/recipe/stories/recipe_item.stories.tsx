import type { Receipt } from '@receipts';
import type { Meta, StoryObj } from '@storybook/react';
import { RecipeItem } from '../recipe_item';

const meta = {
  title: 'UI/Recipe/RecipeItem',
  component: RecipeItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic recipe with single input and output
const basicRecipe: Receipt = {
  inputs: [{ item: 'buckflower', perMin: 30 }],
  outputs: [{ item: 'carbon', perMin: 30 }],
};

// Recipe with multiple inputs
const multipleInputsRecipe: Receipt = {
  inputs: [
    { item: 'amethystPart', perMin: 30 },
    { item: 'origocrust', perMin: 30 },
  ],
  outputs: [{ item: 'amethystComponent', perMin: 6 }],
};

// Recipe with multiple outputs
const multipleOutputsRecipe: Receipt = {
  inputs: [{ item: 'buckflower', perMin: 60 }],
  outputs: [
    { item: 'carbon', perMin: 30 },
    { item: 'carbonPowder', perMin: 15 },
  ],
};

// Complex recipe
const complexRecipe: Receipt = {
  inputs: [
    { item: 'amethystFiber', perMin: 30 },
    { item: 'origocrust', perMin: 30 },
    { item: 'carbon', perMin: 15 },
  ],
  outputs: [
    { item: 'amethystBottle', perMin: 30 },
    { item: 'originiumOre', perMin: 10 },
  ],
};

export const Basic: Story = {
  args: {
    recipe: basicRecipe,
    searchQuery: '',
  },
};

export const MultipleInputs: Story = {
  args: {
    recipe: multipleInputsRecipe,
    searchQuery: '',
  },
};

export const MultipleOutputs: Story = {
  args: {
    recipe: multipleOutputsRecipe,
    searchQuery: '',
  },
};

export const Complex: Story = {
  args: {
    recipe: complexRecipe,
    searchQuery: '',
  },
};

export const WithSearchHighlight: Story = {
  args: {
    recipe: basicRecipe,
    searchQuery: '荞',
  },
};

export const NaturalResource: Story = {
  args: {
    recipe: {
      inputs: [{ item: 'originiumOre', perMin: 60 }],
      outputs: [{ item: 'carbon', perMin: 30 }],
    },
    searchQuery: '',
  },
};

export const HighProductionRate: Story = {
  args: {
    recipe: {
      inputs: [{ item: 'buckflower', perMin: 120 }],
      outputs: [{ item: 'carbon', perMin: 60 }],
    },
    searchQuery: '',
  },
};

export const LowProductionRate: Story = {
  args: {
    recipe: {
      inputs: [{ item: 'amethystPart', perMin: 30 }],
      outputs: [{ item: 'amethystComponent', perMin: 6 }],
    },
    searchQuery: '',
  },
};
