import { AppBar, Button, Container, Toolbar } from '@mui/material';
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
            <Navigation />
            <Button>Call Jessica</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main">{children}</Container>
    </>
  );
}
