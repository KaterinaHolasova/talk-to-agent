import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { RootState, updateActiveResponse } from '@talk-to-agent/store';
import { useAudioMessages } from '@talk-to-agent/api';
import { Message, MessageSpeaker } from '../types';

export function useCallJessicaDialog() {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState<Message[]>([]);
  const activeResponse = useSelector(
    ({ call }: RootState) => call.activeResponse
  );

  const { sendMessage } = useAudioMessages({
    onMessage: useCallback(
      (message: Blob) => dispatch(updateActiveResponse(message)),
      [dispatch]
    ),
  });

  const handleFinish = useCallback(() => {
    if (activeResponse) {
      setMessages((prev) => [
        ...prev,
        {
          audio: activeResponse,
          speaker: MessageSpeaker.Jessica,
          time: dayjs(),
        },
      ]);
    }
    dispatch(updateActiveResponse(null));
  }, [activeResponse, dispatch]);

  const handleRecordEnd = useCallback(
    (record: Blob) => {
      sendMessage(record);
      setMessages((prev) => [
        ...prev,
        {
          audio: record,
          speaker: MessageSpeaker.You,
          time: dayjs(),
        },
      ]);
    },
    [sendMessage]
  );

  return {
    dialing: messages.length === 0 && !activeResponse,
    handleFinish,
    handleRecordEnd,
    messages,
  };
}
