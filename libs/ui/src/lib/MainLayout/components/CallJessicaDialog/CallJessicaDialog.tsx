import { Dialog, DialogContent, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeCurrentDialog } from '@talk-to-agent/store';
import { FlashingMic, FlashingVolumeUp } from '@talk-to-agent/assets';
import { useAudioMessages } from '@talk-to-agent/api';
import { IconLabel, IconLabelSize } from '../../../IconLabel';
import { AudioWaveform, AudioWaveformMode } from '../../../AudioWaveform';
import dayjs from 'dayjs';
import { DialogHeader } from './components';
import { useState } from 'react';

export function CallJessicaDialog() {
  const dispatch = useDispatch();
  const startTime = dayjs();

  const [response, setResponse] = useState<Blob | null>(null);
  useAudioMessages({ onMessage: setResponse });

  return (
    <Dialog
      aria-labelledby="dialog-title"
      maxWidth="xs"
      onClose={() => dispatch(closeCurrentDialog())}
      open
    >
      <DialogHeader startTime={startTime} />
      <DialogContent>
        <Stack alignItems="center" gap={2}>
          <AudioWaveform
            {...(response
              ? {
                  audio: response,
                  autoplay: true,
                  mode: AudioWaveformMode.Playback,
                  onFinish: () => setResponse(null),
                }
              : { mode: AudioWaveformMode.Record })}
          />
          <IconLabel
            Icon={response ? FlashingVolumeUp : FlashingMic}
            label={response ? 'Jessica speaking...' : 'You are speaking...'}
            size={IconLabelSize.Small}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
