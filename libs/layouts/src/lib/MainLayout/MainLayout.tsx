import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { Navigation } from './components';

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
            <Box flexGrow={1}>
              <Navigation />
            </Box>
            <Button>Call Jessica</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main" sx={{ pt: 3, pb: [3, 4, 6, 9] }}>
        {children}
      </Container>
    </>
  );
}
