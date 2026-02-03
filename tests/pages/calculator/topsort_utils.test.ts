import type { AicProductKey, NaturalItemKey, Receipt } from '@receipts';
import { describe, expect, it } from 'vitest';
import type {
  IntermediateProduct,
  ProductionNode,
} from '../../../src/pages/calculator/calculator_utils';
import { topologicalSort } from '../../../src/pages/calculator/topsort_utils';

describe('Topological Sort', () => {
  // Helper function to create a mock IntermediateProduct
  function createProduct(recipe: Receipt): IntermediateProduct {
    return {
      quantity: 30,
      alternativeRecipes: [recipe],
      chosenRecipe: recipe,
    };
  }

  // Helper function to create a simple recipe
  function createRecipe(inputs: string[], output: string): Receipt {
    return {
      inputs: inputs.map((item) => ({ item: item as AicProductKey | NaturalItemKey, perMin: 30 })),
      outputs: [{ item: output as AicProductKey | NaturalItemKey, perMin: 30 }],
    };
  }

  it('should sort items by dependency order - simple chain', () => {
    // Production chain: sandleaf -> carbon -> denseCarbonPowder
    const carbonRecipe = createRecipe(['sandleaf'], 'carbon');
    const denseCarbonRecipe = createRecipe(['carbon'], 'denseCarbonPowder');

    const productionTrees: ProductionNode[] = [
      {
        item: 'denseCarbonPowder',
        quantity: 30,
        recipe: denseCarbonRecipe,
        children: [
          {
            item: 'carbon',
            quantity: 30,
            recipe: carbonRecipe,
            children: [
              {
                item: 'sandleaf',
                quantity: 30,
                recipe: null,
                children: [],
              },
            ],
          },
        ],
      },
    ];

    const items: [string, IntermediateProduct][] = [
      ['denseCarbonPowder', createProduct(denseCarbonRecipe)],
      ['carbon', createProduct(carbonRecipe)],
    ];

    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );

    // carbon should come before denseCarbonPowder (carbon is needed first)
    expect(sorted[0][0]).toBe('carbon');
    expect(sorted[1][0]).toBe('denseCarbonPowder');
  });

  it('should sort items at same depth alphabetically', () => {
    // Two independent production chains at same depth
    const amethystRecipe = createRecipe(['amethystOre'], 'amethystFiber');
    const ferriumRecipe = createRecipe(['ferriumOre'], 'ferrium');

    const productionTrees: ProductionNode[] = [
      {
        item: 'amethystFiber',
        quantity: 30,
        recipe: amethystRecipe,
        children: [
          {
            item: 'amethystOre',
            quantity: 30,
            recipe: null,
            children: [],
          },
        ],
      },
      {
        item: 'ferrium',
        quantity: 30,
        recipe: ferriumRecipe,
        children: [
          {
            item: 'ferriumOre',
            quantity: 30,
            recipe: null,
            children: [],
          },
        ],
      },
    ];

    const items: [string, IntermediateProduct][] = [
      ['ferrium', createProduct(ferriumRecipe)],
      ['amethystFiber', createProduct(amethystRecipe)],
    ];

    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );

    // Should be sorted alphabetically when at same depth
    expect(sorted[0][0]).toBe('amethystFiber');
    expect(sorted[1][0]).toBe('ferrium');
  });

  it('should handle complex multi-level dependencies', () => {
    // Chain: ore -> fiber -> part -> component
    const fiberRecipe = createRecipe(['amethystOre'], 'amethystFiber');
    const partRecipe = createRecipe(['amethystFiber'], 'amethystPart');
    const componentRecipe = createRecipe(['amethystPart', 'origocrust'], 'amethystComponent');

    const productionTrees: ProductionNode[] = [
      {
        item: 'amethystComponent',
        quantity: 6,
        recipe: componentRecipe,
        children: [
          {
            item: 'amethystPart',
            quantity: 30,
            recipe: partRecipe,
            children: [
              {
                item: 'amethystFiber',
                quantity: 30,
                recipe: fiberRecipe,
                children: [
                  {
                    item: 'amethystOre',
                    quantity: 30,
                    recipe: null,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            item: 'origocrust',
            quantity: 30,
            recipe: null,
            children: [],
          },
        ],
      },
    ];

    const items: [string, IntermediateProduct][] = [
      ['amethystComponent', createProduct(componentRecipe)],
      ['amethystPart', createProduct(partRecipe)],
      ['amethystFiber', createProduct(fiberRecipe)],
    ];

    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );

    // Should be sorted by depth: fiber -> part -> component
    expect(sorted[0][0]).toBe('amethystFiber');
    expect(sorted[1][0]).toBe('amethystPart');
    expect(sorted[2][0]).toBe('amethystComponent');
  });

  it('should handle empty input', () => {
    const productionTrees: ProductionNode[] = [];
    const items: [string, IntermediateProduct][] = [];

    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );

    expect(sorted).toHaveLength(0);
  });

  it('should handle single item', () => {
    const recipe = createRecipe(['sandleaf'], 'carbon');

    const productionTrees: ProductionNode[] = [
      {
        item: 'carbon',
        quantity: 30,
        recipe: recipe,
        children: [
          {
            item: 'sandleaf',
            quantity: 30,
            recipe: null,
            children: [],
          },
        ],
      },
    ];

    const items: [string, IntermediateProduct][] = [['carbon', createProduct(recipe)]];

    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );

    expect(sorted).toHaveLength(1);
    expect(sorted[0][0]).toBe('carbon');
  });

  it('should handle items with shared dependencies', () => {
    // Both amethystPart and ferriumPart need origocrust, but at different levels
    const partRecipe = createRecipe(['amethystFiber'], 'amethystPart');
    const componentRecipe = createRecipe(['amethystPart', 'origocrust'], 'amethystComponent');

    const productionTrees: ProductionNode[] = [
      {
        item: 'amethystComponent',
        quantity: 6,
        recipe: componentRecipe,
        children: [
          {
            item: 'amethystPart',
            quantity: 30,
            recipe: partRecipe,
            children: [
              {
                item: 'amethystFiber',
                quantity: 30,
                recipe: null,
                children: [],
              },
            ],
          },
          {
            item: 'origocrust',
            quantity: 30,
            recipe: null,
            children: [],
          },
        ],
      },
    ];

    const items: [string, IntermediateProduct][] = [
      ['amethystComponent', createProduct(componentRecipe)],
      ['amethystPart', createProduct(partRecipe)],
    ];

    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );

    // amethystPart should come before amethystComponent
    expect(sorted[0][0]).toBe('amethystPart');
    expect(sorted[1][0]).toBe('amethystComponent');
  });

  it('should handle circular dependencies gracefully', () => {
    const recipe = createRecipe(['input'], 'output');

    const productionTrees: ProductionNode[] = [
      {
        item: 'output' as AicProductKey,
        quantity: 30,
        recipe: recipe,
        children: [
          {
            item: 'input' as AicProductKey,
            quantity: 30,
            recipe: null,
            children: [],
            isCircular: true,
          },
        ],
      },
    ];

    const items: [string, IntermediateProduct][] = [['output', createProduct(recipe)]];

    // Should not throw error
    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );
    expect(sorted).toHaveLength(1);
    expect(sorted[0][0]).toBe('output');
  });

  it('should prioritize deeper dependencies first', () => {
    // Create a diamond dependency pattern
    // A depends on B and C, both B and C depend on D
    const dRecipe = createRecipe(['natural'], 'd');
    const bRecipe = createRecipe(['d'], 'b');
    const cRecipe = createRecipe(['d'], 'c');
    const aRecipe = createRecipe(['b', 'c'], 'a');

    const productionTrees: ProductionNode[] = [
      {
        item: 'a' as AicProductKey,
        quantity: 30,
        recipe: aRecipe,
        children: [
          {
            item: 'b' as AicProductKey,
            quantity: 30,
            recipe: bRecipe,
            children: [
              {
                item: 'd' as AicProductKey,
                quantity: 30,
                recipe: dRecipe,
                children: [
                  {
                    item: 'natural' as AicProductKey,
                    quantity: 30,
                    recipe: null,
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            item: 'c' as AicProductKey,
            quantity: 30,
            recipe: cRecipe,
            children: [
              {
                item: 'd' as AicProductKey,
                quantity: 30,
                recipe: dRecipe,
                children: [
                  {
                    item: 'natural' as AicProductKey,
                    quantity: 30,
                    recipe: null,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const items: [string, IntermediateProduct][] = [
      ['a', createProduct(aRecipe)],
      ['b', createProduct(bRecipe)],
      ['c', createProduct(cRecipe)],
      ['d', createProduct(dRecipe)],
    ];

    const sorted = topologicalSort(
      items as [AicProductKey, IntermediateProduct][],
      productionTrees,
    );

    // d should come first (deepest), then b and c (alphabetically), then a
    expect(sorted[0][0]).toBe('d');
    expect(sorted[1][0]).toBe('b');
    expect(sorted[2][0]).toBe('c');
    expect(sorted[3][0]).toBe('a');
  });
});
