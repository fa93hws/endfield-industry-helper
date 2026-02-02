import { describe, expect, it } from 'vitest';
import { AicProductKey, allProduces } from '@data/items/aic';
import { naturalItems } from '@data/items/natural';
import { allReceipts } from '@data/receipts';

describe('Data Integrity', () => {
  it('every AIC product should have at least one recipe that produces it', () => {
    // Get all AIC product keys
    const aicProductKeys = Object.keys(allProduces) as AicProductKey[];

    // Build a set of all items that are produced by recipes
    const producedItems = new Set<string>();
    allReceipts.forEach((receipt) => {
      receipt.outputs.forEach((output) => {
        producedItems.add(output.item);
      });
    });

    // Check each AIC product
    const missingRecipes: AicProductKey[] = [];
    aicProductKeys.forEach((productKey) => {
      if (!producedItems.has(productKey)) {
        missingRecipes.push(productKey);
      }
    });

    // If any AIC products are missing recipes, fail with helpful message
    if (missingRecipes.length > 0) {
      const missingNames = missingRecipes.map((key) => `${key} (${allProduces[key]})`).join(', ');
      expect.fail(`The following AIC products have no recipes that produce them: ${missingNames}`);
    }

    // Test passes if all AIC products have recipes
    expect(missingRecipes).toHaveLength(0);
  });

  it('natural resources should not have any recipes that produce them', () => {
    // Get all natural resource keys
    const naturalItemKeys = Object.keys(naturalItems);

    // Build a set of all items that are produced by recipes
    const producedItems = new Set<string>();
    allReceipts.forEach((receipt) => {
      receipt.outputs.forEach((output) => {
        producedItems.add(output.item);
      });
    });

    // Check if any natural resources are being produced
    const producedNaturalResources: string[] = [];
    naturalItemKeys.forEach((itemKey) => {
      if (producedItems.has(itemKey)) {
        producedNaturalResources.push(itemKey);
      }
    });

    // Natural resources should never be produced by recipes
    if (producedNaturalResources.length > 0) {
      const names = producedNaturalResources
        .map((key) => `${key} (${naturalItems[key as keyof typeof naturalItems]})`)
        .join(', ');
      expect.fail(
        `The following natural resources incorrectly have recipes that produce them: ${names}`,
      );
    }

    expect(producedNaturalResources).toHaveLength(0);
  });

  it('all recipe inputs should be either AIC products or natural resources', () => {
    const allItemKeys = new Set([...Object.keys(allProduces), ...Object.keys(naturalItems)]);

    const unknownInputs: string[] = [];

    allReceipts.forEach((receipt, index) => {
      receipt.inputs.forEach((input) => {
        if (!allItemKeys.has(input.item)) {
          unknownInputs.push(`Recipe #${index}: ${input.item}`);
        }
      });
    });

    if (unknownInputs.length > 0) {
      expect.fail(
        `The following recipe inputs reference unknown items: ${unknownInputs.join(', ')}`,
      );
    }

    expect(unknownInputs).toHaveLength(0);
  });

  it('all recipe outputs should be AIC products (not natural resources)', () => {
    const naturalItemKeys = new Set(Object.keys(naturalItems));
    const invalidOutputs: string[] = [];

    allReceipts.forEach((receipt, index) => {
      receipt.outputs.forEach((output) => {
        if (naturalItemKeys.has(output.item)) {
          invalidOutputs.push(`Recipe #${index}: ${output.item}`);
        }
      });
    });

    if (invalidOutputs.length > 0) {
      expect.fail(
        `The following recipes incorrectly output natural resources: ${invalidOutputs.join(', ')}`,
      );
    }

    expect(invalidOutputs).toHaveLength(0);
  });

  it('all recipes should have at least one input and one output', () => {
    const invalidRecipes: string[] = [];

    allReceipts.forEach((receipt, index) => {
      if (receipt.inputs.length === 0) {
        invalidRecipes.push(`Recipe #${index}: no inputs`);
      }
      if (receipt.outputs.length === 0) {
        invalidRecipes.push(`Recipe #${index}: no outputs`);
      }
    });

    if (invalidRecipes.length > 0) {
      expect.fail(`The following recipes are invalid: ${invalidRecipes.join(', ')}`);
    }

    expect(invalidRecipes).toHaveLength(0);
  });

  it('all recipe quantities should be positive numbers', () => {
    const invalidQuantities: string[] = [];

    allReceipts.forEach((receipt, index) => {
      receipt.inputs.forEach((input, inputIndex) => {
        if (input.perMin <= 0 || !Number.isFinite(input.perMin)) {
          invalidQuantities.push(`Recipe #${index} input #${inputIndex}: ${input.perMin}`);
        }
      });
      receipt.outputs.forEach((output, outputIndex) => {
        if (output.perMin <= 0 || !Number.isFinite(output.perMin)) {
          invalidQuantities.push(`Recipe #${index} output #${outputIndex}: ${output.perMin}`);
        }
      });
    });

    if (invalidQuantities.length > 0) {
      expect.fail(`The following recipes have invalid quantities: ${invalidQuantities.join(', ')}`);
    }

    expect(invalidQuantities).toHaveLength(0);
  });
});
