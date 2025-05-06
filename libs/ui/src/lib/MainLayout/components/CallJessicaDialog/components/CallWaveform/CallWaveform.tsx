import { Box, useTheme } from '@mui/material';
import WavesurferPlayer, { WavesurferProps } from '@wavesurfer/react';
import { useSpeechRecording } from './hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';

type Props = {
  onRecordEnd?: (blob: Blob) => void;
} & WavesurferProps;

export function CallWaveform(props: Props) {
  const { onRecordEnd, ...rest } = props;

  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  const { pause, recordPlugin, start } = useSpeechRecording(onRecordEnd);
  const theme = useTheme();

  useEffect(() => {
    if (!activeResponse) {
      start();
      return () => pause();
    }

    return;
  }, [activeResponse, pause, start]);

  return (
    <Box
      bgcolor={({ palette }) => palette.primary.main}
      borderRadius={24}
      height={48}
      p={1}
      width={48}
    >
      <WavesurferPlayer
        autoplay
        barGap={2}
        barRadius={2}
        barWidth={2}
        cursorWidth={0}
        height={32}
        plugins={[recordPlugin]}
        progressColor={
          activeResponse ? theme.palette.primary.contrastText : 'transparent'
        }
        url={activeResponse ? URL.createObjectURL(activeResponse) : undefined}
        waveColor={
          activeResponse
            ? theme.palette.primary.dark
            : theme.palette.text.primary
        }
        {...rest}
      />
    </Box>
  );
}
