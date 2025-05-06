import { Box } from '@mui/material';
import { useSpeechRecording } from './hooks';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { Waveform, WaveformProps } from '../../../../../Waveform';

type Props = {
  onRecordEnd?: (blob: Blob) => void;
} & WaveformProps;

export function CallWaveform(props: Props) {
  const { onRecordEnd, ...rest } = props;

  const { pause, recordPlugin, start } = useSpeechRecording(onRecordEnd);
  const { activeResponse, paused } = useSelector(({ call }: RootState) => call);

  useEffect(() => {
    if (!activeResponse && !paused) {
      start();
      return pause;
    } else {
      pause();
      return start;
    }
  }, [activeResponse, pause, paused, start]);

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
        plugins={[recordPlugin]}
        {...rest}
      />
    </Box>
  );
}
