import { type Theme, type ThemeOptions } from '@mui/material';

export function getTypography({
  breakpoints,
  typography,
}: Theme): ThemeOptions['typography'] {
  return {
    h1: {
      fontSize: '40px',
      lineHeight: 1,
      fontWeight: typography.fontWeightBold,
      [breakpoints.up('sm')]: {
        fontSize: '64px',
      },
      [breakpoints.up('md')]: {
        fontSize: '80px',
      },
      [breakpoints.up('lg')]: {
        fontSize: '96px',
      },
    },
    button: {
      fontSize: '14px',
      lineHeight: '22px',
      fontWeight: typography.fontWeightBold,
      letterSpacing: '0.04375rem',
    },
    body1: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.04375rem',
    },
  };
}
