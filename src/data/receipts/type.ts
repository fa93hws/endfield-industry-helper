import { AicProductKey } from '@data/items/aic';
import { NaturalItemKey } from '@data/items/natural';

export type ReceiptItem = {
  item: AicProductKey | NaturalItemKey;
  perMin: number;
};

export type Receipt = {
  inputs: ReceiptItem[];
  outputs: ReceiptItem[];
  // equipment?: string;
};
