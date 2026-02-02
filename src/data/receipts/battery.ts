import { Receipt } from './type';

export const batteryReceipts: Receipt[] = [
  {
    inputs: [
      { item: 'amethystPart', perMin: 30 },
      { item: 'originiumPowder', perMin: 60 },
    ],
    outputs: [{ item: 'batteryValleyLc', perMin: 6 }],
  },
  {
    inputs: [
      { item: 'ferriumPart', perMin: 60 },
      { item: 'originiumPowder', perMin: 90 },
    ],
    outputs: [{ item: 'batteryValleySc', perMin: 6 }],
  },
  {
    inputs: [
      { item: 'steelPart', perMin: 60 },
      { item: 'denseOriginiumPowder', perMin: 90 },
    ],
    outputs: [{ item: 'batteryValleyHc', perMin: 6 }],
  },
];
