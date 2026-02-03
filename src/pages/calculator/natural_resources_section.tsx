import { Paper, Stack, Typography } from '@mui/material';
import { ores, plants, type NaturalItemKey } from '@receipts';
import { NaturalResourceItem } from './natural_resource_item';

interface NaturalResourcesSectionProps {
  naturalResources: Map<NaturalItemKey, number>;
}

// Get keys from categorized objects
const oreKeys = Object.keys(ores) as NaturalItemKey[];
const plantKeys = Object.keys(plants) as NaturalItemKey[];

function sortNaturalResources(a: [NaturalItemKey, number], b: [NaturalItemKey, number]): number {
  const [itemA] = a;
  const [itemB] = b;

  // Determine category
  const categoryA = oreKeys.includes(itemA) ? 0 : plantKeys.includes(itemA) ? 1 : 2;
  const categoryB = oreKeys.includes(itemB) ? 0 : plantKeys.includes(itemB) ? 1 : 2;

  // First sort by category
  if (categoryA !== categoryB) {
    return categoryA - categoryB;
  }

  // Within same category, sort alphabetically
  return itemA.localeCompare(itemB);
}

export function NaturalResourcesSection({ naturalResources }: NaturalResourcesSectionProps) {
  const resources = Array.from(naturalResources.entries()).sort(sortNaturalResources);

  if (resources.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
        <Typography variant="h6" gutterBottom>
          所需自然资源
        </Typography>
        <Typography variant="body2" color="text.secondary">
          请先添加目标产品
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant="h6" gutterBottom>
        所需自然资源 ({resources.length})
      </Typography>
      <Stack spacing={1.5}>
        {resources.map(([item, quantity]) => (
          <NaturalResourceItem key={item} item={item} quantity={quantity} />
        ))}
      </Stack>
    </Paper>
  );
}
