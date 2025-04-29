import { type Theme, type ThemeOptions } from '@mui/material';

export function getTypography({
  typography,
}: Theme): ThemeOptions['typography'] {
  return {
    button: {
      lineHeight: '22px',
      fontWeight: typography.fontWeightBold,
      letterSpacing: '0.04rem',
    },
  };
}
