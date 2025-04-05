import React from 'react';
import { SessionStatus } from '../../types';

interface SessionControlsProps {
  status: SessionStatus;
  onMicClick: () => void;
  onTextClick: () => void;
  onCancelClick: () => void;
}

const SessionControls: React.FC<SessionControlsProps> = ({
  status,
  onMicClick,
  onTextClick,
  onCancelClick,
}) => {
  if (status === 'idle') {
    return (
      <div className="flex justify-center gap-4 mt-8">
        <button 
          className="p-4 rounded-full border border-gray-300 focus:outline-none"
          onClick={onTextClick}
        >
          💬
        </button>
        <button 
          className="p-4 rounded-full bg-calmi-orange focus:outline-none"
          onClick={onMicClick}
        >
          🎤
        </button>
        <button 
          className="p-4 rounded-full border border-gray-300 focus:outline-none"
          onClick={onCancelClick}
        >
          ✕
        </button>
      </div>
    );
  }
  
  if (status === 'listening') {
    return (
      <div className="flex justify-center gap-4 mt-8">
        <button 
          className="p-4 rounded-full border border-gray-300 focus:outline-none"
          onClick={onTextClick}
        >
          💬
        </button>
        <button 
          className="p-4 rounded-full border-2 border-calmi-orange focus:outline-none"
          onClick={onMicClick}
        >
          ⏹️
        </button>
        <button 
          className="p-4 rounded-full border border-gray-300 focus:outline-none"
          onClick={onCancelClick}
        >
          ✕
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center gap-4 mt-8">
      <button 
        className="p-4 rounded-full border border-gray-300 focus:outline-none"
        onClick={onTextClick}
      >
        💬
      </button>
      <button 
        className="p-4 rounded-full bg-calmi-orange focus:outline-none"
        onClick={onMicClick}
      >
        🎤
      </button>
      <button 
        className="p-4 rounded-full border border-gray-300 focus:outline-none"
        onClick={onCancelClick}
      >
        ✕
      </button>
    </div>
  );
};

export default SessionControls;