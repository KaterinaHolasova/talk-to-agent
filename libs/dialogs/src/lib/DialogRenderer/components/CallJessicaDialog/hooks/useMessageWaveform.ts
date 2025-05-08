import { RootState } from '@talk-to-agent/store';
import dayjs from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Message } from '../types';
import { useWaveform } from '@talk-to-agent/ui';

export function useMessageWaveform(message: Message, isLast?: boolean) {
  const { audio, time } = message;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const callStartTime = useSelector(({ call }: RootState) =>
    dayjs(call.startTime)
  );
  const [playing, setPlaying] = useState(false);

  const playPause = () => setPlaying((prev) => !prev);

  const { duration, rootProps } = useWaveform({
    audio,
    onFinish: playPause,
    playing,
  });

  const startTime = useMemo(
    () =>
      callStartTime &&
      duration &&
      dayjs
        .duration(time.diff(callStartTime, 's') - duration, 's')
        .format('mm:ss'),
    [callStartTime, duration, time]
  );

  useEffect(() => {
    if (isLast) {
      wrapperRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [isLast]);

  return { playing, playPause, rootProps, startTime, wrapperRef };
}
