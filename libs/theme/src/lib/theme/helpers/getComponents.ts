import { type Theme, type ThemeOptions } from '@mui/material';
import { GilroyBold, GilroyRegular } from '@talk-to-agent/assets';

export function getComponents({ spacing }: Theme): ThemeOptions['components'] {
  return {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0,
        position: 'static',
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-weight: normal;
          src: local('Gilroy'), local('Gilroy-Regular'), url(${GilroyRegular}) format('truetype');
        }
        @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-weight: bold;
          src: local('Gilroy Bold'), local('Gilroy-Bold'), url(${GilroyBold}) format('truetype');
        }
      `,
    },
  };
}
