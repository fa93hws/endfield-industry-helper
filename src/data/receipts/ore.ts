import { Receipt } from './type';

const carbonReceipts: Receipt[] = [
  {
    outputs: [{ item: 'carbon', perMin: 30 }],
    inputs: [{ item: 'sandleaf', perMin: 30 }],
  },
  {
    inputs: [
      { item: 'sandleafPowder', perMin: 30 },
      { item: 'carbonPowder', perMin: 60 },
    ],
    outputs: [{ item: 'denseCarbonPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'groundBuckflowerPowder', perMin: 30 }],
    outputs: [{ item: 'denseCarbonPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'groundCitromePowder', perMin: 30 }],
    outputs: [{ item: 'denseCarbonPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'denseCarbonPowder', perMin: 30 }],
    outputs: [{ item: 'stabilizedCarbon', perMin: 30 }],
  },
  {
    inputs: [{ item: 'denseOrigocrustPowder', perMin: 30 }],
    outputs: [{ item: 'packedOrigocrust', perMin: 30 }],
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
    outputs: [{ item: 'origocrustPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'originiumOre', perMin: 30 }],
    outputs: [{ item: 'originiumPowder', perMin: 30 }],
  },
  {
    inputs: [
      { item: 'sandleafPowder', perMin: 30 },
      { item: 'originiumPowder', perMin: 60 },
    ],
    outputs: [{ item: 'denseOriginiumPowder', perMin: 30 }],
  },
  {
    inputs: [
      { item: 'sandleafPowder', perMin: 30 },
      { item: 'origocrustPowder', perMin: 60 },
    ],
    outputs: [{ item: 'denseOrigocrustPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'denseOriginiumPowder', perMin: 30 }],
    outputs: [{ item: 'denseOrigocrustPowder', perMin: 30 }],
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
  {
    inputs: [
      { item: 'sandleafPowder', perMin: 30 },
      { item: 'amethystPowder', perMin: 60 },
    ],
    outputs: [{ item: 'crystonPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'crystonPowder', perMin: 30 }],
    outputs: [{ item: 'crystonFiber', perMin: 30 }],
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
  {
    inputs: [
      { item: 'sandleafPowder', perMin: 30 },
      { item: 'ferriumPowder', perMin: 60 },
    ],
    outputs: [{ item: 'denseFerriumPowder', perMin: 30 }],
  },
  {
    inputs: [{ item: 'denseFerriumPowder', perMin: 30 }],
    outputs: [{ item: 'steel', perMin: 30 }],
  },
  {
    inputs: [{ item: 'steel', perMin: 30 }],
    outputs: [{ item: 'steelPart', perMin: 30 }],
  },
  {
    inputs: [{ item: 'steel', perMin: 60 }],
    outputs: [{ item: 'steelBottle', perMin: 30 }],
  },
];

export const oreReceipts = [
  ...carbonReceipts,
  ...originiumReceipts,
  ...amethystReceipts,
  ...ferriumReceipts,
];
