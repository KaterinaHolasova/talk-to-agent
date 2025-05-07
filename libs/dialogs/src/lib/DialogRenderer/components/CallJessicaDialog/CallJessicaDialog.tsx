import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeCurrentDialog } from '@talk-to-agent/store';
import {
  CallLoader,
  CallState,
  CallWaveform,
  DialogHeader,
  MessageList,
} from './components';
import { useCallJessicaDialog } from './hooks';

export function CallJessicaDialog() {
  const dispatch = useDispatch();

  const { dialing, handleFinish, handleRecordEnd, messages } =
    useCallJessicaDialog();

  return (
    <Dialog
      aria-labelledby="dialog-title"
      maxWidth="xs"
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') {
          dispatch(closeCurrentDialog());
        }
      }}
      open
    >
      <DialogHeader />
      <DialogContent sx={{ display: 'flex' }}>
        <Stack flexGrow={1} gap={3} justifyContent="center">
          <Stack alignItems="center" gap={2} py={3}>
            {dialing ? (
              <CallLoader />
            ) : (
              <CallWaveform
                onFinish={handleFinish}
                onRecordEnd={handleRecordEnd}
              />
            )}
            <CallState dialing={dialing} />
          </Stack>
          {messages.length > 0 && (
            <Box>
              <Typography gutterBottom variant="h4">
                Conversation History
              </Typography>
              <MessageList messages={messages} />
            </Box>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
