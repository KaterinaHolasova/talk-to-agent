import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  useTheme,
} from '@mui/material';
import { RiPlayLine } from '@remixicon/react';
import WavesurferPlayer from '@wavesurfer/react';
import dayjs, { Dayjs } from 'dayjs';
import { useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { SPEAKER_LABEL } from './constants';

export enum Speaker {
  Jessica = 'jessica',
  You = 'you',
}

type Props = {
  audio: Blob;
  callStartTime: Dayjs;
  disabled?: boolean;
  speaker: Speaker;
  time: Dayjs;
};

export function SpeechWaveform(props: Props) {
  const { audio, callStartTime, disabled, speaker, time } = props;

  const waveSurferRef = useRef<WaveSurfer>(null);
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        action={
          <IconButton
            disabled={disabled}
            onClick={() => waveSurferRef.current?.playPause()}
          >
            <RiPlayLine />
          </IconButton>
        }
        slotProps={{
          content: {
            sx: { alignItems: 'center', gap: 1, display: 'flex' },
          },
          subheader: { variant: 'body2' },
        }}
        subheader={dayjs
          .duration(Math.abs(callStartTime.diff(time, 's')), 's')
          .format('mm:ss')}
        sx={{ pt: 1, pb: 0 }}
        title={SPEAKER_LABEL[speaker]}
      />
      <CardContent sx={{ '&:last-child': { pb: 1 } }}>
        <WavesurferPlayer
          barGap={2}
          barRadius={2}
          barWidth={2}
          cursorWidth={0}
          height={24}
          onInit={(waveSurfer: WaveSurfer) => {
            waveSurferRef.current = waveSurfer;
          }}
          progressColor={theme.palette.text.primary}
          url={URL.createObjectURL(audio)}
          waveColor={theme.palette.primary.dark}
        />
      </CardContent>
    </Card>
  );
}
