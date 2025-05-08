import { useEffect, useMemo } from 'react';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';

export function useRecordPlugin(onEnd?: (record: Blob) => void) {
  const recordPlugin = useMemo(() => RecordPlugin.create(), []);

  useEffect(() => {
    const handleRecordEnd = (record: Blob) => onEnd?.(record);

    recordPlugin.on('record-end', handleRecordEnd);
    return () => recordPlugin.un('record-end', handleRecordEnd);
  }, [onEnd, recordPlugin]);

  return recordPlugin;
}
