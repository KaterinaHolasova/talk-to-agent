import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { ReactNode } from 'react';
import { Navigation } from './components';
import { useDispatch } from 'react-redux';
import { openDialog, startCall } from '@talk-to-agent/store';
import dayjs from 'dayjs';

type Props = {
  children: ReactNode;
};

export function MainLayout(props: Props) {
  const { children } = props;

  const dispatch = useDispatch();

  const handleCallJessica = () => {
    dispatch(startCall(dayjs().toString()));
    dispatch(openDialog('callJessica'));
  };

  return (
    <>
      <AppBar>
        <Container>
          <Toolbar>
            <Box flexGrow={1}>
              <Navigation />
            </Box>
            <Button onClick={handleCallJessica}>Call Jessica</Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Container component="main" sx={{ pt: 3, pb: [3, 4, 6, 9] }}>
        {children}
      </Container>
    </>
  );
}
