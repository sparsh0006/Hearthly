// src/pages/session.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import AudioWaveform from '../components/session/AudioWaveform';
import SessionControls from '../components/session/SessionControls';
import TextInput from '../components/session/TextInput';
import { useSession } from '../hooks/useSession';
import { useAudio } from '../hooks/useAudio';
import CloudyCircle from "../components/session/CloudyCircle";
import { useTheme } from '../contexts/ThemeContext';
import ChatInterface from '../components/session/ChatInterface';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import SessionLimitCheck from '../components/session/SessionLimitCheck';
import { useAuth } from '../contexts/AuthContext';
import { 
  createChatSession, 
  addChatMessage, 
  endChatSession,
  decrementSessionCount
} from '../services/supabase';
import AuthModal from '../components/auth/AuthModal';
import ConfirmationDialog from '../components/ui/ConfirmationDialog';

// Track session duration
const MAX_SESSION_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

const SessionPage: React.FC = () => {
  const { 
    sessionState, 
    startListening: startSessionListening, 
    stopListening: stopSessionListening, 
    setResponseMessage,
    finishResponse,
    cancelSession 
  } = useSession();
  
  const { 
    isListening, 
    response,
    startListening: startAudioListening, 
    stopListening: stopAudioListening 
  } = useAudio();
  
  const [showTextInput, setShowTextInput] = useState(false);
  const { status, message } = sessionState;
  const { isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const { user, remainingSessions, updateRemainingSessions } = useAuth();
  const router = useRouter();

  // Track current chat session
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  
  // Session timer
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(MAX_SESSION_DURATION);
  
  // Confirmation dialog state
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Determine if the system is responding
  const isActive = status === 'processing' || status === 'responding';
  
  // Handling user authentication modal
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Session timer effect
  useEffect(() => {
    if (status !== 'idle' && !sessionStartTime) {
      setSessionStartTime(Date.now());
    }
    
    if (sessionStartTime) {
      const timer = setInterval(() => {
        const elapsed = Date.now() - sessionStartTime;
        const remaining = Math.max(0, MAX_SESSION_DURATION - elapsed);
        setTimeRemaining(remaining);
        
        // Auto-end session if time is up
        if (remaining <= 0) {
          clearInterval(timer);
          handleEndSession();
        }
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [sessionStartTime, status]);
  
  // Format time remaining as MM:SS
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Handle audio recording
  useEffect(() => {
    if (status === 'listening' && !isListening) {
      startAudioListening();
    } else if (status !== 'listening' && isListening) {
      stopAudioListening();
    }
  }, [status, isListening, startAudioListening, stopAudioListening]);
  
  // Create a new chat session when starting - optimized with local storage caching
  useEffect(() => {
    const setupSession = async () => {
      if (status !== 'idle' && user && !currentSessionId) {
        try {
          // First check local storage for active session
          const cachedSessionId = localStorage.getItem(`hearthly_active_session_${user.id}`);
          
          if (cachedSessionId) {
            setCurrentSessionId(Number(cachedSessionId));
          } else {
            const { session, error } = await createChatSession(user.id);
            if (!error && session) {
              setCurrentSessionId(session.id);
              // Cache in local storage
              localStorage.setItem(`hearthly_active_session_${user.id}`, session.id.toString());
            }
          }
        } catch (error) {
          console.error('Failed to create chat session:', error);
        }
      }
    };
    
    setupSession();
  }, [status, user, currentSessionId]);
  
  // Handle backend response
  useEffect(() => {
    if (response && response.transcript && currentSessionId) {
      // Save the bot message to Supabase
      addChatMessage(
        currentSessionId,
        'bot',
        response.transcript,
        response.audio ? `data:audio/mp3;base64,${response.audio}` : null
      );
      
      setResponseMessage(response.transcript);
      
      // Return to idle state after response is played
      const audioElement = new Audio(`data:audio/mp3;base64,${response.audio}`);
      audioElement.onended = () => {
        finishResponse();
      };
    }
  }, [response, setResponseMessage, finishResponse, currentSessionId]);
  
  const handleMicClick = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    if (showChat) {
      // If chat is open, close it
      setShowChat(false);
      return;
    }
    
    if (status === 'idle') {
      startSessionListening();
    } else if (status === 'listening') {
      stopSessionListening();
      
      // If user stops listening and there's audio data, 
      // we can save it to the database as a user message
      if (user && currentSessionId) {
        // You'd need to modify your useAudio hook to expose the audioBlob
        // We're just saving the transcript for simplicity here
        addChatMessage(
          currentSessionId,
          'user',
          'User audio message' // This would be the transcription of the audio
        );
      }
    } else {
      // This allows clicking mic again after stopping
      startSessionListening();
    }
  };
  
  const handleTextClick = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    setShowChat(true);
  };
  
  const handleTextSend = async (text: string) => {
    if (!user || !currentSessionId) return;
    
    // Add user message to the database
    await addChatMessage(currentSessionId, 'user', text);
    
    console.log('User message:', text);
    // For text messages, we'll need to implement a text-based API call
    // This would be similar to the audio one but sending text instead
    // For now, we'll use a simulated response
    setShowTextInput(false);
    startSessionListening();
    stopSessionListening();
    
    // Simulate a response from backend
    setTimeout(() => {
      const botResponse = "I hear you. Can you tell me more about that?";
      
      // Save bot response to database
      if (currentSessionId) {
        addChatMessage(currentSessionId, 'bot', botResponse);
      }
      
      setResponseMessage(botResponse);
      setTimeout(finishResponse, 3000);
    }, 1000);
  };
  
  const handleTextCancel = () => {
    setShowTextInput(false);
  };
  
  const handleCancelClick = () => {
    // Show confirmation dialog
    setShowConfirmation(true);
  };
  
  const handleEndSession = async () => {
    // End the session in the database
    if (currentSessionId) {
      await endChatSession(currentSessionId, message);
      
      // Decrement the session count if a session was actually used
      if (user && status !== 'idle') {
        try {
          const newRemainingCount = await decrementSessionCount(user.id);
          updateRemainingSessions(newRemainingCount);
        } catch (error) {
          console.error("Failed to update session count:", error);
        }
      }
      
      // Clear the cached session ID
      if (user) {
        localStorage.removeItem(`hearthly_active_session_${user.id}`);
      }
    }
    
    // Reset the UI
    cancelSession();
    setCurrentSessionId(null);
    setSessionStartTime(null);
    setTimeRemaining(MAX_SESSION_DURATION);
    setShowConfirmation(false);
  };
  
  return (
    <ProtectedRoute>
      <SessionLimitCheck>
        <MainLayout>
          {showChat ? (
            <div className="h-[calc(100vh-100px)]">
              <ChatInterface 
                isOpen={showChat} 
                onClose={() => setShowChat(false)} 
                isDarkMode={isDarkMode}
                onMicClick={handleMicClick}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
              {sessionStartTime && (
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow text-sm font-medium">
                  Time remaining: {formatTimeRemaining()}
                </div>
              )}
              
              <h2 className="text-xl mb-4 text-center">
                {status === 'listening' ? 'listening...' : 
                 status === 'processing' ? 'processing...' : 
                 status === 'responding' ? 'responding...' : 'your turn'}
              </h2>
              
              <div className="mb-4">
                <CloudyCircle isActive={isActive} isDarkMode={isDarkMode} />
              </div>
              
              <p className="text-center max-w-md mx-auto mt-4">
                {message}
              </p>
              
              <AudioWaveform isListening={status === 'listening'} isDarkMode={isDarkMode} />
              
              <SessionControls 
                status={status}
                onMicClick={handleMicClick}
                onTextClick={handleTextClick}
                onCancelClick={handleCancelClick}
                isDarkMode={isDarkMode}
              />
              
              {showTextInput && (
                <TextInput onSend={handleTextSend} onCancel={handleTextCancel} />
              )}
            </div>
          )}
          
          {/* Auth Modal */}
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)} 
            redirectPath="/session"
          />
          
          {/* Confirmation Dialog */}
          <ConfirmationDialog
            isOpen={showConfirmation}
            title="End Session"
            message="Are you sure you want to end this session? This will count toward your session limit."
            confirmText="End Session"
            cancelText="Continue Session"
            onConfirm={handleEndSession}
            onCancel={() => setShowConfirmation(false)}
          />
        </MainLayout>
      </SessionLimitCheck>
    </ProtectedRoute>
  );
};

// Wrap with ProtectedRoute
const SessionPageWrapper = () => {
  return (
    <ProtectedRoute requiresAuth={true}>
      <SessionLimitCheck>
        <SessionPage />
      </SessionLimitCheck>
    </ProtectedRoute>
  );
};

export default SessionPageWrapper;