import { Box, useTheme } from '@mui/material';
import WavesurferPlayer, { WavesurferProps } from '@wavesurfer/react';
import { useSpeechRecording } from './hooks';
import { useEffect } from 'react';

export enum Mode {
  Playback = 'playback',
  Record = 'record',
}

type PlaybackMode = {
  audio: Blob;
  mode: Mode.Playback;
  onRecordEnd?: never;
};

type RecordMode = {
  audio?: never;
  mode: Mode.Record;
  onRecordEnd?: (blob: Blob) => void;
};

type Props = (PlaybackMode | RecordMode) & WavesurferProps;

export function CallWaveform(props: Props) {
  const { audio, mode, onRecordEnd, ...rest } = props;

  const { pause, recordPlugin, start } = useSpeechRecording(onRecordEnd);
  const theme = useTheme();

  useEffect(() => {
    if (mode === Mode.Record) {
      start();
      return () => pause();
    }

    return;
  }, [mode, pause, start]);

  return (
    <Box
      bgcolor={({ palette }) => palette.primary.main}
      borderRadius={24}
      height={48}
      p={1}
      width={48}
    >
      <WavesurferPlayer
        barGap={2}
        barRadius={2}
        barWidth={2}
        cursorWidth={0}
        height={32}
        plugins={[recordPlugin]}
        progressColor={
          mode === Mode.Playback
            ? theme.palette.primary.contrastText
            : 'transparent'
        }
        url={mode === Mode.Playback ? URL.createObjectURL(audio) : undefined}
        waveColor={
          mode === Mode.Playback
            ? theme.palette.primary.dark
            : theme.palette.text.primary
        }
        {...rest}
      />
    </Box>
  );
}
