import { useMicVAD } from '@ricky0123/vad-react';
import { useCallback, useEffect } from 'react';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

export function useSpeechRecording(onEnd?: (blob: Blob) => void) {
  const recordPlugin = RecordPlugin.create();

  const micVAD = useMicVAD({
    onSpeechEnd: () => recordPlugin.stopRecording(),
    startOnLoad: false,
    userSpeakingThreshold: 1,
  });

  const pause = useCallback(() => {
    micVAD.pause();
    recordPlugin.pauseRecording();
  }, [micVAD, recordPlugin]);

  const start = useCallback(async () => {
    const deviceId = await RecordPlugin.getAvailableAudioDevices().then(
      ([device]) => device.deviceId
    );

    recordPlugin.startRecording({ deviceId });
    micVAD.start();
  }, [recordPlugin, micVAD]);

  useEffect(() => {
    const handleRecordEnd = (record: Blob) => onEnd?.(record);

    recordPlugin.on('record-end', handleRecordEnd);
    return () => recordPlugin.un('record-end', handleRecordEnd);
  }, [onEnd, recordPlugin]);

  return { pause, recordPlugin, start };
}
