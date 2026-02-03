// Create helper exports for compatibility with old code
import { ItemCategory, items } from './generated/items';
import { receipts, type Receipt } from './generated/receipts';

// Re-export generated items and receipts
export { items, type Item, ItemCategory } from './generated/items';
export { receipts, type Receipt, type ReceiptItem } from './generated/receipts';

// Export all item keys as a union type
export type ItemKey = keyof typeof items;

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
  ItemCategory.ore_refined,
  ItemCategory.ore_powder,
  ItemCategory.plant_powder,
  ItemCategory.bottle,
  ItemCategory.battery,
  ItemCategory.part,
  ItemCategory.component,
  ItemCategory.medicine,
  ItemCategory.solution,
  ItemCategory.bottled_solution,
]);

export type AicProductKey = keyof typeof allProduces;

// Natural Items (resources)
export const naturalItems = filterItemsByCategory([
  ItemCategory.natural_ore,
  ItemCategory.natural_plant,
  ItemCategory.plant_seed,
  ItemCategory.other,
]);

export type NaturalItemKey = keyof typeof naturalItems;

// Natural item sub-categories
export const ores = filterItemsByCategory([ItemCategory.natural_ore]);
export const plants = filterItemsByCategory([ItemCategory.natural_plant]);

// All receipts
export const allReceipts = receipts;

// Receipt sorting utility
export function sortReceiptsByOutput(recipes: Receipt[]): Receipt[] {
  return [...recipes].sort((a, b) => {
    const aLabel = items[a.outputs[0].item]?.label || a.outputs[0].item;
    const bLabel = items[b.outputs[0].item]?.label || b.outputs[0].item;
    return aLabel.localeCompare(bLabel, 'zh-CN');
  });
}

// Receipt sections for UI organization
export interface ReceiptSection {
  title: string;
  recipes: Receipt[];
}

function groupReceiptsByCategory(): ReceiptSection[] {
  const categoryConfig: Array<{ title: string; categories: ItemCategory[] }> = [
    { title: '装备组件', categories: [ItemCategory.component] },
    { title: '电池', categories: [ItemCategory.battery] },
    { title: '药品', categories: [ItemCategory.medicine] },
    { title: '瓶装溶液', categories: [ItemCategory.bottled_solution] },
    { title: '溶液', categories: [ItemCategory.solution] },
    { title: '瓶子', categories: [ItemCategory.bottle] },
    {
      title: '矿石',
      categories: [ItemCategory.ore_refined, ItemCategory.ore_powder],
    },
    { title: '植物', categories: [ItemCategory.plant_powder] },
  ];

  const sections: ReceiptSection[] = [];

  categoryConfig.forEach(({ title, categories }) => {
    const sectionRecipes = receipts.filter((r) => {
      const outputItem = items[r.outputs[0].item];
      return outputItem && categories.includes(outputItem.category as ItemCategory);
    });

    if (sectionRecipes.length > 0) {
      sections.push({ title, recipes: sectionRecipes });
    }
  });

  return sections;
}

export const receiptSections = groupReceiptsByCategory();
