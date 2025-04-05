import React, { createContext, useState, useContext, useEffect } from 'react';

interface Language {
  code: string;
  name: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>({ code: 'en', name: 'English' });
  
  // Load saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('calmi-language');
    if (savedLanguage) {
      try {
        setLanguageState(JSON.parse(savedLanguage));
      } catch (e) {
        console.error('Error parsing saved language', e);
      }
    }
  }, []);
  
  // Save language to localStorage when it changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('calmi-language', JSON.stringify(newLanguage));
    
    // Here you could also include logic to change the app's language
    // For example, using i18n libraries
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};