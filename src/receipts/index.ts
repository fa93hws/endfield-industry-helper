import { ItemCategory, items } from './generated/items';
import { receipts } from './generated/receipts';

export { items, type Item, ItemCategory } from './generated/items';
export { receipts, type Receipt, type ReceiptItem } from './generated/receipts';
export * as helper from './helper';

// Export images object (image paths from items)
export const images: Record<string, string> = Object.fromEntries(
  Object.entries(items).map(([key, item]) => [key, item.imagePath]),
);

// Helper to filter items by category
function filterItemsByCategory(categories: ItemCategory[]): Record<string, string> {
  return Object.fromEntries(
    Object.entries(items)
      .filter(([, item]) => categories.includes(item.category as ItemCategory))
      .map(([key, item]) => [key, item.label]),
  );
}

// AIC Products (manufactured items)
export const allProduces = filterItemsByCategory([
  ItemCategory.oreRefined,
  ItemCategory.orePowder,
  ItemCategory.plantPowder,
  ItemCategory.bottle,
  ItemCategory.battery,
  ItemCategory.part,
  ItemCategory.component,
  ItemCategory.medicine,
  ItemCategory.solution,
  ItemCategory.bottledSolution,
]);

// Natural Items (resources)
export const naturalItems = filterItemsByCategory([
  ItemCategory.naturalOre,
  ItemCategory.naturalPlant,
  ItemCategory.plantSeed,
  ItemCategory.other,
]);

// Natural item sub-categories
export const ores = filterItemsByCategory([ItemCategory.naturalOre]);
export const plants = filterItemsByCategory([ItemCategory.naturalPlant]);

// All receipts
export const allReceipts = receipts;
