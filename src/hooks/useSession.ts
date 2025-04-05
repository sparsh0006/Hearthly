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
      message: "oh hey, welcome back. so, what's been sitting heavy on your chest today?",
    });
    setHasStarted(true);
  }, []);
  
  const stopListening = useCallback(() => {
    setSessionState({
      status: 'processing',
      message: "i'm really sorry you're feeling this way—it sounds like it's been weighing on you for a while. can you tell me more about what's been triggering these feelings today?",
    });
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
    cancelSession,
  };
};