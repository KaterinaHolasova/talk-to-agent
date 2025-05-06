import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeCurrentDialog,
  RootState,
  updateActiveResponse,
} from '@talk-to-agent/store';
import { FlashingMic, FlashingVolumeUp } from '@talk-to-agent/assets';
import { useAudioMessages } from '@talk-to-agent/api';
import { IconLabel, IconLabelSize } from '../../../IconLabel';
import dayjs, { Dayjs } from 'dayjs';
import {
  CallWaveform,
  DialogHeader,
  MessageList,
  MessageWaveformSpeaker,
} from './components';
import { useCallback, useState } from 'react';

type Message = {
  audio: Blob;
  speaker: MessageWaveformSpeaker;
  time: Dayjs;
};

type Props = {
  startTime: Dayjs;
};

export function CallJessicaDialog(props: Props) {
  const { startTime } = props;

  const dispatch = useDispatch();

  const [messages, setMessages] = useState<Message[]>([]);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  const { sendMessage } = useAudioMessages({
    onMessage: useCallback(
      (message: Blob) => dispatch(updateActiveResponse(message)),
      [dispatch]
    ),
  });

  return (
    <Dialog
      aria-labelledby="dialog-title"
      maxWidth="xs"
      onClose={() => dispatch(closeCurrentDialog())}
      open
    >
      <DialogHeader startTime={startTime} />
      <DialogContent sx={{ display: 'flex' }}>
        {(messages.length > 0 || activeResponse) && (
          <Stack flexGrow={1} gap={3} justifyContent="center">
            <Stack alignItems="center" gap={2} py={3}>
              <CallWaveform
                onFinish={() => {
                  if (activeResponse) {
                    setMessages((prev) => [
                      ...prev,
                      {
                        audio: activeResponse,
                        speaker: MessageWaveformSpeaker.Jessica,
                        time: dayjs(),
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
                      audio: record,
                      speaker: MessageWaveformSpeaker.You,
                      time: dayjs(),
                    },
                  ]);
                }}
              />
              <IconLabel
                Icon={activeResponse ? FlashingVolumeUp : FlashingMic}
                label={
                  activeResponse ? 'Jessica speaking...' : 'You are speaking...'
                }
                size={IconLabelSize.Small}
              />
            </Stack>
            {messages.length > 0 && (
              <Box>
                <Typography gutterBottom variant="h4">
                  Conversation History
                </Typography>
                <MessageList
                  callStartTime={startTime}
                  disabled={!!activeResponse}
                  messages={messages}
                />
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
