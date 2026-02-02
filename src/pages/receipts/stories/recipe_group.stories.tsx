import type { Meta, StoryObj } from '@storybook/react';
import { RecipeGroup } from '../recipe_group';
import { Receipt } from '@data/receipts/type';

const meta = {
  title: 'Pages/Receipts/RecipeGroup',
  component: RecipeGroup,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const singleRecipe: Receipt[] = [
  {
    inputs: [{ item: 'buckflower', perMin: 30 }],
    outputs: [{ item: 'carbon', perMin: 30 }],
  },
];

const multipleRecipes: Receipt[] = [
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
];

export const SingleRecipe: Story = {
  args: {
    recipes: singleRecipe,
  },
};

export const MultipleRecipes: Story = {
  args: {
    recipes: multipleRecipes,
  },
};
