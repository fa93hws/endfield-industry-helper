import type { Receipt } from './type';

export const components: Receipt[] = [
  {
    inputs: [
      {
        item: 'origocrust',
        perMin: 30,
      },
      {
        item: 'amethystFiber',
        perMin: 30,
      },
    ],
    outputs: [{ item: 'amethystComponent', perMin: 6 }],
  },
  {
    inputs: [
      {
        item: 'origocrust',
        perMin: 60,
      },
      {
        item: 'ferrium',
        perMin: 60,
      },
    ],
    outputs: [{ item: 'ferriumComponent', perMin: 6 }],
  },
  {
    inputs: [
      {
        item: 'packedOrigocrust',
        perMin: 60,
      },
      {
        item: 'crystonFiber',
        perMin: 60,
      },
    ],
    outputs: [{ item: 'crystonComponent', perMin: 6 }],
  },
];
