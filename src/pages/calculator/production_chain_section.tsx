import { Stack, Paper, Typography } from '@mui/material';
import { RecipeSelectionCard } from './recipe_selection_card';
import { IntermediateProduct, ProductionNode } from './calculator_utils';
import { AicProductKey } from '@data/items/aic';
import { Receipt } from '@data/receipts/type';
import { topologicalSort } from './topsort_utils';

interface ProductionChainSectionProps {
  intermediateProducts: Map<AicProductKey, IntermediateProduct>;
  productionTrees: ProductionNode[];
  onRecipeChange: (item: AicProductKey, recipe: Receipt) => void;
}

export function ProductionChainSection({
  intermediateProducts,
  productionTrees,
  onRecipeChange,
}: ProductionChainSectionProps) {
  // Topologically sort products by dependency order
  const products = topologicalSort(Array.from(intermediateProducts.entries()), productionTrees);

  if (products.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          生产链
        </Typography>
        <Typography variant="body2" color="text.secondary">
          请先添加目标产品
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        生产链 ({products.length} 种中间产品)
      </Typography>
      <Stack spacing={2}>
        {products.map(([item, product]) => (
          <RecipeSelectionCard
            key={item}
            item={item}
            quantity={product.quantity}
            alternativeRecipes={product.alternativeRecipes}
            chosenRecipe={product.chosenRecipe}
            onRecipeChange={(recipe) => onRecipeChange(item, recipe)}
          />
        ))}
      </Stack>
    </Paper>
  );
}
