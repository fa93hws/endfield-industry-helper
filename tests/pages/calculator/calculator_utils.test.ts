import { describe, expect, it } from 'vitest';
import {
  aggregateNaturalResources,
  buildProductionTree,
  buildRecipeMap,
  isNaturalResource,
} from '../../../src/pages/calculator/calculator_utils';

describe('Calculator Utilities', () => {
  describe('buildRecipeMap', () => {
    it('should build a map of recipes indexed by output items', () => {
      const recipeMap = buildRecipeMap();

      // Check that map is not empty
      expect(recipeMap.size).toBeGreaterThan(0);

      // Check that carbon has recipes
      const carbonRecipes = recipeMap.get('carbon');
      expect(carbonRecipes).toBeDefined();
      expect(carbonRecipes!.length).toBeGreaterThan(0);
    });

    it('should handle items with multiple recipes', () => {
      const recipeMap = buildRecipeMap();

      // origocrust has multiple production methods
      const origocrustRecipes = recipeMap.get('origocrust');
      expect(origocrustRecipes).toBeDefined();
      expect(origocrustRecipes!.length).toBeGreaterThan(1);
    });
  });

  describe('isNaturalResource', () => {
    it('should return true for natural resources', () => {
      expect(isNaturalResource('sandleaf')).toBe(true);
      expect(isNaturalResource('buckflower')).toBe(true);
      expect(isNaturalResource('originiumOre')).toBe(true);
    });

    it('should return false for produced items', () => {
      expect(isNaturalResource('carbon')).toBe(false);
      expect(isNaturalResource('amethystBottle')).toBe(false);
      expect(isNaturalResource('batteryValleyLc')).toBe(false);
    });
  });

  describe('buildProductionTree', () => {
    it('should build a simple tree for natural resource', () => {
      const recipeMap = buildRecipeMap();
      const recipeChoices = new Map();

      const tree = buildProductionTree('sandleaf', 30, recipeChoices, recipeMap);

      expect(tree.item).toBe('sandleaf');
      expect(tree.quantity).toBe(30);
      expect(tree.recipe).toBeNull();
      expect(tree.children).toHaveLength(0);
    });

    it('should build a tree for a produced item', () => {
      const recipeMap = buildRecipeMap();
      const recipeChoices = new Map();

      const tree = buildProductionTree('carbon', 30, recipeChoices, recipeMap);

      expect(tree.item).toBe('carbon');
      expect(tree.quantity).toBe(30);
      expect(tree.recipe).not.toBeNull();
      expect(tree.children.length).toBeGreaterThan(0);
    });

    it('should calculate correct quantities for inputs', () => {
      const recipeMap = buildRecipeMap();
      const recipeChoices = new Map();

      // sandleafPowder: sandleaf (30/min) → sandleafPowder (30/min)
      const tree = buildProductionTree('sandleafPowder', 60, recipeChoices, recipeMap);

      expect(tree.quantity).toBe(60);
      // Should need 60 units of sandleaf input
      expect(tree.children[0].quantity).toBe(60);
    });
  });

  describe('aggregateNaturalResources', () => {
    it('should aggregate natural resources from a single tree', () => {
      const recipeMap = buildRecipeMap();
      const recipeChoices = new Map();

      const tree = buildProductionTree('carbon', 30, recipeChoices, recipeMap);
      const resources = aggregateNaturalResources([tree]);

      expect(resources.size).toBeGreaterThan(0);
      // Carbon can be made from sandleaf, buckflower, or originiumOre
      const totalResources = Array.from(resources.values()).reduce((sum, qty) => sum + qty, 0);
      expect(totalResources).toBeGreaterThan(0);
    });

    it('should aggregate resources from multiple trees', () => {
      const recipeMap = buildRecipeMap();
      const recipeChoices = new Map();

      const tree1 = buildProductionTree('carbon', 30, recipeChoices, recipeMap);
      const tree2 = buildProductionTree('carbon', 30, recipeChoices, recipeMap);
      const resources = aggregateNaturalResources([tree1, tree2]);

      // Resources should be doubled
      const totalResources = Array.from(resources.values()).reduce((sum, qty) => sum + qty, 0);
      expect(totalResources).toBeGreaterThan(0);
    });
  });
});
