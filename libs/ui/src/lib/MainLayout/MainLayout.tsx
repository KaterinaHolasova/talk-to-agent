import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { CallJessicaDialog, Navigation } from './components';
import { useDispatch } from 'react-redux';
import { openDialog } from '@talk-to-agent/store';

type Props = {
  children: ReactNode;
};

export function MainLayout(props: Props) {
  const { children } = props;

  const dispatch = useDispatch();

  return (
    <>
      <AppBar>
        <Container>
          <Toolbar>
            <Box flexGrow={1}>
              <Navigation />
            </Box>
            <Button onClick={() => dispatch(openDialog(<CallJessicaDialog />))}>
              Call Jessica
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main" sx={{ pt: 3, pb: [3, 4, 6, 9] }}>
        {children}
      </Container>
    </>
  );
}
