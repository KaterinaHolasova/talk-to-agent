import { useMicVAD } from '@ricky0123/vad-react';
import { useCallback, useEffect, useMemo } from 'react';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

export function useSpeechRecording(onEnd?: (blob: Blob) => void) {
  const recordPlugin = useMemo(() => RecordPlugin.create(), []);

  useMicVAD({
    onSpeechEnd: () => recordPlugin.stopRecording(),
    userSpeakingThreshold: 1,
  });

  const pause = useCallback(() => {
    recordPlugin.pauseRecording();
  }, [recordPlugin]);

  const start = useCallback(async () => {
    const deviceId = await RecordPlugin.getAvailableAudioDevices().then(
      ([device]) => device.deviceId
    );

    recordPlugin.startRecording({ deviceId });
  }, [recordPlugin]);

  useEffect(() => {
    const handleRecordEnd = (record: Blob) => onEnd?.(record);

    recordPlugin.on('record-end', handleRecordEnd);
    return () => recordPlugin.un('record-end', handleRecordEnd);
  }, [onEnd, recordPlugin]);

  return { pause, recordPlugin, start };
}
