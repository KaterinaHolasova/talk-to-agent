import { Box } from '@mui/material';
import { useSpeechRecording } from './hooks';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { Waveform, WaveformProps } from '../../../../../Waveform';

type Props = {
  onRecordEnd?: (blob: Blob) => void;
} & WaveformProps;

export function CallWaveform(props: Props) {
  const { onRecordEnd, ...rest } = props;

  const { pause, recordPlugin, start } = useSpeechRecording(onRecordEnd);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  useEffect(() => {
    if (!activeResponse && !recordPlugin.isRecording()) {
      start();
    } else if (recordPlugin.isRecording()) {
      pause();
    }

    return;
  }, [activeResponse, pause, recordPlugin, start]);

  return (
    <Box
      bgcolor={({ palette }) => palette.primary.main}
      borderRadius={24}
      height={48}
      p={1}
      width={48}
    >
      <Waveform
        audio={activeResponse}
        autoplay
        height={32}
        plugins={useMemo(() => [recordPlugin], [recordPlugin])}
        {...rest}
      />
    </Box>
  );
}
