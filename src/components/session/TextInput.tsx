// src/components/session/TextInput.tsx
import React, { useState } from 'react';

interface TextInputProps {
  onSend: (message: string) => void;
  onCancel: () => void;
}

const TextInput: React.FC<TextInputProps> = ({ onSend, onCancel }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-calmi-orange focus:border-transparent text-black dark:text-white bg-white dark:bg-gray-700"
          autoFocus
        />
        <button
          type="submit"
          className="bg-calmi-orange text-black p-3 rounded-lg"
        >
          Send
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white p-3 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TextInput;