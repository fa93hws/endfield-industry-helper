import { ItemCategory, type Item } from './generated/items';
import type { Receipt } from './generated/receipts';

/**
 * Sort receipts by the label of their first output item.
 */
export function sortReceiptsByOutput(
  recipes: readonly Receipt[],
  items: Record<string, Item>,
): Receipt[] {
  return [...recipes].sort((a, b) => {
    const aLabel = items[a.outputs[0].item]?.label || a.outputs[0].item;
    const bLabel = items[b.outputs[0].item]?.label || b.outputs[0].item;
    return aLabel.localeCompare(bLabel, 'zh-CN');
  });
}

/**
 * Group receipts by their first output item's key.
 */
export function groupReceiptsByFirstOutput(
  receipts: readonly Receipt[],
): Record<string, Receipt[]> {
  return receipts.reduce(
    (acc, receipt) => {
      const outputKey = receipt.outputs[0].item;
      if (!acc[outputKey]) {
        acc[outputKey] = [];
      }
      acc[outputKey].push(receipt);
      return acc;
    },
    {} as Record<string, Receipt[]>,
  );
}

type ReceiptSection = {
  title: string;
  recipes: Receipt[];
};

export function groupReceiptsByCategory(
  receipts: readonly Receipt[],
  items: Record<string, Item>,
): ReceiptSection[] {
  const categoryConfig = [
    { title: '装备组件', categories: [ItemCategory.component] },
    { title: '电池', categories: [ItemCategory.battery] },
    { title: '药品', categories: [ItemCategory.medicine] },
    { title: '瓶装溶液', categories: [ItemCategory.bottledSolution] },
    { title: '溶液', categories: [ItemCategory.solution] },
    { title: '瓶子', categories: [ItemCategory.bottle] },
    {
      title: '矿石',
      categories: [ItemCategory.oreRefined, ItemCategory.orePowder],
    },
    { title: '植物', categories: [ItemCategory.plantPowder] },
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
