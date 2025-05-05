import { alpha, type ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeBackground {
    backdrop: string;
  }
}

const COLOR_PALETTE = {
  primary: {
    main: '#DD86DF',
    dark: '#D157D3',
    contrastText: '#1F1B20',
  },
  error: {
    main: '#EF7679',
    dark: '#D64D4F',
    contrastText: '#FCFBFC',
  },
  text: '#4F1650',
  background: {
    backdrop: alpha('#1F1B20', 0.15),
    default: '#F9EBFA',
    paper: '#F4D6F5',
  },
};

export function getPalette(): ThemeOptions['palette'] {
  return {
    primary: COLOR_PALETTE.primary,
    text: {
      primary: COLOR_PALETTE.text,
      secondary: COLOR_PALETTE.text,
    },
    error: COLOR_PALETTE.error,
    background: COLOR_PALETTE.background,
    action: {
      active: COLOR_PALETTE.text,
      hover: alpha(COLOR_PALETTE.text, 0.08),
    },
  };
}
