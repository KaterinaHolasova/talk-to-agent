import { AppBar, Box, Button, Container, Link, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { NavLink } from 'react-router';

type Props = {
  children: ReactNode;
};

export function MainLayout(props: Props) {
  const { children } = props;

  return (
    <>
      <AppBar>
        <Container>
          <Toolbar>
            <Box component="nav" flexGrow={1}>
              <Link component={NavLink} to="/">
                Home
              </Link>
              <Link component={NavLink} to="/about">
                About
              </Link>
            </Box>
            <Button>Call Jessica</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main">{children}</Container>
    </>
  );
}
