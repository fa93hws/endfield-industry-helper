import { Typography } from '@mui/material';

interface HighlightTextProps {
  text: string;
  query: string;
  variant?: 'body1' | 'body2' | 'caption';
}

/**
 * Component that highlights matching text based on search query
 */
export default function HighlightText({ text, query, variant = 'body2' }: HighlightTextProps) {
  if (!query.trim()) {
    return (
      <Typography variant={variant} noWrap>
        {text}
      </Typography>
    );
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return (
      <Typography variant={variant} noWrap>
        {text}
      </Typography>
    );
  }

  const before = text.substring(0, index);
  const match = text.substring(index, index + query.length);
  const after = text.substring(index + query.length);

  return (
    <Typography variant={variant} noWrap component="span">
      {before}
      <Typography
        component="span"
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          px: 0.5,
          borderRadius: 0.5,
        }}
      >
        {match}
      </Typography>
      {after}
    </Typography>
  );
}
