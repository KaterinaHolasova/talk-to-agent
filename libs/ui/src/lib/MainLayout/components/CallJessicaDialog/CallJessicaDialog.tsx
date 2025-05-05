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
  MessageList,
  MessageWaveformSpeaker,
} from './components';
import { useState } from 'react';

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
  const [playingMessage, setPlayingMessage] = useState<Blob | null>(null);

  const { sendMessage } = useAudioMessages({
    onMessage: setPlayingMessage,
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
        {(messages.length > 0 || playingMessage) && (
          <Stack flexGrow={1} gap={3} justifyContent="center">
            <Stack alignItems="center" gap={2} py={3}>
              <CallWaveform
                autoplay={!!playingMessage}
                onFinish={
                  playingMessage
                    ? () => {
                        setMessages((prev) => [
                          ...prev,
                          {
                            audio: playingMessage,
                            speaker: MessageWaveformSpeaker.Jessica,
                            time: dayjs(),
                          },
                        ]);
                        setPlayingMessage(null);
                      }
                    : undefined
                }
                {...(playingMessage
                  ? {
                      audio: playingMessage,
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
                            speaker: MessageWaveformSpeaker.You,
                            time: dayjs(),
                          },
                        ]);
                      },
                    })}
              />
              <IconLabel
                Icon={playingMessage ? FlashingVolumeUp : FlashingMic}
                label={
                  playingMessage ? 'Jessica speaking...' : 'You are speaking...'
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
                  disabled={!!playingMessage}
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
