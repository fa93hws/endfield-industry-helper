import { Receipt } from '@data/receipts/type';
import { Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecipeGroup from './recipe_group';
import { sortReceiptsByOutput } from '@data/receipts/sort';

interface ReceiptSectionProps {
  title: string;
  recipes: Receipt[];
  searchQuery?: string;
}

export default function ReceiptSection({ title, recipes, searchQuery = '' }: ReceiptSectionProps) {
  const sortedReceipts = sortReceiptsByOutput(recipes);

  // Group receipts by output item
  const groupedReceipts = sortedReceipts.reduce(
    (acc, receipt) => {
      const outputKey = receipt.outputs[0].item;
      if (!acc[outputKey]) {
        acc[outputKey] = [];
      }
      acc[outputKey].push(receipt);
      return acc;
    },
    {} as Record<string, Receipt[]>,
  );

  return (
    <Accordion defaultExpanded={true} disableGutters>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          {Object.entries(groupedReceipts).map(([outputKey, recipes]) => (
            <RecipeGroup key={outputKey} recipes={recipes} searchQuery={searchQuery} />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
