import { useState, useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

type Return = {
  messages: Blob[];
  sendMessage: (message: Blob) => void;
};

export function useAudioMessages(): Return {
  const socketRef = useRef<ReconnectingWebSocket>(null);
  const [messages, setMessages] = useState<Blob[]>([]);

  useEffect(() => {
    const socket = new ReconnectingWebSocket('ws://localhost:8080');
    socketRef.current = socket;

    socket.addEventListener('message', (event: MessageEvent) => {
      setMessages((prev) => [...prev, event.data]);
    });

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (message: Blob) => {
    if (socketRef.current) {
      socketRef.current.send(message);
    } else {
      console.error('WebSocket is not connected.');
    }
  };

  return { messages, sendMessage };
}
