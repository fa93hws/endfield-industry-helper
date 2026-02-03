import type { AicProductKey } from '@receipts';
import type { IntermediateProduct, ProductionNode } from './calculator_utils';

/**
 * Calculate the depth of each item in the production tree
 * Items closer to natural resources have lower depth
 * Items that depend on other items have higher depth
 */
function calculateDepths(
  productionTrees: ProductionNode[],
  itemDepths: Map<AicProductKey, number>,
) {
  function traverse(node: ProductionNode, currentDepth: number) {
    // Skip natural resources and circular dependencies
    if (node.recipe === null || node.isCircular) {
      return;
    }

    const item = node.item as AicProductKey;
    const existingDepth = itemDepths.get(item);

    // Update depth if this path is deeper (item depends on more things)
    if (existingDepth === undefined || currentDepth > existingDepth) {
      itemDepths.set(item, currentDepth);
    }

    // Traverse children with increased depth
    node.children.forEach((child) => traverse(child, currentDepth + 1));
  }

  // Start from depth 0 for all top-level outputs
  productionTrees.forEach((tree) => traverse(tree, 0));
}

/**
 * Topologically sort items by their depth in the production tree
 * Items with lower depth (closer to natural resources) come first
 * Items with higher depth (depend on other items) come later
 */
export function topologicalSort(
  items: [AicProductKey, IntermediateProduct][],
  productionTrees: ProductionNode[],
): [AicProductKey, IntermediateProduct][] {
  const itemDepths = new Map<AicProductKey, number>();

  // Calculate depths for all items
  calculateDepths(productionTrees, itemDepths);

  // Sort by depth (ascending) - items needed first have lower depth
  return items.sort((a, b) => {
    const depthA = itemDepths.get(a[0]) ?? 0;
    const depthB = itemDepths.get(b[0]) ?? 0;

    // Sort by depth first
    if (depthA !== depthB) {
      return depthB - depthA; // Higher depth = needed later = comes later
    }

    // If same depth, sort alphabetically
    return a[0].localeCompare(b[0]);
  });
}
