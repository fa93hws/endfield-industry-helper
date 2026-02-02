import { images } from '@data/items/images';
import { allProduces } from '@data/items/aic';
import { naturalItems } from '@data/items/natural';
import { Receipt } from '@data/receipts/type';
import { Box, Typography, Stack, Avatar } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HighlightText from './highlight_text';

interface RecipeItemProps {
  recipe: Receipt;
  searchQuery?: string;
}

const allItems = { ...naturalItems, ...allProduces };

export default function RecipeItem({ recipe, searchQuery = '' }: RecipeItemProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
      {/* Inputs */}
      <Stack direction="row" spacing={1} alignItems="center">
        {recipe.inputs.map((input, i) => (
          <Stack key={i} direction="row" spacing={1} alignItems="center">
            <Avatar
              src={images[input.item]}
              alt={allItems[input.item]}
              variant="square"
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <HighlightText text={allItems[input.item]} query={searchQuery} variant="body2" />
              <Typography variant="caption" color="text.secondary">
                {input.perMin}/min
              </Typography>
            </Box>
            {i < recipe.inputs.length - 1 && (
              <Typography variant="body2" color="text.secondary">
                +
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>

      {/* Arrow */}
      <ArrowForwardIcon color="action" />

      {/* Outputs */}
      <Stack direction="row" spacing={1} alignItems="center">
        {recipe.outputs.map((output, i) => (
          <Stack key={i} direction="row" spacing={1} alignItems="center">
            <Avatar
              src={images[output.item]}
              alt={allItems[output.item]}
              variant="square"
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <HighlightText text={allItems[output.item]} query={searchQuery} variant="body2" />
              <Typography variant="caption" color="text.secondary">
                {output.perMin}/min
              </Typography>
            </Box>
            {i < recipe.outputs.length - 1 && (
              <Typography variant="body2" color="text.secondary">
                +
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
