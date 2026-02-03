import { Avatar, Box, Stack, Typography } from '@mui/material';
import { images, naturalItems } from '@receipts';

interface NaturalResourceItemProps {
  item: string;
  quantity: number;
}

export function NaturalResourceItem({ item, quantity }: NaturalResourceItemProps) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        src={images[item]}
        alt={naturalItems[item]}
        variant="square"
        sx={{ width: 32, height: 32 }}
      />
      <Box>
        <Typography variant="body1">{naturalItems[item]}</Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {quantity.toFixed(1)}/分钟
      </Typography>
    </Stack>
  );
}
