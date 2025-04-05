import React, { useState, useRef, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
}

interface LanguageDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (language: Language) => void;
  isDarkMode?: boolean;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  isOpen,
  onClose,
  onSelectLanguage,
  isDarkMode = false,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Available languages
  const languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: 'Mandarin Chinese' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'ar', name: 'Arabic' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className={`absolute top-16 right-4 w-48 rounded-lg shadow-lg overflow-hidden z-50 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="max-h-80 overflow-y-auto">
        {languages.map((language) => (
          <button
            key={language.code}
            className={`w-full text-left px-4 py-2 ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-white' 
                : 'hover:bg-gray-100 text-gray-900'
            } ${language.code === 'en' ? 'bg-calmi-orange text-black' : ''}`}
            onClick={() => {
              onSelectLanguage(language);
              onClose();
            }}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;