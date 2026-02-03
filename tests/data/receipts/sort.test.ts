import { sortReceiptsByOutput, type Receipt } from '@receipts';
import { describe, expect, it } from 'vitest';

describe('sortReceiptsByOutput', () => {
  it('should sort receipts by output item name in Chinese alphabetical order', () => {
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
        outputs: [{ item: 'carbon', perMin: 30 }],
        inputs: [{ item: 'sandleaf', perMin: 30 }],
      },
      {
        inputs: [{ item: 'ferrium_ore', perMin: 30 }],
        outputs: [{ item: 'ferrium', perMin: 30 }],
      },
    ];

    const sorted = sortReceiptsByOutput(receipts);

    // Check that items are sorted by their Chinese labels
    // ferrium (铁), carbon (碳), amethyst_fiber (紫晶纤维)
    expect(sorted[0].outputs[0].item).toBe('ferrium');
    expect(sorted[1].outputs[0].item).toBe('carbon');
    expect(sorted[2].outputs[0].item).toBe('carbon');
    expect(sorted[3].outputs[0].item).toBe('amethyst_fiber');
  });

  it('should not mutate the original array', () => {
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

    const original = [...receipts];
    sortReceiptsByOutput(receipts);

    // Original array should remain unchanged
    expect(receipts).toEqual(original);
  });

  it('should handle single receipt', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
    ];

    const sorted = sortReceiptsByOutput(receipts);

    expect(sorted).toHaveLength(1);
    expect(sorted[0].outputs[0].item).toBe('carbon');
  });

  it('should handle empty array', () => {
    const receipts: Receipt[] = [];

    const sorted = sortReceiptsByOutput(receipts);

    expect(sorted).toHaveLength(0);
  });

  it('should sort multiple receipts with same output', () => {
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

    const sorted = sortReceiptsByOutput(receipts);

    expect(sorted).toHaveLength(2);
    expect(sorted[0].outputs[0].item).toBe('carbon');
    expect(sorted[1].outputs[0].item).toBe('carbon');
  });
});
