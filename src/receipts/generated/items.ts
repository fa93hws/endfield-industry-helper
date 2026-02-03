// This file is auto-generated. Do not edit manually.
// Generated from tools/receipt_gen/csv/items.csv
// Output: src/receipts/generated/items.ts

export enum ItemCategory {
  battery,
  bottle,
  bottledSolution,
  component,
  medicine,
  naturalOre,
  naturalPlant,
  orePowder,
  oreRefined,
  other,
  part,
  plantPowder,
  plantSeed,
  solution,
}

export interface Item {
  label: string;
  category: ItemCategory;
  imagePath: string;
}

export const items: Record<string, Item> = {
  batteryValleyHc: {
    label: '高容谷底电池',
    category: ItemCategory.battery,
    imagePath: '/images/items/battery_valley_hc.webp',
  },
  batteryValleyLc: {
    label: '低容谷地电池',
    category: ItemCategory.battery,
    imagePath: '/images/items/battery_valley_lc.webp',
  },
  batteryValleySc: {
    label: '中容谷底电池',
    category: ItemCategory.battery,
    imagePath: '/images/items/battery_valley_sc.webp',
  },
  batteryWulingLc: {
    label: '低容武陵电池',
    category: ItemCategory.battery,
    imagePath: '/images/items/battery_wuling_lc.webp',
  },
  amethystBottle: {
    label: '紫晶质瓶',
    category: ItemCategory.bottle,
    imagePath: '/images/items/amethyst_bottle.webp',
  },
  crystonBottle: {
    label: '高晶质瓶',
    category: ItemCategory.bottle,
    imagePath: '/images/items/cryston_bottle.webp',
  },
  ferriumBottle: {
    label: '蓝铁瓶',
    category: ItemCategory.bottle,
    imagePath: '/images/items/ferrium_bottle.webp',
  },
  steelBottle: {
    label: '钢质瓶',
    category: ItemCategory.bottle,
    imagePath: '/images/items/steel_bottle.webp',
  },
  ferriumBottleYazhenSolution: {
    label: '蓝贴瓶装芽针溶液',
    category: ItemCategory.bottledSolution,
    imagePath: '/images/items/ferrium_bottle_yazhen_solution.webp',
  },
  amethystComponent: {
    label: '紫晶装备原件',
    category: ItemCategory.component,
    imagePath: '/images/items/amethyst_component.webp',
  },
  crystonComponent: {
    label: '高晶装备原件',
    category: ItemCategory.component,
    imagePath: '/images/items/cryston_component.webp',
  },
  ferriumComponent: {
    label: '蓝铁装备原件',
    category: ItemCategory.component,
    imagePath: '/images/items/ferrium_component.webp',
  },
  xiraniteComponent: {
    label: '息壤装备原件',
    category: ItemCategory.component,
    imagePath: '/images/items/xiranite_component.webp',
  },
  buckCapsuleA: {
    label: '精选荞愈胶囊',
    category: ItemCategory.medicine,
    imagePath: '/images/items/buck_capsule_a.webp',
  },
  buckCapsuleB: {
    label: '优质荞愈胶囊',
    category: ItemCategory.medicine,
    imagePath: '/images/items/buck_capsule_b.webp',
  },
  buckCapsuleC: {
    label: '荞愈胶囊',
    category: ItemCategory.medicine,
    imagePath: '/images/items/buck_capsule_c.webp',
  },
  cannedCitromeA: {
    label: '精选柑实罐头',
    category: ItemCategory.medicine,
    imagePath: '/images/items/canned_citrome_a.webp',
  },
  cannedCitromeB: {
    label: '优质柑实罐头',
    category: ItemCategory.medicine,
    imagePath: '/images/items/canned_citrome_b.webp',
  },
  cannedCitromeC: {
    label: '柑实罐头',
    category: ItemCategory.medicine,
    imagePath: '/images/items/canned_citrome_c.webp',
  },
  yazhenSprayB: {
    label: '芽针喷剂',
    category: ItemCategory.medicine,
    imagePath: '/images/items/yazhen_spray_b.webp',
  },
  amethystOre: {
    label: '紫水晶矿',
    category: ItemCategory.naturalOre,
    imagePath: '/images/items/amethyst_ore.webp',
  },
  ferriumOre: {
    label: '蓝铁矿',
    category: ItemCategory.naturalOre,
    imagePath: '/images/items/ferrium_ore.webp',
  },
  originiumOre: {
    label: '源石原矿',
    category: ItemCategory.naturalOre,
    imagePath: '/images/items/originium_ore.webp',
  },
  buckflower: {
    label: '荞花',
    category: ItemCategory.naturalPlant,
    imagePath: '/images/items/buckflower.webp',
  },
  citrome: {
    label: '柑实',
    category: ItemCategory.naturalPlant,
    imagePath: '/images/items/citrome.webp',
  },
  firebuckle: {
    label: '映火荞花',
    category: ItemCategory.naturalPlant,
    imagePath: '/images/items/firebuckle.webp',
  },
  jincao: {
    label: '锦草',
    category: ItemCategory.naturalPlant,
    imagePath: '/images/items/jincao.webp',
  },
  sandleaf: {
    label: '砂叶',
    category: ItemCategory.naturalPlant,
    imagePath: '/images/items/sandleaf.webp',
  },
  yazhen: {
    label: '芽针',
    category: ItemCategory.naturalPlant,
    imagePath: '/images/items/yazhen.webp',
  },
  amethystPowder: {
    label: '紫晶粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/amethyst_powder.webp',
  },
  carbonPowder: {
    label: '碳粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/carbon_powder.webp',
  },
  crystonPowder: {
    label: '高晶粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/cryston_powder.webp',
  },
  denseCarbonPowder: {
    label: '致密碳粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/dense_carbon_powder.webp',
  },
  denseFerriumPowder: {
    label: '致密蓝铁粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/dense_ferrium_powder.webp',
  },
  denseOriginiumPowder: {
    label: '致密源石粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/dense_originium_powder.webp',
  },
  denseOrigocrustPowder: {
    label: '致密晶体粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/dense_origocrust_powder.webp',
  },
  ferriumPowder: {
    label: '蓝铁粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/ferrium_powder.webp',
  },
  originiumPowder: {
    label: '源石粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/originium_powder.webp',
  },
  origocrustPowder: {
    label: '晶体外壳粉末',
    category: ItemCategory.orePowder,
    imagePath: '/images/items/origocrust_powder.webp',
  },
  amethystFiber: {
    label: '紫晶纤维',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/amethyst_fiber.webp',
  },
  carbon: {
    label: '碳',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/carbon.webp',
  },
  crystonFiber: {
    label: '高晶纤维',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/cryston_fiber.webp',
  },
  ferrium: {
    label: '蓝铁锭',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/ferrium.webp',
  },
  origocrust: {
    label: '晶体外壳',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/origocrust.webp',
  },
  packedOrigocrust: {
    label: '密制晶体',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/packed_origocrust.webp',
  },
  stabilizedCarbon: {
    label: '稳定碳块',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/stabilized_carbon.webp',
  },
  steel: {
    label: '钢块',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/steel.webp',
  },
  xiranite: {
    label: '息壤',
    category: ItemCategory.oreRefined,
    imagePath: '/images/items/xiranite.webp',
  },
  cleanWater: {
    label: '纯净水',
    category: ItemCategory.other,
    imagePath: '/images/items/clean_water.webp',
  },
  amethystPart: {
    label: '紫晶零件',
    category: ItemCategory.part,
    imagePath: '/images/items/amethyst_part.webp',
  },
  crystonPart: {
    label: '高晶零件',
    category: ItemCategory.part,
    imagePath: '/images/items/cryston_part.webp',
  },
  ferriumPart: {
    label: '铁制零件',
    category: ItemCategory.part,
    imagePath: '/images/items/ferrium_part.webp',
  },
  steelPart: {
    label: '钢制零件',
    category: ItemCategory.part,
    imagePath: '/images/items/steel_part.webp',
  },
  buckflowerPowder: {
    label: '荞花粉末',
    category: ItemCategory.plantPowder,
    imagePath: '/images/items/buckflower_powder.webp',
  },
  citromePowder: {
    label: '柑实粉末',
    category: ItemCategory.plantPowder,
    imagePath: '/images/items/citrome_powder.webp',
  },
  groundBuckflowerPowder: {
    label: '细磨荞花粉末',
    category: ItemCategory.plantPowder,
    imagePath: '/images/items/ground_buckflower_powder.webp',
  },
  groundCitromePowder: {
    label: '研磨柑实粉末',
    category: ItemCategory.plantPowder,
    imagePath: '/images/items/ground_citrome_powder.webp',
  },
  sandleafPowder: {
    label: '砂叶粉末',
    category: ItemCategory.plantPowder,
    imagePath: '/images/items/sandleaf_powder.webp',
  },
  yazhenPowder: {
    label: '芽针粉末',
    category: ItemCategory.plantPowder,
    imagePath: '/images/items/yazhen_powder.webp',
  },
  buckflowerSeed: {
    label: '荞花种子',
    category: ItemCategory.plantSeed,
    imagePath: '/images/items/buckflower_seed.webp',
  },
  citromeSeed: {
    label: '柑实种子',
    category: ItemCategory.plantSeed,
    imagePath: '/images/items/citrome_seed.webp',
  },
  sandleafSeed: {
    label: '砂叶种子',
    category: ItemCategory.plantSeed,
    imagePath: '/images/items/sandleaf_seed.webp',
  },
  yazhenSolution: {
    label: '芽针溶液',
    category: ItemCategory.solution,
    imagePath: '/images/items/yazhen_solution.webp',
  },
};
