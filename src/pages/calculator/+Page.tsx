import { Typography, Stack } from '@mui/material';
import { AppLayout } from '@ui/layout/app_layout';
import { useCalculator } from './calculator_state';
import { DesiredOutputsSection } from './desired_outputs_section';
import { ProductionChainSection } from './production_chain_section';
import { NaturalResourcesSection } from './natural_resources_section';
import { AicProductKey } from '@data/items/aic';

export function Page() {
  const {
    desiredOutputs,
    naturalResources,
    intermediateProducts,
    productionTrees,
    addDesiredOutput,
    removeDesiredOutput,
    updateQuantity,
    updateItem,
    selectRecipe,
  } = useCalculator();

  const handleAddOutput = () => {
    // Add with null item and default quantity, user will select
    // We need to provide a default item to satisfy TypeScript
    const defaultItem = 'carbon' as AicProductKey;
    addDesiredOutput(defaultItem, 30);
  };

  return (
    <AppLayout current="calculator">
      <Typography variant="h4" gutterBottom>
        生产计算器
      </Typography>

      <Stack spacing={3}>
        <DesiredOutputsSection
          desiredOutputs={desiredOutputs}
          onAdd={handleAddOutput}
          onItemChange={updateItem}
          onQuantityChange={updateQuantity}
          onRemove={removeDesiredOutput}
        />

        <NaturalResourcesSection naturalResources={naturalResources} />

        <ProductionChainSection
          intermediateProducts={intermediateProducts}
          productionTrees={productionTrees}
          onRecipeChange={selectRecipe}
        />
      </Stack>
    </AppLayout>
  );
}
