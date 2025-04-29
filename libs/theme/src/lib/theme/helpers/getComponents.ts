import { alpha, type Theme, type ThemeOptions } from '@mui/material';
import { GilroyBold, GilroyRegular } from '@talk-to-agent/assets';

export function getComponents({
  breakpoints,
  palette,
  spacing,
  transitions,
  typography,
}: Theme): ThemeOptions['components'] {
  return {
    MuiAppBar: {
      defaultProps: {
        color: 'transparent',
        elevation: 0,
        position: 'static',
      },
      styleOverrides: {
        colorTransparent: {
          backgroundImage: 'none',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.primary.contrastText, 0.15),
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedSizeMedium: {
          padding: spacing(1.25, 2),
        },
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
      styleOverrides: {
        maxWidthMd: {
          [breakpoints.up('md')]: {
            maxWidth: '1032px',
          },
        },
        root: {
          paddingLeft: spacing(3),
          paddingRight: spacing(3),
          [breakpoints.up('sm')]: {
            paddingLeft: spacing(4),
            paddingRight: spacing(4),
          },
          [breakpoints.up('md')]: {
            paddingLeft: spacing(5),
            paddingRight: spacing(5),
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
    MuiLink: {
      defaultProps: {
        color: 'textPrimary',
      },
      styleOverrides: {
        root: {
          fontWeight: typography.fontWeightBold,
        },
        underlineAlways: {
          textDecoration: 'none',
          borderBottom: `2px solid ${palette.primary.main}`,
        },
        underlineHover: {
          transition: transitions.create('border-color'),
          borderBottom: '2px solid transparent',
          '&:hover': {
            borderColor: palette.primary.main,
            textDecoration: 'none',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          display: 'inline-block',
          fontWeight: typography.fontWeightBold,
          '.MuiListItemButton-root.Mui-selected &': {
            borderBottom: `2px solid ${palette.primary.main}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(-145deg, ${palette.background.paper} 0%, ${palette.background.default} 100%)`,
        },
      },
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
