import { Box } from '@mui/material';
import { useSpeechRecording } from './hooks';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { Waveform, WaveformProps } from '@talk-to-agent/ui';

type Props = {
  onRecordEnd?: (blob: Blob) => void;
} & WaveformProps;

export function CallWaveform(props: Props) {
  const { onRecordEnd, ...rest } = props;

  const { recordPlugin } = useSpeechRecording(onRecordEnd);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

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
        height={32}
        playing={!!activeResponse}
        plugins={useMemo(() => [recordPlugin], [recordPlugin])}
        {...rest}
      />
    </Box>
  );
}
