import { useCallback, useMemo, useState } from 'react';
import type { AicProductKey, NaturalItemKey, Receipt } from '@receipts';
import {
  aggregateIntermediateProducts,
  aggregateNaturalResources,
  buildProductionTree,
  buildRecipeMap,
  type IntermediateProduct,
  type ProductionNode,
} from './calculator_utils';

export interface DesiredOutput {
  id: string; // Unique ID for React keys
  item: AicProductKey;
  quantity: number; // Target quantity per minute
}

export interface CalculatorState {
  desiredOutputs: DesiredOutput[];
  recipeChoices: Map<AicProductKey, Receipt>;
  productionTrees: ProductionNode[];
  naturalResources: Map<NaturalItemKey, number>;
  intermediateProducts: Map<AicProductKey, IntermediateProduct>;
}

export function useCalculator() {
  const [desiredOutputs, setDesiredOutputs] = useState<DesiredOutput[]>([]);
  const [recipeChoices, setRecipeChoices] = useState<Map<AicProductKey, Receipt>>(new Map());

  // Memoize the recipe map since it doesn't change
  const recipeMap = useMemo(() => buildRecipeMap(), []);

  // Recalculate production trees whenever desired outputs or recipe choices change
  const productionTrees = useMemo(() => {
    return desiredOutputs.map((output) =>
      buildProductionTree(output.item, output.quantity, recipeChoices, recipeMap),
    );
  }, [desiredOutputs, recipeChoices, recipeMap]);

  // Aggregate natural resources from all trees
  const naturalResources = useMemo(() => {
    return aggregateNaturalResources(productionTrees);
  }, [productionTrees]);

  // Aggregate intermediate products for display
  const intermediateProducts = useMemo(() => {
    return aggregateIntermediateProducts(productionTrees, recipeChoices, recipeMap);
  }, [productionTrees, recipeChoices, recipeMap]);

  // Add a new desired output
  const addDesiredOutput = useCallback((item: AicProductKey, quantity: number) => {
    const newOutput: DesiredOutput = {
      id: `${Date.now()}-${Math.random()}`,
      item,
      quantity,
    };
    setDesiredOutputs((prev) => [...prev, newOutput]);
  }, []);

  // Remove a desired output by ID
  const removeDesiredOutput = useCallback((id: string) => {
    setDesiredOutputs((prev) => prev.filter((output) => output.id !== id));
  }, []);

  // Update the quantity of a desired output
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setDesiredOutputs((prev) =>
      prev.map((output) => (output.id === id ? { ...output, quantity } : output)),
    );
  }, []);

  // Update the item of a desired output
  const updateItem = useCallback((id: string, item: AicProductKey) => {
    setDesiredOutputs((prev) =>
      prev.map((output) => (output.id === id ? { ...output, item } : output)),
    );
  }, []);

  // Select a specific recipe for an item
  const selectRecipe = useCallback((item: AicProductKey, recipe: Receipt) => {
    setRecipeChoices((prev) => {
      const newChoices = new Map(prev);
      newChoices.set(item, recipe);
      return newChoices;
    });
  }, []);

  // Get available recipes for an item
  const getAvailableRecipes = useCallback(
    (item: AicProductKey): Receipt[] => {
      return recipeMap.get(item) ?? [];
    },
    [recipeMap],
  );

  return {
    // State
    desiredOutputs,
    recipeChoices,
    productionTrees,
    naturalResources,
    intermediateProducts,
    recipeMap,

    // Actions
    addDesiredOutput,
    removeDesiredOutput,
    updateQuantity,
    updateItem,
    selectRecipe,
    getAvailableRecipes,
  };
}
