import { type ThemeOptions } from '@mui/material';

export function getPalette(): ThemeOptions['palette'] {
  return {
    primary: {
      main: '#DD86DF',
      dark: '#D157D3',
      contrastText: '#1F1B20',
    },
    text: {
      primary: '#4F1650',
    },
    background: {
      default: '#F9EBFA',
      paper: '#F4D6F5',
    },
    action: {
      active: '#4F1650',
    },
  };
}
