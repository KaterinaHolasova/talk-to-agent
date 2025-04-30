import { Dialog, DialogContent, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeCurrentDialog } from '@talk-to-agent/store';
import { FlashingMic } from '@talk-to-agent/assets';
import { IconLabel, IconLabelSize } from '../../../IconLabel';
import { AudioWaveform } from '../../../AudioWaveform';
import dayjs from 'dayjs';
import { DialogHeader } from './components';

export function CallJessicaDialog() {
  const dispatch = useDispatch();
  const startTime = dayjs();

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
          <AudioWaveform />
          <IconLabel
            Icon={FlashingMic}
            label="You are speaking"
            size={IconLabelSize.Small}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
