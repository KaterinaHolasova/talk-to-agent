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
import { useCallback, useState } from 'react';

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
                {...(response
                  ? {
                      audio: response,
                      autoplay: true,
                      mode: CallWaveformMode.Playback,
                      onFinish: () => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            audio: response,
                            speaker: SpeechWaveformSpeaker.Jessica,
                            time: dayjs(),
                          },
                        ]);
                        setResponse(null);
                      },
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
                      speaker={speaker}
                      time={time}
                      callStartTime={startTime}
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
