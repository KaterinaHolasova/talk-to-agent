import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { RiPauseLine, RiPlayLine } from '@remixicon/react';
import dayjs, { Dayjs } from 'dayjs';
import { SPEAKER_LABEL } from './constants';
import { useWaveform } from '../../../../../useWaveform';

export enum Speaker {
  Jessica = 'jessica',
  You = 'you',
}

type Props = {
  audio: Blob;
  callStartTime: Dayjs;
  disabled?: boolean;
  speaker: Speaker;
  time: Dayjs;
};

export function SpeechWaveform(props: Props) {
  const { audio, callStartTime, disabled, speaker, time } = props;

  const { getRootProps, isPlaying, playPause } = useWaveform(audio);

  return (
    <Card>
      <CardHeader
        action={
          <IconButton disabled={disabled} onClick={playPause}>
            {isPlaying ? <RiPauseLine /> : <RiPlayLine />}
          </IconButton>
        }
        slotProps={{
          content: {
            sx: { alignItems: 'center', gap: 1, display: 'flex' },
          },
          subheader: { variant: 'body2' },
        }}
        subheader={dayjs
          .duration(Math.abs(callStartTime.diff(time, 's')), 's')
          .format('mm:ss')}
        sx={{ pt: 1, pb: 0 }}
        title={SPEAKER_LABEL[speaker]}
      />
      <CardContent sx={{ '&:last-of-type': { pb: 1 } }}>
        <div {...getRootProps()} />
      </CardContent>
    </Card>
  );
}
