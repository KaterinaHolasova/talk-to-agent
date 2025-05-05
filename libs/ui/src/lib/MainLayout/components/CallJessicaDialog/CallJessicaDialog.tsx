import { Box, Dialog, DialogContent, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeCurrentDialog } from '@talk-to-agent/store';
import { FlashingMic, FlashingVolumeUp } from '@talk-to-agent/assets';
import { useAudioMessages } from '@talk-to-agent/api';
import { IconLabel, IconLabelSize } from '../../../IconLabel';
import dayjs, { Dayjs } from 'dayjs';
import {
  CallWaveform,
  CallWaveformMode,
  DialogHeader,
  SpeechWaveform,
  SpeechWaveformSpeaker,
} from './components';
import { useState } from 'react';

type Message = {
  audio: Blob;
  speaker: SpeechWaveformSpeaker;
  time: Dayjs;
};

type Props = {
  startTime: Dayjs;
};

export function CallJessicaDialog(props: Props) {
  const { startTime } = props;

  const dispatch = useDispatch();

  const [messages, setMessages] = useState<Message[]>([]);
  const [response, setResponse] = useState<Blob | null>(null);

  const { sendMessage } = useAudioMessages({
    onMessage: setResponse,
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
        {(response || messages.length > 0) && (
          <Stack flexGrow={1} gap={3} justifyContent="center">
            <Stack alignItems="center" gap={2} py={3}>
              <CallWaveform
                autoplay={!!response}
                onFinish={
                  response
                    ? () => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            audio: response,
                            speaker: SpeechWaveformSpeaker.Jessica,
                            time: dayjs(),
                          },
                        ]);
                        setResponse(null);
                      }
                    : undefined
                }
                {...(response
                  ? {
                      audio: response,
                      mode: CallWaveformMode.Playback,
                    }
                  : {
                      mode: CallWaveformMode.Record,
                      onRecordEnd: (record) => {
                        sendMessage(record);
                        setMessages((prev) => [
                          ...prev,
                          {
                            audio: record,
                            speaker: SpeechWaveformSpeaker.You,
                            time: dayjs(),
                          },
                        ]);
                      },
                    })}
              />
              <IconLabel
                Icon={response ? FlashingVolumeUp : FlashingMic}
                label={response ? 'Jessica speaking...' : 'You are speaking...'}
                size={IconLabelSize.Small}
              />
            </Stack>
            {messages.length > 0 && (
              <Box>
                <Typography gutterBottom variant="h4">
                  Conversation History
                </Typography>
                <Stack gap={2}>
                  {messages.map(({ audio, speaker, time }) => (
                    <SpeechWaveform
                      audio={audio}
                      key={time.toString()}
                      callStartTime={startTime}
                      disabled={!!response}
                      speaker={speaker}
                      time={time}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}
