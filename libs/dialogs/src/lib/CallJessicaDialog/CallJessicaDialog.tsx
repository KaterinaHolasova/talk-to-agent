import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeCurrentDialog,
  RootState,
  updateActiveResponse,
} from '@talk-to-agent/store';
import { useAudioMessages } from '@talk-to-agent/api';
import dayjs, { Dayjs } from 'dayjs';
import {
  CallLoader,
  CallState,
  CallWaveform,
  DialogHeader,
  MessageList,
  MessageWaveformSpeaker,
} from './components';
import { useCallback, useState } from 'react';

type Message = {
  speaker: MessageWaveformSpeaker;
  time: Dayjs;
  url: string;
};

export function CallJessicaDialog() {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState<Message[]>([]);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  const { sendMessage } = useAudioMessages({
    onMessage: useCallback(
      (message: Blob) =>
        dispatch(updateActiveResponse(URL.createObjectURL(message))),
      [dispatch]
    ),
  });

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
            {messages.length > 0 || activeResponse ? (
              <CallWaveform
                onFinish={() => {
                  if (activeResponse) {
                    setMessages((prev) => [
                      ...prev,
                      {
                        speaker: MessageWaveformSpeaker.Jessica,
                        time: dayjs(),
                        url: activeResponse ?? undefined,
                      },
                    ]);
                  }
                  dispatch(updateActiveResponse(null));
                }}
                onRecordEnd={(record) => {
                  sendMessage(record);
                  setMessages((prev) => [
                    ...prev,
                    {
                      speaker: MessageWaveformSpeaker.You,
                      time: dayjs(),
                      url: URL.createObjectURL(record),
                    },
                  ]);
                }}
              />
            ) : (
              <CallLoader />
            )}
            <CallState dialing={messages.length === 0 && !activeResponse} />
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
