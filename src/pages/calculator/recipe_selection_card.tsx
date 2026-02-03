import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { allProduces, type AicProductKey } from '@data/items/aic';
import type { Receipt } from '@data/receipts/type';
import { RecipeItem } from '@ui/recipe/recipe_item';

interface RecipeSelectionCardProps {
  item: AicProductKey;
  quantity: number;
  alternativeRecipes: Receipt[];
  chosenRecipe: Receipt;
  onRecipeChange: (recipe: Receipt) => void;
}

export function RecipeSelectionCard({
  item,
  quantity,
  alternativeRecipes,
  chosenRecipe,
  onRecipeChange,
}: RecipeSelectionCardProps) {
  const hasAlternatives = alternativeRecipes.length > 1;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {allProduces[item]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {quantity.toFixed(1)}/分钟
          </Typography>
          {hasAlternatives && (
            <Chip label={`其他配方(${alternativeRecipes.length - 1})`} size="small" />
          )}
        </Stack>

        <RecipeItem recipe={chosenRecipe} />

        {hasAlternatives && (
          <Accordion disableGutters elevation={0}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" color="text.secondary">
                查看所有配方
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup
                value={alternativeRecipes.indexOf(chosenRecipe)}
                onChange={(e) => onRecipeChange(alternativeRecipes[parseInt(e.target.value)])}
              >
                <Stack spacing={1}>
                  {alternativeRecipes.map((recipe, index) => (
                    <FormControlLabel
                      key={index}
                      value={index}
                      control={<Radio />}
                      label={<RecipeItem recipe={recipe} />}
                    />
                  ))}
                </Stack>
              </RadioGroup>
            </AccordionDetails>
          </Accordion>
        )}
      </Stack>
    </Paper>
  );
}
