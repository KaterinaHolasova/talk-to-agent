import { useState, useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

type Options = {
  onMessage?: (message: Blob) => void;
};

type Return = {
  messages: Blob[];
  sendMessage: (message: Blob) => void;
};

export function useAudioMessages(options: Options): Return {
  const { onMessage } = options;

  const socketRef = useRef<ReconnectingWebSocket>(null);
  const [messages, setMessages] = useState<Blob[]>([]);

  useEffect(() => {
    const socket = new ReconnectingWebSocket('ws://localhost:8080');
    socketRef.current = socket;

    socket.addEventListener('message', (event: MessageEvent) => {
      onMessage?.(event.data);
      setMessages((prev) => [...prev, event.data]);
    });

    return () => {
      socket.close();
    };
  }, [onMessage]);

  const sendMessage = (message: Blob) => {
    if (socketRef.current) {
      socketRef.current.send(message);
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  return { messages, sendMessage };
}
