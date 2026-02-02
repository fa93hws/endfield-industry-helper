import { Autocomplete, TextField, Avatar, Box, Typography } from '@mui/material';
import { allProduces, AicProductKey } from '@data/items/aic';
import { images } from '@data/items/images';

interface ItemSelectorProps {
  value: AicProductKey | null;
  onChange: (value: AicProductKey | null) => void;
  label?: string;
  placeholder?: string;
}

export function ItemSelector({ value, onChange, label, placeholder }: ItemSelectorProps) {
  const items = Object.entries(allProduces).map(([key, name]) => ({
    key: key as AicProductKey,
    name,
  }));

  return (
    <Autocomplete
      value={items.find((item) => item.key === value) ?? null}
      onChange={(_, newValue) => onChange(newValue?.key ?? null)}
      options={items}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...otherProps } = props;
        return (
          <Box
            component="li"
            key={key}
            {...otherProps}
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <Avatar
              src={images[option.key]}
              alt={option.name}
              variant="square"
              sx={{ width: 24, height: 24 }}
            />
            <Typography variant="body2">{option.name}</Typography>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label ?? '选择产品'} placeholder={placeholder} />
      )}
      sx={{ minWidth: 200 }}
    />
  );
}
