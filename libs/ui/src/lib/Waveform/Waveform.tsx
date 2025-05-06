import { useTheme } from '@mui/material';
import WavesurferPlayer, { WavesurferProps } from '@wavesurfer/react';

export type Props = WavesurferProps;

export function Waveform(props: Props) {
  const { palette } = useTheme();

  return (
    <WavesurferPlayer
      barGap={2}
      barRadius={2}
      barWidth={2}
      cursorWidth={0}
      height={24}
      progressColor={palette.text.primary}
      waveColor={props.url ? palette.primary.dark : palette.text.primary}
      {...props}
    />
  );
}
