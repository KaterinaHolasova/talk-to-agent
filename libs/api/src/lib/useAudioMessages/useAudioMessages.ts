import { useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

type Options = {
  onMessage?: (message: Blob) => void;
};

type Return = {
  sendMessage: (message: Blob) => void;
};

export function useAudioMessages(options: Options): Return {
  const { onMessage } = options;

  const socketRef = useRef<ReconnectingWebSocket>(null);

  useEffect(() => {
    const socket = new ReconnectingWebSocket(
      import.meta.env.VITE_WEBSOCKET_URL
    );
    socketRef.current = socket;

    socket.addEventListener('message', (event: MessageEvent) => {
      onMessage?.(event.data);
    });

    return () => {
      socket.close();
    };
  }, [onMessage]);

  const sendMessage = (message: Blob) => {
    if (socketRef.current) {
      const wavFile = new File([message], 'message.wav', { type: 'audio/wav' });

      socketRef.current.send(wavFile);
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  return { sendMessage };
}
