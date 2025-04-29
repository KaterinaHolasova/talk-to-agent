import { createTheme } from '@mui/material';
import {
  getBaseTypography,
  getComponents,
  getPalette,
  getShape,
  getTypography,
} from './helpers';

export let theme = createTheme({
  palette: getPalette(),
  shape: getShape(),
  typography: getBaseTypography(),
});

theme = createTheme(theme, {
  components: getComponents(theme),
  typography: getTypography(theme),
});
