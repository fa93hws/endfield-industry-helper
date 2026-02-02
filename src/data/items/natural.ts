export const ores = {
  originiumOre: '源石原矿',
  amethystOre: '紫水晶矿',
  ferriumOre: '蓝铁矿',
};

export const plants = {
  buckflower: '荞花',
  buckflowerSeed: '荞花种子',
  firebuckle: '映火荞花',
  sandleaf: '砂叶',
  sandleafSeed: '砂叶种子',
  citrome: '柑实',
  citromeSeed: '柑实种子',
};

export const otherNaturalItems = {
  cleanWater: '纯净水',
};

export const naturalItems = {
  ...ores,
  ...plants,
  ...otherNaturalItems,
};

export type NaturalItemKey = keyof typeof naturalItems;
