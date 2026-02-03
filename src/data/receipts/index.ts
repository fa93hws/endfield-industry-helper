import { batteryReceipts } from './battery';
import { components } from './component';
import { medicineReceipts, plantReceipts } from './medicine';
import { bottleReceipts, oreReceipts } from './ore';
import type { Receipt } from './type';

export const allReceipts = [
  ...oreReceipts,
  ...plantReceipts,
  ...medicineReceipts,
  ...batteryReceipts,
  ...bottleReceipts,
  ...components,
];

export interface ReceiptSection {
  title: string;
  recipes: Receipt[];
}

export const receiptSections: ReceiptSection[] = [
  { title: '装备组件', recipes: components },
  { title: '电池', recipes: batteryReceipts },
  { title: '药品', recipes: medicineReceipts },
  { title: '瓶子', recipes: bottleReceipts },
  { title: '矿石', recipes: oreReceipts },
  { title: '植物', recipes: plantReceipts },
];
