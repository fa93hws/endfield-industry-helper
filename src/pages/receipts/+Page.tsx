import { useState, useMemo } from 'react';
import { AppLayout } from '@ui/layout/app_layout';
import { receiptSections } from '@data/receipts';
import { Typography, Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { ReceiptSection } from './receipt_section';
import { allProduces } from '@data/items/aic';
import { naturalItems } from '@data/items/natural';

export function Page() {
  const [searchQuery, setSearchQuery] = useState('');

  // Combine all items for name lookup
  const allItems = useMemo(() => ({ ...allProduces, ...naturalItems }), []);

  // Filter recipes based on search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      return receiptSections;
    }

    const query = searchQuery.toLowerCase();

    return receiptSections
      .map((section) => ({
        ...section,
        recipes: section.recipes.filter((recipe) => {
          // Check if any input or output matches the search query
          const matchesInput = recipe.inputs.some((input) => {
            const itemName = allItems[input.item as keyof typeof allItems];
            return itemName?.toLowerCase().includes(query);
          });

          const matchesOutput = recipe.outputs.some((output) => {
            const itemName = allItems[output.item as keyof typeof allItems];
            return itemName?.toLowerCase().includes(query);
          });

          return matchesInput || matchesOutput;
        }),
      }))
      .filter((section) => section.recipes.length > 0); // Only show sections with matching recipes
  }, [searchQuery, allItems]);

  return (
    <AppLayout current="receipts">
      <Typography variant="h4" gutterBottom>
        配方
      </Typography>

      <TextField
        fullWidth
        placeholder="搜索配方... (输入物品名称)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Stack spacing={2}>
        {filteredSections.length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            未找到匹配的配方
          </Typography>
        ) : (
          filteredSections.map((section) => (
            <ReceiptSection
              key={section.title}
              title={section.title}
              recipes={section.recipes}
              searchQuery={searchQuery}
            />
          ))
        )}
      </Stack>
    </AppLayout>
  );
}
