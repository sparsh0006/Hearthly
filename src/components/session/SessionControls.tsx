import React from 'react';
import { SessionStatus } from '../../types';
import { MicIcon, MessageIcon, CloseIcon } from '../ui/Icons';

interface SessionControlsProps {
  status: SessionStatus;
  onMicClick: () => void;
  onTextClick: () => void;
  onCancelClick: () => void;
  isDarkMode?: boolean;
}

const SessionControls: React.FC<SessionControlsProps> = ({
  status,
  onMicClick,
  onTextClick,
  onCancelClick,
  isDarkMode = false,
}) => {
  const baseButtonClasses = `p-4 rounded-full focus:outline-none`;
  const darkModeClasses = isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : '';
  
  if (status === 'idle') {
    return (
      <div className="flex justify-center gap-4 mt-8">
        <button 
          className={`${baseButtonClasses} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
          onClick={onTextClick}
        >
          <MessageIcon color={isDarkMode ? 'white' : 'black'} />
        </button>
        <button 
          className={`${baseButtonClasses} bg-calmi-orange`}
          onClick={onMicClick}
        >
          <MicIcon color="black" />
        </button>
        <button 
          className={`${baseButtonClasses} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
          onClick={onCancelClick}
        >
          <CloseIcon color={isDarkMode ? 'white' : 'black'} />
        </button>
      </div>
    );
  }
  
  if (status === 'listening') {
    return (
      <div className="flex justify-center gap-4 mt-8">
        <button 
          className={`${baseButtonClasses} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
          onClick={onTextClick}
        >
          <MessageIcon color={isDarkMode ? 'white' : 'black'} />
        </button>
        <button 
          className={`${baseButtonClasses} border-2 border-calmi-orange`}
          onClick={onMicClick}
        >
          <span className="w-4 h-4 block bg-calmi-orange"></span>
        </button>
        <button 
          className={`${baseButtonClasses} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
          onClick={onCancelClick}
        >
          <CloseIcon color={isDarkMode ? 'white' : 'black'} />
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button 
        className={`${baseButtonClasses} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        onClick={onTextClick}
      >
        <MessageIcon color={isDarkMode ? 'white' : 'black'} />
      </button>
      <button 
        className={`${baseButtonClasses} bg-calmi-orange`}
        onClick={onMicClick}
      >
        <MicIcon color="black" />
      </button>
      <button 
        className={`${baseButtonClasses} border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}
        onClick={onCancelClick}
      >
        <CloseIcon color={isDarkMode ? 'white' : 'black'} />
      </button>
    </div>
  );
};

export default SessionControls;