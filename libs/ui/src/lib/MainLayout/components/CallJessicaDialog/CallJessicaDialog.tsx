import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeCurrentDialog } from '@talk-to-agent/store';
import { FlashingMic, FlashingVolumeUp } from '@talk-to-agent/assets';
import { useAudioMessages } from '@talk-to-agent/api';
import { IconLabel, IconLabelSize } from '../../../IconLabel';
import { CallWaveform, CallWaveformMode } from '../../../CallWaveform';
import dayjs from 'dayjs';
import { DialogHeader } from './components';
import { useCallback, useState } from 'react';

type Message = {
  audio: Blob;
};

export function CallJessicaDialog() {
  const dispatch = useDispatch();
  const startTime = dayjs();

  const [messages, setMessages] = useState<Message[]>([]);
  const [response, setResponse] = useState<Blob | null>(null);

  const { sendMessage } = useAudioMessages({
    onMessage: useCallback((message: Blob) => {
      setResponse(message);
      setMessages((prev) => [...prev, { audio: message }]);
    }, []),
  });

  return (
    <Dialog
      aria-labelledby="dialog-title"
      maxWidth="xs"
      onClose={() => dispatch(closeCurrentDialog())}
      open
    >
      <DialogHeader startTime={startTime} />
      <DialogContent>
        {messages.length > 0 && (
          <>
            <Box mb={3}>
              <Stack alignItems="center" gap={2}>
                <CallWaveform
                  {...(response
                    ? {
                        audio: response,
                        autoplay: true,
                        mode: CallWaveformMode.Playback,
                        onFinish: () => setResponse(null),
                      }
                    : {
                        mode: CallWaveformMode.Record,
                        onRecordEnd: sendMessage,
                      })}
                />
                <IconLabel
                  Icon={response ? FlashingVolumeUp : FlashingMic}
                  label={
                    response ? 'Jessica speaking...' : 'You are speaking...'
                  }
                  size={IconLabelSize.Small}
                />
              </Stack>
            </Box>
            <Typography gutterBottom variant="h4">
              Conversation History
            </Typography>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
