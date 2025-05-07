import { Box } from '@mui/material';
import { useSpeechRecording } from './hooks';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { useWaveform, UseWaveformOptions } from '@talk-to-agent/ui';

type Props = {
  onRecordEnd?: (record: Blob) => void;
} & UseWaveformOptions;

export function CallWaveform(props: Props) {
  const { onRecordEnd, ...rest } = props;

  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );
  const { recordPlugin } = useSpeechRecording(onRecordEnd);

  const { rootProps } = useWaveform({
    audio: activeResponse,
    height: 32,
    playing: !!activeResponse,
    plugins: useMemo(() => [recordPlugin], [recordPlugin]),
    ...rest,
  });

  return (
    <Box
      bgcolor={({ palette }) => palette.primary.main}
      borderRadius={24}
      height={48}
      p={1}
      width={48}
    >
      <div {...rootProps} />
    </Box>
  );
}
