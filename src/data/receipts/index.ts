import { oreReceipts } from './ore';
import { plantReceipts, medicineReceipts } from './medicine';
import { batteryReceipts } from './battery';

export const allReceipts = [
  ...oreReceipts,
  ...plantReceipts,
  ...medicineReceipts,
  ...batteryReceipts,
];
