import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { SPEAKER_LABEL } from './constants';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { useWaveform } from '@talk-to-agent/ui';
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
  const [playing, setPlaying] = useState(false);

  const playPause = () => setPlaying((prev) => !prev);

  const { duration, rootProps } = useWaveform({
    audio,
    onFinish: playPause,
    playing,
  });

  useEffect(() => {
    if (isLast) {
      containerRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [isLast]);

  const formattedTime =
    call.startTime &&
    duration &&
    dayjs
      .duration(Math.abs(call.startTime.diff(time, 's') + duration), 's')
      .format('mm:ss');

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
        <div {...rootProps} />
      </CardContent>
    </Card>
  );
}
