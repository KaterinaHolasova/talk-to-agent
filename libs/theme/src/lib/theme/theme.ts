import { createTheme } from '@mui/material';
import { getBaseTypography, getComponents, getPalette } from './helpers';

export let theme = createTheme({
  palette: getPalette(),
  typography: getBaseTypography(),
});

theme = createTheme(theme, {
  components: getComponents(theme),
});
