const oreRefined = {
  carbon: '碳',
  origocrust: '晶体外壳',
  amethystFiber: '紫晶纤维',
  ferrium: '蓝铁锭',
  // cuprium: '铜锭',
  stabilizedCarbon: '稳定碳块',
  packedOrigocrust: '密制晶体',
  crystonFiber: '高晶纤维',
  steel: '钢块',
};

const orePowder = {
  carbonPowder: '碳粉末',
  originiumPowder: '源石粉末',
  origocrustPowder: '晶体外壳粉末',
  amethystPowder: '紫晶粉末',
  ferriumPowder: '蓝铁粉末',
  // cupriumPowder: '铜粉末',
  denseOriginiumPowder: '致密源石粉末',
  denseCarbonPowder: '致密碳粉末',
  denseOrigocrustPowder: '致密晶体粉末',
  crystonPowder: '高晶粉末',
  denseFerriumPowder: '致密蓝铁粉末',
};

const plants = {
  sandleafPowder: '砂叶粉末',
  aketinePowder: '酮化灌木粉末',
  buckflowerPowder: '荞花粉末',
  groundBuckflowerPowder: '细磨荞花粉末',
  citromePowder: '柑实粉末',
  groundCitromePowder: '研磨柑实粉末',
};

const bottles = {
  amethystBottle: '紫晶质瓶',
  crystonBottle: ' 高晶质瓶',
  ferriumBottle: '蓝铁瓶',
  steelBottle: '钢质瓶',
};

const batteries = {
  batteryValleyLc: '低容谷地电池',
  // jincaoSolution: '锦草溶液',
  batteryValleySc: '中容谷底电池',
  // yazhenSolution: '牙珍溶液',
  batteryValleyHc: '高容谷底电池',
  batteryWulingLc: '低容武陵电池',
};

const parts = {
  amethystPart: '紫晶零件',
  crystonPart: '高晶零件',
  ferriumPart: '铁制零件',
  steelPart: '钢制零件',
  cupriumPart: '铜制零件',
  amethystComponent: '紫晶装备原件',
  ferriumComponent: '蓝铁装备原件',
  crystonComponent: '高晶装备原件',
};

const medicines = {
  buckCapsuleC: '荞愈胶囊',
  buckCapsuleB: '优质荞愈胶囊',
  buckCapsuleA: '精选荞愈胶囊',
  CannedCitromeC: '柑实罐头',
  CannedCitromeB: '优质柑实罐头',
  CannedCitromeA: '精选柑实罐头',
};
export const allProduces = {
  ...oreRefined,
  ...orePowder,
  ...plants,
  ...bottles,
  ...batteries,
  ...parts,
  ...medicines,
};

export type AicProductKey = keyof typeof allProduces;
