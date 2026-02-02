import { TextField } from '@mui/material';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export function QuantityInput({ value, onChange, label }: QuantityInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue) && newValue > 0) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={handleChange}
      label={label ?? '/分钟'}
      size="small"
      inputProps={{ min: 0, step: 1 }}
      sx={{
        '& input[type=number]': {
          MozAppearance: 'textfield',
        },
        '& input[type=number]::-webkit-outer-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
          WebkitAppearance: 'none',
          margin: 0,
        },
      }}
    />
  );
}
