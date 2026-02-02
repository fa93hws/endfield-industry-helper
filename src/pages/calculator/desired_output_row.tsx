import { Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ItemSelector } from './item_selector';
import { QuantityInput } from './quantity_input';
import { AicProductKey } from '@data/items/aic';

interface DesiredOutputRowProps {
  item: AicProductKey | null;
  quantity: number;
  onItemChange: (item: AicProductKey | null) => void;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export function DesiredOutputRow({
  item,
  quantity,
  onItemChange,
  onQuantityChange,
  onRemove,
}: DesiredOutputRowProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <ItemSelector value={item} onChange={onItemChange} />
      <QuantityInput value={quantity} onChange={onQuantityChange} />
      <IconButton onClick={onRemove} color="error" sx={{ mt: 1 }}>
        <DeleteIcon />
      </IconButton>
    </Stack>
  );
}
