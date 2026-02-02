import { oreReceipts, bottleReceipts } from './ore';
import { plantReceipts, medicineReceipts } from './medicine';
import { batteryReceipts } from './battery';
import { Receipt } from './type';

export const allReceipts = [
  ...oreReceipts,
  ...plantReceipts,
  ...medicineReceipts,
  ...batteryReceipts,
  ...bottleReceipts,
];

export interface ReceiptSection {
  title: string;
  recipes: Receipt[];
}

export const receiptSections: ReceiptSection[] = [
  { title: '电池', recipes: batteryReceipts },
  { title: '药品', recipes: medicineReceipts },
  { title: '瓶子', recipes: bottleReceipts },
  { title: '矿石', recipes: oreReceipts },
  { title: '植物', recipes: plantReceipts },
];
