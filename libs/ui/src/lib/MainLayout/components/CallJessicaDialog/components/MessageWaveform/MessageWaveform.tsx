import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { RiPauseLine, RiPlayLine } from '@remixicon/react';
import dayjs, { Dayjs } from 'dayjs';
import { SPEAKER_LABEL } from './constants';
import { useWaveform } from '../../../../../useWaveform';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';

export enum Speaker {
  Jessica = 'jessica',
  You = 'you',
}

type Props = {
  audio: Blob;
  speaker: Speaker;
  time: Dayjs;
};

export function MessageWaveform(props: Props) {
  const { audio, speaker, time } = props;

  const call = useSelector(({ call }: RootState) => call);
  const { getRootProps, isPlaying, playPause } = useWaveform(audio);

  const formattedTime =
    call.startTime &&
    dayjs
      .duration(Math.abs(call.startTime.diff(time, 's')), 's')
      .format('mm:ss');

  return (
    <Card>
      <CardHeader
        action={
          <IconButton disabled={!!call.activeResponse} onClick={playPause}>
            {isPlaying ? <RiPauseLine /> : <RiPlayLine />}
          </IconButton>
        }
        slotProps={{
          content: {
            sx: { alignItems: 'center', gap: 1, display: 'flex' },
          },
          subheader: { variant: 'body2' },
        }}
        subheader={formattedTime}
        sx={{ pt: 1, pb: 0 }}
        title={SPEAKER_LABEL[speaker]}
      />
      <CardContent sx={{ '&:last-of-type': { pb: 1 } }}>
        <div {...getRootProps()} />
      </CardContent>
    </Card>
  );
}
