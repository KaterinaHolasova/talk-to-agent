import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { theme } from '../theme';

type Props = {
  children: ReactNode;
};

export function ThemeProvider(props: Props) {
  const { children } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
