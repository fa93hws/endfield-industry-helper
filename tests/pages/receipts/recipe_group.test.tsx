import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecipeGroup } from '../../../src/pages/receipts/recipe_group';
import { Receipt } from '@data/receipts/type';

describe('RecipeGroup', () => {
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

  it('should render first recipe without accordion when only one recipe exists', () => {
    const singleRecipe: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];
    render(<RecipeGroup recipes={singleRecipe} />);

    // Should show the first recipe
    expect(screen.getByText('荞花')).toBeInTheDocument();
    expect(screen.getByText('碳')).toBeInTheDocument();

    // Should NOT show accordion
    expect(screen.queryByText(/其他配方/)).not.toBeInTheDocument();
  });

  it('should render first recipe with collapsed accordion when multiple recipes exist', () => {
    render(<RecipeGroup recipes={multipleRecipes} />);

    // Should show the first recipe
    expect(screen.getByText('荞花')).toBeInTheDocument();

    // Should show accordion with count
    expect(screen.getByText('其他配方(2)')).toBeInTheDocument();

    // Should NOT show remaining recipes initially (collapsed - they're in DOM but not visible)
    const sandleafElement = screen.getByText('砂叶');
    expect(sandleafElement).not.toBeVisible();
  });

  it('should show remaining recipes when accordion is expanded', async () => {
    const user = userEvent.setup();
    render(<RecipeGroup recipes={multipleRecipes} />);

    // Initially collapsed - remaining recipes not visible
    const sandleafElement = screen.getByText('砂叶');
    const originiumElement = screen.getByText('源石原矿');
    expect(sandleafElement).not.toBeVisible();
    expect(originiumElement).not.toBeVisible();

    // Click to expand accordion
    const accordionButton = screen.getByText('其他配方(2)');
    await user.click(accordionButton);

    // Now remaining recipes should be visible
    expect(sandleafElement).toBeVisible();
    expect(originiumElement).toBeVisible();
  });
});
