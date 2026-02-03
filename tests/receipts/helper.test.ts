import { ItemCategory, type Item, type Receipt } from '@receipts';
import { describe, expect, it } from 'vitest';
import {
  groupReceiptsByCategory,
  groupReceiptsByFirstOutput,
  sortReceiptsByOutput,
} from '../../src/receipts/helper';

describe('sortReceiptsByOutput', () => {
  const mockItems: Record<string, Item> = {
    carbon: {
      label: '碳',
      category: ItemCategory.oreRefined,
      imagePath: '/images/items/carbon.webp',
    },
    ferrium: {
      label: '蓝铁锭',
      category: ItemCategory.oreRefined,
      imagePath: '/images/items/ferrium.webp',
    },
    amethyst_fiber: {
      label: '紫晶纤维',
      category: ItemCategory.oreRefined,
      imagePath: '/images/items/amethyst_fiber.webp',
    },
  };

  it('should sort receipts by Chinese label in alphabetical order', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'amethyst_ore', perMin: 30 }],
        outputs: [{ item: 'amethyst_fiber', perMin: 30 }],
      },
      {
        inputs: [{ item: 'ferrium_ore', perMin: 30 }],
        outputs: [{ item: 'ferrium', perMin: 30 }],
      },
    ];

    const sorted = sortReceiptsByOutput(receipts, mockItems);

    // Chinese order: 蓝(lan), 碳(tan), 紫(zi)
    expect(sorted[0].outputs[0].item).toBe('ferrium');
    expect(sorted[1].outputs[0].item).toBe('carbon');
    expect(sorted[2].outputs[0].item).toBe('amethyst_fiber');
  });

  it('should handle empty array', () => {
    const sorted = sortReceiptsByOutput([], mockItems);
    expect(sorted).toEqual([]);
  });

  it('should handle single receipt', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];

    const sorted = sortReceiptsByOutput(receipts, mockItems);

    expect(sorted).toHaveLength(1);
    expect(sorted[0].outputs[0].item).toBe('carbon');
  });

  it('should handle multiple receipts with same output', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'sandleaf', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];

    const sorted = sortReceiptsByOutput(receipts, mockItems);

    expect(sorted).toHaveLength(2);
    expect(sorted[0].outputs[0].item).toBe('carbon');
    expect(sorted[1].outputs[0].item).toBe('carbon');
  });
});

describe('groupReceiptsByFirstOutput', () => {
  it('should group receipts by their first output item', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'sandleaf', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'amethyst_ore', perMin: 30 }],
        outputs: [{ item: 'amethyst_fiber', perMin: 30 }],
      },
    ];

    const grouped = groupReceiptsByFirstOutput(receipts);

    expect(grouped.carbon).toHaveLength(2);
    expect(grouped.amethyst_fiber).toHaveLength(1);
    expect(grouped.carbon[0].inputs[0].item).toBe('buckflower');
    expect(grouped.carbon[1].inputs[0].item).toBe('sandleaf');
  });

  it('should handle empty array', () => {
    const grouped = groupReceiptsByFirstOutput([]);
    expect(grouped).toEqual({});
  });

  it('should handle receipts with unique outputs', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'amethyst_ore', perMin: 30 }],
        outputs: [{ item: 'amethyst_fiber', perMin: 30 }],
      },
    ];

    const grouped = groupReceiptsByFirstOutput(receipts);

    expect(Object.keys(grouped)).toHaveLength(2);
    expect(grouped.carbon).toHaveLength(1);
    expect(grouped.amethyst_fiber).toHaveLength(1);
  });

  it('should handle receipts with multiple outputs by grouping by first output', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 60 }],
        outputs: [
          { item: 'carbon', perMin: 30 },
          { item: 'carbon_powder', perMin: 15 },
        ],
      },
      {
        inputs: [{ item: 'sandleaf', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];

    const grouped = groupReceiptsByFirstOutput(receipts);

    expect(grouped.carbon).toHaveLength(2);
  });
});

describe('groupReceiptsByCategory', () => {
  const mockItems: Record<string, Item> = {
    amethyst_component: {
      label: '紫晶装备原件',
      category: ItemCategory.component,
      imagePath: '/images/items/amethyst_component.webp',
    },
    battery_valley_hc: {
      label: '高容谷底电池',
      category: ItemCategory.battery,
      imagePath: '/images/items/battery_valley_hc.webp',
    },
    buck_capsule_a: {
      label: '精选荞愈胶囊',
      category: ItemCategory.medicine,
      imagePath: '/images/items/buck_capsule_a.webp',
    },
    carbon: {
      label: '碳',
      category: ItemCategory.oreRefined,
      imagePath: '/images/items/carbon.webp',
    },
    carbon_powder: {
      label: '碳粉',
      category: ItemCategory.orePowder,
      imagePath: '/images/items/carbon_powder.webp',
    },
    amethyst_bottle: {
      label: '紫晶质瓶',
      category: ItemCategory.bottle,
      imagePath: '/images/items/amethyst_bottle.webp',
    },
  };

  it('should group receipts by category into sections', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'amethyst_part', perMin: 30 }],
        outputs: [{ item: 'amethyst_component', perMin: 6 }],
      },
      {
        inputs: [{ item: 'battery_part', perMin: 30 }],
        outputs: [{ item: 'battery_valley_hc', perMin: 10 }],
      },
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];

    const sections = groupReceiptsByCategory(receipts, mockItems);

    expect(sections).toHaveLength(3);
    expect(sections[0].title).toBe('装备组件');
    expect(sections[0].recipes).toHaveLength(1);
    expect(sections[1].title).toBe('电池');
    expect(sections[2].title).toBe('矿石');
  });

  it('should maintain category order as defined in config', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'battery_part', perMin: 30 }],
        outputs: [{ item: 'battery_valley_hc', perMin: 10 }],
      },
      {
        inputs: [{ item: 'amethyst_part', perMin: 30 }],
        outputs: [{ item: 'amethyst_component', perMin: 6 }],
      },
    ];

    const sections = groupReceiptsByCategory(receipts, mockItems);

    // Order should be: 装备组件, 电池, 矿石
    expect(sections[0].title).toBe('装备组件');
    expect(sections[1].title).toBe('电池');
    expect(sections[2].title).toBe('矿石');
  });

  it('should exclude sections with no recipes', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];

    const sections = groupReceiptsByCategory(receipts, mockItems);

    expect(sections).toHaveLength(1);
    expect(sections[0].title).toBe('矿石');
  });

  it('should handle empty array', () => {
    const sections = groupReceiptsByCategory([], mockItems);
    expect(sections).toEqual([]);
  });

  it('should group multiple categories into single section', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'carbon', perMin: 30 }],
        outputs: [{ item: 'carbon_powder', perMin: 30 }],
      },
    ];

    const sections = groupReceiptsByCategory(receipts, mockItems);

    // Both ore_refined and ore_powder should be in '矿石' section
    expect(sections).toHaveLength(1);
    expect(sections[0].title).toBe('矿石');
    expect(sections[0].recipes).toHaveLength(2);
  });

  it('should handle receipts with unknown items', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'unknown_input', perMin: 30 }],
        outputs: [{ item: 'unknown_output', perMin: 30 }],
      },
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];

    const sections = groupReceiptsByCategory(receipts, mockItems);

    // Unknown items should be filtered out
    expect(sections).toHaveLength(1);
    expect(sections[0].title).toBe('矿石');
    expect(sections[0].recipes).toHaveLength(1);
  });
});
