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
      label={label ?? '数量'}
      helperText="/分钟"
      inputProps={{ min: 0, step: 1 }}
      sx={{ width: 120 }}
    />
  );
}
