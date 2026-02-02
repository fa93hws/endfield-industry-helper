import { Stack, Button, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DesiredOutputRow } from './desired_output_row';
import { DesiredOutput } from './calculator_state';
import { AicProductKey } from '@data/items/aic';

interface DesiredOutputsSectionProps {
  desiredOutputs: DesiredOutput[];
  onAdd: () => void;
  onItemChange: (id: string, item: AicProductKey) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function DesiredOutputsSection({
  desiredOutputs,
  onAdd,
  onItemChange,
  onQuantityChange,
  onRemove,
}: DesiredOutputsSectionProps) {
  return (
    <Paper variant="outlined" sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        选择目标产品
      </Typography>
      <Stack spacing={2}>
        {desiredOutputs.map((output) => (
          <DesiredOutputRow
            key={output.id}
            item={output.item}
            quantity={output.quantity}
            onItemChange={(item) => item && onItemChange(output.id, item)}
            onQuantityChange={(quantity) => onQuantityChange(output.id, quantity)}
            onRemove={() => onRemove(output.id)}
          />
        ))}
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={onAdd}
          sx={{ alignSelf: 'flex-start' }}
        >
          添加产品
        </Button>
      </Stack>
    </Paper>
  );
}
