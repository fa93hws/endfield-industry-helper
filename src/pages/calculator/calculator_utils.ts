import { AicProductKey } from '@data/items/aic';
import { NaturalItemKey, naturalItems } from '@data/items/natural';
import { allReceipts } from '@data/receipts';
import { Receipt } from '@data/receipts/type';

export interface ProductionNode {
  item: AicProductKey | NaturalItemKey;
  quantity: number; // Units per minute
  recipe: Receipt | null; // null for natural resources
  children: ProductionNode[];
  isCircular?: boolean; // Flag for circular dependencies
}

/**
 * Build a map of all recipes indexed by their output items
 */
export function buildRecipeMap(): Map<AicProductKey, Receipt[]> {
  const map = new Map<AicProductKey, Receipt[]>();

  allReceipts.forEach((receipt) => {
    receipt.outputs.forEach((output) => {
      const item = output.item as AicProductKey;
      if (!map.has(item)) {
        map.set(item, []);
      }
      map.get(item)!.push(receipt);
    });
  });

  return map;
}

/**
 * Check if an item is a natural resource (cannot be produced)
 */
export function isNaturalResource(item: string): item is NaturalItemKey {
  return item in naturalItems;
}

/**
 * Get the default recipe for an item (first available recipe)
 */
export function getDefaultRecipe(
  item: AicProductKey,
  recipeMap: Map<AicProductKey, Receipt[]>,
): Receipt | null {
  const recipes = recipeMap.get(item);
  return recipes && recipes.length > 0 ? recipes[0] : null;
}

/**
 * Build a production tree recursively from a target item and quantity
 * Returns the tree structure showing all dependencies down to natural resources
 */
export function buildProductionTree(
  targetItem: AicProductKey | NaturalItemKey,
  targetQuantity: number,
  recipeChoices: Map<AicProductKey, Receipt>,
  recipeMap: Map<AicProductKey, Receipt[]>,
  visited: Set<string> = new Set(),
): ProductionNode {
  // Base case: natural resource
  if (isNaturalResource(targetItem)) {
    return {
      item: targetItem,
      quantity: targetQuantity,
      recipe: null,
      children: [],
    };
  }

  // Cycle detection
  if (visited.has(targetItem)) {
    return {
      item: targetItem,
      quantity: targetQuantity,
      recipe: null,
      children: [],
      isCircular: true,
    };
  }

  // Get the chosen recipe or default
  const recipe =
    recipeChoices.get(targetItem as AicProductKey) ??
    getDefaultRecipe(targetItem as AicProductKey, recipeMap);

  // No recipe available
  if (!recipe) {
    return {
      item: targetItem,
      quantity: targetQuantity,
      recipe: null,
      children: [],
    };
  }

  // Find the output rate for this item in the recipe
  const outputItem = recipe.outputs.find((o) => o.item === targetItem);
  if (!outputItem) {
    return {
      item: targetItem,
      quantity: targetQuantity,
      recipe: null,
      children: [],
    };
  }

  // Calculate how many cycles per minute we need
  const cyclesPerMin = targetQuantity / outputItem.perMin;

  // Mark as visited for cycle detection
  const newVisited = new Set(visited);
  newVisited.add(targetItem);

  // Recursively build children for each input
  const children = recipe.inputs.map((input) => {
    const childQuantity = input.perMin * cyclesPerMin;
    return buildProductionTree(input.item, childQuantity, recipeChoices, recipeMap, newVisited);
  });

  return {
    item: targetItem,
    quantity: targetQuantity,
    recipe,
    children,
  };
}

/**
 * Aggregate natural resources from multiple production trees
 * Returns a map of natural resource -> total quantity needed
 */
export function aggregateNaturalResources(
  productionTrees: ProductionNode[],
): Map<NaturalItemKey, number> {
  const resources = new Map<NaturalItemKey, number>();

  function traverse(node: ProductionNode) {
    // If this is a natural resource, add to totals
    if (node.recipe === null && !node.isCircular && isNaturalResource(node.item)) {
      const current = resources.get(node.item) ?? 0;
      resources.set(node.item, current + node.quantity);
      return;
    }

    // Traverse children
    node.children.forEach((child) => traverse(child));
  }

  // Traverse all trees and aggregate
  productionTrees.forEach((tree) => traverse(tree));

  return resources;
}

export interface IntermediateProduct {
  quantity: number;
  alternativeRecipes: Receipt[];
  chosenRecipe: Receipt;
}

/**
 * Aggregate all intermediate products (non-natural items) from production trees
 * Useful for displaying the full production chain
 */
export function aggregateIntermediateProducts(
  productionTrees: ProductionNode[],
  recipeChoices: Map<AicProductKey, Receipt>,
  recipeMap: Map<AicProductKey, Receipt[]>,
): Map<AicProductKey, IntermediateProduct> {
  const products = new Map<AicProductKey, IntermediateProduct>();

  function traverse(node: ProductionNode) {
    if (node.recipe === null || node.isCircular || isNaturalResource(node.item)) {
      return;
    }

    const item = node.item as AicProductKey;
    const existing = products.get(item);

    if (existing) {
      // Accumulate quantity
      existing.quantity += node.quantity;
    } else {
      // First occurrence
      const alternativeRecipes = recipeMap.get(item) ?? [node.recipe];
      const chosenRecipe = recipeChoices.get(item) ?? node.recipe;

      products.set(item, {
        quantity: node.quantity,
        alternativeRecipes,
        chosenRecipe,
      });
    }

    // Traverse children
    node.children.forEach((child) => traverse(child));
  }

  productionTrees.forEach((tree) => traverse(tree));
  return products;
}
