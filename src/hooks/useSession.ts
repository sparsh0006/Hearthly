import { useState, useCallback } from 'react';
import { SessionStatus, SessionState } from '../types';

export const useSession = () => {
  const [sessionState, setSessionState] = useState<SessionState>({
    status: 'idle',
    message: '',
  });

  const startListening = useCallback(() => {
    setSessionState({
      status: 'listening',
      message: "oh, hey—so, what's on your mind today? i'm here if you wanna dive in.",
    });
  }, []);

  const stopListening = useCallback(() => {
    setSessionState({
      status: 'processing',
      message: "oh, hey—so, what's on your mind today? i'm here if you wanna dive in.",
    });
  }, []);

  const cancelSession = useCallback(() => {
    setSessionState({
      status: 'idle',
      message: "your turn",
    });
  }, []);

  return {
    sessionState,
    startListening,
    stopListening,
    cancelSession,
  };
};