import { Receipt } from './type';

const carbonReceipts: Receipt[] = [
  {
    outputs: [{ item: 'carbon', perMin: 30 }],
    inputs: [
      {
        item: 'buckflower',
        perMin: 30,
      },
    ],
  },
  {
    outputs: [{ item: 'carbon', perMin: 30 }],
    inputs: [
      {
        item: 'sandleaf',
        perMin: 30,
      },
    ],
  },
];

const originiumReceipts: Receipt[] = [
  {
    inputs: [{ item: 'originiumOre', perMin: 30 }],
    outputs: [{ item: 'origocrust', perMin: 30 }],
  },
  {
    inputs: [{ item: 'originiumPowder', perMin: 30 }],
    outputs: [{ item: 'origocrust', perMin: 30 }],
  },
  {
    inputs: [{ item: 'origocrust', perMin: 30 }],
    outputs: [{ item: 'originiumPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'originiumOre', perMin: 30 }],
    outputs: [{ item: 'originiumPowder', perMin: 30 }],
  },
];

const amethystReceipts: Receipt[] = [
  {
    inputs: [{ item: 'amethystOre', perMin: 30 }],
    outputs: [{ item: 'amethystFiber', perMin: 30 }],
  },
  {
    inputs: [{ item: 'amethystPowder', perMin: 30 }],
    outputs: [{ item: 'amethystFiber', perMin: 30 }],
  },
  {
    inputs: [{ item: 'amethystFiber', perMin: 30 }],
    outputs: [{ item: 'amethystPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'amethystFiber', perMin: 30 }],
    outputs: [{ item: 'amethystPart', perMin: 30 }],
  },
  {
    inputs: [{ item: 'amethystFiber', perMin: 60 }],
    outputs: [{ item: 'amethystBottle', perMin: 30 }],
  },
];

const ferriumReceipts: Receipt[] = [
  {
    inputs: [{ item: 'ferriumOre', perMin: 30 }],
    outputs: [{ item: 'ferrium', perMin: 30 }],
  },
  {
    inputs: [{ item: 'ferriumPowder', perMin: 30 }],
    outputs: [{ item: 'ferrium', perMin: 30 }],
  },
  {
    inputs: [{ item: 'ferrium', perMin: 30 }],
    outputs: [{ item: 'ferriumPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'ferrium', perMin: 30 }],
    outputs: [{ item: 'ferriumPart', perMin: 30 }],
  },
  {
    inputs: [{ item: 'ferrium', perMin: 60 }],
    outputs: [{ item: 'ferriumBottle', perMin: 30 }],
  },
];

export const oreReceipts = [
  ...carbonReceipts,
  ...originiumReceipts,
  ...amethystReceipts,
  ...ferriumReceipts,
];
