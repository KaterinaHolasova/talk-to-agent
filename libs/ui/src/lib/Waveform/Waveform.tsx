import { useTheme } from '@mui/material';
import { useWavesurfer } from '@wavesurfer/react';
import { useEffect, useMemo, useRef } from 'react';
import { WaveSurferOptions } from 'wavesurfer.js';

export type Props = {
  audio?: Blob | null;
  onFinish?: () => void;
  playing?: boolean;
} & Omit<WaveSurferOptions, 'container'>;

export function Waveform(props: Props) {
  const { audio, onFinish, playing, ...rest } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const { palette } = useTheme();

  const { wavesurfer, isPlaying } = useWavesurfer({
    barGap: 2,
    barRadius: 2,
    barWidth: 2,
    container: containerRef,
    cursorWidth: 0,
    height: 24,
    progressColor: palette.text.primary,
    url: useMemo(
      () => (audio ? URL.createObjectURL(audio) : undefined),
      [audio]
    ),
    waveColor: useMemo(
      () => (audio ? palette.primary.dark : palette.text.primary),
      [audio, palette]
    ),
    ...rest,
  });

  useEffect(() => {
    const handleFinish = () => onFinish?.();

    wavesurfer?.on('finish', handleFinish);

    return () => {
      wavesurfer?.un('finish', handleFinish);
    };
  }, [onFinish, wavesurfer]);

  useEffect(() => {
    if (playing && !isPlaying) {
      wavesurfer?.play();
    } else if (!playing && isPlaying) {
      wavesurfer?.pause();
    }
  }, [isPlaying, playing, wavesurfer]);

  return <div ref={containerRef} />;
}
