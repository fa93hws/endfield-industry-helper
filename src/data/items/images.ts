import type { AicProductKey } from './aic';
import type { NaturalItemKey } from './natural';
// import AketinePowder from './assets/Aketine_Powder.png';
import AmethystBottle from './assets/Amethyst_Bottle.png';
import AmethystComponent from './assets/Amethyst_Component.png';
import AmethystFiber from './assets/Amethyst_Fiber.png';
import AmethystOre from './assets/Amethyst_Ore.png';
import AmethystPart from './assets/Amethyst_Part.png';
import AmethystPowder from './assets/Amethyst_Powder.png';
import Buckflower from './assets/Buckflower.png';
import CarbonPowder from './assets/Carbon_Powder.png';
import Carbon from './assets/Carbon.png';
import CleanWater from './assets/Clean_Water.png';
import CrystonBottle from './assets/Cryston_Bottle.png';
import CrystonComponent from './assets/Cryston_Component.png';
import CrystonFiber from './assets/Cryston_Fiber.png';
import CrystonPart from './assets/Cryston_Part.png';
import CrystonPowder from './assets/Cryston_Powder.png';
// import CupriumPart from './assets/Cuprium_Part.png';
import DenseCarbonPowder from './assets/Dense_Carbon_Powder.png';
import DenseFerriumPowder from './assets/Dense_Ferrium_Powder.png';
import DenseOriginiumPowder from './assets/Dense_Originium_Powder.png';
import DenseOrigocrustPowder from './assets/Dense_Origocrust_Powder.png';
import FerriumBottle from './assets/Ferrium_Bottle.png';
import FerriumComponent from './assets/Ferrium_Component.png';
import FerriumOre from './assets/Ferrium_Ore.png';
import FerriumPart from './assets/Ferrium_Part.png';
import FerriumPowder from './assets/Ferrium_Powder.png';
import Ferrium from './assets/Ferrium.png';
import Firebuckle from './assets/Firebuckle.png';
import HCValleyBattery from './assets/HC_Valley_Battery.png';
import LCValleyBattery from './assets/LC_Valley_Battery.png';
import OriginiumOre from './assets/Originium_Ore.png';
import OriginiumPowder from './assets/Originium_Powder.png';
import OrigocrustPowder from './assets/Origocrust_Powder.png';
import Origocrust from './assets/Origocrust.png';
import PackedOrigocrust from './assets/Packed_Origocrust.png';
import SandleafPowder from './assets/Sandleaf_Powder.png';
import Sandleaf from './assets/Sandleaf.png';
import SCValleyBattery from './assets/SC_Valley_Battery.png';
import StabilizedCarbon from './assets/Stabilized_Carbon.png';
import SteelBottle from './assets/Steel_Bottle.png';
import SteelPart from './assets/Steel_Part.png';
import Steel from './assets/Steel.png';
import SandLeafSeed from './assets/Sandleaf_Seed.png';
import BuckflowerSeed from './assets/Buckflower_Seed.png';
import BuckflowerPowder from './assets/Buckflower_Powder.png';
import GroundBucketFlowerPowder from './assets/Ground_Buckflower_Powder.png';
import Citrome from './assets/Citrome.png';
import CitromeSeed from './assets/Citrome_Seed.webp';
import CitromePowder from './assets/Citrome_Powder.webp';
import GroundCitromePowder from './assets/Ground_Citrome_Powder.png';
import BuckCapsuleA from './assets/BuckCapsule_A.webp';
import BuckCapsuleB from './assets/BuckCapsule_B.webp';
import BuckCapsuleC from './assets/BuckCapsule_C.webp';
import CannedCitromeA from './assets/CannedCitrome_A.webp';
import CannedCitromeB from './assets/CannedCitrome_B.webp';
import CannedCitromeC from './assets/CannedCitrome_C.webp';
// import LCWulingBattery from './assets/LC_Wuling_Battery.webp';

export const images: Record<AicProductKey | NaturalItemKey, string> = {
  // 矿石
  originiumOre: OriginiumOre,
  amethystOre: AmethystOre,
  ferriumOre: FerriumOre,
  carbon: Carbon,

  // 矿石精炼
  origocrust: Origocrust,
  amethystFiber: AmethystFiber,
  ferrium: Ferrium,
  stabilizedCarbon: StabilizedCarbon,
  packedOrigocrust: PackedOrigocrust,
  crystonFiber: CrystonFiber,
  steel: Steel,

  // 矿石粉末
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

  // 植物
  sandleaf: Sandleaf,
  buckflower: Buckflower,
  citrome: Citrome,
  firebuckle: Firebuckle,

  // 种子
  sandleafSeed: SandLeafSeed,
  buckflowerSeed: BuckflowerSeed,
  citromeSeed: CitromeSeed,

  // 植物粉末
  // aketinePowder: AketinePowder,
  sandleafPowder: SandleafPowder,
  buckflowerPowder: BuckflowerPowder,
  groundBuckflowerPowder: GroundBucketFlowerPowder,
  citromePowder: CitromePowder,
  groundCitromePowder: GroundCitromePowder,

  // 药
  buckCapsuleC: BuckCapsuleC,
  buckCapsuleB: BuckCapsuleB,
  buckCapsuleA: BuckCapsuleA,
  CannedCitromeC: CannedCitromeC,
  CannedCitromeB: CannedCitromeB,
  CannedCitromeA: CannedCitromeA,

  // 瓶子
  amethystBottle: AmethystBottle,
  crystonBottle: CrystonBottle,
  ferriumBottle: FerriumBottle,
  steelBottle: SteelBottle,

  // 电池
  batteryValleyLc: LCValleyBattery,
  batteryValleySc: SCValleyBattery,
  batteryValleyHc: HCValleyBattery,
  // batteryWulingLc: LCWulingBattery,

  // 零件
  amethystPart: AmethystPart,
  crystonPart: CrystonPart,
  ferriumPart: FerriumPart,
  steelPart: SteelPart,
  // cupriumPart: CupriumPart,
  amethystComponent: AmethystComponent,
  ferriumComponent: FerriumComponent,
  crystonComponent: CrystonComponent,

  cleanWater: CleanWater,
};
