import { type Theme, type ThemeOptions } from '@mui/material';
import {
  GilroyBold,
  GilroyRegular,
  GilroySemibold,
} from '@talk-to-agent/assets';

export function getComponents({
  breakpoints,
  palette,
  shape,
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
          backgroundColor: palette.background.backdrop,
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
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'md',
      },
      styleOverrides: {
        maxWidthMd: {
          [breakpoints.up('md')]: {
            maxWidth: '1042px',
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
          font-weight: 600;
          src: local('Gilroy Semibold'), local('Gilroy-Semibold'), url(${GilroySemibold}) format('truetype');
        }
        @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-weight: bold;
          src: local('Gilroy Bold'), local('Gilroy-Bold'), url(${GilroyBold}) format('truetype');
        }
      `,
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        paperWidthXs: {
          maxWidth: '280px',
          minHeight: '280px',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: spacing(5, 3),
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        colorError: {
          backgroundColor: palette.error.main,
          color: palette.error.contrastText,
          '&:hover': {
            backgroundColor: palette.error.dark,
          },
        },
      },
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
          position: 'relative',
          textDecoration: 'none',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-3px',
            left: 0,
            margin: '0 -2px',
            borderRadius: shape.borderRadius,
            width: 'calc(100% + 4px)',
            height: '2px',
            background: palette.primary.main,
          },
        },
        underlineHover: {
          position: 'relative',
          '&:hover': {
            textDecoration: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-3px',
            left: 0,
            opacity: 0,
            transition: transitions.create('opacity'),
            margin: '0 -2px',
            borderRadius: shape.borderRadius,
            width: 'calc(100% + 4px)',
            height: '2px',
            background: palette.primary.main,
          },
          '&:hover::after': {
            opacity: 1,
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
            position: 'relative',
          },
          '.MuiListItemButton-root.Mui-selected &::after': {
            content: '""',
            position: 'absolute',
            bottom: '-3px',
            left: 0,
            margin: '0 -2px',
            borderRadius: shape.borderRadius,
            width: 'calc(100% + 4px)',
            height: '2px',
            background: palette.primary.main,
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
    MuiTypography: {
      defaultProps: {
        variant: 'body2',
      },
      styleOverrides: {
        gutterBottom: {
          marginBottom: spacing(3),
        },
      },
    },
  };
}
