import type { PlantPowderKey } from '../aic';
import { PlantKey, PlantSeedKey } from '../natural';
import BuckflowerPowder from './assets/Buckflower_Powder.png';
import BuckflowerSeed from './assets/Buckflower_Seed.png';
import Buckflower from './assets/Buckflower.png';
import CitromePowder from './assets/Citrome_Powder.webp';
import CitromeSeed from './assets/Citrome_Seed.webp';
import Citrome from './assets/Citrome.png';
import Firebuckle from './assets/Firebuckle.png';
import GroundBucketFlowerPowder from './assets/Ground_Buckflower_Powder.png';
import GroundCitromePowder from './assets/Ground_Citrome_Powder.png';
import Jincao from './assets/Jincao.png';
import SandleafPowder from './assets/Sandleaf_Powder.png';
import SandLeafSeed from './assets/Sandleaf_Seed.png';
import Sandleaf from './assets/Sandleaf.png';
import Yazhen from './assets/Yazhen.png';

export const plantImages: Record<PlantKey, string> = {
  sandleaf: Sandleaf,
  buckflower: Buckflower,
  citrome: Citrome,
  firebuckle: Firebuckle,
  jincao: Jincao,
  yazhen: Yazhen,
};

export const plantSeedImages: Record<PlantSeedKey, string> = {
  sandleafSeed: SandLeafSeed,
  buckflowerSeed: BuckflowerSeed,
  citromeSeed: CitromeSeed,
};

export const plantPowderImages: Record<PlantPowderKey, string> = {
  sandleafPowder: SandleafPowder,
  buckflowerPowder: BuckflowerPowder,
  groundBuckflowerPowder: GroundBucketFlowerPowder,
  citromePowder: CitromePowder,
  groundCitromePowder: GroundCitromePowder,
};
