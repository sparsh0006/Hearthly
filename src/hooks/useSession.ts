// src/hooks/useSession.ts
import { useState, useCallback, useEffect } from 'react';
import { SessionStatus, SessionState } from '../types';

export const useSession = () => {
  const [sessionState, setSessionState] = useState<SessionState>({
    status: 'idle',
    message: "oh hey, welcome back. so, what's been sitting heavy on your chest today?",
  });
  
  const [sessionCount, setSessionCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  
  // Load session count from localStorage on initial render
  useEffect(() => {
    const savedCount = localStorage.getItem('calmi_session_count');
    if (savedCount) {
      setSessionCount(parseInt(savedCount));
    }
  }, []);
  
  // Update localStorage when sessionCount changes
  useEffect(() => {
    localStorage.setItem('calmi_session_count', sessionCount.toString());
  }, [sessionCount]);
  
  const startListening = useCallback(() => {
    setSessionState({
      status: 'listening',
      message: "I'm listening...",
    });
    setHasStarted(true);
  }, []);
  
  const stopListening = useCallback(() => {
    setSessionState({
      status: 'processing',
      message: "Just a moment, processing what you said...",
    });
  }, []);
  
  const setResponseMessage = useCallback((transcript: string) => {
    setSessionState({
      status: 'responding',
      message: transcript,
    });
  }, []);
  
  const finishResponse = useCallback(() => {
    setSessionState(prev => ({
      ...prev,
      status: 'idle',
    }));
  }, []);
  
  const cancelSession = useCallback(() => {
    // Only increment the session count if the session had started
    if (hasStarted) {
      setSessionCount(prev => Math.min(prev + 1, 3));
      setHasStarted(false);
    }
    
    setSessionState({
      status: 'idle',
      message: "oh hey, welcome back. so, what's been sitting heavy on your chest today?",
    });
  }, [hasStarted]);
  
  return {
    sessionState,
    sessionCount,
    startListening,
    stopListening,
    setResponseMessage,
    finishResponse,
    cancelSession,
  };
};