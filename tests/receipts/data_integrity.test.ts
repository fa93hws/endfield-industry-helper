import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allProduces, allReceipts, ItemCategory, items, naturalItems, receipts } from '@receipts';
import { describe, expect, it } from 'vitest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../..');
const publicImagesDir = path.join(repoRoot, 'public/images/items');

describe('Data Integrity', () => {
  describe('Image Files', () => {
    it('should have existing image files for all items', () => {
      const missingImages: string[] = [];

      Object.entries(items).forEach(([itemId, item]) => {
        // Extract filename from imagePath (e.g., '/images/items/carbon.webp' -> 'carbon.webp')
        const filename = path.basename(item.imagePath);
        const imagePath = path.join(publicImagesDir, filename);

        if (!fs.existsSync(imagePath)) {
          missingImages.push(`${itemId}: ${item.imagePath} (expected at ${imagePath})`);
        }
      });

      expect(
        missingImages,
        `The following items reference non-existent image files:\n${missingImages.join('\n')}`,
      ).toEqual([]);
    });
  });

  describe('Receipt Coverage', () => {
    it('should have all manufactured items in at least one receipt output', () => {
      // Get all items that are NOT natural resources or base items
      const manufacturedItems = Object.entries(items)
        .filter(
          ([, item]) =>
            item.category !== ItemCategory.naturalPlant &&
            item.category !== ItemCategory.naturalOre &&
            item.category !== ItemCategory.plantSeed &&
            item.category !== ItemCategory.other,
        )
        .map(([itemId]) => itemId);

      // Get all items that appear in recipe outputs
      const itemsInOutputs = new Set<string>();
      receipts.forEach((receipt) => {
        receipt.outputs.forEach((output) => {
          itemsInOutputs.add(output.item);
        });
      });

      // Find manufactured items not in any output
      const missingItems = manufacturedItems.filter((itemId) => !itemsInOutputs.has(itemId));

      expect(
        missingItems,
        `The following manufactured items are not in any receipt output:\n${missingItems.join(', ')}`,
      ).toEqual([]);
    });

    it('should have every AIC product with at least one recipe that produces it', () => {
      // Get all AIC product keys
      const aicProductKeys = Object.keys(allProduces);

      // Build a set of all items that are produced by recipes
      const producedItems = new Set<string>();
      allReceipts.forEach((receipt) => {
        receipt.outputs.forEach((output) => {
          producedItems.add(output.item);
        });
      });

      // Check each AIC product
      const missingRecipes: string[] = [];
      aicProductKeys.forEach((productKey) => {
        if (!producedItems.has(productKey)) {
          missingRecipes.push(productKey);
        }
      });

      // If any AIC products are missing recipes, fail with helpful message
      if (missingRecipes.length > 0) {
        const missingNames = missingRecipes.map((key) => `${key} (${allProduces[key]})`).join(', ');
        expect.fail(
          `The following AIC products have no recipes that produce them: ${missingNames}`,
        );
      }

      expect(missingRecipes).toHaveLength(0);
    });

    it('should not have natural resources with recipes that produce them', () => {
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
  });

  describe('Receipt Item References', () => {
    it('should have all receipt input items exist in items list', () => {
      const invalidInputs: string[] = [];

      receipts.forEach((receipt, idx) => {
        receipt.inputs.forEach((input) => {
          if (!(input.item in items)) {
            invalidInputs.push(`Receipt #${idx} input references unknown item: ${input.item}`);
          }
        });
      });

      expect(
        invalidInputs,
        `The following receipt inputs reference non-existent items:\n${invalidInputs.join('\n')}`,
      ).toEqual([]);
    });

    it('should have all receipt output items exist in items list', () => {
      const invalidOutputs: string[] = [];

      receipts.forEach((receipt, idx) => {
        receipt.outputs.forEach((output) => {
          if (!(output.item in items)) {
            invalidOutputs.push(`Receipt #${idx} output references unknown item: ${output.item}`);
          }
        });
      });

      expect(
        invalidOutputs,
        `The following receipt outputs reference non-existent items:\n${invalidOutputs.join('\n')}`,
      ).toEqual([]);
    });

    it('should have all recipe inputs be either AIC products or natural resources', () => {
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

    it('should have all recipe outputs be AIC products (not natural resources)', () => {
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
  });

  describe('Receipt Structure Validation', () => {
    it('should have all recipes with at least one input and one output', () => {
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

    it('should have all recipe quantities be positive numbers', () => {
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
        expect.fail(
          `The following recipes have invalid quantities: ${invalidQuantities.join(', ')}`,
        );
      }

      expect(invalidQuantities).toHaveLength(0);
    });
  });
});
