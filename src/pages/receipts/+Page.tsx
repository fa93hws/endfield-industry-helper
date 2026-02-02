import AppLayout from '@ui/layout/app_layout';
import { allReceipts } from '@data/receipts';
import { sortReceiptsByOutput } from '@data/receipts/sort';
import { images } from '@data/items/images';
import { aicProducts } from '@data/items/aic';
import { naturalItems } from '@data/items/natural';
import { Box, Typography, Stack, Avatar, Paper } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Page() {
  const allItems = { ...naturalItems, ...aicProducts };
  const sortedReceipts = sortReceiptsByOutput(allReceipts);

  return (
    <AppLayout current="receipts">
      <Typography variant="h4" gutterBottom>
        配方
      </Typography>

      <Stack spacing={1}>
        {sortedReceipts.map((receipt, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              {/* Outputs */}
              <Stack direction="row" spacing={1} alignItems="center">
                {receipt.outputs.map((output, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={images[output.item]}
                      alt={allItems[output.item]}
                      variant="square"
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box>
                      <Typography variant="body2" noWrap>
                        {allItems[output.item]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {output.perMin}/min
                      </Typography>
                    </Box>
                    {i < receipt.outputs.length - 1 && (
                      <Typography variant="body2" color="text.secondary">
                        +
                      </Typography>
                    )}
                  </Stack>
                ))}
              </Stack>

              {/* Arrow */}
              <ArrowForwardIcon color="action" sx={{ transform: 'rotate(180deg)' }} />

              {/* Inputs */}
              <Stack direction="row" spacing={1} alignItems="center">
                {receipt.inputs.map((input, i) => (
                  <Stack key={i} direction="row" spacing={1} alignItems="center">
                    <Avatar
                      src={images[input.item]}
                      alt={allItems[input.item]}
                      variant="square"
                      sx={{ width: 32, height: 32 }}
                    />
                    <Box>
                      <Typography variant="body2" noWrap>
                        {allItems[input.item]}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {input.perMin}/min
                      </Typography>
                    </Box>
                    {i < receipt.inputs.length - 1 && (
                      <Typography variant="body2" color="text.secondary">
                        +
                      </Typography>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </AppLayout>
  );
}
