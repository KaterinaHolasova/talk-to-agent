import { type ThemeOptions } from '@mui/material';

export function getPalette(): ThemeOptions['palette'] {
  return {
    primary: {
      main: '#DD86DF',
      contrastText: '#1F1B20',
    },
    text: {
      primary: '#4F1650',
    },
    background: {
      default: '#F9EBFA',
    },
  };
}
