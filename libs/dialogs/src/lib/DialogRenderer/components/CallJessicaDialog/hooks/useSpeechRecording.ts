import { useMicVAD } from '@ricky0123/vad-react';
import { RootState } from '@talk-to-agent/store';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';
import { useRecordPlugin } from './useRecordPlugin';

export function useSpeechRecording(onEnd?: (record: Blob) => void) {
  const recordPlugin = useRecordPlugin(onEnd);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  useMicVAD({
    onSpeechEnd: () => recordPlugin.stopRecording(),
    userSpeakingThreshold: 1,
  });

  useEffect(() => {
    return () => {
      if (recordPlugin.isRecording()) {
        recordPlugin.stopRecording();
      }
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
