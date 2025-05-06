import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { SPEAKER_LABEL } from './constants';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { Waveform } from '@talk-to-agent/ui';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from '@talk-to-agent/assets';

export enum Speaker {
  Jessica = 'jessica',
  You = 'you',
}

type Props = {
  audio: Blob;
  isLast?: boolean;
  speaker: Speaker;
  time: Dayjs;
};

export function MessageWaveform(props: Props) {
  const { audio, isLast, speaker, time } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const call = useSelector(({ call }: RootState) => ({
    ...call,
    startTime: dayjs(call.startTime),
  }));
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const formattedTime =
    call.startTime &&
    dayjs
      .duration(Math.abs(call.startTime.diff(time, 's') + duration), 's')
      .format('mm:ss');

  const playPause = () => setIsPlaying((prev) => !prev);

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
            {isPlaying ? <Pause /> : <Play />}
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
          autoplay={isPlaying}
          onFinish={playPause}
          onReady={(waveSurfer) => setDuration(waveSurfer.getDuration())}
        />
      </CardContent>
    </Card>
  );
}
