import { useTheme } from '@mui/material';
import { useWavesurfer } from '@wavesurfer/react';
import { useMemo, useRef } from 'react';

export function useWaveform(audio?: Blob) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { palette } = useTheme();

  const { isPlaying, wavesurfer } = useWavesurfer({
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
    waveColor: palette.primary.dark,
  });

  return {
    getRootProps: () => ({ ref: containerRef }),
    isPlaying,
    playPause: () => wavesurfer?.playPause(),
  };
}
