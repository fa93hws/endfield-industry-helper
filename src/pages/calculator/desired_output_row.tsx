import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Stack } from '@mui/material';
import { AicProductKey } from '@data/items/aic';
import { ItemSelector } from './item_selector';
import { QuantityInput } from './quantity_input';

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
    <Stack direction="row" spacing={2} alignItems="center" sx={{ maxWidth: 350 }}>
      <Box sx={{ flex: '0 0 55%' }}>
        <ItemSelector value={item} onChange={onItemChange} />
      </Box>
      <Box sx={{ flex: '0 0 20%' }}>
        <QuantityInput value={quantity} onChange={onQuantityChange} />
      </Box>
      <Box sx={{ flex: '0 0 25%' }}>
        <IconButton onClick={onRemove} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Stack>
  );
}
