import {
  Box,
  Drawer,
  IconButton,
  List,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavigationLink, NavigationListItem } from './components';
import { useState } from 'react';
import { DRAWER_WIDTH, NAVIGATION } from './constants';
import { RiMenu2Line } from '@remixicon/react';

export function Navigation() {
  const [open, setOpen] = useState(false);

  const { breakpoints } = useTheme();
  const isDesktop = useMediaQuery(breakpoints.up('md'));

  return (
    <>
      {!isDesktop && (
        <>
          <IconButton
            aria-label="menu"
            edge="start"
            onClick={() => setOpen(true)}
          >
            <RiMenu2Line />
          </IconButton>
          <Drawer open={open} onClose={() => setOpen(false)}>
            <Box role="presentation" sx={{ width: DRAWER_WIDTH }}>
              <List>
                {NAVIGATION.map(({ label, to }) => (
                  <NavigationListItem key={to} to={to} label={label} />
                ))}
              </List>
            </Box>
          </Drawer>
        </>
      )}
      {isDesktop && (
        <Stack component="nav" direction="row" spacing={6}>
          {NAVIGATION.map(({ label, to }) => (
            <NavigationLink key={to} to={to} label={label} />
          ))}
        </Stack>
      )}
    </>
  );
}
