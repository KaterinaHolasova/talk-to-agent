import { Box, useTheme } from '@mui/material';
import WavesurferPlayer from '@wavesurfer/react';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';

export function AudioWaveform() {
  const recordPlugin = RecordPlugin.create();
  const theme = useTheme();

  const handleInit = async () => {
    const deviceId = await RecordPlugin.getAvailableAudioDevices().then(
      ([device]) => device.deviceId
    );

    recordPlugin.startRecording({ deviceId });
  };

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
        height={32}
        plugins={[recordPlugin]}
        progressColor="transparent"
        onInit={handleInit}
        waveColor={theme.palette.primary.contrastText}
      />
    </Box>
  );
}
