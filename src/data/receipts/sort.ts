import { Receipt } from './type';

export function sortReceiptsByOutput(receipts: Receipt[]): Receipt[] {
  return [...receipts].sort((a, b) => a.outputs[0].item.localeCompare(b.outputs[0].item));
}
