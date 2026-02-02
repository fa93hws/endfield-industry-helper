import AppLayout from '@ui/layout/app_layout';
import { receiptSections } from '@data/receipts';
import { Typography, Stack } from '@mui/material';
import ReceiptSection from './receipt_section';

export default function Page() {
  return (
    <AppLayout current="receipts">
      <Typography variant="h4" gutterBottom>
        配方
      </Typography>

      <Stack spacing={2}>
        {receiptSections.map((section) => (
          <ReceiptSection key={section.title} title={section.title} recipes={section.recipes} />
        ))}
      </Stack>
    </AppLayout>
  );
}
