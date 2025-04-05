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

const SessionPage: React.FC = () => {
  const { sessionState, startListening: startSessionListening, stopListening: stopSessionListening, cancelSession } = useSession();
  const { isListening, audioData, startListening: startAudioListening, stopListening: stopAudioListening } = useAudio();
  const [showTextInput, setShowTextInput] = useState(false);
  const { status, message } = sessionState;
  const { isDarkMode } = useTheme();
  
  // Add this to fix the errors - determine if the system is responding
  // When status is 'processing' or 'responding', isActive should be true
  const isActive = status === 'processing' || status === 'responding';
  
  useEffect(() => {
    if (status === 'listening' && !isListening) {
      startAudioListening();
    } else if (status !== 'listening' && isListening) {
      stopAudioListening();
    }
  }, [status, isListening, startAudioListening, stopAudioListening]);
  
  const handleMicClick = () => {
    if (status === 'idle') {
      startSessionListening();
    } else if (status === 'listening') {
      stopSessionListening();
    }
  };
  
  const handleTextClick = () => {
    setShowTextInput(true);
  };
  
  const handleTextSend = (text: string) => {
    console.log('User message:', text);
    // Here you would typically send the message to your backend
    setShowTextInput(false);
    // Simulate processing
    startSessionListening();
    setTimeout(() => {
      stopSessionListening();
    }, 2000);
  };
  
  const handleTextCancel = () => {
    setShowTextInput(false);
  };
  
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)]">
        <h2 className="text-xl mb-4 text-center">
          {status === 'listening' ? 'listening...' : 'your turn'}
        </h2>

        {/* FluidCircle component with proper props */}
        {/* <FluidCircle status={status} audioData={audioData} isDarkMode={isDarkMode} /> */}
        
        
        {/* CloudyCircle component with proper props */}
        <div className="mb-4">
          <CloudyCircle isActive={isActive} />
        </div>
        
        <p className="text-center max-w-md mx-auto mt-4">
          {message}
        </p>
        
        <AudioWaveform isListening={status === 'listening'} />
        
        <SessionControls 
          status={status}
          onMicClick={handleMicClick}
          onTextClick={handleTextClick}
          onCancelClick={cancelSession}
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