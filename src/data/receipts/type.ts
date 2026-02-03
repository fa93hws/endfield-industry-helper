import type { AicProductKey } from '@data/items/aic';
import type { NaturalItemKey } from '@data/items/natural';

export type ReceiptItem = {
  item: AicProductKey | NaturalItemKey;
  perMin: number;
};

export type Receipt = {
  inputs: ReceiptItem[];
  outputs: ReceiptItem[];
  // factory: string;
};
