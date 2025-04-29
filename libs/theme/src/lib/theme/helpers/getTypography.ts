import { type Theme, type ThemeOptions } from '@mui/material';

export function getTypography({
  typography,
}: Theme): ThemeOptions['typography'] {
  return {
    button: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: typography.fontWeightBold,
      letterSpacing: '0.04375rem',
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.04375rem',
    },
  };
}
