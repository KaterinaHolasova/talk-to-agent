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
  text: {
    primary: '#4F1650',
  },
  background: {
    backdrop: alpha('#1F1B20', 0.15),
    default: '#F9EBFA',
    paper: '#F4D6F5',
  },
};

export function getPalette(): ThemeOptions['palette'] {
  return {
    primary: COLOR_PALETTE.primary,
    text: COLOR_PALETTE.text,
    background: COLOR_PALETTE.background,
    action: {
      active: COLOR_PALETTE.text.primary,
      hover: alpha(COLOR_PALETTE.text.primary, 0.08),
    },
  };
}
