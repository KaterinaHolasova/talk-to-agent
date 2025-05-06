import { useTheme } from '@mui/material';
import WavesurferPlayer, { WavesurferProps } from '@wavesurfer/react';

export type Props = {
  audio?: Blob | null;
} & WavesurferProps;

export function Waveform(props: Props) {
  const { audio, ...rest } = props;

  const { palette } = useTheme();

  return (
    <WavesurferPlayer
      barGap={2}
      barRadius={2}
      barWidth={2}
      cursorWidth={0}
      height={24}
      progressColor={palette.text.primary}
      url={audio ? URL.createObjectURL(audio) : undefined}
      waveColor={audio ? palette.primary.dark : palette.text.primary}
      {...rest}
    />
  );
}
