import { type Theme, type ThemeOptions } from '@mui/material';
import { GilroyBold, GilroyRegular } from '@talk-to-agent/assets';

export function getComponents({
  breakpoints,
  spacing,
}: Theme): ThemeOptions['components'] {
  return {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0,
        position: 'static',
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
      styleOverrides: {
        maxWidthMd: {
          [breakpoints.up('md')]: {
            maxWidth: '1000px',
          },
        },
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
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          paddingTop: spacing(3),
          paddingBottom: spacing(3),
          [breakpoints.up('sm')]: {
            paddingTop: spacing(4),
            paddingBottom: spacing(4),
          },
          [breakpoints.up('md')]: {
            paddingTop: spacing(6),
            paddingBottom: spacing(6),
          },
          [breakpoints.up('lg')]: {
            paddingTop: spacing(9),
            paddingBottom: spacing(9),
          },
        },
      },
    },
  };
}
