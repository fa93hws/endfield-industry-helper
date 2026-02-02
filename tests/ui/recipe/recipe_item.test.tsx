import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecipeItem } from '../../../src/ui/recipe/recipe_item';
import { Receipt } from '@data/receipts/type';

describe('RecipeItem', () => {
  it('should render recipe with single input and output', () => {
    const recipe: Receipt = {
      inputs: [{ item: 'buckflower', perMin: 30 }],
      outputs: [{ item: 'carbon', perMin: 30 }],
    };

    render(<RecipeItem recipe={recipe} />);

    expect(screen.getByText('荞花')).toBeInTheDocument();
    expect(screen.getByText('碳')).toBeInTheDocument();
    expect(screen.getAllByText('30/min')).toHaveLength(2);
  });

  it('should render recipe with multiple inputs', () => {
    const recipe: Receipt = {
      inputs: [
        { item: 'amethystPart', perMin: 30 },
        { item: 'origocrust', perMin: 30 },
      ],
      outputs: [{ item: 'amethystComponent', perMin: 6 }],
    };

    render(<RecipeItem recipe={recipe} />);

    expect(screen.getByText('紫晶零件')).toBeInTheDocument();
    expect(screen.getByText('晶体外壳')).toBeInTheDocument();
    expect(screen.getByText('紫晶装备原件')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument(); // Plus sign between inputs
  });

  it('should render recipe with multiple outputs', () => {
    const recipe: Receipt = {
      inputs: [{ item: 'buckflower', perMin: 60 }],
      outputs: [
        { item: 'carbon', perMin: 30 },
        { item: 'carbonPowder', perMin: 15 },
      ],
    };

    render(<RecipeItem recipe={recipe} />);

    expect(screen.getByText('荞花')).toBeInTheDocument();
    expect(screen.getByText('碳')).toBeInTheDocument();
    expect(screen.getByText('碳粉末')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument(); // Plus sign between outputs
  });

  it('should highlight text when searchQuery is provided', () => {
    const recipe: Receipt = {
      inputs: [{ item: 'buckflower', perMin: 30 }],
      outputs: [{ item: 'carbon', perMin: 30 }],
    };

    render(<RecipeItem recipe={recipe} searchQuery="荞" />);

    // When highlighting is applied, the text gets split into separate elements
    // So we use a text function that can match split text
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === '荞花';
      }),
    ).toBeInTheDocument();
  });

  it('should render natural resources correctly', () => {
    const recipe: Receipt = {
      inputs: [{ item: 'originiumOre', perMin: 60 }],
      outputs: [{ item: 'carbon', perMin: 30 }],
    };

    render(<RecipeItem recipe={recipe} />);

    expect(screen.getByText('源石原矿')).toBeInTheDocument();
    expect(screen.getByText('碳')).toBeInTheDocument();
  });

  it('should display correct perMin rates', () => {
    const recipe: Receipt = {
      inputs: [{ item: 'buckflower', perMin: 45 }],
      outputs: [{ item: 'carbon', perMin: 15 }],
    };

    render(<RecipeItem recipe={recipe} />);

    expect(screen.getByText('45/min')).toBeInTheDocument();
    expect(screen.getByText('15/min')).toBeInTheDocument();
  });
});
