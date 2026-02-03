import AddIcon from '@mui/icons-material/Add';
import { Button, Paper, Stack, Typography } from '@mui/material';
import type { AicProductKey } from '@receipts';
import type { DesiredOutput } from './calculator_state';
import { DesiredOutputRow } from './desired_output_row';

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
    <Paper variant="outlined" sx={{ p: { xs: 1, sm: 2 } }}>
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
