import { type Theme, type ThemeOptions } from '@mui/material';

export function getTypography({
  breakpoints,
  typography,
}: Theme): ThemeOptions['typography'] {
  return {
    h1: {
      fontSize: '30px',
      lineHeight: 1.25,
      fontWeight: typography.fontWeightBold,
      [breakpoints.up('sm')]: {
        fontSize: '50px',
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
      textTransform: 'none',
    },
    body1: {
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: typography.fontWeightBold,
      [breakpoints.up('md')]: {
        fontSize: '18px',
      },
    },
    body2: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: typography.fontWeightMedium,
      letterSpacing: '0.04375rem',
    },
  };
}
