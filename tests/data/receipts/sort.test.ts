import { describe, expect, it } from 'vitest';
import { sortReceiptsByOutput } from '@data/receipts/sort';
import type { Receipt } from '@data/receipts/type';

describe('sortReceiptsByOutput', () => {
  it('should sort receipts by output item name in English alphabetical order', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'amethystOre', perMin: 30 }],
        outputs: [{ item: 'amethystFiber', perMin: 30 }],
      },
      {
        outputs: [{ item: 'carbon', perMin: 30 }],
        inputs: [{ item: 'sandleaf', perMin: 30 }],
      },
      {
        inputs: [{ item: 'ferriumOre', perMin: 30 }],
        outputs: [{ item: 'ferrium', perMin: 30 }],
      },
    ];

    const sorted = sortReceiptsByOutput(receipts);

    // Check that the order is: amethystFiber < carbon < carbon < ferrium
    expect(sorted[0].outputs[0].item).toBe('amethystFiber');
    expect(sorted[1].outputs[0].item).toBe('carbon');
    expect(sorted[2].outputs[0].item).toBe('carbon');
    expect(sorted[3].outputs[0].item).toBe('ferrium');
  });

  it('should not mutate the original array', () => {
    const receipts: Receipt[] = [
      {
        inputs: [{ item: 'buckflower', perMin: 30 }],
        outputs: [{ item: 'carbon', perMin: 30 }],
      },
      {
        inputs: [{ item: 'amethystOre', perMin: 30 }],
        outputs: [{ item: 'amethystFiber', perMin: 30 }],
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
