import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { items, type Item } from '@receipts/generated/items';
import type { Receipt } from '@receipts/generated/receipts';
import { HighlightText } from './highlight_text';

interface RecipeItemProps {
  recipe: Receipt;
  searchQuery?: string;
  scaleFactor?: number;
}

function ItemDisplay({
  item,
  searchQuery,
  perMin,
  appendPlus,
}: {
  item: Item;
  searchQuery: string;
  perMin: number;
  appendPlus: boolean;
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar
        src={item.imagePath}
        alt={item.label}
        variant="square"
        sx={{ width: 32, height: 32 }}
      />
      <Box>
        <HighlightText text={item.label} query={searchQuery} variant="body2" />
        <Typography variant="caption" color="text.secondary">
          {perMin}/min
        </Typography>
      </Box>
      {appendPlus && (
        <Typography variant="body2" color="text.secondary">
          +
        </Typography>
      )}
    </Stack>
  );
}

export function RecipeItem({ recipe, searchQuery = '', scaleFactor }: RecipeItemProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      {scaleFactor != null && (
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            minWidth: 'fit-content',
          }}
        >
          {scaleFactor.toFixed(2)}x
        </Typography>
      )}
      <Stack direction="row" spacing={1} alignItems="center">
        {recipe.inputs.map((input, i) => (
          <ItemDisplay
            key={i}
            item={items[input.item]}
            searchQuery={searchQuery}
            perMin={input.perMin}
            appendPlus={i < recipe.inputs.length - 1}
          />
        ))}
      </Stack>
      <ArrowForwardIcon color="action" />
      <Stack direction="row" spacing={1} alignItems="center">
        {recipe.outputs.map((output, i) => (
          <ItemDisplay
            key={i}
            item={items[output.item]}
            searchQuery={searchQuery}
            perMin={output.perMin}
            appendPlus={i < recipe.outputs.length - 1}
          />
        ))}
      </Stack>
    </Stack>
  );
}
