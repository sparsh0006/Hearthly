// src/pages/session.tsx
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import AudioWaveform from '../components/session/AudioWaveform';
import SessionControls from '../components/session/SessionControls';
import TextInput from '../components/session/TextInput';
import { useSession } from '../hooks/useSession';
import { useAudio } from '../hooks/useAudio';
import CloudyCircle from "../components/session/CloudyCircle";
import FluidCircle from '../components/session/FluidCircle';
import { useTheme } from '../contexts/ThemeContext';
import ChatInterface from '../components/session/ChatInterface';
import { processAudio } from '../services/api';

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
    isProcessing,
    audioData, 
    response,
    startListening: startAudioListening, 
    stopListening: stopAudioListening 
  } = useAudio();
  
  const [showTextInput, setShowTextInput] = useState(false);
  const { status, message } = sessionState;
  const { isDarkMode } = useTheme();
  const [showChat, setShowChat] = useState(false);
  
  // Determine if the system is responding
  const isActive = status === 'processing' || status === 'responding';
  
  // Handle audio recording
  useEffect(() => {
    if (status === 'listening' && !isListening) {
      startAudioListening();
    } else if (status !== 'listening' && isListening) {
      stopAudioListening();
    }
  }, [status, isListening, startAudioListening, stopAudioListening]);
  
  // Handle backend response
  useEffect(() => {
    if (response && response.transcript) {
      setResponseMessage(response.transcript);
      
      // Return to idle state after response is played
      const audioElement = new Audio(`data:audio/mp3;base64,${response.audio}`);
      audioElement.onended = () => {
        finishResponse();
      };
    }
  }, [response, setResponseMessage, finishResponse]);
  
  const handleMicClick = () => {
    if (showChat) {
      // If chat is open, close it
      setShowChat(false);
      return;
    }
    
    if (status === 'idle') {
      startSessionListening();
    } else if (status === 'listening') {
      stopSessionListening();
    } else {
      // This allows clicking mic again after stopping
      startSessionListening();
    }
  };
  
  const handleTextClick = () => {
    setShowChat(true);
  };
  
  const handleTextSend = async (text: string) => {
    console.log('User message:', text);
    // For text messages, we'll need to implement a text-based API call
    // This would be similar to the audio one but sending text instead
    // For now, we'll use a simulated response
    setShowTextInput(false);
    startSessionListening();
    stopSessionListening();
    
    // Simulate a response from backend
    setTimeout(() => {
      setResponseMessage("I hear you. Can you tell me more about that?");
      setTimeout(finishResponse, 3000);
    }, 1000);
  };
  
  const handleTextCancel = () => {
    setShowTextInput(false);
  };
  
  const handleCancelClick = () => {
    // Add session when cancel button is clicked
    cancelSession();
  };
  
  if (showChat) {
    return (
      <MainLayout>
        <div className="h-[calc(100vh-100px)]">
          <ChatInterface 
            isOpen={showChat} 
            onClose={() => setShowChat(false)} 
            isDarkMode={isDarkMode}
            onMicClick={handleMicClick}
          />
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
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
    </MainLayout>
  );
};

export default SessionPage;