import { Stack } from '@mui/material';
import { NavigationLink } from './components';

export function Navigation() {
  return (
    <Stack component="nav" direction="row" flexGrow={1} spacing={6}>
      <NavigationLink to="/" label="Home" />
      <NavigationLink to="/products" label="Products" />
      <NavigationLink to="/organization" label="Organization" />
      <NavigationLink to="/account" label="Account" />
      <NavigationLink to="/help" label="Help" />
    </Stack>
  );
}
