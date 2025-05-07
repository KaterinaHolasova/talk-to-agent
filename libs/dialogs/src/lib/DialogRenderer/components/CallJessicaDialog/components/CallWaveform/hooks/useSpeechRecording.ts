import { useMicVAD } from '@ricky0123/vad-react';
import { RootState } from '@talk-to-agent/store';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

export function useSpeechRecording(onEnd?: (record: Blob) => void) {
  const recordPlugin = useMemo(() => RecordPlugin.create(), []);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  useMicVAD({
    onSpeechEnd: () => recordPlugin.stopRecording(),
    userSpeakingThreshold: 1,
  });

  useEffect(() => {
    const handleRecordEnd = (record: Blob) => onEnd?.(record);

    recordPlugin.on('record-end', handleRecordEnd);
    return () => recordPlugin.un('record-end', handleRecordEnd);
  }, [onEnd, recordPlugin]);

  useEffect(() => {
    return () => {
      recordPlugin.stopRecording();
    };
  }, [recordPlugin]);

  const start = useCallback(async () => {
    const deviceId = await RecordPlugin.getAvailableAudioDevices().then(
      ([device]) => device.deviceId
    );

    recordPlugin.startRecording({ deviceId });
  }, [recordPlugin]);

  useEffect(() => {
    if (!activeResponse && !recordPlugin.isRecording()) {
      start();
    }
  }, [activeResponse, recordPlugin, start]);

  return { recordPlugin };
}
