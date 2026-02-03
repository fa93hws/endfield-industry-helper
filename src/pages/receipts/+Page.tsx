import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { items } from '@receipts/generated/items';
import { receipts } from '@receipts/generated/receipts';
import { groupReceiptsByCategory } from '@receipts/helper';
import { usePageContext } from 'vike-react/usePageContext';
import { navigate } from 'vike/client/router';
import { AppLayout } from '@ui/layout/app_layout';
import { ReceiptSection } from './receipt_section';

export function Page() {
  const pageContext = usePageContext();
  const urlQuery = (pageContext.urlParsed.search.q as string) || '';

  // Local state for input value
  const [inputValue, setInputValue] = React.useState(urlQuery);

  // Sync input when URL changes (e.g., browser back/forward)
  React.useEffect(() => {
    setInputValue(urlQuery);
  }, [urlQuery]);

  // Use URL query for filtering
  const searchQuery = urlQuery;
  const receiptSections = React.useMemo(() => groupReceiptsByCategory(receipts, items), []);

  // Filter recipes based on search query
  const filteredSections = React.useMemo(() => {
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
            const itemName = items[input.item];
            return itemName?.label.toLowerCase().includes(query);
          });

          const matchesOutput = recipe.outputs.some((output) => {
            const itemName = items[output.item];
            return itemName?.label.toLowerCase().includes(query);
          });

          return matchesInput || matchesOutput;
        }),
      }))
      .filter((section) => section.recipes.length > 0); // Only show sections with matching recipes
  }, [searchQuery, receiptSections]);

  const updateURL = React.useCallback((query: string) => {
    const searchParams = new URLSearchParams();

    if (query) {
      searchParams.set('q', query);
    }

    navigate(`/receipts?${searchParams.toString()}`, {
      keepScrollPosition: true,
    });
  }, []);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        updateURL(inputValue);
      }
    },
    [inputValue, updateURL],
  );

  const handleSearchClick = React.useCallback(() => {
    updateURL(inputValue);
  }, [inputValue, updateURL]);

  return (
    <AppLayout current="receipts">
      <Typography variant="h4" gutterBottom>
        配方
      </Typography>

      <TextField
        fullWidth
        placeholder="搜索配方... (输入物品名称)"
        value={inputValue}
        onChange={onChange}
        onKeyDown={onKeyDown}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleSearchClick} aria-label="搜索" size="small">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
          htmlInput: {
            enterKeyHint: 'search',
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
              searchQuery={urlQuery}
            />
          ))
        )}
      </Stack>
    </AppLayout>
  );
}
