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

  const { dialing, handleMessageFinish, handleRecordEnd, messages } =
    useCallJessicaDialog();

  const handleClose = (reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason !== 'backdropClick') {
      dispatch(closeCurrentDialog());
    }
  };

  return (
    <Dialog
      aria-labelledby="dialog-title"
      maxWidth="xs"
      onClose={(_, reason) => handleClose(reason)}
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
                onFinish={handleMessageFinish}
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
