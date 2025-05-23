// src/components/session/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onMicClick: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  isOpen, 
  // onClose, 
  isDarkMode,
  onMicClick 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "oh hey, welcome back. so, what's been sitting heavy on your chest today?",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Add a temporary "typing" message
    const typingId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: typingId,
      text: "...",
      sender: 'bot'
    }]);
    
    try {
      // In a real implementation, you'd send the text to your backend API
      // For demo purposes, we'll use a timeout to simulate processing
      setTimeout(() => {
        // This is where you would integrate with your backend API for text messages
        // For now, we'll use some conditional responses
        let botResponse = "";
        
        if (userMessage.text.toLowerCase().includes("feeling") && userMessage.text.toLowerCase().includes("depress")) {
          botResponse = "i'm really sorry you're feeling this way—it sounds like it's been weighing on you for a while. can you tell me more about what's been triggering these feelings today? or... maybe it's just the same heaviness lingering from before?";
        } else if (userMessage.text.toLowerCase().includes("help") || userMessage.text.toLowerCase().includes("overcome")) {
          botResponse = "i hear ya—it's tough when that heavy feeling just refuses to let up. i wonder, is this still related to the breakup or maybe that sense of boredom you mentioned before? either way, we can figure out some steps to help ease this. do you think talking it through more deeply could give you some relief, or are you leaning towards making changes in your daily routine?";
        } else {
          botResponse = "i'm here to listen. would you like to tell me more about what's going on?";
        }
        
        // Replace the typing message with the actual response
        setMessages(prev => prev.map(msg => 
          msg.id === typingId ? { ...msg, text: botResponse } : msg
        ));
        
        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsProcessing(false);
      
      // Replace typing message with error message
      setMessages(prev => prev.map(msg => 
        msg.id === typingId ? { ...msg, text: "Sorry, I couldn't process that message. Please try again." } : msg
      ));
    }
  };
  
  return (
    <div className={`flex flex-col h-full ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-calmi-orange mr-2 flex-shrink-0"></div>
            )}
            <div 
              className={`max-w-[80%] p-3 rounded-xl ${
                message.sender === 'user' 
                  ? `${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`
                  : `${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`
              }`}
            >
              {message.text}
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-red-500 ml-2 flex-shrink-0"></div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className={`border-t p-4 ${isDarkMode ? 'calmi-dark border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center">
        {/* // src/components/session/ChatInterface.tsx
// Update the input element style in your handleSendMessage function around line 125-140 */}

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="type your message..."
            className={`flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-calmi-orange ${
              isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'
            }`}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <div className="flex ml-2">
            <button 
              className={`p-2 rounded-full ${isDarkMode ? 'calmi-dark' : 'bg-gray-200'} mr-2 w-10 h-10 flex items-center justify-center`}
              onClick={onMicClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isDarkMode ? 'white' : 'black'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </button>
            <button 
              className="p-2 rounded-full bg-calmi-orange w-10 h-10 flex items-center justify-center"
              onClick={handleSendMessage}
              disabled={isProcessing}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;