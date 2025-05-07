import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { SPEAKER_LABEL } from './constants';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { Waveform } from '@talk-to-agent/ui';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from '@talk-to-agent/assets';
import { Message } from '../../types';

type Props = {
  isLast?: boolean;
} & Message;

export function MessageWaveform(props: Props) {
  const { audio, isLast, speaker, time } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const call = useSelector(({ call }: RootState) => ({
    ...call,
    startTime: dayjs(call.startTime),
  }));
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  const formattedTime =
    call.startTime &&
    dayjs
      .duration(Math.abs(call.startTime.diff(time, 's') + duration), 's')
      .format('mm:ss');

  const playPause = () => setPlaying((prev) => !prev);

  useEffect(() => {
    if (isLast) {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [isLast]);

  return (
    <Card ref={containerRef}>
      <CardHeader
        action={
          <IconButton disabled={!!call.activeResponse} onClick={playPause}>
            {playing ? <Pause /> : <Play />}
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
        <Waveform
          audio={audio}
          onFinish={playPause}
          // onReady={(waveSurfer) => setDuration(waveSurfer.getDuration())}
          playing={playing}
        />
      </CardContent>
    </Card>
  );
}
