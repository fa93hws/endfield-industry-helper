import type { OrePowderKey, OreRefinedKey } from '../aic';
import type { OreKey } from '../natural';
import AmethystFiber from './assets/Amethyst_Fiber.png';
import AmethystOre from './assets/Amethyst_Ore.png';
import AmethystPowder from './assets/Amethyst_Powder.png';
import CarbonPowder from './assets/Carbon_Powder.png';
import Carbon from './assets/Carbon.png';
import CrystonFiber from './assets/Cryston_Fiber.png';
import CrystonPowder from './assets/Cryston_Powder.png';
import DenseCarbonPowder from './assets/Dense_Carbon_Powder.png';
import DenseFerriumPowder from './assets/Dense_Ferrium_Powder.png';
import DenseOriginiumPowder from './assets/Dense_Originium_Powder.png';
import DenseOrigocrustPowder from './assets/Dense_Origocrust_Powder.png';
import FerriumOre from './assets/Ferrium_Ore.png';
import FerriumPowder from './assets/Ferrium_Powder.png';
import Ferrium from './assets/Ferrium.png';
import OriginiumOre from './assets/Originium_Ore.png';
import OriginiumPowder from './assets/Originium_Powder.png';
import OrigocrustPowder from './assets/Origocrust_Powder.png';
import Origocrust from './assets/Origocrust.png';
import PackedOrigocrust from './assets/Packed_Origocrust.png';
import StabilizedCarbon from './assets/Stabilized_Carbon.png';
import Steel from './assets/Steel.png';
import Xiranite from './assets/Xiranite.webp';

export const refinedOreImages: Record<Exclude<OreRefinedKey, 'carbon'>, string> = {
  origocrust: Origocrust,
  amethystFiber: AmethystFiber,
  ferrium: Ferrium,
  stabilizedCarbon: StabilizedCarbon,
  packedOrigocrust: PackedOrigocrust,
  crystonFiber: CrystonFiber,
  steel: Steel,
  xiranite: Xiranite,
};

export const orePowderImages: Record<OrePowderKey, string> = {
  carbonPowder: CarbonPowder,
  originiumPowder: OriginiumPowder,
  origocrustPowder: OrigocrustPowder,
  amethystPowder: AmethystPowder,
  ferriumPowder: FerriumPowder,
  denseOriginiumPowder: DenseOriginiumPowder,
  denseCarbonPowder: DenseCarbonPowder,
  denseOrigocrustPowder: DenseOrigocrustPowder,
  crystonPowder: CrystonPowder,
  denseFerriumPowder: DenseFerriumPowder,
};

export const oreImages: Record<OreKey | 'carbon', string> = {
  originiumOre: OriginiumOre,
  amethystOre: AmethystOre,
  ferriumOre: FerriumOre,
  carbon: Carbon,
};
