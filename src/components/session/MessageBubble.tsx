import React from 'react';

interface MessageBubbleProps {
  text: string;
  sender: 'user' | 'bot';
  isDarkMode: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, sender, isDarkMode }) => {
  return (
    <div className={`flex mb-4 ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      {sender === 'bot' && (
        <div className="w-8 h-8 rounded-full bg-calmi-orange mr-2 flex-shrink-0"></div>
      )}
      <div 
        className={`max-w-[80%] p-3 rounded-xl ${
          sender === 'user' 
            ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`
            : `${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`
        }`}
      >
        {text}
      </div>
      {sender === 'user' && (
        <div className="w-8 h-8 rounded-full bg-red-500 ml-2 flex-shrink-0"></div>
      )}
    </div>
  );
};

export default MessageBubble;