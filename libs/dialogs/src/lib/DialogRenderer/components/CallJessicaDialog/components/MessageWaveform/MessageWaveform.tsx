import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { SPEAKER_LABEL } from './constants';
import { useSelector } from 'react-redux';
import { RootState } from '@talk-to-agent/store';
import { Pause, Play } from '@talk-to-agent/assets';
import { Message } from '../../types';
import { useMessageWaveform } from '../../hooks';

type Props = {
  isLast?: boolean;
} & Message;

export function MessageWaveform(props: Props) {
  const { isLast, ...message } = props;

  const { playing, playPause, rootProps, startTime, wrapperRef } =
    useMessageWaveform(message, isLast);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  return (
    <Card ref={wrapperRef}>
      <CardHeader
        action={
          <IconButton disabled={!!activeResponse} onClick={playPause}>
            {playing ? <Pause /> : <Play />}
          </IconButton>
        }
        slotProps={{
          content: {
            sx: { alignItems: 'center', gap: 1, display: 'flex' },
          },
          subheader: { variant: 'body2' },
        }}
        subheader={startTime}
        sx={{ pt: 1, pb: 0 }}
        title={SPEAKER_LABEL[message.speaker]}
      />
      <CardContent sx={{ '&:last-of-type': { pb: 1 } }}>
        <div {...rootProps} />
      </CardContent>
    </Card>
  );
}
