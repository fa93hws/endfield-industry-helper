import { Stack, Typography } from '@mui/material';
import { AppLayout } from '@ui/layout/app_layout';
import { useCalculator } from './calculator_state';
import { DesiredOutputsSection } from './desired_outputs_section';
import { NaturalResourcesSection } from './natural_resources_section';
import { ProductionChainSection } from './production_chain_section';

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
    // Add with default item, quantity will be auto-detected from recipe
    const defaultItem = 'battery_valley_hc';
    addDesiredOutput(defaultItem);
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
